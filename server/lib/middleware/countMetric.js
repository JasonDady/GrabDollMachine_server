'use strict';

const countProbe = require('../metricsDefinitions/count');
module.exports = function(req, res, next) {
  countProbe.inc();
  next();
};
