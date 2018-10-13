'use strict';
const modelConfig = require('../../server/lib/loopback-model-config');

module.exports = function(Useronline) {
  modelConfig.disableMethods(Useronline, 'CUD');
};
