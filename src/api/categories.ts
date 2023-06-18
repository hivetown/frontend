import { Category, BaseItems } from '@/types';
import { api } from './_base';

export const fetchAllCategories = ({
    parentId,
    productSearch,
    page,
    pageSize,
    productMinPrice,
    productMaxPrice,
}: {
    parentId?: number;
    productSearch?: string;
    page?: number;
    pageSize?: number;
    // Product filters
    productMinPrice?: number;
    productMaxPrice?: number;
} = {}) =>
    api.get<BaseItems<Category>>('/categories', {
        params: {
            parentId,
            productSearch,
            page,
            pageSize,
            productMinPrice,
            productMaxPrice,
        },
    });

export const fetchCategory = (id: number) =>
    api.get<Category>(`/categories/${id}`);
