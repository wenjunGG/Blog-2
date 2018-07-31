// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import admin from './admin'
import router from './router/admin'
import store from './vuex'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#admin',
  router,
  store,
  render: (h) => {
    return h(admin)
  }
})
