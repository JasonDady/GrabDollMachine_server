'use strict';

var net = require('net');
const app = require('../server');
const Promise = require('bluebird');
const Boom = require('loopback-boom');
const createPromiseCallback = require('../lib/createPromiseCallback');
const commandHelper = require('./protocol/command-helper');
const tcpServerUser = require('./tcp-server-user');
const moment = require('moment');

// var HOST = '116.62.20.155';
var PORT = 4010; // 设备端口

function startListener() {
  // 创建一个TCP服务器实例，调用listen函数开始监听指定端口
  // 传入net.createServer()的回调函数将作为”connection“事件的处理函数
  // 在每一个“connection”事件中，该回调函数接收到的socket对象是唯一的
  var server = net.createServer(function(sock) {
    app.clientList = [];
    // 我们获得一个连接 - 该连接自动关联一个socket对象
    sock.name = sock.remoteAddress + ':' + sock.remotePort;
    app.logger.debug({
      sockName: sock.name,
    }, 'sock.connect');
    app.clientList.push(sock);

    // 为这个socket实例添加一个"data"事件处理函数
    sock.on('data', function(data) {
      app.logger.debug({
        data,
      }, 'sock.on.data');
      if (!data || data.length < 5) {
        return;
      }
      let reportType = commandHelper.reportType(data);
      let checkSumVal = commandHelper.checkSum(data);
      let dataStr = commandHelper.buf2string(data);
      let lowVal = data.readUInt8(data.length - 3);
      let highVal = data.readUInt8(data.length - 2);
      if (checkSumVal.low !== lowVal &&
        checkSumVal.high !== highVal) {
        app.logger.error({
          data: dataStr,
        }, '校验码不对，非法指令');
        return;
      }
      if (reportType === 'heartbeat') {
        let length = data.readUInt8(2) - 1; // 长度
        let deviceId = '';
        for (let index = 3; index < 3 + length; index++) {
          let value = commandHelper.zerofill(data, index);
          deviceId = deviceId + '' + value;
        }
        let deviceStatus = data.readUInt8(data.length - 4);
        app.logger.debug({
          deviceId,
          deviceStatus,
          sockName: sock.name,
        }, 'heartbeat.data');
        if (!app.clientList || app.clientList.length <= 0 || app.clientList.indexOf(sock) === -1) {
          app.logger.debug({
            clientList: app.clientList,
            sock,
          }, 'sock.on.data.appclientList');
          sock.name = sock.remoteAddress + ':' + sock.remotePort;
          app.clientList.push(sock);
        }
        updateDeviceInfo(deviceId, sock.name, deviceStatus);
      } else if (reportType === 'control') {
        // AA,81,0F,00,00,00,00,00,00,00,00,F4,08,01,5C,9D,32,1B,D3,02,AB
        let length = data.readUInt8(2);
        let status = data.readUInt8(3); // 0：空闲，1：游戏中，2：游戏结束
        let winningState = data.readUInt8(4); // 中奖状态 0：没有中奖，1：有中奖
        let faultWarn = data.readUInt8(5); // 机器故障 0 无
        let remainTime = data.readUInt8(6); // 剩余时间

        let deviceId = commandHelper.zerofill(data, 11) +
          commandHelper.zerofill(data, 12) +
          commandHelper.zerofill(data, 13) +
          commandHelper.zerofill(data, 14) +
          commandHelper.zerofill(data, 15) +
          commandHelper.zerofill(data, 16) +
          commandHelper.zerofill(data, 17);

        let deviceStatusAll = {
          status: status,
          winningState: winningState,
          faultWarn: faultWarn,
          remainTime: remainTime,
        };
        app.logger.debug({
          deviceStatusAll,
          deviceId,
        }, 'control.deviceStatusAll');
        updateDeviceStatus(deviceId, deviceStatusAll);
      }
    });

    // 为这个socket实例添加一个"close"事件处理函数
    sock.on('close', function(data) {
      app.logger.debug({
        remoteAddress: sock.remoteAddress,
        remotePort: sock.remotePort,
        data,
      }, 'sock.on.close');
      var name = sock.remoteAddress + ':' + sock.remotePort;
      app.models.Device.findOne({
        where: {
          sockName: name,
        },
      })
      .then((device) => {
        removeByValue(name);
        if (device) {
          let ndeviceInfo = {
            online: false,
          };
          return device.updateAttributes(ndeviceInfo);
        }
      })
      .catch((error) => {
        app.logger.debug({
          remoteAddress: sock.remoteAddress,
          remotePort: sock.remotePort,
          error,
        }, 'sock.on.close.error');
      });
    });

    // 数据错误事件
    sock.on('error', function(exception) {
      app.logger.debug({exception}, 'sock.on.error');
      let ndeviceInfo = {
        online: false,
      };
      app.models.Device.updateAll({online: true}, ndeviceInfo)
      .then((device) => {
        app.logger.debug({
          device,
        }, 'sock.on.error.device.updateAll.success');
      })
      .catch((error) => {
        app.logger.debug({
          error,
        }, 'sock.on.error.device.updateAll.error');
      });
      sock.end();
    });
  }).listen(PORT);

  // 服务器监听事件
  server.on('listening', function() {
    app.logger.debug({port: server.address().port}, 'server.on.listening');
  });
  // 服务器错误事件
  server.on('error', function(exception) {
    app.logger.debug({exception}, 'server.on.error');
    let ndeviceInfo = {
      online: false,
    };
    app.models.Device.updateAttributes(ndeviceInfo);
  });
}

