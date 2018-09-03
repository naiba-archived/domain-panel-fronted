import Vue from 'vue/dist/vue.esm.js'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    state: {
        user: null,
        panels: {},
    },
    getters: {
    },
    mutations: {
        SET_PANEL(state, panel) {
            var tmp = state.panels
            state.panels = {}
            tmp[panel.ID] = panel
            state.panels = tmp
        },
        INIT_PANELS(state, panels) {
            state.panels = {};
            panels.forEach(panel => {
                state.panels[(panel.ID)] = panel
            });
        },
        REMOVE_PANEL(state, id) {
            var tmp = state.panels;
            state.panels = {}
            delete tmp[id];
            state.panels = tmp;
        },
        SET_USER(state, user) {
            state.user = user
        },
        CLEAR(state) {
            state.user = null
            state.panels = {}
        },
    },
    actions: {
    },
    plugins: [createPersistedState()],
});