'use strict';

const upcast = require('upcast');
const iconv = require('iconv-lite');
const Promise = require('bluebird');
const request = require('request');
const qs = require('qs');
const config = require('../../server/configuration');
const Boom = require('loopback-boom');
const modelConfig = require('../../server/lib/loopback-model-config');

module.exports = function(CheckCode) {
  modelConfig.disableMethods(CheckCode, 'CDRU');

  var getRandomInt = (min, max) => {
    const paramsPass = upcast.is(min, 'number') && upcast.is(max, 'number') && min < max;
    if (!paramsPass) throw new Error('two numbers needed for getRandomInt(), and the smaller first!');
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  CheckCode.validateVerifyCode = (mobile, code) => {
    return CheckCode.findById(mobile)
    .then((result) => {
      CheckCode.app.logger.debug({
        mobile,
        code,
        result}, 'CheckCode.validateVerifyCode');
      if (!result) {
        return Promise.reject(Boom.badRequest('验证码不存在'));
      }
      if (result.code != code) {
        return Promise.reject(Boom.badRequest('验证码不正确'), {code, mobile});
      }
      if (new Date(result.expireAt) < Date.now()) {
        return Promise.reject(Boom.badRequest('验证码已过期'), {code, mobile});
      }
      //  过期不删除，使用过才删除
      return CheckCode.destroyById(mobile)
      .catch(error => Promise.reject(`CheckCode.validateVerifyCode出错:${error}`));
    });
  };

  CheckCode.getVerifyCode = function(mobile, cb) {
    let re = /^1\d{10}$/;
    if (!re.test(mobile)) {
      return cb(Boom.badRequest('请输入正确手机号', {mobile: mobile}));
    }
    CheckCode.findById(mobile)
    .then(result => {
      if (result) {
        let now = Date.now();
        if (new Date(result.createAt).valueOf() + config.repeatRequestGap > now) {
          return Promise.resolve();
        }
      }
      let verifyCode = getRandomInt(1000, 9999);
      return sendMsg(mobile, verifyCode)
      .then(result => {
        if (typeof result === 'string') {
          result = JSON.parse(result);
        }
        CheckCode.app.logger.debug({
          mobile: mobile, verifyCode: verifyCode, result: result,
        }, '发送手机验证码成功');
        // 发送成功
        if (result.error_code === '0') {
          return CheckCode.upsert({
            mobile: mobile,
            code: verifyCode,
            createAt: new Date(),
            expireAt: new Date(Date.now() + config.codeValidityTime),
          });
        }
        return Promise.reject(result);
      });
    })
    .then(() => {
      let result = {
        code: 0,
        msg: '验证码已发送请耐心等待',
      };
      cb(null, result);
    })
    .catch((error) => {
      CheckCode.app.logger.error({
        error,
      }, 'getVerifyCode.error');
      return cb(error);
    });
  };

  CheckCode.remoteMethod(
    'getVerifyCode', {
      description: 'get verify code when login',
      accepts: [{
        arg: 'mobile',
        type: 'string',
        required: true,
        description: '13888888888',
      }],
      returns: {
        arg: 'code',
        type: 'object',
        root: true,
        description: '{"code": 0, "msg": "验证码已发送请耐心等待"}',
      },
      http: {
        verb: 'post',
      },
    }
  );

  function sendMsg(mobile, verifyCode, msgContent, preSendTime) {
    let content = '【蛋蛋机】您的验证码为：' + verifyCode;
    // var content = getContent(str); // 将短信内容转码
    let obj = {
      Mobile: mobile, // 目标手机
      Content: content, // 短信内容
    };
    if (preSendTime) {
      obj.PreSendTime = preSendTime;
    }
    var result = qs.stringify(obj);
    return new Promise(function(resolve, reject) {
      request.post(config.msgUrl, {
        body: result,
        headers: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          'token': 'a88a3c56-64f3-4fa1-a988-aae889f41947',
        },
      }, function(err, res, body) {
        if (err) {
          reject(err);
        } else {
          resolve(body);
        }
      });
    });
  }

  // Buffer 内容 转字符
  function getContent(content) {
    var buf = iconv.encode(content, 'gbk');
    var result = '';
    for (var i = 0, l = buf.length; i < l; i++) {
      result += buf[i].toString(16);
    }
    return result;
  }
};
