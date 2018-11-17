import Vue from 'vue'
import App from './App'
import router from './router/index'
import store from './store/store'
import axios from 'axios'
import ElementUI from 'element-ui'
import infiniteScroll from 'vue-infinite-scroll'
import 'element-ui/lib/theme-chalk/index.css'
import './static/css/animate.css'
import './static/css/reset.css'
import VueLazyload from 'vue-lazyload' 
// import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import VueSocketio from 'vue-socket.io'
import socketio from 'socket.io-client'
// import MuseUI from 'muse-ui';
// import 'muse-ui/dist/muse-ui.css';


Vue.config.debug = true
Vue.config.productionTip = false
const debug = true
Vue.prototype.apiUrl = debug ? 'http://localhost:8888':'http://localhost:8888';
Vue.prototype.$axios = axios
Vue.use(ElementUI)
Vue.use(VueLazyload)
Vue.use(infiniteScroll)
Vue.use(VueSocketio, socketio('http://localhost:8888'));
// Vue.use(MuseUI)

//添加请求拦截器
axios.interceptors.request.use(
  config =>{
    //在发送请求之前做某事
  let token = sessionStorage.getItem('token');
  if(token){
    config.headers.token = token
  }

  return config;
},function(error){
  //请求错误时做些事
  return Promise.reject(error);
});

 axios.interceptors.response.use(
      response => {/*在这里可以设置请求成功的一些设置*/
        console.log(response.data)
        if(response.data.code == 1001){
          Vue.prototype.$message(
            {
              message: '登录信息过期，请重新登录',
              duration:2000,
              type:'error'
            }
           );
          router.replace({
            path: '/login'
        })
        }
        return response;
      },
      error => {/*在这里设置token过期的跳转*/
        if (error.response) {
          if(!error.response.data.success){
            Vue.prototype.$message(
              {
                message: '登录信息过期，请重新登录',
                duration:2000,
                type:'error'
              }
             );
            router.replace({
              path: '/login'
          })    
          }
        }
      });


new Vue({
  el: '#app',
  router: router,
  store: store,
  template: '<App/>',
  components: { App }
})
