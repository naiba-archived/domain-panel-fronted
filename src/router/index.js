import Vue from 'vue/dist/vue.esm.js'
import Router from 'vue-router'
import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: Home,
      meta: {
        title: "",
      },
      children: [
      ]
    },
    {
      path: '/login',
      component: Login,
      meta: {
        title: "平台登录",
      },
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 页面标题
  if (to.meta.title && to.meta.title.length > 0) {
    document.title = to.meta.title + " - 润措域名资产管理平台 runcuo.com"
  } else {
    document.title = "润措域名资产管理平台 runcuo.com"
  }
  next()
})

export default router
