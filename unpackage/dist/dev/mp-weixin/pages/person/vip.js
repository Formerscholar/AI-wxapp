(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/person/vip"],{294:
/*!******************************************************************!*\
  !*** E:/code/work/wxapp/main.js?{"page":"pages%2Fperson%2Fvip"} ***!
  \******************************************************************/
/*! no static exports found */function(t,n,e){"use strict";(function(t){e(/*! uni-pages */4),e(/*! @dcloudio/uni-stat */5);o(e(/*! vue */2));var n=o(e(/*! ./pages/person/vip.vue */295));function o(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */1)["createPage"])},295:
/*!***********************************************!*\
  !*** E:/code/work/wxapp/pages/person/vip.vue ***!
  \***********************************************/
/*! no static exports found */function(t,n,e){"use strict";e.r(n);var o=e(/*! ./vip.vue?vue&type=template&id=bef143c8& */296),i=e(/*! ./vip.vue?vue&type=script&lang=js& */298);for(var a in i)"default"!==a&&function(t){e.d(n,t,(function(){return i[t]}))}(a);e(/*! ./vip.vue?vue&type=style&index=0&lang=scss& */300);var s,r=e(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */16),c=Object(r["default"])(i["default"],o["render"],o["staticRenderFns"],!1,null,null,null,!1,o["components"],s);c.options.__file="pages/person/vip.vue",n["default"]=c.exports},296:
/*!******************************************************************************!*\
  !*** E:/code/work/wxapp/pages/person/vip.vue?vue&type=template&id=bef143c8& ***!
  \******************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */function(t,n,e){"use strict";e.r(n);var o=e(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./vip.vue?vue&type=template&id=bef143c8& */297);e.d(n,"render",(function(){return o["render"]})),e.d(n,"staticRenderFns",(function(){return o["staticRenderFns"]})),e.d(n,"recyclableRender",(function(){return o["recyclableRender"]})),e.d(n,"components",(function(){return o["components"]}))},297:
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/code/work/wxapp/pages/person/vip.vue?vue&type=template&id=bef143c8& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */function(t,n,e){"use strict";var o;e.r(n),e.d(n,"render",(function(){return i})),e.d(n,"staticRenderFns",(function(){return s})),e.d(n,"recyclableRender",(function(){return a})),e.d(n,"components",(function(){return o}));var i=function(){var t=this,n=t.$createElement;t._self._c},a=!1,s=[];i._withStripped=!0},298:
/*!************************************************************************!*\
  !*** E:/code/work/wxapp/pages/person/vip.vue?vue&type=script&lang=js& ***!
  \************************************************************************/
/*! no static exports found */function(t,n,e){"use strict";e.r(n);var o=e(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./vip.vue?vue&type=script&lang=js& */299),i=e.n(o);for(var a in o)"default"!==a&&function(t){e.d(n,t,(function(){return o[t]}))}(a);n["default"]=i.a},299:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/code/work/wxapp/pages/person/vip.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e=getApp(),o={data:function(){return{userInfo:{},info:{},price:0,is_discount:1,is_vip:0,tpmid:"",platform:"",pay_type:"wxpay"}},onLoad:function(){this.token=t.getStorageSync("userInfo").token,this.userInfo=t.getStorageSync("userInfo"),this.price=e.globalData.settings.vip_money,this.tpmid=e.globalData.settings.tmpid,console.log("this.tpmid",this.tpmid),this.platform=e.globalData.systemInfo.platform,"ios"==this.platform?t.setNavigationBarTitle({title:"会员特权"}):t.setNavigationBarTitle({title:"开通会员"})},onShow:function(){this.get_info()},methods:{get_info:function(){var t=this;this.$api.vip_info({token:this.token}).then((function(n){console.log(n),t.info=n.data,n.data.vip_money==t.price&&(t.is_discount=0)}))},pay:function(){var n=this;t.requestSubscribeMessage({tmplIds:this.tpmid.vip_notice,complete:function(t){n.login_pay()},success:function(t){},fail:function(t){}})},login_pays:function(){var n=this;this.$api.get_app_pay({type:this.pay_type}).then((function(e){console.log(e),200!=e.code?t.showModal({title:"温馨提示",content:e.msg,showCancel:!1}):t.requestPayment({provider:n.pay_type,orderInfo:e.data,success:function(t){console.log("success:"+JSON.stringify(t))},fail:function(t){console.log("fail:"+JSON.stringify(t))}})}))},login_pay:function(){this.$api.app_pay({platform:e.globalData.systemInfo.platform}).then((function(n){if(200!=n.code)t.showModal({title:"温馨提示",content:n.msg,showCancel:!1});else{var e=n.data.wx_pay;t.requestPayment({provider:"wxpay",timeStamp:e.timeStamp,nonceStr:e.nonceStr,package:e.package,signType:"MD5",paySign:e.paySign,success:function(n){console.log(n),t.setStorage({key:"is_vip",data:1})},fail:function(t){console.log(t)}})}}))}}};n.default=o}).call(this,e(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */1)["default"])},300:
/*!*********************************************************************************!*\
  !*** E:/code/work/wxapp/pages/person/vip.vue?vue&type=style&index=0&lang=scss& ***!
  \*********************************************************************************/
/*! no static exports found */function(t,n,e){"use strict";e.r(n);var o=e(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./vip.vue?vue&type=style&index=0&lang=scss& */301),i=e.n(o);for(var a in o)"default"!==a&&function(t){e.d(n,t,(function(){return o[t]}))}(a);n["default"]=i.a},301:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/code/work/wxapp/pages/person/vip.vue?vue&type=style&index=0&lang=scss& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(t,n,e){}},[[294,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/person/vip.js.map