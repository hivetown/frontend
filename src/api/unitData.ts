import { productionUnit } from '../types/interfaces';
import { api } from './_base';

export const fetchUnit = (producerID: number, id: number) =>
    api.get<productionUnit>(`/producers/${producerID}/units/${id}`);
