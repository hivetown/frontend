import { Product } from "../types/interfaces";
import { api } from "./_base";

export const fetchAllProducts = (page?: number, pageSize?: number, search?: string) =>
  api.get<Product[]>("/products", { params: { page, pageSize, search } });

export const fetchProduct = (specId: number) => 
    api.get<Product[]>(`/products/${specId}`);

export const fetchProducerProducts = (specId: number) => 
    api.get<Product[]>(`/products/${specId}/products`);


export const fetchProductCategories = (specId: number) => 
    api.get<Product[]>(`/products/${specId}/categories`);

export const fetchProductCategoriesFields = (specId: number, catId: number) => 
    api.get<Product[]>(`/products/${specId}/categories/${catId}/fields`);