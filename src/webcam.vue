<template>
  <video ref="video" :width="this.width" :height="this.height" :src="this.source" :autoplay="this.autoplay"></video>
</template>

<script>
let legacyGetUserMediaSupport = constraints => {
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

export default {
  data() {
    return {
      selectedCamera: 0,
      stream: '',
      source: '',
      canvas: null,
      cameras: []
    };
  },
  props: {
    width: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 500
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    screenshotFormat: {
      type: String,
      default: 'image/jpeg'
    }
  },
  mounted() {
    this.setupMedia();

    navigator.mediaDevices
      .enumerateDevices()
      .then(
        deviceInfos => {
          for (var i = 0; i !== deviceInfos.length; ++i) {
            var deviceInfo = deviceInfos[i];
            if (deviceInfo.kind === 'videoinput') {
              this.cameras.push({
                name: deviceInfo.label || 'camera ' + (this.cameras.length + 1),
                code: deviceInfo.deviceId
              });
            } //videoinput
          } //for videoinputs
        } //lambda function
      )
      .then(() => {
        // after loading all the cameras, loads the first one
        if (this.cameras.length != 0) {
          this.loadCamera(0);
        } else {
          // no cameras == no support
          alert('No webcam found!');
        }
      });
  },
  methods: {
    setupMedia() {
      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
      }
      if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = legacyGetUserMediaSupport;
      }
    },
    /**
     * get the number of cameras
     */
    numberOfCameras() {
      return this.cameras.length;
    },
    /**
     * change to a different camera stream, like front and back camera on phones
     */
    changeCamera() {
      // let's go to the next camera!
      this.selectedCamera += 1;
      if (this.selectedCamera >= this.cameras.length) {
        this.selectedCamera = 0; // if over the length go back to the first one
      }
      this.stopStreamedVideo(this.$refs.video);
      this.loadCamera(this.selectedCamera); // load a different stream
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
        this.source = window.URL.createObjectURL(stream);
      }
    },
    /**
     * stop the selected streamed video to change camera
     */
    stopStreamedVideo(videoElem) {
      let stream = videoElem.srcObject;
      let tracks = stream.getTracks();

      tracks.forEach(function(track) {
        // stops the video track
        track.stop();
      });
      videoElem.srcObject = null;
    },
    /**
     * load the Camera passed as index!
     */
    loadCamera(cameraIndex) {
      navigator.mediaDevices
        .getUserMedia({
          video: { deviceId: { exact: this.cameras[cameraIndex].code } }
        })
        .then(stream => this.loadSrcStream(stream))
        .catch(function(err) {
          console.log(err.name + ': ' + err.message);
        });
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