exports.startListener = startListener;

function updateDeviceStatus(deviceId, deviceStatusAll) {
  app.models.Device.findById(deviceId)
  .then((device) => {
    if (!device) {
      return Promise.reject('未找到该设备！');
    }
    let ndeviceInfo = {
      status: deviceStatusAll.status,
      winningState: deviceStatusAll.winningState,
      faultWarn: deviceStatusAll.faultWarn,
      remainTime: deviceStatusAll.remainTime,
    };
    return device.updateAttributes(ndeviceInfo);
  })
  .then((device) => {
    app.logger.debug({
      device,
    }, 'updateDeviceStatus.device.updateAttributes');
    if (!device) {
      return Promise.reject('未找到该设备！');
    }
    if (device.status === 2) { // 游戏结束
      return app.models.Order.findById(device.currentOrderId)
      .then((order) => {
        let orderInfo = {
          orderNo: moment().format('YYYYMMDDHHmmss') + device.gameAppUserId,
          status: device.winningState,
          deviceId: device.deviceId,
          deliverGoodsStatus: 0,
        };
        if (order) {
          return order.updateAttributes(orderInfo);
        }
        orderInfo.createTime = new Date();
        orderInfo.price = device.price;
        orderInfo.userId = device.gameAppUserId;
        orderInfo.dollType = device.name;
        return app.models.Order.upsert(orderInfo);
      })
      .then(() => {
        let command = {
          'gameState': 3,
        };
        return sendCommand(device.sockName, command, null);
      });
    }
    return Promise.resolve(device);
  })
  .then((result) => {
    app.logger.debug({
      result,
    }, 'updateDeviceStatus.result');
    tcpServerUser.sendCommand(deviceId); // 向App用户端转发指令
  })
  .catch((error) => {
    app.logger.error({error}, 'updateDeviceStatus.error');
  });
}

function updateDeviceInfo(deviceId, sockName, deviceStatus) {
  app.models.Device.findById(deviceId)
  .then((device) => {
    if (!device) {
      return Promise.reject(Boom.badRequest('未找到该设备！'));
    }
    var deviceInfo = {};
    deviceInfo.status = deviceStatus;
    deviceInfo.online = true;
    deviceInfo.sockName = sockName;
    app.logger.debug({deviceInfo}, 'updateDeviceInfo.deviceInfo');
    return device.updateAttributes(deviceInfo);
  })
  .then((device) => {
    app.logger.debug({device}, 'updateDeviceInfo.device');
  })
  .catch((error) => {
    app.logger.error({error}, 'updateDeviceInfo.error');
  });
}

function removeByValue(clientName) {
  for (var index = 0; index < app.clientList.length; index++) {
    if (app.clientList[index].name === clientName) {
      app.clientList.splice(index, 1);
    }
  }
}

function sendCommand(deviceSockName, command, userId) {
  return new Promise((resolve, reject) => {
    if (!app.clientList || app.clientList.length <= 0) {
      return app.models.Device.find({
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
        return Promise.reject(Boom.badRequest('未找到联网的设备！'));
      })
      .catch((error) => {
        app.logger.error({
          error,
        }, 'updateDevice.error.online=>false');
        return reject(Boom.badRequest('未找到联网的设备！'));
      });
    }
    let commandBuf = commandHelper.json2hexCmd(command);
    let index = 0;
    app.clientList.forEach(function(client) {
      if (client.name === deviceSockName) {
        client.write(commandBuf);
        var res = {
          clientName: client.name,
          command: commandHelper.buf2string(commandBuf),
          errorCode: 0,
        };
        app.logger.debug({
          client: client.name,
          commandBuf,
          result: res,
        }, 'sendCommand.client.commandBuf');
        resolve(res);
      } else if (index === app.clientList.length - 1) {
        return reject(Boom.badRequest('未找到对应的联网的设备！'));
      }
      index++;
    });
  });
};

exports.sendCommand = sendCommand;

function getClientList() {
  return app.clientList;
}

exports.getClientList = getClientList;
