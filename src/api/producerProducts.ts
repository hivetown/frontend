import { ProducerProducts } from '../types/interfaces';
import { api } from './_base';

// export const fetchAllProducts = (id: number) =>
//     api.get<ProducerProducts[]>(`/producers/${id}/products`);

export const fetchAllProducts = () =>
    api.get<ProducerProducts[]>('/producers/2/products');