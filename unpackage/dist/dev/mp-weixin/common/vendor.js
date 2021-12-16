(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 3));
var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 4);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var realAtob;

var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;

if (typeof atob !== 'function') {
  realAtob = function realAtob(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, '');
    if (!b64re.test(str)) {throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");}

    // Adding the padding if missing, for semplicity
    str += '=='.slice(2 - (str.length & 3));
    var bitmap;var result = '';var r1;var r2;var i = 0;
    for (; i < str.length;) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 |
      (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));

      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) :
      r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) :
      String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  // 注意atob只能在全局对象上调用，例如：`const Base64 = {atob};Base64.atob('xxxx')`是错误的用法
  realAtob = atob;
}

function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0 };

  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}

function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {var _getCurrentUserInfo =


    getCurrentUserInfo(),role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {var _getCurrentUserInfo2 =


    getCurrentUserInfo(),permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {var _getCurrentUserInfo3 =


    getCurrentUserInfo(),tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

function getLocale() {
  // 优先使用 $locale
  var app = getApp({
    allowDefault: true });

  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return wx.getSystemInfoSync().language || 'zh-Hans';
}

function setLocale(locale) {
  var app = getApp();
  if (!app) {
    return false;
  }
  var oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach(function (fn) {return fn({
        locale: locale });});

    return true;
  }
  return false;
}

var onLocaleChangeCallbacks = [];
function onLocaleChange(fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
}

if (typeof global !== 'undefined') {
  global.getLocale = getLocale;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  getLocale: getLocale,
  setLocale: setLocale,
  onLocaleChange: onLocaleChange,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options, isComponent) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"globalSourcing","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var locale;

{
  locale = wx.getSystemInfoSync().language;
}

var i18n = (0, _uniI18n.initVueI18n)(
locale,
{});

var t = i18n.t;
var i18nMixin = i18n.mixin = {
  beforeCreate: function beforeCreate() {var _this2 = this;
    var unwatch = i18n.i18n.watchLocale(function () {
      _this2.$forceUpdate();
    });
    this.$once('hook:beforeDestroy', function () {
      unwatch();
    });
  },
  methods: {
    $$t: function $$t(key, values) {
      return t(key, values);
    } } };


var setLocale$1 = i18n.setLocale;
var getLocale$1 = i18n.getLocale;

function initAppLocale(Vue, appVm, locale) {
  var state = Vue.observable({
    locale: locale || i18n.getLocale() });

  var localeWatchers = [];
  appVm.$watchLocale = function (fn) {
    localeWatchers.push(fn);
  };
  Object.defineProperty(appVm, '$locale', {
    get: function get() {
      return state.locale;
    },
    set: function set(v) {
      state.locale = v;
      localeWatchers.forEach(function (watch) {return watch(v);});
    } });

}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      var object = center[vueId] = center[vueId] || {};
      object[name] = value;
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initAppLocale(_vue.default, vm, wx.getSystemInfoSync().language || 'zh-Hans');

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      appOptions.onShow.apply(vm, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      appOptions.onHide.apply(vm, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(vm, args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),
/* 2 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 3 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou'){//百度、快手 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    // NOTE 此处将 != 修改为 !==。涉及地方太多恐怕测试不到，如果出现数据对比问题，将其修改回来。
                    if (currentValue !== pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_NAME":"globalSourcing","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"globalSourcing","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"globalSourcing","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"globalSourcing","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 2)))

/***/ }),
/* 4 */
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.es.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, global) {Object.defineProperty(exports, "__esModule", { value: true });exports.compileI18nJsonStr = compileI18nJsonStr;exports.hasI18nJson = hasI18nJson;exports.initVueI18n = initVueI18n;exports.isI18nStr = isI18nStr;exports.normalizeLocale = normalizeLocale;exports.parseI18nJson = parseI18nJson;exports.resolveLocale = resolveLocale;exports.isString = exports.LOCALE_ZH_HANT = exports.LOCALE_ZH_HANS = exports.LOCALE_FR = exports.LOCALE_ES = exports.LOCALE_EN = exports.I18n = exports.Formatter = void 0;function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var isArray = Array.isArray;
var isObject = function isObject(val) {return val !== null && typeof val === 'object';};
var defaultDelimiters = ['{', '}'];var
BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {_classCallCheck(this, BaseFormatter);
    this._caches = Object.create(null);
  }_createClass(BaseFormatter, [{ key: "interpolate", value: function interpolate(
    message, values) {var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultDelimiters;
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    } }]);return BaseFormatter;}();exports.Formatter = BaseFormatter;

var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, _ref) {var _ref2 = _slicedToArray(_ref, 2),startDelimiter = _ref2[0],endDelimiter = _ref2[1];
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({ type: 'text', value: text });
      }
      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === endDelimiter;
      var type = RE_TOKEN_LIST_VALUE.test(sub) ?
      'list' :
      isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ?
      'named' :
      'unknown';
      tokens.push({ value: sub, type: type });
    }
    //  else if (char === '%') {
    //   // when found rails i18n syntax, skip text capture
    //   if (format[position] !== '{') {
    //     text += char
    //   }
    // }
    else {
        text += char;
      }
  }
  text && tokens.push({ type: 'text', value: text });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = isArray(values) ?
  'list' :
  isObject(values) ?
  'named' :
  'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else
        {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;}

    index++;
  }
  return compiled;
}

var LOCALE_ZH_HANS = 'zh-Hans';exports.LOCALE_ZH_HANS = LOCALE_ZH_HANS;
var LOCALE_ZH_HANT = 'zh-Hant';exports.LOCALE_ZH_HANT = LOCALE_ZH_HANT;
var LOCALE_EN = 'en';exports.LOCALE_EN = LOCALE_EN;
var LOCALE_FR = 'fr';exports.LOCALE_FR = LOCALE_FR;
var LOCALE_ES = 'es';exports.LOCALE_ES = LOCALE_ES;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {return hasOwnProperty.call(val, key);};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {return str.indexOf(part) !== -1;});
}
function startsWith(str, parts) {
  return parts.find(function (part) {return str.indexOf(part) === 0;});
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}var
I18n = /*#__PURE__*/function () {
  function I18n(_ref3) {var locale = _ref3.locale,fallbackLocale = _ref3.fallbackLocale,messages = _ref3.messages,watcher = _ref3.watcher,formater = _ref3.formater;_classCallCheck(this, I18n);
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }_createClass(I18n, [{ key: "setLocale", value: function setLocale(
    locale) {var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        // 可能初始化时不存在
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      // 仅发生变化时，通知
      if (oldLocale !== this.locale) {
        this.watchers.forEach(function (watcher) {
          watcher(_this.locale, oldLocale);
        });
      }
    } }, { key: "getLocale", value: function getLocale()
    {
      return this.locale;
    } }, { key: "watchLocale", value: function watchLocale(
    fn) {var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    } }, { key: "add", value: function add(
    locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else
        {
          Object.keys(message).forEach(function (key) {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else
      {
        this.messages[locale] = message;
      }
    } }, { key: "f", value: function f(
    message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join('');
    } }, { key: "t", value: function t(
    key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else
      {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    } }]);return I18n;}();exports.I18n = I18n;


function watchAppLocale(appVm, i18n) {
  // 需要保证 watch 的触发在组件渲染之前
  if (appVm.$watchLocale) {
    // vue2
    appVm.$watchLocale(function (newLocale) {
      i18n.setLocale(newLocale);
    });
  } else
  {
    appVm.$watch(function () {return appVm.$locale;}, function (newLocale) {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof uni !== 'undefined' && uni.getLocale) {
    return uni.getLocale();
  }
  // 小程序平台，uni 和 uni-i18n 互相引用，导致访问不到 uni，故在 global 上挂了 getLocale
  if (typeof global !== 'undefined' && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale) {var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var fallbackLocale = arguments.length > 2 ? arguments[2] : undefined;var watcher = arguments.length > 3 ? arguments[3] : undefined;
  // 兼容旧版本入参
  if (typeof locale !== 'string') {var _ref4 =
    [
    messages,
    locale];locale = _ref4[0];messages = _ref4[1];

  }
  if (typeof locale !== 'string') {
    // 因为小程序平台，uni-i18n 和 uni 互相引用，导致此时访问 uni 时，为 undefined
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== 'string') {
    fallbackLocale =
    typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale ||
    LOCALE_EN;
  }
  var i18n = new I18n({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    watcher: watcher });

  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else
    {
      var isWatchedAppLocale = false;
      _t = function t(key, values) {
        var appVm = getApp().$vm;
        // 可能$vm还不存在，比如在支付宝小程序中，组件定义较早，在props的default里使用了t()函数（如uni-goods-nav），此时app还未初始化
        // options: {
        // 	type: Array,
        // 	default () {
        // 		return [{
        // 			icon: 'shop',
        // 			text: t("uni-goods-nav.options.shop"),
        // 		}, {
        // 			icon: 'cart',
        // 			text: t("uni-goods-nav.options.cart")
        // 		}]
        // 	}
        // },
        if (appVm) {
          // 触发响应式
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key, values);
      };
    }
    return _t(key, values);
  };
  return {
    i18n: i18n,
    f: function f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t: function t(key, values) {
      return _t(key, values);
    },
    add: function add(locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return i18n.add(locale, message, override);
    },
    watch: function watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    } };

}

var isString = function isString(val) {return typeof val === 'string';};exports.isString = isString;
var formater;
function hasI18nJson(jsonObj, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  return walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        return true;
      }
    } else
    {
      return hasI18nJson(value, delimiters);
    }
  });
}
function parseI18nJson(jsonObj, values, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        jsonObj[key] = compileStr(value, values, delimiters);
      }
    } else
    {
      parseI18nJson(value, values, delimiters);
    }
  });
  return jsonObj;
}
function compileI18nJsonStr(jsonStr, _ref5) {var locale = _ref5.locale,locales = _ref5.locales,delimiters = _ref5.delimiters;
  if (!isI18nStr(jsonStr, delimiters)) {
    return jsonStr;
  }
  if (!formater) {
    formater = new BaseFormatter();
  }
  var localeValues = [];
  Object.keys(locales).forEach(function (name) {
    if (name !== locale) {
      localeValues.push({
        locale: name,
        values: locales[name] });

    }
  });
  localeValues.unshift({ locale: locale, values: locales[locale] });
  try {
    return JSON.stringify(compileJsonObj(JSON.parse(jsonStr), localeValues, delimiters), null, 2);
  }
  catch (e) {}
  return jsonStr;
}
function isI18nStr(value, delimiters) {
  return value.indexOf(delimiters[0]) > -1;
}
function compileStr(value, values, delimiters) {
  return formater.interpolate(value, values, delimiters).join('');
}
function compileValue(jsonObj, key, localeValues, delimiters) {
  var value = jsonObj[key];
  if (isString(value)) {
    // 存在国际化
    if (isI18nStr(value, delimiters)) {
      jsonObj[key] = compileStr(value, localeValues[0].values, delimiters);
      if (localeValues.length > 1) {
        // 格式化国际化语言
        var valueLocales = jsonObj[key + 'Locales'] = {};
        localeValues.forEach(function (localValue) {
          valueLocales[localValue.locale] = compileStr(value, localValue.values, delimiters);
        });
      }
    }
  } else
  {
    compileJsonObj(value, localeValues, delimiters);
  }
}
function compileJsonObj(jsonObj, localeValues, delimiters) {
  walkJsonObj(jsonObj, function (jsonObj, key) {
    compileValue(jsonObj, key, localeValues, delimiters);
  });
  return jsonObj;
}
function walkJsonObj(jsonObj, walk) {
  if (isArray(jsonObj)) {
    for (var i = 0; i < jsonObj.length; i++) {
      if (walk(jsonObj, i)) {
        return true;
      }
    }
  } else
  if (isObject(jsonObj)) {
    for (var key in jsonObj) {
      if (walk(jsonObj, key)) {
        return true;
      }
    }
  }
  return false;
}

function resolveLocale(locales) {
  return function (locale) {
    if (!locale) {
      return locale;
    }
    locale = normalizeLocale(locale) || locale;
    return resolveLocaleChain(locale).find(function (locale) {return locales.indexOf(locale) > -1;});
  };
}
function resolveLocaleChain(locale) {
  var chain = [];
  var tokens = locale.split('-');
  while (tokens.length) {
    chain.push(tokens.join('-'));
    tokens.pop();
  }
  return chain;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),
/* 5 */
/*!*************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/pages.json ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 12 */
/*!*****************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/static_data.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var get_one_tx = { "id": 4, "shop_id": 9, "shop_user_id": 7, "card_id": 4, "card_num": "4444444", "money": "1.00", "money_befor": "0.00", "status": 1, "ip": "222.87.187.218", "pay_aid": 1, "pay_date": 1571884377, "create_time": "2019-10-24 10:29:16", "card": { "id": 4, "shop_id": 9, "bank_name": "建设银行", "bank_num": "4444444", "username": "444", "type": 4, "create_time": "2019-10-23 09:17:49" } };

var get_sale_money = { "sale_all": 10, "already": 2, "ready": 1, "ktx_all": 7 };

var get_card = [{ "id": 4, "shop_id": 9, "bank_name": "建设银行", "bank_num": "4444444", "username": "444", "type": 4, "create_time": "2019-10-23 09:17:49" }, { "id": 5, "shop_id": 9, "bank_name": "农业", "bank_num": "666666666", "username": "66", "type": 0, "create_time": "2019-10-23 10:51:02" }, { "id": 8, "shop_id": 9, "bank_name": "工商银行某某某支行", "bank_num": "123456789", "username": "张密码", "type": 3, "create_time": "2019-10-24 10:01:11" }];

var get_tx_log = [{ "id": 3, "shop_id": 9, "shop_user_id": 7, "card_id": 4, "card_num": "", "money": "1.00", "money_befor": "0.00", "status": 1, "ip": "1.207.135.142", "pay_aid": 1, "pay_date": 1571883814, "create_time": "2019-10-23 14:49:58", "card": { "id": 4, "shop_id": 9, "bank_name": "建设银行", "bank_num": "4444444", "username": "444", "type": 4, "create_time": "2019-10-23 09:17:49" } }, { "id": 4, "shop_id": 9, "shop_user_id": 7, "card_id": 4, "card_num": "4444444", "money": "1.00", "money_befor": "0.00", "status": 1, "ip": "222.87.187.218", "pay_aid": 1, "pay_date": 1571884377, "create_time": "2019-10-24 10:29:16", "card": { "id": 4, "shop_id": 9, "bank_name": "建设银行", "bank_num": "4444444", "username": "444", "type": 4, "create_time": "2019-10-23 09:17:49" } }, { "id": 5, "shop_id": 9, "shop_user_id": 7, "card_id": 5, "card_num": "666666666", "money": "1.00", "money_befor": "0.00", "status": 0, "ip": "222.87.187.218", "pay_aid": 0, "pay_date": 0, "create_time": "2019-10-24 10:33:25", "card": { "id": 5, "shop_id": 9, "bank_name": "农业", "bank_num": "666666666", "username": "66", "type": 0, "create_time": "2019-10-23 10:51:02" } }];

var count_order = { "id": 5, "shop_name": "测试", "today": [{ "today_num_total": 0, "today_money_total": null }], "yesterday": [{ "yesterday_num_total": 0, "yesterday_money_total": null }], "total": [{ "all_num_total": 1, "all_money_total": "188.00" }] };

var order_detail = { "id": 1, "order_num": '123456789223', "pay_time": "2021-11-16 13:01:20", "total": "999",
  "address": [{
    "name": "全文", "address": "某某省某某市某某省某某市某某省某某市某某省某某市", "tell": "12345678909" }] };


var order_pro = [{ "title": '这里是商品标题', "price": "99", "pic": __webpack_require__(/*! @/imgs/8.jpg */ 13),
  "guige": [{ "name": '产品颜色', "value": '黑色' }], "num": 2 },
{ "title": '这里是商品标题', "price": "299", "pic": __webpack_require__(/*! @/imgs/8.jpg */ 13),
  "guige": [{ "name": '产品颜色', "value": '红色' }], "num": 1 }];


var content = { "shop_id": 5, "region_id": 2, "shop_name": "\u6D4B\u8BD5", "shop_description": "", "shop_type_id": "", "vip_type": 0, "aid": 0, "shop_group_id": 0, "area": "", "shop_address": "\u6C47\u91D1\u4E2D\u5FC3", "position": null, "shop_state": 1, "sort": 0, "img_id": 0, "hj_imgs": "", "other_imgs": "", "shop_phone": "18685497757", "shop_collect": 0, "shop_sales": "0.00", "content": "", "xinxin": 0, "yy_time": "09:00-19:00", "chouyong": 0, "laiyu_tel": "", "first_mian": "0.00", "vip_status": 0, "license_url": "", "user_sfz_url": "", "shop_pic_url": "", "shop_time": 1600067337, "create_time": "2019-09-14", "update_time": "2019-09-14 15:08:57", "imgs": null, "card": null };

var get_coupon = [{ "id": 2, "type": 3, "shop_id": 1, "name": "aa", "goods_ids": "0", "region_id": 2, "status": 1, "is_show": 0, "stock": null, "stock_type": 1, "full": 30, "reduce": 22, "start_time": "2019-09-20", "end_time": "2019-10-01", "day": null, "create_time": "2019-09-30", "update_time": "2019-09-30 09:24:02", "delete_time": 0 }, { "id": 3, "type": 3, "shop_id": 1, "name": "9", "goods_ids": "0", "region_id": 2, "status": 1, "is_show": 0, "stock": null, "stock_type": 1, "full": 0, "reduce": 2, "start_time": "2019-09-20", "end_time": "2019-10-01", "day": null, "create_time": "2019-09-30", "update_time": "2019-09-30 09:24:20", "delete_time": 0 }];

var my_product = [{ "id": 8, "shop_id": 1, "category_id": 5, "shop_category_id": ["0"], "banner_imgs": "44,43,42", "ct": "", "content": "品牌: BLEUNUIT\/深蓝彩妆", "c_imgs": "45,47,46", "description": "妆感舒适色彩均匀持久显色不易脱色不易掉色", "goods_name": "深蓝炫金恒彩唇膏彩妆口红女保湿持久不易脱色掉色防水学生款正品", "img_id": 44, "leixin": 1, "market_price": "158.00", "price": "134.00", "vip_price": "120.00", "stock": 88, "sales": 0, "is_hot": 0, "is_new": 0, "start_date": "1970年01月01日", "end_date": "1970年01月01日", "sy_time": "", "yuyue": "", "guize": "", "aid": 0, "fx_tc": "20", "operator": "", "state": 1, "points": 0, "banner_img": "", "sort": 0, "is_hotel": 0, "is_first": 0, "max_people": 0, "tag_ids": "", "region_id": 2, "courier_type": [""], "create_time": "2019-09-12 15:18:57", "update_time": "2019-09-12 15:18:57", "delete_time": null,
  "imgs": __webpack_require__(/*! @/imgs/pro2.png */ 14) },
{ "id": 7, "shop_id": 1, "category_id": 5, "shop_category_id": ["0"], "banner_imgs": "38,37", "ct": "", "content": "产品名称：BOB 雪纺亮妍腮红(烘烤)", "c_imgs": "39,40,41", "description": "细腻粉质 淡妆修容", "goods_name": "BOB烘烤腮红正品胭脂裸妆保湿提亮肤色自然遮瑕腮红盘持久彩妆", "img_id": 38, "leixin": 1, "market_price": "49.00", "price": "29.90", "vip_price": "20.00", "stock": 44, "sales": 0, "is_hot": 0, "is_new": 0, "start_date": "1970年01月01日", "end_date": "1970年01月01日", "sy_time": "", "yuyue": "", "guize": "", "aid": 0, "fx_tc": "10", "operator": "", "state": 1, "points": 0, "banner_img": "", "sort": 0, "is_hotel": 0, "is_first": 0, "max_people": 0, "tag_ids": "", "region_id": 2, "courier_type": [""], "create_time": "2019-09-12 15:15:19", "update_time": "2019-09-12 15:15:19", "delete_time": null,
  "imgs": __webpack_require__(/*! @/imgs/pro3.png */ 15) },
{ "id": 6, "shop_id": 1, "category_id": 5, "shop_category_id": ["0"], "banner_imgs": "30,31,32", "ct": "", "content": "产品名称：透蜜 轻薄持妆粉底液", "c_imgs": "35,34,33,36", "description": "透蜜粉底液持久保湿遮瑕膏水润控油裸妆bb霜女学生平价正品化妆品", "goods_name": "透蜜粉底液持久保湿遮瑕膏水润控油裸妆bb霜女学生平价正品化妆品", "img_id": 30, "leixin": 1, "market_price": "199.00", "price": "79.90", "vip_price": "69.90", "stock": 11, "sales": 0, "is_hot": 0, "is_new": 0, "start_date": "1970年01月01日", "end_date": "1970年01月01日", "sy_time": "", "yuyue": "", "guize": "", "aid": 0, "fx_tc": "15", "operator": "", "state": 0, "points": 0, "banner_img": "", "sort": 0, "is_hotel": 0, "is_first": 0, "max_people": 0, "tag_ids": "", "region_id": 2, "courier_type": [""], "create_time": "2019-09-12 15:07:39", "update_time": "2019-09-12 15:07:39", "delete_time": null,
  "imgs": __webpack_require__(/*! @/imgs/pro1.png */ 16) },
{ "id": 5, "shop_id": 1, "category_id": 5, "shop_category_id": ["0"], "banner_imgs": "23,24,25", "ct": "", "content": "产品名称：美康粉黛 醉美东方唇膏\n\n", "c_imgs": "26,27,28,29", "description": "买2送1 买4送2 ★ 高饱和 易上色", "goods_name": "美康粉黛口红女学生款持久滋润防水平价小辣椒巧克力小众品牌正品", "img_id": 24, "leixin": 1, "market_price": "78.00", "price": "29.90", "vip_price": "29.00", "stock": 77, "sales": 0, "is_hot": 0, "is_new": 0, "start_date": "1970年01月01日", "end_date": "1970年01月01日", "sy_time": "", "yuyue": "", "guize": "", "aid": 0, "fx_tc": "3", "operator": "", "state": 0, "points": 0, "banner_img": "", "sort": 0, "is_hotel": 0, "is_first": 0, "max_people": 0, "tag_ids": "", "region_id": 2, "courier_type": [""], "create_time": "2019-09-12 15:04:15", "update_time": "2019-09-12 15:04:15", "delete_time": null,
  "imgs": __webpack_require__(/*! @/imgs/pro4.png */ 17) },
{ "id": 4, "shop_id": 1, "category_id": 5, "shop_category_id": ["0"], "banner_imgs": "18,19", "ct": "", "content": "产品名称：花西子 玉女桃花轻蜜粉\n\n", "c_imgs": "20,21,22", "description": "控油定妆 隐匿毛孔", "goods_name": "花西子空气蜜粉|散粉定妆粉饼女持久控油防水防汗遮瑕不浮粉神器", "img_id": 18, "leixin": 1, "market_price": "228.00", "price": "198.00", "vip_price": "188.00", "stock": 89, "sales": 0, "is_hot": 0, "is_new": 0, "start_date": "1970年01月01日", "end_date": "1970年01月01日", "sy_time": "", "yuyue": "", "guize": "", "aid": 0, "fx_tc": "20", "operator": "", "state": 1, "points": 0, "banner_img": "", "sort": 0, "is_hotel": 0, "is_first": 0, "max_people": 0, "tag_ids": "", "region_id": 2, "courier_type": [""], "create_time": "2019-09-12 14:59:06", "update_time": "2019-09-12 14:59:06", "delete_time": null,
  "imgs": __webpack_require__(/*! @/imgs/pro5.png */ 18) },
{ "id": 3, "shop_id": 1, "category_id": 5, "shop_category_id": ["0"], "banner_imgs": "12,13,14", "ct": "", "content": "品牌: MARIE DALGAR\/玛丽黛佳\n腮红\/胭脂单品: 元气风动三色腮红\n产地: 中国\n净含量: 6g\n颜色分类: 01云雾粉 02雨林粉 03清新裸 04阳光橘\n上市时间: 2016年月份: 8月\n功效: 提升气色\n\n", "c_imgs": "15,16,17", "description": "一盒三色 刷出元气美肌 新手也适合", "goods_name": "玛丽黛佳腮红正品裸妆保湿自然提亮肤色修容高光胭脂女彩妆一体盘", "img_id": 12, "leixin": 1, "market_price": "69.00", "price": "59.00", "vip_price": "0.01", "stock": 97, "sales": 2, "is_hot": 0, "is_new": 0, "start_date": "1970年01月01日", "end_date": "1970年01月01日", "sy_time": "", "yuyue": "", "guize": "", "aid": 0, "fx_tc": "10", "operator": "", "state": 1, "points": 0, "banner_img": "", "sort": 0, "is_hotel": 0, "is_first": 0, "max_people": 0, "tag_ids": "", "region_id": 2, "courier_type": [""], "create_time": "2019-09-12 14:54:02", "update_time": "2019-09-29 17:11:46", "delete_time": null,
  "imgs": __webpack_require__(/*! @/imgs/pro6.png */ 19) }];

