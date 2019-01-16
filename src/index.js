import WebCam from "./webcam";

const install = function(Vue, opts = {}) {
  if (install.installed) return;
  Vue.component(WebCam.name, WebCam);
};

export default {
  WebCam,
  install
};
