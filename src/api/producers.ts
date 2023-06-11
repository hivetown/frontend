import { CreateProducer } from '@/types';
import { Producer } from '../types/interfaces';
import { api } from './_base';

// producer is consumer or supplier
export const postProducer = (producer: Producer) =>
    api.post('/producer', producer);

export const createProducer = async (producer: CreateProducer) =>
    api.post('/producers', producer);
