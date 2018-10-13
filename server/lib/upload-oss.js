'use strict';

var co = require('co');
var OSS = require('ali-oss');
var config = require('../configuration');
var fs = require('fs');
var Verror = require('verror');

var upload = function(app, key, path, cb) {
  app.logger.debug({
    key,
    path,
  }, 'uplpad-oss.upload');
  if (!path) {
    return cb(new Verror('path不能为空'));
  }
  let client = new OSS({
    region: 'oss-cn-hangzhou',
    accessKeyId: config.accessKeyId,
    accessKeySecret: config.accessKeySecret,
    bucket: config.bucket,
  });
  co(function* () {
    var stream = fs.createReadStream(path);
    var result = yield client.putStream(key, stream);
    cb(null, result);
  }).catch(function(err) {
    cb(new Verror(err, 'OSS 上传文件失败'));
  });
};

exports = module.exports = upload;
