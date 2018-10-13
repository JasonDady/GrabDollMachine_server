/* jshint node:true */
'use strict';

const bunyan = require('bunyan');
let env = process.env.NODE_ENV || 'development';

let logger = {
  development: bunyan.createLogger({
    name: 'general',
    streams: [
      {
        level: 'debug',
        stream: process.stdout,
      },
      {
        level: 'error',
        path: '../error.log',
      },
      {
        level: 'debug',
        path: '../debug.log',
      },
    ],
  }),
  staging: bunyan.createLogger({
    name: 'general',
    streams: [
      // {
      //    level: 'debug',
      //    stream: process.stdout
      // },
      {
        level: 'error',
        path: '../error.log',
      },
      {
        level: 'debug',
        path: '../debug.log',
      },
    ],
  }),
  production: bunyan.createLogger({
    name: 'general',
    streams: [
      // {
      //    level: 'debug',
      //    stream: process.stdout
      // },
      {
        level: 'error',
        path: '../error.log',
      },
      {
        level: 'debug',
        path: '../debug.log',
      },
    ],
  }),
};

module.exports = logger[env];
