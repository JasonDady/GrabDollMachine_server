'use strict';
const modelConfig = require('../../server/lib/loopback-model-config');

module.exports = function(Address) {
  modelConfig.disableCUDMethods(Address);
  modelConfig.disableMethods(Address, 'CDRU');
};
