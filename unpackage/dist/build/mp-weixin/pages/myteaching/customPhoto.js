(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/myteaching/customPhoto"],{"06f4":function(t,e,o){"use strict";o.r(e);var n=o("a4c5"),s=o("29bc");for(var a in s)"default"!==a&&function(t){o.d(e,t,(function(){return s[t]}))}(a);o("4507");var i,c=o("f0c5"),r=Object(c["a"])(s["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],i);e["default"]=r.exports},"29bc":function(t,e,o){"use strict";o.r(e);var n=o("738f"),s=o.n(n);for(var a in n)"default"!==a&&function(t){o.d(e,t,(function(){return n[t]}))}(a);e["default"]=s.a},"41d8":function(t,e,o){},4507:function(t,e,o){"use strict";var n=o("41d8"),s=o.n(n);s.a},"738f":function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=function(){o.e("components/uni-popup/uni-popup").then(function(){return resolve(o("4b8f"))}.bind(null,o)).catch(o.oe)},s=function(){o.e("components/cmd-progress/cmd-progress").then(function(){return resolve(o("6265"))}.bind(null,o)).catch(o.oe)},a={components:{uniPopup:n,cmdProgress:s},data:function(){return{devicePosition:"back",token:"",textbook_id:"",choosePage:"",title:"",subject_name:"",isCamera:!1,isflash:"auto",isflashBool:!1,isphbox:!0,pic:"",flag:!0,uploadTask:null,percent:0,iscmdProgress:!1}},onLoad:function(e){this.textbook_id=e.textbook_id,this.title=e.title,this.subject_name=e.subject_name,console.log("onLoadoption",e),t.getStorageSync("userInfo").token&&(this.token=t.getStorageSync("userInfo").token)},methods:{speedprogress:function(){var t=this;this.uploadTask.onProgressUpdate((function(e){console.log("上传进度"+e.progress),t.percent=e.progress}))},toBack:function(){t.navigateBack({delta:1})},FlashlightClick:function(){this.isflashBool?(this.isflashBool=!1,this.isflash="off",console.log("关闭了闪光灯")):(this.isflashBool=!0,this.isflash="on",console.log("打开了闪光灯"))},search_exercises:function(){var e=this;this.$api.search_exercises({textbook_id:this.textbook_id,page:this.choosePage,pic:this.pic,token:this.token}).then((function(o){console.log("res",o),200==o.code?t.redirectTo({url:"/pages/myPaper/seePapers?status=photo&listData="+encodeURIComponent(JSON.stringify(o.data))+"&title="+e.title+"&subject_name="+e.subject_name}):t.showToast({title:o.msg,icon:"none"}),e.flag=!1,e.percent=0,e.iscmdProgress=!1}))},albumhandleClick:function(){var e=this;t.chooseImage({count:1,sizeType:["original","compressed"],sourceType:["album"],success:function(o){console.log("res.tempImagePath",o.tempFilePaths[0]),t.navigateTo({url:"/pages/myteaching/cropperPhoto?ImagePath="+o.tempFilePaths[0]+"&textbook_id="+e.textbook_id+"&title="+e.title+"&subject_name="+e.subject_name,success:function(){console.log("跳转图片裁剪页面",o.tempFilePaths[0])}})}})},opensetting:function(e){console.log("opensetting",e),e.target.authSetting["scope.camera"]?this.isCamera=!1:this.isCamera=!0,t.navigateBack()},handleCameraError:function(){t.showToast({title:"您拒绝使用摄像头",icon:"none"}),this.isCamera=!0},takePhoto:function(){var e=this;console.log("关拍照相册操作按钮","开进度条"),t.createCameraContext().takePhoto({quality:"high",success:function(o){console.log("res.tempImagePath",o),t.navigateTo({url:"/pages/myteaching/cropperPhoto?ImagePath="+o.tempImagePath+"&textbook_id="+e.textbook_id+"&title="+e.title+"&subject_name="+e.subject_name,success:function(){console.log("跳转图片裁剪页面",o.tempImagePath)}})},fail:function(e){t.showToast({title:"拍摄照片失败",icon:"none"}),t.navigateBack()}})}}};e.default=a}).call(this,o("543d")["default"])},a4c5:function(t,e,o){"use strict";var n;o.d(e,"b",(function(){return s})),o.d(e,"c",(function(){return a})),o.d(e,"a",(function(){return n}));var s=function(){var t=this,e=t.$createElement;t._self._c},a=[]},ad34:function(t,e,o){"use strict";(function(t){o("022d"),o("921b");n(o("66fd"));var e=n(o("06f4"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,o("543d")["createPage"])}},[["ad34","common/runtime","common/vendor"]]]);