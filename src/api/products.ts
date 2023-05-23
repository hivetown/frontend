import { api } from './_base';
import {
    ProductSpec,
    Category,
    BaseItems,
    ProducerProduct,
    ProductSpecField,
} from '../types/interfaces';

interface FetchAllProductsParams {
    page?: number;
    pageSize?: number;
    search?: string;
    categoryId?: number;
}
export const fetchAllProducts = ({
    page,
    pageSize,
    search,
    categoryId,
}: FetchAllProductsParams = {}) =>
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
