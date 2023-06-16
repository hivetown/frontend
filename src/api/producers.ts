import { BaseItems, CreateProducer, Producer, ProductionUnit, reportProducerClients } from '@/types';
import { api } from './_base';

export const createProducer = async (producer: CreateProducer) =>
    api.post('/producers', producer);

export const fetchProducerReportClients = (
    id: number,
    dataInicio?: string,
    dataFim?: string,
    raio?: number,
    view?: string
) =>
    // TODO - substituir o tipo any pelo tipo correto
	api.get<reportProducerClients[]>(
        `/reports/${id}/clients?dataInicio=${dataInicio}&dataFim=${dataFim}&raio=${raio}&${view}=true`
    );
export const fetchProducer = (id: number) =>
    api.get<Producer>(`/producers/${id}`);

export const fetchProducerProductionUnits = (id: number) =>
    api.get<BaseItems<ProductionUnit>>(`/producers/${id}/units`);

// TODO - descobrir se isto é usado em algum lado
// export const fetchProductProducer = (specId: number) =>
//     api.get<Producer[]>(`/products/${specId}`);
