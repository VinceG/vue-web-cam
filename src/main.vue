<template>
  <div id="app" class="component">
    <webcam ref="webcam"></webcam>
    <img :src="this.img" style="width:500px;height:500px;" />
    <button type="button" @click="photo">Capture Photo</button>
  </div>
</template>

<script>
import Webcam from './Webcam'

export default {
  name: 'app',
  data() {
      return {
          img: null
      };
  },
  methods: {
      photo() {
          this.img = this.$refs.webcam.capture();
      }
  },
  components: {
    Webcam
  }
}
</script>
