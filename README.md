# vue-web-cam

Webcam component for VueJs. See [this](http://caniuse.com/#feat=stream)
for browser compatibility.


## Installation

```
npm install vue-web-cam --save
```

## Usage

```html
<template>
  <div id="app" class="component">
    <webcam ref="webcam"></webcam>
  </div>
</template>
```

```javascript
import Webcam from './Webcam'

export default {
  components: {
    Webcam
  }
}
```

### Props

prop             | type     | default      | notes
-----------------|----------|--------------|----------
height           | number   | 500          | height of video element
width            | number   | 500          | width of video element
autoplay         | boolean  | true         | autoplay attribute
screenshotFormat | string   | 'image/jpeg' | format of screenshot

### Events

name             | param    | notes
-----------------|----------|----------
started          | stream   | emitted once the stream has started
error            | error    | emitted if the stream failed to start with the error returned
notsupported     | void     | emitted when the browser does not support this feature

### Methods

`capture` - Returns a base64 encoded string of the current webcam image. Example:

```html
<div id="app" class="component">
  <webcam ref="webcam"></webcam>
  <img :src="this.img" style="width:500px;height:500px;" />
  <button type="button" @click="photo">Capture Photo</button>
</div>
```

```javascript
import Webcam from './Webcam'

export default {
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
```

## License

MIT

## Credits

This is based off [@smronju vue-webcam](https://github.com/smronju/vue-webcam) and [react-webcam](https://github.com/mozmorris/react-webcam)
