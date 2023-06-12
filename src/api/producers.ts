import { api } from "./_base";
import { BaseItems, CreateProducer, Producer, productionUnit } from '@/types';
export const createProducer = async (producer: CreateProducer) =>
    api.post("/producers", producer);


export const fetchProducer = (id: number) =>
    api.get<Producer>(`/producers/${id}`);

export const fetchProducerProductionUnits = (id: number) =>
    api.get<BaseItems<productionUnit>>(`/producers/${id}/units`);