var get_category = [{ "id": 21, "shop_id": 5, "name": "aaa" }, { "id": 22, "shop_id": 5, "name": "bbb" }, { "id": 23, "shop_id": 5, "name": "ccc" }, { "id": 24, "shop_id": 5, "name": "xxx" }, { "id": 25, "shop_id": 5, "name": "好多个" }];

var category = [{ "category_id": 2, "category_name": "美容美体", "short_name": "美容美体", "pid": 0, "level": 1, "is_visible": 1, "sort": 9, "category_pic": "64",
  "imgs": __webpack_require__(/*! @/imgs/cate1.jpg */ 20) },
{ "category_id": 5, "category_name": "瘦身纤体", "short_name": "瘦身纤体", "pid": 0, "level": 1, "is_visible": 1, "sort": 8, "category_pic": "65",
  "imgs": __webpack_require__(/*! @/imgs/cate2.jpg */ 21) },
{ "category_id": 1, "category_name": "瑜伽舞蹈", "short_name": "瑜伽舞蹈", "pid": 0, "level": 1, "is_visible": 1, "sort": 7, "category_pic": "69",
  "imgs": __webpack_require__(/*! @/imgs/cate3.jpg */ 22) },
{ "category_id": 3, "category_name": "休闲娱乐", "short_name": "休闲娱乐", "pid": 0, "level": 1, "is_visible": 1, "sort": 6, "category_pic": "67",
  "imgs": __webpack_require__(/*! @/imgs/cate4.jpg */ 23) }];

var yunfei = [{ "num": 3, "mess": "未有商品使用" }, { "num": 5, "mess": "未有商品使用" }, { "num": 7, "mess": "未有商品使用" }];

var yfmoban = { "name": 3, "fanwei": "未有商品使用",
  "quyu": [{ "province": '辽宁省、吉林省、黑龙江省', "shou": 1, "s_price": "0.00", "xu": 1, "x_price": "2.00" },
  { "province": '贵州省、云南省、广西省', "shou": 1, "s_price": "0.00", "xu": 1, "x_price": "2.00" },
  { "province": '四川省、湖南省、宁夏省', "shou": 1, "s_price": "0.00", "xu": 1, "x_price": "2.00" }] };


var sign = [" ", "管理员", "销售员", "采购员", "仓管员", "转运员", "财务员"];

var role_list = ["管理员", "销售员", "采购员", "仓管员", "转运员", "财务员"];

var role_map = { "ADMIN": ["管理员", 0], "SALESPERSON": ["销售员", 1], "BUYER": ["采购员", 2], "WAREHOUSE_KEEPER": ["仓管员", 3], "TRANSPORTER": ["转运员", 4], "TREASURER": ["财务员", 5] };

var roleList = {
  "ADMIN": '/pages/Home',
  "BUYER": '/pages/purchase/Purchaser',
  "SALESPERSON": '/pages/order/Order' };var _default =


{
  count_order: count_order,
  order_detail: order_detail,
  order_pro: order_pro,
  content: content,
  get_coupon: get_coupon,
  my_product: my_product,
  get_category: get_category,
  category: category,
  yunfei: yunfei,
  yfmoban: yfmoban,
  role_list: role_list,
  role_map: role_map,
  get_tx_log: get_tx_log,
  get_sale_money: get_sale_money,
  get_card: get_card,
  get_one_tx: get_one_tx,
  roleList: roleList };exports.default = _default;

/***/ }),
/* 13 */
/*!*************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/imgs/8.jpg ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ }),
/* 14 */
/*!****************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/imgs/pro2.png ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 15 */
/*!****************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/imgs/pro3.png ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 16 */
/*!****************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/imgs/pro1.png ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 17 */
/*!****************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/imgs/pro4.png ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 18 */
/*!****************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/imgs/pro5.png ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 19 */
/*!****************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/imgs/pro6.png ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 20 */
/*!*****************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/imgs/cate1.jpg ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/imgs/cate1.jpg";

/***/ }),
/* 21 */
/*!*****************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/imgs/cate2.jpg ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/imgs/cate2.jpg";

/***/ }),
/* 22 */
/*!*****************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/imgs/cate3.jpg ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/imgs/cate3.jpg";

/***/ }),
/* 23 */
/*!*****************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/imgs/cate4.jpg ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/imgs/cate4.jpg";

/***/ }),
/* 24 */
/*!******************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/common/axios.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _config = __webpack_require__(/*! ./config */ 25);function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}var _default =



{
  //post请求
  post: function post(url, param) {
    return new Promise(function (cback, reject) {
      uni.request({
        url: _config.Api_url + url,
        data: param,
        method: 'post',
        header: {
          'token': uni.getStorageSync("token"),
          // 'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Type': 'application/json',
          'Cookie': [] } }).

      then(function (data) {// data为一个数组，数组第一项为错误信息，第二项为返回数据
        var _data = _slicedToArray(data, 2),error = _data[0],res = _data[1];
        // console.log(res)
        var res_code = res.data.status;
        if (res_code == 200) {
          uni.showToast({
            title: res.data.message,
            icon: 'none' });

          cback(res.data.data);
        } else {
          uni.showToast({
            title: res.data.message,
            icon: 'none' });

          // } else if(res_code == 201){
          // 	console.log('201:', res.data.message)
          // 	uni.showToast({
          // 		title: res.data.message,
          // 		icon:'none'
          // 	})
          // 	setTimeout(()=>{	
          // 		uni.removeStorageSync('token')
          // 		uni.reLaunch({
          // 			url:'/pages/login/login'
          // 		})
          // 	},1000)
          // 	return;
          // } else if (res_code == 400){
          // 	console.log('400:',res.data.msg)
          // 	let msg=res.data.msg?res.data.msg:'请求错误'
          // 	uni.showToast({
          // 		title:msg,
          // 		icon:'none'
          // 	})
        }
      }).catch(function (err) {
        console.log('请求异常:', err);
        uni.showToast({
          title: '请求异常',
          icon: 'none' });

      });
    });
  },
  get: function get(url, param) {
    return new Promise(function (cback, reject) {
      uni.request({
        url: _config.Api_url + url,
        data: param,
        method: 'get',
        header: {
          token: uni.getStorageSync("token"),
          'Content-Type': 'application/json',
          'Cookie': [] } }).

      then(function (data) {var _data2 = _slicedToArray(
        data, 2),error = _data2[0],res = _data2[1];
        var res_code = res.data.status;
        if (res_code == 200) {
          // uni.showToast({
          // 	title: res.data.message,
          // 	icon: 'none'
          // })
          cback(res.data.data);
        } else {
          uni.showToast({
            title: res.data.message,
            icon: 'none' });

        }
      }).catch(function (err) {
        console.log('请求异常:', err);
        uni.showToast({
          title: '请求异常',
          icon: 'none' });

      });
    });
  },
  put: function put(url, param) {
    return new Promise(function (cback, reject) {
      uni.request({
        url: _config.Api_url + url,
        data: param,
        method: 'put',
        header: {
          'token': uni.getStorageSync("token"),
          'Content-Type': 'application/json',
          'Cookie': [] } }).

      then(function (data) {// data为一个数组，数组第一项为错误信息，第二项为返回数据
        var _data3 = _slicedToArray(data, 2),error = _data3[0],res = _data3[1];
        var res_code = res.data.status;
        if (res_code == 200) {
          uni.showToast({
            title: res.data.message,
            icon: 'none' });

          cback(res.data.data);
        } else {
          uni.showToast({
            title: res.data.message,
            icon: 'none' });

        }
      }).catch(function (err) {
        console.log('请求异常:', err);
        uni.showToast({
          title: '请求异常',
          icon: 'none' });

      });
    });
  },
  login: function login(url, param) {
    return new Promise(function (cback, reject) {
      uni.request({
        url: _config.Api_url + url,
        data: param,
        method: 'post',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          "cookies": [] } }).

      then(function (data) {// data为一个数组，数组第一项为错误信息，第二项为返回数据
        var _data4 = _slicedToArray(data, 2),error = _data4[0],res = _data4[1];
        var res_code = res.data.status;
        if (res_code == 200) {
          uni.showToast({
            title: res.data.message,
            icon: 'none' });

          cback(res.data.data);
        } else {
          uni.showToast({
            title: res.data.message,
            icon: 'none' });

          // } else if(res_code == 201){
          // 	console.log('201:', res.data.message)
          // 	uni.showToast({
          // 		title: res.data.message,
          // 		icon:'none'
          // 	})
          // 	setTimeout(()=>{	
          // 		uni.removeStorageSync('token')
          // 		uni.reLaunch({
          // 			url:'/pages/login/login'
          // 		})
          // 	},1000)
          // 	return;
          // } else if (res_code == 400){
          // 	console.log('400:',res.data.msg)
          // 	let msg=res.data.msg?res.data.msg:'请求错误'
          // 	uni.showToast({
          // 		title:msg,
          // 		icon:'none'
          // 	})
        }
      }).catch(function (err) {
        console.log('请求异常:', err);
        uni.showToast({
          title: '请求异常',
          icon: 'none' });

      });
    });
  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 25 */
/*!*******************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/common/config.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.Api_url = void 0;var Api_url = 'https://sensumi.top';
// const Api_url= 'http://106.55.30.20:8181' 
// const Api_url= 'http://localhost:8181' 
// const Api_url = '/api'
exports.Api_url = Api_url;

/***/ }),
/* 26 */
/*!**************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/assets/style/border.css ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),
/* 27 */
/*!************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/assets/style/main.css ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),
/* 28 */
/*!*********************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/index.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _mixin = _interopRequireDefault(__webpack_require__(/*! ./libs/mixin/mixin.js */ 29));

var _mpMixin = _interopRequireDefault(__webpack_require__(/*! ./libs/mixin/mpMixin.js */ 30));

var _luchRequest = _interopRequireDefault(__webpack_require__(/*! ./libs/luch-request */ 31));


var _route = _interopRequireDefault(__webpack_require__(/*! ./libs/util/route.js */ 49));

var _colorGradient = _interopRequireDefault(__webpack_require__(/*! ./libs/function/colorGradient.js */ 53));


var _test = _interopRequireDefault(__webpack_require__(/*! ./libs/function/test.js */ 54));

var _debounce = _interopRequireDefault(__webpack_require__(/*! ./libs/function/debounce.js */ 55));

var _throttle = _interopRequireDefault(__webpack_require__(/*! ./libs/function/throttle.js */ 56));

var _index = _interopRequireDefault(__webpack_require__(/*! ./libs/function/index.js */ 57));


var _config = _interopRequireDefault(__webpack_require__(/*! ./libs/config/config.js */ 58));

var _props = _interopRequireDefault(__webpack_require__(/*! ./libs/config/props.js */ 59));

var _zIndex = _interopRequireDefault(__webpack_require__(/*! ./libs/config/zIndex.js */ 148));

var _color = _interopRequireDefault(__webpack_require__(/*! ./libs/config/color.js */ 149));

var _platform = _interopRequireDefault(__webpack_require__(/*! ./libs/function/platform */ 150));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

var $u = _objectSpread(_objectSpread({
  route: _route.default,
  date: _index.default.timeFormat, // 另名date
  colorGradient: _colorGradient.default.colorGradient,
  hexToRgb: _colorGradient.default.hexToRgb,
  rgbToHex: _colorGradient.default.rgbToHex,
  colorToRgba: _colorGradient.default.colorToRgba,
  test: _test.default,
  type: ['primary', 'success', 'error', 'warning', 'info'],
  http: new _luchRequest.default(),
  config: _config.default, // uView配置信息相关，比如版本号
  zIndex: _zIndex.default,
  debounce: _debounce.default,
  throttle: _throttle.default,
  mixin: _mixin.default,
  mpMixin: _mpMixin.default,
  props: _props.default },
_index.default), {}, {
  color: _color.default,
  platform: _platform.default });


// $u挂载到uni对象上
uni.$u = $u;

var install = function install(Vue) {
  // 时间格式化，同时两个名称，date和timeFormat
  Vue.filter('timeFormat', function (timestamp, format) {return uni.$u.timeFormat(timestamp, format);});
  Vue.filter('date', function (timestamp, format) {return uni.$u.timeFormat(timestamp, format);});
  // 将多久以前的方法，注入到全局过滤器
  Vue.filter('timeFrom', function (timestamp, format) {return uni.$u.timeFrom(timestamp, format);});
  // 同时挂载到uni和Vue.prototype中

  // 只有vue，挂载到Vue.prototype才有意义，因为nvue中全局Vue.prototype和Vue.mixin是无效的
  Vue.prototype.$u = $u;
  Vue.mixin(_mixin.default);

};var _default =

{
  install: install };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 29 */
/*!********************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/mixin/mixin.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {module.exports = {
  // 定义每个组件都可能需要用到的外部样式以及类名
  props: {
    // 每个组件都有的父组件传递的样式，可以为字符串或者对象形式
    customStyle: {
      type: [Object, String],
      default: function _default() {return {};} },

    customClass: {
      type: String,
      default: '' },

    // 跳转的页面路径
    url: {
      type: String,
      default: '' },

    // 页面跳转的类型
    linkType: {
      type: String,
      default: 'navigateTo' } },


  data: function data() {
    return {};
  },
  onLoad: function onLoad() {
    // getRect挂载到$u上，因为这方法需要使用in(this)，所以无法把它独立成一个单独的文件导出
    this.$u.getRect = this.$uGetRect;
  },
  created: function created() {
    // 组件当中，只有created声明周期，为了能在组件使用，故也在created中将方法挂载到$u
    this.$u.getRect = this.$uGetRect;
  },
  computed: {
    // 在2.x版本中，将会把$u挂载到uni对象下，导致在模板中无法使用uni.$u.xxx形式
    // 所以这里通过computed计算属性将其附加到this.$u上，就可以在模板或者js中使用this.$u.xxx
    $u: function $u() {
      return uni.$u;
    },
    /**
       * 生成bem规则类名
       * 由于微信小程序，H5，nvue之间绑定class的差异，无法通过:class="[bem()]"的形式进行同用
       * 故采用如下折中做法，最后返回的是数组，类似['a', 'b', 'c']的形式
       * @param {String} name 组件名称
       * @param {Array} fixed 一直会存在的类名
       * @param {Array} change 会根据变量值为true或者false而出现或者隐藏的类名
       * @return Array
       */
    bem: function bem() {
      return function (name, fixed, change) {var _this = this;
        // 类名前缀
        var prefix = "u-".concat(name, "--");
        var classes = {};
        if (fixed) {
          fixed.map(function (item) {
            // 这里的类名，会一直存在
            classes[prefix + _this[item]] = true;
          });
        }
        if (change) {
          change.map(function (item) {
            // 这里的类名，会根据this[item]的值为true或者false，而进行添加或者移除某一个类
            _this[item] ? classes[prefix + item] = _this[item] : delete classes[prefix + item];
          });
        }
        return Object.keys(classes);
      };
    } },

  methods: {
    // 跳转某一个页面
    openPage: function openPage() {var urlKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'url';
      var url = this[urlKey];
      if (url) {
        // 执行类似uni.navigateTo的方法
        uni[this.linkType]({
          url: url });

      }
    },
    // 查询节点信息
    // 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
    // 解决办法为在组件根部再套一个没有任何作用的view元素
    $uGetRect: function $uGetRect(selector, all) {var _this2 = this;
      return new Promise(function (resolve) {
        uni.createSelectorQuery().
        in(_this2)[all ? 'selectAll' : 'select'](selector).
        boundingClientRect(function (rect) {
          if (all && Array.isArray(rect) && rect.length) {
            resolve(rect);
          }
          if (!all && rect) {
            resolve(rect);
          }
        }).
        exec();
      });
    },
    getParentData: function getParentData() {var _this3 = this;var parentName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      // 避免在created中去定义parent变量
      if (!this.parent) this.parent = {};
      // 这里的本质原理是，通过获取父组件实例(也即类似u-radio的父组件u-radio-group的this)
      // 将父组件this中对应的参数，赋值给本组件(u-radio的this)的parentData对象中对应的属性
      // 之所以需要这么做，是因为所有端中，头条小程序不支持通过this.parent.xxx去监听父组件参数的变化
      // 此处并不会自动更新子组件的数据，而是依赖父组件u-radio-group去监听data的变化，手动调用更新子组件的方法去重新获取
      this.parent = this.$u.$parent.call(this, parentName);
      if (this.parent.children) {
        // 如果父组件的children不存在本组件的实例，才将本实例添加到父组件的children中
        this.parent.children.indexOf(this) === -1 && this.parent.children.push(this);
      }
      if (this.parent && this.parentData) {
        // 历遍parentData中的属性，将parent中的同名属性赋值给parentData
        Object.keys(this.parentData).map(function (key) {
          _this3.parentData[key] = _this3.parent[key];
        });
      }
    },
    // 阻止事件冒泡
    preventEvent: function preventEvent(e) {
      e && typeof e.stopPropagation === 'function' && e.stopPropagation();
    },
    // 空操作
    noop: function noop(e) {
      this.preventEvent(e);
    } },

  onReachBottom: function onReachBottom() {
    uni.$emit('uOnReachBottom');
  },
  beforeDestroy: function beforeDestroy() {var _this4 = this;
    // 判断当前页面是否存在parent和chldren，一般在checkbox和checkbox-group父子联动的场景会有此情况
    // 组件销毁时，移除子组件在父组件children数组中的实例，释放资源，避免数据混乱
    if (this.parent && uni.$u.test.array(this.parent.children)) {
      // 组件销毁时，移除父组件中的children数组中对应的实例
      var childrenList = this.parent.children;
      childrenList.map(function (child, index) {
        // 如果相等，则移除
        if (child === _this4) {
          childrenList.splice(index, 1);
        }
      });
    }
  } };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 30 */
/*!**********************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/mixin/mpMixin.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {

  // 将自定义节点设置成虚拟的，更加接近Vue组件的表现，能更好的使用flex属性
  options: {
    virtualHost: true } };exports.default = _default;

/***/ }),
/* 31 */
/*!***************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/luch-request/index.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _Request = _interopRequireDefault(__webpack_require__(/*! ./core/Request */ 32));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =

_Request.default;exports.default = _default;

/***/ }),
/* 32 */
/*!**********************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/luch-request/core/Request.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;












var _dispatchRequest = _interopRequireDefault(__webpack_require__(/*! ./dispatchRequest */ 33));
var _InterceptorManager = _interopRequireDefault(__webpack_require__(/*! ./InterceptorManager */ 41));
var _mergeConfig = _interopRequireDefault(__webpack_require__(/*! ./mergeConfig */ 42));
var _defaults = _interopRequireDefault(__webpack_require__(/*! ./defaults */ 43));
var _utils = __webpack_require__(/*! ../utils */ 36);
var _clone = _interopRequireDefault(__webpack_require__(/*! ../utils/clone */ 44));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var

Request = /*#__PURE__*/function () {
  /**
                                    * @param {Object} arg - 全局配置
                                    * @param {String} arg.baseURL - 全局根路径
                                    * @param {Object} arg.header - 全局header
                                    * @param {String} arg.method = [GET|POST|PUT|DELETE|CONNECT|HEAD|OPTIONS|TRACE] - 全局默认请求方式
                                    * @param {String} arg.dataType = [json] - 全局默认的dataType
                                    * @param {String} arg.responseType = [text|arraybuffer] - 全局默认的responseType。支付宝小程序不支持
                                    * @param {Object} arg.custom - 全局默认的自定义参数
                                    * @param {Number} arg.timeout - 全局默认的超时时间，单位 ms。默认60000。H5(HBuilderX 2.9.9+)、APP(HBuilderX 2.9.9+)、微信小程序（2.10.0）、支付宝小程序
                                    * @param {Boolean} arg.sslVerify - 全局默认的是否验证 ssl 证书。默认true.仅App安卓端支持（HBuilderX 2.3.3+）
                                    * @param {Boolean} arg.withCredentials - 全局默认的跨域请求时是否携带凭证（cookies）。默认false。仅H5支持（HBuilderX 2.6.15+）
                                    * @param {Boolean} arg.firstIpv4 - 全DNS解析时优先使用ipv4。默认false。仅 App-Android 支持 (HBuilderX 2.8.0+)
                                    * @param {Function(statusCode):Boolean} arg.validateStatus - 全局默认的自定义验证器。默认statusCode >= 200 && statusCode < 300
                                    */
  function Request() {var arg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};_classCallCheck(this, Request);
    if (!(0, _utils.isPlainObject)(arg)) {
      arg = {};
      console.warn('设置全局参数必须接收一个Object');
    }
    this.config = (0, _clone.default)(_objectSpread(_objectSpread({}, _defaults.default), arg));
    this.interceptors = {
      request: new _InterceptorManager.default(),
      response: new _InterceptorManager.default() };

  }

  /**
    * @Function
    * @param {Request~setConfigCallback} f - 设置全局默认配置
    */_createClass(Request, [{ key: "setConfig", value: function setConfig(
    f) {
      this.config = f(this.config);
    } }, { key: "middleware", value: function middleware(

    config) {
      config = (0, _mergeConfig.default)(this.config, config);
      var chain = [_dispatchRequest.default, undefined];
      var promise = Promise.resolve(config);

      this.interceptors.request.forEach(function (interceptor) {
        chain.unshift(interceptor.fulfilled, interceptor.rejected);
      });

      this.interceptors.response.forEach(function (interceptor) {
        chain.push(interceptor.fulfilled, interceptor.rejected);
      });

      while (chain.length) {
        promise = promise.then(chain.shift(), chain.shift());
      }

      return promise;
    }

    /**
      * @Function
      * @param {Object} config - 请求配置项
      * @prop {String} options.url - 请求路径
      * @prop {Object} options.data - 请求参数
      * @prop {Object} [options.responseType = config.responseType] [text|arraybuffer] - 响应的数据类型
      * @prop {Object} [options.dataType = config.dataType] - 如果设为 json，会尝试对返回的数据做一次 JSON.parse
      * @prop {Object} [options.header = config.header] - 请求header
      * @prop {Object} [options.method = config.method] - 请求方法
      * @returns {Promise<unknown>}
      */ }, { key: "request", value: function request()
    {var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.middleware(config);
    } }, { key: "get", value: function get(

    url) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.middleware(_objectSpread({
        url: url,
        method: 'GET' },
      options));

    } }, { key: "post", value: function post(

    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'POST' },
      options));

    } }, { key: "put", value: function put(


    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'PUT' },
      options));

    } }, { key: "delete", value: function _delete(




    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'DELETE' },
      options));

    } }, { key: "connect", value: function connect(




    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'CONNECT' },
      options));

    } }, { key: "head", value: function head(




    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'HEAD' },
      options));

    } }, { key: "options", value: function options(




    url, data) {var _options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'OPTIONS' },
      _options));

    } }, { key: "trace", value: function trace(




    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'TRACE' },
      options));

    } }, { key: "upload", value: function upload(



    url) {var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      config.url = url;
      config.method = 'UPLOAD';
      return this.middleware(config);
    } }, { key: "download", value: function download(

    url) {var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      config.url = url;
      config.method = 'DOWNLOAD';
      return this.middleware(config);
    } }]);return Request;}();


/**
                               * setConfig回调
                               * @return {Object} - 返回操作后的config
                               * @callback Request~setConfigCallback
                               * @param {Object} config - 全局默认config
                               */exports.default = Request;

/***/ }),
/* 33 */
/*!******************************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/luch-request/core/dispatchRequest.js ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _index = _interopRequireDefault(__webpack_require__(/*! ../adapters/index */ 34));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =

function _default(config) {return (0, _index.default)(config);};exports.default = _default;

