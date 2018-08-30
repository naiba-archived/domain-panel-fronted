import Vue from 'vue/dist/vue.esm.js'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    state: {
        user: null,
    },
    getters: {
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user
        },
        REMOVE_USER(state) {
            state.user = null
        },
    },
    actions: {
    },
    plugins: [createPersistedState()],
});