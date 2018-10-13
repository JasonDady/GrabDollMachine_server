/* jslint node : true */
'use strict';
const protocol = require('./protocol');

// 将buffer转成接口所需要的逗号分隔字符串
let buf2string = function(buf) {
  let result = '';
  for (let ii = 0; ii < buf.length; ii++) {
    result += buf.toString('hex', ii, ii + 1).toUpperCase() + ',';
  }
  return result.slice(0, -1);
};
exports.buf2string = buf2string;

// 将接口所提供的逗号分隔字符串转换成buffer
let string2buf = function(str) {
  let newStr = str.replace(/[,\s]/g, '');
  return new Buffer(newStr, 'hex');
};
exports.string2buf = string2buf;

// 计算buffer的校验位
let checkSum = function(hexCmdBuf) {
  let checkSum = 0;
  for (let i = 1; i < hexCmdBuf.length - 3; i++) {
    let bufVal = hexCmdBuf.readUInt8(i);
    checkSum += bufVal;
  }
  let lowVal = checkSum & 0xFF; // 低字节位
  let highVal = (checkSum >> 8) & 0xFF; // 高字节位
  let resultVal = {
    low: lowVal,
    high: highVal,
  };
  console.log('resultVal: ', resultVal);
  return resultVal;
};

exports.checkSum = checkSum;

let userCheckSum = function(hexCmdBuf) {
  var checkSum = 0;
  console.log('checkSum', hexCmdBuf);
  for (var i = 1; i < hexCmdBuf.length - 2; i++) {
    checkSum += hexCmdBuf.readUInt8(i);
  }
  return ((~checkSum) + 1) & 0x00FF;
};
exports.userCheckSum = userCheckSum;

let zerofill = function(data, index) {
  var value = data.readUInt8(index).toString(16);
  if (value.length <= 1) {
    value = '0' + value;
  }
  return value;
};

exports.zerofill = zerofill;

/**
 * 将num前补0，返回固定长度的字符串
 * @param {*} num
 * @param {*} length
 */
let zerofillNum = function(num, length) {
  return (Array(length).join('0') + num).slice(-length);
};
exports.zerofillNum = zerofillNum;

let reportType = function(buf) {
  if (buf.readUInt8(1) === 0x80) {
    return 'heartbeat'; // 心跳联系
  } else if (buf.readUInt8(1) === 0x81) {
    return 'control';   // 控制
  } else if (buf.readUInt8(1) === 0x84) {
    if (buf.readUInt8(2) === 0x02) {
      return 'settingParams'; // 设置参数
    } else if (buf.readUInt8(2) === 0x03) {
      return 'queryParams';   // 查询参数
    } else if (buf.readUInt8(2) === 0x04) {
      return 'queryAccount'; // 查询账目
    } else if (buf.readUInt8(2) === 0x05) {
      return 'accountCleared'; // 账目清零
    } else if (buf.readUInt8(2) === 0x06) {
      return 'restoreDefaultSettings'; // 恢复默认设置
    }
  } else if (buf.readUInt8(1) === 0xCA) {
    return 'userHeartBeat'; // 用户端心跳
  }
  return;
};
exports.reportType = reportType;

// 将第三方的json格式控制指令转换为二进制协议；
/**
 * !!!重要!!! 目前假定协议字段无超过8bits的。如该假定失效，代码需做相应修改
 * @param {string | object} 第三方的json格式指令，以字符串形式或对象形式传入
 * @param {object} 第三方相应的协议格式定义
 * @returns {Buffer} 转换后的buffer类型
 */
let json2hexCmd = function(jsonStringOrObject) {
  let hexCmdBuf = new Buffer(protocol.controlBuf);
  let jsonObj = null;
  if (typeof jsonStringOrObject === 'string') {
    jsonObj = JSON.parse(jsonStringOrObject);
  } else {
    jsonObj = JSON.parse(JSON.stringify(jsonStringOrObject));
  }
  for (let key in jsonObj) {
    if (key === 'gameState') {  // 游戏状态
      hexCmdBuf[3] = jsonObj[key];
    } else if (key === 'laserSwitch') { // 激光开关
      hexCmdBuf[4] = jsonObj[key];
    } else if (key === 'buttonState') {  // 按键状态
      hexCmdBuf[5] = jsonObj[key];
    } else if (key === 'graspingForceControl') { // 抓力控制
      hexCmdBuf[6] = jsonObj[key];
    }
  }
  let checkSumVal = checkSum(hexCmdBuf);
  hexCmdBuf[hexCmdBuf.length - 3] = checkSumVal.low;
  hexCmdBuf[hexCmdBuf.length - 2] = checkSumVal.high;
  console.log('hexCmdBuf length:' + hexCmdBuf.length + ' -- ' + checkSumVal.low + ' -- ' + checkSumVal.high);
  console.log('hexCmdBuf: ', hexCmdBuf);
  return hexCmdBuf;
};

exports.json2hexCmd = json2hexCmd;

let queryHexCmd = function(protocol) {
  return new Buffer(protocol.queryBuf);
};

exports.queryHexCmd = queryHexCmd;

// 将设备回复的状态指令转换为json格式
let hex2jsonStatus = function(hexStatusString, statusSpec) {
  hexStatusString = 'aa,29,db,00,00,00,00,00,00,04,04,01,06,00,00,05,20,04,03,00,00,01,01,02,3b,00,20,58,01,00,00,00,00,00,00,00,00,00,00,00,00,0a';
  let hexStatusBuf = string2buf(hexStatusString);
  let jsonStatus = {};
  return null;
};
exports.hex2jsonStatus = hex2jsonStatus;

// let json = {'gameState': 1, 'laserSwitch': 1, 'buttonState': 0, 'graspingForceControl': 1};
// json2hexCmd(json);
