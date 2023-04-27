import { ProducerProducts } from '../types/interfaces';
import { api } from './_base';

export const fetchAllProducts = (id: number) => api.get<ProducerProducts[]>(`/producers/products/${id}`);
