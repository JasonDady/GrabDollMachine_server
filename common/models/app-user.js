'use strict';

const serverToken = require('../../server/lib/token');
const modelConfig = require('../../server/lib/loopback-model-config');
const uuid = require('node-uuid');
const Promise = require('bluebird');
const tcpServer = require('../../server/lib/tcp-server');
const createPromiseCallback = require('../../server/lib/createPromiseCallback');
const Boom = require('loopback-boom');
const moment = require('moment');
const utils = require('../../server/lib/utils');

const DEFAULT_TTL = 1209600; // 2 weeks in seconds

module.exports = function(AppUser) {
  modelConfig.disableCUDMethods(AppUser);
  modelConfig.disableMethods(AppUser, 'CDRU');
  modelConfig.disableRelationMethods(AppUser, 'accessTokens', 'CUDL');
  modelConfig.disableRelationMethods(AppUser, 'address', 'CUDL');
  modelConfig.disableRelationMethods(AppUser, 'device', 'CUDL');
  modelConfig.disableRelationMethods(AppUser, 'Order', 'CUDL');

  // AppUser.prototype.findAllGrabRecord = function(callback) {
  //   callback = callback || createPromiseCallback();
  //   let self = this;
  //   if (self.id !== 1 && self.userType !== 2) {
  //     return callback(Boom.badRequest('你不是超级管理员，无权设置用户类型！'));
  //   }
  //   AppUser.app.models.Order.find({
  //     include: ['device', 'appUser'],
  //   })
  //   .then((orders) => callback(null, orders))
  //   .catch((error) => {
  //     AppUser.app.logger.error({
  //       error,
  //     }, 'findAllGrabRecord.error');
  //     callback(error);
  //   });
  // };

  // AppUser.remoteMethod('findAllGrabRecord', {
  //   description: '管理员查看抓取记录.',
  //   isStatic: false,
  //   accepts: [],
  //   returns: {
  //     arg: 'result',
  //     type: 'object',
  //     description: '抓取记录',
  //   },
  //   http: {
  //     verb: 'get',
  //   },
  // });
  AppUser.prototype.recordPaymentDeduction = function(callback) {
    callback = callback || createPromiseCallback();
    let self = this;
    AppUser.app.models.Order.find({
      where: {
        status: {
          inq: [0, 1, 3],
        },
        userId: self.id,
      },
      include: ['device', 'appUser'],
      order: 'createTime DESC',
    })
    .then(orders => callback(null, orders))
    .catch((error) => {
      AppUser.app.logger.error({
        error,
      }, 'recordPaymentDeduction.error');
      callback(error);
    });
  };

  AppUser.remoteMethod('recordPaymentDeduction', {
    description: '查询我充值扣费记录.',
    isStatic: false,
    accepts: [],
    returns: {
      arg: 'result',
      type: 'object',
      description: '我的充值和扣费记录',
    },
    http: {
      verb: 'get',
    },
  });

  AppUser.prototype.exchangeGameCurrency = function(orderId, callback) {
    callback = callback || createPromiseCallback();
    let self = this;
    AppUser.app.models.Order.findById(orderId)
    .then((order) => {
      if (!order || order.exchangeStatus === 1 || order.exchangeStatus === 2) {
        return Promise.reject(Boom.badRequest('订单不存在,或者已兑换过！'));
      } else if (order.status !== 1) {
        return Promise.reject(Boom.badRequest('订单没有抓取成功，无法兑换金币！'));
      }
      let nOrderInfo = {
        exchangeStatus: 2,
      };
      return order.updateAttributes(nOrderInfo)
      .then((nOrder) => {
        let nAppUserInfo = {
          gameCurrency: self.gameCurrency + nOrder.price,
        };
        return self.updateAttributes(nAppUserInfo);
      });
    })
    .then((userInfo) => {
      AppUser.app.logger.debug({
        userInfo,
      }, 'exchangeGameCurrency.result');
      callback(null, userInfo);
    })
    .catch((error) => {
      AppUser.app.logger.error({
        error,
      }, 'exchangeGameCurrency.error');
      callback(error);
    });
  };

  AppUser.remoteMethod('exchangeGameCurrency', {
    description: '兑换金币.',
    isStatic: false,
    accepts: [{
      arg: 'orderId',
      type: 'string',
      required: true,
      description: '订单ID',
    }],
    returns: {
      arg: 'result',
      type: 'object',
      description: '最新的用户信息',
    },
    http: {
      verb: 'post',
    },
  });

  AppUser.prototype.queryMyWinningGrabRecord = function(callback) {
    callback = callback || createPromiseCallback();
    let self = this;
    AppUser.app.models.Order.find({
      where: {
        status: 1,
        userId: self.id,
      },
      include: ['device', 'appUser'],
      order: 'createTime DESC',
    })
    .then(orders => callback(null, orders))
    .catch((error) => {
      AppUser.app.logger.error({
        error,
      }, 'queryMyWinningGrabRecord.error');
      callback(error);
    });
  };

  AppUser.remoteMethod('queryMyWinningGrabRecord', {
    description: '查询我成功抓取的记录.',
    isStatic: false,
    accepts: [],
    returns: {
      arg: 'result',
      type: 'object',
      description: '我成功抓取的记录',
    },
    http: {
      verb: 'get',
    },
  });

  AppUser.prototype.queryMyFailGrabRecord = function(callback) {
    callback = callback || createPromiseCallback();
    let self = this;
    AppUser.app.models.Order.find({
      where: {
        status: 0,
        userId: self.id,
      },
      include: ['device', 'appUser'],
      order: 'createTime DESC',
    })
    .then(orders => {
      AppUser.app.logger.debug({
        orders,
      }, 'queryMyFailGrabRecord.orders');
      callback(null, orders);
    })
    .catch((error) => {
      AppUser.app.logger.error({
        error,
      }, 'queryMyFailGrabRecord.error');
      callback(error);
    });
  };

  AppUser.remoteMethod('queryMyFailGrabRecord', {
    description: '查询我失败的抓取记录.',
    isStatic: false,
    accepts: [],
    returns: {
      arg: 'result',
      type: 'object',
      description: '我失败的抓取记录',
    },
    http: {
      verb: 'get',
    },
  });

  AppUser.prototype.deviceGrabRecord = function(deviceId, callback) {
    callback = callback || createPromiseCallback();
    let self = this;

    AppUser.app.models.Order.find({
      where: {
        deviceId,
      },
      include: ['device', 'appUser'],
      order: 'createTime DESC',
    })
    .then((orders) => callback(null, orders))
    .catch((error) => {
      AppUser.app.logger.error({
        error,
      }, 'deviceGrabRecord.error');
      callback(error);
    });
  };

  AppUser.remoteMethod('deviceGrabRecord', {
    description: '设备抓取记录.',
    isStatic: false,
    accepts: [{
      arg: 'deviceId',
      type: 'string',
      required: true,
      description: '设备ID',
    }],
    returns: {
      arg: 'result',
      type: 'object',
      description: '抓取记录',
    },
    http: {
      verb: 'get',
    },
  });

  AppUser.prototype.myGrabRecord = function(status, isShowUserInfo, callback) {
    callback = callback || createPromiseCallback();
    let self = this;
    let filter = {
      userId: self.id,
    };
    if (status === 1) {
      filter.status = 0;
    } else if (status === 2) {
      filter.status = 1;
    } else {
      filter.status = {
        inq: [0, 1],
      };
    }
    AppUser.app.logger.debug({
      status,
      isShowUserInfo,
      filter,
    }, 'myGrabRecord.params');
    AppUser.app.models.Order.find({
      where: filter,
      include: ['device', 'appUser'],
      order: 'createTime DESC',
    })
    .then((orders) => {
      let result = {
        orders: orders || [],
      };
      if (isShowUserInfo) {
        result.userId = self.id;
        result.mobile = self.mobile;
        result.nickName = self.nickName;
        result.avatarUrl = self.avatarUrl;
        result.type = self.id === 1 ? 2 : self.userType;
        result.gameCurrency = self.gameCurrency;
      }
      AppUser.app.logger.debug({
        result,
      }, 'myGrabRecord.result');
      callback(null, result);
    })
    .catch((error) => {
      AppUser.app.logger.error({
        error,
      }, 'myGrabRecord.error');
      callback(error);
    });
  };

  AppUser.remoteMethod('myGrabRecord', {
    description: '我的抓取记录.',
    isStatic: false,
    accepts: [{
      arg: 'status',
      type: 'number',
      required: false,
      description: '我的抓取记录 0 - 所有 1 - 失败 2 - 成功',
    }, {
      arg: 'isShowUserInfo',
      type: 'number',
      required: false,
      description: '是否显示用户信息 0 - 不显示 1 - 显示',
    }],
    returns: {
      arg: 'result',
      type: 'object',
      description: '抓取记录',
    },
    http: {
      verb: 'get',
    },
  });

  AppUser.prototype.confirmDeliveryAddress = function(addressId, orderId, callback) {
    callback = callback || createPromiseCallback();
    let self = this;

    Promise.all([AppUser.app.models.Address.findById(addressId), AppUser.app.models.Order.findById(orderId)])
    .then((results) => {
      let address = results[0];
      let order = results[1];
      if (!address) {
        return Promise.reject(Boom.badRequest('未找到相关的地址！'));
      }
      AppUser.app.logger.debug({
        address,
        order,
      }, 'confirmDeliveryAddress.address.order');
      if (!order || order.exchangeStatus === 1 || order.exchangeStatus === 2) {
        return Promise.reject(Boom.badRequest('未找到相关的订单,或该订单已兑换！'));
      } else if (order.status !== 1) {
        return Promise.reject(Boom.badRequest('订单没有抓取成功，无法兑换金币！'));
      }
      let orderInfo = {
        address: address.address,
        mobile: address.mobile,
        username: address.username,
        exchangeStatus: 1,
      };
      return order.updateAttributes(orderInfo);
    })
    .then((orderInfo) => callback(null, orderInfo))
    .catch((error) => {
      AppUser.app.logger.error({
        error,
      }, 'confirmDeliveryAddress.error');
      callback(error);
    });
  };

  AppUser.remoteMethod('confirmDeliveryAddress', {
    description: '确定送货地址.',
    isStatic: false,
    accepts: [{
      arg: 'addressId',
      type: 'string',
      required: true,
      description: '地址ID',
    }, {
      arg: 'orderId',
      type: 'string',
      required: true,
      description: '订单ID',
    }],
    returns: {
      arg: 'result',
      type: 'object',
      description: '订单信息',
    },
    http: {
      verb: 'post',
    },
  });

  AppUser.prototype.deleteAddressInfo = function(addressId, callback) {
    callback = callback || createPromiseCallback();
    let self = this;
    AppUser.app.models.Address.destroyById(addressId)
    .then((res) => {
      if (res.count === 0) {
        return Promise.reject('该地址已被删除！');
      }
      callback(null, {errorCode: 0, errorMsg: '删除该地址成功！'});
    })
    .catch((error) => {
      AppUser.app.logger.error({
        error,
      }, 'deleteAddressInfo.error');
      callback(error);
    });
  };

  AppUser.remoteMethod('deleteAddressInfo', {
    description: '删除地址.',
    isStatic: false,
    accepts: [
      {
        arg: 'addressId',
        type: 'string',
        required: true,
        description: '地址ID',
      },
    ],
    returns: {
      arg: 'result',
      type: 'object',
      description: '{errorCode: 0, errorMsg: "删除该地址成功！"}',
    },
    http: {
      verb: 'post',
    },
  });

  AppUser.prototype.__editAddressInfo = function(addressId, username, mobile, address, isDefault) {
    return AppUser.app.models.Address.findById(addressId)
      .then((addressInfo) => {
        let nAddressInfo = {
          username,
          mobile,
          address,
          isDefault: isDefault,
        };
        return addressInfo.updateAttributes(nAddressInfo);
      });
  };

  AppUser.prototype.editAddressInfo = function(addressId, username, mobile, address, isDefault, callback) {
    callback = callback || createPromiseCallback();
    let self = this;
    let userId = self.id;
    if (isDefault) { // 如果是默认的地址，则将其他默认地址置为非默认
      AppUser.app.models.Address.findOne({
        where: {
          userId,
          isDefault: true,
        },
      })
      .then((addressInfo) => {
        AppUser.app.logger.debug({
          addressInfo,
        }, 'editAddressInfo.fineOne');
        if (addressInfo) {
          return addressInfo.updateAttribute('isDefault', false);
        }
        return Promise.resolve();
      })
      .then(() => self.__editAddressInfo(addressId, username, mobile, address, isDefault))
      .then((addressInfo) => callback(null, addressInfo))
      .catch((error) => {
        AppUser.app.logger.error({
          error,
        }, 'editAddressInfo.findOne.error');
        callback(error);
      });
    } else {
      self.__editAddressInfo(addressId, username, mobile, address, isDefault)
      .then((addressInfo) => callback(null, addressInfo))
      .catch((error) => {
        AppUser.app.logger.error({
          error,
        }, 'editAddressInfo.error');
        callback(error);
      });
    }
  };

  AppUser.remoteMethod('editAddressInfo', {
    description: '编辑地址.',
    isStatic: false,
    accepts: [
      {
        arg: 'addressId',
        type: 'string',
        required: true,
        description: '地址ID',
      },
      {
        arg: 'username',
        type: 'string',
        required: true,
        description: '用户名',
      },
      {
        arg: 'mobile',
        type: 'string',
        required: true,
        description: '手机号码',
      },
      {
        arg: 'address',
        type: 'string',
        required: true,
        description: '联系地址',
      },
      {
        arg: 'isDefault',
        type: 'boolean',
        required: true,
        description: '是否默认',
      },
    ],
    returns: {
      arg: 'addressInfo',
      type: 'object',
      description: '地址信息',
    },
    http: {
      verb: 'post',
    },
  });

  AppUser.prototype.__addAddressInfo = function(userId, username, mobile, address, isDefault) {
    let addressInfo = {
      username,
      mobile,
      address,
      isDefault: isDefault,
      userId,
    };
    return AppUser.app.models.Address.create(addressInfo);
  };

  AppUser.prototype.addAddressInfo = function(username, mobile, address, isDefault, callback) {
    callback = callback || createPromiseCallback();
    let self = this;
    let userId = self.id;
    if (isDefault) { // 如果是默认的地址，则将其他默认地址置为非默认
      AppUser.app.models.Address.findOne({
        where: {
          userId,
          isDefault: true,
        },
      })
      .then((addressInfo) => {
        AppUser.app.logger.debug({
          addressInfo,
        }, 'addAddressInfo.fineOne');
        if (addressInfo) {
          return addressInfo.updateAttribute('isDefault', false);
        }
        return Promise.resolve();
      })
      .then(() => self.__addAddressInfo(userId, username, mobile, address, isDefault))
      .then((addressInfo) => callback(null, addressInfo))
      .catch((error) => {
        AppUser.app.logger.error({
          error,
        }, 'addAddressInfo.findOne.error');
        callback(error);
      });
    } else {
      self.__addAddressInfo(userId, username, mobile, address, isDefault)
      .then((addressInfo) => callback(null, addressInfo))
      .catch((error) => {
        AppUser.app.logger.error({
          error,
        }, 'addAddressInfo.error');
        callback(error);
      });
    }
  };

  AppUser.remoteMethod('addAddressInfo', {
    description: '创建地址.',
    isStatic: false,
    accepts: [
      {
        arg: 'username',
        type: 'string',
        required: true,
        description: '用户名',
      },
      {
        arg: 'mobile',
        type: 'string',
        required: true,
        description: '手机号码',
      },
      {
        arg: 'address',
        type: 'string',
        required: true,
        description: '联系地址',
      },
      {
        arg: 'isDefault',
        type: 'boolean',
        required: true,
        description: '是否默认',
      },
    ],
    returns: {
      arg: 'addressInfo',
      type: 'object',
      description: '地址信息',
    },
    http: {
      verb: 'post',
    },
  });

  AppUser.prototype.getUserInfo = function(callback) {
    callback = callback || createPromiseCallback();
    let self = this;
    AppUser.app.logger.debug({
      self,
    }, '用户信息');
    let result = {
      userId: self.id,
      mobile: self.mobile,
      nickName: self.nickName,
      avatarUrl: self.avatarUrl,
      type: self.id === 1 ? 2 : self.userType,
      gameCurrency: self.gameCurrency,
    };
    callback(null, result);
  };

  AppUser.remoteMethod('getUserInfo', {
    description: '获取用户信息.',
    isStatic: false,
    accepts: [],
    returns: {
      arg: 'userInfo',
      type: 'object',
      root: true,
      description: '用户信息',
    },
    http: {
      verb: 'get',
    },
  });

  // AppUser.prototype.setUserType = function(mobile, userType, callback) {
  //   callback = callback || createPromiseCallback();
  //   let self = this;
  //   AppUser.app.logger.debug({self, mobile}, '用户信息');
  //   if (self.id !== 1 && self.userType !== 2) {
  //     return callback(Boom.badRequest('你不是超级管理员，无权设置用户类型！'));
  //   }
  //   AppUser.findOne({
  //     where: {
  //       mobile: mobile,
  //     },
  //   })
  //   .then((user) => {
  //     AppUser.app.logger.debug({user}, '用户信息');
  //     if (!user) {
  //       return Promise.reject(Boom.badRequest('用户不存在！'));
  //     }
  //     return user.updateAttribute('userType', userType);
  //   })
  //   .then((appUser) => {
  //     callback(null, appUser);
  //   })
  //   .catch((error) => {
  //     AppUser.app.logger.error({error}, 'setUserType.error');
  //     callback(error);
  //   });
  // };

  // AppUser.remoteMethod('setUserType', {
  //   description: '设置用户类型.',
  //   isStatic: false,
  //   accepts: [
  //     {
  //       arg: 'mobile',
  //       type: 'string',
  //       required: true,
  //       description: '手机号码',
  //     },
  //     {
  //       arg: 'userType',
  //       type: 'number',
  //       required: true,
  //       description: '用户类型 0 - 普通用户 1 - 管理员 2 - 超级管理员'
  //     },
  //   ],
  //   returns: {
  //     arg: 'result',
  //     type: 'object',
  //     root: true,
  //     description: '成功信息',
  //   },
  //   http: {
  //     verb: 'post',
  //   },
  // });

  AppUser.prototype.startDevice = function(deviceId, callback) {
    callback = callback || createPromiseCallback();
    let self = this;
    AppUser.app.models.Device.findById(deviceId)
    .then((device) => {
      // return AppUser.beginTransaction({
      //   isolationLevel: 'READ UNCOMMITTED',
      //   timeout: 5000,
      // })
      // .then((tx) => {
      if (device) {
        let status = device.status;
        if (status === 1) {
          return Promise.reject(Boom.badRequest('该设备正在使用中！'));
        }
        if (self.gameCurrency < device.price) {
          return Promise.reject(Boom.badRequest('游戏币数量不够，请充值！'));
        }
        let userId = self.id;
        let nDeviceInfo = {
          gameAppUserId: userId,
          status: 1,
        };
        return device.updateAttributes(nDeviceInfo)
        // return device.updateAttributes(nDeviceInfo, {transaction: tx})
        .then((deviceInfo) => {
          let command = {
            'gameState': 1,
          };
          return tcpServer.sendCommand(deviceInfo.sockName, command, userId);
        })
        .then((res) => {
          let orderInfo = {
            orderNo: moment().format('YYYYMMDDHHmmss') + userId,
            price: device.price,
            createTime: new Date(),
            deviceId: device.deviceId,
            dollType: device.name,
            userId,
          };
          AppUser.app.logger.debug({
            orderInfo,
            device,
          }, 'orderInfo');
          return AppUser.app.models.Order.upsert(orderInfo)
          .then((order) => {
            AppUser.app.logger.debug({
              order,
              device,
            }, 'Order.upsert');
            return device.updateAttribute('currentOrderId', order.id);
          })
          .then((device) => {
            self.updateAttributes({
              gameCurrency: self.gameCurrency - device.price,
            });
          });
          // return AppUser.app.models.Order.upsert(orderInfo, {transaction: tx});
        })
        .catch((error) => {
          device.updateAttribute('status', 0);
          return Promise.reject(error);
        });
        // .then(() => {
          // tx.commit();
          // return Promise.resolve();
        // })
        // .catch((error) => {
          // tx.rollback();
          // return Promise.reject(error);
        // });
      } else {
        return Promise.reject(Boom.badRequest('未找到该设备！'));
      }
      // });
    })
    .then(order => callback(null, order))
    .catch((error) => {
      AppUser.app.logger.error({
        error,
      }, 'startDevice.error');
      callback(error);
    });
  };

  AppUser.remoteMethod('startDevice', {
    description: '启动设备.',
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
      description: '{"success": "boolean", "status": "int", "result": "object"}',
    },
    http: {
      verb: 'post',
    },
  });

  AppUser.prototype.queryDeviceStatus = function(deviceId, callback) {
    callback = callback || createPromiseCallback();
    let self = this;
    AppUser.app.models.Device.findById(deviceId)
    .then((device) => {
      if (device) {
        let userId = self.id;
        let command = {
          'gameState': 255,
        };
        return tcpServer.sendCommand(device.sockName, command, userId);
      }
      return Promise.reject(Boom.badRequest('未找到该设备！'));
    })
    .then((res) => {
      AppUser.app.logger.debug({
        res,
      }, 'queryDeviceStatus.sendCommand');
      AppUser.app.models.Device.findById(deviceId)
      .then((device) => {
        callback(null, device);
      });
    })
    .catch((error) => {
      AppUser.app.logger.error({error}, 'queryDeviceStatus.error');
      callback(error);
    });
  };

  AppUser.remoteMethod('queryDeviceStatus', {
    description: '查询设备状态.',
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
      description: '{"success": "boolean", "status": "int", "result": "object"}',
    },
    http: {
      verb: 'post',
    },
  });

  AppUser.prototype.sendCommandButtonState = function(btnState, deviceId, callback) {
    callback = callback || createPromiseCallback();
    let self = this;
    AppUser.app.models.Device.findById(deviceId)
    .then((device) => {
      if (device) {
        let userId = self.id;
        let command = {
          'gameState': 1,
          'buttonState': btnState,
        };
        return tcpServer.sendCommand(device.sockName, command, userId);
      } else {
        return Promise.reject(Boom.badRequest('未找到该设备！'));
      }
    })
    .then((res) => callback(null, res))
    .catch((error) => {
      AppUser.app.logger.error({
        error,
      }, 'sendCommandButtonState.error');
      callback(error);
    });
  };

  AppUser.remoteMethod('sendCommandButtonState', {
    description: '发送上、下、左、右、确定指令.',
    isStatic: false,
    accepts: [
      {
        arg: 'buttonState',
        type: 'number',
        required: true,
        description: '上1 下2 左3 右4 确定5',
      },
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
      description: '{"success": "boolean", "status": "int", "result": "object"}',
    },
    http: {
      verb: 'post',
    },
  });

  AppUser.prototype.sendCommand = function(command, deviceId, callback) {
    callback = callback || createPromiseCallback();
    let self = this;
    AppUser.app.models.Device.findById(deviceId)
    .then((device) => {
      if (device) {
        let userId = self.id;
        return tcpServer.sendCommand(device.sockName, command, userId);
      } else {
        return Promise.reject(Boom.badRequest('未找到该设备！'));
      }
    })
    .then((res) => callback(null, res))
    .catch((error) => {
      AppUser.app.logger.error({error}, 'sendCommand.error');
      callback(error);
    });
  };

  AppUser.remoteMethod('sendCommand', {
    description: '发送指令.',
    isStatic: false,
    accepts: [
      {
        arg: 'command',
        type: 'string',
        required: true,
        description: '指令值: 按键状态: {"buttonState":1} 激光开关 {"laserSwitch": 1} 0-关 1-开 游戏状态 {"gameState": 1} 抓力控制 {"graspingForceControl": 1}',
      },
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
      description: '{"success": "boolean", "status": "int", "result": "object"}',
    },
    http: {
      verb: 'post',
    },
  });

  AppUser.prototype.refreshToken = function(req, callback) {
    req.accessToken.updateAttribute('created', new Date(), callback);
  };

  AppUser.remoteMethod('refreshToken', {
    isStatic: false,
    description: 'refesh token.',
    accepts: [
      {
        arg: 'req',
        type: 'object',
        http: {
          source: 'req',
        },
      },
    ],
    returns: {
      arg: 'accessToken',
      type: 'object',
      root: true,
    },
    http: {
      verb: 'get',
    },
  });

  AppUser.loginByWechat = function(creds, callback) {
    AppUser.app.logger.debug({
      creds,
    }, 'loginByWechat.用户使用微信OPEN登录');

    callback = callback || createPromiseCallback();

    var defaultError = new Error('login failed');
    defaultError.statusCode = 401;
    defaultError.code = 'LOGIN_FAILED';

    if (!creds.code) return callback(defaultError);

    let self = this;
    utils.wechatlogin(creds.code)
    .then((res) => {
      AppUser.app.logger.error({
        res,
      }, 'loginByWechat.wechatlogin');
      return utils.getWechatUserInfo(res.access_token, res.openid);
    })
    .then((userInfo) => {
      AppUser.app.logger.error({
        userInfo,
      }, 'loginByWechat.getWechatUserInfo');
      AppUser.findOne({
        where: {
          openId: userInfo.openid,
        },
      })
      .then((result) => {
        AppUser.app.logger.debug({
          appuser: result,
        }, 'updateWechatUser.appuser');
        if (!result || result.length <= 0) {
          return AppUser.upsert({
            openId: userInfo.openid,
            email: require('md5')(userInfo.openid) + '@zwwj.com',
            password: uuid.v4().substring(0, 8),
            avatarUrl: userInfo.headimgurl,
            nickName: userInfo.nickname,
            unionid: userInfo.unionid,
            loginType: 1,
            sex: userInfo.sex,
            created: new Date(),
          });
        }
        return Promise.resolve(result);
      })
      .then(result => generateToken(result, callback));
    })
    .catch((err) => {
      AppUser.app.logger.error({
        err,
      }, 'loginByWechat.err');
      callback(err);
    });
  };

  AppUser.remoteMethod('loginByWechat', {
    description: 'login an user with wechat.',
    accepts: [{
      arg: 'creds',
      type: 'Object',
      required: true,
      http: {
        source: 'body',
      },
      description: '{"code": "string"}',
    }],
    returns: {
      arg: 'accessToken',
      type: 'Object',
      root: true,
      description: '{"created": "date", "id":"string", "ttl": "string", "userId": "string"}',
    },
    http: {
      verb: 'post',
    },
  });

  AppUser.loginByMobile = function(userInfo, callback) {
    const mobile = userInfo.mobile;
    const checkCode = userInfo.code;

    AppUser.app.models.CheckCode.validateVerifyCode(mobile, checkCode)
    .then(() => {
      AppUser.app.logger.debug({
        userInfo,
      }, 'loginByMobile.userInfo');
      return AppUser.findOne({
        where: {
          mobile: mobile,
        },
      })
      .then((result) => {
        AppUser.app.logger.debug({
          appuser: result,
        }, 'loginByMobile.appuser');
        if (!result || result.length <= 0) {
          return AppUser.upsert({
            mobile: mobile,
            email: mobile + '@zwwj.com',
            password: uuid.v4().substring(0, 8),
            loginType: 0,
            created: new Date(),
          });
        }
        return Promise.resolve(result);
      })
      .then(result => generateToken(result, callback));
    })
    .catch((error) => {
      AppUser.app.logger.error({
        error,
      }, 'loginByMobile.appuser.error');
      return callback(error);
    });
  };

  var generateToken = (appUser, callback) => {
    AppUser.app.logger.debug({
      appUser: appUser,
    }, 'generateToken.appuser');
    appUser.createAccessToken(DEFAULT_TTL, (err, token) => {
      AppUser.app.logger.debug({
        err: err,
        token: token,
      }, 'generateToken.createAccessToken');
      if (appUser.password) {
        delete appUser.password;
      }
      token.userInfo = appUser;
      callback(null, token);
    });
  };

  AppUser.remoteMethod('loginByMobile', {
    description: 'login an user with mobile and code.',
    accepts: [{
      arg: 'userInfo',
      type: 'Object',
      required: true,
      http: {
        source: 'body',
      },
      description: '{"mobile": "13012341234", "code":"1234"}',
    }],
    returns: {
      arg: 'accessToken',
      type: 'object',
      root: true,
      description: `{
        "created": "date",
        "id":"string",
        "ttl": "string",
        "userId": "string"
      }`,
    },
    http: {
      verb: 'post',
    },
  });

  AppUser.prototype.genPayArgs = function(req, totalFee, callback) {
    let self = this;
    AppUser.app.logger.debug({
      userInfo: self,
    }, 'genPayArgs.userInfo');
    utils.genPayInfo(AppUser.app, req, totalFee, self.id, callback);
  };

  AppUser.remoteMethod('genPayArgs', {
    isStatic: false,
    accepts: [{
      arg: 'req',
      type: 'object',
      http: {
        source: 'req',
      },
    }, {
      arg: 'totalFee',
      type: 'number',
      required: true,
      description: '支付金额',
    }],
    returns: {
      arg: 'payInfo',
      type: 'string',
      description: '返回的支付信息',
    },
    description: '生成订单的支付信息',
    http: {
      verb: 'post',
    },
  });
};
