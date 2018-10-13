'use strict';
const Boom = require('loopback-boom');
const createPromiseCallback = require('../../server/lib/createPromiseCallback');
const tcpServer = require('../../server/lib/tcp-server');
const modelConfig = require('../../server/lib/loopback-model-config');

const Promise = require('bluebird');

module.exports = function(Device) {
  modelConfig.disableMethods(Device, 'CUD');
  modelConfig.disableRelationMethods(Device, 'Order', 'CUDL');
  modelConfig.disableRelationMethods(Device, 'AppUser', 'CUDL');

  Device.prototype.queryDeviceFailGrabRecord = function(callback) {
    callback = callback || createPromiseCallback();
    let self = this;
    Device.app.models.Order.find({
      where: {
        status: 0,
        deviceId: self.deviceId,
      },
      limit: 10,
      include: ['device', 'appUser'],
      order: 'createTime DESC',
    })
    .then(orders => callback(null, orders))
    .catch((error) => {
      Device.app.logger.error({
        error,
      }, 'queryDeviceFailGrabRecord.error');
      callback(error);
    });
  };

  Device.remoteMethod('queryDeviceFailGrabRecord', {
    description: '查询设备抓取失败的记录.',
    isStatic: false,
    accepts: [],
    returns: {
      arg: 'result',
      type: 'object',
      description: '设备被抓取的失败记录',
    },
    http: {
      verb: 'get',
    },
  });

  Device.prototype.queryDeviceWinningGrabRecord = function(callback) {
    callback = callback || createPromiseCallback();
    let self = this;
    Device.app.models.Order.find({
      where: {
        status: 1,
        deviceId: self.deviceId,
      },
      limit: 10,
      include: ['device', 'appUser'],
      order: 'createTime DESC',
    })
    .then(orders => callback(null, orders))
    .catch((error) => {
      Device.app.logger.error({
        error,
      }, 'queryDeviceWinningGrabRecord.error');
      callback(error);
    });
  };

  Device.remoteMethod('queryDeviceWinningGrabRecord', {
    description: '查询设备抓取成功的记录.',
    isStatic: false,
    accepts: [],
    returns: {
      arg: 'result',
      type: 'object',
      description: '设备被抓取的成功记录',
    },
    http: {
      verb: 'get',
    },
  });

  Device.prototype.sendCommand = function(command, callback) {
    callback = callback || createPromiseCallback();
    let self = this;
    tcpServer.sendCommand(self.sockName, command, null)
    .then((res) => callback(null, res))
    .catch((error) => {
      Device.app.logger.error({
        error,
      }, 'Device.sendCommand.error');
      callback(error);
    });
  };

  Device.remoteMethod('sendCommand', {
    description: '发送指令.',
    isStatic: false,
    accepts: [
      {
        arg: 'command',
        type: 'string',
        required: true,
        description: '指令值: 按键状态: {"buttonState":1}',
      },
    ],
    returns: {
      arg: 'result',
      type: 'object',
      root: true,
      description: '{"success": "boolean", "status": "int", "result": "object"}',
    },
    http: {
      verb: 'post',
    },
  });
};
