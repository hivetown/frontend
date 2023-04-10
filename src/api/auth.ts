import { auth } from "../types/interfaces";
import { api } from "./_base";
// import { VITE_API_URL } from "./_base";

const VITE_API_URL = "http://localhost:3000";

// export const fetchAuth = () =>
//     api.get<auth[]>(VITE_API_URL + "/auth");

// export const fetchAuth = (auth: auth) =>
//     api.get(VITE_API_URL + "/auth", auth);

export const fetchAuth = () => api.get<auth>(`/auth`);
