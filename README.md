<p align="center">
    <img width="150" src="src/logo.png">
</p>

# vue-web-cam

[![npm](https://img.shields.io/npm/v/npm.svg)](https://www.npmjs.com/package/vue-web-cam)
[![npm](https://img.shields.io/npm/dm/localeval.svg)](https://www.npmjs.com/package/vue-web-cam)
![Contributions welcome](https://img.shields.io/badge/contributions-welcome-orange.svg)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

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
import Webcam from 'vue-web-cam/src/webcam'

export default {
  components: {
    Webcam
  }
}
```

### Props

| prop             | type    | default      | notes                   |
| ---------------- | ------- | ------------ | ----------------------- |
| height           | number  | 500          | height of video element |
| width            | number  | 500          | width of video element  |
| autoplay         | boolean | true         | autoplay attribute      |
| screenshotFormat | string  | 'image/jpeg' | format of screenshot    |

### Events

| name         | param  | notes                                                         |
| ------------ | ------ | ------------------------------------------------------------- |
| started      | stream | emitted once the stream has started                           |
| error        | error  | emitted if the stream failed to start with the error returned |
| notsupported | void   | emitted when the browser does not support this feature        |

### Methods

`capture` - Returns a base64 encoded string of the current webcam image. Example:

```html
<div id="app" class="component">
  <webcam ref="webcam"></webcam>
  <img :src="this.img" style="width:500px;height:500px;" />
  <button type="button" @click="changeCamera">Change Camera</button>
  <button type="button" @click="photo">Capture Photo</button>
</div>
```

```javascript
import Webcam from 'vue-web-cam/src/webcam'

export default {
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
}
```

## License

MIT

## Credits

This is based off [@smronju vue-webcam](https://github.com/smronju/vue-webcam) and [react-webcam](https://github.com/mozmorris/react-webcam)