/***/ }),
/* 34 */
/*!************************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/luch-request/adapters/index.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _buildURL = _interopRequireDefault(__webpack_require__(/*! ../helpers/buildURL */ 35));
var _buildFullPath = _interopRequireDefault(__webpack_require__(/*! ../core/buildFullPath */ 37));
var _settle = _interopRequireDefault(__webpack_require__(/*! ../core/settle */ 40));
var _utils = __webpack_require__(/*! ../utils */ 36);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           * 返回可选值存在的配置
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           * @param {Array} keys - 可选值数组
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           * @param {Object} config2 - 配置
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           * @return {{}} - 存在的配置项
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           */
var mergeKeys = function mergeKeys(keys, config2) {
  var config = {};
  keys.forEach(function (prop) {
    if (!(0, _utils.isUndefined)(config2[prop])) {
      config[prop] = config2[prop];
    }
  });
  return config;
};var _default =
function _default(config) {return new Promise(function (resolve, reject) {
    var fullPath = (0, _buildURL.default)((0, _buildFullPath.default)(config.baseURL, config.url), config.params);
    var _config = {
      url: fullPath,
      header: config.header,
      complete: function complete(response) {
        config.fullPath = fullPath;
        response.config = config;
        try {
          // 对可能字符串不是json 的情况容错
          if (typeof response.data === 'string') {
            response.data = JSON.parse(response.data);
          }
          // eslint-disable-next-line no-empty
        } catch (e) {
        }
        (0, _settle.default)(resolve, reject, response);
      } };

    var requestTask;
    if (config.method === 'UPLOAD') {
      delete _config.header['content-type'];
      delete _config.header['Content-Type'];
      var otherConfig = {



        filePath: config.filePath,
        name: config.name };

      var optionalKeys = [









      'formData'];

      requestTask = uni.uploadFile(_objectSpread(_objectSpread(_objectSpread({}, _config), otherConfig), mergeKeys(optionalKeys, config)));
    } else if (config.method === 'DOWNLOAD') {





      requestTask = uni.downloadFile(_config);
    } else {
      var _optionalKeys = [
      'data',
      'method',

      'timeout',

      'dataType',

      'responseType'];











      requestTask = uni.request(_objectSpread(_objectSpread({}, _config), mergeKeys(_optionalKeys, config)));
    }
    if (config.getTask) {
      config.getTask(requestTask, config);
    }
  });};exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 35 */
/*!**************************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/luch-request/helpers/buildURL.js ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = buildURL;

var utils = _interopRequireWildcard(__webpack_require__(/*! ../utils */ 36));function _getRequireWildcardCache() {if (typeof WeakMap !== "function") return null;var cache = new WeakMap();_getRequireWildcardCache = function _getRequireWildcardCache() {return cache;};return cache;}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache();if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}

function encode(val) {
  return encodeURIComponent(val).
  replace(/%40/gi, '@').
  replace(/%3A/gi, ':').
  replace(/%24/g, '$').
  replace(/%2C/gi, ',').
  replace(/%20/g, '+').
  replace(/%5B/gi, '[').
  replace(/%5D/gi, ']');
}

/**
   * Build a URL by appending params to the end
   *
   * @param {string} url The base of the url (e.g., http://www.google.com)
   * @param {object} [params] The params to be appended
   * @returns {string} The formatted url
   */
function buildURL(url, params) {
  /* eslint no-param-reassign:0 */
  if (!params) {
    return url;
  }

  var serializedParams;
  if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function (val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = "".concat(key, "[]");
      } else {
        val = [val];
      }

      utils.forEach(val, function (v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push("".concat(encode(key), "=").concat(encode(v)));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
}

/***/ }),
/* 36 */
/*!***************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/luch-request/utils.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// utils is a library of generic helper functions non-specific to axios
Object.defineProperty(exports, "__esModule", { value: true });exports.isArray = isArray;exports.isObject = isObject;exports.isDate = isDate;exports.isURLSearchParams = isURLSearchParams;exports.forEach = forEach;exports.isBoolean = isBoolean;exports.isPlainObject = isPlainObject;exports.deepMerge = deepMerge;exports.isUndefined = isUndefined;var
toString = Object.prototype.toString;

/**
                                       * Determine if a value is an Array
                                       *
                                       * @param {Object} val The value to test
                                       * @returns {boolean} True if value is an Array, otherwise false
                                       */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
   * Determine if a value is an Object
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an Object, otherwise false
   */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
   * Determine if a value is a Date
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Date, otherwise false
   */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
   * Determine if a value is a URLSearchParams object
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a URLSearchParams object, otherwise false
   */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
   * Iterate over an Array or an Object invoking a function for each item.
   *
   * If `obj` is an Array callback will be called passing
   * the value, index, and complete array for each item.
   *
   * If 'obj' is an Object callback will be called passing
   * the value, key, and complete object for each property.
   *
   * @param {Object|Array} obj The object to iterate
   * @param {Function} fn The callback to invoke for each item
   */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /* eslint no-param-reassign:0 */
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
   * 是否为boolean 值
   * @param val
   * @returns {boolean}
   */
function isBoolean(val) {
  return typeof val === 'boolean';
}

/**
   * 是否为真正的对象{} new Object
   * @param {any} obj - 检测的对象
   * @returns {boolean}
   */
function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

/**
   * Function equal to merge with the difference being that no reference
   * to original objects is kept.
   *
   * @see merge
   * @param {Object} obj1 Object to merge
   * @returns {Object} Result of all merge properties
   */
function deepMerge() /* obj1, obj2, obj3, ... */{
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }
  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

function isUndefined(val) {
  return typeof val === 'undefined';
}

/***/ }),
/* 37 */
/*!****************************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/luch-request/core/buildFullPath.js ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = buildFullPath;

var _isAbsoluteURL = _interopRequireDefault(__webpack_require__(/*! ../helpers/isAbsoluteURL */ 38));
var _combineURLs = _interopRequireDefault(__webpack_require__(/*! ../helpers/combineURLs */ 39));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                            * Creates a new URL by combining the baseURL with the requestedURL,
                                                                                                                                                                            * only when the requestedURL is not already an absolute URL.
                                                                                                                                                                            * If the requestURL is absolute, this function returns the requestedURL untouched.
                                                                                                                                                                            *
                                                                                                                                                                            * @param {string} baseURL The base URL
                                                                                                                                                                            * @param {string} requestedURL Absolute or relative URL to combine
                                                                                                                                                                            * @returns {string} The combined full path
                                                                                                                                                                            */
function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !(0, _isAbsoluteURL.default)(requestedURL)) {
    return (0, _combineURLs.default)(baseURL, requestedURL);
  }
  return requestedURL;
}

/***/ }),
/* 38 */
/*!*******************************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/luch-request/helpers/isAbsoluteURL.js ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
               * Determines whether the specified URL is absolute
               *
               * @param {string} url The URL to test
               * @returns {boolean} True if the specified URL is absolute, otherwise false
               */Object.defineProperty(exports, "__esModule", { value: true });exports.default = isAbsoluteURL;
function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}

/***/ }),
/* 39 */
/*!*****************************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/luch-request/helpers/combineURLs.js ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
               * Creates a new URL by combining the specified URLs
               *
               * @param {string} baseURL The base URL
               * @param {string} relativeURL The relative URL
               * @returns {string} The combined URL
               */Object.defineProperty(exports, "__esModule", { value: true });exports.default = combineURLs;
function combineURLs(baseURL, relativeURL) {
  return relativeURL ? "".concat(
  baseURL.replace(/\/+$/, ''), "/").concat(relativeURL.replace(/^\/+/, '')) :
  baseURL;
}

/***/ }),
/* 40 */
/*!*********************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/luch-request/core/settle.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = settle; /**
                                                                                                      * Resolve or reject a Promise based on response status.
                                                                                                      *
                                                                                                      * @param {Function} resolve A function that resolves the promise.
                                                                                                      * @param {Function} reject A function that rejects the promise.
                                                                                                      * @param {object} response The response.
                                                                                                      */
function settle(resolve, reject, response) {var
  validateStatus = response.config.validateStatus;
  var status = response.statusCode;
  if (status && (!validateStatus || validateStatus(status))) {
    resolve(response);
  } else {
    reject(response);
  }
}

/***/ }),
/* 41 */
/*!*********************************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/luch-request/core/InterceptorManager.js ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

function InterceptorManager() {
  this.handlers = [];
}

/**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected });

  return this.handlers.length - 1;
};

/**
    * Remove an interceptor from the stack
    *
    * @param {Number} id The ID that was returned by `use`
    */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
    * Iterate over all the registered interceptors
    *
    * This method is particularly useful for skipping over any
    * interceptors that may have become `null` calling `eject`.
    *
    * @param {Function} fn The function to call for each interceptor
    */
InterceptorManager.prototype.forEach = function forEach(fn) {
  this.handlers.forEach(function (h) {
    if (h !== null) {
      fn(h);
    }
  });
};var _default =

InterceptorManager;exports.default = _default;

/***/ }),
/* 42 */
/*!**************************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/luch-request/core/mergeConfig.js ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _utils = __webpack_require__(/*! ../utils */ 36);function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * 合并局部配置优先的配置，如果局部有该配置项则用局部，如果全局有该配置项则用全局
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * @param {Array} keys - 配置项
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * @param {Object} globalsConfig - 当前的全局配置
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * @param {Object} config2 - 局部配置
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * @return {{}}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  */
var mergeKeys = function mergeKeys(keys, globalsConfig, config2) {
  var config = {};
  keys.forEach(function (prop) {
    if (!(0, _utils.isUndefined)(config2[prop])) {
      config[prop] = config2[prop];
    } else if (!(0, _utils.isUndefined)(globalsConfig[prop])) {
      config[prop] = globalsConfig[prop];
    }
  });
  return config;
};
/**
    *
    * @param globalsConfig - 当前实例的全局配置
    * @param config2 - 当前的局部配置
    * @return - 合并后的配置
    */var _default =
function _default(globalsConfig) {var config2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var method = config2.method || globalsConfig.method || 'GET';
  var config = {
    baseURL: globalsConfig.baseURL || '',
    method: method,
    url: config2.url || '',
    params: config2.params || {},
    custom: _objectSpread(_objectSpread({}, globalsConfig.custom || {}), config2.custom || {}),
    header: (0, _utils.deepMerge)(globalsConfig.header || {}, config2.header || {}) };

  var defaultToConfig2Keys = ['getTask', 'validateStatus'];
  config = _objectSpread(_objectSpread({}, config), mergeKeys(defaultToConfig2Keys, globalsConfig, config2));

  // eslint-disable-next-line no-empty
  if (method === 'DOWNLOAD') {







  } else if (method === 'UPLOAD') {
    delete config.header['content-type'];
    delete config.header['Content-Type'];
    var uploadKeys = [









    'filePath',
    'name',



    'formData'];

    uploadKeys.forEach(function (prop) {
      if (!(0, _utils.isUndefined)(config2[prop])) {
        config[prop] = config2[prop];
      }
    });





  } else {
    var defaultsKeys = [
    'data',

    'timeout',

    'dataType',

    'responseType'];











    config = _objectSpread(_objectSpread({}, config), mergeKeys(defaultsKeys, globalsConfig, config2));
  }

  return config;
};exports.default = _default;

/***/ }),
/* 43 */
/*!***********************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/luch-request/core/defaults.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 默认的全局配置
                                                                                                      */var _default =

{
  baseURL: '',
  header: {},
  method: 'GET',
  dataType: 'json',

  responseType: 'text',

  custom: {},

  timeout: 60000,










  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  } };exports.default = _default;

/***/ }),
/* 44 */
/*!*********************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/luch-request/utils/clone.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /* eslint-disable */
var clone = function () {
  'use strict';

  function _instanceof(obj, type) {
    return type != null && obj instanceof type;
  }

  var nativeMap;
  try {
    nativeMap = Map;
  } catch (_) {
    // maybe a reference error because no `Map`. Give it a dummy value that no
    // value will ever be an instanceof.
    nativeMap = function nativeMap() {};
  }

  var nativeSet;
  try {
    nativeSet = Set;
  } catch (_) {
    nativeSet = function nativeSet() {};
  }

  var nativePromise;
  try {
    nativePromise = Promise;
  } catch (_) {
    nativePromise = function nativePromise() {};
  }

  /**
     * Clones (copies) an Object using deep copying.
     *
     * This function supports circular references by default, but if you are certain
     * there are no circular references in your object, you can save some CPU time
     * by calling clone(obj, false).
     *
     * Caution: if `circular` is false and `parent` contains circular references,
     * your program may enter an infinite loop and crash.
     *
     * @param `parent` - the object to be cloned
     * @param `circular` - set to true if the object to be cloned may contain
     *    circular references. (optional - true by default)
     * @param `depth` - set to a number if the object is only to be cloned to
     *    a particular depth. (optional - defaults to Infinity)
     * @param `prototype` - sets the prototype to be used when cloning an object.
     *    (optional - defaults to parent prototype).
     * @param `includeNonEnumerable` - set to true if the non-enumerable properties
     *    should be cloned as well. Non-enumerable properties on the prototype
     *    chain will be ignored. (optional - false by default)
     */
  function clone(parent, circular, depth, prototype, includeNonEnumerable) {
    if (typeof circular === 'object') {
      depth = circular.depth;
      prototype = circular.prototype;
      includeNonEnumerable = circular.includeNonEnumerable;
      circular = circular.circular;
    }
    // maintain two arrays for circular references, where corresponding parents
    // and children have the same index
    var allParents = [];
    var allChildren = [];

    var useBuffer = typeof Buffer != 'undefined';

    if (typeof circular == 'undefined')
    circular = true;

    if (typeof depth == 'undefined')
    depth = Infinity;

    // recurse this function so we don't reset allParents and allChildren
    function _clone(parent, depth) {
      // cloning null always returns null
      if (parent === null)
      return null;

      if (depth === 0)
      return parent;

      var child;
      var proto;
      if (typeof parent != 'object') {
        return parent;
      }

      if (_instanceof(parent, nativeMap)) {
        child = new nativeMap();
      } else if (_instanceof(parent, nativeSet)) {
        child = new nativeSet();
      } else if (_instanceof(parent, nativePromise)) {
        child = new nativePromise(function (resolve, reject) {
          parent.then(function (value) {
            resolve(_clone(value, depth - 1));
          }, function (err) {
            reject(_clone(err, depth - 1));
          });
        });
      } else if (clone.__isArray(parent)) {
        child = [];
      } else if (clone.__isRegExp(parent)) {
        child = new RegExp(parent.source, __getRegExpFlags(parent));
        if (parent.lastIndex) child.lastIndex = parent.lastIndex;
      } else if (clone.__isDate(parent)) {
        child = new Date(parent.getTime());
      } else if (useBuffer && Buffer.isBuffer(parent)) {
        if (Buffer.from) {
          // Node.js >= 5.10.0
          child = Buffer.from(parent);
        } else {
          // Older Node.js versions
          child = new Buffer(parent.length);
          parent.copy(child);
        }
        return child;
      } else if (_instanceof(parent, Error)) {
        child = Object.create(parent);
      } else {
        if (typeof prototype == 'undefined') {
          proto = Object.getPrototypeOf(parent);
          child = Object.create(proto);
        } else
        {
          child = Object.create(prototype);
          proto = prototype;
        }
      }

      if (circular) {
        var index = allParents.indexOf(parent);

        if (index != -1) {
          return allChildren[index];
        }
        allParents.push(parent);
        allChildren.push(child);
      }

      if (_instanceof(parent, nativeMap)) {
        parent.forEach(function (value, key) {
          var keyChild = _clone(key, depth - 1);
          var valueChild = _clone(value, depth - 1);
          child.set(keyChild, valueChild);
        });
      }
      if (_instanceof(parent, nativeSet)) {
        parent.forEach(function (value) {
          var entryChild = _clone(value, depth - 1);
          child.add(entryChild);
        });
      }

      for (var i in parent) {
        var attrs = Object.getOwnPropertyDescriptor(parent, i);
        if (attrs) {
          child[i] = _clone(parent[i], depth - 1);
        }

        try {
          var objProperty = Object.getOwnPropertyDescriptor(parent, i);
          if (objProperty.set === 'undefined') {
            // no setter defined. Skip cloning this property
            continue;
          }
          child[i] = _clone(parent[i], depth - 1);
        } catch (e) {
          if (e instanceof TypeError) {
            // when in strict mode, TypeError will be thrown if child[i] property only has a getter
            // we can't do anything about this, other than inform the user that this property cannot be set.
            continue;
          } else if (e instanceof ReferenceError) {
            //this may happen in non strict mode
            continue;
          }
        }

      }

      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(parent);
        for (var i = 0; i < symbols.length; i++) {
          // Don't need to worry about cloning a symbol because it is a primitive,
          // like a number or string.
          var symbol = symbols[i];
          var descriptor = Object.getOwnPropertyDescriptor(parent, symbol);
          if (descriptor && !descriptor.enumerable && !includeNonEnumerable) {
            continue;
          }
          child[symbol] = _clone(parent[symbol], depth - 1);
          Object.defineProperty(child, symbol, descriptor);
        }
      }

      if (includeNonEnumerable) {
        var allPropertyNames = Object.getOwnPropertyNames(parent);
        for (var i = 0; i < allPropertyNames.length; i++) {
          var propertyName = allPropertyNames[i];
          var descriptor = Object.getOwnPropertyDescriptor(parent, propertyName);
          if (descriptor && descriptor.enumerable) {
            continue;
          }
          child[propertyName] = _clone(parent[propertyName], depth - 1);
          Object.defineProperty(child, propertyName, descriptor);
        }
      }

      return child;
    }

    return _clone(parent, depth);
  }

  /**
     * Simple flat clone using prototype, accepts only objects, usefull for property
     * override on FLAT configuration object (no nested props).
     *
     * USE WITH CAUTION! This may not behave as you wish if you do not know how this
     * works.
     */
  clone.clonePrototype = function clonePrototype(parent) {
    if (parent === null)
    return null;

    var c = function c() {};
    c.prototype = parent;
    return new c();
  };

  // private utility functions

  function __objToStr(o) {
    return Object.prototype.toString.call(o);
  }
  clone.__objToStr = __objToStr;

  function __isDate(o) {
    return typeof o === 'object' && __objToStr(o) === '[object Date]';
  }
  clone.__isDate = __isDate;

  function __isArray(o) {
    return typeof o === 'object' && __objToStr(o) === '[object Array]';
  }
  clone.__isArray = __isArray;

  function __isRegExp(o) {
    return typeof o === 'object' && __objToStr(o) === '[object RegExp]';
  }
  clone.__isRegExp = __isRegExp;

  function __getRegExpFlags(re) {
    var flags = '';
    if (re.global) flags += 'g';
    if (re.ignoreCase) flags += 'i';
    if (re.multiline) flags += 'm';
    return flags;
  }
  clone.__getRegExpFlags = __getRegExpFlags;

  return clone;
}();var _default =

clone;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/buffer/index.js */ 45).Buffer))

/***/ }),
/* 45 */
/*!**************************************!*\
  !*** ./node_modules/buffer/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ 46)
var ieee754 = __webpack_require__(/*! ieee754 */ 47)
var isArray = __webpack_require__(/*! isarray */ 48)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ 2)))

/***/ }),
/* 46 */
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),
/* 47 */
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 48 */
/*!***************************************!*\
  !*** ./node_modules/isarray/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 49 */
/*!*******************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/util/route.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 50));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;} /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * 路由跳转方法，该方法相对于直接使用uni.xxx的好处是使用更加简单快捷
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * 并且带有路由拦截功能
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  */var

Router = /*#__PURE__*/function () {
  function Router() {_classCallCheck(this, Router);
    // 原始属性定义
    this.config = {
      type: 'navigateTo',
      url: '',
      delta: 1, // navigateBack页面后退时,回退的层数
      params: {}, // 传递的参数
      animationType: 'pop-in', // 窗口动画,只在APP有效
      animationDuration: 300, // 窗口动画持续时间,单位毫秒,只在APP有效
      intercept: false // 是否需要拦截
    };
    // 因为route方法是需要对外赋值给另外的对象使用，同时route内部有使用this，会导致route失去上下文
    // 这里在构造函数中进行this绑定
    this.route = this.route.bind(this);
  }

  // 判断url前面是否有"/"，如果没有则加上，否则无法跳转
  _createClass(Router, [{ key: "addRootPath", value: function addRootPath(url) {
      return url[0] === '/' ? url : "/".concat(url);
    }

    // 整合路由参数
  }, { key: "mixinParam", value: function mixinParam(url, params) {
      url = url && this.addRootPath(url);

      // 使用正则匹配，主要依据是判断是否有"/","?","="等，如“/page/index/index?name=mary"
      // 如果有url中有get参数，转换后无需带上"?"
      var query = '';
      if (/.*\/.*\?.*=.*/.test(url)) {
        // object对象转为get类型的参数
        query = uni.$u.queryParams(params, false);
        // 因为已有get参数,所以后面拼接的参数需要带上"&"隔开
        return url += "&".concat(query);
      }
      // 直接拼接参数，因为此处url中没有后面的query参数，也就没有"?/&"之类的符号
      query = uni.$u.queryParams(params);
      return url += query;
    }

    // 对外的方法名称
  }, { key: "route", value: function () {var _route = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var options,params,mergeConfig,isNext,_args = arguments;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};params = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
                // 合并用户的配置和内部的默认配置
                mergeConfig = {};

                if (typeof options === 'string') {
                  // 如果options为字符串，则为route(url, params)的形式
                  mergeConfig.url = this.mixinParam(options, params);
                  mergeConfig.type = 'navigateTo';
                } else {
                  mergeConfig = uni.$u.deepClone(options, this.config);
                  // 否则正常使用mergeConfig中的url和params进行拼接
                  mergeConfig.url = this.mixinParam(options.url, options.params);
                }

                // 如果本次跳转的路径和本页面路径一致，不执行跳转，防止用户快速点击跳转按钮，造成多次跳转同一个页面的问题
                if (!(mergeConfig.url === uni.$u.page())) {_context.next = 6;break;}return _context.abrupt("return");case 6:

                if (params.intercept) {
                  this.config.intercept = params.intercept;
                }
                // params参数也带给拦截器
                mergeConfig.params = params;
                // 合并内外部参数
                mergeConfig = uni.$u.deepMerge(this.config, mergeConfig);
                // 判断用户是否定义了拦截器
                if (!(typeof uni.$u.routeIntercept === 'function')) {_context.next = 16;break;}_context.next = 12;return (

                  new Promise(function (resolve, reject) {
                    uni.$u.routeIntercept(mergeConfig, resolve);
                  }));case 12:isNext = _context.sent;
                // 如果isNext为true，则执行路由跳转
                isNext && this.openPage(mergeConfig);_context.next = 17;break;case 16:

                this.openPage(mergeConfig);case 17:case "end":return _context.stop();}}}, _callee, this);}));function route() {return _route.apply(this, arguments);}return route;}()



    // 执行路由跳转
  }, { key: "openPage", value: function openPage(config) {
      // 解构参数
      var
      url =




      config.url,type = config.type,delta = config.delta,animationType = config.animationType,animationDuration = config.animationDuration;
      if (config.type == 'navigateTo' || config.type == 'to') {
        uni.navigateTo({
          url: url,
          animationType: animationType,
          animationDuration: animationDuration });

      }
      if (config.type == 'redirectTo' || config.type == 'redirect') {
        uni.redirectTo({
          url: url });

      }
      if (config.type == 'switchTab' || config.type == 'tab') {
        uni.switchTab({
          url: url });

      }
      if (config.type == 'reLaunch' || config.type == 'launch') {
        uni.reLaunch({
          url: url });

      }
      if (config.type == 'navigateBack' || config.type == 'back') {
        uni.navigateBack({
          delta: delta });

      }
    } }]);return Router;}();var _default =


new Router().route;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 50 */
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 51);

/***/ }),
/* 51 */
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 52);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),
/* 52 */
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),
/* 53 */
/*!*******************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/function/colorGradient.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 求两个颜色之间的渐变值
                                                                                                      * @param {string} startColor 开始的颜色
                                                                                                      * @param {string} endColor 结束的颜色
                                                                                                      * @param {number} step 颜色等分的份额
                                                                                                      * */
function colorGradient() {var startColor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'rgb(0, 0, 0)';var endColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rgb(255, 255, 255)';var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
  var startRGB = hexToRgb(startColor, false); // 转换为rgb数组模式
  var startR = startRGB[0];
  var startG = startRGB[1];
  var startB = startRGB[2];

  var endRGB = hexToRgb(endColor, false);
  var endR = endRGB[0];
  var endG = endRGB[1];
  var endB = endRGB[2];

  var sR = (endR - startR) / step; // 总差值
  var sG = (endG - startG) / step;
  var sB = (endB - startB) / step;
  var colorArr = [];
  for (var i = 0; i < step; i++) {
    // 计算每一步的hex值
    var hex = rgbToHex("rgb(".concat(Math.round(sR * i + startR), ",").concat(Math.round(sG * i + startG), ",").concat(Math.round(sB *
    i + startB), ")"));
    // 确保第一个颜色值为startColor的值
    if (i === 0) hex = rgbToHex(startColor);
    // 确保最后一个颜色值为endColor的值
    if (i === step - 1) hex = rgbToHex(endColor);
    colorArr.push(hex);
  }
  return colorArr;
}

