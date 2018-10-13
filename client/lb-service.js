// CommonJS package manager support
if (typeof module !== 'undefined' && typeof exports !== 'undefined' &&
  module.exports === exports) {
  // Export the *name* of this Angular module
  // Sample usage:
  //
  //   import lbServices from './lb-services';
  //   angular.module('app', [lbServices]);
  //
  module.exports = "lbServices";
}

(function(window, angular, undefined) {
  'use strict';

  var urlBase = "http://0.0.0.0/api";
  var authHeader = 'authorization';

  function getHost(url) {
    var m = url.match(/^(?:https?:)?\/\/([^\/]+)/);
    return m ? m[1] : null;
  }

  var urlBaseHost = getHost(urlBase) || location.host;

/**
 * @ngdoc overview
 * @name lbServices
 * @module
 * @description
 *
 * The `lbServices` module provides services for interacting with
 * the models exposed by the LoopBack server via the REST API.
 *
 */
  var module = angular.module("lbServices", ['ngResource']);

/**
 * @ngdoc object
 * @name lbServices.AppUser
 * @header lbServices.AppUser
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `AppUser` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
  module.factory(
    "AppUser",
    [
      'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
      function(LoopBackResource, LoopBackAuth, $injector, $q) {
        var R = LoopBackResource(
        urlBase + "/AppUsers/:id",
          { 'id': '@id' },
          {

            /**
             * @ngdoc method
             * @name lbServices.AppUser#prototype$__findById__accessTokens
             * @methodOf lbServices.AppUser
             *
             * @description
             *
             * Find a related item by id for accessTokens.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - AppUser id
             *
             *  - `fk` – `{*}` - Foreign key for accessTokens
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `AppUser` object.)
             * </em>
             */
            "prototype$__findById__accessTokens": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/AppUsers/:id/accessTokens/:fk",
              method: "GET",
            },

            // INTERNAL. Use AppUser.order.findById() instead.
            "prototype$__findById__order": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/AppUsers/:id/order/:fk",
              method: "GET",
            },

            // INTERNAL. Use AppUser.order.destroyById() instead.
            "prototype$__destroyById__order": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/AppUsers/:id/order/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use AppUser.order.updateById() instead.
            "prototype$__updateById__order": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/AppUsers/:id/order/:fk",
              method: "PUT",
            },

            // INTERNAL. Use AppUser.address.findById() instead.
            "prototype$__findById__address": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/AppUsers/:id/address/:fk",
              method: "GET",
            },

            // INTERNAL. Use AppUser.userOnline.findById() instead.
            "prototype$__findById__userOnline": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/AppUsers/:id/userOnline/:fk",
              method: "GET",
            },

            // INTERNAL. Use AppUser.userOnline.destroyById() instead.
            "prototype$__destroyById__userOnline": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/AppUsers/:id/userOnline/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use AppUser.userOnline.updateById() instead.
            "prototype$__updateById__userOnline": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/AppUsers/:id/userOnline/:fk",
              method: "PUT",
            },

            /**
             * @ngdoc method
             * @name lbServices.AppUser#prototype$__get__accessTokens
             * @methodOf lbServices.AppUser
             *
             * @description
             *
             * Queries accessTokens of AppUser.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - AppUser id
             *
             *  - `filter` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `AppUser` object.)
             * </em>
             */
            "prototype$__get__accessTokens": {
              isArray: true,
              url: urlBase + "/AppUsers/:id/accessTokens",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.AppUser#prototype$__count__accessTokens
             * @methodOf lbServices.AppUser
             *
             * @description
             *
             * Counts accessTokens of AppUser.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - AppUser id
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
            "prototype$__count__accessTokens": {
              url: urlBase + "/AppUsers/:id/accessTokens/count",
              method: "GET",
            },

            // INTERNAL. Use AppUser.order() instead.
            "prototype$__get__order": {
              isArray: true,
              url: urlBase + "/AppUsers/:id/order",
              method: "GET",
            },

            // INTERNAL. Use AppUser.order.create() instead.
            "prototype$__create__order": {
              url: urlBase + "/AppUsers/:id/order",
              method: "POST",
            },

            // INTERNAL. Use AppUser.order.destroyAll() instead.
            "prototype$__delete__order": {
              url: urlBase + "/AppUsers/:id/order",
              method: "DELETE",
            },

            // INTERNAL. Use AppUser.order.count() instead.
            "prototype$__count__order": {
              url: urlBase + "/AppUsers/:id/order/count",
              method: "GET",
            },

            // INTERNAL. Use AppUser.address() instead.
            "prototype$__get__address": {
              isArray: true,
              url: urlBase + "/AppUsers/:id/address",
              method: "GET",
            },

            // INTERNAL. Use AppUser.address.count() instead.
            "prototype$__count__address": {
              url: urlBase + "/AppUsers/:id/address/count",
              method: "GET",
            },

            // INTERNAL. Use AppUser.userOnline() instead.
            "prototype$__get__userOnline": {
              isArray: true,
              url: urlBase + "/AppUsers/:id/userOnline",
              method: "GET",
            },

            // INTERNAL. Use AppUser.userOnline.create() instead.
            "prototype$__create__userOnline": {
              url: urlBase + "/AppUsers/:id/userOnline",
              method: "POST",
            },

            // INTERNAL. Use AppUser.userOnline.destroyAll() instead.
            "prototype$__delete__userOnline": {
              url: urlBase + "/AppUsers/:id/userOnline",
              method: "DELETE",
            },

            // INTERNAL. Use AppUser.userOnline.count() instead.
            "prototype$__count__userOnline": {
              url: urlBase + "/AppUsers/:id/userOnline/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.AppUser#login
             * @methodOf lbServices.AppUser
             *
             * @description
             *
             * Login a user with username/email and password.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `include` – `{string=}` - Related objects to include in the response. See the description of return value for more details.
             *   Default value: `user`.
             *
             *  - `rememberMe` - `boolean` - Whether the authentication credentials
             *     should be remembered in localStorage across app/browser restarts.
             *     Default: `true`.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * The response body contains properties of the AccessToken created on login.
             * Depending on the value of `include` parameter, the body may contain additional properties:
             *   - `user` - `U+007BUserU+007D` - Data of the currently logged in user. (`include=user`)
             *
             */
            "login": {
              params: {
                include: 'user',
              },
              interceptor: {
                response: function(response) {
                  var accessToken = response.data;
                  LoopBackAuth.setUser(
                    accessToken.id, accessToken.userId, accessToken.user);
                  LoopBackAuth.rememberMe =
                    response.config.params.rememberMe !== false;
                  LoopBackAuth.save();
                  return response.resource;
                },
              },
              url: urlBase + "/AppUsers/login",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.AppUser#logout
             * @methodOf lbServices.AppUser
             *
             * @description
             *
             * Logout a user with access token.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `access_token` – `{string=}` - Do not supply this argument, it is automatically extracted from request headers.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "logout": {
              interceptor: {
                response: function(response) {
                  LoopBackAuth.clearUser();
                  LoopBackAuth.clearStorage();
                  return response.resource;
                },
                responseError: function(responseError) {
                  LoopBackAuth.clearUser();
                  LoopBackAuth.clearStorage();
                  return responseError.resource;
                },
              },
              url: urlBase + "/AppUsers/logout",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.AppUser#confirm
             * @methodOf lbServices.AppUser
             *
             * @description
             *
             * Confirm a user registration with email verification token.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `uid` – `{string}` -
             *
             *  - `token` – `{string}` -
             *
             *  - `redirect` – `{string=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "confirm": {
              url: urlBase + "/AppUsers/confirm",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.AppUser#resetPassword
             * @methodOf lbServices.AppUser
             *
             * @description
             *
             * Reset password for a user with email.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "resetPassword": {
              url: urlBase + "/AppUsers/reset",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.AppUser#prototype$recordPaymentDeduction
             * @methodOf lbServices.AppUser
             *
             * @description
             *
             * 查询我充值扣费记录.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - AppUser id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `result` – `{object=}` - 我的充值和扣费记录
             */
            "prototype$recordPaymentDeduction": {
              url: urlBase + "/AppUsers/:id/recordPaymentDeduction",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.AppUser#prototype$exchangeGameCurrency
             * @methodOf lbServices.AppUser
             *
             * @description
             *
             * 兑换金币.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - AppUser id
             *
             * @param {Object} postData Request data.
             *
             *  - `orderId` – `{string}` - 订单ID
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `result` – `{object=}` - 最新的用户信息
             */
            "prototype$exchangeGameCurrency": {
              url: urlBase + "/AppUsers/:id/exchangeGameCurrency",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.AppUser#prototype$queryMyWinningGrabRecord
             * @methodOf lbServices.AppUser
             *
             * @description
             *
             * 查询我成功抓取的记录.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - AppUser id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `result` – `{object=}` - 我成功抓取的记录
             */
            "prototype$queryMyWinningGrabRecord": {
              url: urlBase + "/AppUsers/:id/queryMyWinningGrabRecord",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.AppUser#prototype$queryMyFailGrabRecord
             * @methodOf lbServices.AppUser
             *
             * @description
             *
             * 查询我失败的抓取记录.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - AppUser id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `result` – `{object=}` - 我失败的抓取记录
             */
            "prototype$queryMyFailGrabRecord": {
              url: urlBase + "/AppUsers/:id/queryMyFailGrabRecord",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.AppUser#prototype$deviceGrabRecord
             * @methodOf lbServices.AppUser
             *
             * @description
             *
             * 设备抓取记录.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - AppUser id
             *
             *  - `deviceId` – `{string}` - 设备ID
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `result` – `{object=}` - 抓取记录
             */
            "prototype$deviceGrabRecord": {
              url: urlBase + "/AppUsers/:id/deviceGrabRecord",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.AppUser#prototype$myGrabRecord
             * @methodOf lbServices.AppUser
             *
             * @description
             *
             * 我的抓取记录.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - AppUser id
             *
             *  - `status` – `{number=}` - 我的抓取记录 0 - 所有 1 - 失败 2 - 成功
             *
             *  - `isShowUserInfo` – `{number=}` - 是否显示用户信息 0 - 不显示 1 - 显示
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `result` – `{object=}` - 抓取记录
             */
            "prototype$myGrabRecord": {
              url: urlBase + "/AppUsers/:id/myGrabRecord",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.AppUser#prototype$confirmDeliveryAddress
             * @methodOf lbServices.AppUser
             *
             * @description
             *
             * 确定送货地址.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - AppUser id
             *
             * @param {Object} postData Request data.
             *
             *  - `addressId` – `{string}` - 地址ID
             *
             *  - `orderId` – `{string}` - 订单ID
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `result` – `{object=}` - 订单信息
             */
            "prototype$confirmDeliveryAddress": {
              url: urlBase + "/AppUsers/:id/confirmDeliveryAddress",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.AppUser#prototype$deleteAddressInfo
             * @methodOf lbServices.AppUser
             *
             * @description
             *
             * 删除地址.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - AppUser id
             *
             * @param {Object} postData Request data.
             *
             *  - `addressId` – `{string}` - 地址ID
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `result` – `{object=}` - {errorCode: 0, errorMsg: "删除该地址成功！"}
             */
            "prototype$deleteAddressInfo": {
              url: urlBase + "/AppUsers/:id/deleteAddressInfo",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.AppUser#prototype$editAddressInfo
             * @methodOf lbServices.AppUser
             *
             * @description
             *
             * 编辑地址.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - AppUser id
             *
             * @param {Object} postData Request data.
             *
             *  - `addressId` – `{string}` - 地址ID
             *
             *  - `username` – `{string}` - 用户名
             *
             *  - `mobile` – `{string}` - 手机号码
             *
             *  - `address` – `{string}` - 联系地址
             *
             *  - `isDefault` – `{boolean}` - 是否默认
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `addressInfo` – `{object=}` - 地址信息
             */
            "prototype$editAddressInfo": {
              url: urlBase + "/AppUsers/:id/editAddressInfo",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.AppUser#prototype$addAddressInfo
             * @methodOf lbServices.AppUser
             *
             * @description
             *
             * 创建地址.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - AppUser id
             *
             * @param {Object} postData Request data.
             *
             *  - `username` – `{string}` - 用户名
             *
             *  - `mobile` – `{string}` - 手机号码
             *
             *  - `address` – `{string}` - 联系地址
             *
             *  - `isDefault` – `{boolean}` - 是否默认
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `addressInfo` – `{object=}` - 地址信息
             */
            "prototype$addAddressInfo": {
              url: urlBase + "/AppUsers/:id/addAddressInfo",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.AppUser#prototype$getUserInfo
             * @methodOf lbServices.AppUser
             *
             * @description
             *
             * 获取用户信息.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - AppUser id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * 用户信息
             */
            "prototype$getUserInfo": {
              url: urlBase + "/AppUsers/:id/getUserInfo",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.AppUser#prototype$startDevice
             * @methodOf lbServices.AppUser
             *
             * @description
             *
             * 启动设备.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - AppUser id
             *
             * @param {Object} postData Request data.
             *
             *  - `deviceId` – `{string}` - 设备ID
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * {"success": "boolean", "status": "int", "result": "object"}
             */
            "prototype$startDevice": {
              url: urlBase + "/AppUsers/:id/startDevice",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.AppUser#prototype$queryDeviceStatus
             * @methodOf lbServices.AppUser
             *
             * @description
             *
             * 查询设备状态.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - AppUser id
             *
             * @param {Object} postData Request data.
             *
             *  - `deviceId` – `{string}` - 设备ID
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * {"success": "boolean", "status": "int", "result": "object"}
             */
            "prototype$queryDeviceStatus": {
              url: urlBase + "/AppUsers/:id/queryDeviceStatus",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.AppUser#prototype$sendCommandButtonState
             * @methodOf lbServices.AppUser
             *
             * @description
             *
             * 发送上、下、左、右、确定指令.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - AppUser id
             *
             * @param {Object} postData Request data.
             *
             *  - `buttonState` – `{number}` - 上1 下2 左3 右4 确定5
             *
             *  - `deviceId` – `{string}` - 设备ID
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * {"success": "boolean", "status": "int", "result": "object"}
             */
            "prototype$sendCommandButtonState": {
              url: urlBase + "/AppUsers/:id/sendCommandButtonState",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.AppUser#prototype$sendCommand
             * @methodOf lbServices.AppUser
             *
             * @description
             *
             * 发送指令.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - AppUser id
             *
             * @param {Object} postData Request data.
             *
             *  - `command` – `{string}` - 指令值: 按键状态: {"buttonState":1} 激光开关 {"laserSwitch": 1} 0-关 1-开 游戏状态 {"gameState": 1} 抓力控制 {"graspingForceControl": 1}
             *
             *  - `deviceId` – `{string}` - 设备ID
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * {"success": "boolean", "status": "int", "result": "object"}
             */
            "prototype$sendCommand": {
              url: urlBase + "/AppUsers/:id/sendCommand",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.AppUser#prototype$refreshToken
             * @methodOf lbServices.AppUser
             *
             * @description
             *
             * refesh token.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - AppUser id
             *
             *  - `req` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `AppUser` object.)
             * </em>
             */
            "prototype$refreshToken": {
              url: urlBase + "/AppUsers/:id/refreshToken",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.AppUser#loginByWechat
             * @methodOf lbServices.AppUser
             *
             * @description
             *
             * login an user with wechat.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * {"created": "date", "id":"string", "ttl": "string", "userId": "string"}
             */
            "loginByWechat": {
              url: urlBase + "/AppUsers/loginByWechat",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.AppUser#loginByMobile
             * @methodOf lbServices.AppUser
             *
             * @description
             *
             * login an user with mobile and code.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * {
             *         "created": "date",
             *         "id":"string",
             *         "ttl": "string",
             *         "userId": "string"
             *       }
             */
            "loginByMobile": {
              url: urlBase + "/AppUsers/loginByMobile",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.AppUser#prototype$genPayArgs
             * @methodOf lbServices.AppUser
             *
             * @description
             *
             * 生成订单的支付信息
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - AppUser id
             *
             * @param {Object} postData Request data.
             *
             *  - `req` – `{object=}` -
             *
             *  - `totalFee` – `{number}` - 支付金额
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `payInfo` – `{string=}` - 返回的支付信息
             */
            "prototype$genPayArgs": {
              url: urlBase + "/AppUsers/:id/genPayArgs",
              method: "POST",
            },

            // INTERNAL. Use Device.gameAppUser() instead.
            "::get::Device::gameAppUser": {
              url: urlBase + "/Devices/:id/gameAppUser",
              method: "GET",
            },

            // INTERNAL. Use Order.appUser() instead.
            "::get::Order::appUser": {
              url: urlBase + "/Orders/:id/appUser",
              method: "GET",
            },

            // INTERNAL. Use Address.appUser() instead.
            "::get::Address::appUser": {
              url: urlBase + "/Addresses/:id/appUser",
              method: "GET",
            },

            // INTERNAL. Use UserOnline.appUser() instead.
            "::get::UserOnline::appUser": {
              url: urlBase + "/UserOnlines/:id/appUser",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.AppUser#getCurrent
             * @methodOf lbServices.AppUser
             *
             * @description
             *
             * Get data of the currently logged user. Fail with HTTP result 401
             * when there is no user logged in.
             *
             * @param {function(Object,Object)=} successCb
             *    Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *    `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             */
            'getCurrent': {
              url: urlBase + "/AppUsers" + '/:id',
              method: 'GET',
              params: {
                id: function() {
                  var id = LoopBackAuth.currentUserId;
                  if (id == null) id = '__anonymous__';
                  return id;
                },
              },
              interceptor: {
                response: function(response) {
                  LoopBackAuth.currentUserData = response.data;
                  return response.resource;
                },
                responseError: function(responseError) {
                  LoopBackAuth.clearUser();
                  LoopBackAuth.clearStorage();
                  return $q.reject(responseError);
                },
              },
              __isGetCurrentUser__: true,
            },
          }
        );



        /**
         * @ngdoc method
         * @name lbServices.AppUser#getCachedCurrent
         * @methodOf lbServices.AppUser
         *
         * @description
         *
         * Get data of the currently logged user that was returned by the last
         * call to {@link lbServices.AppUser#login} or
         * {@link lbServices.AppUser#getCurrent}. Return null when there
         * is no user logged in or the data of the current user were not fetched
         * yet.
         *
         * @returns {Object} A AppUser instance.
         */
        R.getCachedCurrent = function() {
          var data = LoopBackAuth.currentUserData;
          return data ? new R(data) : null;
        };

        /**
         * @ngdoc method
         * @name lbServices.AppUser#isAuthenticated
         * @methodOf lbServices.AppUser
         *
         * @returns {boolean} True if the current user is authenticated (logged in).
         */
        R.isAuthenticated = function() {
          return this.getCurrentId() != null;
        };

        /**
         * @ngdoc method
         * @name lbServices.AppUser#getCurrentId
         * @methodOf lbServices.AppUser
         *
         * @returns {Object} Id of the currently logged-in user or null.
         */
        R.getCurrentId = function() {
          return LoopBackAuth.currentUserId;
        };

        /**
        * @ngdoc property
        * @name lbServices.AppUser#modelName
        * @propertyOf lbServices.AppUser
        * @description
        * The name of the model represented by this $resource,
        * i.e. `AppUser`.
        */
        R.modelName = "AppUser";

    /**
     * @ngdoc object
     * @name lbServices.AppUser.order
     * @header lbServices.AppUser.order
     * @object
     * @description
     *
     * The object `AppUser.order` groups methods
     * manipulating `Order` instances related to `AppUser`.
     *
     * Call {@link lbServices.AppUser#order AppUser.order()}
     * to query all related instances.
     */


            /**
             * @ngdoc method
             * @name lbServices.AppUser#order
             * @methodOf lbServices.AppUser
             *
             * @description
             *
             * Queries order of AppUser.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - AppUser id
             *
             *  - `filter` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Order` object.)
             * </em>
             */
        R.order = function() {
          var TargetResource = $injector.get("Order");
          var action = TargetResource["::get::AppUser::order"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.AppUser.order#count
             * @methodOf lbServices.AppUser.order
             *
             * @description
             *
             * Counts order of AppUser.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - AppUser id
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
        R.order.count = function() {
          var TargetResource = $injector.get("Order");
          var action = TargetResource["::count::AppUser::order"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.AppUser.order#create
             * @methodOf lbServices.AppUser.order
             *
             * @description
             *
             * Creates a new instance in order of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - AppUser id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Order` object.)
             * </em>
             */
        R.order.create = function() {
          var TargetResource = $injector.get("Order");
          var action = TargetResource["::create::AppUser::order"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.AppUser.order#createMany
             * @methodOf lbServices.AppUser.order
             *
             * @description
             *
             * Creates a new instance in order of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - AppUser id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Order` object.)
             * </em>
             */
        R.order.createMany = function() {
          var TargetResource = $injector.get("Order");
          var action = TargetResource["::createMany::AppUser::order"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.AppUser.order#destroyAll
             * @methodOf lbServices.AppUser.order
             *
             * @description
             *
             * Deletes all order of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - AppUser id
             *
             *  - `where` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.order.destroyAll = function() {
          var TargetResource = $injector.get("Order");
          var action = TargetResource["::delete::AppUser::order"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.AppUser.order#destroyById
             * @methodOf lbServices.AppUser.order
             *
             * @description
             *
             * Delete a related item by id for order.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - AppUser id
             *
             *  - `fk` – `{*}` - Foreign key for order
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.order.destroyById = function() {
          var TargetResource = $injector.get("Order");
          var action = TargetResource["::destroyById::AppUser::order"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.AppUser.order#findById
             * @methodOf lbServices.AppUser.order
             *
             * @description
             *
             * Find a related item by id for order.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - AppUser id
             *
             *  - `fk` – `{*}` - Foreign key for order
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Order` object.)
             * </em>
             */
        R.order.findById = function() {
          var TargetResource = $injector.get("Order");
          var action = TargetResource["::findById::AppUser::order"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.AppUser.order#updateById
             * @methodOf lbServices.AppUser.order
             *
             * @description
             *
             * Update a related item by id for order.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - AppUser id
             *
             *  - `fk` – `{*}` - Foreign key for order
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Order` object.)
             * </em>
             */
        R.order.updateById = function() {
          var TargetResource = $injector.get("Order");
          var action = TargetResource["::updateById::AppUser::order"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.AppUser.address
     * @header lbServices.AppUser.address
     * @object
     * @description
     *
     * The object `AppUser.address` groups methods
     * manipulating `Address` instances related to `AppUser`.
     *
     * Call {@link lbServices.AppUser#address AppUser.address()}
     * to query all related instances.
     */


            /**
             * @ngdoc method
             * @name lbServices.AppUser#address
             * @methodOf lbServices.AppUser
             *
             * @description
             *
             * Queries address of AppUser.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - AppUser id
             *
             *  - `filter` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Address` object.)
             * </em>
             */
        R.address = function() {
          var TargetResource = $injector.get("Address");
          var action = TargetResource["::get::AppUser::address"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.AppUser.address#count
             * @methodOf lbServices.AppUser.address
             *
             * @description
             *
             * Counts address of AppUser.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - AppUser id
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
        R.address.count = function() {
          var TargetResource = $injector.get("Address");
          var action = TargetResource["::count::AppUser::address"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.AppUser.address#findById
             * @methodOf lbServices.AppUser.address
             *
             * @description
             *
             * Find a related item by id for address.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - AppUser id
             *
             *  - `fk` – `{*}` - Foreign key for address
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Address` object.)
             * </em>
             */
        R.address.findById = function() {
          var TargetResource = $injector.get("Address");
          var action = TargetResource["::findById::AppUser::address"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.AppUser.userOnline
     * @header lbServices.AppUser.userOnline
     * @object
     * @description
     *
     * The object `AppUser.userOnline` groups methods
     * manipulating `UserOnline` instances related to `AppUser`.
     *
     * Call {@link lbServices.AppUser#userOnline AppUser.userOnline()}
     * to query all related instances.
     */


            /**
             * @ngdoc method
             * @name lbServices.AppUser#userOnline
             * @methodOf lbServices.AppUser
             *
             * @description
             *
             * Queries userOnline of AppUser.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - AppUser id
             *
             *  - `filter` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `UserOnline` object.)
             * </em>
             */
        R.userOnline = function() {
          var TargetResource = $injector.get("UserOnline");
          var action = TargetResource["::get::AppUser::userOnline"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.AppUser.userOnline#count
             * @methodOf lbServices.AppUser.userOnline
             *
             * @description
             *
             * Counts userOnline of AppUser.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - AppUser id
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
        R.userOnline.count = function() {
          var TargetResource = $injector.get("UserOnline");
          var action = TargetResource["::count::AppUser::userOnline"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.AppUser.userOnline#create
             * @methodOf lbServices.AppUser.userOnline
             *
             * @description
             *
             * Creates a new instance in userOnline of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - AppUser id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `UserOnline` object.)
             * </em>
             */
        R.userOnline.create = function() {
          var TargetResource = $injector.get("UserOnline");
          var action = TargetResource["::create::AppUser::userOnline"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.AppUser.userOnline#createMany
             * @methodOf lbServices.AppUser.userOnline
             *
             * @description
             *
             * Creates a new instance in userOnline of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - AppUser id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `UserOnline` object.)
             * </em>
             */
        R.userOnline.createMany = function() {
          var TargetResource = $injector.get("UserOnline");
          var action = TargetResource["::createMany::AppUser::userOnline"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.AppUser.userOnline#destroyAll
             * @methodOf lbServices.AppUser.userOnline
             *
             * @description
             *
             * Deletes all userOnline of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - AppUser id
             *
             *  - `where` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.userOnline.destroyAll = function() {
          var TargetResource = $injector.get("UserOnline");
          var action = TargetResource["::delete::AppUser::userOnline"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.AppUser.userOnline#destroyById
             * @methodOf lbServices.AppUser.userOnline
             *
             * @description
             *
             * Delete a related item by id for userOnline.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - AppUser id
             *
             *  - `fk` – `{*}` - Foreign key for userOnline
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.userOnline.destroyById = function() {
          var TargetResource = $injector.get("UserOnline");
          var action = TargetResource["::destroyById::AppUser::userOnline"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.AppUser.userOnline#findById
             * @methodOf lbServices.AppUser.userOnline
             *
             * @description
             *
             * Find a related item by id for userOnline.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - AppUser id
             *
             *  - `fk` – `{*}` - Foreign key for userOnline
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `UserOnline` object.)
             * </em>
             */
        R.userOnline.findById = function() {
          var TargetResource = $injector.get("UserOnline");
          var action = TargetResource["::findById::AppUser::userOnline"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.AppUser.userOnline#updateById
             * @methodOf lbServices.AppUser.userOnline
             *
             * @description
             *
             * Update a related item by id for userOnline.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - AppUser id
             *
             *  - `fk` – `{*}` - Foreign key for userOnline
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `UserOnline` object.)
             * </em>
             */
        R.userOnline.updateById = function() {
          var TargetResource = $injector.get("UserOnline");
          var action = TargetResource["::updateById::AppUser::userOnline"];
          return action.apply(R, arguments);
        };


        return R;
      }]);

/**
 * @ngdoc object
 * @name lbServices.Device
 * @header lbServices.Device
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Device` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
  module.factory(
    "Device",
    [
      'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
      function(LoopBackResource, LoopBackAuth, $injector, $q) {
        var R = LoopBackResource(
        urlBase + "/Devices/:id",
          { 'id': '@id' },
          {

            // INTERNAL. Use Device.gameAppUser() instead.
            "prototype$__get__gameAppUser": {
              url: urlBase + "/Devices/:id/gameAppUser",
              method: "GET",
            },

            // INTERNAL. Use Device.order.findById() instead.
            "prototype$__findById__order": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Devices/:id/order/:fk",
              method: "GET",
            },

            // INTERNAL. Use Device.order.destroyById() instead.
            "prototype$__destroyById__order": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Devices/:id/order/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Device.order.updateById() instead.
            "prototype$__updateById__order": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Devices/:id/order/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Device.currentOrder() instead.
            "prototype$__get__currentOrder": {
              url: urlBase + "/Devices/:id/currentOrder",
              method: "GET",
            },

            // INTERNAL. Use Device.userOnline.findById() instead.
            "prototype$__findById__userOnline": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Devices/:id/userOnline/:fk",
              method: "GET",
            },

            // INTERNAL. Use Device.userOnline.destroyById() instead.
            "prototype$__destroyById__userOnline": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Devices/:id/userOnline/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Device.userOnline.updateById() instead.
            "prototype$__updateById__userOnline": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Devices/:id/userOnline/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Device.manager() instead.
            "prototype$__get__manager": {
              url: urlBase + "/Devices/:id/manager",
              method: "GET",
            },

            // INTERNAL. Use Device.order() instead.
            "prototype$__get__order": {
              isArray: true,
              url: urlBase + "/Devices/:id/order",
              method: "GET",
            },

            // INTERNAL. Use Device.order.create() instead.
            "prototype$__create__order": {
              url: urlBase + "/Devices/:id/order",
              method: "POST",
            },

            // INTERNAL. Use Device.order.destroyAll() instead.
            "prototype$__delete__order": {
              url: urlBase + "/Devices/:id/order",
              method: "DELETE",
            },

            // INTERNAL. Use Device.order.count() instead.
            "prototype$__count__order": {
              url: urlBase + "/Devices/:id/order/count",
              method: "GET",
            },

            // INTERNAL. Use Device.userOnline() instead.
            "prototype$__get__userOnline": {
              isArray: true,
              url: urlBase + "/Devices/:id/userOnline",
              method: "GET",
            },

            // INTERNAL. Use Device.userOnline.create() instead.
            "prototype$__create__userOnline": {
              url: urlBase + "/Devices/:id/userOnline",
              method: "POST",
            },

            // INTERNAL. Use Device.userOnline.destroyAll() instead.
            "prototype$__delete__userOnline": {
              url: urlBase + "/Devices/:id/userOnline",
              method: "DELETE",
            },

            // INTERNAL. Use Device.userOnline.count() instead.
            "prototype$__count__userOnline": {
              url: urlBase + "/Devices/:id/userOnline/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Device#exists
             * @methodOf lbServices.Device
             *
             * @description
             *
             * Check whether a model instance exists in the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `exists` – `{boolean=}` -
             */
            "exists": {
              url: urlBase + "/Devices/:id/exists",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Device#findById
             * @methodOf lbServices.Device
             *
             * @description
             *
             * Find a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `filter` – `{object=}` - Filter defining fields and include - must be a JSON-encoded string ({"something":"value"})
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Device` object.)
             * </em>
             */
            "findById": {
              url: urlBase + "/Devices/:id",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Device#find
             * @methodOf lbServices.Device
             *
             * @description
             *
             * Find all instances of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Device` object.)
             * </em>
             */
            "find": {
              isArray: true,
              url: urlBase + "/Devices",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Device#findOne
             * @methodOf lbServices.Device
             *
             * @description
             *
             * Find first instance of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Device` object.)
             * </em>
             */
            "findOne": {
              url: urlBase + "/Devices/findOne",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Device#count
             * @methodOf lbServices.Device
             *
             * @description
             *
             * Count instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
            "count": {
              url: urlBase + "/Devices/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Device#createChangeStream
             * @methodOf lbServices.Device
             *
             * @description
             *
             * Create a change stream.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `changes` – `{ReadableStream=}` -
             */
            "createChangeStream": {
              url: urlBase + "/Devices/change-stream",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Device#prototype$queryDeviceFailGrabRecord
             * @methodOf lbServices.Device
             *
             * @description
             *
             * 查询设备抓取失败的记录.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Device id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `result` – `{object=}` - 设备被抓取的失败记录
             */
            "prototype$queryDeviceFailGrabRecord": {
              url: urlBase + "/Devices/:id/queryDeviceFailGrabRecord",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Device#prototype$queryDeviceWinningGrabRecord
             * @methodOf lbServices.Device
             *
             * @description
             *
             * 查询设备抓取成功的记录.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Device id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `result` – `{object=}` - 设备被抓取的成功记录
             */
            "prototype$queryDeviceWinningGrabRecord": {
              url: urlBase + "/Devices/:id/queryDeviceWinningGrabRecord",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Device#prototype$sendCommand
             * @methodOf lbServices.Device
             *
             * @description
             *
             * 发送指令.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Device id
             *
             * @param {Object} postData Request data.
             *
             *  - `command` – `{string}` - 指令值: 按键状态: {"buttonState":1}
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * {"success": "boolean", "status": "int", "result": "object"}
             */
            "prototype$sendCommand": {
              url: urlBase + "/Devices/:id/sendCommand",
              method: "POST",
            },

            // INTERNAL. Use Order.device() instead.
            "::get::Order::device": {
              url: urlBase + "/Orders/:id/device",
              method: "GET",
            },

            // INTERNAL. Use UserOnline.device() instead.
            "::get::UserOnline::device": {
              url: urlBase + "/UserOnlines/:id/device",
              method: "GET",
            },

            // INTERNAL. Use Manager.device.findById() instead.
            "::findById::Manager::device": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Managers/:id/device/:fk",
              method: "GET",
            },

            // INTERNAL. Use Manager.device.destroyById() instead.
            "::destroyById::Manager::device": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Managers/:id/device/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Manager.device.updateById() instead.
            "::updateById::Manager::device": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Managers/:id/device/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Manager.device() instead.
            "::get::Manager::device": {
              isArray: true,
              url: urlBase + "/Managers/:id/device",
              method: "GET",
            },

            // INTERNAL. Use Manager.device.create() instead.
            "::create::Manager::device": {
              url: urlBase + "/Managers/:id/device",
              method: "POST",
            },

            // INTERNAL. Use Manager.device.createMany() instead.
            "::createMany::Manager::device": {
              isArray: true,
              url: urlBase + "/Managers/:id/device",
              method: "POST",
            },

            // INTERNAL. Use Manager.device.destroyAll() instead.
            "::delete::Manager::device": {
              url: urlBase + "/Managers/:id/device",
              method: "DELETE",
            },

            // INTERNAL. Use Manager.device.count() instead.
            "::count::Manager::device": {
              url: urlBase + "/Managers/:id/device/count",
              method: "GET",
            },
          }
        );




        /**
        * @ngdoc property
        * @name lbServices.Device#modelName
        * @propertyOf lbServices.Device
        * @description
        * The name of the model represented by this $resource,
        * i.e. `Device`.
        */
        R.modelName = "Device";


            /**
             * @ngdoc method
             * @name lbServices.Device#gameAppUser
             * @methodOf lbServices.Device
             *
             * @description
             *
             * Fetches belongsTo relation gameAppUser.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Device id
             *
             *  - `refresh` – `{boolean=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `AppUser` object.)
             * </em>
             */
        R.gameAppUser = function() {
          var TargetResource = $injector.get("AppUser");
          var action = TargetResource["::get::Device::gameAppUser"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Device.order
     * @header lbServices.Device.order
     * @object
     * @description
     *
     * The object `Device.order` groups methods
     * manipulating `Order` instances related to `Device`.
     *
     * Call {@link lbServices.Device#order Device.order()}
     * to query all related instances.
     */


            /**
             * @ngdoc method
             * @name lbServices.Device#order
             * @methodOf lbServices.Device
             *
             * @description
             *
             * Queries order of Device.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Device id
             *
             *  - `filter` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Order` object.)
             * </em>
             */
        R.order = function() {
          var TargetResource = $injector.get("Order");
          var action = TargetResource["::get::Device::order"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Device.order#count
             * @methodOf lbServices.Device.order
             *
             * @description
             *
             * Counts order of Device.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Device id
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
        R.order.count = function() {
          var TargetResource = $injector.get("Order");
          var action = TargetResource["::count::Device::order"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Device.order#create
             * @methodOf lbServices.Device.order
             *
             * @description
             *
             * Creates a new instance in order of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Device id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Order` object.)
             * </em>
             */
        R.order.create = function() {
          var TargetResource = $injector.get("Order");
          var action = TargetResource["::create::Device::order"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Device.order#createMany
             * @methodOf lbServices.Device.order
             *
             * @description
             *
             * Creates a new instance in order of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Device id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Order` object.)
             * </em>
             */
        R.order.createMany = function() {
          var TargetResource = $injector.get("Order");
          var action = TargetResource["::createMany::Device::order"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Device.order#destroyAll
             * @methodOf lbServices.Device.order
             *
             * @description
             *
             * Deletes all order of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Device id
             *
             *  - `where` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.order.destroyAll = function() {
          var TargetResource = $injector.get("Order");
          var action = TargetResource["::delete::Device::order"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Device.order#destroyById
             * @methodOf lbServices.Device.order
             *
             * @description
             *
             * Delete a related item by id for order.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Device id
             *
             *  - `fk` – `{*}` - Foreign key for order
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.order.destroyById = function() {
          var TargetResource = $injector.get("Order");
          var action = TargetResource["::destroyById::Device::order"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Device.order#findById
             * @methodOf lbServices.Device.order
             *
             * @description
             *
             * Find a related item by id for order.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Device id
             *
             *  - `fk` – `{*}` - Foreign key for order
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Order` object.)
             * </em>
             */
        R.order.findById = function() {
          var TargetResource = $injector.get("Order");
          var action = TargetResource["::findById::Device::order"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Device.order#updateById
             * @methodOf lbServices.Device.order
             *
             * @description
             *
             * Update a related item by id for order.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Device id
             *
             *  - `fk` – `{*}` - Foreign key for order
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Order` object.)
             * </em>
             */
        R.order.updateById = function() {
          var TargetResource = $injector.get("Order");
          var action = TargetResource["::updateById::Device::order"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Device#currentOrder
             * @methodOf lbServices.Device
             *
             * @description
             *
             * Fetches belongsTo relation currentOrder.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Device id
             *
             *  - `refresh` – `{boolean=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Order` object.)
             * </em>
             */
        R.currentOrder = function() {
          var TargetResource = $injector.get("Order");
          var action = TargetResource["::get::Device::currentOrder"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Device.userOnline
     * @header lbServices.Device.userOnline
     * @object
     * @description
     *
     * The object `Device.userOnline` groups methods
     * manipulating `UserOnline` instances related to `Device`.
     *
     * Call {@link lbServices.Device#userOnline Device.userOnline()}
     * to query all related instances.
     */


            /**
             * @ngdoc method
             * @name lbServices.Device#userOnline
             * @methodOf lbServices.Device
             *
             * @description
             *
             * Queries userOnline of Device.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Device id
             *
             *  - `filter` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `UserOnline` object.)
             * </em>
             */
        R.userOnline = function() {
          var TargetResource = $injector.get("UserOnline");
          var action = TargetResource["::get::Device::userOnline"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Device.userOnline#count
             * @methodOf lbServices.Device.userOnline
             *
             * @description
             *
             * Counts userOnline of Device.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Device id
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
        R.userOnline.count = function() {
          var TargetResource = $injector.get("UserOnline");
          var action = TargetResource["::count::Device::userOnline"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Device.userOnline#create
             * @methodOf lbServices.Device.userOnline
             *
             * @description
             *
             * Creates a new instance in userOnline of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Device id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `UserOnline` object.)
             * </em>
             */
        R.userOnline.create = function() {
          var TargetResource = $injector.get("UserOnline");
          var action = TargetResource["::create::Device::userOnline"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Device.userOnline#createMany
             * @methodOf lbServices.Device.userOnline
             *
             * @description
             *
             * Creates a new instance in userOnline of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Device id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `UserOnline` object.)
             * </em>
             */
        R.userOnline.createMany = function() {
          var TargetResource = $injector.get("UserOnline");
          var action = TargetResource["::createMany::Device::userOnline"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Device.userOnline#destroyAll
             * @methodOf lbServices.Device.userOnline
             *
             * @description
             *
             * Deletes all userOnline of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Device id
             *
             *  - `where` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.userOnline.destroyAll = function() {
          var TargetResource = $injector.get("UserOnline");
          var action = TargetResource["::delete::Device::userOnline"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Device.userOnline#destroyById
             * @methodOf lbServices.Device.userOnline
             *
             * @description
             *
             * Delete a related item by id for userOnline.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Device id
             *
             *  - `fk` – `{*}` - Foreign key for userOnline
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.userOnline.destroyById = function() {
          var TargetResource = $injector.get("UserOnline");
          var action = TargetResource["::destroyById::Device::userOnline"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Device.userOnline#findById
             * @methodOf lbServices.Device.userOnline
             *
             * @description
             *
             * Find a related item by id for userOnline.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Device id
             *
             *  - `fk` – `{*}` - Foreign key for userOnline
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `UserOnline` object.)
             * </em>
             */
        R.userOnline.findById = function() {
          var TargetResource = $injector.get("UserOnline");
          var action = TargetResource["::findById::Device::userOnline"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Device.userOnline#updateById
             * @methodOf lbServices.Device.userOnline
             *
             * @description
             *
             * Update a related item by id for userOnline.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Device id
             *
             *  - `fk` – `{*}` - Foreign key for userOnline
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `UserOnline` object.)
             * </em>
             */
        R.userOnline.updateById = function() {
          var TargetResource = $injector.get("UserOnline");
          var action = TargetResource["::updateById::Device::userOnline"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Device#manager
             * @methodOf lbServices.Device
             *
             * @description
             *
             * Fetches belongsTo relation manager.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Device id
             *
             *  - `refresh` – `{boolean=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Manager` object.)
             * </em>
             */
        R.manager = function() {
          var TargetResource = $injector.get("Manager");
          var action = TargetResource["::get::Device::manager"];
          return action.apply(R, arguments);
        };


        return R;
      }]);

/**
 * @ngdoc object
 * @name lbServices.CheckCode
 * @header lbServices.CheckCode
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `CheckCode` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
  module.factory(
    "CheckCode",
    [
      'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
      function(LoopBackResource, LoopBackAuth, $injector, $q) {
        var R = LoopBackResource(
        urlBase + "/CheckCodes/:id",
          { 'id': '@id' },
          {

            /**
             * @ngdoc method
             * @name lbServices.CheckCode#getVerifyCode
             * @methodOf lbServices.CheckCode
             *
             * @description
             *
             * get verify code when login
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `mobile` – `{string}` - 13888888888
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * {"code": 0, "msg": "验证码已发送请耐心等待"}
             */
            "getVerifyCode": {
              url: urlBase + "/CheckCodes/getVerifyCode",
              method: "POST",
            },
          }
        );




        /**
        * @ngdoc property
        * @name lbServices.CheckCode#modelName
        * @propertyOf lbServices.CheckCode
        * @description
        * The name of the model represented by this $resource,
        * i.e. `CheckCode`.
        */
        R.modelName = "CheckCode";



        return R;
      }]);

/**
 * @ngdoc object
 * @name lbServices.Order
 * @header lbServices.Order
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Order` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
  module.factory(
    "Order",
    [
      'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
      function(LoopBackResource, LoopBackAuth, $injector, $q) {
        var R = LoopBackResource(
        urlBase + "/Orders/:id",
          { 'id': '@id' },
          {

            // INTERNAL. Use Order.device() instead.
            "prototype$__get__device": {
              url: urlBase + "/Orders/:id/device",
              method: "GET",
            },

            // INTERNAL. Use Order.appUser() instead.
            "prototype$__get__appUser": {
              url: urlBase + "/Orders/:id/appUser",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Order#exists
             * @methodOf lbServices.Order
             *
             * @description
             *
             * Check whether a model instance exists in the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `exists` – `{boolean=}` -
             */
            "exists": {
              url: urlBase + "/Orders/:id/exists",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Order#findById
             * @methodOf lbServices.Order
             *
             * @description
             *
             * Find a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `filter` – `{object=}` - Filter defining fields and include - must be a JSON-encoded string ({"something":"value"})
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Order` object.)
             * </em>
             */
            "findById": {
              url: urlBase + "/Orders/:id",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Order#find
             * @methodOf lbServices.Order
             *
             * @description
             *
             * Find all instances of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Order` object.)
             * </em>
             */
            "find": {
              isArray: true,
              url: urlBase + "/Orders",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Order#findOne
             * @methodOf lbServices.Order
             *
             * @description
             *
             * Find first instance of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Order` object.)
             * </em>
             */
            "findOne": {
              url: urlBase + "/Orders/findOne",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Order#count
             * @methodOf lbServices.Order
             *
             * @description
             *
             * Count instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
            "count": {
              url: urlBase + "/Orders/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Order#createChangeStream
             * @methodOf lbServices.Order
             *
             * @description
             *
             * Create a change stream.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `changes` – `{ReadableStream=}` -
             */
            "createChangeStream": {
              url: urlBase + "/Orders/change-stream",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Order#wechatpayNotify
             * @methodOf lbServices.Order
             *
             * @description
             *
             * <em>
             * (The remote method definition does not provide any description.)
             * </em>
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `req` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `result` – `{string=}` -
             */
            "wechatpayNotify": {
              url: urlBase + "/Orders/wechatpay/notify/pay",
              method: "POST",
            },

            // INTERNAL. Use AppUser.order.findById() instead.
            "::findById::AppUser::order": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/AppUsers/:id/order/:fk",
              method: "GET",
            },

            // INTERNAL. Use AppUser.order.destroyById() instead.
            "::destroyById::AppUser::order": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/AppUsers/:id/order/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use AppUser.order.updateById() instead.
            "::updateById::AppUser::order": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/AppUsers/:id/order/:fk",
              method: "PUT",
            },

            // INTERNAL. Use AppUser.order() instead.
            "::get::AppUser::order": {
              isArray: true,
              url: urlBase + "/AppUsers/:id/order",
              method: "GET",
            },

            // INTERNAL. Use AppUser.order.create() instead.
            "::create::AppUser::order": {
              url: urlBase + "/AppUsers/:id/order",
              method: "POST",
            },

            // INTERNAL. Use AppUser.order.createMany() instead.
            "::createMany::AppUser::order": {
              isArray: true,
              url: urlBase + "/AppUsers/:id/order",
              method: "POST",
            },

            // INTERNAL. Use AppUser.order.destroyAll() instead.
            "::delete::AppUser::order": {
              url: urlBase + "/AppUsers/:id/order",
              method: "DELETE",
            },

            // INTERNAL. Use AppUser.order.count() instead.
            "::count::AppUser::order": {
              url: urlBase + "/AppUsers/:id/order/count",
              method: "GET",
            },

            // INTERNAL. Use Device.order.findById() instead.
            "::findById::Device::order": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Devices/:id/order/:fk",
              method: "GET",
            },

            // INTERNAL. Use Device.order.destroyById() instead.
            "::destroyById::Device::order": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Devices/:id/order/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Device.order.updateById() instead.
            "::updateById::Device::order": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Devices/:id/order/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Device.currentOrder() instead.
            "::get::Device::currentOrder": {
              url: urlBase + "/Devices/:id/currentOrder",
              method: "GET",
            },

            // INTERNAL. Use Device.order() instead.
            "::get::Device::order": {
              isArray: true,
              url: urlBase + "/Devices/:id/order",
              method: "GET",
            },

            // INTERNAL. Use Device.order.create() instead.
            "::create::Device::order": {
              url: urlBase + "/Devices/:id/order",
              method: "POST",
            },

            // INTERNAL. Use Device.order.createMany() instead.
            "::createMany::Device::order": {
              isArray: true,
              url: urlBase + "/Devices/:id/order",
              method: "POST",
            },

            // INTERNAL. Use Device.order.destroyAll() instead.
            "::delete::Device::order": {
              url: urlBase + "/Devices/:id/order",
              method: "DELETE",
            },

            // INTERNAL. Use Device.order.count() instead.
            "::count::Device::order": {
              url: urlBase + "/Devices/:id/order/count",
              method: "GET",
            },
          }
        );




        /**
        * @ngdoc property
        * @name lbServices.Order#modelName
        * @propertyOf lbServices.Order
        * @description
        * The name of the model represented by this $resource,
        * i.e. `Order`.
        */
        R.modelName = "Order";


            /**
             * @ngdoc method
             * @name lbServices.Order#device
             * @methodOf lbServices.Order
             *
             * @description
             *
             * Fetches belongsTo relation device.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Order id
             *
             *  - `refresh` – `{boolean=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Device` object.)
             * </em>
             */
        R.device = function() {
          var TargetResource = $injector.get("Device");
          var action = TargetResource["::get::Order::device"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Order#appUser
             * @methodOf lbServices.Order
             *
             * @description
             *
             * Fetches belongsTo relation appUser.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Order id
             *
             *  - `refresh` – `{boolean=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `AppUser` object.)
             * </em>
             */
        R.appUser = function() {
          var TargetResource = $injector.get("AppUser");
          var action = TargetResource["::get::Order::appUser"];
          return action.apply(R, arguments);
        };


        return R;
      }]);

/**
 * @ngdoc object
 * @name lbServices.DeviceCategory
 * @header lbServices.DeviceCategory
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `DeviceCategory` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
  module.factory(
    "DeviceCategory",
    [
      'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
      function(LoopBackResource, LoopBackAuth, $injector, $q) {
        var R = LoopBackResource(
        urlBase + "/DeviceCategories/:id",
          { 'id': '@id' },
          {

            /**
             * @ngdoc method
             * @name lbServices.DeviceCategory#create
             * @methodOf lbServices.DeviceCategory
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `DeviceCategory` object.)
             * </em>
             */
            "create": {
              url: urlBase + "/DeviceCategories",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.DeviceCategory#createMany
             * @methodOf lbServices.DeviceCategory
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `DeviceCategory` object.)
             * </em>
             */
            "createMany": {
              isArray: true,
              url: urlBase + "/DeviceCategories",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.DeviceCategory#upsert
             * @methodOf lbServices.DeviceCategory
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `DeviceCategory` object.)
             * </em>
             */
            "upsert": {
              url: urlBase + "/DeviceCategories",
              method: "PUT",
            },

            /**
             * @ngdoc method
             * @name lbServices.DeviceCategory#replaceOrCreate
             * @methodOf lbServices.DeviceCategory
             *
             * @description
             *
             * Replace an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `DeviceCategory` object.)
             * </em>
             */
            "replaceOrCreate": {
              url: urlBase + "/DeviceCategories/replaceOrCreate",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.DeviceCategory#upsertWithWhere
             * @methodOf lbServices.DeviceCategory
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source based on the where criteria.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `DeviceCategory` object.)
             * </em>
             */
            "upsertWithWhere": {
              url: urlBase + "/DeviceCategories/upsertWithWhere",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.DeviceCategory#exists
             * @methodOf lbServices.DeviceCategory
             *
             * @description
             *
             * Check whether a model instance exists in the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `exists` – `{boolean=}` -
             */
            "exists": {
              url: urlBase + "/DeviceCategories/:id/exists",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.DeviceCategory#findById
             * @methodOf lbServices.DeviceCategory
             *
             * @description
             *
             * Find a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `filter` – `{object=}` - Filter defining fields and include - must be a JSON-encoded string ({"something":"value"})
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `DeviceCategory` object.)
             * </em>
             */
            "findById": {
              url: urlBase + "/DeviceCategories/:id",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.DeviceCategory#replaceById
             * @methodOf lbServices.DeviceCategory
             *
             * @description
             *
             * Replace attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `DeviceCategory` object.)
             * </em>
             */
            "replaceById": {
              url: urlBase + "/DeviceCategories/:id/replace",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.DeviceCategory#find
             * @methodOf lbServices.DeviceCategory
             *
             * @description
             *
             * Find all instances of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `DeviceCategory` object.)
             * </em>
             */
            "find": {
              isArray: true,
              url: urlBase + "/DeviceCategories",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.DeviceCategory#findOne
             * @methodOf lbServices.DeviceCategory
             *
             * @description
             *
             * Find first instance of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `DeviceCategory` object.)
             * </em>
             */
            "findOne": {
              url: urlBase + "/DeviceCategories/findOne",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.DeviceCategory#updateAll
             * @methodOf lbServices.DeviceCategory
             *
             * @description
             *
             * Update instances of the model matched by {{where}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Information related to the outcome of the operation
             */
            "updateAll": {
              url: urlBase + "/DeviceCategories/update",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.DeviceCategory#deleteById
             * @methodOf lbServices.DeviceCategory
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `DeviceCategory` object.)
             * </em>
             */
            "deleteById": {
              url: urlBase + "/DeviceCategories/:id",
              method: "DELETE",
            },

            /**
             * @ngdoc method
             * @name lbServices.DeviceCategory#count
             * @methodOf lbServices.DeviceCategory
             *
             * @description
             *
             * Count instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
            "count": {
              url: urlBase + "/DeviceCategories/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.DeviceCategory#prototype$updateAttributes
             * @methodOf lbServices.DeviceCategory
             *
             * @description
             *
             * Patch attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - DeviceCategory id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `DeviceCategory` object.)
             * </em>
             */
            "prototype$updateAttributes": {
              url: urlBase + "/DeviceCategories/:id",
              method: "PUT",
            },

            /**
             * @ngdoc method
             * @name lbServices.DeviceCategory#createChangeStream
             * @methodOf lbServices.DeviceCategory
             *
             * @description
             *
             * Create a change stream.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `changes` – `{ReadableStream=}` -
             */
            "createChangeStream": {
              url: urlBase + "/DeviceCategories/change-stream",
              method: "POST",
            },
          }
        );



            /**
             * @ngdoc method
             * @name lbServices.DeviceCategory#patchOrCreate
             * @methodOf lbServices.DeviceCategory
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `DeviceCategory` object.)
             * </em>
             */
        R["patchOrCreate"] = R["upsert"];

            /**
             * @ngdoc method
             * @name lbServices.DeviceCategory#updateOrCreate
             * @methodOf lbServices.DeviceCategory
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `DeviceCategory` object.)
             * </em>
             */
        R["updateOrCreate"] = R["upsert"];

            /**
             * @ngdoc method
             * @name lbServices.DeviceCategory#patchOrCreateWithWhere
             * @methodOf lbServices.DeviceCategory
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source based on the where criteria.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `DeviceCategory` object.)
             * </em>
             */
        R["patchOrCreateWithWhere"] = R["upsertWithWhere"];

            /**
             * @ngdoc method
             * @name lbServices.DeviceCategory#update
             * @methodOf lbServices.DeviceCategory
             *
             * @description
             *
             * Update instances of the model matched by {{where}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Information related to the outcome of the operation
             */
        R["update"] = R["updateAll"];

            /**
             * @ngdoc method
             * @name lbServices.DeviceCategory#destroyById
             * @methodOf lbServices.DeviceCategory
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `DeviceCategory` object.)
             * </em>
             */
        R["destroyById"] = R["deleteById"];

            /**
             * @ngdoc method
             * @name lbServices.DeviceCategory#removeById
             * @methodOf lbServices.DeviceCategory
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `DeviceCategory` object.)
             * </em>
             */
        R["removeById"] = R["deleteById"];

            /**
             * @ngdoc method
             * @name lbServices.DeviceCategory#patchAttributes
             * @methodOf lbServices.DeviceCategory
             *
             * @description
             *
             * Patch attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - DeviceCategory id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `DeviceCategory` object.)
             * </em>
             */
        R["patchAttributes"] = R["prototype$updateAttributes"];


        /**
        * @ngdoc property
        * @name lbServices.DeviceCategory#modelName
        * @propertyOf lbServices.DeviceCategory
        * @description
        * The name of the model represented by this $resource,
        * i.e. `DeviceCategory`.
        */
        R.modelName = "DeviceCategory";



        return R;
      }]);

/**
 * @ngdoc object
 * @name lbServices.Address
 * @header lbServices.Address
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Address` model.
 *
 * **Details**
 *
 * 用户地址信息
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
  module.factory(
    "Address",
    [
      'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
      function(LoopBackResource, LoopBackAuth, $injector, $q) {
        var R = LoopBackResource(
        urlBase + "/Addresses/:id",
          { 'id': '@id' },
          {

            // INTERNAL. Use Address.appUser() instead.
            "prototype$__get__appUser": {
              url: urlBase + "/Addresses/:id/appUser",
              method: "GET",
            },

            // INTERNAL. Use AppUser.address.findById() instead.
            "::findById::AppUser::address": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/AppUsers/:id/address/:fk",
              method: "GET",
            },

            // INTERNAL. Use AppUser.address() instead.
            "::get::AppUser::address": {
              isArray: true,
              url: urlBase + "/AppUsers/:id/address",
              method: "GET",
            },

            // INTERNAL. Use AppUser.address.count() instead.
            "::count::AppUser::address": {
              url: urlBase + "/AppUsers/:id/address/count",
              method: "GET",
            },
          }
        );




        /**
        * @ngdoc property
        * @name lbServices.Address#modelName
        * @propertyOf lbServices.Address
        * @description
        * The name of the model represented by this $resource,
        * i.e. `Address`.
        */
        R.modelName = "Address";


            /**
             * @ngdoc method
             * @name lbServices.Address#appUser
             * @methodOf lbServices.Address
             *
             * @description
             *
             * Fetches belongsTo relation appUser.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Address id
             *
             *  - `refresh` – `{boolean=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `AppUser` object.)
             * </em>
             */
        R.appUser = function() {
          var TargetResource = $injector.get("AppUser");
          var action = TargetResource["::get::Address::appUser"];
          return action.apply(R, arguments);
        };


        return R;
      }]);

/**
 * @ngdoc object
 * @name lbServices.UserOnline
 * @header lbServices.UserOnline
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `UserOnline` model.
 *
 * **Details**
 *
 * 在线用户描述
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
  module.factory(
    "UserOnline",
    [
      'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
      function(LoopBackResource, LoopBackAuth, $injector, $q) {
        var R = LoopBackResource(
        urlBase + "/UserOnlines/:id",
          { 'id': '@id' },
          {

            // INTERNAL. Use UserOnline.device() instead.
            "prototype$__get__device": {
              url: urlBase + "/UserOnlines/:id/device",
              method: "GET",
            },

            // INTERNAL. Use UserOnline.appUser() instead.
            "prototype$__get__appUser": {
              url: urlBase + "/UserOnlines/:id/appUser",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.UserOnline#exists
             * @methodOf lbServices.UserOnline
             *
             * @description
             *
             * Check whether a model instance exists in the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `exists` – `{boolean=}` -
             */
            "exists": {
              url: urlBase + "/UserOnlines/:id/exists",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.UserOnline#findById
             * @methodOf lbServices.UserOnline
             *
             * @description
             *
             * Find a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `filter` – `{object=}` - Filter defining fields and include - must be a JSON-encoded string ({"something":"value"})
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `UserOnline` object.)
             * </em>
             */
            "findById": {
              url: urlBase + "/UserOnlines/:id",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.UserOnline#find
             * @methodOf lbServices.UserOnline
             *
             * @description
             *
             * Find all instances of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `UserOnline` object.)
             * </em>
             */
            "find": {
              isArray: true,
              url: urlBase + "/UserOnlines",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.UserOnline#findOne
             * @methodOf lbServices.UserOnline
             *
             * @description
             *
             * Find first instance of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `UserOnline` object.)
             * </em>
             */
            "findOne": {
              url: urlBase + "/UserOnlines/findOne",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.UserOnline#count
             * @methodOf lbServices.UserOnline
             *
             * @description
             *
             * Count instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
            "count": {
              url: urlBase + "/UserOnlines/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.UserOnline#createChangeStream
             * @methodOf lbServices.UserOnline
             *
             * @description
             *
             * Create a change stream.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `changes` – `{ReadableStream=}` -
             */
            "createChangeStream": {
              url: urlBase + "/UserOnlines/change-stream",
              method: "POST",
            },

            // INTERNAL. Use AppUser.userOnline.findById() instead.
            "::findById::AppUser::userOnline": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/AppUsers/:id/userOnline/:fk",
              method: "GET",
            },

            // INTERNAL. Use AppUser.userOnline.destroyById() instead.
            "::destroyById::AppUser::userOnline": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/AppUsers/:id/userOnline/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use AppUser.userOnline.updateById() instead.
            "::updateById::AppUser::userOnline": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/AppUsers/:id/userOnline/:fk",
              method: "PUT",
            },

            // INTERNAL. Use AppUser.userOnline() instead.
            "::get::AppUser::userOnline": {
              isArray: true,
              url: urlBase + "/AppUsers/:id/userOnline",
              method: "GET",
            },

            // INTERNAL. Use AppUser.userOnline.create() instead.
            "::create::AppUser::userOnline": {
              url: urlBase + "/AppUsers/:id/userOnline",
              method: "POST",
            },

            // INTERNAL. Use AppUser.userOnline.createMany() instead.
            "::createMany::AppUser::userOnline": {
              isArray: true,
              url: urlBase + "/AppUsers/:id/userOnline",
              method: "POST",
            },

            // INTERNAL. Use AppUser.userOnline.destroyAll() instead.
            "::delete::AppUser::userOnline": {
              url: urlBase + "/AppUsers/:id/userOnline",
              method: "DELETE",
            },

            // INTERNAL. Use AppUser.userOnline.count() instead.
            "::count::AppUser::userOnline": {
              url: urlBase + "/AppUsers/:id/userOnline/count",
              method: "GET",
            },

            // INTERNAL. Use Device.userOnline.findById() instead.
            "::findById::Device::userOnline": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Devices/:id/userOnline/:fk",
              method: "GET",
            },

            // INTERNAL. Use Device.userOnline.destroyById() instead.
            "::destroyById::Device::userOnline": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Devices/:id/userOnline/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Device.userOnline.updateById() instead.
            "::updateById::Device::userOnline": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Devices/:id/userOnline/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Device.userOnline() instead.
            "::get::Device::userOnline": {
              isArray: true,
              url: urlBase + "/Devices/:id/userOnline",
              method: "GET",
            },

            // INTERNAL. Use Device.userOnline.create() instead.
            "::create::Device::userOnline": {
              url: urlBase + "/Devices/:id/userOnline",
              method: "POST",
            },

            // INTERNAL. Use Device.userOnline.createMany() instead.
            "::createMany::Device::userOnline": {
              isArray: true,
              url: urlBase + "/Devices/:id/userOnline",
              method: "POST",
            },

            // INTERNAL. Use Device.userOnline.destroyAll() instead.
            "::delete::Device::userOnline": {
              url: urlBase + "/Devices/:id/userOnline",
              method: "DELETE",
            },

            // INTERNAL. Use Device.userOnline.count() instead.
            "::count::Device::userOnline": {
              url: urlBase + "/Devices/:id/userOnline/count",
              method: "GET",
            },
          }
        );




        /**
        * @ngdoc property
        * @name lbServices.UserOnline#modelName
        * @propertyOf lbServices.UserOnline
        * @description
        * The name of the model represented by this $resource,
        * i.e. `UserOnline`.
        */
        R.modelName = "UserOnline";


            /**
             * @ngdoc method
             * @name lbServices.UserOnline#device
             * @methodOf lbServices.UserOnline
             *
             * @description
             *
             * Fetches belongsTo relation device.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - UserOnline id
             *
             *  - `refresh` – `{boolean=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Device` object.)
             * </em>
             */
        R.device = function() {
          var TargetResource = $injector.get("Device");
          var action = TargetResource["::get::UserOnline::device"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.UserOnline#appUser
             * @methodOf lbServices.UserOnline
             *
             * @description
             *
             * Fetches belongsTo relation appUser.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - UserOnline id
             *
             *  - `refresh` – `{boolean=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `AppUser` object.)
             * </em>
             */
        R.appUser = function() {
          var TargetResource = $injector.get("AppUser");
          var action = TargetResource["::get::UserOnline::appUser"];
          return action.apply(R, arguments);
        };


        return R;
      }]);

/**
 * @ngdoc object
 * @name lbServices.Manager
 * @header lbServices.Manager
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Manager` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
  module.factory(
    "Manager",
    [
      'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
      function(LoopBackResource, LoopBackAuth, $injector, $q) {
        var R = LoopBackResource(
        urlBase + "/Managers/:id",
          { 'id': '@id' },
          {

            /**
             * @ngdoc method
             * @name lbServices.Manager#prototype$__findById__accessTokens
             * @methodOf lbServices.Manager
             *
             * @description
             *
             * Find a related item by id for accessTokens.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Manager id
             *
             *  - `fk` – `{*}` - Foreign key for accessTokens
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Manager` object.)
             * </em>
             */
            "prototype$__findById__accessTokens": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Managers/:id/accessTokens/:fk",
              method: "GET",
            },

            // INTERNAL. Use Manager.device.findById() instead.
            "prototype$__findById__device": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Managers/:id/device/:fk",
              method: "GET",
            },

            // INTERNAL. Use Manager.device.destroyById() instead.
            "prototype$__destroyById__device": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Managers/:id/device/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Manager.device.updateById() instead.
            "prototype$__updateById__device": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Managers/:id/device/:fk",
              method: "PUT",
            },

            /**
             * @ngdoc method
             * @name lbServices.Manager#prototype$__get__accessTokens
             * @methodOf lbServices.Manager
             *
             * @description
             *
             * Queries accessTokens of Manager.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Manager id
             *
             *  - `filter` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Manager` object.)
             * </em>
             */
            "prototype$__get__accessTokens": {
              isArray: true,
              url: urlBase + "/Managers/:id/accessTokens",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Manager#prototype$__count__accessTokens
             * @methodOf lbServices.Manager
             *
             * @description
             *
             * Counts accessTokens of Manager.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Manager id
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
            "prototype$__count__accessTokens": {
              url: urlBase + "/Managers/:id/accessTokens/count",
              method: "GET",
            },

            // INTERNAL. Use Manager.device() instead.
            "prototype$__get__device": {
              isArray: true,
              url: urlBase + "/Managers/:id/device",
              method: "GET",
            },

            // INTERNAL. Use Manager.device.create() instead.
            "prototype$__create__device": {
              url: urlBase + "/Managers/:id/device",
              method: "POST",
            },

            // INTERNAL. Use Manager.device.destroyAll() instead.
            "prototype$__delete__device": {
              url: urlBase + "/Managers/:id/device",
              method: "DELETE",
            },

            // INTERNAL. Use Manager.device.count() instead.
            "prototype$__count__device": {
              url: urlBase + "/Managers/:id/device/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Manager#login
             * @methodOf lbServices.Manager
             *
             * @description
             *
             * Login a user with username/email and password.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `include` – `{string=}` - Related objects to include in the response. See the description of return value for more details.
             *   Default value: `user`.
             *
             *  - `rememberMe` - `boolean` - Whether the authentication credentials
             *     should be remembered in localStorage across app/browser restarts.
             *     Default: `true`.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * The response body contains properties of the AccessToken created on login.
             * Depending on the value of `include` parameter, the body may contain additional properties:
             *   - `user` - `U+007BUserU+007D` - Data of the currently logged in user. (`include=user`)
             *
             */
            "login": {
              params: {
                include: 'user',
              },
              interceptor: {
                response: function(response) {
                  var accessToken = response.data;
                  LoopBackAuth.setUser(
                    accessToken.id, accessToken.userId, accessToken.user);
                  LoopBackAuth.rememberMe =
                    response.config.params.rememberMe !== false;
                  LoopBackAuth.save();
                  return response.resource;
                },
              },
              url: urlBase + "/Managers/login",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Manager#logout
             * @methodOf lbServices.Manager
             *
             * @description
             *
             * Logout a user with access token.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `access_token` – `{string=}` - Do not supply this argument, it is automatically extracted from request headers.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "logout": {
              interceptor: {
                response: function(response) {
                  LoopBackAuth.clearUser();
                  LoopBackAuth.clearStorage();
                  return response.resource;
                },
                responseError: function(responseError) {
                  LoopBackAuth.clearUser();
                  LoopBackAuth.clearStorage();
                  return responseError.resource;
                },
              },
              url: urlBase + "/Managers/logout",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Manager#confirm
             * @methodOf lbServices.Manager
             *
             * @description
             *
             * Confirm a user registration with email verification token.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `uid` – `{string}` -
             *
             *  - `token` – `{string}` -
             *
             *  - `redirect` – `{string=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "confirm": {
              url: urlBase + "/Managers/confirm",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Manager#resetPassword
             * @methodOf lbServices.Manager
             *
             * @description
             *
             * Reset password for a user with email.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "resetPassword": {
              url: urlBase + "/Managers/reset",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Manager#prototype$unbindDevice
             * @methodOf lbServices.Manager
             *
             * @description
             *
             * 解绑设备.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Manager id
             *
             * @param {Object} postData Request data.
             *
             *  - `deviceId` – `{string}` - 设备ID
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * 设备信息
             */
            "prototype$unbindDevice": {
              url: urlBase + "/Managers/:id/unbindDevice",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Manager#prototype$bindDevice
             * @methodOf lbServices.Manager
             *
             * @description
             *
             * 绑定设备.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Manager id
             *
             * @param {Object} postData Request data.
             *
             *  - `deviceInfo` – `{object}` - {
             *             "deviceId": "AABBCCDDEEFF",
             *             "imageUrl": "图片地址",
             *             "name":"设备名称",
             *             "desc": "设备描述",
             *             "bodyLength": "体长",
             *             "price": "价格",
             *             "frontCameraUrl": "前置摄像头Url",
             *             "sideCameraUrl": "侧面摄像头Url"
             *           }
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * 设备信息
             */
            "prototype$bindDevice": {
              url: urlBase + "/Managers/:id/bindDevice",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Manager#prototype$getAllUserInfo
             * @methodOf lbServices.Manager
             *
             * @description
             *
             * 获取所有用户信息.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Manager id
             *
             *  - `skip` – `{Number}` - skip
             *
             *  - `limit` – `{Number}` - limit
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Manager` object.)
             * </em>
             */
            "prototype$getAllUserInfo": {
              url: urlBase + "/Managers/:id/getAllUserInfo",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Manager#prototype$getAllOrderInfo
             * @methodOf lbServices.Manager
             *
             * @description
             *
             * 获取所有订单信息.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Manager id
             *
             *  - `skip` – `{Number}` - skip
             *
             *  - `limit` – `{Number}` - limit
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Manager` object.)
             * </em>
             */
            "prototype$getAllOrderInfo": {
              url: urlBase + "/Managers/:id/getAllOrderInfo",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Manager#prototype$getAllDeviceInfo
             * @methodOf lbServices.Manager
             *
             * @description
             *
             * 获取设备信息.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Manager id
             *
             *  - `skip` – `{Number}` - skip
             *
             *  - `limit` – `{Number}` - limit
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Manager` object.)
             * </em>
             */
            "prototype$getAllDeviceInfo": {
              url: urlBase + "/Managers/:id/getAllDeviceInfo",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Manager#prototype$setOrderDeliverGoodsStatus
             * @methodOf lbServices.Manager
             *
             * @description
             *
             * 设置订单的发货状态.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Manager id
             *
             * @param {Object} postData Request data.
             *
             *  - `orderId` – `{string}` - 订单ID
             *
             *  - `deliverGoodsStatus` – `{string}` - 订单的发货状态
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Manager` object.)
             * </em>
             */
            "prototype$setOrderDeliverGoodsStatus": {
              url: urlBase + "/Managers/:id/setOrderDeliverGoodsStatus",
              method: "POST",
            },

            // INTERNAL. Use Device.manager() instead.
            "::get::Device::manager": {
              url: urlBase + "/Devices/:id/manager",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Manager#getCurrent
             * @methodOf lbServices.Manager
             *
             * @description
             *
             * Get data of the currently logged user. Fail with HTTP result 401
             * when there is no user logged in.
             *
             * @param {function(Object,Object)=} successCb
             *    Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *    `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             */
            'getCurrent': {
              url: urlBase + "/Managers" + '/:id',
              method: 'GET',
              params: {
                id: function() {
                  var id = LoopBackAuth.currentUserId;
                  if (id == null) id = '__anonymous__';
                  return id;
                },
              },
              interceptor: {
                response: function(response) {
                  LoopBackAuth.currentUserData = response.data;
                  return response.resource;
                },
                responseError: function(responseError) {
                  LoopBackAuth.clearUser();
                  LoopBackAuth.clearStorage();
                  return $q.reject(responseError);
                },
              },
              __isGetCurrentUser__: true,
            },
          }
        );



        /**
         * @ngdoc method
         * @name lbServices.Manager#getCachedCurrent
         * @methodOf lbServices.Manager
         *
         * @description
         *
         * Get data of the currently logged user that was returned by the last
         * call to {@link lbServices.Manager#login} or
         * {@link lbServices.Manager#getCurrent}. Return null when there
         * is no user logged in or the data of the current user were not fetched
         * yet.
         *
         * @returns {Object} A Manager instance.
         */
        R.getCachedCurrent = function() {
          var data = LoopBackAuth.currentUserData;
          return data ? new R(data) : null;
        };

        /**
         * @ngdoc method
         * @name lbServices.Manager#isAuthenticated
         * @methodOf lbServices.Manager
         *
         * @returns {boolean} True if the current user is authenticated (logged in).
         */
        R.isAuthenticated = function() {
          return this.getCurrentId() != null;
        };

        /**
         * @ngdoc method
         * @name lbServices.Manager#getCurrentId
         * @methodOf lbServices.Manager
         *
         * @returns {Object} Id of the currently logged-in user or null.
         */
        R.getCurrentId = function() {
          return LoopBackAuth.currentUserId;
        };

        /**
        * @ngdoc property
        * @name lbServices.Manager#modelName
        * @propertyOf lbServices.Manager
        * @description
        * The name of the model represented by this $resource,
        * i.e. `Manager`.
        */
        R.modelName = "Manager";

    /**
     * @ngdoc object
     * @name lbServices.Manager.device
     * @header lbServices.Manager.device
     * @object
     * @description
     *
     * The object `Manager.device` groups methods
     * manipulating `Device` instances related to `Manager`.
     *
     * Call {@link lbServices.Manager#device Manager.device()}
     * to query all related instances.
     */


            /**
             * @ngdoc method
             * @name lbServices.Manager#device
             * @methodOf lbServices.Manager
             *
             * @description
             *
             * Queries device of Manager.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Manager id
             *
             *  - `filter` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Device` object.)
             * </em>
             */
        R.device = function() {
          var TargetResource = $injector.get("Device");
          var action = TargetResource["::get::Manager::device"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Manager.device#count
             * @methodOf lbServices.Manager.device
             *
             * @description
             *
             * Counts device of Manager.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Manager id
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
        R.device.count = function() {
          var TargetResource = $injector.get("Device");
          var action = TargetResource["::count::Manager::device"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Manager.device#create
             * @methodOf lbServices.Manager.device
             *
             * @description
             *
             * Creates a new instance in device of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Manager id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Device` object.)
             * </em>
             */
        R.device.create = function() {
          var TargetResource = $injector.get("Device");
          var action = TargetResource["::create::Manager::device"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Manager.device#createMany
             * @methodOf lbServices.Manager.device
             *
             * @description
             *
             * Creates a new instance in device of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Manager id
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Device` object.)
             * </em>
             */
        R.device.createMany = function() {
          var TargetResource = $injector.get("Device");
          var action = TargetResource["::createMany::Manager::device"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Manager.device#destroyAll
             * @methodOf lbServices.Manager.device
             *
             * @description
             *
             * Deletes all device of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Manager id
             *
             *  - `where` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.device.destroyAll = function() {
          var TargetResource = $injector.get("Device");
          var action = TargetResource["::delete::Manager::device"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Manager.device#destroyById
             * @methodOf lbServices.Manager.device
             *
             * @description
             *
             * Delete a related item by id for device.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Manager id
             *
             *  - `fk` – `{*}` - Foreign key for device
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.device.destroyById = function() {
          var TargetResource = $injector.get("Device");
          var action = TargetResource["::destroyById::Manager::device"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Manager.device#findById
             * @methodOf lbServices.Manager.device
             *
             * @description
             *
             * Find a related item by id for device.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Manager id
             *
             *  - `fk` – `{*}` - Foreign key for device
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Device` object.)
             * </em>
             */
        R.device.findById = function() {
          var TargetResource = $injector.get("Device");
          var action = TargetResource["::findById::Manager::device"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Manager.device#updateById
             * @methodOf lbServices.Manager.device
             *
             * @description
             *
             * Update a related item by id for device.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Manager id
             *
             *  - `fk` – `{*}` - Foreign key for device
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Device` object.)
             * </em>
             */
        R.device.updateById = function() {
          var TargetResource = $injector.get("Device");
          var action = TargetResource["::updateById::Manager::device"];
          return action.apply(R, arguments);
        };


        return R;
      }]);


  module
  .factory('LoopBackAuth', function() {
    var props = ['accessTokenId', 'currentUserId', 'rememberMe'];
    var propsPrefix = '$LoopBack$';

    function LoopBackAuth() {
      var self = this;
      props.forEach(function(name) {
        self[name] = load(name);
      });
      this.currentUserData = null;
    }

    LoopBackAuth.prototype.save = function() {
      var self = this;
      var storage = this.rememberMe ? localStorage : sessionStorage;
      props.forEach(function(name) {
        save(storage, name, self[name]);
      });
    };

    LoopBackAuth.prototype.setUser = function(accessTokenId, userId, userData) {
      this.accessTokenId = accessTokenId;
      this.currentUserId = userId;
      this.currentUserData = userData;
    };

    LoopBackAuth.prototype.clearUser = function() {
      this.accessTokenId = null;
      this.currentUserId = null;
      this.currentUserData = null;
    };

    LoopBackAuth.prototype.clearStorage = function() {
      props.forEach(function(name) {
        save(sessionStorage, name, null);
        save(localStorage, name, null);
      });
    };

    return new LoopBackAuth();

    // Note: LocalStorage converts the value to string
    // We are using empty string as a marker for null/undefined values.
    function save(storage, name, value) {
      try {
        var key = propsPrefix + name;
        if (value == null) value = '';
        storage[key] = value;
      } catch (err) {
        console.log('Cannot access local/session storage:', err);
      }
    }

    function load(name) {
      var key = propsPrefix + name;
      return localStorage[key] || sessionStorage[key] || null;
    }
  })
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('LoopBackAuthRequestInterceptor');
  }])
  .factory('LoopBackAuthRequestInterceptor', ['$q', 'LoopBackAuth',
    function($q, LoopBackAuth) {
      return {
        'request': function(config) {
          // filter out external requests
          var host = getHost(config.url);
          if (host && host !== urlBaseHost) {
            return config;
          }

          if (LoopBackAuth.accessTokenId) {
            config.headers[authHeader] = LoopBackAuth.accessTokenId;
          } else if (config.__isGetCurrentUser__) {
            // Return a stub 401 error for User.getCurrent() when
            // there is no user logged in
            var res = {
              body: { error: { status: 401 }},
              status: 401,
              config: config,
              headers: function() { return undefined; },
            };
            return $q.reject(res);
          }
          return config || $q.when(config);
        },
      };
    }])

  /**
   * @ngdoc object
   * @name lbServices.LoopBackResourceProvider
   * @header lbServices.LoopBackResourceProvider
   * @description
   * Use `LoopBackResourceProvider` to change the global configuration
   * settings used by all models. Note that the provider is available
   * to Configuration Blocks only, see
   * {@link https://docs.angularjs.org/guide/module#module-loading-dependencies Module Loading & Dependencies}
   * for more details.
   *
   * ## Example
   *
   * ```js
   * angular.module('app')
   *  .config(function(LoopBackResourceProvider) {
   *     LoopBackResourceProvider.setAuthHeader('X-Access-Token');
   *  });
   * ```
   */
  .provider('LoopBackResource', function LoopBackResourceProvider() {
    /**
     * @ngdoc method
     * @name lbServices.LoopBackResourceProvider#setAuthHeader
     * @methodOf lbServices.LoopBackResourceProvider
     * @param {string} header The header name to use, e.g. `X-Access-Token`
     * @description
     * Configure the REST transport to use a different header for sending
     * the authentication token. It is sent in the `Authorization` header
     * by default.
     */
    this.setAuthHeader = function(header) {
      authHeader = header;
    };

    /**
     * @ngdoc method
     * @name lbServices.LoopBackResourceProvider#getAuthHeader
     * @methodOf lbServices.LoopBackResourceProvider
     * @description
     * Get the header name that is used for sending the authentication token.
     */
    this.getAuthHeader = function() {
      return authHeader;
    };

    /**
     * @ngdoc method
     * @name lbServices.LoopBackResourceProvider#setUrlBase
     * @methodOf lbServices.LoopBackResourceProvider
     * @param {string} url The URL to use, e.g. `/api` or `//example.com/api`.
     * @description
     * Change the URL of the REST API server. By default, the URL provided
     * to the code generator (`lb-ng` or `grunt-loopback-sdk-angular`) is used.
     */
    this.setUrlBase = function(url) {
      urlBase = url;
      urlBaseHost = getHost(urlBase) || location.host;
    };

    /**
     * @ngdoc method
     * @name lbServices.LoopBackResourceProvider#getUrlBase
     * @methodOf lbServices.LoopBackResourceProvider
     * @description
     * Get the URL of the REST API server. The URL provided
     * to the code generator (`lb-ng` or `grunt-loopback-sdk-angular`) is used.
     */
    this.getUrlBase = function() {
      return urlBase;
    };

    this.$get = ['$resource', function($resource) {
      var LoopBackResource = function(url, params, actions) {
        var resource = $resource(url, params, actions);

        // Angular always calls POST on $save()
        // This hack is based on
        // http://kirkbushell.me/angular-js-using-ng-resource-in-a-more-restful-manner/
        resource.prototype.$save = function(success, error) {
          // Fortunately, LoopBack provides a convenient `upsert` method
          // that exactly fits our needs.
          var result = resource.upsert.call(this, {}, this, success, error);
          return result.$promise || result;
        };
        return resource;
      };

      LoopBackResource.getUrlBase = function() {
        return urlBase;
      };

      LoopBackResource.getAuthHeader = function() {
        return authHeader;
      };

      return LoopBackResource;
    }];
  });
})(window, window.angular);
