import { ProductionUnit } from '../types/interfaces';
import { api } from './_base';

export const fetchUnit = (producerID: number, id: number) =>
    api.get<ProductionUnit>(`/producers/${producerID}/units/${id}`);
