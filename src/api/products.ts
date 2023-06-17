import {
    Category,
    BaseItems,
    ProducerProduct,
    ProductSpec,
    ProductSpecField,
} from '../types/interfaces';
import { api } from './_base';

export const fetchAllProducts = (
    page?: number,
    pageSize?: number,
    search?: string,
    categoryId?: number
) =>
    api.get<BaseItems<ProductSpec>>('/products', {
        params: { page, pageSize, search, categoryId },
    });

export const fetchProduct = (specId: number) =>
    api.get<ProductSpec>(`/products/${specId}`);

export const fetchProducerProducts = (specId: number) =>
    api.get<BaseItems<ProducerProduct>>(`/products/${specId}/products`);

export const fetchProductCategories = (specId: number) =>
    api.get<BaseItems<Category>>(`/products/${specId}/categories`);

export const fetchProductCategoriesFields = (specId: number, catId: number) =>
    api.get<BaseItems<ProductSpecField>>(
        `/products/${specId}/categories/${catId}/fields`
    );
export const fetchLocalProducts = (
    specId: number,
    addressId: number,
    raio: number,
    page?: number,
    pageSize?: number
) =>
    api.get<BaseItems<ProducerProduct>>(
        `/products/${specId}/products?addressId=${addressId}&raio=${raio}`,
        { params: { page, pageSize } }
    );
