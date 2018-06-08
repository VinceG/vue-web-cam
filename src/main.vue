<template>
  <div id="app" class="component">
    <webcam ref="webcam"></webcam>
    <button type="button" @click="changeCamera">Change Camera</button>
    <button type="button" @click="photo">Capture Photo</button>
    <img :src="this.img" style="width:500px;height:500px;" />
  </div>
</template>

<script>
import Webcam from './Webcam';

export default {
  name: 'app',
  data() {
    return {
      img: null
    };
  },
  methods: {
    changeCamera() {
      this.$refs.webcam.changeCamera();
    },
    photo() {
      this.img = this.$refs.webcam.capture();
    }
  },
  components: {
    Webcam
  }
};
</script>
