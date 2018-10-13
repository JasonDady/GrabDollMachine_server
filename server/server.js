'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();
const tcpServer = require('../server/lib/tcp-server');
const tcpServerApp = require('../server/lib/tcp-server-app');
const tcpServerUser = require('../server/lib/tcp-server-user');
const countingMetricMiddleware = require('./lib/middleware/countMetric');
const Promise = require('bluebird');
const express = require('express');
const upload = require('../server/lib/upload-oss');
const _ = require('lodash');

app.logger = require('./lib/logger');

app.use(countingMetricMiddleware);

app.start = function() {
  // 逐条清除在线用户信息
  app.models.UserOnline.find()
  .then((userOnlines) => {
    app.logger.debug({
      userOnlines,
    }, 'userOnlines');
    return Promise.map(userOnlines, userOnline => userOnline.destroy());
  })
  .then((result) => {
    app.logger.debug({
      result,
    }, 'UserOnline.destroy.result');
  })
  .catch((error) => {
    app.logger.error({
      error,
    }, 'UserOnline.destroy.error');
  });

  // app.models.Device.updateAll({
  //   online: true,
  // }, {
  //   online: false,
  // }, function(err, info) {
  //   app.logger.debug({
  //     err,
  //     info,
  //   }, 'Device.updateAll');
  // });

  app.models.Device.find({
    where: {
      online: true,
    },
    order: 'deviceId DESC',
  })
  .then((devices) => {
    app.logger.debug({
      devices,
    }, 'updateDevice.devices');
    return Promise.map(devices, device => {
      let nDeviceInfo = {
        online: false,
      };
      return device.updateAttributes(nDeviceInfo);
    });
  })
  .then(res => {
    app.logger.debug({
      res,
    }, 'updateDevice.success.online=>false');
  })
  .catch((error) => {
    app.logger.error({
      error,
    }, 'updateDevice.error.online=>false');
  });

  tcpServer.startListener();

  tcpServerApp.startListener();

  tcpServerUser.startListener();

  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});

const config = require('../server/configuration');
const fs = require('fs');
const path = require('path');
const wechatPay = require('wechat-pay');

var pfxPath = path.normalize(__dirname) + '/lib/pay/cert/apiclient_cert.p12';

var initConfig = {
  partnerKey: config.wxPartnerKey,
  appId: config.wxAppId,
  mchId: config.wxMchId,
  notifyUrl: `http://${config.host}:${config.port}/notify`,
  pfx: fs.readFileSync(pfxPath),
};
app.use('/notify', loopback.token());
app.post('/notify', wechatPay.middleware(initConfig)
.getNotify()
.done(function(message, req, res, next) {
  app.logger.debug({
    message,
  }, 'notify.message');
  // 微信返回的数据
  let resultObj = {};
  if (message.return_code == 'SUCCESS' && message.result_code == 'SUCCESS') {
    // 这里你可以写支付成功后的操作
    app.models.Order.findOne({
      where: {
        'out_trade_no': message.out_trade_no,
      },
    })
    .then((order) => {
      if (order) {
        let nOrderInfo = {
          status: 3,
        };
        return order.updateAttributes(nOrderInfo);
      }
    })
    .then((order) => {
      app.models.AppUser.findById(order.userId)
      .then((user) => {
        let gameCurrency = user.gameCurrency + gameCurrencyMapping(parseInt(message.total_fee));
        app.logger.debug({
          gameCurrency,
        }, 'wechat.nAppUserInfo');
        user.updateAttributes({gameCurrency: gameCurrency});
      });
    });
    resultObj['return_code'] = 'SUCCESS';
    resultObj['return_msg'] = 'OK';
  } else {
    resultObj['return_code'] = 'FAIL';
    resultObj['return_msg'] = message.return_msg;
  }
  var payment = new wechatPay.Payment(initConfig);
  var resultVal = payment.buildXml(resultObj);
  app.logger.debug({
    resultVal,
  }, 'notify.resultVal');
  res.send(resultVal);
}));

let gameCurrencyArray = {
  99: 600,
  990: 2000,
  9900: 5000,
  99900: 12500,
  199900: 25000,
  999900: 50000,
};

function gameCurrencyMapping(originalValue) {
  let mapped = _.get(gameCurrencyArray, originalValue);
  if (mapped === undefined) {
    mapped = originalValue;
  }
  return mapped;
}

app.use(express.bodyParser({uploadDir: path.resolve(__dirname, '../tmp')}));

app.use(loopback.static(path.resolve(__dirname, '../client')));
// app.use('/file-upload', loopback.token());

function deleteall(path) {
  var files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach(function(file, index) {
      var curPath = path + '/' + file;
      if (fs.statSync(curPath).isDirectory()) { // recurse
        deleteall(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

app.post('/file-upload', function(req, res) {
  try {
    let tmpPath = req.files.thumbnail.path;
    let filePaths = tmpPath.split('/');
    let key = filePaths[filePaths.length - 1];
    upload(app, key, tmpPath, function(error, result) {
      if (error) {
        return res.send(error);
      }
      app.logger.debug({
        url: result.url,
      }, 'uplpad-oss.result');
      deleteall(path.resolve(__dirname, '../tmp/')); // 删除tmp目录及文件夹内容
      fs.mkdir(path.resolve(__dirname, '../tmp')); // 创建tmp目录
      res.send(result.url);
    });
  } catch (exception) {
    res.send(exception);
  }
});
