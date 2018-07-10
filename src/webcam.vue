<template>
  <video ref="video" 
        :width="width" 
        :height="height" 
        :src="source" 
        :autoplay="autoplay"/>
</template>

<script>
export default {
  name: 'vue-web-cam',
  data() {
    return {
      stream: '',
      source: '',
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
    }
  },
  watch: {
    deviceId: function(id) {
      this.changeCamera(id);
    }
  },
  mounted() {
    this.setupMedia();
  },
  methods: {
    legacyGetUserMediaSupport() {
      return constraints => {
        // First get ahold of the legacy getUserMedia, if present
        let getUserMedia =
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
    setupMedia() {
      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
      }

      if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = this.legacyGetUserMediaSupport();
      }

      this.testMediaAccess();
    },
    loadCameras() {
      navigator.mediaDevices
      .enumerateDevices()
      .then(
        deviceInfos => {
          for (var i = 0; i !== deviceInfos.length; ++i) {
            var deviceInfo = deviceInfos[i];
            if (deviceInfo.kind === 'videoinput') {
              this.cameras.push(deviceInfo);
            }
          }
        }
      )
      .then(() => {
        if(!this.camerasListEmitted) {
          this.$emit('cameras', this.cameras);
          this.camerasListEmitted = true;
        }
      })
      .catch(error => this.$emit('notsupported', error));
    },
    /**
     * change to a different camera stream, like front and back camera on phones
     */
    changeCamera(deviceId) {
      this.stop();
      this.$emit('camera-change', deviceId);
      this.loadCamera(deviceId);
    },
    /**
     * load the stream to the
     */
    loadSrcStream(stream) {
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
    stopStreamedVideo(videoElem) {
      let stream = videoElem.srcObject;
      let tracks = stream.getTracks();

      tracks.forEach(track => {
        // stops the video track
        track.stop();
        this.$emit('stopped', stream);
      });
      videoElem.srcObject = null;
    },
    // Stop the video
    stop() {
      if(this.$refs.video !== null && this.$refs.video.srcObject) {
        this.stopStreamedVideo(this.$refs.video); 
      }
    },
    // Start the video
    start() {
      if(this.deviceId) {
        this.loadCamera(this.deviceId);
      }
    },
    /**
     * test access
     */
    testMediaAccess() {
      navigator.mediaDevices
        .getUserMedia({video: true})
        .then(stream => this.loadCameras())
        .catch(error => this.$emit('error', error));
    },
    /**
     * load the Camera passed as index!
     */
    loadCamera(device) {
      navigator.mediaDevices
        .getUserMedia({
          video: { deviceId: { exact: device } }
        })
        .then(stream => this.loadSrcStream(stream))
        .catch(error => this.$emit('error', error));
    },
    capture() {
      return this.getCanvas().toDataURL(this.screenshotFormat);
    },
    getCanvas() {
      let video = this.$refs.video;
      if (!this.ctx) {
        let canvas = document.createElement('canvas');
        canvas.height = video.clientHeight;
        canvas.width = video.clientWidth;
        this.canvas = canvas;

        this.ctx = canvas.getContext('2d');
      }

      const { ctx, canvas } = this;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      return canvas;
    }
  }
};
</script>
