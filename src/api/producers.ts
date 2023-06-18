import { Producer } from '../types/interfaces';
import { api } from './_base';

// producer is consumer or supplier
export const createProducer = (producer: Producer) =>
    api.post('/producer', producer);
