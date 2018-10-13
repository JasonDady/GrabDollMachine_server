'use strict';

const Promise = require('bluebird');
const moment = require('moment');

var getOrderNum = (redis) => {
  const now = moment();
  let key = moment(now).format('YYYYMMDD');
  let prefix = moment(now).format('YYYYMMDDHHmmss');
  return redis.incr(key)
  .then(num => {
    if (num == '1') {
      return redis.setex(key, 3600 * 24, num)
      .then(result => {
        return Promise.resolve(prefix + num);
      })
      .catch(error => {
        return Promise.reject(error);
      });
    } else {
      return Promise.resolve(prefix + num);
    }
  }, error => {
    return Promise.reject(error);
  });
};

exports = module.exports = getOrderNum;
