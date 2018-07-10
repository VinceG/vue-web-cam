<p align="center">
    <img width="150" src="assets/logo.png">
</p>

<p align="center">
    <img src="assets/splash.png">
</p>

# vue-web-cam

[![npm](https://img.shields.io/npm/v/vue-web-cam.svg)](https://www.npmjs.com/package/vue-web-cam)
[![npm](https://img.shields.io/npm/dm/vue-web-cam.svg)](https://www.npmjs.com/package/vue-web-cam)
![Contributions welcome](https://img.shields.io/badge/contributions-welcome-orange.svg)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Webcam component for VueJs. See [this](http://caniuse.com/#feat=stream)
for browser compatibility.


## Installation

```
npm install vue-web-cam --save

yarn add vue-web-cam
```

## Usage

```javascript
import Vue from 'vue'
import WebCam from 'vue-web-cam'

Vue.use(WebCam)
// or
import {WebCam} from 'vue-web-cam'
Vue.component(WebCam.name, WebCam)
```

## Testing & Dev

```
npm run dev
```

### Props

| prop             | type    | default      | notes                     |
| ---------------- | ------- | ------------ | ------------------------- |
| height           | number  | 500          | height of video element   |
| width            | number  | 500          | width of video element    |
| autoplay         | boolean | true         | autoplay attribute        |
| screenshotFormat | string  | 'image/jpeg' | format of screenshot      |
| deviceId         | string  | null         | currently selected camera |

### Events

| name           | param    | notes                                                         |
| -------------- | -------- | ------------------------------------------------------------- |
| started        | stream   | emitted once the stream has started                           |
| stopped        | stream   | emitted once the stream has stopped                           |
| error          | error    | emitted if the stream failed to start with the error returned |
| notsupported   | error    | emitted when the browser does not support this feature        |
| cameras        | cameras  | emitted when a list of all cameras available is loaded        |
| camera-change  | deviceId | emitted when camera change occurs                             |

### Methods

| name           | param    | notes                                                                   |
| -------------- | -------- | ----------------------------------------------------------------------- |
| capture        | void     | Capture the current image through the webcam as base64 encoded string   |
| changeCamera   | deviceId | change the currently selected camera. Must pass in the device ID        |
| start          | void     | Programatically Start the camera after stopping it (relies on deviceId prop passed to the component)                     |
| stop           | void     | Programatically stop the camera      |

## License

MIT

## Credits

This is based off [@smronju vue-webcam](https://github.com/smronju/vue-webcam) and [react-webcam](https://github.com/mozmorris/react-webcam)
