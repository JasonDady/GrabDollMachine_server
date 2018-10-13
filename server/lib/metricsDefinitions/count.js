'use strict';

const pmx = require('pmx');
const pmxProbe = pmx.probe();

module.exports = pmxProbe.counter({
  name: 'Request Count',
  aggType: 'sum',
});
