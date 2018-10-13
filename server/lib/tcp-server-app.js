'use strict';

var net = require('net');
const app = require('../server');
const Promise = require('bluebird');
const Boom = require('loopback-boom');
const createPromiseCallback = require('../lib/createPromiseCallback');
const commandHelper = require('./protocol/command-helper');

var PORT = 4012;

function startListener() {
  // 创建一个TCP服务器实例，调用listen函数开始监听指定端口
  // 传入net.createServer()的回调函数将作为”connection“事件的处理函数
  // 在每一个“connection”事件中，该回调函数接收到的socket对象是唯一的
  var server = net.createServer(function(sock) {
    app.serverClientList = [];
    // 我们获得一个连接 - 该连接自动关联一个socket对象
    sock.name = sock.remoteAddress + ':' + sock.remotePort;
    app.logger.debug({
      sockName: sock.name,
    }, 'sock.connect');
    app.serverClientList.push(sock);

    let userOnlineInfo = {
      remoteAddress: sock.remoteAddress,
      remotePort: sock.remotePort,
      remoteClient: sock.name,
      online: true,
    };
    app.models.UserOnline.upsert(userOnlineInfo);

    // 为这个socket实例添加一个"data"事件处理函数
    sock.on('data', function(data) {
      let reportType = commandHelper.reportType(data);
      let checkSumVal = commandHelper.userCheckSum(data);
      let dataStr = commandHelper.buf2string(data);
      let checkVal = data.readUInt8(data.length - 2);
      if (checkSumVal !== checkVal) {
        app.logger.error({
          data: dataStr,
          dataStr: data.toString(),
          checkSumVal,
          checkVal,
        }, '用户端上报的校验码不对，非法指令!');
        app.serverClientList[0].write('112233');
        return;
      }
      if (reportType === 'userHeartBeat') {
        let length = data.readUInt8(2); // 长度
        let userId = '';
        for (let index = 3; index < 8; index++) {
          let value = commandHelper.zerofill(data, index);
          userId = userId + '' + value;
        }
        userId = parseInt(userId, 16); // 16进制转10进制
        let deviceId = '';
        for (let index = 8; index < 15; index++) {
          let value = commandHelper.zerofill(data, index);
          deviceId = deviceId + '' + value;
        }
        app.logger.debug({
          data,
          dataStr,
          userId,
          deviceId,
          sockName: sock.name,
          remoteAddress: sock.remoteAddress,
          remotePort: sock.remotePort,
        }, 'sock.on.data');
        updateUserOnlineInfo(userId, deviceId, sock.remoteAddress, sock.remotePort, sock.name);
      }
    });

    // 为这个socket实例添加一个"close"事件处理函数
    sock.on('close', function(data) {
      app.logger.debug({
        remoteAddress: sock.remoteAddress,
        remotePort: sock.remotePort,
        remoteClient: sock.name,
        data,
      }, 'sock.on.close');
      var name = sock.remoteAddress + ':' + sock.remotePort;
      removeByValue(name);
      app.models.UserOnline.destroyById(sock.name)
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
    });

    // 数据错误事件
    sock.on('error', function(exception) {
      app.logger.debug({
        exception,
      }, 'sock.on.error');
      sock.end();
    });
  }).listen(PORT);

  // 服务器监听事件
  server.on('listening', function() {
    app.logger.debug({
      port: server.address().port,
    }, 'server.on.listening');
  });
  // 服务器错误事件
  server.on('error', function(exception) {
    app.logger.debug({
      exception,
    }, 'server.on.error');
  });
}

exports.startListener = startListener;

function updateUserOnlineInfo(userId, deviceId, remoteAddress, remotePort, sockName) {
  if (typeof deviceId !== 'string') {
    deviceId = commandHelper.zerofillNum(deviceId, 14);
  }
  app.models.UserOnline.findById(sockName)
  .then((userOnline) => {
    if (!userOnline) {
      let userOnlineInfo = {
        remoteAddress,
        remotePort,
        remoteClient: sockName,
        userId,
        deviceId,
        online: true,
      };
      return app.models.UserOnline.upsert(userOnlineInfo);
    }
    var deviceInfo = {};
    deviceInfo.userId = userId;
    deviceInfo.deviceId = deviceId;
    app.logger.debug({
      deviceInfo,
    }, 'updateDeviceInfo.deviceInfo');
    return userOnline.updateAttributes(deviceInfo);
  })
  .then((userOnline) => {
    app.logger.debug({
      userOnline,
    }, 'updateUserOnlineInfo.device');
  })
  .catch((error) => {
    app.logger.error({
      error,
    }, 'updateUserOnlineInfo.error');
  });
}

function removeByValue(clientName) {
  for (var index = 0; index < app.serverClientList.length; index++) {
    if (app.serverClientList[index].name === clientName) {
      app.serverClientList.splice(index, 1);
    }
  }
}

function sendCommand(deviceId, commandBuf) {
  if (!app.serverClientList || app.serverClientList <= 0) {
    app.logger.error({
      error: '未找到联网的设备！',
    }, 'tcp-server-app.sendCommand.error');
    return;
  }

  app.models.Device.findById(deviceId)
  .then((device) => {
    app.logger.debug({
      deviceId,
      device,
    }, 'Device.findById');
    if (!device) {
      return Promise.reject(Boom.badRequest('未找到该设备!'));
    }
    let gameAppUserId = device.gameAppUserId;
    return app.models.UserOnline.find({
      where: {
        deviceId,
      },
      order: 'id DESC',
    }).then((userOnlines) => {
      if (!userOnlines || userOnlines.length <= 0) {
        return Promise.reject(Boom.badRequest('未找到在线用户!'));
      }
      for (var x = 0; x < userOnlines.length; x++) {
        let remoteClient = userOnlines[x].remoteClient;
        let index = 0;
        app.serverClientList.forEach(function(client) {
          if (client.name === remoteClient) {
            client.write(commandBuf);
            app.logger.debug({
              client: client.name,
              commandBuf,
            }, 'sendCommand.client.commandBuf');
          } else if (index === app.serverClientList.length - 1) {
            app.logger.error({
              error: Boom.badRequest('未找到对应的联网的设备！'),
            }, 'tcp-server-app.ServiceClientList.find.error');
          }
          index++;
        });
      }
    });
  })
  .catch((error) => {
    app.logger.error({
      error,
    }, 'tcp-server-app.Device.findById.error');
  });
};

exports.sendCommand = sendCommand;

function getServerClientList() {
  return app.serverClientList;
}

exports.getServerClientList = getServerClientList;
