(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/knowledgeBase/watchExplane"],{"157e":function(i,e,t){"use strict";t.r(e);var n=t("5814"),a=t("7163");for(var s in a)"default"!==s&&function(i){t.d(e,i,(function(){return a[i]}))}(s);t("b850");var o,c=t("f0c5"),l=Object(c["a"])(a["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],o);e["default"]=l.exports},"2a58":function(i,e,t){"use strict";(function(i){t("a371");n(t("66fd"));var e=n(t("157e"));function n(i){return i&&i.__esModule?i:{default:i}}i(e.default)}).call(this,t("543d")["createPage"])},3934:function(i,e,t){},"4ad4":function(i,e,t){"use strict";(function(i){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var t={data:function(){return{id:"",jiexiList:{},is_vip:"",type:""}},onLoad:function(e){this.id=e.id,this.token=i.getStorageSync("token")},onShow:function(){this.get_exercise_analysis(),i.getStorageSync("is_vip")&&(this.is_vip=i.getStorageSync("is_vip")),this.type=i.getStorageSync("type")},methods:{changeStyle:function(i){return i=i.replace(new RegExp("<p","gi"),'<p style="color: #000;position:relative"'),i=i.replace(new RegExp("<img","gi"),'<img style="max-width:95%;vertical-align: middle;width:auto;"'),i},get_exercise_analysis:function(){var i=this;this.$api.get_exercise_analysis({id:this.id}).then((function(e){200!=e.code||(i.jiexiList=e.data,console.log("watchExplane",e.data))}))}}};e.default=t}).call(this,t("543d")["default"])},5814:function(i,e,t){"use strict";var n;t.d(e,"b",(function(){return a})),t.d(e,"c",(function(){return s})),t.d(e,"a",(function(){return n}));var a=function(){var i=this,e=i.$createElement,t=(i._self._c,i.changeStyle(i.jiexiList.content?i.jiexiList.content:"")),n=i.jiexiList.answer&&1==i.is_vip&&4==i.type?i.changeStyle(i.jiexiList.answer?i.jiexiList.answer:""):null,a=i.jiexiList.analysis&&1==i.is_vip&&4==i.type?i.changeStyle(i.jiexiList.analysis?i.jiexiList.analysis:""):null,s=i.jiexiList.answer&&3==i.type?i.changeStyle(i.jiexiList.answer?i.jiexiList.answer:""):null,o=i.jiexiList.analysis&&3==i.type?i.changeStyle(i.jiexiList.analysis?i.jiexiList.analysis:""):null,c=i.jiexiList.know_point_info?i.changeStyle(i.jiexiList.know_point_info?i.jiexiList.know_point_info:""):null;i.$mp.data=Object.assign({},{$root:{m0:t,m1:n,m2:a,m3:s,m4:o,m5:c}})},s=[]},7163:function(i,e,t){"use strict";t.r(e);var n=t("4ad4"),a=t.n(n);for(var s in n)"default"!==s&&function(i){t.d(e,i,(function(){return n[i]}))}(s);e["default"]=a.a},b850:function(i,e,t){"use strict";var n=t("3934"),a=t.n(n);a.a}},[["2a58","common/runtime","common/vendor"]]]);