import Vue from 'vue'
import Router from 'vue-router'

// 导入对应的vuex文件
import store from './../store/store'

// 导入相应的子组件
const header = resolve => require(['@/client/components/Header'], resolve);
const login = resolve => require(['@/client/components/login'], resolve);
const index = resolve => require(['@/client/components/index'], resolve);
const register = resolve => require(['@/client/components/register'], resolve);



Vue.use(Router)

var router = new Router({
  mode: 'hash',
  routes: [
    { name:'index',
      path:'/',
      redirect:'/login',
    },{
      name: 'index', 
      path: '/header', 
      component: header,
      children:[
        {
          path: '/index',
          component: index,
        },
      ]
    },
    {
      name:'login',
      path: '/login',
      component: login,
    },
    {
      name:'register',
      path: '/register',
      component: register,
    }
  ]
})

export default router