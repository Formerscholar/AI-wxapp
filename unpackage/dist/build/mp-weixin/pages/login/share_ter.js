(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/share_ter"],{2919:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=n("2f62");function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){s(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var c=function(){n.e("components/uni-popup/uni-popup").then(function(){return resolve(n("106f"))}.bind(null,n)).catch(n.oe)},r={components:{uniPopup:c},data:function(){return{user_info:{true_name:"",school_list:{school_name:""}},id:"",name:"",school:"",class_id:"",teacher_name:"",subject_title:"",disable:!1,token:"",true_name:"",subject_list:[],subject_id:"",team_id:"",num:"",code:"",mobile:"",$e:"",$i:"",sessionkey:"",openid:""}},onLoad:function(e){var t=this;console.log("options",e),this.$api.get_team_location({classid:e.class_id}).then((function(e){console.log("get_team_location",e),t.school=e.data.school_id,t.province_id=e.data.area.province_id,t.city_id=e.data.area.city_id,t.area_id=e.data.area.area_id})),this.id=e.id,this.name=e.name,this.class_id=e.class_id,this.teacher_name=e.teacher_name,this.team_id=e.team_id,this.get_team_subject()},methods:a(a({},(0,i.mapMutations)(["login","set_type"])),{},{getphone:function(t){var n=this;this.$refs.popup.close(),console.log(t);var i={code:this.code,iv:t.detail.iv,encryptedData:t.detail.encryptedData,sessionkey:this.sessionkey,openid:this.openid,user_name:this.user_info.nickName,avatar:this.user_info.avatarUrl,gender:this.user_info.gender},o=this;o.$api.get_mobile(i).then((function(t){if(n.mobile=t.data.mobile,200==t.code)console.log(t.data),o.login(t.data),o.joinTeam(),e.reLaunch({url:"/pages/index/index"});else{var i={province_id:n.province_id,city_id:n.city_id,area_id:n.area_id,school_id:n.school,subject_id:n.subject_id,true_name:n.true_name,mobile:n.mobile,openid:n.openid,nickName:n.user_info.nickName,avatar:n.user_info.avatarUrl,gender:n.user_info.gender};n.$api.teacher_bind_info(i).then((function(t){console.log(t),200==t.code?(n.login(t.data),n.joinTeam()):e.showToast({title:t.msg,icon:"none"})}))}console.log(t)}))},bindgetuserinfo:function(t,n){var i=this;this.$e=t,this.$i=n,this.true_name?this.num||this.subject_id?e.login({success:function(n){var o=i;o.code=n.code;var a={code:o.code,user_name:t.detail.userInfo.nickName,avatar:t.detail.userInfo.avatarUrl,gender:t.detail.userInfo.gender};o.user_info=t.detail.userInfo,o.$api.teacher_login(a).then((function(t){o.sessionkey=t.data.session_key,o.openid=t.data.openid,200==t.code?(e.setStorage({key:"userinfo_tmp",data:t.data}),o.true_name=t.data.true_name,o.subject_title=t.data.subject_title,o.disable=!0,o.joinTeam()):(i.$refs.popup.open(),o.disable=!1)}))}}):e.showToast({title:"请选择学科",icon:"none"}):e.showToast({title:"请输入真实姓名",icon:"none"})},joinTeam:function(){var t=this,n={classid:this.class_id,subject_id:this.subject_id};console.log(n),this.$api.ter_join_team(n).then((function(n){200==n.code?(t.login(n.data),e.showToast({title:n.msg,icon:"none"}),setTimeout((function(){e.switchTab({url:"/pages/index/index"})}),1e3)):e.showToast({title:n.msg,icon:"none"})}))},get_team_subject:function(e){var t=this,n=this.$api.get_team_subject({team_id:this.team_id});n.then((function(e){if(200==e.code){var n=e.data;t.subject_list=n}}))},bindChange:function(e){console.log(e),this.num=e.detail.value,this.subject_id=this.subject_list[this.num].id,console.log(this.subject_id)}})};t.default=r}).call(this,n("543d")["default"])},3691:function(e,t,n){"use strict";(function(e){n("a371");i(n("66fd"));var t=i(n("4530"));function i(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},"38e5":function(e,t,n){"use strict";n.r(t);var i=n("2919"),o=n.n(i);for(var a in i)"default"!==a&&function(e){n.d(t,e,(function(){return i[e]}))}(a);t["default"]=o.a},4530:function(e,t,n){"use strict";n.r(t);var i=n("b377"),o=n("38e5");for(var a in o)"default"!==a&&function(e){n.d(t,e,(function(){return o[e]}))}(a);n("862b");var s,c=n("f0c5"),r=Object(c["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],s);t["default"]=r.exports},"4e22":function(e,t,n){},"862b":function(e,t,n){"use strict";var i=n("4e22"),o=n.n(i);o.a},b377:function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return i}));var i={uniPopup:function(){return n.e("components/uni-popup/uni-popup").then(n.bind(null,"106f"))}},o=function(){var e=this,t=e.$createElement;e._self._c},a=[]}},[["3691","common/runtime","common/vendor"]]]);