import { createStore } from 'vuex'

export default createStore({
    state: {
        user: null,
    },
    mutations: {
        setUser(state, user) {
            state.user = user
        },
        clearUser(state) {
            state.user = null
        }
    },
    actions: {
    //     async login({ commit }, details) {
    //         //
    //     },
    //     async register({ commit }, details) {
    //         //
    //     },
    // async logout({ commit }) {
    //     //
    } 
})