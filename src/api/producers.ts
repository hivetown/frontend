import { BaseItems, CreateProducer, Producer, ProductionUnit } from '@/types';
import { api } from './_base';

export const createProducer = async (producer: CreateProducer) =>
    api.post('/producers', producer);

export const fetchProducer = (id: number) =>
    api.get<Producer>(`/producers/${id}`);

export const fetchProducerProductionUnits = (id: number) =>
    api.get<BaseItems<productionUnit>>(`/producers/${id}/units`);

// TODO - descobrir se isto é usado em algum lado
// export const fetchProductProducer = (specId: number) =>
//     api.get<Producer[]>(`/products/${specId}`);
