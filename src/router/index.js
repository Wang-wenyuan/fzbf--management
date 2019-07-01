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
          component:()=>import('@/components/user/user')
        },{
          path:'/user2',
          name:'user2',
          component:()=>import('@/components/user2/user2')
        }
      ]
    }
  ]
})
