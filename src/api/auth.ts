import { auth } from "../types/interfaces";
import { api } from "./_base";


export const fetchAuth = () => api.get<auth>(`/auth`);
