(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/person/vip"],{1657:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e=getApp(),o={data:function(){return{userInfo:{},info:{},price:0,is_discount:1,is_vip:0,tpmid:"",platform:"",pay_type:"wxpay"}},onLoad:function(){this.token=t.getStorageSync("userInfo").token,this.userInfo=t.getStorageSync("userInfo"),this.price=e.globalData.settings.vip_money,this.tpmid=e.globalData.settings.tmpid,console.log("this.tpmid",this.tpmid),this.platform=e.globalData.systemInfo.platform,"ios"==this.platform?t.setNavigationBarTitle({title:"会员特权"}):t.setNavigationBarTitle({title:"开通会员"})},onShow:function(){this.get_info()},methods:{get_info:function(){var t=this;this.$api.vip_info({token:this.token}).then((function(n){console.log(n),t.info=n.data,n.data.vip_money==t.price&&(t.is_discount=0)}))},pay:function(){var n=this;t.requestSubscribeMessage({tmplIds:this.tpmid.vip_notice,complete:function(t){n.login_pay()},success:function(t){},fail:function(t){}})},login_pays:function(){var n=this;this.$api.get_app_pay({type:this.pay_type}).then((function(e){console.log(e),200!=e.code?t.showModal({title:"温馨提示",content:e.msg,showCancel:!1}):t.requestPayment({provider:n.pay_type,orderInfo:e.data,success:function(t){console.log("success:"+JSON.stringify(t))},fail:function(t){console.log("fail:"+JSON.stringify(t))}})}))},login_pay:function(){this.$api.app_pay({platform:e.globalData.systemInfo.platform}).then((function(n){if(200!=n.code)t.showModal({title:"温馨提示",content:n.msg,showCancel:!1});else{var e=n.data.wx_pay;t.requestPayment({provider:"wxpay",timeStamp:e.timeStamp,nonceStr:e.nonceStr,package:e.package,signType:"MD5",paySign:e.paySign,success:function(n){console.log(n),t.setStorage({key:"is_vip",data:1})},fail:function(t){console.log(t)}})}}))}}};n.default=o}).call(this,e("543d")["default"])},"595b":function(t,n,e){"use strict";var o=e("5d8c"),i=e.n(o);i.a},"5d8c":function(t,n,e){},"8cac":function(t,n,e){"use strict";(function(t){e("f6c3"),e("921b");o(e("66fd"));var n=o(e("994f"));function o(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},"994f":function(t,n,e){"use strict";e.r(n);var o=e("bee0"),i=e("f6dc");for(var a in i)"default"!==a&&function(t){e.d(n,t,(function(){return i[t]}))}(a);e("595b");var s,c=e("f0c5"),f=Object(c["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],s);n["default"]=f.exports},bee0:function(t,n,e){"use strict";var o;e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return o}));var i=function(){var t=this,n=t.$createElement;t._self._c},a=[]},f6dc:function(t,n,e){"use strict";e.r(n);var o=e("1657"),i=e.n(o);for(var a in o)"default"!==a&&function(t){e.d(n,t,(function(){return o[t]}))}(a);n["default"]=i.a}},[["8cac","common/runtime","common/vendor"]]]);