'use strict';

var net = require('net');

var HOST = '47.97.16.13';
// var HOST = 'localhost';
var PORT = 4011;

var client = new net.Socket();

var userInfoBuf = new Buffer([
  0xAA,      // header
  0xCA,      // Cmd CA 用户ID和设备ID上报,每隔1分钟上报一次
  0x0C,      // length 12位
  0x00,      // Data[0] 用户ID 1
  0x00,      // Data[1] 用户ID 2
  0x00,      // Data[2] 用户ID 3
  0x00,      // Data[3] 用户ID 4
  0x00,      // Data[4] 用户ID 5
  0x00,      // Data[0] 设备ID 1
  0x00,      // Data[1] 设备ID 2
  0x00,      // Data[2] 设备ID 3
  0x00,      // Data[3] 设备ID 4
  0x00,      // Data[4] 设备ID 5
  0x00,      // Data[5] 设备ID 6
  0x00,      // Data[6] 设备ID 7
  0x00,      // Check
  0xAB,      // end 13 [14-1]
]);

/**
 * @description 根据用户ID和设备ID获取当前信息
 * @param {*} userId
 * @param {*} deviceId
 */
function getUserInfoByUserIdAndDeviceId(userId, deviceId) {
  if (typeof userId === 'string') {
    userId = parseInt(userId); // 转int型
  }
  userId = userId.toString(16); // 转16进制
  userId = zerofill(userId, 10);
  var userIdBuf = string2buf(userId);
  for (var index = 0; index < userIdBuf.length; index++) {
    userInfoBuf[3 + index] = userIdBuf[index];
  }
  var deviceIdBuf = string2buf(deviceId);
  for (var y = 0; y < deviceIdBuf.length; y++) {
    userInfoBuf[8 + y] = deviceIdBuf[y];
  }
  var checkSumVal = checkSum(userInfoBuf);
  userInfoBuf[15] = checkSumVal;
  console.log('userInfoBuf: ', userInfoBuf);
}

function buf2string(buf) {
  var result = '';
  for (var ii = 0; ii < buf.length; ii++) {
    result += buf.toString('hex', ii, ii + 1).toUpperCase() + ',';
  }
  return result.slice(0, -1);
};

function checkSum(hexCmdBuf) {
  var checkSum = 0;
  for (var i = 1; i < hexCmdBuf.length - 2; i++) {
    checkSum += hexCmdBuf.readUInt8(i);
  }
  return ((~checkSum) + 1) & 0x00FF;
}

/**
 * 将num前补0，返回固定长度的字符串
 * @param {*} num
 * @param {*} length
 */
function zerofill(num, length) {
  return (Array(length).join('0') + num).slice(-length);
}

function string2buf(str) {
  let newStr = str.replace(/[,\s]/g, '');
  return new Buffer(newStr, 'hex');
}

client.connect(PORT, HOST, function() {
  console.log('Connect to Host: ' + HOST + ' ,port:' + PORT);
  var userId = '1';
  var deviceId = 'f40801709d349f';
  getUserInfoByUserIdAndDeviceId(userId, deviceId);
  client.write(userInfoBuf);
});

client.on('data', function(data) {
  let dataStr = buf2string(data);
  console.log('dataStr: ', dataStr);
  // 完全关闭连接
  // client.destroy();
});

client.on('error', function(error) {
  console.log('error:' + error);
});

client.on('close', function() {
  console.log('client close');
});
