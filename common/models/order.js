'use strict';
const modelConfig = require('../../server/lib/loopback-model-config');
const Boom = require('loopback-boom');
const utils = require('../../server/lib/utils');

module.exports = function(Order) {
  modelConfig.disableMethods(Order, 'CUD');

  Order.wechatpayNotify = function(req, callback) {
    Order.app.logger.debug({
      req,
    }, 'Order.wechatpayNotify.支付信息');
  };

  Order.remoteMethod('wechatpayNotify', {
    accepts: [{
      arg: 'req',
      type: 'object',
      http: {
        source: 'req',
      },
    }],
    returns: {
      arg: 'result',
      type: 'string',
    },
    http: {
      verb: 'post',
      path: '/wechatpay/notify/pay',
    },
    description: undefined,
  });
};
