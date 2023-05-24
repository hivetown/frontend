import { CreateProducer } from '@/types';
import { api } from './_base';

export const createProducer = async (producer: CreateProducer) =>
    api.post('/producers', producer);
import { Producer } from '../types/interfaces';
