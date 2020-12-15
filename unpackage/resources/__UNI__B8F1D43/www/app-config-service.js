
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/login/login","pages/errorBook/errorBook","pages/knowledgeBase/knowledgeBase","pages/person/person","pages/login/register","pages/login/bindinfo","pages/login/agreement","pages/login/bind_info","pages/login/changePassword","pages/person/forgetPassword","pages/myteaching/myteaching","pages/myteaching/topicSelection","pages/myteaching/contentReference","pages/myPaper/myPaper","pages/myPaper/seePapers","pages/myPaper/seePaperss","pages/learningReport/learningReport","pages/person/user","pages/mall/pay","pages/mall/iostip","pages/person/addClass","pages/myteaching/mulu","pages/j-shijuan/j-shijuan","pages/learningReport/seeKnowledge","pages/person/bindClassID","pages/person/classInfo","pages/person/ListStudents","pages/person/setUser","pages/learningReport/j-xueqingbaogao","pages/person/feedback","pages/mall/index","pages/person/about","pages/setting/setphone","pages/person/vip","pages/myPaper/new_paper","pages/login/share","pages/login/share_ter","pages/knowledgeBase/watchExplane","pages/person/mineUploadPaper","pages/person/jifenRecord","pages/myteaching/myteachingPhoto","pages/myteaching/customPhoto","pages/myteaching/customPhotos","pages/myteaching/cropperPhoto","pages/learningReport/learningReport_detail"],"window":{"navigationBarTextStyle":"white","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#e50304","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#999999","selectedColor":"#e50304","borderStyle":"white","backgroundColor":"#ffffff","list":[{"pagePath":"pages/index/index","iconPath":"static/imgs/icon/shouye1.png","selectedIconPath":"static/imgs/icon/shouye.png","text":"首页"},{"pagePath":"pages/errorBook/errorBook","iconPath":"static/imgs/icon/cuotiben1.png","selectedIconPath":"static/imgs/icon/cuotiben.png","text":"错题本"},{"pagePath":"pages/knowledgeBase/knowledgeBase","iconPath":"static/imgs/icon/zhishiku1.png","selectedIconPath":"static/imgs/icon/zhishiku.png","text":"知识库"},{"pagePath":"pages/person/person","iconPath":"static/imgs/icon/wode1.png","selectedIconPath":"static/imgs/icon/wode.png","text":"我的"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"AI错题宝","compilerVersion":"2.9.8","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"首页"}},{"path":"/pages/login/login","meta":{},"window":{"navigationBarTitleText":"登录"}},{"path":"/pages/errorBook/errorBook","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"错题本"}},{"path":"/pages/knowledgeBase/knowledgeBase","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"知识库"}},{"path":"/pages/person/person","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"个人中心"}},{"path":"/pages/login/register","meta":{},"window":{"navigationBarTitleText":"注册错题宝"}},{"path":"/pages/login/bindinfo","meta":{},"window":{"navigationBarTitleText":"绑定个人信息"}},{"path":"/pages/login/agreement","meta":{},"window":{"navigationBarTitleText":"协议"}},{"path":"/pages/login/bind_info","meta":{},"window":{"navigationBarTitleText":"绑定个人信息"}},{"path":"/pages/login/changePassword","meta":{},"window":{"navigationBarTitleText":"忘记密码"}},{"path":"/pages/person/forgetPassword","meta":{},"window":{"navigationBarTitleText":"修改密码"}},{"path":"/pages/myteaching/myteaching","meta":{},"window":{"navigationBarTitleText":"选择教辅"}},{"path":"/pages/myteaching/topicSelection","meta":{},"window":{"navigationBarTitleText":"题目选择"}},{"path":"/pages/myteaching/contentReference","meta":{},"window":{"navigationBarTitleText":"我的教辅"}},{"path":"/pages/myPaper/myPaper","meta":{},"window":{"navigationBarTitleText":"校本试卷"}},{"path":"/pages/myPaper/seePapers","meta":{},"window":{"navigationBarTitleText":"试卷内容"}},{"path":"/pages/myPaper/seePaperss","meta":{},"window":{"navigationBarTitleText":"试卷内容"}},{"path":"/pages/learningReport/learningReport","meta":{},"window":{"navigationBarTitleText":"学情报告"}},{"path":"/pages/person/user","meta":{},"window":{"navigationBarTitleText":"修改资料"}},{"path":"/pages/mall/pay","meta":{},"window":{"navigationBarTitleText":"支付页面"}},{"path":"/pages/mall/iostip","meta":{},"window":{"navigationBarTitleText":"打开公众号"}},{"path":"/pages/person/addClass","meta":{},"window":{"navigationBarTitleText":"创建班级"}},{"path":"/pages/myteaching/mulu","meta":{},"window":{"navigationBarTitleText":"教辅目录"}},{"path":"/pages/j-shijuan/j-shijuan","meta":{},"window":{"navigationBarTitleText":"试卷"}},{"path":"/pages/learningReport/seeKnowledge","meta":{},"window":{"navigationBarTitleText":"错题知识点"}},{"path":"/pages/person/bindClassID","meta":{},"window":{"navigationBarTitleText":"绑定班级"}},{"path":"/pages/person/classInfo","meta":{},"window":{"navigationBarTitleText":"我的班级"}},{"path":"/pages/person/ListStudents","meta":{},"window":{"navigationBarTitleText":"班级成员"}},{"path":"/pages/person/setUser","meta":{},"window":{"navigationBarTitleText":"编辑"}},{"path":"/pages/learningReport/j-xueqingbaogao","meta":{},"window":{"navigationBarTitleText":"学情报告"}},{"path":"/pages/person/feedback","meta":{},"window":{"navigationBarTitleText":"意见反馈"}},{"path":"/pages/mall/index","meta":{},"window":{"navigationBarTitleText":"会员商城","navigationStyle":"custom"}},{"path":"/pages/person/about","meta":{},"window":{"navigationBarTitleText":"关于我们"}},{"path":"/pages/setting/setphone","meta":{},"window":{"navigationBarTitleText":"更换手机号"}},{"path":"/pages/person/vip","meta":{},"window":{"navigationBarTitleText":"开通会员"}},{"path":"/pages/myPaper/new_paper","meta":{},"window":{"navigationBarTitleText":"名校资源"}},{"path":"/pages/login/share","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/login/share_ter","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/knowledgeBase/watchExplane","meta":{},"window":{"navigationBarTitleText":"查看解析"}},{"path":"/pages/person/mineUploadPaper","meta":{},"window":{"navigationBarTitleText":"我上传的试卷"}},{"path":"/pages/person/jifenRecord","meta":{},"window":{"navigationBarTitleText":"积分记录"}},{"path":"/pages/myteaching/myteachingPhoto","meta":{},"window":{"navigationBarTitleText":"拍照识题"}},{"path":"/pages/myteaching/customPhoto","meta":{},"window":{"navigationBarTitleText":"拍照识题"}},{"path":"/pages/myteaching/customPhotos","meta":{},"window":{"navigationBarTitleText":"拍照识题"}},{"path":"/pages/myteaching/cropperPhoto","meta":{},"window":{"navigationBarTitleText":"图片剪裁"}},{"path":"/pages/learningReport/learningReport_detail","meta":{},"window":{"navigationBarTitleText":"学情报告"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
