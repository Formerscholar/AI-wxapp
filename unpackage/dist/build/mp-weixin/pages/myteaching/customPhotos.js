(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/myteaching/customPhotos"],{2414:function(e,t,o){"use strict";o.r(t);var n=o("43b2"),s=o("6000");for(var i in s)"default"!==i&&function(e){o.d(t,e,(function(){return s[e]}))}(i);o("ebcc");var a,c=o("f0c5"),r=Object(c["a"])(s["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],a);t["default"]=r.exports},"43b2":function(e,t,o){"use strict";var n;o.d(t,"b",(function(){return s})),o.d(t,"c",(function(){return i})),o.d(t,"a",(function(){return n}));var s=function(){var e=this,t=e.$createElement;e._self._c},i=[]},"5e56":function(e,t,o){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=function(){o.e("components/uni-popup/uni-popup").then(function(){return resolve(o("4b8f"))}.bind(null,o)).catch(o.oe)},s=function(){o.e("components/cmd-progress/cmd-progress").then(function(){return resolve(o("6265"))}.bind(null,o)).catch(o.oe)},i={components:{uniPopup:n,cmdProgress:s},data:function(){return{devicePosition:"back",token:"",textbook_id:"",choosePage:"",title:"",subject_name:"",isCamera:!1,isflash:"auto",isflashBool:!1,isphbox:!0,pic:"",flag:!0,uploadTask:null,percent:0,iscmdProgress:!1,pics:""}},onLoad:function(t){this.textbook_id=t.textbook_id,this.choosePage=t.choosePage,this.title=t.title,this.subject_name=t.subject_name,console.log("onLoadoption",t),e.getStorageSync("userInfo").token&&(this.token=e.getStorageSync("userInfo").token)},methods:{speedprogress:function(){var e=this;this.uploadTask.onProgressUpdate((function(t){console.log("上传进度"+t.progress),e.percent=t.progress}))},toBack:function(){this.isphbox=!0},FlashlightClick:function(){this.isflashBool?(this.isflashBool=!1,this.isflash="off",console.log("关闭了闪光灯")):(this.isflashBool=!0,this.isflash="on",console.log("打开了闪光灯"))},search_exercises:function(){var t=this;this.$api.search_exercises({textbook_id:this.textbook_id,page:this.choosePage,pic:this.pic,token:this.token}).then((function(o){console.log("res",o),200==o.code?e.redirectTo({url:"/pages/myPaper/seePapers?status=photo&listData="+encodeURIComponent(JSON.stringify(o.data))+"&title="+t.title+"&subject_name="+t.subject_name}):e.showToast({title:o.msg,icon:"none"}),t.flag=!1,t.percent=0}))},albumhandleClick:function(){var t=this;e.chooseImage({count:1,sizeType:["original","compressed"],sourceType:["album"],success:function(o){t.base64({url:o.tempFilePaths[0],type:"jpg"}).then((function(e){console.log("canvasToTempFilePath",e),t.isphbox=!1,t.flag=!0,t.pic=e,t.search_exercises()})).catch((function(t){e.showToast({title:"上传图片失败",icon:"none"}),e.navigateBack()}))}})},opensetting:function(t){console.log("opensetting",t),t.target.authSetting["scope.camera"]?this.isCamera=!1:this.isCamera=!0,e.navigateBack()},handleCameraError:function(){e.showToast({title:"您拒绝使用摄像头",icon:"none"}),this.isCamera=!0},base64:function(e){var t=e.url,o=e.type;return new Promise((function(e,n){wx.getFileSystemManager().readFile({filePath:t,encoding:"base64",success:function(t){e("data:image/"+o.toLocaleLowerCase()+";base64,"+t.data)},fail:function(e){return n(e.errMsg)}})}))},takePhoto:function(){var t=this;console.log("关拍照相册操作按钮","开进度条"),e.createCameraContext().takePhoto({quality:"high",success:function(o){t.base64({url:o.tempImagePath,type:"jpg"}).then((function(e){console.log("canvasToTempFilePath",e),t.isphbox=!1,t.flag=!0,t.pic=e,t.search_exercises()})).catch((function(t){e.showToast({title:"上传图片失败",icon:"none"}),e.navigateBack()}))},fail:function(t){e.showToast({title:"拍摄照片失败",icon:"none"}),e.navigateBack()}})}}};t.default=i}).call(this,o("543d")["default"])},6e3:function(e,t,o){"use strict";o.r(t);var n=o("5e56"),s=o.n(n);for(var i in n)"default"!==i&&function(e){o.d(t,e,(function(){return n[e]}))}(i);t["default"]=s.a},"9cd5":function(e,t,o){"use strict";(function(e){o("022d"),o("921b");n(o("66fd"));var t=n(o("2414"));function n(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,o("543d")["createPage"])},ebcc:function(e,t,o){"use strict";var n=o("f271"),s=o.n(n);s.a},f271:function(e,t,o){}},[["9cd5","common/runtime","common/vendor"]]]);