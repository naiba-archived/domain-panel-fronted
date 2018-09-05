import Vue from 'vue/dist/vue.esm.js'
import Router from 'vue-router'
import { Message } from "element-ui"

import store from "../store"

import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'
//Dashboard
import Dashboard from '../pages/dashboard/Dashboard.vue'
import DashIndex from '../pages/dashboard/Index.vue'
import NewPanel from '../pages/dashboard/NewPanel.vue'
import Settings from '../pages/dashboard/Settings.vue'
//Panel
import Panel from '../pages/panel/Panel.vue'
import PIndex from '../pages/panel/Index.vue'
import PCats from '../pages/panel/Cats.vue'
import PSettings from '../pages/panel/Settings.vue'


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
        requireGuest: true,
        title: "平台登录",
      },
    },
    {
      path: '/dashboard',
      component: Dashboard,
      children: [
        {
          path: '',
          component: DashIndex,
          meta: {
            requireLogin: true,
            title: "管理面板",
          },
        },
        {
          path: 'new-panel',
          component: NewPanel,
          meta: {
            requireLogin: true,
            title: "新建米表",
          },
        },
        {
          path: 'settings',
          component: Settings,
          meta: {
            requireLogin: true,
            title: "个人设置",
          },
        },
      ]
    },
    {
      path: '/panel/:id/',
      component: Panel,
      children: [
        {
          path: '',
          component: PIndex,
          meta: {
            requireLogin: true,
            title: "- 米表管理",
          },
        },
        {
          path: 'settings',
          component: PSettings,
          meta: {
            requireLogin: true,
            title: "- 米表设置",
          },
        },
        {
          path: 'cats',
          component: PCats,
          meta: {
            requireLogin: true,
            title: "- 分类管理",
          },
        },
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 页面标题
  if (to.meta.title && to.meta.title.length > 0) {
    document.title = to.meta.title + " - 润措资产管理 runcuo.com"
  } else {
    document.title = "润措域名资产管理平台 runcuo.com"
  }

  if (to.matched.some(res => res.meta.requireLogin || res.meta.requireAdmin || res.meta.requireGuest)) {
    // 判断是否登录
    if (store.state.user != null) {
      //是否需要管理员
      if (to.meta.requireAdmin && !store.state.user.IsAdmin) {
        Message.error("需要管理员权限")
        next({
          path: "/",
        })
        return
      }
      //是否需要游客访问
      if (to.meta.requireGuest) {
        Message.error("您已登录，不能访问。")
        next({
          path: '/'
        });
        return
      }
    } else if (!to.meta.requireGuest) {
      // 没登录且需要登录
      Message.error("需要登录")
      next({
        path: "/login?r=" + encodeURIComponent(document.URL)
      });
      return
    }
  }
  next()
})

export default router
