'use strict';

const ws = require('nodejs-websocket');

const app = require('../server');
const Promise = require('bluebird');
const Boom = require('loopback-boom');
const createPromiseCallback = require('../lib/createPromiseCallback');
const commandHelper = require('./protocol/command-helper');

var PORT = 4011;

var server;

function startListener() {
  // 创建一个TCP服务器实例，调用listen函数开始监听指定端口
  // 传入net.createServer()的回调函数将作为”connection“事件的处理函数
  // 在每一个“connection”事件中，该回调函数接收到的socket对象是唯一的
  server = ws.createServer(function(conn) {
    // 为这个socket实例添加一个"data"事件处理函数
    conn.on('text', function(data) {
      app.logger.debug({
        data,
      }, 'sock.on.data');
      if (typeof data === 'string') {
        data = JSON.parse(data);
      }
      let userId = data != null ? data.userId : '';
      let deviceId = data != null ? data.deviceId : '';
      let isOnline = data != null ? data.isOnline : '';
      if (!userId || !deviceId) {
        return;
      }
      app.logger.debug({
        data,
        userId,
        deviceId,
        isOnline,
      }, 'sock.on.data.parse');
      updateUserOnlineInfo(userId, deviceId, isOnline);
    });

    // 为这个socket实例添加一个"close"事件处理函数
    conn.on('close', function(code, reason) {
      app.logger.debug({
        code,
        reason,
      }, 'conn.on.close');
    });

    // 数据错误事件
    conn.on('error', function(code, reason) {
      try {
        app.logger.error({
          code,
          reason,
        }, 'conn.on.error');
        conn.close();
      } catch (exception) {
        console.log('conn.on.error code: ', code, reason, exception);
      }
    });
  }).listen(PORT);
}

exports.startListener = startListener;

function updateUserOnlineInfo(userId, deviceId, isOnline) {
  if (typeof deviceId !== 'string') {
    deviceId = commandHelper.zerofillNum(deviceId, 14);
  }
  app.models.UserOnline.find({
    where: {
      userId: userId,
    },
    order: 'id DESC',
  })
  .then((userOnline) => {
    if (!userOnline || userOnline.length === 0) { // 用户不存在
      if (isOnline) { // 在线
        let userOnlineInfo = {
          userId,
          deviceId,
        };
        return app.models.UserOnline.upsert(userOnlineInfo);
      } else {
        return;
      }
    }
    if (isOnline) {
      var deviceInfo = {};
      deviceInfo.userId = userId;
      deviceInfo.deviceId = deviceId;
      app.logger.debug({
        deviceInfo,
        userOnline,
      }, 'updateDeviceInfo.updateAttributes.deviceInfo');
      return userOnline.updateAttributes(deviceInfo);
    } else {
      return app.models.UserOnline.destroyAll({userId: userId})
      .then((result) => {
        app.logger.debug({
          result,
          clientList: app.serverClientList,
        }, 'UserOnline.destoryAll');
      })
      .catch((error) => {
        app.logger.error({
          error,
        }, 'UserOnline.destoryAll.error');
      });
    }
  })
  .then((userOnline) => {
    app.logger.debug({
      userOnline,
    }, 'updateUserOnlineInfo.device');
    sendCommand(deviceId);
  })
  .catch((error) => {
    app.logger.error({
      error,
    }, 'updateUserOnlineInfo.error');
    sendCommand(deviceId);
  });
}

function sendCommand(deviceId) {
  let command = {};
  app.models.Device.findById(deviceId)
  .then((device) => {
    command.device = device;
    return app.models.UserOnline.find({
      where: {
        deviceId,
      },
      order: 'id DESC',
    });
  })
  .then((userOnlines) => {
    command.userOnline = userOnlines.length;
    server.connections.forEach(function(conn) {
      conn.sendText(JSON.stringify(command));
      app.logger.debug({
        command,
      }, 'sendCommand.conn');
    });
  })
  .catch((error) => {
    app.logger.error({
      error,
    }, 'sendCommand.conn.error');
    server.connections.forEach(function(conn) {
      command.error = error;
      conn.sendText(JSON.stringify(command));
    });
  });
};

exports.sendCommand = sendCommand;
