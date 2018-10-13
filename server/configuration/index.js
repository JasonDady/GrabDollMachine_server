/* jshint node:true */
'use strict';
var env = process.env.NODE_ENV || 'development';

var config = {
  development: require('./development.config'),
  production: require('./production.config'),
  staging: require('./staging.config'),
};

module.exports = config[env];
