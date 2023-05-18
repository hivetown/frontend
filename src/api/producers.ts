import { CreateProducer } from '@/types';
import { api } from './_base';

export const createProducer = async (producer: CreateProducer) =>
    api.post('/producers', producer);
import { Producer } from '../types/interfaces';
import { api } from './_base';

// consumer is consumer or supplier
export const postConsumer = (producer: Producer) =>
    api.post('/producer', producer);
