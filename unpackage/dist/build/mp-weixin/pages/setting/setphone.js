(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/setting/setphone"],{1701:function(t,e,o){},"2d60":function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o={data:function(){return{codeStr:"获取验证码",codeStatus:!0,codeStr2:"获取验证码",codeStatus2:!0,old_mobile:"",new_mobile:"",password:"",password2:"",token:"",code1:"",code2:""}},onLoad:function(){t.getStorageSync("userInfo").token&&(this.token=t.getStorageSync("userInfo").token),this.old_mobile=t.getStorageSync("userInfo").display.mobile},methods:{baocun:function(){var e=/^1[2|3|4|5|8]\d{9,}/;if(e.test(this.new_mobile))if(this.code2){var o={token:this.token,old_mobile:this.old_mobile,new_mobile:this.new_mobile,verify_code:this.code2};this.$api.change_mobile(o).then((function(e){console.log(e),200==e.code&&(t.showToast({title:"修改成功！"}),setTimeout((function(){t.navigateBack()}),1e3))}))}else t.showToast({title:"请输入验证码",icon:"none"});else t.showToast({title:"请输入正确的手机号",icon:"none"})},del:function(t){1==t?this.name="":2==t?this.password="":3==t&&(this.password2="")},getcode2:function(){var e=this;if(this.codeStatus2){this.codeStatus2=!1,this.$api.get_verify_code({token:this.token,type:"update",mobile:this.new_mobile}),t.showToast({title:"发送成功,请查看手机！",icon:"none"});var o=60,n=setInterval((function(){o--,e.codeStr2=o+"S",o<=0&&(e.codeStatus2=!0,e.codeStr2="获取验证码",clearInterval(n))}),1e3)}}}};e.default=o}).call(this,o("543d")["default"])},"3c51":function(t,e,o){"use strict";var n;o.d(e,"b",(function(){return i})),o.d(e,"c",(function(){return a})),o.d(e,"a",(function(){return n}));var i=function(){var t=this,e=t.$createElement;t._self._c},a=[]},"55e9":function(t,e,o){"use strict";(function(t){o("022d"),o("921b");n(o("66fd"));var e=n(o("a935"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,o("543d")["createPage"])},"7d3a":function(t,e,o){"use strict";o.r(e);var n=o("2d60"),i=o.n(n);for(var a in n)"default"!==a&&function(t){o.d(e,t,(function(){return n[t]}))}(a);e["default"]=i.a},a935:function(t,e,o){"use strict";o.r(e);var n=o("3c51"),i=o("7d3a");for(var a in i)"default"!==a&&function(t){o.d(e,t,(function(){return i[t]}))}(a);o("d505");var c,s=o("f0c5"),u=Object(s["a"])(i["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],c);e["default"]=u.exports},d505:function(t,e,o){"use strict";var n=o("1701"),i=o.n(n);i.a}},[["55e9","common/runtime","common/vendor"]]]);