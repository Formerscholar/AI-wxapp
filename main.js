import Vue from 'vue'
import store from './store'
import App from './App'

//封装的请求
import api from './common/api.js'

Vue.config.productionTip = false

Vue.prototype.$api=api
Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