// 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
function hexToRgb(sColor) {var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  sColor = String(sColor).toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = '#';
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    // 处理六位的颜色值
    var sColorChange = [];
    for (var _i = 1; _i < 7; _i += 2) {
      sColorChange.push(parseInt("0x".concat(sColor.slice(_i, _i + 2))));
    }
    if (!str) {
      return sColorChange;
    }
    return "rgb(".concat(sColorChange[0], ",").concat(sColorChange[1], ",").concat(sColorChange[2], ")");
  }if (/^(rgb|RGB)/.test(sColor)) {
    var arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, '').split(',');
    return arr.map(function (val) {return Number(val);});
  }
  return sColor;
}

// 将rgb表示方式转换为hex表示方式
function rgbToHex(rgb) {
  var _this = rgb;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  if (/^(rgb|RGB)/.test(_this)) {
    var aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, '').split(',');
    var strHex = '#';
    for (var i = 0; i < aColor.length; i++) {
      var hex = Number(aColor[i]).toString(16);
      hex = String(hex).length == 1 ? "".concat(0, hex) : hex; // 保证每个rgb的值为2位
      if (hex === '0') {
        hex += hex;
      }
      strHex += hex;
    }
    if (strHex.length !== 7) {
      strHex = _this;
    }
    return strHex;
  }if (reg.test(_this)) {
    var aNum = _this.replace(/#/, '').split('');
    if (aNum.length === 6) {
      return _this;
    }if (aNum.length === 3) {
      var numHex = '#';
      for (var _i2 = 0; _i2 < aNum.length; _i2 += 1) {
        numHex += aNum[_i2] + aNum[_i2];
      }
      return numHex;
    }
  } else {
    return _this;
  }
}

/**
  * JS颜色十六进制转换为rgb或rgba,返回的格式为 rgba（255，255，255，0.5）字符串
  * sHex为传入的十六进制的色值
  * alpha为rgba的透明度
  */
function colorToRgba(color, alpha) {
  color = rgbToHex(color);
  // 十六进制颜色值的正则表达式
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  /* 16进制颜色转为RGB格式 */
  var sColor = String(color).toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = '#';
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    // 处理六位的颜色值
    var sColorChange = [];
    for (var _i3 = 1; _i3 < 7; _i3 += 2) {
      sColorChange.push(parseInt("0x".concat(sColor.slice(_i3, _i3 + 2))));
    }
    // return sColorChange.join(',')
    return "rgba(".concat(sColorChange.join(','), ",").concat(alpha, ")");
  }

  return sColor;
}var _default =

{
  colorGradient: colorGradient,
  hexToRgb: hexToRgb,
  rgbToHex: rgbToHex,
  colorToRgba: colorToRgba };exports.default = _default;

/***/ }),
/* 54 */
/*!**********************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/function/test.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 验证电子邮箱格式
                                                                                                      */
function email(value) {
  return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
}

/**
   * 验证手机格式
   */
function mobile(value) {
  return /^1[23456789]\d{9}$/.test(value);
}

/**
   * 验证URL格式
   */
function url(value) {
  return /^((https|http|ftp|rtsp|mms):\/\/)(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-zA-Z_!~*'()-]+.)*([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z].[a-zA-Z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+\/?)$/.
  test(value);
}

/**
   * 验证日期格式
   */
function date(value) {
  if (!value) return false;
  // 判断是否数值或者字符串数值(意味着为时间戳)，转为数值，否则new Date无法识别字符串时间戳
  if (number(value)) value = +value;
  return !/Invalid|NaN/.test(new Date(value).toString());
}

/**
   * 验证ISO类型的日期格式
   */
function dateISO(value) {
  return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
}

/**
   * 验证十进制数字
   */
function number(value) {
  return /^[\+-]?(\d+\.?\d*|\.\d+|\d\.\d+e\+\d+)$/.test(value);
}

/**
   * 验证字符串
   */
function string(value) {
  return typeof value === 'string';
}

/**
   * 验证整数
   */
function digits(value) {
  return /^\d+$/.test(value);
}

/**
   * 验证身份证号码
   */
function idCard(value) {
  return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
  value);

}

/**
   * 是否车牌号
   */
function carNo(value) {
  // 新能源车牌
  var xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
  // 旧车牌
  var creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
  if (value.length === 7) {
    return creg.test(value);
  }if (value.length === 8) {
    return xreg.test(value);
  }
  return false;
}

/**
   * 金额,只允许2位小数
   */
function amount(value) {
  // 金额，只允许保留两位小数
  return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value);
}

/**
   * 中文
   */
function chinese(value) {
  var reg = /^[\u4e00-\u9fa5]+$/gi;
  return reg.test(value);
}

/**
   * 只能输入字母
   */
function letter(value) {
  return /^[a-zA-Z]*$/.test(value);
}

/**
   * 只能是字母或者数字
   */
function enOrNum(value) {
  // 英文或者数字
  var reg = /^[0-9a-zA-Z]*$/g;
  return reg.test(value);
}

/**
   * 验证是否包含某个值
   */
function contains(value, param) {
  return value.indexOf(param) >= 0;
}

/**
   * 验证一个值范围[min, max]
   */
function range(value, param) {
  return value >= param[0] && value <= param[1];
}

/**
   * 验证一个长度范围[min, max]
   */
function rangeLength(value, param) {
  return value.length >= param[0] && value.length <= param[1];
}

/**
   * 是否固定电话
   */
function landline(value) {
  var reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
  return reg.test(value);
}

/**
   * 判断是否为空
   */
function empty(value) {
  switch (typeof value) {
    case 'undefined':
      return true;
    case 'string':
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
      break;
    case 'boolean':
      if (!value) return true;
      break;
    case 'number':
      if (value === 0 || isNaN(value)) return true;
      break;
    case 'object':
      if (value === null || value.length === 0) return true;
      for (var i in value) {
        return false;
      }
      return true;}

  return false;
}

/**
   * 是否json字符串
   */
function jsonString(value) {
  if (typeof value === 'string') {
    try {
      var obj = JSON.parse(value);
      if (typeof obj === 'object' && obj) {
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }
  return false;
}

/**
   * 是否数组
   */
function array(value) {
  if (typeof Array.isArray === 'function') {
    return Array.isArray(value);
  }
  return Object.prototype.toString.call(value) === '[object Array]';
}

/**
   * 是否对象
   */
function object(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

/**
   * 是否短信验证码
   */
function code(value) {var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;
  return new RegExp("^\\d{".concat(len, "}$")).test(value);
}

/**
   * 是否函数方法
   * @param {Object} value
   */
function func(value) {
  return typeof value === 'function';
}

/**
   * 是否promise对象
   * @param {Object} value
   */
function promise(value) {
  return object(value) && func(value.then) && func(value.catch);
}

/** 是否图片格式
   * @param {Object} value
   */
function image(value) {
  var IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;
  return IMAGE_REGEXP.test(value);
}

/**
   * 是否视频格式
   * @param {Object} value
   */
function video(value) {
  var VIDEO_REGEXP = /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv)/i;
  return VIDEO_REGEXP.test(value);
}

/**
   * 是否为正则对象
   * @param {Object}
   * @return {Boolean}
   */
function regExp(o) {
  return o && Object.prototype.toString.call(o) === '[object RegExp]';
}var _default =

{
  email: email,
  mobile: mobile,
  url: url,
  date: date,
  dateISO: dateISO,
  number: number,
  digits: digits,
  idCard: idCard,
  carNo: carNo,
  amount: amount,
  chinese: chinese,
  letter: letter,
  enOrNum: enOrNum,
  contains: contains,
  range: range,
  rangeLength: rangeLength,
  empty: empty,
  isEmpty: empty,
  jsonString: jsonString,
  landline: landline,
  object: object,
  array: array,
  code: code,
  func: func,
  promise: promise,
  video: video,
  image: image,
  regExp: regExp,
  string: string };exports.default = _default;

/***/ }),
/* 55 */
/*!**************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/function/debounce.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var timeout = null;

/**
                                                                                                                         * 防抖原理：一定时间内，只有最后一次操作，再过wait毫秒后才执行函数
                                                                                                                         *
                                                                                                                         * @param {Function} func 要执行的回调函数
                                                                                                                         * @param {Number} wait 延时的时间
                                                                                                                         * @param {Boolean} immediate 是否立即执行
                                                                                                                         * @return null
                                                                                                                         */
function debounce(func) {var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  // 清除定时器
  if (timeout !== null) clearTimeout(timeout);
  // 立即执行，此类情况一般用不到
  if (immediate) {
    var callNow = !timeout;
    timeout = setTimeout(function () {
      timeout = null;
    }, wait);
    if (callNow) typeof func === 'function' && func();
  } else {
    // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
    timeout = setTimeout(function () {
      typeof func === 'function' && func();
    }, wait);
  }
}var _default =

debounce;exports.default = _default;

/***/ }),
/* 56 */
/*!**************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/function/throttle.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var timer;var
flag;
/**
       * 节流原理：在一定时间内，只能触发一次
       *
       * @param {Function} func 要执行的回调函数
       * @param {Number} wait 延时的时间
       * @param {Boolean} immediate 是否立即执行
       * @return null
       */
function throttle(func) {var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  if (immediate) {
    if (!flag) {
      flag = true;
      // 如果是立即执行，则在wait毫秒内开始时执行
      typeof func === 'function' && func();
      timer = setTimeout(function () {
        flag = false;
      }, wait);
    }
  } else if (!flag) {
    flag = true;
    // 如果是非立即执行，则在wait毫秒内的结束处执行
    timer = setTimeout(function () {
      flag = false;
      typeof func === 'function' && func();
    }, wait);
  }
}var _default =
throttle;exports.default = _default;

/***/ }),
/* 57 */
/*!***********************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/function/index.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _test = _interopRequireDefault(__webpack_require__(/*! ./test.js */ 54));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                                                                                            * 如果value小于min，取min；如果value大于max，取max
                                                                                                                                                                                                                                                            */
function range() {var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  return Math.max(min, Math.min(max, Number(value)));
}

/**
   * 用于获取用户传递值的px值
   * 如果用户传递了"xxpx"或者"xxrpx"，取出其数值部分，如果是"xxxrpx"还需要用过uni.upx2px进行转换
   */
function getPx(value) {var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  if (_test.default.number(value)) {
    return unit ? "".concat(value, "px") : value;
  }
  // 如果带有rpx，先取出其数值部分，再转为px值
  if (/(rpx|upx)$/.test(value)) {
    return unit ? "".concat(uni.upx2px(parseInt(value)), "px") : uni.upx2px(parseInt(value));
  }
  return unit ? "".concat(parseInt(value), "px") : parseInt(value);
}

/**
   * 进行延时，以达到可以简写代码的目的，比如
   * await uni.$u.sleep(20)将会阻塞20ms
   */
function sleep() {var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 30;
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, value);
  });
}

function os() {
  return uni.getSystemInfoSync().platform.toLowerCase();
}

function sys() {
  return uni.getSystemInfoSync();
}

/**
   * 取一个区间数
   * @param {Number} min 最小值
   * @param {Number} max 最大值
   */
function random(min, max) {
  if (min >= 0 && max > 0 && max >= min) {
    var gab = max - min + 1;
    return Math.floor(Math.random() * gab + min);
  }
  return 0;
}

/**
   * 本算法来源于简书开源代码，详见：https://www.jianshu.com/p/fdbf293d0a85
   * 全局唯一标识符（uuid，Globally Unique Identifier）,也称作 uuid(Universally Unique IDentifier)
   * 一般用于多个组件之间,给它一个唯一的标识符,或者v-for循环的时候,如果使用数组的index可能会导致更新列表出现问题
   * 最可能的情况是左滑删除item或者对某条信息流"不喜欢"并去掉它的时候,会导致组件内的数据可能出现错乱
   * v-for的时候,推荐使用后端返回的id而不是循环的index
   * @param {Number} len uuid的长度
   * @param {Boolean} firstU 将返回的首字母置为"u"
   * @param {Nubmer} radix 生成uuid的基数(意味着返回的字符串都是这个基数),2-二进制,8-八进制,10-十进制,16-十六进制
   */
function guid() {var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;var firstU = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var radix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [];
  radix = radix || chars.length;

  if (len) {
    // 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
    for (var i = 0; i < len; i++) {uuid[i] = chars[0 | Math.random() * radix];}
  } else {
    var r;
    // rfc4122标准要求返回的uuid中,某些位为固定的字符
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    for (var _i = 0; _i < 36; _i++) {
      if (!uuid[_i]) {
        r = 0 | Math.random() * 16;
        uuid[_i] = chars[_i == 19 ? r & 0x3 | 0x8 : r];
      }
    }
  }
  // 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
  if (firstU) {
    uuid.shift();
    return "u".concat(uuid.join(''));
  }
  return uuid.join('');
}

// 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
// this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
// 这里默认值等于undefined有它的含义，因为最顶层元素(组件)的$parent就是undefined，意味着不传name
// 值(默认为undefined)，就是查找最顶层的$parent
function $parent() {var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
  var parent = this.$parent;
  // 通过while历遍，这里主要是为了H5需要多层解析的问题
  while (parent) {
    // 父组件
    if (parent.$options && parent.$options.name !== name) {
      // 如果组件的name不相等，继续上一级寻找
      parent = parent.$parent;
    } else {
      return parent;
    }
  }
  return false;
}

/**
   * 样式转换
   * 对象转字符串，或者字符串转对象
   * @param {Object | String} 需要转换的目标
   * @param {String} 转换的目的，object-转为对象，string-转为字符串
   */
function addStyle(customStyle) {var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'object';
  // 字符串转字符串，对象转对象情形，直接返回
  if (_test.default.empty(customStyle) || typeof customStyle === 'object' && target === 'object' || target === 'string' &&
  typeof customStyle === 'string') {
    return customStyle;
  }
  // 字符串转对象
  if (target === 'object') {
    // 去除字符串样式中的两端空格(中间的空格不能去掉，比如padding: 20px 0如果去掉了就错了)，空格是无用的
    customStyle = trim(customStyle);
    // 根据";"将字符串转为数组形式
    var styleArray = customStyle.split(';');
    var style = {};
    // 历遍数组，拼接成对象
    for (var i = 0; i < styleArray.length; i++) {
      // 'font-size:20px;color:red;'，如此最后字符串有";"的话，会导致styleArray最后一个元素为空字符串，这里需要过滤
      if (styleArray[i]) {
        var item = styleArray[i].split(':');
        style[trim(item[0])] = trim(item[1]);
      }
    }
    return style;
  }
  // 这里为对象转字符串形式
  var string = '';
  for (var _i2 in customStyle) {
    // 驼峰转为中划线的形式，否则css内联样式，无法识别驼峰样式属性名
    var key = _i2.replace(/([A-Z])/g, '-$1').toLowerCase();
    string += "".concat(key, ":").concat(customStyle[_i2], ";");
  }
  // 去除两端空格
  return trim(string);
}

// 添加单位，如果有rpx，upx，%，px等单位结尾或者值为auto，直接返回，否则加上px单位结尾
function addUnit() {var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'auto';var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'px';
  value = String(value);
  // 用uView内置验证规则中的number判断是否为数值
  return _test.default.number(value) ? "".concat(value).concat(unit) : value;
}

// 深度克隆
function deepClone(obj) {
  // 对常见的“非”值，直接返回原来值
  if ([null, undefined, NaN, false].includes(obj)) return obj;
  if (typeof obj !== 'object' && typeof obj !== 'function') {
    // 原始类型直接返回
    return obj;
  }
  var o = _test.default.array(obj) ? [] : {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = typeof obj[i] === 'object' ? deepClone(obj[i]) : obj[i];
    }
  }
  return o;
}

// JS对象深度合并
function deepMerge() {var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  target = deepClone(target);
  if (typeof target !== 'object' || typeof source !== 'object') return false;
  for (var prop in source) {
    if (!source.hasOwnProperty(prop)) continue;
    if (prop in target) {
      if (typeof target[prop] !== 'object') {
        target[prop] = source[prop];
      } else if (typeof source[prop] !== 'object') {
        target[prop] = source[prop];
      } else if (target[prop].concat && source[prop].concat) {
        target[prop] = target[prop].concat(source[prop]);
      } else {
        target[prop] = deepMerge(target[prop], source[prop]);
      }
    } else {
      target[prop] = source[prop];
    }
  }
  return target;
}

function error(err) {
  // 开发环境才提示，生产环境不会提示
  if (true) {
    console.error("uView\u63D0\u793A\uFF1A".concat(err));
  }
}

// 打乱数组
function randomArray() {var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  // 原理是sort排序,Math.random()产生0<= x < 1之间的数,会导致x-0.05大于或者小于0
  return array.sort(function () {return Math.random() - 0.5;});
}

// padStart 的 polyfill，因为某些机型或情况，还无法支持es7的padStart，比如电脑版的微信小程序
// 所以这里做一个兼容polyfill的兼容处理
if (!String.prototype.padStart) {
  // 为了方便表示这里 fillString 用了ES6 的默认参数，不影响理解
  String.prototype.padStart = function (maxLength) {var fillString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ' ';
    if (Object.prototype.toString.call(fillString) !== '[object String]') {
      throw new TypeError(
      'fillString must be String');

    }
    var str = this;
    // 返回 String(str) 这里是为了使返回的值是字符串字面量，在控制台中更符合直觉
    if (str.length >= maxLength) return String(str);

    var fillLength = maxLength - str.length;
    var times = Math.ceil(fillLength / fillString.length);
    while (times >>= 1) {
      fillString += fillString;
      if (times === 1) {
        fillString += fillString;
      }
    }
    return fillString.slice(0, fillLength) + str;
  };
}

// 其他更多是格式化有如下:
// yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分等,可自定义组合
function timeFormat() {var dateTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var fmt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  // 如果为null,则格式化当前时间
  if (!dateTime) dateTime = Number(new Date());
  // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
  if (dateTime.toString().length == 10) dateTime *= 1000;
  var date = new Date(dateTime);
  var ret;
  var opt = {
    'y+': date.getFullYear().toString(), // 年
    'm+': (date.getMonth() + 1).toString(), // 月
    'd+': date.getDate().toString(), // 日
    'h+': date.getHours().toString(), // 时
    'M+': date.getMinutes().toString(), // 分
    's+': date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (var k in opt) {
    ret = new RegExp("(".concat(k, ")")).exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0'));
    }
  }
  return fmt;
}

/**
   * 时间戳转为多久之前
   * @param String timestamp 时间戳
   * @param String | Boolean format 如果为时间格式字符串，超出一定时间范围，返回固定的时间格式；
   * 如果为布尔值false，无论什么时间，都返回多久以前的格式
   */
function timeFrom() {var timestamp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  if (timestamp == null) timestamp = Number(new Date());
  timestamp = parseInt(timestamp);
  // 判断用户输入的时间戳是秒还是毫秒,一般前端js获取的时间戳是毫秒(13位),后端传过来的为秒(10位)
  if (timestamp.toString().length == 10) timestamp *= 1000;
  var timer = new Date().getTime() - timestamp;
  timer = parseInt(timer / 1000);
  // 如果小于5分钟,则返回"刚刚",其他以此类推
  var tips = '';
  switch (true) {
    case timer < 300:
      tips = '刚刚';
      break;
    case timer >= 300 && timer < 3600:
      tips = "".concat(parseInt(timer / 60), "\u5206\u949F\u524D");
      break;
    case timer >= 3600 && timer < 86400:
      tips = "".concat(parseInt(timer / 3600), "\u5C0F\u65F6\u524D");
      break;
    case timer >= 86400 && timer < 2592000:
      tips = "".concat(parseInt(timer / 86400), "\u5929\u524D");
      break;
    default:
      // 如果format为false，则无论什么时间戳，都显示xx之前
      if (format === false) {
        if (timer >= 2592000 && timer < 365 * 86400) {
          tips = "".concat(parseInt(timer / (86400 * 30)), "\u4E2A\u6708\u524D");
        } else {
          tips = "".concat(parseInt(timer / (86400 * 365)), "\u5E74\u524D");
        }
      } else {
        tips = timeFormat(timestamp, format);
      }}

  return tips;
}

/**
   * 去除空格
   */
function trim(str) {var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'both';
  str = String(str);
  if (pos == 'both') {
    return str.replace(/^\s+|\s+$/g, '');
  }if (pos == 'left') {
    return str.replace(/^\s*/, '');
  }if (pos == 'right') {
    return str.replace(/(\s*$)/g, '');
  }if (pos == 'all') {
    return str.replace(/\s+/g, '');
  }
  return str;
}

/**
   * 对象转url参数
   * @param {*} data,对象
   * @param {*} isPrefix,是否自动加上"?"
   */
function queryParams() {var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var isPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var arrayFormat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'brackets';
  var prefix = isPrefix ? '?' : '';
  var _result = [];
  if (['indices', 'brackets', 'repeat', 'comma'].indexOf(arrayFormat) == -1) arrayFormat = 'brackets';var _loop = function _loop(
  key) {
    var value = data[key];
    // 去掉为空的参数
    if (['', undefined, null].indexOf(value) >= 0) {
      return "continue";
    }
    // 如果值为数组，另行处理
    if (value.constructor === Array) {
      // e.g. {ids: [1, 2, 3]}
      switch (arrayFormat) {
        case 'indices':
          // 结果: ids[0]=1&ids[1]=2&ids[2]=3
          for (var i = 0; i < value.length; i++) {
            _result.push("".concat(key, "[").concat(i, "]=").concat(value[i]));
          }
          break;
        case 'brackets':
          // 结果: ids[]=1&ids[]=2&ids[]=3
          value.forEach(function (_value) {
            _result.push("".concat(key, "[]=").concat(_value));
          });
          break;
        case 'repeat':
          // 结果: ids=1&ids=2&ids=3
          value.forEach(function (_value) {
            _result.push("".concat(key, "=").concat(_value));
          });
          break;
        case 'comma':
          // 结果: ids=1,2,3
          var commaStr = '';
          value.forEach(function (_value) {
            commaStr += (commaStr ? ',' : '') + _value;
          });
          _result.push("".concat(key, "=").concat(commaStr));
          break;
        default:
          value.forEach(function (_value) {
            _result.push("".concat(key, "[]=").concat(_value));
          });}

    } else {
      _result.push("".concat(key, "=").concat(value));
    }};for (var key in data) {var _ret = _loop(key);if (_ret === "continue") continue;
  }
  return _result.length ? prefix + _result.join('&') : '';
}

function toast(title) {var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2000;
  uni.showToast({
    title: String(title),
    icon: 'none',
    duration: duration });

}

/**
   * 根据主题type值,获取对应的图标
   * @param String type 主题名称,primary|info|error|warning|success
   * @param String fill 是否使用fill填充实体的图标
   */
function type2icon() {var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'success';var fill = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  // 如果非预置值,默认为success
  if (['primary', 'info', 'error', 'warning', 'success'].indexOf(type) == -1) type = 'success';
  var iconName = '';
  // 目前(2019-12-12),info和primary使用同一个图标
  switch (type) {
    case 'primary':
      iconName = 'info-circle';
      break;
    case 'info':
      iconName = 'info-circle';
      break;
    case 'error':
      iconName = 'close-circle';
      break;
    case 'warning':
      iconName = 'error-circle';
      break;
    case 'success':
      iconName = 'checkmark-circle';
      break;
    default:
      iconName = 'checkmark-circle';}

  // 是否是实体类型,加上-fill,在icon组件库中,实体的类名是后面加-fill的
  if (fill) iconName += '-fill';
  return iconName;
}

/*
   * 参数说明：
   * number：要格式化的数字
   * decimals：保留几位小数
   * decimalPoint：小数点符号
   * thousandsSeparator：千分位符号
   * */
