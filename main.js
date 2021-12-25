import Vue from 'vue'
import App from './App'
import store from './store'
import json from './static_data.js'
import http from '@/common/axios.js'
import validate from '@/common/ys-validate.js'
import msg from '@/common/toast.js'
import scan from '@/components/p-scan/scan.vue'
import './assets/style/border.css'
import './assets/style/main.css'
import empty from "@/components/empty";
import upimg from '@/components/sunui-upimg.vue'
import myimg from '@/components/my-img.vue'
import selectlay from '@/components/select-lay.vue'

Vue.component('scan', scan)
Vue.component('empty', empty)
Vue.component('upimg', upimg)
Vue.component('myimg', myimg)
Vue.component('selectlay', selectlay)

Vue.config.productionTip = false

Vue.prototype.$api = {msg, json, http}
Vue.prototype.$validate = validate
Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()



