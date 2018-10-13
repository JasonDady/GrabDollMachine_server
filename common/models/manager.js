'use strict';
const modelConfig = require('../../server/lib/loopback-model-config');
const createPromiseCallback = require('../../server/lib/createPromiseCallback');
const Boom = require('loopback-boom');

module.exports = function(Manager) {
  modelConfig.disableCUDMethods(Manager);
  modelConfig.disableMethods(Manager, 'CDRU');
  modelConfig.disableRelationMethods(Manager, 'accessTokens', 'CUDL');

  Manager.prototype.unbindDevice = function(deviceId, callback) {
    callback = callback || createPromiseCallback();

    let self = this;
    Manager.app.logger.debug({
      self,
    }, 'bindDevice.self');

    Manager.app.models.Device.findById(deviceId)
    .then((device) => {
      if (!device) {
        return Promise.reject(Boom.badRequest('没有找到该设备！'));
      }
      if (device.status === 1) {
        return Promise.reject(Boom.badRequest('当前设备正在运行中！'));
      }
      let nDeviceInfo = {
        isRemoved: true,
        online: false,
      };
      return device.updateAttributes(nDeviceInfo);
    })
    .then((result) => {
      Manager.app.logger.error({
        result,
      }, 'unbindDevice.deviceInfo');
      callback(null, result);
    })
    .catch((err) => {
      Manager.app.logger.error({
        err,
      }, 'unbindDevice.error');
      callback(err);
    });
  };

  Manager.remoteMethod('unbindDevice', {
    description: '解绑设备.',
    isStatic: false,
    accepts: [
      {
        arg: 'deviceId',
        type: 'string',
        required: true,
        description: '设备ID',
      },
    ],
    returns: {
      arg: 'result',
      type: 'object',
      root: true,
      description: '设备信息',
    },
    http: {
      verb: 'post',
    },
  });

  Manager.prototype.bindDevice = function(deviceInfo, callback) {
    callback = callback || createPromiseCallback();

    let self = this;
    Manager.app.logger.debug({
      self,
    }, 'bindDevice.self');
    deviceInfo.isRemoved = false;
    deviceInfo.managerId = self.id;
    deviceInfo.createTime = new Date();
    deviceInfo.online = false;
    Manager.app.models.Device.upsert(deviceInfo)
    .then((result) => {
      Manager.app.logger.error({
        result,
      }, 'bindDevice.deviceInfo');
      callback(null, result);
    })
    .catch((err) => {
      Manager.app.logger.error({
        err,
      }, 'bindDevice.error');
      callback(err);
    });
  };

  Manager.remoteMethod('bindDevice', {
    description: '绑定设备.',
    isStatic: false,
    accepts: [
      {
        arg: 'deviceInfo',
        type: 'object',
        required: true,
        description: `{
          "deviceId": "AABBCCDDEEFF",
          "imageUrl": "图片地址",
          "name":"设备名称",
          "desc": "设备描述",
          "bodyLength": "体长",
          "price": "价格",
          "frontCameraUrl": "前置摄像头Url",
          "sideCameraUrl": "侧面摄像头Url"
        }`,
      },
    ],
    returns: {
      arg: 'result',
      type: 'object',
      root: true,
      description: '设备信息',
    },
    http: {
      verb: 'post',
    },
  });

  Manager.prototype.getAllUserInfo = function(skip, limit, callback) {
    callback = callback || createPromiseCallback();
    let self = this;
    Manager.app.logger.debug({
      skip,
      limit,
    }, 'Manager.getAllUserInfo');
    let userInfoResult = {};
    Manager.app.models.AppUser.find({
      skip,
      limit,
      order: 'id DESC',
    })
    .then((userInfos) => {
      userInfoResult.result = userInfos;
      return Manager.app.models.AppUser.count();
    })
    .then((count) => {
      userInfoResult.count = count;
      callback(null, userInfoResult);
    })
    .catch((error) => {
      Manager.app.logger.error({
        error,
      }, 'Manager.getAllUserInfo.error');
      callback(error);
    });
  };

  Manager.remoteMethod('getAllUserInfo', {
    description: '获取所有用户信息.',
    isStatic: false,
    accepts: [{
      arg: 'skip',
      type: 'Number',
      required: true,
      description: 'skip',
    }, {
      arg: 'limit',
      type: 'Number',
      required: true,
      description: 'limit',
    }],
    returns: {
      arg: 'result',
      root: true,
      type: 'object',
    },
    http: {
      verb: 'get',
    },
  });

  Manager.prototype.getAllOrderInfo = function(skip, limit, callback) {
    callback = callback || createPromiseCallback();
    let self = this;
    Manager.app.logger.debug({
      skip,
      limit,
    }, 'Manager.getAllOrderInfo');
    let orderInfoResult = {};
    Manager.app.models.Order.find({
      where: {
        status: 1,
        exchangeStatus: 1,
      },
      skip,
      limit,
      include: ['device', 'appUser'],
      order: 'createTime DESC',
    })
    .then((orderInfos) => {
      orderInfoResult.result = orderInfos;
      return Manager.app.models.Order.count({
        status: 1,
        exchangeStatus: 1,
      });
    })
    .then((count) => {
      orderInfoResult.count = count;
      callback(null, orderInfoResult);
    })
    .catch((error) => {
      Manager.app.logger.error({
        error,
      }, 'Manager.getAllOrderInfo.error');
      callback(error);
    });
  };

  Manager.remoteMethod('getAllOrderInfo', {
    description: '获取所有订单信息.',
    isStatic: false,
    accepts: [{
      arg: 'skip',
      type: 'Number',
      required: true,
      description: 'skip',
    }, {
      arg: 'limit',
      type: 'Number',
      required: true,
      description: 'limit',
    }],
    returns: {
      arg: 'result',
      root: true,
      type: 'object',
    },
    http: {
      verb: 'get',
    },
  });

  Manager.prototype.getAllDeviceInfo = function(skip, limit, callback) {
    callback = callback || createPromiseCallback();
    let self = this;
    Manager.app.logger.debug({
      skip,
      limit,
    }, 'Manager.getAllDeviceInfo');
    let deviceInfoResult = {};
    Manager.app.models.Device.find({
      where: {
        isRemoved: false,
      },
      skip,
      limit,
      order: 'createTime DESC',
    })
    .then((deviceInfos) => {
      deviceInfoResult.result = deviceInfos;
      return Manager.app.models.Device.count({
        isRemoved: false,
      });
    })
    .then((count) => {
      deviceInfoResult.count = count;
      callback(null, deviceInfoResult);
    })
    .catch((error) => {
      Manager.app.logger.error({
        error,
      }, 'Manager.getAllDeviceInfo.error');
      callback(error);
    });
  };

  Manager.remoteMethod('getAllDeviceInfo', {
    description: '获取设备信息.',
    isStatic: false,
    accepts: [{
      arg: 'skip',
      type: 'Number',
      required: true,
      description: 'skip',
    }, {
      arg: 'limit',
      type: 'Number',
      required: true,
      description: 'limit',
    }],
    returns: {
      arg: 'result',
      root: true,
      type: 'object',
    },
    http: {
      verb: 'get',
    },
  });

  Manager.prototype.setOrderDeliverGoodsStatus = function(orderId, deliverGoodsStatus, callback) {
    callback = callback || createPromiseCallback();
    let self = this;
    Manager.app.logger.debug({
      orderId,
      deliverGoodsStatus,
    }, 'Manager.setOrderDeliverGoodsStatus');
    Manager.app.models.Order.findById(orderId)
    .then((order) => {
      if (!order) {
        return Promise.reject(Boom.badRequest('该订单不存在！'));
      }
      return order.updateAttributes({
        deliverGoodsStatus,
      });
    })
    .then((order) => callback(null, order))
    .catch((error) => {
      Manager.app.logger.error({
        orderId,
        error,
      }, 'Manager.setOrderDeliverGoodsStatus.error');
      callback(error);
    });
  };

  Manager.remoteMethod('setOrderDeliverGoodsStatus', {
    description: '设置订单的发货状态.',
    isStatic: false,
    accepts: [{
      arg: 'orderId',
      type: 'string',
      required: true,
      description: '订单ID',
    }, {
      arg: 'deliverGoodsStatus',
      type: 'string',
      required: true,
      description: '订单的发货状态',
    }],
    returns: {
      arg: 'OrderInfo',
      type: 'Object',
      root: true,
    },
    http: {
      verb: 'post',
    },
  });
};
