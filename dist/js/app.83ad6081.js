(function(e){function t(t){for(var o,a,s=t[0],u=t[1],l=t[2],c=0,p=[];c<s.length;c++)a=s[c],i[a]&&p.push(i[a][0]),i[a]=0;for(o in u)Object.prototype.hasOwnProperty.call(u,o)&&(e[o]=u[o]);d&&d(t);while(p.length)p.shift()();return r.push.apply(r,l||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],o=!0,s=1;s<n.length;s++){var u=n[s];0!==i[u]&&(o=!1)}o&&(r.splice(t--,1),e=a(a.s=n[0]))}return e}var o={},i={app:0},r=[];function a(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=o,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)a.d(n,o,function(t){return e[t]}.bind(null,o));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],u=s.push.bind(s);s.push=t,s=s.slice();for(var l=0;l<s.length;l++)t(s[l]);var d=u;r.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},"044d":function(e,t,n){"use strict";var o=n("5ad6"),i=n.n(o);i.a},"0fdf":function(e,t,n){},"52de":function(e,t,n){"use strict";var o=n("ae7d"),i=n.n(o);i.a},"5ad6":function(e,t,n){},"5c0b":function(e,t,n){"use strict";var o=n("8fba"),i=n.n(o);i.a},"8fba":function(e,t,n){},a5e8:function(e,t,n){"use strict";var o=n("0fdf"),i=n.n(o);i.a},ae7d:function(e,t,n){},bdf8:function(e,t,n){},c52d:function(e,t,n){"use strict";var o=n("bdf8"),i=n.n(o);i.a},cd49:function(e,t,n){"use strict";n.r(t);var o=n("2b0e"),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("header-component",[e._v(e._s(e.app_version))]),n("contents"),n("footer-component",[e._v("© Keita Watanabe | Matium")])],1)},r=[],a=n("9ab4"),s=n("60a3"),u=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("header",[n("div",{staticClass:"app-title"},[e._m(0),n("p",{staticClass:"version"},[e._t("default",[e._v("App Version Here")])],2)])])},l=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("h1",[n("span",{staticClass:"subtitle-bold"},[e._v("Momo")]),n("span",{staticClass:"subtitle-thin"},[e._v("Player")])])}],d=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return a["b"](t,e),t=a["a"]([s["a"]],t),t}(s["b"]),c=d,p=c,f=(n("52de"),n("2877")),v=Object(f["a"])(p,u,l,!1,null,"a4487954",null);v.options.__file="HeaderComponent.vue";var h=v.exports,b=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("footer",[n("p",{staticClass:"copyright"},[e._t("default",[e._v("Copyright")])],2)])},y=[],_={name:"FooterComponent"},m=_,g=(n("a5e8"),Object(f["a"])(m,b,y,!1,null,"60032738",null));g.options.__file="FooterComponent.vue";var w=g.exports,C=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"contents"},[n("div",{staticClass:"video-container"},[n("you-tube-video-player",{ref:"videoPlayer",attrs:{"yt-video-id":e.current_video_id}})],1),n("div",{staticClass:"video-nav"})])},O=[],V=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("transition",{attrs:{css:!1},on:{"before-enter":e.beforeEnter,enter:e.enter,leave:e.leave,afterLeave:e.afterLeave}},[n("div",{directives:[{name:"show",rawName:"v-show",value:e.isShown,expression:"isShown"}],staticClass:"video-box"},[n("youtube",{staticClass:"yt-video",attrs:{"video-id":e.videoId,"player-vars":e.videoOptions}})],1)])},j=[],x=n("f6dd");n("589d");s["b"].use(x["a"]);var S=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.videoId="",t.width=0,t.height=0,t.videoOptions={rel:0,showinfo:0},t.isShown=!0,t}return a["b"](t,e),t.prototype.onYtVideoIdChange=function(e,t){e!==t&&(this.isShown=!1)},t.prototype.beforeMount=function(){this.videoId=this.$props.ytVideoId},t.prototype.mounted=function(){},t.prototype.beforeEnter=function(e){console.log("Before Enter"),e.style.opacity="0"},t.prototype.enter=function(e){console.log("Enter Animation"),Velocity.animate(e,{opacity:[1,0]},{duration:1e3,easing:"linear"})},t.prototype.leave=function(e,t){console.log("Leave Animation"),Velocity.animate(e,{opacity:[0,1]},{duration:1e3,easing:"linear",complete:function(e){console.log(e),t()}})},t.prototype.afterLeave=function(e){console.log("After Leave"),this.videoId=this.$props.ytVideoId,this.isShown=!0},t.prototype.updateSize=function(e,t){this.width=e,this.height=t,this.$el.style.width=this.width+"px"},a["a"]([Object(s["c"])("ytVideoId")],t.prototype,"onYtVideoIdChange",null),t=a["a"]([Object(s["a"])({props:{ytVideoId:{default:""}}})],t),t}(s["b"]),$=S,M=$,E=(n("044d"),Object(f["a"])(M,V,j,!1,null,null,null));E.options.__file="YouTubeVideoPlayer.vue";var P=E.exports,W=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.init_video_id="fuCzjM1gAuM",t.current_video_id=t.init_video_id,t.videoW=0,t.videoH=0,t.maxVideoW=0,t}return a["b"](t,e),t.prototype.created=function(){window.addEventListener("resize",this.resizeVideo)},t.prototype.mounted=function(){this.videoContainer=this.$el.children[0],this.videoNav=this.$el.children[1],this.setVideoSize()},t.prototype.resizeVideo=function(){this.setVideoSize()},t.prototype.setVideoSize=function(){this.maxVideoW=Math.round(.8*window.innerWidth);var e=this.videoContainer.clientHeight,t=Math.round(1.77778*e);t<=this.maxVideoW?(this.videoH=e,this.videoW=t):(this.videoW=this.maxVideoW,this.videoH=Math.round(.5625*this.videoW));var n=this.$refs.videoPlayer;n.updateSize(this.videoW,this.videoH)},t=a["a"]([Object(s["a"])({components:{YouTubeVideoPlayer:P}})],t),t}(s["b"]),I=W,z=I,H=(n("c52d"),Object(f["a"])(z,C,O,!1,null,null,null));H.options.__file="Contents.vue";var A=H.exports,L=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.app_version="ver.0.1",t}return a["b"](t,e),t=a["a"]([Object(s["a"])({components:{HeaderComponent:h,FooterComponent:w,Contents:A}})],t),t}(s["b"]),T=L,Y=T,k=(n("5c0b"),Object(f["a"])(Y,i,r,!1,null,null,null));k.options.__file="App.vue";var F=k.exports;o["default"].config.productionTip=!1,new o["default"]({render:function(e){return e(F)}}).$mount("#app")}});
//# sourceMappingURL=app.83ad6081.js.map