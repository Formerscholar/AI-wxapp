(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/bindinfo"],{"05f4":function(t,e,n){},"3e0e":function(t,e,n){"use strict";var i=n("05f4"),o=n.n(i);o.a},"79e3":function(t,e,n){"use strict";n.r(e);var i=n("c906"),o=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);e["default"]=o.a},8789:function(t,e,n){"use strict";(function(t){n("022d"),n("921b");i(n("66fd"));var e=i(n("9066"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},9066:function(t,e,n){"use strict";n.r(e);var i=n("bcc8"),o=n("79e3");for(var a in o)"default"!==a&&function(t){n.d(e,t,(function(){return o[t]}))}(a);n("3e0e");var r,s=n("f0c5"),c=Object(s["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],r);e["default"]=c.exports},bcc8:function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return i}));var o=function(){var t=this,e=t.$createElement;t._self._c},a=[]},c906:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=n("2f62");function o(t){return c(t)||s(t)||r(t)||a()}function a(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function r(t,e){if(t){if("string"===typeof t)return u(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?u(t,e):void 0}}function s(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function c(t){if(Array.isArray(t))return u(t)}function u(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,i=new Array(e);n<e;n++)i[n]=t[n];return i}function l(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,i)}return n}function d(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?l(Object(n),!0).forEach((function(e){h(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function h(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var g={data:function(){return{Province:["请选择省份"],city:[{name:"请选择城市"}],area:[{name:"请选择区"}],grade:[],school:[{name:"请先选择学校"}],location:[],subject:[],index:0,index1:0,index2:0,g_num:0,s_num:0,s_num1:0,class_id:"",name:"",phone:"",email:"",type:4,token:"",userInfo:{},openid:""}},onLoad:function(){t.getStorageSync("userInfo").token&&(this.token=t.getStorageSync("userInfo").token),3==t.getStorageSync("type")&&(this.type=t.getStorageSync("type")),this.openid=t.getStorageSync("openid"),this.get_location_list(),this.get_grade(),this.get_subject()},methods:d(d({},(0,i.mapMutations)(["login","set_type"])),{},{tijiao:function(e){var n=this;this.userInfo=e.detail.userInfo;var i=t.getStorageSync("unionid");if(0!=this.s_num)if(3==this.type){if(0==this.s_num1)return void t.showToast({title:"请选择科目！",icon:"none"});var o={province_id:this.Province[this.index].value,city_id:this.city[this.index1].value,area_id:this.area[this.index2].value,school_id:this.school[this.s_num].id,subject_id:this.subject[this.s_num1].id,true_name:this.name,mobile:t.getStorageSync("mobile"),openid:t.getStorageSync("openid"),nickName:this.userInfo.nickName,avatar:this.userInfo.avatarUrl,gender:this.userInfo.gender,token:this.token,unionid:i};this.$api.teacher_bind_info(o).then((function(e){console.log(e),200==e.code?(n.login(e.data),t.setStorage({key:"userInfo",data:e.data}),t.setStorage({key:"type",data:3}),setTimeout((function(){t.reLaunch({url:"/pages/index/index"})}),1e3)):t.showToast({title:e.msg,icon:"none"})}))}else{if(0==this.g_num)return void t.showToast({title:"请选择年级！",icon:"none"});var a={province_id:this.Province[this.index].value,city_id:this.city[this.index1].value,area_id:this.area[this.index2].value,grade_ids:this.grade[this.g_num].grade_id,school_id:this.school[this.s_num].id,true_name:this.name,openid:t.getStorageSync("openid"),user_name:this.userInfo.nickName,avatar:this.userInfo.avatarUrl,gender:this.userInfo.gender,unionid:i};console.log(a),this.$api.bind_info(a).then((function(e){console.log(e),n.login(e.data),200==e.code?(n.login(e.data),t.setStorage({key:"is_vip",data:e.data.is_vip}),t.setStorage({key:"userInfo",data:e.data}),t.setStorage({key:"type",data:4}),setTimeout((function(){e.data.token&&t.reLaunch({url:"/pages/index/index"})}),1e3)):t.showToast({title:e.msg,icon:"none"})}))}else t.showToast({title:"请选择学校！",icon:"none"})},getschool:function(){var t=this,e={province_id:this.Province[this.index].value,city_id:this.city[this.index1].value,area_id:this.area[this.index2].value,token:this.token};this.$api.get_school(e).then((function(e){console.log(e),0==e.data.length?t.school=[{name:"该省市区没有学校"}]:t.school=[{name:"请选择学校"}].concat(o(e.data))}))},get_grade:function(){var e=this;4==t.getStorageSync("type")&&this.$api.get_grade({token:this.token}).then((function(t){console.log(t),e.grade=[{name:"请选择年级"}].concat(o(t.data.grade_list))}))},get_subject:function(){var e=this;3==t.getStorageSync("type")&&this.$api.subject({token:this.token}).then((function(t){console.log("科目",t.data),e.subject=[{title:"请选择科目"}].concat(o(t.data))}))},get_location_list:function(){var t=this;this.$api.get_location_list({token:this.token}).then((function(e){console.log(e),t.location=e.data,t.Province=[{name:"请选择省"}].concat(o(e.data[0]))}))},bindPickerChange:function(t){console.log("picker发送选择改变，携带值为",t.target.value),console.log(this.Province[t.target.value].value),this.city=[{name:"请选择市"}],this.index1=0,this.area=[{name:"请选择区"}],this.index2=0;var e=this.Province[t.target.value].value;this.index=t.target.value;var n=this.location[1];for(var i in n)n[i].parent_id==e&&this.city.push(n[i])},bindPickerChange1:function(t){this.area=[{name:"请选择区"}],this.index2=0,console.log("picker发送选择改变，携带值为",t.target.value),this.index1=t.target.value,console.log(this.city[t.target.value].value);var e=this.city[t.target.value].value;this.index1=t.target.value;var n=this.location[2];for(var i in n)n[i].parent_id==e&&this.area.push(n[i])},bindPickerChange2:function(t){console.log("picker发送选择改变，携带值为",t.target.value),this.index2=t.target.value,console.log(this.area[t.target.value].value),this.getschool()},change4:function(t){console.log(t),this.g_num=t.detail.value},change:function(t){console.log(t),this.s_num=t.detail.value},changeSub:function(t){console.log(t),this.s_num1=t.detail.value}})};e.default=g}).call(this,n("543d")["default"])}},[["8789","common/runtime","common/vendor"]]]);