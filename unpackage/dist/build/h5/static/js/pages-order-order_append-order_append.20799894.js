(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-order-order_append-order_append"],{"46b7":function(t,e,o){"use strict";o.r(e);var i=o("5014"),n=o.n(i);for(var a in i)"default"!==a&&function(t){o.d(e,t,(function(){return i[t]}))}(a);e["default"]=n.a},5014:function(t,e,o){"use strict";o("99af"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{user_form:{name:"",id:"",phone:"",address:""},order_pro:[]}},onLoad:function(){var t=this;uni.$on("product_form",(function(e){t.order_pro=t.order_pro.concat(e)}))},methods:{sub:function(){var t=this;this.$api.http.post("/user/insert",this.user_form).then((function(e){uni.showToast({title:"添加成功",icon:"none"}),t.init()}))},jump_product_append:function(){uni.navigateTo({url:"../product_append/product_append"})}}};e.default=i},"5c01":function(t,e,o){"use strict";var i=o("cdd0"),n=o.n(i);n.a},"6e80":function(t,e,o){"use strict";o.r(e);var i=o("93d5"),n=o("46b7");for(var a in n)"default"!==a&&function(t){o.d(e,t,(function(){return n[t]}))}(a);o("5c01");var s,r=o("f0c5"),d=Object(r["a"])(n["default"],i["b"],i["c"],!1,null,"f4cb26f8",null,!1,i["a"],s);e["default"]=d.exports},"93d5":function(t,e,o){"use strict";var i;o.d(e,"b",(function(){return n})),o.d(e,"c",(function(){return a})),o.d(e,"a",(function(){return i}));var n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-uni-view",{staticClass:"product"},[o("v-uni-view",{staticClass:"order"},[t._v("订单明细")]),o("v-uni-view",{staticClass:"tag-e"},[t._l(t.order_pro,(function(e,i){return o("v-uni-view",{key:i,staticClass:"goods"},[o("v-uni-view",{staticClass:"goods_02"},[o("v-uni-view",{staticClass:"goods_title"},[t._v(t._s(e.title))]),o("v-uni-view",{staticClass:"goods_des"},[t._v("商品描述："+t._s(e.description))]),o("v-uni-view",{staticClass:"good_p"},[o("v-uni-view",{staticClass:"good_price"},[t._v("¥ "+t._s(e.transaction_price))]),o("v-uni-view",{staticClass:"i"},[t._v("x "+t._s(e.num))])],1)],1)],1)})),o("v-uni-view",{staticClass:"goods goods_add",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.jump_product_append.apply(void 0,arguments)}}},[o("v-uni-text",{staticClass:"iconfont icon-jiahao"}),o("v-uni-text",[t._v("点击添加商品")])],1)],2),o("v-uni-view",{staticClass:"order"},[t._v("收货信息")]),o("v-uni-view",{staticClass:"cu-form-group"},[o("v-uni-view",{staticClass:"title"},[t._v("姓       名：")]),o("v-uni-input",{attrs:{placeholder:"请输入姓名"},model:{value:t.user_form.name,callback:function(e){t.$set(t.user_form,"name",e)},expression:"user_form.name"}})],1),o("v-uni-view",{staticClass:"cu-form-group"},[o("v-uni-view",{staticClass:"title"},[t._v("身份证号：")]),o("v-uni-input",{attrs:{placeholder:"请输入身份证号",maxlength:"18"},model:{value:t.user_form.id,callback:function(e){t.$set(t.user_form,"id",e)},expression:"user_form.id"}})],1),o("v-uni-view",{staticClass:"cu-form-group"},[o("v-uni-view",{staticClass:"title"},[t._v("手机号码：")]),o("v-uni-input",{attrs:{placeholder:"请输入手机号码"},model:{value:t.user_form.phone,callback:function(e){t.$set(t.user_form,"phone",e)},expression:"user_form.phone"}})],1),o("v-uni-view",{staticClass:"cu-form-group"},[o("v-uni-view",{staticClass:"title"},[t._v("收货地址：")]),o("v-uni-input",{attrs:{placeholder:"请输入收货地址"},model:{value:t.user_form.address,callback:function(e){t.$set(t.user_form,"address",e)},expression:"user_form.address"}})],1),o("v-uni-view",{staticClass:"H50"}),o("v-uni-view",{staticClass:"o_btn"},[o("v-uni-view",{staticClass:"flex flex-direction"},[o("v-uni-button",{staticClass:"cu-btn bg-red margin-tb-sm lg",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.sub()}}},[t._v("添加订单")])],1)],1)],1)},a=[]},cdd0:function(t,e,o){var i=o("f6d9");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var n=o("4f06").default;n("3168ba02",i,!0,{sourceMap:!1,shadowMode:!1})},f6d9:function(t,e,o){var i=o("24fb");e=i(!1),e.push([t.i,"uni-page-body[data-v-f4cb26f8]{background-color:#f7f6fb}.order[data-v-f4cb26f8]{padding:10px 10px 10px 10px}.o_btn[data-v-f4cb26f8]{background:#f7f6fb;padding:0 10px 0;position:fixed;bottom:0;width:100%;z-index:9999}.goods_add[data-v-f4cb26f8]{font-size:13px;justify-content:center;align-items:center}.tag-e[data-v-f4cb26f8]{background-color:#fff;margin-bottom:0;font-size:13px}.tag-e .goods[data-v-f4cb26f8]{display:flex;width:100%;background-color:#fff;padding:10px;box-sizing:border-box;border-bottom:1px solid #eef0ef}.tag-e .goods .goods_02[data-v-f4cb26f8]{box-sizing:border-box;display:flex;flex-direction:column;height:%?160?%;flex-grow:1;justify-content:space-between;padding-top:%?10?%;padding-left:%?25?%}.tag-e .goods .goods_title[data-v-f4cb26f8]{max-height:40px;overflow:hidden;line-height:20px;font-weight:600}.tag-e .goods .goods_des[data-v-f4cb26f8]{color:#979797}.tag-e .goods .good_p[data-v-f4cb26f8]{display:flex;justify-content:space-between}.tag-e .goods .good_p .good_price[data-v-f4cb26f8]{color:#f04e42;font-weight:600}body.?%PAGE?%[data-v-f4cb26f8]{background-color:#f7f6fb}",""]),t.exports=e}}]);