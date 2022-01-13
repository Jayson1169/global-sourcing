
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/Login","pages/Home","pages/Web","pages/user/User","pages/user/UserAppend","pages/user/PasswordReset","pages/statistics/Statistics","pages/statistics/StatisticsOutput","pages/order/Order","pages/order/OrderAppend","pages/order/ProductItemAppend","pages/order/ProductItemEdit","pages/order/OrderDetail","pages/order/ProductItemDetail","pages/purchase/PurchaserAssign","pages/purchase/Purchase","pages/purchase/Purchaser","pages/purchase/PurchaseAppend","pages/purchase/PurchaseUpload","pages/purchase/PurchaseDetail","pages/purchase/PurchaseReceive","pages/order/OrderModify","pages/warehouse/WarehouseKeeper","pages/warehouse/WarehouseKeeperAssign","pages/warehouse/WarehouseOutput","pages/transport/Transporter","pages/transport/OrderTransport","pages/transport/ProductTransport","pages/product/Product","pages/warehouse/ProductTransport","pages/product/ProductAppend","pages/product/ProductModify","pages/warehouse/ExpressOrderAppend","pages/warehouse/ExpressOrderItemAppend","pages/warehouse/ExpressOrderItemDetail","pages/warehouse/ExpressOrderDetail","pages/warehouse/ExpressOrderItemEdit","pages/warehouse/ExpressOrder","pages/transport/ExpressOrder","pages/transport/ExpressOrderItemReceive","pages/transport/ExpressOrderReceive","pages/order/Salesperson"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8","bounce":"none","titleNView":{"titleSize":"38upx"}},"nvueCompiler":"uni-app","nvueStyleCompiler":"weex","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"globalSourcing","compilerVersion":"3.3.5","entryPagePath":"pages/Login","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/Login","meta":{"isQuit":true},"window":{"navigationBarBackgroundColor":"#ffffff","navigationStyle":"custom"}},{"path":"/pages/Home","meta":{},"window":{"navigationBarBackgroundColor":"#ffffff","enablePullDownRefresh":false,"bounce":"none"}},{"path":"/pages/Web","meta":{},"window":{"navigationBarBackgroundColor":"#ffffff","enablePullDownRefresh":false,"bounce":"none"}},{"path":"/pages/user/User","meta":{},"window":{"navigationBarTitleText":"用户管理","enablePullDownRefresh":false,"bounce":"none","titleNView":{"titleSize":"38upx"}}},{"path":"/pages/user/UserAppend","meta":{},"window":{"navigationBarTitleText":"新增用户","enablePullDownRefresh":false,"bounce":"none","titleNView":{"titleSize":"38upx"}}},{"path":"/pages/user/PasswordReset","meta":{},"window":{"navigationBarTitleText":"密码重置","enablePullDownRefresh":false,"bounce":"none","titleNView":{"titleSize":"38upx"}}},{"path":"/pages/statistics/Statistics","meta":{},"window":{}},{"path":"/pages/statistics/StatisticsOutput","meta":{},"window":{"navigationBarTitleText":"导出财务信息","enablePullDownRefresh":false}},{"path":"/pages/order/Order","meta":{},"window":{"navigationBarTitleText":"订单管理","enablePullDownRefresh":false}},{"path":"/pages/order/OrderAppend","meta":{},"window":{"navigationBarTitleText":"添加订单","enablePullDownRefresh":false}},{"path":"/pages/order/ProductItemAppend","meta":{},"window":{"navigationBarTitleText":"添加商品项","enablePullDownRefresh":false}},{"path":"/pages/order/ProductItemEdit","meta":{},"window":{"navigationBarTitleText":"编辑商品项","enablePullDownRefresh":false}},{"path":"/pages/order/OrderDetail","meta":{},"window":{"navigationBarTitleText":"查看订单"}},{"path":"/pages/order/ProductItemDetail","meta":{},"window":{"navigationBarTitleText":"查看商品项"}},{"path":"/pages/purchase/PurchaserAssign","meta":{},"window":{"navigationBarTitleText":"分配采购员","enablePullDownRefresh":false}},{"path":"/pages/purchase/Purchase","meta":{},"window":{"navigationBarTitleText":"采购管理","enablePullDownRefresh":false}},{"path":"/pages/purchase/Purchaser","meta":{},"window":{"navigationBarBackgroundColor":"#ffffff","enablePullDownRefresh":false,"bounce":"none"}},{"path":"/pages/purchase/PurchaseAppend","meta":{},"window":{"navigationBarTitleText":"添加采购单","enablePullDownRefresh":false}},{"path":"/pages/purchase/PurchaseUpload","meta":{},"window":{"navigationBarTitleText":"采购信息","enablePullDownRefresh":false}},{"path":"/pages/purchase/PurchaseDetail","meta":{},"window":{"navigationBarTitleText":"采购信息","enablePullDownRefresh":false}},{"path":"/pages/purchase/PurchaseReceive","meta":{},"window":{"navigationBarTitleText":"接收商品","enablePullDownRefresh":false}},{"path":"/pages/order/OrderModify","meta":{},"window":{"navigationBarTitleText":"修改订单","enablePullDownRefresh":false}},{"path":"/pages/warehouse/WarehouseKeeper","meta":{},"window":{"navigationBarBackgroundColor":"#ffffff","enablePullDownRefresh":false,"bounce":"none"}},{"path":"/pages/warehouse/WarehouseKeeperAssign","meta":{},"window":{"navigationBarTitleText":"分配仓管","enablePullDownRefresh":false}},{"path":"/pages/warehouse/WarehouseOutput","meta":{},"window":{"navigationBarTitleText":"导出海关信息","navigationBarBackgroundColor":"#ffffff","enablePullDownRefresh":false,"bounce":"none"}},{"path":"/pages/transport/Transporter","meta":{},"window":{"navigationBarBackgroundColor":"#ffffff","enablePullDownRefresh":false,"bounce":"none"}},{"path":"/pages/transport/OrderTransport","meta":{},"window":{"navigationBarTitleText":"快递物流","enablePullDownRefresh":false}},{"path":"/pages/transport/ProductTransport","meta":{},"window":{"navigationBarTitleText":"快递物流","enablePullDownRefresh":false}},{"path":"/pages/product/Product","meta":{},"window":{"navigationBarTitleText":"商品管理","enablePullDownRefresh":false}},{"path":"/pages/warehouse/ProductTransport","meta":{},"window":{"navigationBarTitleText":"发送快递","enablePullDownRefresh":false}},{"path":"/pages/product/ProductAppend","meta":{},"window":{"navigationBarTitleText":"添加商品","enablePullDownRefresh":false}},{"path":"/pages/product/ProductModify","meta":{},"window":{"navigationBarTitleText":"修改商品","enablePullDownRefresh":false}},{"path":"/pages/warehouse/ExpressOrderAppend","meta":{},"window":{"navigationBarTitleText":"添加物流单","enablePullDownRefresh":false}},{"path":"/pages/warehouse/ExpressOrderItemAppend","meta":{},"window":{"navigationBarTitleText":"添加商品项","enablePullDownRefresh":false}},{"path":"/pages/warehouse/ExpressOrderItemDetail","meta":{},"window":{"navigationBarTitleText":"查看商品项","enablePullDownRefresh":false}},{"path":"/pages/warehouse/ExpressOrderDetail","meta":{},"window":{"navigationBarTitleText":"查看物流单","enablePullDownRefresh":false}},{"path":"/pages/warehouse/ExpressOrderItemEdit","meta":{},"window":{"navigationBarTitleText":"编辑商品项","enablePullDownRefresh":false}},{"path":"/pages/warehouse/ExpressOrder","meta":{},"window":{"navigationBarBackgroundColor":"#ffffff","enablePullDownRefresh":false,"bounce":"none"}},{"path":"/pages/transport/ExpressOrder","meta":{},"window":{"navigationBarBackgroundColor":"#ffffff","enablePullDownRefresh":false,"bounce":"none"}},{"path":"/pages/transport/ExpressOrderItemReceive","meta":{},"window":{"navigationBarTitleText":"接收转运物流","enablePullDownRefresh":false}},{"path":"/pages/transport/ExpressOrderReceive","meta":{},"window":{"navigationBarTitleText":"接收转运物流","enablePullDownRefresh":false}},{"path":"/pages/order/Salesperson","meta":{},"window":{"navigationBarTitleText":"订单管理","navigationBarBackgroundColor":"#ffffff","enablePullDownRefresh":false,"bounce":"none"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
