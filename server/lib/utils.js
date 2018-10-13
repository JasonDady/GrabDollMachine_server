'use strict';

const qs = require('qs');
const _ = require('lodash');
const Promise = require('bluebird');
const request = require('request');
const config = require('../configuration');
const fs = require('fs');
const wechatPay = require('wechat-pay');
const path = require('path');
const moment = require('moment');

const utils = module.exports = {};

utils.jsonParse = function(str) {
  return _.attempt(JSON.parse.bind(null, str));
};
utils.stringify = function(json) {
  return _.attempt(JSON.stringify.bind(null, json));
};

utils.getWechatUserInfo = function(accessToken, openid) {
  let obj = {
    'access_token': accessToken,
    openid: openid,
  };
  let body = qs.stringify(obj);
  let wxUserInfo = 'https://api.weixin.qq.com/sns/userinfo?' + body;
  return Promise.promisify(request.post)(wxUserInfo, {
    headers: {
      'content-type': 'application/json;charset=utf-8',
    },
    json: true,
  })
  .then((res) => {
    console.log('body: ' + res.body);
    if (!res.body.errcode) {
      return Promise.resolve(res.body);
    }
    return Promise.reject(res.body);
  })
  .catch((error) => {
    return Promise.reject(error);
  });
};

utils.wechatlogin = function(code) {
  let obj = {
    code,
    appid: config.wxAppId,
    secret: config.wxAppSecret,
    'grant_type': 'authorization_code',
  };
  let body = qs.stringify(obj);
  let wxloginUrl = 'https://api.weixin.qq.com/sns/oauth2/access_token?' + body;

  return Promise.promisify(request.post)(wxloginUrl, {
    headers: {
      'content-type': 'application/json;charset=utf-8',
    },
    json: true,
  })
  .then((res) => {
    if (!res.body.errcode) {
      return Promise.resolve(res.body);
    }
    return Promise.reject(res.body);
  })
  .catch((error) => {
    return Promise.reject(error);
  });
};

function getClientIp(req) {
  var ip = req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
  if (ip) {
    ip = ip.replace('::ffff:', '');
    ip = ip.split(',')[0];
  }
  return ip;
};

utils.genPayInfo = function(app, req, totalFee, userId, callback) {
  var pfxPath = path.normalize(__dirname) + '/pay/cert/apiclient_cert.p12';
  var initConfig = {
    partnerKey: config.wxPartnerKey,
    appId: config.wxAppId,
    mchId: config.wxMchId,
    notifyUrl: `http://${config.host}:${config.port}/notify`,
    pfx: fs.readFileSync(pfxPath),
  };

  var payment = new wechatPay.Payment(initConfig);

  var now = Date.now();
  // 1.创建微信订单
  var order = {
    body: '蛋蛋机-游戏币充值',
    'out_trade_no': now + userId,
    'total_fee': Math.round(totalFee * 100) || 1, // 单位是分，不能有小数点
    'spbill_create_ip': getClientIp(req),
    'trade_type': 'APP',
  };

  app.logger.debug({
    notifyUrl: initConfig.notifyUrl,
    totalFee,
    userId,
    order,
  }, 'Payment.initConfig');

  // 支付参数，生成微信订单
  payment.getBrandWCPayRequestParams(order, function(err, payargs) {
    if (err) {
      app.logger.error({
        err,
      }, 'Payment.getBrandWCPayRequestParams.error');
      return callback(err);
    }
    var params = {
      'appid': payargs.appId,
      'noncestr': payargs.nonce_str,
      'prepayid': payargs.prepay_id,
      'partnerid': payargs.mch_id,
      'package': 'Sign=WXPay',
      'timestamp': payargs.timestamp,
    };
    params.sign = payment._getSign(params, 'MD5');
    app.logger.debug({
      payargs,
      params,
    }, 'Payment.getBrandWCPayRequestParams.result');
    let orderInfo = {
      orderNo: moment().format('YYYYMMDDHHmmss') + userId,
      status: 2,
      'out_trade_no': order.out_trade_no,
      price: order.total_fee,
      createTime: new Date(),
      userId: userId,
    };
    app.models.Order.upsert(orderInfo);
    return callback(null, params);
  });
};
