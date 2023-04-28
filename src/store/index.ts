import { createStore } from 'vuex';
import { createApp } from 'vue';
import PrimeVue from 'primevue/config';

import router from '../router';
import { auth } from '../components/firebase';

import { postConsumer } from '../api/consumers';
import { postProducer } from '../api/producers';
import { fetchAuth } from '../api/auth';
import ErrorPopup from '../components/ErrorPopup.vue';
import {
    createUserWithEmailAndPassword,
    deleteUser,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
// import transaction from 'firebase/transaction';
import { getCookie, setCookie, removeCookie } from './cookies';

import firebase from 'firebase/app';
import { FirebaseError } from 'firebase/app';
// import saveValue from '../views/Registration.vue';
// import userType from '../views/Registration.vue';

// import Registration from '../views/Registration.vue';

// import { useStore } from 'vuex';
import { postAddressConsumer } from '../api/addressConsumer';
import { Consumer, Producer } from '../types/interfaces';
// import { api } from '../api/_base';
// import { Transaction } from 'firebase/firestore';
// import type { DefineComponent } from 'vue';

// const saveUser = (uid) => {
//     // add new user to database
//     localStorage.setItem('uid', uid);
// };

// const saveEmail = (email: string | null | undefined) => {
//     localStorage.setItem('email', email);
// };

export default createStore({
    state: {
        token: getCookie('token'),
        user: null,
    } as {
        token: string | null;
        user: Consumer | Producer | null;
        auth: boolean;
    },
    mutations: {
        SET_USER(state, user: Consumer | Producer) {
            state.user = user;
        },
        CLEAR_USER(state) {
            state.user = null;
        },
        SET_TOKEN(state, token: string) {
            state.token = token;
            setCookie('token', token, 7);
        },
        REMOVE_TOKEN(state) {
            state.token = null;
            removeCookie('token');
        },
    },
    actions: {
        async login({ commit }, details) {
            const { email, password } = details;

            // try {
            //     await signInWithEmailAndPassword(auth, email, password);
            // } catch (error) {
            //     handleAuthError(error.code);
            //     return;
            // }

            try {
                const userCredential = await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                // Save the authentication token to local storage
                const authToken = userCredential.user.getIdToken();
                // localStorage.setItem('authToken', await authToken);
                // commit using SET_TOKEN using authToken, uid, email
                commit('SET_TOKEN', await authToken);
                // saveUser(auth.currentUser?.uid);
                // saveEmail(auth.currentUser?.email);
            } catch (error) {
                // Handle errors
                if (error instanceof FirebaseError) {
                    handleAuthError(error);
                }
            }

            commit('SET_USER', auth.currentUser?.uid);

            // router.push('/');
        },

        async register(
            { commit },
            details: {
                name: string;
                password: string;
                email: string;
                phone: string;
                vat: string;
                number: number;
                door: string;
                floor: number;
                zip_code: string;
                street: string;
                parish: string;
                county: string;
                city: string;
                district: string;
                latitude: number;
                longitude: number;
                type: string;
            }
        ) {
            const {
                email,
                password,
                name,
                phone,
                vat,
                number,
                door,
                floor,
                zip_code,
                street,
                parish,
                county,
                city,
                district,
                latitude,
                longitude,
                type,
            } = details;

            try {
                if (type == 'Consumer') {
                    try {
                        await createUserWithEmailAndPassword(
                            auth,
                            email,
                            password
                        );
                        commit(
                            'SET_TOKEN',
                            await auth.currentUser?.getIdToken()
                        );

                        // Post consumer data
                        await postConsumer({ name, phone, vat });
                        const authArray = await fetchAuth();
                        commit('SET_USER', authArray);
                        const { id } = authArray.data;
                        await postAddressConsumer(id, {
                            number,
                            door,
                            floor,
                            zipCode: zip_code,
                            street,
                            parish,
                            county,
                            city,
                            district,
                            latitude,
                            longitude,
                        });
                        router.push('/');
                    } catch (error) {
                        // call handleAuthError(error) function
                        if (error instanceof FirebaseError) {
                            handleAuthError(error);
                        }
                    }
                }
                // if saveValue == "Producer" then post to producer collection
                else if (type == 'Producer') {
                    try {
                        // Create user after data is successfully posted
                        await createUserWithEmailAndPassword(
                            auth,
                            email,
                            password
                        );
                        commit(
                            'SET_TOKEN',
                            await auth.currentUser?.getIdToken()
                        );

                        // Post producer data
                        await postProducer({ name, phone, vat });
                        const authArray = await fetchAuth();
                        commit('SET_USER', authArray);
                        router.push('/');
                    } catch (error) {
                        // call handleAuthError(error) function
                        if (error instanceof FirebaseError) {
                            handleAuthError(error);
                        }
                    }
                }
            } catch (error) {
                if (error instanceof FirebaseError) {
                    handleAuthError(error);
                }
                if (auth.currentUser) {
                    deleteUser(auth.currentUser);
                }
            }
        },

        async logout({ commit }) {
            await signOut(auth);

            commit('CLEAR_USER');
            commit('REMOVE_TOKEN');
            router.push('/login');
        },

        fetchUser({ commit }) {
            auth.onAuthStateChanged(async (user) => {
                if (user === null) {
                    commit('CLEAR_USER');
                } else {
                    commit('SET_USER', user);

                    if (router.currentRoute.value.path === '/login') {
                        router.push('/');
                    }
                }
            });
        },
    },
});

async function handleAuthError(error: firebase.FirebaseError) {
    switch (error.code) {
        case 'auth/user-not-found':
            createPopup('Utilizador não encontrado', 'warning');
            break;
        case 'auth/wrong-password':
            createPopup('Password incorreta', 'warning');
            break;
        case 'auth/email-already-in-use':
            createPopup('Já existe um utilizador com este email', 'warning');
            break;
        case 'auth/invalid-email':
            createPopup('Email inválido', 'warning');
            break;
        case 'auth/operation-not-allowed':
            createPopup('Operação não autorizada', 'error');
            break;
        case 'auth/weak-password':
            createPopup('Password fraca', 'warning');
            break;
        default:
            createPopup('Problema na autenticação', 'error');
            if (auth.currentUser) {
                await deleteUser(auth.currentUser);
            }
    }
}

function createPopup(message: string, type: string) {
    const WarningPopupComponent = createApp(ErrorPopup, { message, type });
    const warningPopupInstance = WarningPopupComponent.mount(
        document.createElement('div')
    );

    document.body.appendChild(warningPopupInstance.$el);

    setTimeout(() => {
        document.body.removeChild(warningPopupInstance.$el);
    }, 3000);
}
