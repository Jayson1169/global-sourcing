import Vue from 'vue'
import App from './App'
import json from './static_data.js'
import http from './common/axios.js'
import tabBar from "@/components/my-tabbar/my-tabbar.vue"
import './assets/style/border.css'
import './assets/style/main.css'
import uView from 'uview-ui';
import validate from '@/common/ys-validate.js'

Vue.use(uView);
Vue.component('tabBar', tabBar)
Vue.config.productionTip = false
Vue.prototype.$api = {msg, json, http};
Vue.prototype.$validate = validate

App.mpType = 'app'

//统一提示方便全局修改
const msg = (title,  icon='none',duration=2000, mask=false)=>{
	if(Boolean(title) === false){
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
} 

const app = new Vue({
    ...App
})

app.$mount()



