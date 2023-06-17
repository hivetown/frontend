import { BaseItems, ProducerProduct } from '../types/interfaces';
import { api } from './_base';

export const fetchAllProducts = (id: number, page: number, pageSize: number) =>
    api.get<BaseItems<ProducerProduct>>(`/producers/${id}/products`, {
        params: { page, pageSize },
    });
