(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/login"],{"0db6":function(e,n,t){"use strict";t.r(n);var o=t("6ad9"),i=t.n(o);for(var a in o)"default"!==a&&function(e){t.d(n,e,(function(){return o[e]}))}(a);n["default"]=i.a},2855:function(e,n,t){"use strict";t.r(n);var o=t("5a5b"),i=t("0db6");for(var a in i)"default"!==a&&function(e){t.d(n,e,(function(){return i[e]}))}(a);t("bd71");var s,r=t("f0c5"),u=Object(r["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],s);n["default"]=u.exports},"5a5b":function(e,n,t){"use strict";t.d(n,"b",(function(){return i})),t.d(n,"c",(function(){return a})),t.d(n,"a",(function(){return o}));var o={uniPopup:function(){return t.e("components/uni-popup/uni-popup").then(t.bind(null,"4b8f"))}},i=function(){var e=this,n=e.$createElement;e._self._c},a=[]},"6ad9":function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=t("2f62");function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){s(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var r=function(){t.e("components/uni-popup/uni-popup").then(function(){return resolve(t("4b8f"))}.bind(null,t)).catch(t.oe)},u={components:{uniPopup:r},data:function(){return{account:"",password:"",loginmode:4,type:4,user_id:"",userInfo:{},sessionkey:"",openid:"",code:""}},onLoad:function(){},methods:a(a({},(0,o.mapMutations)(["login","set_type"])),{},{setlogin:function(n){this.type=n,this.loginmode=n,this.set_type(n),e.setStorage({key:"type",data:n})},bindgetuserinfo:function(n,t){var o=this;e.login({success:function(i){o.code=i.code,console.log(o.code),e.setStorage({key:"type",data:t}),console.log("bindgetuserinfo",n),o.userInfo=n.detail.userInfo,e.setStorageSync("info",n.detail.userInfo),3==t?(console.log(o.userInfo),o.$api.teacher_login({code:o.code}).then((function(n){var t;o.sessionkey=null===(t=n.data)||void 0===t?void 0:t.session_key,o.openid=n.data.openid,e.setStorage({key:"unionid",data:n.data.unionid}),e.setStorage({key:"openid",data:o.openid}),console.log("res.data.data ",n.data),200==n.code?(o.login(n.data),e.setStorage({key:"userInfo",data:n.data}),e.setStorage({key:"type",data:3}),e.reLaunch({url:"/pages/index/index"})):(e.setStorage({key:"openid",data:n.data.openid}),o.$refs.popup.open())}))):(console.log("学生登录",o.userInfo,o.code),o.$api.student_login({code:o.code}).then((function(n){var t;o.sessionkey=null===(t=n.data)||void 0===t?void 0:t.session_key,o.openid=n.data.openid,e.setStorage({key:"unionid",data:n.data.unionid}),e.setStorage({key:"openid",data:o.openid}),console.log("res",n),200==n.code?(o.login(n.data),e.setStorage({key:"is_vip",data:n.data.is_vip}),e.setStorage({key:"userInfo",data:n.data}),e.setStorage({key:"type",data:4}),e.reLaunch({url:"/pages/index/index"})):300==n.code?e.showToast({title:n.msg,icon:"none"}):e.navigateTo({url:"/pages/login/bindinfo"})})))}})},getphone:function(n){var t=this;console.log(n);var o={code:this.code,iv:n.detail.iv,encryptedData:n.detail.encryptedData,sessionkey:this.sessionkey,openid:this.openid,user_name:this.userInfo.nickName,avatar:this.userInfo.avatarUrl,gender:this.userInfo.gender};this.$api.get_mobile(o).then((function(n){200==n.code?(t.login(n.data),e.reLaunch({url:"/pages/index/index"})):300==n.code?(e.setStorageSync("mobile",n.data.mobile),e.reLaunch({url:"/pages/login/bindinfo"})):e.showToast({title:n.msg,icon:"none"}),console.log(n)}))},login2:function(){var n=this,t=this.loginmode;e.setStorage({key:"type",data:t});var o={user_name:this.account,password:this.password},i=this.$api.login(o);3==t&&(i=this.$api.teacher_login(o)),i.then((function(t){console.log(t),200==t.code?(n.login(t.data),e.showToast({title:"登录成功"}),setTimeout((function(){e.switchTab({url:"/pages/index/index"})}),500)):e.showToast({title:t.msg,icon:"none"})}))},getuserinfo:function(){},toReg:function(){e.navigateTo({url:"/pages/login/register"})},topassword:function(){e.navigateTo({url:"/pages/login/changePassword"})},del:function(e){1==e?this.account="":this.password=""}})};n.default=u}).call(this,t("543d")["default"])},"84b1":function(e,n,t){},bd71:function(e,n,t){"use strict";var o=t("84b1"),i=t.n(o);i.a},dc05:function(e,n,t){"use strict";(function(e){t("022d"),t("921b");o(t("66fd"));var n=o(t("2855"));function o(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("543d")["createPage"])}},[["dc05","common/runtime","common/vendor"]]]);