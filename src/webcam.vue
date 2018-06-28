<template>
  <video ref="video" :width="this.width" :height="this.height" :src="this.source" :autoplay="this.autoplay"></video>
</template>

<script>
let legacyGetUserMediaSupport = (constraints) => {

    // First get ahold of the legacy getUserMedia, if present
    let getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia);

    // Some browsers just don't implement it - return a rejected promise with an error
    // to keep a consistent interface
    if (!getUserMedia) {
      return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
    }

    // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
    return new Promise(function(resolve, reject) {
      getUserMedia.call(navigator, constraints, resolve, reject);
    });
};

export default {
    data () {
        return {
            stream: '',
            source: '',
            canvas: null
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

        navigator.mediaDevices.getUserMedia({ video: true}).then( (stream) => {
            try {
                this.source = window.HTMLMediaElement.srcObject(stream);
                this.stream = stream;
                this.$emit('started', stream);
            } catch (err) {
                this.$refs.video.srcObject = stream;
                this.stream = stream;
                this.$emit('started', stream);
            }
        }).catch((error) => {
            this.$emit('error', error);
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
}
</script>
