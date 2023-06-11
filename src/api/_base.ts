import router from '@/router';
import { store } from '@/store';
import { ApiRequest } from '@/types';
import { createPopup } from '@/utils/popup';
import axios, { AxiosError } from 'axios';

function makeApi(baseURL: string, options: ApiRequest = {}) {
    const headers = { ...options?.headers };

    const api = axios.create({
        baseURL,
        ...options,
        headers,
    });

    api.interceptors.request.use((config) => {
        // Inject token into request headers
        const { token } = store.state;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    });

    api.interceptors.response.use(
        (response) => response,

        (error: AxiosError) => {
            if (
                error.response?.status === 401 &&
                router.currentRoute.value.meta.requiresAuth
            ) {
                createPopup(
                    `Erro ${error.response.status}: É necessário autenticar-se para realizar esta operação`,
                    'error'
                );
            } else if (error.response?.status === 403) {
                createPopup(
                    `Erro ${error.response.status}: Não tem permissões para esta operação`,
                    'error'
                );
            } else if (error.response?.status === 404) {
                createPopup(
                    `Erro ${error.response.status}: Página não encontrada`,
                    'warning'
                );
            } else {
                /* empty */
            }

            return Promise.reject(error);
        }
    );

    return api;
}

export const api = makeApi(import.meta.env.VITE_API_URL!);
