import Vue from 'vue'
import Router from 'vue-router'
import artticle from '@/components/admin/article'
import classify from '@/components/admin/classify'
import userManager from '@/components/admin/userManager'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'article',
      component: artticle
    },
    {
      path: '/classify',
      name: 'classify',
      component: classify
    },
    {
      path: '/userManager',
      name: 'userManager',
      component: userManager
    }
  ]
})
