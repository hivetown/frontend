import { ProducerProducts } from '../types/interfaces';
import { api } from './_base';

// export const fetchAllProducts = (id: number) =>
//     api.get<ProducerProducts[]>(`/producers/${id}/products`);

export const fetchAllProducts = (
    id: number,
    page: number,
    pageSize: number
) =>
    api.get<ProducerProducts[]>(`/producers/${id}/products`, {
        params: { page, pageSize },
    });
