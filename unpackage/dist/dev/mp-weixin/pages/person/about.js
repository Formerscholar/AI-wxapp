(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/person/about"],{286:
/*!********************************************************************!*\
  !*** E:/code/work/wxapp/main.js?{"page":"pages%2Fperson%2Fabout"} ***!
  \********************************************************************/
/*! no static exports found */function(t,e,n){"use strict";(function(t){n(/*! uni-pages */4),n(/*! @dcloudio/uni-stat */5);i(n(/*! vue */2));var e=i(n(/*! ./pages/person/about.vue */287));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */1)["createPage"])},287:
/*!*************************************************!*\
  !*** E:/code/work/wxapp/pages/person/about.vue ***!
  \*************************************************/
/*! no static exports found */function(t,e,n){"use strict";n.r(e);var i=n(/*! ./about.vue?vue&type=template&id=412eb868& */288),r=n(/*! ./about.vue?vue&type=script&lang=js& */290);for(var a in r)"default"!==a&&function(t){n.d(e,t,(function(){return r[t]}))}(a);n(/*! ./about.vue?vue&type=style&index=0&lang=scss& */292);var o,u=n(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */16),c=Object(u["default"])(r["default"],i["render"],i["staticRenderFns"],!1,null,null,null,!1,i["components"],o);c.options.__file="pages/person/about.vue",e["default"]=c.exports},288:
/*!********************************************************************************!*\
  !*** E:/code/work/wxapp/pages/person/about.vue?vue&type=template&id=412eb868& ***!
  \********************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */function(t,e,n){"use strict";n.r(e);var i=n(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./about.vue?vue&type=template&id=412eb868& */289);n.d(e,"render",(function(){return i["render"]})),n.d(e,"staticRenderFns",(function(){return i["staticRenderFns"]})),n.d(e,"recyclableRender",(function(){return i["recyclableRender"]})),n.d(e,"components",(function(){return i["components"]}))},289:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/code/work/wxapp/pages/person/about.vue?vue&type=template&id=412eb868& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */function(t,e,n){"use strict";var i;n.r(e),n.d(e,"render",(function(){return r})),n.d(e,"staticRenderFns",(function(){return o})),n.d(e,"recyclableRender",(function(){return a})),n.d(e,"components",(function(){return i}));var r=function(){var t=this,e=t.$createElement;t._self._c},a=!1,o=[];r._withStripped=!0},290:
/*!**************************************************************************!*\
  !*** E:/code/work/wxapp/pages/person/about.vue?vue&type=script&lang=js& ***!
  \**************************************************************************/
/*! no static exports found */function(t,e,n){"use strict";n.r(e);var i=n(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./about.vue?vue&type=script&lang=js& */291),r=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);e["default"]=r.a},291:
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/code/work/wxapp/pages/person/about.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=getApp(),i={data:function(){return{list:[],type:"about",official_account:"",weibo:"",website:"",customer_service:"",email:""}},onLoad:function(e){this.official_account=n.globalData.settings.official_account,this.weibo=n.globalData.settings.weibo,this.website=n.globalData.settings.website,this.customer_service=n.globalData.settings.customer_service,this.email=n.globalData.settings.email,"zhuce"==e.title&&(t.setNavigationBarTitle({title:"注册协议"}),this.type="register"),this.get_list()},methods:{get_list:function(){var t=this;this.$api.get_agreement({type:this.type}).then((function(e){console.log(e.data.info),t.list=e.data.info}))},pageTopro:function(e){e?t.navigateTo({url:"/pages/login/agreement?type=income"}):t.navigateTo({url:"/pages/login/agreement?type=register"})}}};e.default=i}).call(this,n(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */1)["default"])},292:
/*!***********************************************************************************!*\
  !*** E:/code/work/wxapp/pages/person/about.vue?vue&type=style&index=0&lang=scss& ***!
  \***********************************************************************************/
/*! no static exports found */function(t,e,n){"use strict";n.r(e);var i=n(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./about.vue?vue&type=style&index=0&lang=scss& */293),r=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);e["default"]=r.a},293:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/code/work/wxapp/pages/person/about.vue?vue&type=style&index=0&lang=scss& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(t,e,n){}},[[286,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/person/about.js.map