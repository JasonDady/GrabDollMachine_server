'use strict';
const crypto = require('crypto');

const range = function(start, end) {
  let array = [];
  for (let i = start; i < end; ++i) array.push(i);
  return array;
};

const createRandom = function(length) {
  return range(0, length).map(function() {
    return Math.floor(Math.random() * 10);
  }).join('');
};

exports.createRandom = createRandom;

function createToken(obj, timeout) {
  var obj2 = {
    data: obj, // payload
    created: parseInt(Date.now()), // token生成的时间的，单位秒
    exp: parseInt(timeout) || 10, //token有效期
  };
  console.log('obj2: ' + JSON.stringify(obj2));
  // payload信息
  var base64Str = Buffer.from(JSON.stringify(obj2), 'utf8').toString('base64');
  if (base64Str.length >= 64) {
    base64Str = base64Str.substring(0, 64);
  } else {
    base64Str = createRandom(64 - base64Str.length) + base64Str;
  }
  return base64Str;
}

exports.createToken = createToken;
