(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/learningReport/j-xueqingbaogao"],{"066c":function(e,t,i){"use strict";i.r(t);var a=i("6993"),n=i.n(a);for(var o in a)"default"!==o&&function(e){i.d(t,e,(function(){return a[e]}))}(o);t["default"]=n.a},6993:function(e,t,i){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=n(i("da4b"));function n(e){return e&&e.__esModule?e:{default:e}}function o(e){return u(e)||c(e)||r(e)||s()}function s(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function r(e,t){if(e){if("string"===typeof e)return l(e,t);var i=Object.prototype.toString.call(e).slice(8,-1);return"Object"===i&&e.constructor&&(i=e.constructor.name),"Map"===i||"Set"===i?Array.from(e):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?l(e,t):void 0}}function c(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}function u(e){if(Array.isArray(e))return l(e)}function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,a=new Array(t);i<t;i++)a[i]=e[i];return a}var h,_=function(){i.e("components/uni-popup/uni-popup").then(function(){return resolve(i("768a"))}.bind(null,i)).catch(i.oe)},p=null,d={components:{uniPopup:_},data:function(){return{pieData:[],cWidth:e.upx2px(750),cHeight:e.upx2px(500),pixelRatio:1,serverData:"",token:"",class_list:[],error_count:0,count_list:[],team_id:"",time:"2020-06-04",time2:"2020-06-04",dateList:[{time:"近一周",dateStaus:!0},{time:"近一个月",dateStaus:!1},{time:"近一年",dateStaus:!1}],it:"day",msg:"该班级暂无错题!",Pie:{series:[]},exercises_id:"",exercises_list:[],page_change:1,size_change:5,update:!0,page:1,is_more:1,type:3,same_type:[]}},onReachBottom:function(){this.is_more&&(this.page++,this.get_hot_title())},onLoad:function(){h=this,e.getStorageSync("token")&&(this.token=e.getStorageSync("token")),this.selectDate(0),this.get_class(),this.get_hot_title()},methods:{changeStyle:function(e){return e=e.replace(new RegExp("<p","gi"),'<p style="color: #000;position:relative"'),e=e.replace(new RegExp("<img","gi"),'<img style="max-width:95%;vertical-align: middle;width:auto;"'),e},getDateRange:function(e,t,i){var a,n=864e5,o=[];return 1==i?(a=new Date(e.getTime()-t*n),o.push(this.formateDate(a)),o.push(this.formateDate(e))):(a=new Date(e.getTime()+t*n),o.push(this.formateDate(e)),o.push(this.formateDate(a))),o},formateDate:function(e){var t=e.getFullYear(),i=e.getMonth()+1,a=e.getDate();return i<10&&(i="0"+i),a<10&&(a="0"+a),t+"-"+i+"-"+a},selectDate:function(e){var t=this,i=new Date;this.dateList.forEach((function(a,n,o){if(e==n)if(a.dateStaus=!0,0==e){t.it="day";var s=t.getDateRange(i,6,!0);t.time=s[0],t.time2=s[1]}else if(1==e){t.it="day";var r=t.getDateRange(i,30,!0);t.time=r[0],t.time2=r[1]}else{t.it="day";var c=t.getDateRange(i,365,!0);t.time=c[0],t.time2=c[1]}else a.dateStaus=!1})),this.get_baogao(),this.page=1,this.exercises_list=[],this.get_hot_title()},select_class:function(e){var t=this;this.class_list.forEach((function(i,a,n){t.class_list[e].status=e==a})),this.team_id=this.class_list[e].team_id,this.get_baogao(),this.page=1,this.exercises_list=[],this.get_hot_title()},get_class:function(){var e=this;this.$api.my_team_ids({token:this.token}).then((function(t){console.log(t),t.code,e.class_list=t.data,e.team_id=e.class_list[0].team_id,e.get_baogao(),e.page=1,e.exercises_list=[],e.get_hot_title()}))},get_baogao:function(){var e=this;e.$api.teacher_study_analysis({token:e.token,team_id:e.team_id,start_time:e.time,end_time:e.time2}).then((function(t){console.log(t),e.pieData=t.data.count_list,200==t.code?(null!=t.data?e.Pie.series=t.data:e.Pie.series=[],h.showPie("canvasPie",e.Pie)):(e.pieData=[],e.Pie.series=[],h.showPie("canvasPie",e.Pie))}))},showPie:function(t,i){p=new a.default({$this:h,canvasId:t,type:"pie",fontSize:11,legend:{show:!0},background:"#FFFFFF",pixelRatio:h.pixelRatio,series:i.series,animation:!0,width:h.cWidth*h.pixelRatio-e.upx2px(200)*h.pixelRatio,height:h.cHeight*h.pixelRatio,dataLabel:!0,extra:{pie:{lableWidth:15}}})},touchPie:function(e){p.showToolTip(e,{format:function(e){return e.name+":"+e.data}})},bindMultiPickerChange:function(e){console.log(e),this.time=e.detail.value,this.get_baogao(),this.page=1,this.exercises_list=[],this.get_hot_title()},bindMultiPickerChange2:function(e){console.log(e),this.time2=e.detail.value,this.get_baogao(),this.page=1,this.exercises_list=[],this.get_hot_title()},changeData:function(){this.page_change++,this.open()},jiexi:function(t){e.navigateTo({url:"/pages/knowledgeBase/watchExplane?id="+t})},get_hot_title:function(){var e=this;e.$api.hot_error_exercises({token:e.token,team_id:e.team_id,start_time:e.time,end_time:e.time2,page:e.page,page_size:5}).then((function(t){200==t.code&&(console.log("res",t),e.is_more=t.is_more,1==e.page?e.exercises_list=t.data:e.exercises_list=[].concat(o(e.exercises_list),o(t.data)))}))},open:function(t){var i=this;this.exercises_id=t;var a={token:this.token,exercises_id:t,page:this.page_change,size:this.size_change},n=this.$api.teacher_same_type(a);n.then((function(t){console.log(t),200==t.code?(i.same_type=t.data.exercises_list,i.$refs.popup.open()):e.showToast({title:t.msg,icon:"none"})}))},hiddenmodal:function(){this.$refs.popup.close()},join_error:function(e,t){var i=this,a=this.$api.teacher_join_error({token:this.token,exercises_id:t,is_vip:1});a.then((function(t){200==t.code&&(i.exercises_list[e].is_error?i.exercises_list[e].is_error=0:i.exercises_list[e].is_error=1),i.update=!1,i.update=!0}))},join_error2:function(e,t){var i=this,a=this.$api.teacher_join_error({token:this.token,exercises_id:t});a.then((function(t){200==t.code&&(i.same_type[e].is_error?i.same_type[e].is_error=0:i.same_type[e].is_error=1),i.update=!1,i.update=!0}))}}};t.default=d}).call(this,i("543d")["default"])},7001:function(e,t,i){"use strict";i.d(t,"b",(function(){return n})),i.d(t,"c",(function(){return o})),i.d(t,"a",(function(){return a}));var a={uniPopup:function(){return i.e("components/uni-popup/uni-popup").then(i.bind(null,"768a"))}},n=function(){var e=this,t=e.$createElement,i=(e._self._c,e.__map(e.exercises_list,(function(t,i){var a=e.__get_orig(t),n=e.changeStyle(t.content);return{$orig:a,m0:n}}))),a=e.__map(e.same_type,(function(t,i){var a=e.__get_orig(t),n=e.changeStyle(t.content);return{$orig:a,m1:n}}));e.$mp.data=Object.assign({},{$root:{l0:i,l1:a}})},o=[]},"822a":function(e,t,i){},a086:function(e,t,i){"use strict";i.r(t);var a=i("7001"),n=i("066c");for(var o in n)"default"!==o&&function(e){i.d(t,e,(function(){return n[e]}))}(o);i("a480");var s,r=i("f0c5"),c=Object(r["a"])(n["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],s);t["default"]=c.exports},a480:function(e,t,i){"use strict";var a=i("822a"),n=i.n(a);n.a},e473:function(e,t,i){"use strict";(function(e){i("2274");a(i("66fd"));var t=a(i("a086"));function a(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,i("543d")["createPage"])}},[["e473","common/runtime","common/vendor"]]]);