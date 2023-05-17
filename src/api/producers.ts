import { CreateProducer, Producer } from '@/types';
import { api } from './_base';

export const createProducer = async (producer: CreateProducer) =>
    api.post('/producers', producer);

export const fetchProductProducer = (specId: number) =>
	api.get<Producer[]>(`/products/${specId}`);
