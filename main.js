import Vue from 'vue'
import store from './store'
import App from './App'
import {
  setTimer
} from './utils'
import filters from './utils/filters'
import api from './common/api.js'


Vue.config.productionTip = false


Object.keys(filters).map(v => {
  Vue.filter(v, filters[v])
})

Vue.prototype.$api = api
Vue.prototype.$store = store
Vue.prototype.$setTimer = setTimer

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
