'use strict';

var disableCUDMethods = (Model) => {
  Model.disableRemoteMethod('create', true);
  Model.disableRemoteMethod('upsertWithWhere', true);
  Model.disableRemoteMethod('replaceOrCreate', true);
  Model.disableRemoteMethod('updateAttribute', false);
  Model.disableRemoteMethod('updateAttributes', false);
  Model.disableRemoteMethod('replaceById', true);
  Model.disableRemoteMethod('upsert', true);
  Model.disableRemoteMethod('destroyById', true);
  Model.disableRemoteMethod('deleteById', true);
  Model.disableRemoteMethod('createChangeStream', true);
  Model.disableRemoteMethod('updateAll', true);
};
exports.disableCUDMethods = disableCUDMethods;

var disableCRUDMethods = (Model) => {
  disableCUDMethods(Model);
  Model.disableRemoteMethod('count', true);
  Model.disableRemoteMethod('exists', true);
  Model.disableRemoteMethod('findById', true);
  Model.disableRemoteMethod('find', true);
  Model.disableRemoteMethod('findOne', true);
};

exports.disableCRUDMethods = disableCRUDMethods;

var disableMethods = (Model, methods) => {
  // Create
  if (methods.toUpperCase().indexOf('C') !== -1) {
    Model.disableRemoteMethod('create', true);
    Model.disableRemoteMethod('upsertWithWhere', true);
    Model.disableRemoteMethod('replaceOrCreate', true);
    Model.disableRemoteMethod('upsert', true);
  }
  // Retrieve
  if (methods.toUpperCase().indexOf('R') !== -1) {
    Model.disableRemoteMethod('count', true);
    Model.disableRemoteMethod('exists', true);
    Model.disableRemoteMethod('findById', true);
    Model.disableRemoteMethod('find', true);
    Model.disableRemoteMethod('findOne', true);
    Model.disableRemoteMethod('createChangeStream', true);
  }
  // Update
  if (methods.toUpperCase().indexOf('U') !== -1) {
    Model.disableRemoteMethod('upsertWithWhere', true);
    Model.disableRemoteMethod('replaceOrCreate', true);
    Model.disableRemoteMethod('upsert', true);

    Model.disableRemoteMethod('replaceById', true);
    Model.disableRemoteMethod('updateAttribute', false);
    Model.disableRemoteMethod('updateAttributes', false);
    Model.disableRemoteMethod('updateAll', true);
  }
  // Delete
  if (methods.toUpperCase().indexOf('D') !== -1) {
    Model.disableRemoteMethod('destroyById', true);
    Model.disableRemoteMethod('deleteById', true);
  }
};
exports.disableMethods = disableMethods;

var disableRelationMethods = (Model, relation, methods) => {
  // Create
  if (methods.toUpperCase().indexOf('C') !== -1) {
    Model.disableRemoteMethod(['__create__', relation].join(''), false);
  }
  // Retrieve
  if (methods.toUpperCase().indexOf('R') !== -1) {
    Model.disableRemoteMethod(['__count__', relation].join(''), false);
    Model.disableRemoteMethod(['__findById__', relation].join(''), false);
    Model.disableRemoteMethod(['__exists__', relation].join(''), false);
    Model.disableRemoteMethod(['__get__', relation].join(''), false);
  }
  // Update
  if (methods.toUpperCase().indexOf('U') !== -1) {
    Model.disableRemoteMethod(['__updateById__', relation].join(''), false);
    Model.disableRemoteMethod(['__update__', relation].join(''), false);
  }
  // Link
  if (methods.toUpperCase().indexOf('L') !== -1) {
    Model.disableRemoteMethod(['__unlink__', relation].join(''), false);
    Model.disableRemoteMethod(['__link__', relation].join(''), false);
  }
  // Delete
  if (methods.toUpperCase().indexOf('D') !== -1) {
    Model.disableRemoteMethod(['__delete__', relation].join(''), false);
    Model.disableRemoteMethod(['__destroyById__', relation].join(''), false);
    Model.disableRemoteMethod(['__destroy__', relation].join(''), false);
  }
};
exports.disableRelationMethods = disableRelationMethods;
