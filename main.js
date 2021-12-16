import Vue from 'vue'
import App from './App'
import json from './static_data.js'
import http from './common/axios.js'
import tabBar from "@/components/my-tabbar/my-tabbar.vue"
import './assets/style/border.css'
import './assets/style/main.css'
import uView from 'uview-ui';
import validate from '@/common/ys-validate.js'
import msg from '@/common/toast.js'

Vue.use(uView);
Vue.component('tabBar', tabBar)
Vue.config.productionTip = false
Vue.prototype.$api = {msg, json, http};
Vue.prototype.$validate = validate

App.mpType = 'app'

const app = new Vue({
    ...App
})

app.$mount()



