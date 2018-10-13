/* jshint node:true */
'use strict';
var app = require('../server');
var dataSourceMysql = app.dataSources.gdm_mongodb;
dataSourceMysql.autoupdate(function(err) {
  if (err) {
    console.log('Update model db error: ', err);
    dataSourceMysql.disconnect();
    return;
  }
  console.log('Update model db mysql success!!!');
  dataSourceMysql.disconnect(function(err) {
    if (err) throw err;
  });
});
