/* jslint node : true */
'use strict';

var controlBuf = new Buffer([
  0xAA,      // header
  0x01,      // Cmd
  0x08,      // length
  0x00,      // Data[0]：游戏状态：0:空闲，1:游戏状态
  0x00,      // Data[1]：激光开关：0：关，1：开
  0x00,      // Data[2]：按键状态；0：没按下，1：上，2：下，3：左，4：右，5：确定（按键只有在游戏状态才处理）
  0x00,      // Data[3]：抓力控制：0：弱力，1：强力
  0x00,      // Data[4]：游戏剩余时间；
  0x00,      // Data[5]：保留；
  0x00,      // Data[6]：保留；
  0x00,      // Data[7]：保留；
  0x00,      // check 11 [14-3]
  0x00,      // Check 12 [14-2]
  0xAB,      // end   13 [14-1]
]);

exports.controlBuf = controlBuf;

var query = new Buffer([
  0xAA, // header
  0x04, // cmd
  0x01, // lengh
  0x03, // Data[0] 0x03 查询/返回参数 0x04 查询/返回账目
  0x00, // check
  0x00, // check
  0xAB, // end
]);

exports.query = query;

