import Vue from 'vue'
import App from './App'
import router from './router/index'
import store from './store/store'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import MuseUI from 'muse-ui';
// import 'muse-ui/dist/muse-ui.css';


Vue.config.debug = true
Vue.config.productionTip = false
const debug = true
Vue.prototype.apiUrl = debug ? 'http://localhost:8888':'http://localhost:8888';
Vue.prototype.$axios = axios
Vue.use(ElementUI)
// Vue.use(MuseUI)

new Vue({
  el: '#app',
  router: router,
  store: store,
  template: '<App/>',
  components: { App }
})
