import { Product } from "../types/interfaces";
import { api } from "./_base";

export const fetchAllProducts = (search?: string) =>
    api.get<Product[]>("/products", { params: { search } });
