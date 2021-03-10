
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/cochain/cochain","pages/community/community","pages/discover/discover","pages/my/my","pages/loginIn/loginIn","pages/loginIn/register","pages/loginIn/forgetPwd","pages/sundry/serviceAgreement","pages/index/openUrl","pages/upLoadPopularize/upLoadPopularize","pages/sundry/popularizeAgreement","pages/my/person/personal","pages/my/person/changeNickName","pages/my/person/changeSex","pages/my/person/chengeSignature","pages/my/person/changeArea","pages/my/saveSetting/saveSetting","pages/my/saveSetting/changeLoginPwd","pages/my/saveSetting/payPassword/setPayPwd","pages/my/saveSetting/payPassword/changePayPwd","pages/my/saveSetting/payPassword/forgetPayPwd","pages/my/person/choiceCity","pages/my/system/system","pages/community/comCommunity","pages/community/comProject","pages/community/comNews"],"window":{"navigationBarBackgroundColor":"#140C1C","backgroundColor":"#140C1C"},"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"DPro","compilerVersion":"3.1.4","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true},"window":{"titleNView":false}},{"path":"/pages/cochain/cochain","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/community/community","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/discover/discover","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/my/my","meta":{},"window":{"titleNView":false}},{"path":"/pages/loginIn/loginIn","meta":{},"window":{"navigationBarTitleText":"登录","enablePullDownRefresh":false,"bounce":"none"}},{"path":"/pages/loginIn/register","meta":{},"window":{"navigationBarTitleText":"注册","enablePullDownRefresh":false,"titleNView":{"buttons":[{"color":"#999","colorPressed":"#999","float":"left","fontSize":"30rpx","fontSrc":"/static/iconfont/fonts/icomoon.ttf","text":""}]}}},{"path":"/pages/loginIn/forgetPwd","meta":{},"window":{"navigationBarTitleText":"忘记密码","enablePullDownRefresh":false,"titleNView":{"buttons":[{"color":"#999","colorPressed":"#999","float":"left","fontSize":"30rpx","fontSrc":"/static/iconfont/fonts/icomoon.ttf","text":""}]}}},{"path":"/pages/sundry/serviceAgreement","meta":{},"window":{"navigationBarTitleText":"用户注册及隐私协议","enablePullDownRefresh":false,"titleNView":{"buttons":[{"color":"#999","colorPressed":"#999","float":"left","fontSize":"30rpx","fontSrc":"/static/iconfont/fonts/icomoon.ttf","text":""}]}}},{"path":"/pages/index/openUrl","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"titleNView":{"buttons":[{"color":"#999","colorPressed":"#999","float":"left","fontSize":"30rpx","fontSrc":"/static/iconfont/fonts/icomoon.ttf","text":""}]}}},{"path":"/pages/upLoadPopularize/upLoadPopularize","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"titleNView":{"buttons":[{"color":"#999","colorPressed":"#999","float":"left","fontSize":"30rpx","fontSrc":"/static/iconfont/fonts/icomoon.ttf","text":""}]}}},{"path":"/pages/sundry/popularizeAgreement","meta":{},"window":{"navigationBarTitleText":"上传app合同协议","enablePullDownRefresh":false,"titleNView":{"buttons":[{"color":"#999","colorPressed":"#999","float":"left","fontSize":"30rpx","fontSrc":"/static/iconfont/fonts/icomoon.ttf","text":""}]}}},{"path":"/pages/my/person/personal","meta":{},"window":{"navigationBarTitleText":"个人资料","enablePullDownRefresh":false,"titleNView":{"buttons":[{"color":"#999","colorPressed":"#999","float":"left","fontSize":"30rpx","fontSrc":"/static/iconfont/fonts/icomoon.ttf","text":""}]}}},{"path":"/pages/my/person/changeNickName","meta":{},"window":{"navigationBarTitleText":"更改昵称","enablePullDownRefresh":false,"titleNView":{"buttons":[{"color":"#999","colorPressed":"#999","float":"left","fontSize":"30rpx","fontSrc":"/static/iconfont/fonts/icomoon.ttf","text":""}]}}},{"path":"/pages/my/person/changeSex","meta":{},"window":{"navigationBarTitleText":"更改性别","enablePullDownRefresh":false,"titleNView":{"buttons":[{"color":"#999","colorPressed":"#999","float":"left","fontSize":"30rpx","fontSrc":"/static/iconfont/fonts/icomoon.ttf","text":""}]}}},{"path":"/pages/my/person/chengeSignature","meta":{},"window":{"navigationBarTitleText":"设置个性签名","enablePullDownRefresh":false,"titleNView":{"buttons":[{"color":"#999","colorPressed":"#999","float":"left","fontSize":"30rpx","fontSrc":"/static/iconfont/fonts/icomoon.ttf","text":""}]}}},{"path":"/pages/my/person/changeArea","meta":{},"window":{"navigationBarTitleText":"设置地区","enablePullDownRefresh":false,"titleNView":{"buttons":[{"color":"#999","colorPressed":"#999","float":"left","fontSize":"30rpx","fontSrc":"/static/iconfont/fonts/icomoon.ttf","text":""}]}}},{"path":"/pages/my/saveSetting/saveSetting","meta":{},"window":{"navigationBarTitleText":"安全设置","enablePullDownRefresh":false,"titleNView":{"buttons":[{"color":"#999","colorPressed":"#999","float":"left","fontSize":"30rpx","fontSrc":"/static/iconfont/fonts/icomoon.ttf","text":""}]}}},{"path":"/pages/my/saveSetting/changeLoginPwd","meta":{},"window":{"navigationBarTitleText":"修改登录密码","enablePullDownRefresh":false,"titleNView":{"buttons":[{"color":"#999","colorPressed":"#999","float":"left","fontSize":"30rpx","fontSrc":"/static/iconfont/fonts/icomoon.ttf","text":""}]}}},{"path":"/pages/my/saveSetting/payPassword/setPayPwd","meta":{},"window":{"navigationBarTitleText":"设置支付密码","enablePullDownRefresh":false,"titleNView":{"buttons":[{"color":"#999","colorPressed":"#999","float":"left","fontSize":"30rpx","fontSrc":"/static/iconfont/fonts/icomoon.ttf","text":""}]}}},{"path":"/pages/my/saveSetting/payPassword/changePayPwd","meta":{},"window":{"navigationBarTitleText":"修改支付密码","enablePullDownRefresh":false,"titleNView":{"buttons":[{"color":"#999","colorPressed":"#999","float":"left","fontSize":"30rpx","fontSrc":"/static/iconfont/fonts/icomoon.ttf","text":""}]}}},{"path":"/pages/my/saveSetting/payPassword/forgetPayPwd","meta":{},"window":{"navigationBarTitleText":"忘记支付密码","enablePullDownRefresh":false,"titleNView":{"buttons":[{"color":"#999","colorPressed":"#999","float":"left","fontSize":"30rpx","fontSrc":"/static/iconfont/fonts/icomoon.ttf","text":""}]}}},{"path":"/pages/my/person/choiceCity","meta":{},"window":{"navigationBarTitleText":"设置地区","enablePullDownRefresh":false,"titleNView":{"buttons":[{"color":"#999","colorPressed":"#999","float":"left","fontSize":"30rpx","fontSrc":"/static/iconfont/fonts/icomoon.ttf","text":""}]}}},{"path":"/pages/my/system/system","meta":{},"window":{"navigationBarTitleText":"系统设置","enablePullDownRefresh":false,"titleNView":{"buttons":[{"color":"#999","colorPressed":"#999","float":"left","fontSize":"30rpx","fontSrc":"/static/iconfont/fonts/icomoon.ttf","text":""}]}}},{"path":"/pages/community/comCommunity","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/community/comProject","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/community/comNews","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
