(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/person/person"],{"342f":function(e,n,t){},7213:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=t("2f62");function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function r(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var s=getApp(),c=function(){Promise.all([t.e("common/vendor"),t.e("components/uni-popup/uni-popup")]).then(function(){return resolve(t("f02b"))}.bind(null,t)).catch(t.oe)},u=function(){t.e("components/uni-popup/uni-popup-share").then(function(){return resolve(t("655c"))}.bind(null,t)).catch(t.oe)},l={components:{uniPopup:c,uniPopupShare:u},data:function(){return{user_info:{},token:"",type:4,info:{},school:"",flag:!1,grade_names:"",is_vip:0,platform:""}},onLoad:function(){this.platform=s.globalData.systemInfo.platform},onShow:function(){this.token=e.getStorageSync("token"),this.type=e.getStorageSync("type"),this.getuserinfo()},computed:r({},(0,o.mapState)(["hasLogin","userInfo"])),onShareAppMessage:function(){return{title:"AI错题宝",path:"/pages/index/index"}},methods:r(r({},(0,o.mapMutations)(["login","logout"])),{},{selectShare:function(n){var t=n.item,o=n.index;switch(console.log("selectShare",t,o),o){case 0:e.share({provider:"weixin",scene:"WXSceneSession",type:5,imageUrl:"https://aictb.oss-cn-shanghai.aliyuncs.com/App/share_icon.png",title:"AI错题宝",miniProgram:{id:"gh_762f64585df2",path:"pages/index/index",type:0,webUrl:"http://m.aictb.com/"},success:function(e){console.log(JSON.stringify(e))},fail:function(e){console.log("fail:"+JSON.stringify(e))}});break;case 1:e.share({provider:"qq",scene:"WXSceneSession",type:1,summary:"AI错题宝",href:"https://www.aictb.com/app/",success:function(e){console.log("success:"+JSON.stringify(e))},fail:function(e){console.log("fail:"+JSON.stringify(e))}});break;default:break}this.$refs.uniPopupShare.close()},AppShareClick:function(){this.$refs.uniPopupShare.open()},shopClick:function(){"ios"==s.globalData.systemInfo.platform?e.navigateTo({url:"/pages/mall/iostip"}):e.navigateTo({url:"/pages/mall/index"})},pageToVip:function(){this.touser("/pages/person/vip")},get_vip_info:function(){var e=this;this.$api.vip_info({token:this.token}).then((function(n){console.log(n),e.info=n.data,e.is_vip=n.data.is_vip}))},getuserinfo:function(){var e=this;console.log(this.token,this.type,"getuserinfo"),4==this.type?this.$api.get_user_info({token:this.token}).then((function(n){var t,o,i,r,a;console.log(n),e.user_info=n.data,e.grade_names=(null===(t=n.data)||void 0===t||null===(o=t.school_list)||void 0===o?void 0:o.grade_name)||"未绑定班级",e.school=(null===(i=n.data)||void 0===i||null===(r=i.school_list)||void 0===r?void 0:r.school_name)||"",e.is_vip=null===(a=n.data)||void 0===a?void 0:a.is_vip})):this.$api.get_teacher_info({token:this.token}).then((function(n){console.log("jiaoshi",n),e.user_info=n.data}))},touser:function(n){console.log(n),e.navigateTo({url:n})},tocuoti:function(){e.switchTab({url:"/pages/errorBook/errorBook"})},toClassID:function(){e.navigateTo({url:"/pages/person/bindClassID"})},toMyUploadPaper:function(){e.navigateTo({url:"/pages/person/mineUploadPaper?id=2"})},toJifen:function(){e.navigateTo({url:"/pages/person/jifenRecord"})}})};n.default=l}).call(this,t("543d")["default"])},9485:function(e,n,t){"use strict";(function(e){t("f6c3"),t("921b");o(t("66fd"));var n=o(t("bfd7"));function o(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("543d")["createPage"])},bca9:function(e,n,t){"use strict";t.r(n);var o=t("7213"),i=t.n(o);for(var r in o)"default"!==r&&function(e){t.d(n,e,(function(){return o[e]}))}(r);n["default"]=i.a},bfd7:function(e,n,t){"use strict";t.r(n);var o=t("c2c9"),i=t("bca9");for(var r in i)"default"!==r&&function(e){t.d(n,e,(function(){return i[e]}))}(r);t("e958");var a,s=t("f0c5"),c=Object(s["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],a);n["default"]=c.exports},c2c9:function(e,n,t){"use strict";var o;t.d(n,"b",(function(){return i})),t.d(n,"c",(function(){return r})),t.d(n,"a",(function(){return o}));var i=function(){var e=this,n=e.$createElement;e._self._c},r=[]},e958:function(e,n,t){"use strict";var o=t("342f"),i=t.n(o);i.a}},[["9485","common/runtime","common/vendor"]]]);