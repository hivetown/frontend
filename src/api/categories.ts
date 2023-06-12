import { Category, BaseItems } from '../types/interfaces';
import { api } from './_base';

export const fetchAllCategories = (search?: string) =>
    api.get<BaseItems<Category>>('/categories', { params: { search } });

export const fetchCategory = (specId: number) =>
    api.get<Category>(`/categories/${specId}`);

export const fetchCategorySubCategories = (specId: number) =>
    api.get<Category>(`/categories/${specId}/categories`);