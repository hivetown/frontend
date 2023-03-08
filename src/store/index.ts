import { createStore } from 'vuex'
import {createApp} from "vue";
import PrimeVue from "primevue/config";

import router from "../router";
import { auth } from '../components/firebase';

import { createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut 
} from "firebase/auth"; 


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
        async login({ commit }, details) {
            const { email, password } = details
            try {
                await signInWithEmailAndPassword(auth, email, password)
            } catch (error) {
                switch (error.code) {
                    case 'auth/user-not-found':
                        alert('Utilizador não encontrado')
                        break
                    case 'auth/wrong-password':
                        alert('Palavra-passe incorreta')
                        break
                    default:
                        alert('Erro ao iniciar sessão')
                }
                return 
            }
            commit('SET_USER', auth.currentUser)

            router.push('/')
        },
        async register({ commit }, details) {
            const { email, password } = details
            try {
                await createUserWithEmailAndPassword(auth, email, password)
            } catch (error) {
                console.log("" + error.code)
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        alert('Email já em uso')
                        break
                    case 'auth/invalid-email':
                        alert('Email inválido')
                        break
                    case 'auth/weak-password':
                        alert('Palavra-passe fraca')
                        break
                    default:
                        alert('Erro ao registar')
                }
                return 
            }
            commit('SET_USER', auth.currentUser)

            router.push('/')
        },
        async logout({ commit }) {
            await signOut(auth)
            commit('CLEAR_USER')
            router.push('/login')
        },
    }
})