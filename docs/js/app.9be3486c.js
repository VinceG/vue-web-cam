(function(e){function t(t){for(var n,c,i=t[0],s=t[1],d=t[2],p=0,u=[];p<i.length;p++)c=i[p],Object.prototype.hasOwnProperty.call(r,c)&&r[c]&&u.push(r[c][0]),r[c]=0;for(n in s)Object.prototype.hasOwnProperty.call(s,n)&&(e[n]=s[n]);l&&l(t);while(u.length)u.shift()();return o.push.apply(o,d||[]),a()}function a(){for(var e,t=0;t<o.length;t++){for(var a=o[t],n=!0,i=1;i<a.length;i++){var s=a[i];0!==r[s]&&(n=!1)}n&&(o.splice(t--,1),e=c(c.s=a[0]))}return e}var n={},r={app:0},o=[];function c(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,c),a.l=!0,a.exports}c.m=e,c.c=n,c.d=function(e,t,a){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(c.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)c.d(a,n,function(t){return e[t]}.bind(null,n));return a},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/vue-web-cam/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],s=i.push.bind(i);i.push=t,i=i.slice();for(var d=0;d<i.length;d++)t(i[d]);var l=s;o.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"56d7":function(e,t,a){"use strict";a.r(t);var n=a("2b0e"),r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-app",[a("v-app-bar",{attrs:{app:"",color:"primary",dark:"",dense:""}},[a("div",{staticClass:"d-flex align-center"},[e._v("Vue Webcam Demo")]),a("v-spacer"),a("v-btn",{attrs:{href:"https://github.com/VinceG/vue-web-cam",target:"_blank",text:"",small:""}},[a("span",{staticClass:"mr-2"},[e._v("Latest Release")]),a("v-icon",[e._v("mdi-open-in-new")])],1)],1),a("v-main",{staticStyle:{background:"#e5e5e5"}},[a("web-cam")],1)],1)},o=[],c=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",[a("v-row",{attrs:{justify:"space-around"}},[a("v-card",{staticClass:"ma-4"},[a("v-card-title",{staticClass:"headline lighten-2"},[e._v(" Vue Webcam ")]),a("v-card-text",[a("p",[e._v(" Current Camera: "),a("span",[e.device?a("code",[e._v(e._s(e.device.label))]):e._e()])]),a("web-cam",{ref:"webcam",attrs:{"device-id":e.deviceId,height:"100%",width:"100%"},on:{started:e.onStarted,stopped:e.onStopped,error:e.onError,cameras:e.onCameras,"camera-change":e.onCameraChange}}),a("v-select",{attrs:{items:e.devices,"item-value":e.deviceId,"item-text":"label",label:"Select Device"}}),e.img?a("p",[e._v("Preview:")]):e._e(),a("v-img",{attrs:{src:e.img,contain:""}}),a("div",{staticClass:"text-center"},[e.img?a("v-btn",{staticClass:"ma-2",attrs:{depressed:"",fab:"",dark:"",small:"",color:"red"},on:{click:function(t){e.img=null}}},[a("v-icon",{attrs:{dark:""}},[e._v(" mdi-close-circle-outline ")])],1):e._e()],1)],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{staticClass:"mx-2",attrs:{depressed:"",fab:"",dark:"",small:"",color:"green"},on:{click:e.onCapture}},[a("v-icon",{attrs:{dark:""}},[e._v(" mdi-camera-iris ")])],1),a("v-btn",{staticClass:"mx-2",attrs:{depressed:"",fab:"",dark:"",small:"",color:"red"},on:{click:e.onStop}},[a("v-icon",{attrs:{dark:""}},[e._v(" mdi-camera-off ")])],1),a("v-btn",{staticClass:"mx-2",attrs:{depressed:"",fab:"",dark:"",small:"",color:"warning"},on:{click:e.onStart}},[a("v-icon",{attrs:{dark:""}},[e._v(" mdi-camera ")])],1),a("v-spacer")],1)],1)],1)],1)},i=[],s=a("b3cb"),d={data(){return{img:null,camera:null,deviceId:null,devices:[],obj:null}},watch:{camera:function(e){this.deviceId=e},devices:function(){const[e,...t]=this.devices;e&&(this.camera=e.deviceId,this.deviceId=e.deviceId)}},components:{WebCam:s["WebCam"]},methods:{onCapture(){this.img=this.$refs.webcam.capture(),fetch(this.img).then(e=>e.blob()).then(e=>{const t=new File([e],"dot.png",e);console.log(t),this.obj=t}),this.$toasted.show("Your smile has been captured",{type:"success",duration:5e3,position:"top-center",theme:"bubble",icon:"mdi-alert-circle",iconPack:"mdi"})},onStarted(e){console.log("On Started Event",e),this.$toasted.show("On Started Event",{type:"success",duration:5e3,position:"top-center",theme:"bubble",icon:"mdi-alert-circle",iconPack:"mdi"})},onStopped(e){console.log("On Stopped Event",e),this.$toasted.show("On Stopped Event",{type:"danger",duration:5e3,position:"top-center",theme:"bubble",icon:"mdi-alert-circle",iconPack:"mdi"})},onStop(){this.$refs.webcam.stop()},onStart(){this.$refs.webcam.start()},onError(e){console.log("On Error Event",e),this.$toasted.show("On Error Event",{type:"danger",duration:5e3,position:"top-center",theme:"bubble",icon:"mdi-alert-circle",iconPack:"mdi"})},onCameras(e){this.devices=e,console.log("On Cameras Event",e),this.$toasted.show("On Cameras Event",{type:"success",duration:5e3,position:"top-center",theme:"bubble",icon:"mdi-alert-circle",iconPack:"mdi"})},onCameraChange(e){this.deviceId=e,this.camera=e,console.log("On Camera Change Event",e),this.$toasted.show("On Camera Change Event",{type:"success",duration:5e3,position:"top-center",theme:"bubble",icon:"mdi-alert-circle",iconPack:"mdi"})}},computed:{device:function(){return this.devices.find(e=>e.deviceId===this.deviceId)}}},l=d,p=a("2877"),u=a("6544"),m=a.n(u),v=a("8336"),b=a("b0af"),h=a("99d9"),f=a("a523"),g=a("132d"),w=a("adda"),C=a("0fd9"),y=a("b974"),_=a("2fa4"),k=Object(p["a"])(l,c,i,!1,null,null,null),O=k.exports;m()(k,{VBtn:v["a"],VCard:b["a"],VCardActions:h["a"],VCardText:h["b"],VCardTitle:h["c"],VContainer:f["a"],VIcon:g["a"],VImg:w["a"],VRow:C["a"],VSelect:y["a"],VSpacer:_["a"]});var S={name:"App",components:{WebCam:O},data:()=>({})},V=S,x=a("7496"),E=a("40dc"),j=a("f6c4"),P=Object(p["a"])(V,r,o,!1,null,null,null),I=P.exports;m()(P,{VApp:x["a"],VAppBar:E["a"],VBtn:v["a"],VIcon:g["a"],VMain:j["a"],VSpacer:_["a"]});var $=a("f309");n["a"].use($["a"]);var M=new $["a"]({}),T=a("a65d"),W=a.n(T);n["a"].config.productionTip=!1,n["a"].use(W.a),new n["a"]({vuetify:M,render:function(e){return e(I)}}).$mount("#app")}});
//# sourceMappingURL=app.9be3486c.js.map