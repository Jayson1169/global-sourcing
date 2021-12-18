import Vue from 'vue'
import App from './App'
import json from './static_data.js'
import http from '@/common/axios.js'
import validate from '@/common/ys-validate.js'
import msg from '@/common/toast.js'
import scan from '@/components/p-scan/scan.vue'
import './assets/style/border.css'
import './assets/style/main.css'

Vue.component('scan',scan)

Vue.config.productionTip = false

Vue.prototype.$api = {msg, json, http};
Vue.prototype.$validate = validate

App.mpType = 'app'

const app = new Vue({
    ...App
})

app.$mount()



