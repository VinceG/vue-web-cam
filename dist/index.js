(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vue-web-cam"] = factory();
	else
		root["vue-web-cam"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: 'vue-web-cam',
  data: function data() {
    return {
      source: null,
      canvas: null,
      camerasListEmitted: false,
      cameras: []
    };
  },

  props: {
    width: {
      type: [Number, String],
      default: "100%"
    },
    height: {
      type: [Number, String],
      default: 500
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    screenshotFormat: {
      type: String,
      default: 'image/jpeg'
    },
    deviceId: {
      type: String,
      default: null
    },
    playsinline: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    deviceId: function deviceId(id) {
      this.changeCamera(id);
    }
  },
  mounted: function mounted() {
    this.setupMedia();
  },

  methods: {
    legacyGetUserMediaSupport: function legacyGetUserMediaSupport() {
      return function (constraints) {
        var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

        if (!getUserMedia) {
          return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
        }

        return new Promise(function (resolve, reject) {
          getUserMedia.call(navigator, constraints, resolve, reject);
        });
      };
    },
    setupMedia: function setupMedia() {
      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
      }

      if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = this.legacyGetUserMediaSupport();
      }

      this.testMediaAccess();
    },
    loadCameras: function loadCameras() {
      var _this = this;

      navigator.mediaDevices.enumerateDevices().then(function (deviceInfos) {
        for (var i = 0; i !== deviceInfos.length; ++i) {
          var deviceInfo = deviceInfos[i];
          if (deviceInfo.kind === 'videoinput') {
            _this.cameras.push(deviceInfo);
          }
        }
      }).then(function () {
        if (!_this.camerasListEmitted) {
          _this.$emit('cameras', _this.cameras);
          _this.camerasListEmitted = true;
        }
      }).catch(function (error) {
        return _this.$emit('notsupported', error);
      });
    },
    changeCamera: function changeCamera(deviceId) {
      this.stop();
      this.$emit('camera-change', deviceId);
      this.loadCamera(deviceId);
    },
    loadSrcStream: function loadSrcStream(stream) {
      if ('srcObject' in this.$refs.video) {
        this.$refs.video.srcObject = stream;
      } else {
        this.source = window.HTMLMediaElement.srcObject(stream);
      }

      this.$emit('started', stream);
    },
    stopStreamedVideo: function stopStreamedVideo(videoElem) {
      var _this2 = this;

      var stream = videoElem.srcObject;
      var tracks = stream.getTracks();

      tracks.forEach(function (track) {
        track.stop();
        _this2.$emit('stopped', stream);

        _this2.$refs.video.srcObject = null;
        _this2.source = null;
      });
    },
    stop: function stop() {
      if (this.$refs.video !== null && this.$refs.video.srcObject) {
        this.stopStreamedVideo(this.$refs.video);
      }
    },
    start: function start() {
      if (this.deviceId) {
        this.loadCamera(this.deviceId);
      }
    },
    testMediaAccess: function testMediaAccess() {
      var _this3 = this;

      navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
        return _this3.loadCameras();
      }).catch(function (error) {
        return _this3.$emit('error', error);
      });
    },
    loadCamera: function loadCamera(device) {
      var _this4 = this;

      navigator.mediaDevices.getUserMedia({
        video: { deviceId: { exact: device } }
      }).then(function (stream) {
        return _this4.loadSrcStream(stream);
      }).catch(function (error) {
        return _this4.$emit('error', error);
      });
    },
    capture: function capture() {
      return this.getCanvas().toDataURL(this.screenshotFormat);
    },
    getCanvas: function getCanvas() {
      var video = this.$refs.video;
      if (!this.ctx) {
        var _canvas = document.createElement('canvas');
        _canvas.height = video.videoHeight;
        _canvas.width = video.videoWidth;
        this.canvas = _canvas;

        this.ctx = _canvas.getContext('2d');
      }

      var ctx = this.ctx,
          canvas = this.canvas;

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      return canvas;
    }
  }
};

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_webcam_vue_vue_type_script_lang_js___ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_webcam_vue_vue_type_script_lang_js____default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_webcam_vue_vue_type_script_lang_js___);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_webcam_vue_vue_type_script_lang_js___) if(["default","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_webcam_vue_vue_type_script_lang_js___[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_webcam_vue_vue_type_script_lang_js____default.a); 

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__webcam_vue_vue_type_template_id_7d594b22___ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__webcam_vue_vue_type_script_lang_js___ = __webpack_require__(1);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_1__webcam_vue_vue_type_script_lang_js___) if(["default","default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_1__webcam_vue_vue_type_script_lang_js___[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_componentNormalizer_js__ = __webpack_require__(6);





/* normalize component */

var component = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_componentNormalizer_js__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_1__webcam_vue_vue_type_script_lang_js___["default"],
  __WEBPACK_IMPORTED_MODULE_0__webcam_vue_vue_type_template_id_7d594b22___["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_0__webcam_vue_vue_type_template_id_7d594b22___["b" /* staticRenderFns */],
  false,
  null,
  null,
  null
  
)

component.options.__file = "webcam.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _webcam = __webpack_require__(2);

var _webcam2 = _interopRequireDefault(_webcam);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var install = function install(Vue) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (install.installed) return;
  Vue.component(_webcam2.default.name, _webcam2.default);
};
module.exports = {
  WebCam: _webcam2.default,
  install: install
};
module.exports.default = module.exports;

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_webcam_vue_vue_type_template_id_7d594b22___ = __webpack_require__(5);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_webcam_vue_vue_type_template_id_7d594b22___["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_webcam_vue_vue_type_template_id_7d594b22___["b"]; });


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('video',{ref:"video",attrs:{"width":_vm.width,"height":_vm.height,"src":_vm.source,"autoplay":_vm.autoplay,"playsinline":_vm.playsinline}})}
var staticRenderFns = []



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = normalizeComponent;
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
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

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


/***/ })
/******/ ]);
});