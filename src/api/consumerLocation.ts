import { api } from './_base';
import { Location } from '../types/interfaces';

// fetchConsumerLocation receives logged user id
export const fetchConsumerLocation = (id: number) =>
    api.get<Location[]>(`/consumers/${id}/addresses`);
