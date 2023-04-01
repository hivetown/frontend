import { ApiRequest } from "../types/interfaces";
import axios from "axios";
import store from "../store";

function makeApi(baseURL: string, options: ApiRequest = {}) {
    const headers = { ...options?.headers };

    const api = axios.create({
        baseURL,
        ...options,
        headers,
    });

    api.interceptors.request.use((config) => {
        // Inject the token into the headers
        const { token } = store.state;
        console.log(token)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    });

    return api;
}

export const api = makeApi(import.meta.env.VITE_API_URL!);
