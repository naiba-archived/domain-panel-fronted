import 'babel-polyfill'
import Vue from 'vue/dist/vue.esm.js'
import store from './store'
import router from './router'
import api from './api'

import App from './App.vue'
import ElementUI from 'element-ui'
import '../static/styles/naiba.scss'

Vue.use(ElementUI)
Vue.use(api)

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
