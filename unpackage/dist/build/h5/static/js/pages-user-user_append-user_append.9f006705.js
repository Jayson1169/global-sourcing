(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-user-user_append-user_append"],{"0eef":function(e,t,i){"use strict";i.r(t);var n=i("c25d"),o=i.n(n);for(var s in n)"default"!==s&&function(e){i.d(t,e,(function(){return n[e]}))}(s);t["default"]=o.a},"114c":function(e,t,i){var n=i("754b");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var o=i("4f06").default;o("39878cda",n,!0,{sourceMap:!1,shadowMode:!1})},1716:function(e,t,i){"use strict";i.d(t,"b",(function(){return o})),i.d(t,"c",(function(){return s})),i.d(t,"a",(function(){return n}));var n={easySelect:i("203b").default},o=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",{staticClass:"product"},[i("v-uni-view",{staticClass:"top"}),i("v-uni-view",{staticClass:"cu-form-group"},[i("v-uni-view",{staticClass:"title"},[e._v("账       号：")]),i("v-uni-input",{attrs:{placeholder:"请输入账号",focus:!0,maxlength:"16"},model:{value:e.user_form.username,callback:function(t){e.$set(e.user_form,"username",t)},expression:"user_form.username"}})],1),i("v-uni-view",{staticClass:"cu-form-group"},[i("v-uni-view",{staticClass:"title"},[e._v("密       码：")]),i("v-uni-input",{attrs:{password:"true",placeholder:"包含数字和字母,长度在6～18位之间",maxlength:"18"},model:{value:e.user_form.password,callback:function(t){e.$set(e.user_form,"password",t)},expression:"user_form.password"}})],1),i("v-uni-view",{staticClass:"cu-form-group"},[i("v-uni-view",{staticClass:"title"},[e._v("姓       名：")]),i("v-uni-input",{attrs:{placeholder:"请输入姓名"},model:{value:e.user_form.name,callback:function(t){e.$set(e.user_form,"name",t)},expression:"user_form.name"}})],1),i("v-uni-view",{staticClass:"cu-form-group",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.useOutClickSide.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"title"},[e._v("身       份：")]),i("easy-select",{ref:"easySelect",attrs:{size:"medium"},on:{selectOne:function(t){arguments[0]=t=e.$handleEvent(t),e.selectOne.apply(void 0,arguments)}},model:{value:e.role,callback:function(t){e.role=t},expression:"role"}})],1),i("v-uni-view",{staticClass:"H50"}),i("v-uni-view",{staticClass:"p_btn"},[i("v-uni-view",{staticClass:" flex flex-direction"},[i("v-uni-button",{staticClass:"cu-btn bg-red margin-tb-sm lg",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.sub()}}},[e._v("添加")])],1)],1)],1)},s=[]},"203b":function(e,t,i){"use strict";i.r(t);var n=i("8009"),o=i("0eef");for(var s in o)"default"!==s&&function(e){i.d(t,e,(function(){return o[e]}))}(s);i("28ac");var a,r=i("f0c5"),u=Object(r["a"])(o["default"],n["b"],n["c"],!1,null,"ee196546",null,!1,n["a"],a);t["default"]=u.exports},"28ac":function(e,t,i){"use strict";var n=i("5c81"),o=i.n(n);o.a},"297a":function(e,t,i){"use strict";i.r(t);var n=i("1716"),o=i("3e1d");for(var s in o)"default"!==s&&function(e){i.d(t,e,(function(){return o[e]}))}(s);i("d817");var a,r=i("f0c5"),u=Object(r["a"])(o["default"],n["b"],n["c"],!1,null,"3dbcaa44",null,!1,n["a"],a);t["default"]=u.exports},"3e1d":function(e,t,i){"use strict";i.r(t);var n=i("84d1"),o=i.n(n);for(var s in n)"default"!==s&&function(e){i.d(t,e,(function(){return n[e]}))}(s);t["default"]=o.a},"5c81":function(e,t,i){var n=i("995d");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var o=i("4f06").default;o("f98a1e86",n,!0,{sourceMap:!1,shadowMode:!1})},"754b":function(e,t,i){var n=i("24fb");t=n(!1),t.push([e.i,"uni-page-body[data-v-3dbcaa44]{background-color:#f7f6fb}.p_btn[data-v-3dbcaa44]{background:#f7f6fb;padding:0 10px 0;position:fixed;bottom:0;width:100%;z-index:9999}.u_input[data-v-3dbcaa44]{font-size:15px;background:#fff}body.?%PAGE?%[data-v-3dbcaa44]{background-color:#f7f6fb}",""]),e.exports=t},8009:function(e,t,i){"use strict";i.d(t,"b",(function(){return o})),i.d(t,"c",(function(){return s})),i.d(t,"a",(function(){return n}));var n={uniIcons:i("7f08").default},o=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",{staticClass:"easy-select",style:[e.easySelectSize],on:{click:function(t){t.stopPropagation(),arguments[0]=t=e.$handleEvent(t),e.trigger.apply(void 0,arguments)}}},[i("v-uni-input",{staticClass:"u-input",attrs:{type:"text",placeholder:e.placeholder,disabled:!0,clearable:!0},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}}),i("v-uni-view",{staticClass:"easy-select-suffix",class:[e.showSuffix],style:{border:"1px solid rgba（0,0,0,0)"}},[i("uni-icons",{staticClass:"u-icon",attrs:{type:"arrowdown",size:"20"}})],1),e.showOptions?i("v-uni-view",{staticClass:"easy-select-options",style:{"min-width":e.boundingClientRect.width+"px",top:e.optionsGroupTop,margin:e.optionsGroupMargin}},e._l(e.options,(function(t){return i("v-uni-view",{key:t.value,staticClass:"easy-select-options-item",class:{active:e.currentSelect.label===t.label},on:{click:function(i){i.stopPropagation(),arguments[0]=i=e.$handleEvent(i),e.select(t)}}},[i("v-uni-text",[e._v(e._s(t.label))])],1)})),1):e._e()],1)},s=[]},"84d1":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={data:function(){return{role:"",user_form:{username:"",name:"",password:"",role:""}}},methods:{init:function(){this.user_form.username="",this.user_form.name="",this.user_form.password="",this.user_form.role="",this.role=""},selectOne:function(e){this.role=e.label,this.user_form.role=e.value},useOutClickSide:function(){this.$refs.easySelect.hideOptions&&this.$refs.easySelect.hideOptions()},sub:function(){var e=this;this.$api.http.post("/user/insert",this.user_form).then((function(t){uni.showToast({title:"添加成功",icon:"none"}),e.init()}))}}};t.default=n},"995d":function(e,t,i){var n=i("24fb");t=n(!1),t.push([e.i,".easy-select[data-v-ee196546]{position:relative;\n\t/* font-size: 28rpx; */color:#606266;outline:none;box-sizing:initial;height:30px}.easy-select uni-input[data-v-ee196546]{padding:0 %?0?%;padding-right:%?60?%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;height:100%!important;min-height:100%!important}.easy-select .easy-select-suffix[data-v-ee196546]{position:absolute;box-sizing:border-box;height:100%;right:5px;top:0;display:flex;align-items:center;-webkit-transform:rotate(180deg);transform:rotate(180deg);transition:all .3s;-webkit-transform-origin:center;transform-origin:center}.easy-select .showOptions[data-v-ee196546]{-webkit-transform:rotate(180deg)!important;transform:rotate(180deg)!important}.easy-select .no-showOptions[data-v-ee196546]{-webkit-transform:rotate(0)!important;transform:rotate(0)!important}.easy-select .easy-select-options[data-v-ee196546]{position:absolute;padding:0 0;left:%?-20?%;margin-top:10px;border:1px solid #e4e7ed;border-radius:4px;background-color:#fff;box-shadow:0 2px 12px 0 rgba(0,0,0,.1);box-sizing:border-box;-webkit-transform-origin:center top;transform-origin:center top;z-index:2238;overflow:scroll;max-height:%?274?%}.easy-select .easy-select-options-item[data-v-ee196546]{padding:0 %?20?%;position:relative;white-space:nowrap;font-size:14px;color:#606266;height:33px;line-height:33px;box-sizing:border-box}.easy-select .active[data-v-ee196546]{background-color:#f5f7fa}",""]),e.exports=t},c25d:function(e,t,i){"use strict";i("a9e3"),i("ac1f"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n="easy-select",o=137,s=33,a=10,r=14,u=a+r,l="_easyWindowHeight",c={medium:{width:"300px",height:"40px"},small:{width:"200px",height:"30px"},mini:{width:"160px",height:"30px"}},d={name:n,props:{windowHeight:{type:[Number,String],default:0},placeholder:{type:String,default:"请选择"},value:{type:String,default:"管理员"},size:{type:String,default:"medium"},options:{type:Array,default:function(){return[{value:"ADMIN",label:"管理员"},{value:"SALESPERSON",label:"销售员"},{value:"BUYER",label:"采购员"},{value:"WAREHOUSE_KEEPER",label:"仓管员"},{value:"TRANSPORTER",label:"转运员"},{value:"TREASURER",label:"财务员"}]}}},data:function(){return{showOptions:!1,boundingClientRect:{},currentSelect:{},optionsGroupTop:"auto",optionsGroupMargin:""}},computed:{showSuffix:function(){return this.showOptions?"showOptions":"no-showOptions"},easySelectSize:function(){var e=this.size.toLowerCase();return e in c?{width:c[e].width,height:c[e].height}:{}}},mounted:function(){var e=this,t=uni.createSelectorQuery().in(this);t.select(".easy-select").boundingClientRect((function(t){e.boundingClientRect=t})).exec();try{if(!this.windowHeight){var i=uni.getStorageSync(l);if(i)return void(this.easyWindowHeight=i);var n=uni.getSystemInfoSync();this.easyWindowHeight=n.windowHeight,uni.setStorageSync(l,this.easyWindowHeight)}}catch(o){}},methods:{trigger:function(e){var t=this,i=uni.createSelectorQuery().in(this);i.select(".easy-select").fields({rect:!0},(function(e){var i=e.top,n=e.bottom,r=Math.min(o+a,t.options.length*s+u);n=Number(t.windowHeight||t.easyWindowHeight)-(i+t.boundingClientRect.height),n<r?(t.optionsGroupDirection="up",t.optionsGroupTop=-r-12+"px",t.optionsGroupMargin="0"):(t.optionsGroupDirection="down",t.optionsGroupTop="auto",t.optionsGroupMargin="10px 0 0 0"),t.showOptions=!t.showOptions})).exec()},select:function(e){this.showOptions=!1,this.currentSelect=e,this.$emit("selectOne",e)},hideOptions:function(){this.showOptions=!1}}};t.default=d},d817:function(e,t,i){"use strict";var n=i("114c"),o=i.n(n);o.a}}]);