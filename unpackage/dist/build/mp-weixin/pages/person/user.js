(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/person/user"],{"0194":function(t,e,n){"use strict";(function(t){n("022d"),n("921b");o(n("66fd"));var e=o(n("eb91"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"44c6":function(t,e,n){},"5deb":function(t,e,n){"use strict";var o=n("44c6"),i=n.n(o);i.a},ca09:function(t,e,n){"use strict";var o;n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return o}));var i=function(){var t=this,e=t.$createElement;t._self._c},a=[]},df8d:function(t,e,n){"use strict";n.r(e);var o=n("fe3f"),i=n.n(o);for(var a in o)"default"!==a&&function(t){n.d(e,t,(function(){return o[t]}))}(a);e["default"]=i.a},eb91:function(t,e,n){"use strict";n.r(e);var o=n("ca09"),i=n("df8d");for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);n("5deb");var s,c=n("f0c5"),r=Object(c["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],s);e["default"]=r.exports},fe3f:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{img:"",user_info:{},token:"",location:[],sex:[{name:"男",id:1},{name:"女",id:0}],update:!0,grade:[],school:[],type:""}},onLoad:function(){t.getStorageSync("userInfo").token&&(this.token=t.getStorageSync("userInfo").token,this.type=t.getStorageSync("type")),this.type=t.getStorageSync("type"),this.get_grade(),this.getuserinfo(),this.get_location_list()},onShow:function(){this.update?this.getuserinfo():this.update=!0},methods:{checkimg:function(){var e=this;this.update=!1,t.chooseImage({count:1,sizeType:["original","compressed"],sourceType:["album","camera"],success:function(n){var o=e;console.log(n.tempFilePaths),o.img=n.tempFilePaths[0];var i="";i=4==o.type?o.$api.url+"user/update_avatar/":o.$api.url+"teacher/update_avatar/",t.uploadFile({url:i,filePath:o.img,name:"file",formData:{token:o.token},success:function(t){console.log("返回",t.data)}})}})},touser:function(e){console.log(e),t.navigateTo({url:e})},get_location_list:function(){var t=this;this.$api.get_location_list({token:this.token}).then((function(e){console.log(e),t.location=e.data}))},getschool:function(){var t,e,n=this,o={province_id:null===(t=this.user_info)||void 0===t||null===(e=t.school_list)||void 0===e?void 0:e.province_id,city_id:this.user_info.school_list.city_id,area_id:this.user_info.school_list.area_id,token:this.token};this.$api.get_school(o).then((function(t){console.log(t),0==t.data.length?n.school=[{name:"该省市区没有学校"}]:n.school=t.data}))},get_grade:function(){var t=this;this.$api.get_grade({token:this.token}).then((function(e){console.log(e),t.grade=e.data.grade_list}))},getuserinfo:function(){var e=this;4==t.getStorageSync("type")?this.$api.get_user_info({token:this.token}).then((function(t){console.log(t),e.user_info=t.data,e.img=t.data.avatar})):this.$api.get_teacher_info({token:this.token}).then((function(t){console.log(t),e.user_info=t.data,e.img=t.data.avatar}))},changeGrade:function(e){var n=this;if(4==t.getStorageSync("type"))var o=this.$api.change_grade({token:this.token,grade_ids:this.grade[e.detail.value].grade_id});else o=this.$api.change_teacher_info({token:this.token,grade_ids:this.grade[e.detail.value].grade_id});o.then((function(e){console.log(e),200!=e.code&&t.showToast({title:e.msg,icon:"none"}),n.getuserinfo()}))},changesc:function(e){var n=this;if(4==t.getStorageSync("type"))var o=this.$api.change_user_info({token:this.token,school_id:this.school[e.detail.value].id});else o=this.$api.change_teacher_info({token:this.token,school_id:this.school[e.detail.value].id});o.then((function(e){console.log(e),200!=e.code&&t.showToast({title:e.msg,icon:"none"}),n.getuserinfo()}))},bindChange:function(e){var n=this;console.log(e);var o=e.detail.code;if(4==t.getStorageSync("type"))var i=this.$api.change_user_info({token:this.token,region:o.toString()});else i=this.$api.change_teacher_info({token:this.token,region:o.toString()});i.then((function(t){console.log(t),n.getuserinfo()}))},bindChange2:function(e){var n=this;console.log(e);var o=this.sex[e.detail.value].id;if(4==t.getStorageSync("type"))var i=this.$api.change_user_info({token:this.token,gender:o});else i=this.$api.change_teacher_info({token:this.token,gender:o});i.then((function(t){n.getuserinfo()}))},set:function(e){t.getStorageSync("type"),t.navigateTo({url:"/pages/person/setUser?title="+e})}}};e.default=n}).call(this,n("543d")["default"])}},[["0194","common/runtime","common/vendor"]]]);