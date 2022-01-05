import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import './assets/styles/element-variables.scss'
// axios
import axios from 'axios'
import VueAxios from 'vue-axios'
import config from './config'
import { init } from '@/common'
init(config)
Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
