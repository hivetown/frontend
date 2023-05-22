import { BaseItems, ProductSpecification } from '../types/interfaces';
import { api } from './_base';

export const fetchAllProducts = (search?: string) =>
    api.get<BaseItems<ProductSpecification>>('/products', {
        params: { search },
    });