function priceFormat(number) {var decimals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;var decimalPoint = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '.';var thousandsSeparator = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ',';
  number = "".concat(number).replace(/[^0-9+-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number;
  var prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
  var sep = typeof thousandsSeparator === 'undefined' ? ',' : thousandsSeparator;
  var dec = typeof decimalPoint === 'undefined' ? '.' : decimalPoint;
  var s = '';
  var toFixedFix = function toFixedFix(n, prec) {
    var k = Math.pow(10, prec);
    return "".concat(Math.ceil(n * k) / k);
  };

  s = (prec ? toFixedFix(n, prec) : "".concat(Math.round(n))).split('.');
  var re = /(-?\d+)(\d{3})/;
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, "$1".concat(sep, "$2"));
  }

  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

// 获取duration值，如果带有ms或者s直接返回，如果大于一定值，认为是ms单位，小于一定值，认为是s单位
// 比如以30位阈值，那么300大于30，可以理解为用户想要的是300ms，而不是想花300s去执行一个动画
function getDuration(value) {var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var valueNum = parseInt(value);
  if (unit) {
    if (/s$/.test(value)) return value;
    return value > 30 ? "".concat(value, "ms") : "".concat(value, "s");
  }
  if (/ms$/.test(value)) return valueNum;
  if (/s$/.test(value)) return valueNum > 30 ? valueNum : valueNum * 1000;
  return valueNum;
}

// 日期的月或日补零操作
function padZero(value) {
  return "00".concat(value).slice(-2);
}

// 在u-form的子组件内容发生变化，或者失去焦点时，尝试通知u-form执行校验方法
function formValidate(instance, event) {
  var formItem = uni.$u.$parent.call(instance, 'u-form-item');
  var form = uni.$u.$parent.call(instance, 'u-form');
  // 如果发生变化的input或者textarea等，其父组件中有u-form-item或者u-form等，就执行form的validate方法
  // 同时将form-item的pros传递给form，让其进行精确对象验证
  if (formItem && form) {
    form.validateField(formItem.prop, function () {}, event);
  }
}

// 获取某个对象下的属性，用于通过类似'a.b.c'的形式去获取一个对象的的属性的形式
function getProperty(obj, key) {
  if (!obj) {
    return;
  }
  if (typeof key !== 'string' || key === '') {
    return '';
  }if (key.indexOf('.') !== -1) {
    var keys = key.split('.');
    var firstObj = obj[keys[0]] || {};

    for (var i = 1; i < keys.length; i++) {
      if (firstObj) {
        firstObj = firstObj[keys[i]];
      }
    }
    return firstObj;
  }
  return obj[key];
}

// 设置对象的属性值，如果'a.b.c'的形式进行设置
function setProperty(obj, key, value) {
  if (!obj) {
    return;
  }
  // 递归赋值
  var inFn = function inFn(_obj, keys, v) {
    // 最后一个属性key
    if (keys.length === 1) {
      _obj[keys[0]] = v;
      return;
    }
    // 0~length-1个key
    while (keys.length > 1) {
      var k = keys[0];
      if (!_obj[k] || typeof _obj[k] !== 'object') {
        _obj[k] = {};
      }
      var _key = keys.shift();
      // 自调用判断是否存在属性，不存在则自动创建对象
      inFn(_obj[k], keys, v);
    }
  };

  if (typeof key !== 'string' || key === '') {

  } else if (key.indexOf('.') !== -1) {// 支持多层级赋值操作
    var keys = key.split('.');
    inFn(obj, keys, value);
  } else {
    obj[key] = value;
  }
}

// 获取当前页面路径
function page() {
  var pages = getCurrentPages();
  return "/".concat(getCurrentPages()[pages.length - 1].route);
}var _default =

{
  range: range,
  getPx: getPx,
  sleep: sleep,
  os: os,
  sys: sys,
  random: random,
  guid: guid,
  $parent: $parent,
  addStyle: addStyle,
  addUnit: addUnit,
  deepClone: deepClone,
  deepMerge: deepMerge,
  error: error,
  randomArray: randomArray,
  timeFormat: timeFormat,
  timeFrom: timeFrom,
  trim: trim,
  queryParams: queryParams,
  toast: toast,
  type2icon: type2icon,
  priceFormat: priceFormat,
  getDuration: getDuration,
  padZero: padZero,
  formValidate: formValidate,
  getProperty: getProperty,
  setProperty: setProperty,
  page: page };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 58 */
/*!**********************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/config.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 此版本发布于2020-12-01
var version = '2.0.9';var _default =

{
  v: version,
  version: version,
  // 主题名称
  type: [
  'primary',
  'success',
  'info',
  'error',
  'warning'],

  // 颜色部分，本来可以通过scss的:export导出供js使用，但是奈何nvue不支持
  color: {
    'u-primary': '#2979ff',
    'u-warning': '#ff9900',
    'u-success': '#19be6b',
    'u-error': '#fa3534',
    'u-info': '#909399',
    'u-main-color': '#303133',
    'u-content-color': '#606266',
    'u-tips-color': '#909399',
    'u-light-color': '#c0c4cc' } };exports.default = _default;

/***/ }),
/* 59 */
/*!*********************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;




var _config = _interopRequireDefault(__webpack_require__(/*! ./config */ 58));

var _actionSheet = _interopRequireDefault(__webpack_require__(/*! ./props/actionSheet.js */ 60));
var _album = _interopRequireDefault(__webpack_require__(/*! ./props/album.js */ 61));
var _alert = _interopRequireDefault(__webpack_require__(/*! ./props/alert.js */ 62));
var _avatar = _interopRequireDefault(__webpack_require__(/*! ./props/avatar */ 63));
var _avatarGroup = _interopRequireDefault(__webpack_require__(/*! ./props/avatarGroup */ 64));
var _backtop = _interopRequireDefault(__webpack_require__(/*! ./props/backtop */ 65));
var _badge = _interopRequireDefault(__webpack_require__(/*! ./props/badge */ 66));
var _button = _interopRequireDefault(__webpack_require__(/*! ./props/button */ 67));
var _calendar = _interopRequireDefault(__webpack_require__(/*! ./props/calendar */ 68));
var _carKeyboard = _interopRequireDefault(__webpack_require__(/*! ./props/carKeyboard */ 69));
var _cell = _interopRequireDefault(__webpack_require__(/*! ./props/cell */ 70));
var _cellGroup = _interopRequireDefault(__webpack_require__(/*! ./props/cellGroup */ 71));
var _checkbox = _interopRequireDefault(__webpack_require__(/*! ./props/checkbox */ 72));
var _checkboxGroup = _interopRequireDefault(__webpack_require__(/*! ./props/checkboxGroup */ 73));
var _circleProgress = _interopRequireDefault(__webpack_require__(/*! ./props/circleProgress */ 74));
var _code = _interopRequireDefault(__webpack_require__(/*! ./props/code */ 75));
var _codeInput = _interopRequireDefault(__webpack_require__(/*! ./props/codeInput */ 76));
var _col = _interopRequireDefault(__webpack_require__(/*! ./props/col */ 77));
var _collapse = _interopRequireDefault(__webpack_require__(/*! ./props/collapse */ 78));
var _collapseItem = _interopRequireDefault(__webpack_require__(/*! ./props/collapseItem */ 79));
var _columnNotice = _interopRequireDefault(__webpack_require__(/*! ./props/columnNotice */ 80));
var _countDown = _interopRequireDefault(__webpack_require__(/*! ./props/countDown */ 81));
var _countTo = _interopRequireDefault(__webpack_require__(/*! ./props/countTo */ 82));
var _datetimePicker = _interopRequireDefault(__webpack_require__(/*! ./props/datetimePicker */ 83));
var _divider = _interopRequireDefault(__webpack_require__(/*! ./props/divider */ 84));
var _empty = _interopRequireDefault(__webpack_require__(/*! ./props/empty */ 85));
var _form = _interopRequireDefault(__webpack_require__(/*! ./props/form */ 86));
var _formItem = _interopRequireDefault(__webpack_require__(/*! ./props/formItem */ 87));
var _gap = _interopRequireDefault(__webpack_require__(/*! ./props/gap */ 88));
var _grid = _interopRequireDefault(__webpack_require__(/*! ./props/grid */ 89));
var _gridItem = _interopRequireDefault(__webpack_require__(/*! ./props/gridItem */ 90));
var _icon = _interopRequireDefault(__webpack_require__(/*! ./props/icon */ 91));
var _image = _interopRequireDefault(__webpack_require__(/*! ./props/image */ 92));
var _indexAnchor = _interopRequireDefault(__webpack_require__(/*! ./props/indexAnchor */ 93));
var _indexList = _interopRequireDefault(__webpack_require__(/*! ./props/indexList */ 94));
var _input = _interopRequireDefault(__webpack_require__(/*! ./props/input */ 95));
var _keyboard = _interopRequireDefault(__webpack_require__(/*! ./props/keyboard */ 96));
var _line = _interopRequireDefault(__webpack_require__(/*! ./props/line */ 97));
var _lineProgress = _interopRequireDefault(__webpack_require__(/*! ./props/lineProgress */ 98));
var _link = _interopRequireDefault(__webpack_require__(/*! ./props/link */ 99));
var _list = _interopRequireDefault(__webpack_require__(/*! ./props/list */ 100));
var _listItem = _interopRequireDefault(__webpack_require__(/*! ./props/listItem */ 101));
var _loadingIcon = _interopRequireDefault(__webpack_require__(/*! ./props/loadingIcon */ 102));
var _loadingPage = _interopRequireDefault(__webpack_require__(/*! ./props/loadingPage */ 103));
var _loadmore = _interopRequireDefault(__webpack_require__(/*! ./props/loadmore */ 104));
var _modal = _interopRequireDefault(__webpack_require__(/*! ./props/modal */ 105));
var _navbar = _interopRequireDefault(__webpack_require__(/*! ./props/navbar */ 106));
var _noNetwork = _interopRequireDefault(__webpack_require__(/*! ./props/noNetwork */ 107));
var _noticeBar = _interopRequireDefault(__webpack_require__(/*! ./props/noticeBar */ 108));
var _notify = _interopRequireDefault(__webpack_require__(/*! ./props/notify */ 109));
var _numberBox = _interopRequireDefault(__webpack_require__(/*! ./props/numberBox */ 110));
var _numberKeyboard = _interopRequireDefault(__webpack_require__(/*! ./props/numberKeyboard */ 111));
var _overlay = _interopRequireDefault(__webpack_require__(/*! ./props/overlay */ 112));
var _parse = _interopRequireDefault(__webpack_require__(/*! ./props/parse */ 113));
var _picker = _interopRequireDefault(__webpack_require__(/*! ./props/picker */ 114));
var _popup = _interopRequireDefault(__webpack_require__(/*! ./props/popup */ 115));
var _radio = _interopRequireDefault(__webpack_require__(/*! ./props/radio */ 116));
var _radioGroup = _interopRequireDefault(__webpack_require__(/*! ./props/radioGroup */ 117));
var _rate = _interopRequireDefault(__webpack_require__(/*! ./props/rate */ 118));
var _readMore = _interopRequireDefault(__webpack_require__(/*! ./props/readMore */ 119));
var _row = _interopRequireDefault(__webpack_require__(/*! ./props/row */ 120));
var _rowNotice = _interopRequireDefault(__webpack_require__(/*! ./props/rowNotice */ 121));
var _scrollList = _interopRequireDefault(__webpack_require__(/*! ./props/scrollList */ 122));
var _search = _interopRequireDefault(__webpack_require__(/*! ./props/search */ 123));
var _section = _interopRequireDefault(__webpack_require__(/*! ./props/section */ 124));
var _skeleton = _interopRequireDefault(__webpack_require__(/*! ./props/skeleton */ 125));
var _slider = _interopRequireDefault(__webpack_require__(/*! ./props/slider */ 126));
var _statusBar = _interopRequireDefault(__webpack_require__(/*! ./props/statusBar */ 127));
var _steps = _interopRequireDefault(__webpack_require__(/*! ./props/steps */ 128));
var _stepsItem = _interopRequireDefault(__webpack_require__(/*! ./props/stepsItem */ 129));
var _sticky = _interopRequireDefault(__webpack_require__(/*! ./props/sticky */ 130));
var _subsection = _interopRequireDefault(__webpack_require__(/*! ./props/subsection */ 131));
var _swipeAction = _interopRequireDefault(__webpack_require__(/*! ./props/swipeAction */ 132));
var _swipeActionItem = _interopRequireDefault(__webpack_require__(/*! ./props/swipeActionItem */ 133));
var _swiper = _interopRequireDefault(__webpack_require__(/*! ./props/swiper */ 134));
var _swipterIndicator = _interopRequireDefault(__webpack_require__(/*! ./props/swipterIndicator */ 135));
var _switch2 = _interopRequireDefault(__webpack_require__(/*! ./props/switch */ 136));
var _tabbar = _interopRequireDefault(__webpack_require__(/*! ./props/tabbar */ 137));
var _tabbarItem = _interopRequireDefault(__webpack_require__(/*! ./props/tabbarItem */ 138));
var _tabs = _interopRequireDefault(__webpack_require__(/*! ./props/tabs */ 139));
var _tag = _interopRequireDefault(__webpack_require__(/*! ./props/tag */ 140));
var _text = _interopRequireDefault(__webpack_require__(/*! ./props/text */ 141));
var _textarea = _interopRequireDefault(__webpack_require__(/*! ./props/textarea */ 142));
var _toast = _interopRequireDefault(__webpack_require__(/*! ./props/toast */ 143));
var _toolbar = _interopRequireDefault(__webpack_require__(/*! ./props/toolbar */ 144));
var _tooltip = _interopRequireDefault(__webpack_require__(/*! ./props/tooltip */ 145));
var _transition = _interopRequireDefault(__webpack_require__(/*! ./props/transition */ 146));
var _upload = _interopRequireDefault(__webpack_require__(/*! ./props/upload */ 147));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var


color =
_config.default.color;var _default = _objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({},


_actionSheet.default),
_album.default),
_alert.default),
_avatar.default),
_avatarGroup.default),
_backtop.default),
_badge.default),
_button.default),
_calendar.default),
_carKeyboard.default),
_cell.default),
_cellGroup.default),
_checkbox.default),
_checkboxGroup.default),
_circleProgress.default),
_code.default),
_codeInput.default),
_col.default),
_collapse.default),
_collapseItem.default),
_columnNotice.default),
_countDown.default),
_countTo.default),
_datetimePicker.default),
_divider.default),
_empty.default),
_form.default),
_formItem.default),
_gap.default),
_grid.default),
_gridItem.default),
_icon.default),
_image.default),
_indexAnchor.default),
_indexList.default),
_input.default),
_keyboard.default),
_line.default),
_lineProgress.default),
_link.default),
_list.default),
_listItem.default),
_loadingIcon.default),
_loadingPage.default),
_loadmore.default),
_modal.default),
_navbar.default),
_noNetwork.default),
_noticeBar.default),
_notify.default),
_numberBox.default),
_numberKeyboard.default),
_overlay.default),
_parse.default),
_picker.default),
_popup.default),
_radio.default),
_radioGroup.default),
_rate.default),
_readMore.default),
_row.default),
_rowNotice.default),
_scrollList.default),
_search.default),
_section.default),
_skeleton.default),
_slider.default),
_statusBar.default),
_steps.default),
_stepsItem.default),
_sticky.default),
_subsection.default),
_swipeAction.default),
_swipeActionItem.default),
_swiper.default),
_swipterIndicator.default),
_switch2.default),
_tabbar.default),
_tabbarItem.default),
_tabs.default),
_tag.default),
_text.default),
_textarea.default),
_toast.default),
_toolbar.default),
_tooltip.default),
_transition.default),
_upload.default);exports.default = _default;

/***/ }),
/* 60 */
/*!*********************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/actionSheet.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 16:44:35
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/actionSheet.js
                                                                                                      */var _default =
{
  // action-sheet组件
  actionSheet: {
    show: false,
    title: '',
    description: '',
    actions: function actions() {return [];},
    index: '',
    cancelText: '',
    closeOnClickAction: true,
    safeAreaInsetBottom: true,
    openType: '',
    closeOnClickOverlay: true,
    round: false } };exports.default = _default;

/***/ }),
/* 61 */
/*!***************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/album.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 16:47:24
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/album.js
                                                                                                      */var _default =
{
  // album 组件
  album: {
    urls: function urls() {return [];},
    keyName: '',
    singleSize: 180,
    multipleSize: 70,
    space: 6,
    singleMode: 'scaleToFill',
    multipleMode: 'aspectFill',
    maxCount: 9,
    previewFullImage: true,
    rowCount: 3,
    showMore: true } };exports.default = _default;

/***/ }),
/* 62 */
/*!***************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/alert.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 16:48:53
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/alert.js
                                                                                                      */var _default =
{
  // alert警告组件
  alert: {
    title: '',
    type: 'warning',
    description: '',
    closable: false,
    showIcon: false,
    effect: 'light',
    center: false,
    fontSize: 14 } };exports.default = _default;

/***/ }),
/* 63 */
/*!****************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/avatar.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 16:49:22
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/avatar.js
                                                                                                      */var _default =
{
  // avatar 组件
  avatar: {
    src: '',
    shape: 'circle',
    size: 40,
    mode: 'scaleToFill',
    text: '',
    bgColor: '#c0c4cc',
    color: '#ffffff',
    fontSize: 18,
    icon: '',
    mpAvatar: false,
    randomBgColor: false,
    defaultUrl: '',
    colorIndex: '',
    name: '' } };exports.default = _default;

/***/ }),
/* 64 */
/*!*********************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/avatarGroup.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 16:49:55
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/avatarGroup.js
                                                                                                      */var _default =
{
  // avatarGroup 组件
  avatarGroup: {
    urls: function urls() {return [];},
    maxCount: 5,
    shape: 'circle',
    mode: 'scaleToFill',
    showMore: true,
    size: 40,
    keyName: '',
    gap: 0.5,
    extraValue: 0 } };exports.default = _default;

/***/ }),
/* 65 */
/*!*****************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/backtop.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 16:50:18
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/backtop.js
                                                                                                      */var _default =
{
  // backtop组件
  backtop: {
    mode: 'circle',
    icon: 'arrow-upward',
    text: '',
    duration: 100,
    scrollTop: 0,
    top: 400,
    bottom: 100,
    right: 20,
    zIndex: 9,
    iconStyle: function iconStyle() {return {
        color: '#909399',
        fontSize: '19px' };} } };exports.default = _default;

/***/ }),
/* 66 */
/*!***************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/badge.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-23 19:51:50
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/badge.js
                                                                                                      */var _default =
{
  // 徽标数组件
  badge: {
    isDot: false,
    value: '',
    show: true,
    max: 999,
    type: 'error',
    showZero: false,
    bgColor: null,
    color: null,
    shape: 'circle',
    numberType: 'overflow',
    offset: function offset() {return [];},
    inverted: false,
    absolute: false } };exports.default = _default;

/***/ }),
/* 67 */
/*!****************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/button.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 16:51:27
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/button.js
                                                                                                      */var _default =
{
  // button组件
  button: {
    hairline: false,
    type: 'info',
    size: 'normal',
    shape: 'square',
    plain: false,
    disabled: false,
    loading: false,
    loadingText: '',
    loadingMode: 'spinner',
    loadingSize: 15,
    openType: '',
    formType: '',
    appParameter: '',
    hoverStopPropagation: true,
    lang: 'en',
    sessionFrom: '',
    sendMessageTitle: '',
    sendMessagePath: '',
    sendMessageImg: '',
    showMessageCard: false,
    dataName: '',
    throttleTime: 0,
    hoverStartTime: 0,
    hoverStayTime: 200,
    text: '',
    icon: '',
    color: '' } };exports.default = _default;

/***/ }),
/* 68 */
/*!******************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/calendar.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 16:52:43
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/calendar.js
                                                                                                      */var _default =
{
  // calendar 组件
  calendar: {
    title: '日期选择',
    showTitle: true,
    showSubtitle: true,
    mode: 'single',
    startText: '开始',
    endText: '结束',
    customList: function customList() {return [];},
    color: '#3c9cff',
    minDate: 0,
    maxDate: 0,
    defaultDate: null,
    maxCount: Number.MAX_SAFE_INTEGER, // Infinity
    rowHeight: 56,
    formatter: null,
    showLunar: false,
    showMark: true,
    confirmText: '确定',
    confirmDisabledText: '确定',
    show: false,
    closeOnClickOverlay: false,
    readonly: false,
    showConfirm: true,
    maxRange: Number.MAX_SAFE_INTEGER, // Infinity
    rangePrompt: '',
    showRangePrompt: true,
    allowSameDay: false } };exports.default = _default;

/***/ }),
/* 69 */
/*!*********************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/carKeyboard.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 16:53:20
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/carKeyboard.js
                                                                                                      */var _default =
{
  // 车牌号键盘
  carKeyboard: {
    random: false } };exports.default = _default;

/***/ }),
/* 70 */
/*!**************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/cell.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-23 20:53:09
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/cell.js
                                                                                                      */var _default =
{
  // cell组件的props
  cell: {
    customClass: '',
    title: '',
    label: '',
    value: '',
    icon: '',
    titleWidth: '',
    disabled: false,
    border: true,
    center: false,
    url: '',
    linkType: 'navigateTo',
    clickable: false,
    isLink: false,
    required: false,
    arrowDirection: '',
    rightIconStyle: {},
    rightIcon: 'arrow-right',
    titleStyle: {},
    size: '',
    stop: true,
    name: '' } };exports.default = _default;

/***/ }),
/* 71 */
/*!*******************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/cellGroup.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 16:54:16
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/cellGroup.js
                                                                                                      */var _default =
{
  // cell-group组件的props
  cellGroup: {
    title: '',
    border: true,
    customStyle: {} } };exports.default = _default;

/***/ }),
/* 72 */
/*!******************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/checkbox.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-23 21:06:59
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/checkbox.js
                                                                                                      */var _default =
{
  // checkbox组件
  checkbox: {
    name: '',
    shape: 'square',
    size: '',
    checkbox: false,
    disabled: '',
    activeColor: '',
    inactiveColor: '',
    iconSize: '',
    iconColor: '',
    label: '',
    labelSize: '',
    labelColor: '',
    labelDisabled: '' } };exports.default = _default;

/***/ }),
/* 73 */
/*!***********************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/checkboxGroup.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 16:54:47
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/checkboxGroup.js
                                                                                                      */var _default =
{
  // checkbox-group组件
  checkboxGroup: {
    name: '',
    value: function value() {return [];},
    shape: 'square',
    disabled: false,
    activeColor: '#2979ff',
    inactiveColor: '#c8c9cc',
    size: 18,
    placement: 'row',
    labelSize: 14,
    labelColor: '#303133',
    labelDisabled: false,
    iconColor: '#ffffff',
    iconSize: 12,
    iconPlacement: 'left',
    borderBottom: false } };exports.default = _default;

/***/ }),
/* 74 */
/*!************************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/circleProgress.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 16:55:02
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/circleProgress.js
                                                                                                      */var _default =
{
  // circleProgress 组件
  circleProgress: {
    percentage: 30 } };exports.default = _default;

/***/ }),
/* 75 */
/*!**************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/code.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 16:55:27
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/code.js
                                                                                                      */var _default =

{
  // code 组件
  code: {
    seconds: 60,
    startText: '获取验证码',
    changeText: 'X秒重新获取',
    endText: '重新获取',
    keepRunning: false,
    uniqueKey: '' } };exports.default = _default;

/***/ }),
/* 76 */
/*!*******************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/codeInput.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 16:55:58
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/codeInput.js
                                                                                                      */var _default =
{
  // codeInput 组件
  codeInput: {
    maxlength: 6,
    dot: false,
    mode: 'box',
    hairline: false,
    space: 10,
    value: '',
    focus: false,
    bold: false,
    color: '#606266',
    fontSize: 18,
    size: 35,
    disabledKeyboard: false,
    borderColor: '#c9cacc' } };exports.default = _default;

/***/ }),
/* 77 */
/*!*************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/col.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 16:56:12
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/col.js
                                                                                                      */var _default =
{
  // col 组件
  col: {
    span: 12,
    offset: 0,
    justify: 'start',
    align: 'stretch',
    textAlign: 'left' } };exports.default = _default;

/***/ }),
/* 78 */
/*!******************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/collapse.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 16:56:30
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/collapse.js
                                                                                                      */var _default =
{
  // collapse 组件
  collapse: {
    value: null,
    accordion: false,
    border: true } };exports.default = _default;

/***/ }),
/* 79 */
/*!**********************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/collapseItem.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 16:56:42
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/collapseItem.js
                                                                                                      */var _default =
{
  // collapseItem 组件
  collapseItem: {
    title: '',
    value: '',
    label: '',
    disabled: false,
    isLink: true,
    clickable: true,
    border: true,
    align: 'left',
    name: '',
    icon: '',
    duration: 300 } };exports.default = _default;

/***/ }),
/* 80 */
/*!**********************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/columnNotice.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 16:57:16
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/columnNotice.js
                                                                                                      */var _default =
{
  // columnNotice 组件
  columnNotice: {
    text: '',
    icon: 'volume',
    mode: '',
    color: '#f9ae3d',
    bgColor: '#fdf6ec',
    fontSize: 14,
    speed: 80,
    step: false,
    duration: 1500,
    disableTouch: true } };exports.default = _default;

/***/ }),
/* 81 */
/*!*******************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/countDown.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 17:11:29
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/countDown.js
                                                                                                      */var _default =
{
  // u-count-down 计时器组件
  countDown: {
    time: 0,
    format: 'HH:mm:ss',
    autoStart: true,
    millisecond: false } };exports.default = _default;

