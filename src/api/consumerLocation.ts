import { api } from './_base';
import { Location } from '../types/interfaces';

export const fetchConsumerLocation = (id: number) =>
    api.get<Location>(`/consumers/${id}/addresses`);
