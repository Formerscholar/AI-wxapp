(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/person/about"],{"17d5":function(t,e,i){"use strict";var n=i("53ec"),a=i.n(n);a.a},2894:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=getApp(),n={data:function(){return{list:[],type:"about",official_account:"",weibo:"",website:"",customer_service:"",email:""}},onLoad:function(e){this.official_account=i.globalData.settings.official_account,this.weibo=i.globalData.settings.weibo,this.website=i.globalData.settings.website,this.customer_service=i.globalData.settings.customer_service,this.email=i.globalData.settings.email,"zhuce"==e.title&&(t.setNavigationBarTitle({title:"注册协议"}),this.type="register"),this.get_list()},methods:{get_list:function(){var t=this;this.$api.get_agreement({type:this.type}).then((function(e){console.log(e.data.info),t.list=e.data.info}))}}};e.default=n}).call(this,i("543d")["default"])},"404f":function(t,e,i){"use strict";i.r(e);var n=i("2894"),a=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=a.a},"4de2":function(t,e,i){"use strict";i.r(e);var n=i("814f"),a=i("404f");for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);i("17d5");var u,c=i("f0c5"),s=Object(c["a"])(a["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],u);e["default"]=s.exports},"53ec":function(t,e,i){},"814f":function(t,e,i){"use strict";var n;i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return n}));var a=function(){var t=this,e=t.$createElement;t._self._c},o=[]},b874:function(t,e,i){"use strict";(function(t){i("a371");n(i("66fd"));var e=n(i("4de2"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,i("543d")["createPage"])}},[["b874","common/runtime","common/vendor"]]]);