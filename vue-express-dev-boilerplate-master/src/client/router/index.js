import Vue from 'vue'
import Router from 'vue-router'

// 导入对应的vuex文件
import store from './../store/store'

// 导入相应的子组件
import Hello from './../components/Hello'
import index from './../components/index'


Vue.use(Router)


var router = new Router({
  mode: 'hash',
  routes: [
    { name: 'index', path: '/', redirect: '/index' },
    { name: 'index', path: '/index', component: index },
    { name: 'hello', path: '/hello', component: Hello },

  ]
})

export default router