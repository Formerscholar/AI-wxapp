(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/u-parse/components/wxParseTemplate2"],{"42bf":function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=function(){t.e("components/u-parse/components/wxParseTemplate3").then(function(){return resolve(t("e966"))}.bind(null,t)).catch(t.oe)},r=function(){t.e("components/u-parse/components/wxParseImg").then(function(){return resolve(t("af07"))}.bind(null,t)).catch(t.oe)},a=function(){t.e("components/u-parse/components/wxParseVideo").then(function(){return resolve(t("2ca6"))}.bind(null,t)).catch(t.oe)},u=function(){t.e("components/u-parse/components/wxParseAudio").then(function(){return resolve(t("a9e4"))}.bind(null,t)).catch(t.oe)},c={name:"wxParseTemplate2",props:{node:{}},components:{wxParseTemplate:o,wxParseImg:r,wxParseVideo:a,wxParseAudio:u},methods:{wxParseATap:function(e){var n=e.currentTarget.dataset.href;if(n){var t=this.$parent;while(!t.preview||"function"!==typeof t.preview)t=t.$parent;t.navigate(n,e)}}}};n.default=c},b0b8:function(e,n,t){"use strict";t.r(n);var o=t("42bf"),r=t.n(o);for(var a in o)"default"!==a&&function(e){t.d(n,e,(function(){return o[e]}))}(a);n["default"]=r.a},c528:function(e,n,t){"use strict";var o;t.d(n,"b",(function(){return r})),t.d(n,"c",(function(){return a})),t.d(n,"a",(function(){return o}));var r=function(){var e=this,n=e.$createElement;e._self._c},a=[]},ed36:function(e,n,t){"use strict";t.r(n);var o=t("c528"),r=t("b0b8");for(var a in r)"default"!==a&&function(e){t.d(n,e,(function(){return r[e]}))}(a);var u,c=t("f0c5"),s=Object(c["a"])(r["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],u);n["default"]=s.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/u-parse/components/wxParseTemplate2-create-component',
    {
        'components/u-parse/components/wxParseTemplate2-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("ed36"))
        })
    },
    [['components/u-parse/components/wxParseTemplate2-create-component']]
]);
