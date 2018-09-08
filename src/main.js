import 'babel-polyfill'
import Vue from 'vue/dist/vue.esm.js'
import store from './store'
import router from './router'
import api from './api'
import VueAnalytics from 'vue-analytics'

import App from './App.vue'
import ElementUI from 'element-ui'
import Scrollbar from "element-ui/packages/scrollbar";
import '../static/styles/naiba.scss'

Vue.use(ElementUI)
Vue.use(Scrollbar)
Vue.use(api)
Vue.use(VueAnalytics, {
    id: 'UA-111315498-13',
    router,
    autoTracking: {
        pageviewOnLoad: false
    }
})

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
