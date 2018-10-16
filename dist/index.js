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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(1),
  /* template */
  __webpack_require__(4),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
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
    deviceId: function(id) {
      this.changeCamera(id);
    }
  },
  mounted: function mounted() {
    this.setupMedia();
  },
  methods: {
    legacyGetUserMediaSupport: function legacyGetUserMediaSupport() {
      return function (constraints) {
        // First get ahold of the legacy getUserMedia, if present
        var getUserMedia =
          navigator.getUserMedia ||
          navigator.webkitGetUserMedia ||
          navigator.mozGetUserMedia ||
          navigator.msGetUserMedia ||
          navigator.oGetUserMedia;

        // Some browsers just don't implement it - return a rejected promise with an error
        // to keep a consistent interface
        if (!getUserMedia) {
          return Promise.reject(
            new Error('getUserMedia is not implemented in this browser')
          );
        }

        // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
        return new Promise(function(resolve, reject) {
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
      var this$1 = this;

      navigator.mediaDevices
      .enumerateDevices()
      .then(
        function (deviceInfos) {
          for (var i = 0; i !== deviceInfos.length; ++i) {
            var deviceInfo = deviceInfos[i];
            if (deviceInfo.kind === 'videoinput') {
              this$1.cameras.push(deviceInfo);
            }
          }
        }
      )
      .then(function () {
        if(!this$1.camerasListEmitted) {
          this$1.$emit('cameras', this$1.cameras);
          this$1.camerasListEmitted = true;
        }
      })
      .catch(function (error) { return this$1.$emit('notsupported', error); });
    },
    /**
     * change to a different camera stream, like front and back camera on phones
     */
    changeCamera: function changeCamera(deviceId) {
      this.stop();
      this.$emit('camera-change', deviceId);
      this.loadCamera(deviceId);
    },
    /**
     * load the stream to the
     */
    loadSrcStream: function loadSrcStream(stream) {
      if ('srcObject' in this.$refs.video) {
        // new browsers api
        this.$refs.video.srcObject = stream;
      } else {
        // old broswers
        this.source = window.HTMLMediaElement.srcObject(stream);
      }

      this.$emit('started', stream);
    },
    /**
     * stop the selected streamed video to change camera
     */
    stopStreamedVideo: function stopStreamedVideo(videoElem) {
      var this$1 = this;

      var stream = videoElem.srcObject;
      var tracks = stream.getTracks();
      
      tracks.forEach(function (track) {
        // stops the video track
        track.stop();
        this$1.$emit('stopped', stream);

        this$1.$refs.video.srcObject = null;
        this$1.source = null;
      });
    },
    // Stop the video
    stop: function stop() {
      if(this.$refs.video !== null && this.$refs.video.srcObject) {
        this.stopStreamedVideo(this.$refs.video);
      }
    },
    // Start the video
    start: function start() {
      if(this.deviceId) {
        this.loadCamera(this.deviceId);
      }
    },
    /**
     * test access
     */
    testMediaAccess: function testMediaAccess() {
      var this$1 = this;

      navigator.mediaDevices
        .getUserMedia({video: true})
        .then(function (stream) { return this$1.loadCameras(); })
        .catch(function (error) { return this$1.$emit('error', error); });
    },
    /**
     * load the Camera passed as index!
     */
    loadCamera: function loadCamera(device) {
      var this$1 = this;

      navigator.mediaDevices
        .getUserMedia({
          video: { deviceId: { exact: device } }
        })
        .then(function (stream) { return this$1.loadSrcStream(stream); })
        .catch(function (error) { return this$1.$emit('error', error); });
    },
    capture: function capture() {
      return this.getCanvas().toDataURL(this.screenshotFormat);
    },
    getCanvas: function getCanvas() {
      var video = this.$refs.video;
      if (!this.ctx) {
        var canvas$1 = document.createElement('canvas');
        canvas$1.height = video.videoHeight;
        canvas$1.width = video.videoWidth;
        this.canvas = canvas$1;

        this.ctx = canvas$1.getContext('2d');
      }

      var ref = this;
      var ctx = ref.ctx;
      var canvas = ref.canvas;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      return canvas;
    }
  }
});


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _webcam = __webpack_require__(0);

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
/* 3 */
/***/ (function(module, exports) {

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  // inject cssModules
  if (cssModules) {
    var computed = Object.create(options.computed || null)
    Object.keys(cssModules).forEach(function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    })
    options.computed = computed
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('video', {
    ref: "video",
    attrs: {
      "width": _vm.width,
      "height": _vm.height,
      "src": _vm.source,
      "autoplay": _vm.autoplay,
      "playsinline": _vm.playsinline
    }
  })
},staticRenderFns: []}

/***/ })
/******/ ]);
});