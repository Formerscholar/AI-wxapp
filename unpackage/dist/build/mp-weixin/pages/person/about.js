(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/person/about"],{"0bf9":function(t,e,a){"use strict";a.r(e);var i=a("2b75"),n=a.n(i);for(var o in i)"default"!==o&&function(t){a.d(e,t,(function(){return i[t]}))}(o);e["default"]=n.a},"1a85":function(t,e,a){"use strict";var i=a("a971"),n=a.n(i);n.a},"2b75":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=getApp(),i={data:function(){return{list:[],type:"about",official_account:"",weibo:"",website:"",customer_service:"",email:""}},onLoad:function(e){this.official_account=a.globalData.settings.official_account,this.weibo=a.globalData.settings.weibo,this.website=a.globalData.settings.website,this.customer_service=a.globalData.settings.customer_service,this.email=a.globalData.settings.email,"zhuce"==e.title&&(t.setNavigationBarTitle({title:"注册协议"}),this.type="register"),this.get_list()},methods:{get_list:function(){var t=this;this.$api.get_agreement({type:this.type}).then((function(e){console.log(e.data.info),t.list=e.data.info}))}}};e.default=i}).call(this,a("543d")["default"])},"479c":function(t,e,a){"use strict";var i;a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){return i}));var n=function(){var t=this,e=t.$createElement;t._self._c},o=[]},"67c0":function(t,e,a){"use strict";(function(t){a("f6c3"),a("921b");i(a("66fd"));var e=i(a("7ea1"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("543d")["createPage"])},"7ea1":function(t,e,a){"use strict";a.r(e);var i=a("479c"),n=a("0bf9");for(var o in n)"default"!==o&&function(t){a.d(e,t,(function(){return n[t]}))}(o);a("1a85");var c,u=a("f0c5"),s=Object(u["a"])(n["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],c);e["default"]=s.exports},a971:function(t,e,a){}},[["67c0","common/runtime","common/vendor"]]]);