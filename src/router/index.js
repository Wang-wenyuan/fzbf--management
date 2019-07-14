import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Login from '@/components/login'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path:'/',
          name:'index',
          component:()=>import('@/components/index')
        },
        {
          path:'/user',
          name:'user',
          component:()=>import('@/components/user/admin_user/admin_user')
        },{
          path:'/public_user',
          name:'public_user',
          component:()=>import('@/components/user/public_user/public_user')
        }
      ]
    }
  ]
})
