import { Address, AuthenticatedUser, Consumer, Producer } from '@/types';
import { Store, createStore, useStore as baseUseStore } from 'vuex';
import firebase, { FirebaseError } from 'firebase/app';
import {
    createUserWithEmailAndPassword,
    deleteUser,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import { getCookie, removeCookie, setCookie } from '@/utils/cookies';
import { fetchAuth } from '@/api/auth';
import { AxiosError } from 'axios';
import { createConsumerAddress, createConsumer } from '@/api/consumers';
import router from '@/router/index';
import { createProducer } from '@/api';
import { createPopup } from '@/utils/popup';
import { InjectionKey } from 'vue';
import { auth } from '@/utils/firebase';

interface State {
    token?: string;
    user?: AuthenticatedUser;
}

export const store = createStore<State>({
    state: {
        token: getCookie('token'),
        user: undefined,
    },
    mutations: {
        SET_USER(state, user: AuthenticatedUser) {
            state.user = user;
        },
        CLEAR_USER(state) {
            state.user = undefined;
        },
        SET_TOKEN(state, token: string) {
            state.token = token;
            setCookie('token', token, 7);
        },
        REMOVE_TOKEN(state) {
            state.token = undefined;
            removeCookie('token');
        },
    },
    actions: {
        async login({ commit, dispatch }, details) {
            const { email, password } = details;

            try {
                const userCredential = await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

                const authToken = userCredential.user.getIdToken();
                // commit using SET_TOKEN using authToken, uid, email
                commit('SET_TOKEN', await authToken);
                // call fetchAuthUser action
                await dispatch('fetchAuthUser');

                await router.push('/');
            } catch (error) {
                // Handle errors
                if (error instanceof FirebaseError) {
                    handleAuthError(error);
                }
            }
        },
        async fetchAuthUser({ commit }) {
            try {
                const response = await fetchAuth();
                const auth = response.data;
                // console.log('auth', auth);
                commit('SET_USER', auth);
            } catch (error) {
                if (error instanceof AxiosError) {
                    if (error.response?.status === 404) {
                        throw new Error('User not found');
                    }
                }
            }
        },
        async registerConsumer(
            { commit },
            data: {
                consumer: Consumer;
                password: string;
                address: Address;
            }
        ) {
            try {
                await createUserWithEmailAndPassword(
                    auth,
                    data.consumer.user.email,
                    data.password
                );

                commit('SET_TOKEN', await auth.currentUser?.getIdToken());

                // Create consumer
                const { name, phone, vat } = data.consumer.user;
                await createConsumer({ name, phone, vat });

                // Get authenticated user
                await this.dispatch('fetchAuthUser');

                // Add address to consumer
                const id = this.state.user!.user.id;
                // Remove id from address object
                await createConsumerAddress(id, {
                    ...data.address,
                    id: undefined as any,
                });

                await router.push('/');
            } catch (error) {
                // call handleAuthError(error) function
                if (error instanceof FirebaseError) {
                    handleAuthError(error);
                }
            }
        },
        async registerProducer(
            { commit },
            data: { producer: Producer; password: string; address: Address }
        ) {
            try {
                await createUserWithEmailAndPassword(
                    auth,
                    data.producer.user.email,
                    data.password
                );

                commit('SET_TOKEN', await auth.currentUser?.getIdToken());

                // Create producer
                const { name, phone, vat } = data.producer.user;
                await createProducer({ name, phone, vat });

                // Get authenticated user
                await this.dispatch('fetchAuthUser');

                await router.push('/');
            } catch (error) {
                // call handleAuthError(error) function
                if (error instanceof FirebaseError) {
                    handleAuthError(error);
                }
            }
        },
        async logout({ commit }) {
            await signOut(auth);

            commit('CLEAR_USER');
            commit('REMOVE_TOKEN');
            await router.push('/login');
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

export const key: InjectionKey<Store<State>> = Symbol();

export function useStore() {
    return baseUseStore(key);
}
