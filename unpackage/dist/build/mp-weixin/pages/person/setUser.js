(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/person/setUser"],{"0aa2":function(t,e,n){"use strict";n.r(e);var a=n("6874"),o=n.n(a);for(var i in a)"default"!==i&&function(t){n.d(e,t,(function(){return a[t]}))}(i);e["default"]=o.a},19774:function(t,e,n){"use strict";(function(t){n("a371");a(n("66fd"));var e=a(n("438e"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"438e":function(t,e,n){"use strict";n.r(e);var a=n("563a"),o=n("0aa2");for(var i in o)"default"!==i&&function(t){n.d(e,t,(function(){return o[t]}))}(i);n("c6b7");var u,c=n("f0c5"),s=Object(c["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],u);e["default"]=s.exports},"563a":function(t,e,n){"use strict";var a;n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return a}));var o=function(){var t=this,e=t.$createElement;t._self._c},i=[]},6874:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{value:"",title:""}},onLoad:function(e){t.getStorageSync("token")&&(this.token=t.getStorageSync("token")),this.title=e.title,t.setNavigationBarTitle({title:"编辑"+e.title})},methods:{baocun:function(){var e,n=this;this.value?("姓名"==this.title?e={true_name:this.value,token:this.token}:"性别"==this.title&&(e={sex:this.value,token:this.token}),this.$api.change_user_info(e).then((function(e){if(console.log(e),200==e.code){var a=getCurrentPages(),o=a[a.length-2];o.data.user_info.display_list.true_name=n.value,console.log(o),t.showToast({title:"修改成功"}),setTimeout((function(){t.navigateBack()}),1e3)}else t.showToast({title:e.msg,icon:"none"})}))):t.showToast({title:"不能为空！",icon:"none"})}}};e.default=n}).call(this,n("543d")["default"])},c6b7:function(t,e,n){"use strict";var a=n("cadf"),o=n.n(a);o.a},cadf:function(t,e,n){}},[["19774","common/runtime","common/vendor"]]]);