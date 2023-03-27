import { ApiRequest } from "../types/interfaces";
import axios from "axios";
import store from "../store";

function makeApi(baseURL: string, options: ApiRequest = {}) {
    const headers = { ...options?.headers };

    // Inject the token into the headers
    const { token } = store.state;
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const api = axios.create({
        baseURL,
        ...options,
        headers,
    });

    return api;
}

export const api = makeApi(import.meta.env.VITE_API_URL!);