/***/ }),
/* 82 */
/*!*****************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/countTo.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 16:57:32
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/countTo.js
                                                                                                      */var _default =
{
  // countTo 组件
  countTo: {
    startVal: 0,
    endVal: 0,
    duration: 2000,
    autoplay: true,
    decimals: 0,
    useEasing: true,
    decimal: '.',
    color: '#606266',
    fontSize: 22,
    bold: false,
    separator: '' } };exports.default = _default;

/***/ }),
/* 83 */
/*!************************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/datetimePicker.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 16:57:48
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/datetimePicker.js
                                                                                                      */var _default =
{
  // datetimePicker 组件
  datetimePicker: {
    show: false,
    showToolbar: true,
    value: '',
    title: '',
    mode: 'datetime',
    maxDate: new Date(new Date().getFullYear() + 10, 0, 1).getTime(),
    minDate: new Date(new Date().getFullYear() - 10, 0, 1).getTime(),
    minHour: 0,
    maxHour: 23,
    minMinute: 0,
    maxMinute: 59,
    filter: null,
    formatter: null,
    loading: false,
    itemHeight: 44,
    cancelText: '取消',
    confirmText: '确认',
    cancelColor: '#909193',
    confirmColor: '#3c9cff',
    visibleItemCount: 5,
    closeOnClickOverlay: false,
    defaultIndex: function defaultIndex() {return [];} } };exports.default = _default;

/***/ }),
/* 84 */
/*!*****************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/divider.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 16:58:03
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/divider.js
                                                                                                      */var _default =
{
  // divider组件
  divider: {
    dashed: false,
    hairline: true,
    dot: false,
    textPosition: 'center',
    text: '',
    textSize: 14,
    textColor: '#909399',
    lineColor: '#dcdfe6' } };exports.default = _default;

/***/ }),
/* 85 */
/*!***************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/empty.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 17:03:27
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/empty.js
                                                                                                      */var _default =
{
  // empty组件
  empty: {
    icon: '',
    text: '',
    textColor: '#c0c4cc',
    textSize: 14,
    iconColor: '#c0c4cc',
    iconSize: 90,
    mode: 'data',
    width: 160,
    height: 160,
    show: true,
    marginTop: 0 } };exports.default = _default;

/***/ }),
/* 86 */
/*!**************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/form.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 17:03:49
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/form.js
                                                                                                      */var _default =
{
  // form 组件
  form: {
    model: function model() {return {};},
    rules: function rules() {return {};},
    errorType: 'message',
    borderBottom: true,
    labelPosition: 'left',
    labelWidth: 45,
    labelAlign: 'left',
    labelStyle: function labelStyle() {return {};} } };exports.default = _default;

/***/ }),
/* 87 */
/*!******************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/formItem.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 17:04:32
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/formItem.js
                                                                                                      */var _default =
{
  // formItem 组件
  formItem: {
    label: '',
    prop: '',
    borderBottom: '',
    labelWidth: '',
    rightIcon: '',
    leftIcon: '',
    required: false } };exports.default = _default;

/***/ }),
/* 88 */
/*!*************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/gap.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 17:05:25
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/gap.js
                                                                                                      */var _default =
{
  // gap组件
  gap: {
    bgColor: 'transparent',
    height: 20,
    marginTop: 0,
    marginBottom: 0,
    customStyle: {} } };exports.default = _default;

/***/ }),
/* 89 */
/*!**************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/grid.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 17:05:57
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/grid.js
                                                                                                      */var _default =
{
  // grid组件
  grid: {
    col: 3,
    border: false,
    align: 'left' } };exports.default = _default;

/***/ }),
/* 90 */
/*!******************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/gridItem.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 17:06:13
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/gridItem.js
                                                                                                      */var _default =
{
  // grid-item组件
  gridItem: {
    name: null,
    bgColor: 'transparent' } };exports.default = _default;

/***/ }),
/* 91 */
/*!**************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/icon.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;








var _config = _interopRequireDefault(__webpack_require__(/*! ../config */ 58));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /*
                                                                                                                                                          * @Author       : LQ
                                                                                                                                                          * @Description  :
                                                                                                                                                          * @version      : 1.0
                                                                                                                                                          * @Date         : 2021-08-20 16:44:21
                                                                                                                                                          * @LastAuthor   : LQ
                                                                                                                                                          * @lastTime     : 2021-08-20 18:00:14
                                                                                                                                                          * @FilePath     : /u-view2.0/uview-ui/libs/config/props/icon.js
                                                                                                                                                          */var color = _config.default.color;var _default = { // icon组件
  icon: { name: '', color: color['u-content-color'],
    size: '16px',
    bold: false,
    index: '',
    hoverClass: '',
    customPrefix: 'uicon',
    label: '',
    labelPos: 'right',
    labelSize: '15px',
    labelColor: color['u-content-color'],
    space: '3px',
    imgMode: '',
    width: '',
    height: '',
    top: 0,
    stop: false } };exports.default = _default;

/***/ }),
/* 92 */
/*!***************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/image.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 17:01:51
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/image.js
                                                                                                      */var _default =
{
  // image组件
  image: {
    src: '',
    mode: 'aspectFill',
    width: '300',
    height: '225',
    shape: 'square',
    radius: 0,
    lazyLoad: true,
    showMenuByLongpress: true,
    loadingIcon: 'photo',
    errorIcon: 'error-circle',
    showLoading: true,
    showError: true,
    fade: true,
    webp: false,
    duration: 500,
    bgColor: '#f3f4f6' } };exports.default = _default;

/***/ }),
/* 93 */
/*!*********************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/indexAnchor.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 17:13:15
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/indexAnchor.js
                                                                                                      */var _default =
{
  // indexAnchor 组件
  indexAnchor: {
    text: '',
    color: '#606266',
    size: 14,
    bgColor: '#dedede',
    height: 32 } };exports.default = _default;

/***/ }),
/* 94 */
/*!*******************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/indexList.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 17:13:35
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/indexList.js
                                                                                                      */var _default =
{
  // indexList 组件
  indexList: {
    inactiveColor: '#606266',
    activeColor: '#5677fc',
    indexList: function indexList() {return [];},
    sticky: true,
    customNavHeight: 0 } };exports.default = _default;

/***/ }),
/* 95 */
/*!***************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/input.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 17:13:55
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/input.js
                                                                                                      */var _default =
{
  // index 组件
  input: {
    value: '',
    type: 'text',
    fixed: false,
    disabled: false,
    disabledColor: '#f5f7fa',
    clearable: false,
    password: false,
    maxlength: -1,
    placeholder: '',
    placeholderClass: 'input-placeholder',
    placeholderStyle: 'color: #c0c4cc',
    showWordLimit: false,
    confirmType: 'done',
    confirmHold: false,
    holdKeyboard: false,
    focus: false,
    autoBlur: false,
    disableDefaultPadding: false,
    cursor: -1,
    cursorSpacing: 30,
    selectionStart: -1,
    selectionEnd: -1,
    adjustPosition: true,
    inputAlign: 'left',
    fontSize: '15px',
    color: '#303133',
    prefixIcon: '',
    prefixIconStyle: '',
    suffixIcon: '',
    suffixIconStyle: '',
    border: 'surround',
    readonly: false,
    shape: 'square',
    formatter: null } };exports.default = _default;

/***/ }),
/* 96 */
/*!******************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/keyboard.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 17:07:49
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/keyboard.js
                                                                                                      */var _default =
{
  // 键盘组件
  keyboard: {
    mode: 'number',
    dotDisabled: false,
    tooltip: true,
    showTips: true,
    tips: '',
    showCancel: true,
    showConfirm: true,
    random: false,
    safeAreaInsetBottom: true,
    closeOnClickOverlay: true,
    show: false,
    overlay: true,
    zIndex: 10075,
    cancelText: '取消',
    confirmText: '确定',
    autoChange: false } };exports.default = _default;

/***/ }),
/* 97 */
/*!**************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/line.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 17:04:49
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/line.js
                                                                                                      */var _default =
{
  // line组件
  line: {
    color: '#d6d7d9',
    length: '100%',
    direction: 'row',
    hairline: true,
    margin: 0,
    dashed: false } };exports.default = _default;

/***/ }),
/* 98 */
/*!**********************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/lineProgress.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 17:14:11
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/lineProgress.js
                                                                                                      */var _default =
{
  // lineProgress 组件
  lineProgress: {
    activeColor: '#19be6b',
    inactiveColor: '#ececec',
    percentage: 0,
    showText: true,
    height: 12 } };exports.default = _default;

/***/ }),
/* 99 */
/*!**************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/link.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;








var _config = _interopRequireDefault(__webpack_require__(/*! ../config */ 58));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /*
                                                                                                                                                          * @Author       : LQ
                                                                                                                                                          * @Description  :
                                                                                                                                                          * @version      : 1.0
                                                                                                                                                          * @Date         : 2021-08-20 16:44:21
                                                                                                                                                          * @LastAuthor   : LQ
                                                                                                                                                          * @lastTime     : 2021-08-20 17:45:36
                                                                                                                                                          * @FilePath     : /u-view2.0/uview-ui/libs/config/props/link.js
                                                                                                                                                          */var color = _config.default.color;var _default = { // link超链接组件props参数
  link: { color: color['u-primary'], fontSize: 15,
    underLine: false,
    href: '',
    mpTips: '链接已复制，请在浏览器打开',
    lineColor: '',
    text: '' } };exports.default = _default;

/***/ }),
/* 100 */
/*!**************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/list.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 17:14:53
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/list.js
                                                                                                      */var _default =
{
  // list 组件
  list: {
    showScrollbar: false,
    lowerThreshold: 50,
    upperThreshold: 0,
    scrollTop: 0,
    offsetAccuracy: 10,
    enableFlex: false,
    pagingEnabled: false,
    scrollable: true,
    scrollIntoView: '',
    scrollWithAnimation: false,
    enableBackToTop: false,
    height: 0,
    width: 0,
    preLoadScreen: 1 } };exports.default = _default;

/***/ }),
/* 101 */
/*!******************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/listItem.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 17:15:40
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/listItem.js
                                                                                                      */var _default =
{
  // listItem 组件
  listItem: {
    anchor: '' } };exports.default = _default;

/***/ }),
/* 102 */
/*!*********************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/loadingIcon.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;








var _config = _interopRequireDefault(__webpack_require__(/*! ../config */ 58));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /*
                                                                                                                                                          * @Author       : LQ
                                                                                                                                                          * @Description  :
                                                                                                                                                          * @version      : 1.0
                                                                                                                                                          * @Date         : 2021-08-20 16:44:21
                                                                                                                                                          * @LastAuthor   : LQ
                                                                                                                                                          * @lastTime     : 2021-08-20 17:45:47
                                                                                                                                                          * @FilePath     : /u-view2.0/uview-ui/libs/config/props/loadingIcon.js
                                                                                                                                                          */var color = _config.default.color;var _default = { // loading-icon加载中图标组件
  loadingIcon: { show: true, color: color['u-tips-color'],
    textColor: color['u-tips-color'],
    vertical: false,
    mode: 'spinner',
    size: 24,
    textSize: 15,
    text: '',
    timingFunction: 'ease-in-out',
    duration: 1200,
    inactiveColor: '' } };exports.default = _default;

/***/ }),
/* 103 */
/*!*********************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/loadingPage.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 17:00:23
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/loadingPage.js
                                                                                                      */var _default =
{
  // loading-page组件
  loadingPage: {
    loadingText: '正在加载',
    image: '',
    loadingMode: 'circle',
    loading: false,
    bgColor: '#ffffff',
    color: '#C8C8C8',
    fontSize: 19,
    loadingColor: '#C8C8C8' } };exports.default = _default;

/***/ }),
/* 104 */
/*!******************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/loadmore.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 17:15:26
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/loadmore.js
                                                                                                      */var _default =
{
  // loadmore 组件
  loadmore: {
    status: 'loadmore',
    bgColor: 'transparent',
    icon: true,
    fontSize: 14,
    color: '#606266',
    loadingIcon: 'spinner',
    loadmoreText: '加载更多',
    loadingText: '正在加载...',
    nomoreText: '没有更多了',
    isDot: false,
    iconColor: '#b7b7b7',
    marginTop: 10,
    marginBottom: 10,
    height: 'auto',
    line: false } };exports.default = _default;

/***/ }),
/* 105 */
/*!***************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/modal.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 17:15:59
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/modal.js
                                                                                                      */var _default =
{
  // modal 组件
  modal: {
    show: false,
    title: '',
    content: '',
    confirmText: '确认',
    cancelText: '取消',
    showConfirmButton: true,
    showCancelButton: false,
    confirmColor: '#2979ff',
    cancelColor: '#606266',
    buttonReverse: false,
    zoom: true,
    asyncClose: false,
    closeOnClickOverlay: false,
    negativeTop: 0,
    width: '650rpx',
    confirmButtonShape: '' } };exports.default = _default;

/***/ }),
/* 106 */
/*!****************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/navbar.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 17:16:18
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/navbar.js
                                                                                                      */var _default =
{
  // navbar 组件
  navbar: {
    safeAreaInsetTop: false,
    placeholder: false,
    fixed: false,
    border: false,
    leftIcon: 'arrow-left',
    leftText: '',
    rightText: '',
    rightIcon: '',
    title: '',
    bgColor: '#ffffff',
    titleWidth: '400rpx',
    height: '44px' } };exports.default = _default;

/***/ }),
/* 107 */
/*!*******************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/noNetwork.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 17:16:39
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/noNetwork.js
                                                                                                      */var _default =
{
  // noNetwork
  noNetwork: {
    tips: '哎呀，网络信号丢失',
    zIndex: '',
    image: 'data:image/png;base64,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' } };exports.default = _default;

/***/ }),
/* 108 */
/*!*******************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/noticeBar.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 17:17:13
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/noticeBar.js
                                                                                                      */var _default =
{
  // noticeBar
  noticeBar: {
    text: function text() {return [];},
    direction: 'row',
    step: false,
    icon: 'volume',
    mode: '',
    color: '#f9ae3d',
    bgColor: '#fdf6ec',
    speed: 80,
    fontSize: 14,
    duration: 2000,
    disableTouch: true,
    url: '',
    linkType: 'navigateTo' } };exports.default = _default;

/***/ }),
/* 109 */
/*!****************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/notify.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 17:10:21
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/notify.js
                                                                                                      */var _default =
{
  // notify组件
  notify: {
    top: 0,
    type: 'primary',
    color: '#ffffff',
    bgColor: '',
    message: '',
    duration: 3000,
    fontSize: 15,
    safeAreaInsetTop: false } };exports.default = _default;

/***/ }),
/* 110 */
/*!*******************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/numberBox.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 17:11:46
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/numberBox.js
                                                                                                      */var _default =
{
  // 步进器组件
  numberBox: {
    name: '',
    value: 0,
    min: 1,
    max: Number.MAX_SAFE_INTEGER,
    step: 1,
    integer: false,
    disabled: false,
    disabledInput: false,
    asyncChange: false,
    inputWidth: 35,
    showMinus: true,
    showPlus: true,
    decimalLength: null,
    longPress: true,
    color: '#323233',
    buttonSize: 30,
    bgColor: '#EBECEE',
    cursorSpacing: 100,
    disableMinus: false,
    disablePlus: false,
    iconStyle: '' } };exports.default = _default;

/***/ }),
/* 111 */
/*!************************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/numberKeyboard.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 17:08:05
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/numberKeyboard.js
                                                                                                      */var _default =
{
  // 数字键盘
  numberKeyboard: {
    mode: 'number',
    dotDisabled: false,
    random: false } };exports.default = _default;

/***/ }),
/* 112 */
/*!*****************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/overlay.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 17:06:50
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/overlay.js
                                                                                                      */var _default =
{
  // overlay组件
  overlay: {
    show: false,
    zIndex: 10070,
    duration: 300,
    opacity: 0.5 } };exports.default = _default;

/***/ }),
/* 113 */
/*!***************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/parse.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 17:17:33
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/parse.js
                                                                                                      */var _default =
{
  // parse
  parse: {
    copyLink: true,
    errorImg: '',
    lazyLoad: false,
    loadingImg: '',
    pauseVideo: true,
    previewImg: true,
    setTitle: true,
    showImgMenu: true } };exports.default = _default;

/***/ }),
/* 114 */
/*!****************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/picker.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 17:18:20
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/picker.js
                                                                                                      */var _default =
{
  // picker
  picker: {
    show: false,
    showToolbar: true,
    title: '',
    columns: function columns() {return [];},
    loading: false,
    itemHeight: 44,
    cancelText: '取消',
    confirmText: '确定',
    cancelColor: '#909193',
    confirmColor: '#3c9cff',
    singleIndex: 0,
    visibleItemCount: 5,
    keyName: 'text',
    closeOnClickOverlay: false,
    defaultIndex: function defaultIndex() {return [];} } };exports.default = _default;

/***/ }),
/* 115 */
/*!***************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/popup.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 17:06:33
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/popup.js
                                                                                                      */var _default =
{
  // popup组件
  popup: {
    show: false,
    overlay: true,
    mode: 'bottom',
    duration: 300,
    closeable: false,
    overlayStyle: function overlayStyle() {},
    closeOnClickOverlay: true,
    zIndex: 10075,
    safeAreaInsetBottom: true,
    safeAreaInsetTop: false,
    closeIconPos: 'top-right',
    round: 0,
    zoom: true,
    bgColor: '',
    overlayOpacity: 0.5 } };exports.default = _default;

/***/ }),
/* 116 */
/*!***************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/radio.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 17:02:34
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/radio.js
                                                                                                      */var _default =
{
  // radio组件
  radio: {
    name: '',
    shape: '',
    disabled: '',
    labelDisabled: '',
    activeColor: '',
    inactiveColor: '',
    iconSize: '',
    labelSize: '',
    label: '',
    labelColor: '',
    size: '',
    iconColor: '',
    placement: '' } };exports.default = _default;

/***/ }),
/* 117 */
/*!********************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/radioGroup.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 17:03:12
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/radioGroup.js
                                                                                                      */var _default =
{
  // radio-group组件
  radioGroup: {
    value: '',
    disabled: false,
    shape: 'circle',
    activeColor: '#2979ff',
    inactiveColor: '#c8c9cc',
    name: '',
    size: 18,
    placement: 'row',
    label: '',
    labelColor: '#303133',
    labelSize: 14,
    labelDisabled: false,
    iconColor: '#ffffff',
    iconSize: 12,
    borderBottom: false,
    iconPlacement: 'left' } };exports.default = _default;

/***/ }),
/* 118 */
/*!**************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/rate.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 17:05:09
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/rate.js
                                                                                                      */var _default =
{
  // rate组件
  rate: {
    value: 1,
    count: 5,
    disabled: false,
    size: 18,
    inactiveColor: '#b2b2b2',
    activeColor: '#FA3534',
    gutter: 4,
    minCount: 1,
    allowHalf: false,
    activeIcon: 'star-fill',
    inactiveIcon: 'star',
    touchable: true } };exports.default = _default;

/***/ }),
/* 119 */
/*!******************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/readMore.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 17:18:41
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/readMore.js
                                                                                                      */var _default =
{
  // readMore
  readMore: {
    showHeight: 400,
    toggle: false,
    closeText: '展开阅读全文',
    openText: '收起',
    color: '#2979ff',
    fontSize: 14,
    textIndent: '2em',
    name: '' } };exports.default = _default;

/***/ }),
/* 120 */
/*!*************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/row.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 17:18:58
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/row.js
                                                                                                      */var _default =
{
  // row
  row: {
    gutter: 0,
    justify: 'start',
    align: 'center' } };exports.default = _default;

/***/ }),
/* 121 */
/*!*******************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/rowNotice.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 17:19:13
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/rowNotice.js
                                                                                                      */var _default =
{
  // rowNotice
  rowNotice: {
    text: '',
    icon: 'volume',
    mode: '',
    color: '#f9ae3d',
    bgColor: '#fdf6ec',
    fontSize: 14,
    speed: 80 } };exports.default = _default;

/***/ }),
/* 122 */
/*!********************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/scrollList.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 17:19:28
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/scrollList.js
                                                                                                      */var _default =
{
  // scrollList
  scrollList: {
    indicatorWidth: 50,
    indicatorBarWidth: 20,
    indicator: true,
    indicatorColor: '#f2f2f2',
    indicatorActiveColor: '#3c9cff',
    indicatorStyle: '' } };exports.default = _default;

/***/ }),
/* 123 */
/*!****************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/search.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 17:19:45
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/search.js
                                                                                                      */var _default =
{
  // search
  search: {
    shape: 'round',
    bgColor: '#f2f2f2',
    placeholder: '请输入关键字',
    clearabled: true,
    focus: false,
    showAction: true,
    actionStyle: function actionStyle() {return {};},
    actionText: '搜索',
    inputAlign: 'left',
    inputStyle: function inputStyle() {return {};},
    disabled: false,
    borderColor: 'transparent',
    searchIconColor: '#909399',
    color: '#606266',
    placeholderColor: '#909399',
    searchIcon: 'search',
    margin: '0',
    animation: false,
    value: '',
    maxlength: '-1',
    height: 64,
    label: null } };exports.default = _default;

/***/ }),
/* 124 */
/*!*****************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/section.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 17:07:33
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/section.js
                                                                                                      */var _default =
{
  // u-section组件
  section: {
    title: '',
    subTitle: '更多',
    right: true,
    fontSize: 15,
    bold: true,
    color: '#303133',
    subColor: '#909399',
    showLine: true,
    lineColor: '',
    arrow: true } };exports.default = _default;

/***/ }),
/* 125 */
/*!******************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/skeleton.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 17:20:14
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/skeleton.js
                                                                                                      */var _default =
{
  // skeleton
  skeleton: {
    loading: true,
    animate: true,
    rows: 0,
    rowsWidth: '100%',
    rowsHeight: 18,
    title: true,
    titleWidth: '50%',
    titleHeight: 18,
    avatar: false,
    avatarSize: 32,
    avatarShape: 'circle' } };exports.default = _default;

/***/ }),
/* 126 */
/*!****************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/slider.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 17:08:25
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/slider.js
                                                                                                      */var _default =
{
  // slider组件
  slider: {
    value: 0,
    blockSize: 18,
    min: 0,
    max: 100,
    step: 1,
    activeColor: '#2979ff',
    inactiveColor: '#c0c4cc',
    blockColor: '#ffffff',
    showValue: false,
    blockStyle: function blockStyle() {} } };exports.default = _default;

/***/ }),
/* 127 */
/*!*******************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/statusBar.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 17:20:39
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/statusBar.js
                                                                                                      */var _default =
{
  // statusBar
  statusBar: {
    bgColor: 'transparent' } };exports.default = _default;

/***/ }),
/* 128 */
/*!***************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/steps.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 17:12:37
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/steps.js
                                                                                                      */var _default =
{
  // steps组件
  steps: {
    direction: 'row',
    current: 0,
    activeColor: '#3c9cff',
    inactiveColor: '#969799',
    activeIcon: '',
    inactiveIcon: '',
    dot: false } };exports.default = _default;

/***/ }),
/* 129 */
/*!*******************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/stepsItem.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 17:12:55
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/stepsItem.js
                                                                                                      */var _default =
{
  // steps-item组件
  stepsItem: {
    title: '',
    desc: '',
    iconSize: 17,
    error: false } };exports.default = _default;

/***/ }),
/* 130 */
/*!****************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/sticky.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 17:01:30
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/sticky.js
                                                                                                      */var _default =
{
  // sticky组件
  sticky: {
    offsetTop: 0,
    customNavHeight: 0,
    disabled: false,
    bgColor: 'transparent',
    zIndex: '',
    index: '' } };exports.default = _default;

/***/ }),
/* 131 */
/*!********************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/subsection.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 17:12:20
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/subsection.js
                                                                                                      */var _default =
{
  // subsection组件
  subsection: {
    list: [],
    current: 0,
    activeColor: '#3c9cff',
    inactiveColor: '#303133',
    mode: 'button',
    fontSize: 12,
    bold: true,
    bgColor: '#eeeeef' } };exports.default = _default;

/***/ }),
/* 132 */
/*!*********************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/swipeAction.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 17:00:42
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/swipeAction.js
                                                                                                      */var _default =
{
  // swipe-action组件
  swipeAction: {
    autoClose: true } };exports.default = _default;

/***/ }),
/* 133 */
/*!*************************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/swipeActionItem.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 17:01:13
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/swipeActionItem.js
                                                                                                      */var _default =
{
  // swipeActionItem 组件
  swipeActionItem: {
    show: false,
    name: '',
    disabled: false,
    threshold: 20,
    autoClose: true,
    options: [],
    duration: 300 } };exports.default = _default;

