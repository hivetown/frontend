import { CreateProducer } from '@/types';
import { api } from './_base';

export const createProducer = async (producer: CreateProducer) =>
    api.post('/producers', producer);

export const createProdutionUnit = (producerId: number) =>
    api.post('/${producerId}/units');
