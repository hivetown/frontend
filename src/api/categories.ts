import { Category, BaseItems } from '@/types';
import { api } from './_base';

export const fetchAllCategories = ({
    productSearch,
    page,
    pageSize,
    productMinPrice,
    productMaxPrice,
}: {
    productSearch?: string;
    page?: number;
    pageSize?: number;
    // Product filters
    productMinPrice?: number;
    productMaxPrice?: number;
}) =>
    api.get<BaseItems<Category>>('/categories', {
        params: {
            productSearch,
            page,
            pageSize,
            minPrice: productMinPrice,
            productMaxPrice,
        },
    });

export const fetchCategory = (specId: number) =>
    api.get<Category>(`/categories/${specId}`);

export const fetchCategorySubCategories = (specId: number) =>
    api.get<Category>(`/categories/${specId}/categories`);