/***/ }),
/* 134 */
/*!****************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/swiper.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 17:21:38
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/swiper.js
                                                                                                      */var _default =
{
  // swiper 组件
  swiper: {
    list: function list() {return [];},
    indicator: false,
    indicatorActiveColor: '#FFFFFF',
    indicatorInactiveColor: 'rgba(255, 255, 255, 0.35)',
    indicatorStyle: '',
    indicatorMode: 'line',
    autoplay: true,
    current: 0,
    currentItemId: '',
    interval: 3000,
    duration: 300,
    circular: false,
    previousMargin: 0,
    nextMargin: 0,
    acceleration: false,
    displayMultipleItems: 1,
    easingFunction: 'default',
    keyName: 'url',
    imgMode: 'aspectFill',
    height: 130,
    bgColor: '#f3f4f6',
    radius: 4,
    loading: false,
    showTitle: false } };exports.default = _default;

/***/ }),
/* 135 */
/*!**************************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/swipterIndicator.js ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 17:22:07
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/swiperIndicator.js
                                                                                                      */var _default =
{
  // swiperIndicator 组件
  swiperIndicator: {
    length: 0,
    current: 0,
    indicatorActiveColor: '',
    indicatorInactiveColor: '',
    indicatorMode: 'line' } };exports.default = _default;

/***/ }),
/* 136 */
/*!****************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/switch.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 17:22:24
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/switch.js
                                                                                                      */var _default =
{
  // switch
  switch: {
    loading: false,
    disabled: false,
    size: 25,
    activeColor: '#2979ff',
    inactiveColor: '#ffffff',
    value: false,
    activeValue: true,
    inactiveValue: false,
    asyncChange: false,
    space: 0 } };exports.default = _default;

/***/ }),
/* 137 */
/*!****************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/tabbar.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 17:22:40
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/tabbar.js
                                                                                                      */var _default =
{
  // tabbar
  tabbar: {
    value: null,
    safeAreaInsetBottom: true,
    border: true,
    zIndex: 1,
    activeColor: '#1989fa',
    inactiveColor: '#7d7e80',
    fixed: true,
    placeholder: true } };exports.default = _default;

/***/ }),
/* 138 */
/*!********************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/tabbarItem.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 17:22:55
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/tabbarItem.js
                                                                                                      */var _default =
{
  //
  tabbarItem: {
    name: null,
    icon: '',
    badge: null,
    dot: false,
    text: '',
    badgeStyle: 'top: 6px;right:2px;' } };exports.default = _default;

/***/ }),
/* 139 */
/*!**************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/tabs.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 17:23:14
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/tabs.js
                                                                                                      */var _default =
{
  //
  tabs: {
    duration: 300,
    list: function list() {return [];},
    lineColor: '#3c9cff',
    activeStyle: function activeStyle() {return {
        color: '#303133' };},

    inactiveStyle: function inactiveStyle() {return {
        color: '#606266' };},

    lineWidth: 20,
    lineHeight: 3,
    itemStyle: function itemStyle() {return {
        height: '44px' };},

    scrollable: true,
    current: 0,
    keyName: 'name' } };exports.default = _default;

/***/ }),
/* 140 */
/*!*************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/tag.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 17:23:37
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/tag.js
                                                                                                      */var _default =
{
  // tag 组件
  tag: {
    type: 'primary',
    disabled: false,
    size: 'medium',
    shape: 'square',
    text: '',
    bgColor: '',
    color: '',
    borderColor: '',
    closeColor: '#C6C7CB',
    name: '',
    plainFill: false,
    plain: false,
    closable: false,
    show: true,
    icon: '' } };exports.default = _default;

/***/ }),
/* 141 */
/*!**************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/text.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 17:23:58
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/text.js
                                                                                                      */var _default =
{
  // text 组件
  text: {
    type: '',
    show: true,
    text: '',
    prefixIcon: '',
    suffixIcon: '',
    mode: '',
    href: '',
    format: '',
    call: false,
    encrypt: false,
    openType: '',
    bold: false,
    block: false,
    lines: '',
    color: '#303133',
    size: 15,
    iconStyle: function iconStyle() {return {
        fontSize: '15px' };},

    precision: true,
    decoration: 'none',
    margin: 0,
    lineHeight: '',
    align: 'left',
    wordWrap: 'normal' } };exports.default = _default;

/***/ }),
/* 142 */
/*!******************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/textarea.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 17:24:32
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/textarea.js
                                                                                                      */var _default =
{
  // textarea 组件
  textarea: {
    value: '',
    placeholder: '',
    placeholderClass: 'textarea-placeholder',
    placeholderStyle: 'color: #c0c4cc',
    height: 70,
    confirmType: 'done',
    disabled: false,
    count: false,
    focus: false,
    autoHeight: false,
    fixed: false,
    cursorSpacing: 0,
    cursor: '',
    showConfirmBar: true,
    selectionStart: -1,
    selectionEnd: -1,
    adjustPosition: true,
    disableDefaultPadding: false,
    holdKeyboard: false,
    maxlength: 140,
    border: 'surround',
    formatter: null } };exports.default = _default;

/***/ }),
/* 143 */
/*!***************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/toast.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 17:07:07
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/toast.js
                                                                                                      */var _default =
{
  // toast组件
  toast: {
    zIndex: 10090,
    loading: false,
    text: '',
    icon: '',
    type: '',
    loadingMode: '',
    show: '',
    overlay: false,
    position: 'center',
    params: function params() {},
    duration: 2000,
    isTab: false,
    url: '',
    callback: null,
    back: false } };exports.default = _default;

/***/ }),
/* 144 */
/*!*****************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/toolbar.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 17:24:55
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/toolbar.js
                                                                                                      */var _default =
{
  // toolbar 组件
  toolbar: {
    show: true,
    cancelText: '取消',
    confirmText: '确认',
    cancelColor: '#909193',
    confirmColor: '#3c9cff',
    title: '' } };exports.default = _default;

/***/ }),
/* 145 */
/*!*****************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/tooltip.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 17:25:14
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/tooltip.js
                                                                                                      */var _default =
{
  // tooltip 组件
  tooltip: {
    text: '',
    copyText: '',
    size: 14,
    color: '#606266',
    bgColor: 'transparent',
    direction: 'top',
    zIndex: 10071,
    showCopy: true,
    buttons: function buttons() {return [];},
    overlay: true,
    showToast: true } };exports.default = _default;

/***/ }),
/* 146 */
/*!********************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/transition.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 16:59:00
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/transition.js
                                                                                                      */var _default =
{
  // transition动画组件的props
  transition: {
    show: false,
    mode: 'fade',
    duration: '300',
    timingFunction: 'ease-out' } };exports.default = _default;

/***/ }),
/* 147 */
/*!****************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/props/upload.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
                                                                                                      * @Author       : LQ
                                                                                                      * @Description  :
                                                                                                      * @version      : 1.0
                                                                                                      * @Date         : 2021-08-20 16:44:21
                                                                                                      * @LastAuthor   : LQ
                                                                                                      * @lastTime     : 2021-08-20 17:09:50
                                                                                                      * @FilePath     : /u-view2.0/uview-ui/libs/config/props/upload.js
                                                                                                      */var _default =
{
  // upload组件
  upload: {
    accept: 'image',
    capture: function capture() {return ['album', 'camera'];},
    compressed: true,
    camera: 'back',
    maxDuration: 60,
    uploadIcon: 'camera-fill',
    uploadIconColor: '#D3D4D6',
    useBeforeRead: false,
    previewFullImage: true,
    maxCount: 52,
    disabled: false,
    imageMode: 'aspectFill',
    name: '',
    sizeType: function sizeType() {return ['original', 'compressed'];},
    multiple: false,
    deletable: true,
    maxSize: Number.MAX_VALUE,
    fileList: function fileList() {return [];},
    uploadText: '',
    width: 80,
    height: 80,
    previewImage: true } };exports.default = _default;

/***/ }),
/* 148 */
/*!**********************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/zIndex.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // uniapp在H5中各API的z-index值如下：
/**
 * actionsheet: 999
 * modal: 999
 * navigate: 998
 * tabbar: 998
 * toast: 999
 */var _default =

{
  toast: 10090,
  noNetwork: 10080,
  // popup包含popup，actionsheet，keyboard，picker的值
  popup: 10075,
  mask: 10070,
  navbar: 980,
  topTips: 975,
  sticky: 970,
  indexListSticky: 965 };exports.default = _default;

/***/ }),
/* 149 */
/*!*********************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/config/color.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 为了让用户能够自定义主题，会逐步弃用此文件，各颜色通过css提供
// 为了给某些特殊场景使用和向后兼容，无需删除此文件(2020-06-20)
var color = {
  primary: '#3c9cff',
  info: '#909399',
  default: '#909399',
  warning: '#f9ae3d',
  error: '#f56c6c',
  success: '#5ac725',
  mainColor: '#303133',
  contentColor: '#606266',
  tipsColor: '#909399',
  lightColor: '#c0c4cc',
  borderColor: '#e4e7ed' };var _default =


color;exports.default = _default;

/***/ }),
/* 150 */
/*!**************************************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/node_modules/uview-ui/libs/function/platform.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 注意：
                                                                                                      * 此部分内容，在vue-cli模式下，需要在vue.config.js加入如下内容才有效：
                                                                                                      * module.exports = {
                                                                                                      *     transpileDependencies: ['uview-v2']
                                                                                                      * }
                                                                                                      */

var platform = 'none';






platform = 'vue2';















platform = 'weixin';



























platform = 'mp';var _default =














platform;exports.default = _default;

/***/ }),
/* 151 */
/*!************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/common/ys-validate.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function _createForOfIteratorHelper(o, allowArrayLike) {var it;if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = o[Symbol.iterator]();}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}var numberReg = /^-?[1-9][0-9]?.?[0-9]*$/;
var intReg = /^-?[1-9][0-9]*$/;
var usernameReg = /^[\w-]{6,18}$/;
var phoneReg = /^1[0-9]{10,10}$/;
var emailReg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
var pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z\W]{6,18}$/;
var inviteCodeReg = /^[a-zA-Z0-9]{6,18}$/;var _default =

{
  isUsername: function isUsername(val) {
    return usernameReg.test(val);
  },
  isNumber: function isNumber(val) {
    return numberReg.test(val);
  },
  isInt: function isInt(val) {
    return intReg.test(val);
  },
  isPhone: function isPhone(val) {
    return phoneReg.test(val);
  },
  isEmail: function isEmail(val) {
    return emailReg.test(val);
  },
  isPwd: function isPwd(val) {
    return pwdReg.test(val);
  },
  isInviteCode: function isInviteCode(val) {
    return inviteCodeReg.test(val);
  },
  validate: function validate(data, rules) {
    var res = { isOk: true, errmsg: '' };
    if (!rules || !rules.length) {
      return res;
    }var _iterator = _createForOfIteratorHelper(
    rules),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var rule = _step.value;
        // rule: {name:'', type:'', errmsg:'', min:1, max:2, eq:'', required:Boolean, regex:''}
        if (!rule || !rule.name || !rule.type) {
          continue;
        }

        // 如果值不存在
        if (!data[rule.name]) {
          // 如果是必填项就返回错误提示，required可以作为type是为了不同的type能给用户不同的提示
          if (rule.type === 'required' || rule.required) {
            res = { isOk: false, errmsg: rule.errmsg };
            if (!res.errmsg) {
              res.errmsg = '请正确输入所有数据'; //默认提示
            }
            return res;
          }
          // 如果不是必填项就跳过
          continue;
        }
        switch (rule.type) {
          // required 上面已经判断过了
          case 'equals':
          case 'eq':
            if (data[rule.name] !== data[rule.eqName]) {
              res = { isOk: false, errmsg: rule.errmsg };
            }
            break;
          case 'username':
            if (!usernameReg.test(data[rule.name])) {
              res = { isOk: false, errmsg: rule.errmsg };
            }
          case 'number':
            if (!numberReg.test(data[rule.name])) {
              res = { isOk: false, errmsg: rule.errmsg };
            }
            break;
          case 'int':
            if (!intReg.test(data[rule.name])) {
              res = { isOk: false, errmsg: rule.errmsg };
            }
            break;
          case 'phone':
            if (!phoneReg.test(data[rule.name])) {
              res = { isOk: false, errmsg: rule.errmsg };
            }
            break;
          case 'email':
            if (!emailReg.test(data[rule.name])) {
              res = { isOk: false, errmsg: rule.errmsg };
            }
            break;
          case 'pwd':
            if (!pwdReg.test(data[rule.name])) {
              res = { isOk: false, errmsg: rule.errmsg };
            }
            break;
          case 'inviteCode':
            if (!inviteCodeReg.test(data[rule.name])) {
              res = { isOk: false, errmsg: rule.errmsg };
            }
            break;
          case 'range': // 数字类型的值取值范围
            // {name: 'xxx', type: 'range', min: 6, max: 6, required: true, errmsg: 'xxx'}
            var val = data[rule.name];
            if (val) {
              if (numberReg.test(val)) {
                if (rule.min && val < rule.min) {
                  res = { isOk: false, errmsg: rule.errmsg };
                } else if (rule.max && val > rule.max) {
                  res = { isOk: false, errmsg: rule.errmsg };
                }
              } else {
                res = { isOk: false, errmsg: rule.errmsg };
              }
            }
            break;
          case 'lengthRange': // 字符串长度取值范围
            // {name: 'xxx', type: 'lengthRange', min: 6, max: 6, errmsg: 'xxx'}
            var le = data[rule.name] ? data[rule.name].length : 0;
            if (rule.min && le < rule.min) {
              res = { isOk: false, errmsg: rule.errmsg };
            } else if (rule.max && le > rule.max) {
              res = { isOk: false, errmsg: rule.errmsg };
            }
            break;
          case 'regex': // 自定义正则表达式
            // {name: 'xxx', type: 'regex', regex: /^1[0-9]{10,10}$/, errmsg: 'xxx'}
            if (rule.regex && !rule.regex.test(data[rule.name])) {
              res = { isOk: false, errmsg: rule.errmsg };
            }
            break;}

        // 发现任何一个错误就立即返回，后面的不再判断
        if (!res.isOk) {
          if (!res.errmsg) {
            res.errmsg = '请正确输入所有数据'; //默认提示
          }
          return res;
        }
      }} catch (err) {_iterator.e(err);} finally {_iterator.f();}
    return res;
  } };exports.default = _default;

/***/ }),
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */
/*!****************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/imgs/user.png ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 165 */
/*!*****************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/imgs/order.png ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAE0klEQVR4Xu2bW8hVRRTHf19lPZhhQSlFSKYUSWlpBBWCl+ohETTo4ptaoXhB6eoFytA06UJXyms9BAURlT2IEiYKlV0I0yKpsELBUgM1jbKSf8yJcc7e58ycPftyai/44OOcNWvW+s+ambXWrNNDPLoLmA1cBpwST+xJkv4CdgBPA2tizNETQwgwHPgkkixfMVfHmDMWAPOBJb6aR+J7AFieVVYsAB4H7smqTOB4zXlf4Jgm9rwA+Ba4M6tyzvjVwEDrs0IAOB24HOjTxpjpwK0Wz3ZgaGQAJFO6NOh14MU2cxwGvgB+T+Nr5QG3Ays8jE+SXQQAvvgKhLuB15IGpAHQC9gPnOU7i8NXJQCk2kGgH3DctScNgMHArg6N17CqASCdLga+8wVA+/fz/xgAskkLcxKleUASAFOTEDTSqnYIarVXObZmBiBRgJnEjQPKvgaTFrBQADLsHu+hreKAwgEoIxR+EHgsBa7CAVBiss177eIwjgA+rQoA0kPBxqyc0+E/gZ3Ac8DKFjgW7gFx1jSelBqAhDgm11sg3trFkVR7QO0BzaF8vQWy5gKtQuE4OzeelMqeAaosDQOuMn/9gS/NflX2qf//iIBD5QDoDSwE7gVOa2HgPuA2YHNGECoFwC3AM8D5nkbp8WMRsBjQ/51QZQCYCzzZiQXAeuDmDkGoBADXA+8DpyYAoCrt98AvwABTr0vC6WHjDaEYlg7AheZgO8fR/JjxiKXAr9Z3lwCPAhMdfm2Ba4GPAhEoHYAXAJXJbPoQ0Hmwt4UxC8zet1l+BIYAKm/7UqkAqM6okrq9+geMETrl29GrwCSHSWC2ewSxh5QKgPb+FseAG4GN7Sw33/c1Z4PN/jIw2XO82EoF4ClgjqWs3vPtJy0fOz4DrrQYFSBpG/hSqQAoiBlpaboWmOKrueFTre9+a4wOQwVQf3vKKRUAufpYS9HngZmeijfY9LJsl7xUCtNzXVcAoHrdDMvgdcD4QAAUOaq+2KCu2gIyXiA0SNfXBYHX2FbgOkvGW8CEABBL3QKjgfccZRXk6I73IZ0fm5xGq2nASz6DDU+pAGivymUHOQprX6vLoxVdZBqf7BhCHqS0+WgAAEmv2/rsG1dGyONoSEHkBmCDM5lOcrnxOymGKAzWjeH2JDxh0ugA+/9h3WNloLsBgdtEeQGgid5M2Lc6xRXXvwt8AJwJ6IVHwdOoFAuXAfNCrTc5hLxOidcrZr5CATgDeAMY14Hy7hB1g+kxNDrl6QFSVh2jiuHVRZqVHgEeyiqkqDPAnWeM6em7qY0Bqg8oADo7BbQorXG2Dnl7gGuvcgK58x0mtFVN4Ctzayhd1iH4mxmkDrUkz4kKQtEAhHpwGggKtOxIMVTuv/xVB0CKPpuSS6jCrCsyE3UDAGkgqAP0ikzWA90CQBII6hRXx3gm6iYAZKjeC5Rav23OALuw6gKhiLKRhSr6PJSEVLcBELLaH5soU2PUv3TN/wmAc4GfHIPPA34uKxAKWbkYvKWmwzEMyCqjBqBukalbZJra/eseobpHKMcfTGQ9tWOPz+UHE7GVLFpe0BmgBocfitYw5/n0ONPUm5CWC+hz/ewlsZScs6J5iP8auDQkFxCvXEYpp1pUVL7uRjoC6JlNaXPTL8Zk0Ak/n2xQ/JxEFAAAAABJRU5ErkJggg=="

/***/ }),
/* 166 */
/*!*****************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/imgs/buyer.png ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 167 */
/*!********************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/imgs/treasure.png ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFEAAABRCAYAAACqj0o2AAAAAXNSR0IArs4c6QAABOpJREFUeF7tm0voV0UUxz//VRvbGIHUIlfRwiKoRRShbnpgQu+XRo9FtmhhD3KRoqFIQS9oUdFbkUoXqdDDEBSJxIXSA4pooYQZUYkSlItA+fa/xe9/nfndM/f+vHeu9wz8V78zM+d8/mfO3DlzZgpvjQlMNR7BB8AhTsAJHKJDnACBCQxh8cRzgPXAXcCbwGbguwZzLwFuBeYBjwGfNBgri64WiNuBxSPafgvcBvxYw4KVwNpSvxuBz2qMlU2XKoiXAN8HtD1QgDyUYMkK4NmA/AfAPQnjZCdaBVEKHwTmBjTfVyzLIwartGxfjMg9DLxhGCNbEQvE1cCaiAVfFCB/G2Pho8Arkd8VW+cDv2dLyKCYBaKGWQc8HRlvF3ALcDzw+zLgtUg/xdTbgW8MemYtYoUoI54DnopY83kB8q+R3x8E3o7IK5YK4P6s6RiVS4GoIRXXFN9C7WPgZuAfYCmwMSL3M3AHsNeoY/ZiqRBlkOKb4lyofQRot/0w8vuvwJ3AnuzJJChYB6KGfxV4JGEeiR4tPth3JvbLXrwuRBn2FvCQ0cI/C4CfGuV7JdYEogzdANxXYfEJ4G5gW6/IJChbBXGBYSwta52rQ02bzL3AuO9I9fsKOGaYK0uRGER5jsBot22jabkrPMR2/jZ0qD1HDKJi1w21R63fcSGwu373bnrGIP4AXNyBSlr673cwb6MpYxCXAy81Gjm9s+KiPLF3sTEG8fziVKGThbWVN6GUZalExJaWlvJlwOyAUcqT/mE1dlSuane2jimASkSMNkGUZ+XSXgcWAReOUUhHUWXuX05ReigQT6ZAKeKy4rOpDQHi88ATJhozha4FlC+tbGc7xDnAL5UUwgKbimxUZfcqiJYTy3+ThGLiM5UaTAucqRPLVYGUW2zDK9uqhMl5Fv1jELUrKyb0/cRi3fBCcuJX5WT/Mo4JaYdK+byx/MMsMldOONvdKcTU3cwCyCKj5R+7FLP0L8t0ClGG6Javzaar12uAlLvsKv06hajJ7wceqNJyQr9rY3kv9SPXMHenEA36zRCxKps6blN5q15nZGNJVd6qbOq4TeWtejnEMaQdYlM3BByiQ5xO83edCnNPdE9s7onnAlcUcS3EU56ugijdFMZarzxRRqgOZzRhoXK7rTW9SXfZq4ALKvqrtkcFBLFqtd5B1F21TjmXA+8WpXh1Lp2uA3Ykwn8SeCHQp3cQE+0Oil8KfAnMqjGY/nlfl/oNEqLO6u/UAKguoQzQICGGskex7Hg5yxT6pHKIhUeGPCwE2yEWwGKeWE7UOsQxMc8h1twQRrsNHqJOGCrR0F1vuf0NHAb0cmBcGzRE652Mal30vkWle6E2WIh6m6dioZR2EfBToMMgIepuWnfUqU0Ph25yiNME5IHyxDrt6kCJxyA9UY+9ry8RtNa6PB6oxh0kRBUxlQuBQsXrITnrScQq19sTi0O0Vj2NCXgO0SH+7x6dXt67J7onuieeNUlZX86+nH05+3KO3M75sa9YHH7sS0zH+MbiG4tvLNlvLDpL6q/ttyyJ0aRVcaXklG47LV8ae5amepi23rC0SqLhZKp200XbjBaD2NWztIY2ttL9NGYxiNYr0Fa0zmiS4NvDGMS2n6VlxCmqipayns6ZY2IfjMpGR9Oj6Gy0zVQRhziBf4xDdIgTIDCBIU4BURHTYRb0uxgAAAAASUVORK5CYII="

/***/ }),
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */,
/* 235 */,
/* 236 */,
/* 237 */,
/* 238 */,
/* 239 */,
/* 240 */,
/* 241 */,
/* 242 */,
/* 243 */,
/* 244 */,
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */,
/* 250 */,
/* 251 */,
/* 252 */,
/* 253 */,
/* 254 */,
/* 255 */,
/* 256 */,
/* 257 */,
/* 258 */
/*!**********************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/Json.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /* 用户 */
var userInfo = {
  status: 1,
  data: {
    id: 1,
    mobile: 18888888888,
    nickname: 'Leo yo',
    portrait: 'http://img.61ef.cn/news/201409/28/2014092805595807.jpg' },

  msg: '提示' };

/* 首页轮播图 */
var carouselList = [{
  src: "/static/temp/banner3.jpg",
  background: "rgb(203, 87, 60)" },

{
  src: "/static/temp/banner2.jpg",
  background: "rgb(205, 215, 218)" },

{
  src: "/static/temp/banner4.jpg",
  background: "rgb(183, 73, 69)" }];


