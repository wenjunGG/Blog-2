import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/user/login'
import index from '@/components/index'
import register from '@/components/user/register'
import articleList from '@/components/articleList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/articlelist/:type_:id.html',
      name: 'articlelist',
      component: articleList
    }
  ]
})
