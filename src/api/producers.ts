import { Producer } from '../types/interfaces';
import { api } from './_base';

export const fetchProductProducer = (specId: number) =>
    api.get<Producer[]>(`/products/${specId}`);