/* 商品列表 */
var goodsList = [{
  image: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553187020783&di=bac9dd78b36fd984502d404d231011c0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201609%2F26%2F20160926173213_s5adi.jpeg",
  image2: "http://pic.rmb.bdstatic.com/819a044daa66718c2c40a48c1ba971e6.jpeg",
  image3: "http://img001.hc360.cn/y5/M00/1B/45/wKhQUVYFE0uEZ7zVAAAAAMj3H1w418.jpg",
  title: "古黛妃 短袖t恤女夏装2019新款韩版宽松",
  price: 179,
  sales: 61 },

{
  image: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4031878334,2682695508&fm=11&gp=0.jpg",
  image2: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554013048&di=a3dc9fd1406dd7bad7fbb97b5489ec04&imgtype=jpg&er=1&src=http%3A%2F%2Fimg009.hc360.cn%2Fhb%2FnKo44ac2656F831c684507E3Da0E3a26841.jpg",
  image3: "http://img.zcool.cn/community/017a4e58b4eab6a801219c77084373.jpg",
  title: "潘歌针织连衣裙",
  price: 78,
  sales: 16 },

{
  image: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1620020012,789258862&fm=26&gp=0.jpg",
  image2: "http://m.360buyimg.com/n12/jfs/t247/42/1078640382/162559/3628a0b/53f5ad09N0dd79894.jpg%21q70.jpg",
  image3: "http://ikids.61kids.com.cn/upload/2018-12-29/1546070626796114.jpg",
  title: "巧谷2019春夏季新品新款女装",
  price: 108.8,
  sales: 5 },
{
  image: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=756705744,3505936868&fm=11&gp=0.jpg",
  image2: "http://images.jaadee.com/images/201702/goods_img/30150_d85aed83521.jpg",
  image3: "http://img13.360buyimg.com/popWaterMark/jfs/t865/120/206320620/138889/dcc94caa/550acedcN613e2a9d.jpg",
  title: "私萱连衣裙",
  price: 265,
  sales: 88 },
{
  image: "https://img13.360buyimg.com/n8/jfs/t1/30343/20/1029/481370/5c449438Ecb46a15b/2b2adccb6dc742fd.jpg",
  image2: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553418265666&di=d4a7f7eb0ae3c859edeb921641ee1c3a&imgtype=0&src=http%3A%2F%2Fimg003.hc360.cn%2Fy3%2FM02%2FF8%2F9F%2FwKhQh1TuSkGELIlQAAAAAPuLl4M987.jpg",
  image3: "http://img.ef43.com.cn/product/2016/8/05100204b0c.jpg",
  title: "娇诗茹 ulzzang原宿风学生潮韩版春夏短",
  price: 422,
  sales: 137 },
{
  image: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553187020783&di=bac9dd78b36fd984502d404d231011c0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201609%2F26%2F20160926173213_s5adi.jpeg",
  image2: "http://image5.suning.cn/uimg/b2c/newcatentries/0070158827-000000000622091973_2_800x800.jpg",
  image3: "http://img.61ef.cn/news/201903/20/2019032009251784.jpg",
  title: "古黛妃 短袖t恤女夏装2019新款韩版宽松",
  price: 179,
  sales: 95 }];



/* 购物车 */
var cartList = [{
  id: 1,
  image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553005139&di=3368549edf9eee769a9bcb3fbbed2504&imgtype=jpg&er=1&src=http%3A%2F%2Fimg002.hc360.cn%2Fy3%2FM01%2F5F%2FDB%2FwKhQh1T7iceEGRdWAAAAADQvqk8733.jpg',
  attr_val: '春装款 L',
  stock: 15,
  title: 'OVBE 长袖风衣',
  price: 278.00,
  number: 1 },

{
  id: 3,
  image: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2319343996,1107396922&fm=26&gp=0.jpg',
  attr_val: '激光导航 扫拖一体',
  stock: 3,
  title: '科沃斯 Ecovacs 扫地机器人',
  price: 1348.00,
  number: 5 },

{
  id: 4,
  image: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2668268226,1765897385&fm=26&gp=0.jpg',
  attr_val: 'XL',
  stock: 55,
  title: '朵绒菲小西装',
  price: 175.88,
  number: 1 },

{
  id: 5,
  image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552410549432&di=06dd3758053fb6d6362516f30a42d055&imgtype=0&src=http%3A%2F%2Fimgcache.mysodao.com%2Fimg3%2FM0A%2F67%2F42%2FCgAPD1vNSsHNm-TnAAEy61txQb4543_400x400x2.JPG',
  attr_val: '520 #粉红色',
  stock: 15,
  title: '迪奥（Dior）烈艳唇膏',
  price: 1089.00,
  number: 1 },

{
  id: 6,
  image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1031875829,2994442603&fm=26&gp=0.jpg',
  attr_val: '樱花味润手霜 30ml',
  stock: 15,
  title: "欧舒丹（L'OCCITANE）乳木果",
  price: 128,
  number: 1 },

{
  id: 7,
  image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553007107&di=390915aa8a022cf0b03c03340881b0e7&imgtype=jpg&er=1&src=http%3A%2F%2Fimg13.360buyimg.com%2Fn0%2Fjfs%2Ft646%2F285%2F736444951%2F480473%2Faa701c97%2F548176feN10c9ed7b.jpg',
  attr_val: '特级 12个',
  stock: 7,
  title: '新疆阿克苏苹果 特级',
  price: 58.8,
  number: 10 },

{
  id: 8,
  image: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2319343996,1107396922&fm=26&gp=0.jpg',
  attr_val: '激光导航 扫拖一体',
  stock: 15,
  title: '科沃斯 Ecovacs 扫地机器人',
  price: 1348.00,
  number: 1 },

{
  id: 9,
  image: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2668268226,1765897385&fm=26&gp=0.jpg',
  attr_val: 'XL',
  stock: 55,
  title: '朵绒菲小西装',
  price: 175.88,
  number: 1 },

{
  id: 10,
  image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552410549432&di=06dd3758053fb6d6362516f30a42d055&imgtype=0&src=http%3A%2F%2Fimgcache.mysodao.com%2Fimg3%2FM0A%2F67%2F42%2FCgAPD1vNSsHNm-TnAAEy61txQb4543_400x400x2.JPG',
  attr_val: '520 #粉红色',
  stock: 15,
  title: '迪奥（Dior）烈艳唇膏',
  price: 1089.00,
  number: 1 },

{
  id: 11,
  image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1031875829,2994442603&fm=26&gp=0.jpg',
  attr_val: '樱花味润手霜 30ml',
  stock: 15,
  title: "欧舒丹（L'OCCITANE）乳木果",
  price: 128,
  number: 1 },

{
  id: 12,
  image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553007107&di=390915aa8a022cf0b03c03340881b0e7&imgtype=jpg&er=1&src=http%3A%2F%2Fimg13.360buyimg.com%2Fn0%2Fjfs%2Ft646%2F285%2F736444951%2F480473%2Faa701c97%2F548176feN10c9ed7b.jpg',
  attr_val: '特级 12个',
  stock: 7,
  title: '新疆阿克苏苹果 特级',
  price: 58.8,
  number: 10 },

{
  id: 13,
  image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552405266625&di=a703f2b2cdb0fe7f3f05f62dd91307ab&imgtype=0&src=http%3A%2F%2Fwww.78.cn%2Fzixun%2Fnews%2Fupload%2F20190214%2F1550114706486250.jpg',
  attr_val: '春装款/m',
  stock: 15,
  title: '女装2019春秋新款',
  price: 420.00,
  number: 1 }];


//详情展示页面
var detailData = {
  title: '纯种金毛幼犬活体有血统证书',
  title2: '拆家小能手 你值得拥有',
  favorite: true,
  imgList: [{
    src: 'http://img0.imgtn.bdimg.com/it/u=2396068252,4277062836&fm=26&gp=0.jpg' },

  {
    src: 'http://img.pconline.com.cn/images/upload/upc/tx/itbbs/1309/06/c4/25310541_1378426131583.jpg' },

  {
    src: 'http://img.pconline.com.cn/images/upload/upc/tx/photoblog/1610/26/c4/28926240_1477451226577_mthumb.jpg' },

  {
    src: 'http://picture.ik123.com/uploads/allimg/190219/12-1Z219105139.jpg' }],


  episodeList: [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],

  guessList: [{
    src: 'http://img.52z.com/upload/news/image/20180530/20180530081619_31029.jpg',
    title: '猫眼指甲油',
    title2: '独树一帜的免照灯猫眼指甲' },

  {
    src: 'http://m.china-7.net/uploads/14778449362891.jpg',
    title: '创意屋',
    title2: '创意屋形上下双层高低床' },

  {
    src: 'http://www.k73.com/up/allimg/130415/22-130415093527.jpg',
    title: 'MissCandy 指甲油',
    title2: '十分适合喜欢素净的妹纸，尽显淡雅的气质' },

  {
    src: 'http://img0.imgtn.bdimg.com/it/u=2108933440,2194129200&fm=214&gp=0.jpg	',
    title: 'RMK 2017星空海蓝唇釉',
    title2: '唇釉质地，上唇后很滋润。少女也会心动的蓝色，透明液体形状。' }],


  evaList: [{
    src: 'http://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/77c6a7efce1b9d1663174705fbdeb48f8d546486.jpg',
    nickname: 'Ranth Allngal',
    time: '09-20 12:54',
    zan: '54',
    content: '评论不要太苛刻，不管什么产品都会有瑕疵，客服也说了可以退货并且商家承担运费，我觉得至少态度就可以给五星。' },

  {
    src: 'http://img0.imgtn.bdimg.com/it/u=2396068252,4277062836&fm=26&gp=0.jpg',
    nickname: 'Ranth Allngal',
    time: '09-20 12:54',
    zan: '54',
    content: '楼上说的好有道理。' }] };



var shareList = [{
  type: 1,
  icon: '/static/temp/share_wechat.png',
  text: '微信好友' },

{
  type: 2,
  icon: '/static/temp/share_moment.png',
  text: '朋友圈' },

{
  type: 3,
  icon: '/static/temp/share_qq.png',
  text: 'QQ好友' },

{
  type: 4,
  icon: '/static/temp/share_qqzone.png',
  text: 'QQ空间' }];


var lazyLoadList = [{
  src: 'http://img0.imgtn.bdimg.com/it/u=2396068252,4277062836&fm=26&gp=0.jpg' },

{
  src: 'http://img.pconline.com.cn/images/upload/upc/tx/itbbs/1309/06/c4/25310541_1378426131583.jpg' },

{
  src: 'http://img.pconline.com.cn/images/upload/upc/tx/photoblog/1610/26/c4/28926240_1477451226577_mthumb.jpg' },

{
  src: 'http://picture.ik123.com/uploads/allimg/190219/12-1Z219105139.jpg' },

{
  src: 'http://img5.imgtn.bdimg.com/it/u=2904900134,438461613&fm=26&gp=0.jpg' },

{
  src: 'http://img1.imgtn.bdimg.com/it/u=1690475408,2565370337&fm=26&gp=0.jpg' },

{
  src: 'http://img.99114.com/group1/M00/7F/99/wKgGS1kVrPGAe5LmAAU2KrJmb3Q923_600_600.jpg' },

{
  src: 'http://img4.imgtn.bdimg.com/it/u=261047209,372231813&fm=26&gp=0.jpg' },

{
  src: 'http://i2.17173cdn.com/i7mz64/YWxqaGBf/tu17173com/20150107/eMyVMObjlbcvDEv.jpg' },

{
  src: 'http://img008.hc360.cn/m4/M02/E7/87/wKhQ6FSrfU6EfUoyAAAAAITAfyc280.jpg' },

{
  src: 'http://pic1.win4000.com/wallpaper/d/5991569950166.jpg' },

{
  src: 'http://gss0.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/6f061d950a7b0208f9fe945e60d9f2d3572cc85e.jpg' },

{
  src: 'http://pic41.nipic.com/20140429/18169759_125841756000_2.jpg' },

{
  src: 'http://www.k73.com/up/allimg/130415/22-130415093527.jpg' },

{
  src: 'http://img.52z.com/upload/news/image/20180530/20180530081619_31029.jpg' },

{
  src: 'http://b-ssl.duitang.com/uploads/item/201410/02/20141002111638_tXAzU.jpeg' },

{
  src: 'http://img2.ph.126.net/C4JW6f57QWSB21-8jh2UGQ==/1762596304262286698.jpg' },

{
  src: 'http://att.bbs.duowan.com/forum/201405/17/190257nzcvkkdg6w2e8226.jpg' },

{
  src: 'http://attach.bbs.miui.com/forum/201504/10/223644v3intigyvva0vgym.jpg' },

{
  src: 'http://pic1.win4000.com/mobile/3/57888a298d61d.jpg' }];



var orderList = [{
  time: '2021-11-16 11:37',
  state: 1,
  goodsList: [{
    image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553187020783&di=bac9dd78b36fd984502d404d231011c0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201609%2F26%2F20160926173213_s5adi.jpeg' },

  {
    image: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4031878334,2682695508&fm=11&gp=0.jpg' },

  {
    image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1620020012,789258862&fm=26&gp=0.jpg' },

  {
    image: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4031878334,2682695508&fm=11&gp=0.jpg' },

  {
    image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1620020012,789258862&fm=26&gp=0.jpg' },

  {
    image: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4031878334,2682695508&fm=11&gp=0.jpg' },

  {
    image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1620020012,789258862&fm=26&gp=0.jpg' }] },



{
  time: '2021-11-16 11:37',
  state: 9,
  goodsList: [{
    title: '古黛妃 短袖t恤女 春夏装2019新款韩版宽松',
    price: 179.5,
    image: 'https://img13.360buyimg.com/n8/jfs/t1/30343/20/1029/481370/5c449438Ecb46a15b/2b2adccb6dc742fd.jpg',
    number: 1,
    attr: '珊瑚粉 M' }] },


{
  time: '2021-11-16 11:37',
  state: 2,
  goodsList: [{
    image: 'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i2/2120460599/O1CN01LBPS4C1GINkwsOTXS_!!2120460599.jpg_430x430q90.jpg' },

  {
    image: 'https://img.alicdn.com/imgextra/i2/1069876356/TB2ocTQG4WYBuNjy1zkXXXGGpXa_!!1069876356.jpg_430x430q90.jpg' },

  {
    image: 'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i4/2120460599/O1CN01YsmgwZ1GINkv38rkn_!!2120460599.jpg_430x430q90.jpg' }] },



{
  time: '2021-11-16 11:37',
  state: 1,
  goodsList: [{
    title: '回力女鞋高帮帆布鞋女学生韩版鞋子女2019潮鞋女鞋新款春季板鞋女',
    price: 69,
    image: __webpack_require__(/*! @/imgs/order2.jpg */ 259),
    // image: 'https://img.alicdn.com/imgextra/i3/2128794607/TB2gzzoc41YBuNjy1zcXXbNcXXa_!!2128794607.jpg_430x430q90.jpg',
    number: 1,
    attr: '白色-高帮 39' }] },


{
  time: '2021-11-16 11:37',
  state: 1,
  goodsList: [{
    image: 'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i4/3358098495/O1CN01dhYyid2Ccl5MWLDok_!!3358098495.jpg_430x430q90.jpg' },

  {
    image: 'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i3/3358098495/O1CN01AWsnFA2Ccl5OzvqsL_!!3358098495.jpg_430x430q90.jpg' }] },



{
  time: '2021-11-16 11:37',
  state: 1,
  goodsList: [{
    image: 'https://img.alicdn.com/imgextra/i4/3470687433/O1CN0124mMQOSERr18L1h_!!3470687433.jpg_430x430q90.jpg' },

  {
    image: 'https://img.alicdn.com/imgextra/i3/2888462616/O1CN01ERra5J1VCAbZaKI5n_!!0-item_pic.jpg_430x430q90.jpg' },

  {
    image: 'https://gd3.alicdn.com/imgextra/i3/819381730/O1CN01YV4mXj1OeNhQIhQlh_!!819381730.jpg_400x400.jpg' }] }];





var cateList = [{
  id: 1,
  name: '手机数码' },

{
  id: 2,
  name: '礼品鲜花' },

{
  id: 3,
  name: '男装女装' },

{
  id: 4,
  name: '母婴用品' },

{
  id: 5,
  pid: 1,
  name: '手机通讯' },

{
  id: 6,
  pid: 1,
  name: '运营商' },

{
  id: 8,
  pid: 5,
  name: '全面屏手机',
  picture: '/static/temp/cate2.jpg' },

{
  id: 9,
  pid: 5,
  name: '游戏手机',
  picture: '/static/temp/cate3.jpg' },

{
  id: 10,
  pid: 5,
  name: '老人机',
  picture: '/static/temp/cate1.jpg' },

{
  id: 11,
  pid: 5,
  name: '拍照手机',
  picture: '/static/temp/cate4.jpg' },

{
  id: 12,
  pid: 5,
  name: '女性手机',
  picture: '/static/temp/cate5.jpg' },

{
  id: 14,
  pid: 6,
  name: '合约机',
  picture: '/static/temp/cate1.jpg' },

{
  id: 15,
  pid: 6,
  name: '选好卡',
  picture: '/static/temp/cate4.jpg' },

{
  id: 16,
  pid: 6,
  name: '办套餐',
  picture: '/static/temp/cate5.jpg' },

{
  id: 17,
  pid: 2,
  name: '礼品' },

{
  id: 18,
  pid: 2,
  name: '鲜花' },

{
  id: 19,
  pid: 17,
  name: '公益摆件',
  picture: '/static/temp/cate7.jpg' },

{
  id: 20,
  pid: 17,
  name: '创意礼品',
  picture: '/static/temp/cate8.jpg' },

{
  id: 21,
  pid: 18,
  name: '鲜花',
  picture: '/static/temp/cate9.jpg' },

{
  id: 22,
  pid: 18,
  name: '每周一花',
  picture: '/static/temp/cate10.jpg' },

{
  id: 23,
  pid: 18,
  name: '卡通花束',
  picture: '/static/temp/cate11.jpg' },

{
  id: 24,
  pid: 18,
  name: '永生花',
  picture: '/static/temp/cate12.jpg' },

{
  id: 25,
  pid: 3,
  name: '男装' },

{
  id: 26,
  pid: 3,
  name: '女装' },

{
  id: 27,
  pid: 25,
  name: '男士T恤',
  picture: '/static/temp/cate13.jpg' },

{
  id: 28,
  pid: 25,
  name: '男士外套',
  picture: '/static/temp/cate14.jpg' },

{
  id: 29,
  pid: 26,
  name: '裙装',
  picture: '/static/temp/cate15.jpg' },

{
  id: 30,
  pid: 26,
  name: 'T恤',
  picture: '/static/temp/cate16.jpg' },

{
  id: 31,
  pid: 26,
  name: '上装',
  picture: '/static/temp/cate15.jpg' },

{
  id: 32,
  pid: 26,
  name: '下装',
  picture: '/static/temp/cate16.jpg' },

{
  id: 33,
  pid: 4,
  name: '奶粉' },

{
  id: 34,
  pid: 4,
  name: '营养辅食' },

{
  id: 35,
  pid: 4,
  name: '童装' },

{
  id: 39,
  pid: 4,
  name: '喂养用品' },

{
  id: 36,
  pid: 33,
  name: '有机奶粉',
  picture: '/static/temp/cate17.jpg' },

{
  id: 37,
  pid: 34,
  name: '果泥/果汁',
  picture: '/static/temp/cate18.jpg' },

{
  id: 39,
  pid: 34,
  name: '面条/粥',
  picture: '/static/temp/cate20.jpg' },

{
  id: 42,
  pid: 35,
  name: '婴童衣橱',
  picture: '/static/temp/cate19.jpg' },

{
  id: 43,
  pid: 39,
  name: '吸奶器',
  picture: '/static/temp/cate21.jpg' },

{
  id: 44,
  pid: 39,
  name: '儿童餐具',
  picture: '/static/temp/cate22.jpg' },

{
  id: 45,
  pid: 39,
  name: '牙胶安抚',
  picture: '/static/temp/cate23.jpg' },

{
  id: 46,
  pid: 39,
  name: '围兜',
  picture: '/static/temp/cate24.jpg' }];var _default =



{
  carouselList: carouselList,
  cartList: cartList,
  detailData: detailData,
  lazyLoadList: lazyLoadList,
  userInfo: userInfo,
  shareList: shareList,
  goodsList: goodsList,
  orderList: orderList,
  cateList: cateList };exports.default = _default;

/***/ }),
/* 259 */
/*!******************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/imgs/order2.jpg ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/imgs/order2.jpg";

/***/ }),
/* 260 */,
/* 261 */,
/* 262 */,
/* 263 */,
/* 264 */,
/* 265 */,
/* 266 */,
/* 267 */,
/* 268 */,
/* 269 */,
/* 270 */,
/* 271 */,
/* 272 */,
/* 273 */,
/* 274 */,
/* 275 */,
/* 276 */,
/* 277 */,
/* 278 */,
/* 279 */,
/* 280 */,
/* 281 */,
/* 282 */,
/* 283 */,
/* 284 */,
/* 285 */,
/* 286 */,
/* 287 */,
/* 288 */,
/* 289 */,
/* 290 */,
/* 291 */,
/* 292 */,
/* 293 */,
/* 294 */,
/* 295 */,
/* 296 */,
/* 297 */,
/* 298 */,
/* 299 */,
/* 300 */,
/* 301 */,
/* 302 */,
/* 303 */,
/* 304 */,
/* 305 */,
/* 306 */,
/* 307 */,
/* 308 */,
/* 309 */,
/* 310 */,
/* 311 */
/*!**********************************************************************************!*\
  !*** /Users/yinxin/Desktop/环球采购/global-sourcing/components/sunui-upimg/index.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.pathToBase64 = pathToBase64;exports.base64ToPath = base64ToPath;function getLocalFilePath(path) {
  if (path.indexOf('_www') === 0 || path.indexOf('_doc') === 0 || path.indexOf('_documents') === 0 || path.indexOf('_downloads') === 0) {
    return path;
  }
  if (path.indexOf('file://') === 0) {
    return path;
  }
  if (path.indexOf('/storage/emulated/0/') === 0) {
    return path;
  }
  if (path.indexOf('/') === 0) {
    var localFilePath = plus.io.convertAbsoluteFileSystem(path);
    if (localFilePath !== path) {
      return localFilePath;
    } else {
      path = path.substr(1);
    }
  }
  return '_www/' + path;
}

function pathToBase64(path) {
  return new Promise(function (resolve, reject) {
    if (typeof window === 'object' && 'document' in window) {
      if (typeof FileReader === 'function') {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', path, true);
        xhr.responseType = 'blob';
        xhr.onload = function () {
          if (this.status === 200) {
            var fileReader = new FileReader();
            fileReader.onload = function (e) {
              resolve(e.target.result);
            };
            fileReader.onerror = reject;
            fileReader.readAsDataURL(this.response);
          }
        };
        xhr.onerror = reject;
        xhr.send();
        return;
      }
      var canvas = document.createElement('canvas');
      var c2x = canvas.getContext('2d');
      var img = new Image();
      img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        c2x.drawImage(img, 0, 0);
        resolve(canvas.toDataURL());
        canvas.height = canvas.width = 0;
      };
      img.onerror = reject;
      img.src = path;
      return;
    }
    if (typeof plus === 'object') {
      plus.io.resolveLocalFileSystemURL(getLocalFilePath(path), function (entry) {
        entry.file(function (file) {
          var fileReader = new plus.io.FileReader();
          fileReader.onload = function (data) {
            resolve(data.target.result);
          };
          fileReader.onerror = function (error) {
            reject(error);
          };
          fileReader.readAsDataURL(file);
        }, function (error) {
          reject(error);
        });
      }, function (error) {
        reject(error);
      });
      return;
    }
    if (typeof wx === 'object' && wx.canIUse('getFileSystemManager')) {
      wx.getFileSystemManager().readFile({
        filePath: path,
        encoding: 'base64',
        success: function success(res) {
          resolve('data:image/png;base64,' + res.data);
        },
        fail: function fail(error) {
          reject(error);
        } });

      return;
    }
    reject(new Error('not support'));
  });
}

function base64ToPath(base64) {
  return new Promise(function (resolve, reject) {
    if (typeof window === 'object' && 'document' in window) {
      base64 = base64.split(',');
      var type = base64[0].match(/:(.*?);/)[1];
      var str = atob(base64[1]);
      var n = str.length;
      var array = new Uint8Array(n);
      while (n--) {
        array[n] = str.charCodeAt(n);
      }
      return resolve((window.URL || window.webkitURL).createObjectURL(new Blob([array], { type: type })));
    }
    var extName = base64.match(/data\:\S+\/(\S+);/);
    if (extName) {
      extName = extName[1];
    } else {
      reject(new Error('base64 error'));
    }
    var fileName = Date.now() + '.' + extName;
    if (typeof plus === 'object') {
      var bitmap = new plus.nativeObj.Bitmap('bitmap' + Date.now());
      bitmap.loadBase64Data(base64, function () {
        var filePath = '_doc/uniapp_temp/' + fileName;
        bitmap.save(filePath, {}, function () {
          bitmap.clear();
          resolve(filePath);
        }, function (error) {
          bitmap.clear();
          reject(error);
        });
      }, function (error) {
        bitmap.clear();
        reject(error);
      });
      return;
    }
    if (typeof wx === 'object' && wx.canIUse('getFileSystemManager')) {
      var filePath = wx.env.USER_DATA_PATH + '/' + fileName;
      wx.getFileSystemManager().writeFile({
        filePath: filePath,
        data: base64.replace(/^data:\S+\/\S+;base64,/, ''),
        encoding: 'base64',
        success: function success() {
          resolve(filePath);
        },
        fail: function fail(error) {
          reject(error);
        } });

      return;
    }
    reject(new Error('not support'));
  });
}

/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map