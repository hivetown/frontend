import { api } from './_base';
import { coordinates } from '../types/interfaces';

// fetchConsumerLocation receives logged user id
export const fetchConsumerLocation = (id: number) =>
    api.get<coordinates[]>(`/consumers/${id}/addresses`);
