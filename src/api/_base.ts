import axios from "axios";

function makeApi(baseURL: string, options = {}) {
    const api = axios.create({
        baseURL,
        ...options,
    });

    return api;
}

export const api = makeApi(import.meta.env.VITE_API_URL!);
