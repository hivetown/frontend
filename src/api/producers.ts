import {
    BaseItems,
    CreateProducer,
    Producer,
    ProductionUnit,
    reportProducerClients,
} from '@/types';
import { api } from './_base';

export const createProducer = async (producer: CreateProducer) =>
    api.post('/producers', producer);

export const getProducersValues = (search?: string) =>
    api.get<any>('/producers', { params: { search } });

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

//nao da com o includeall
export const getProducers = (
	page?: number,
    pageSize?: number,
    search?: string
) =>     api.get('/producers?includeAll=true', {
	params: { page, pageSize, search },
});
	
export const fetchAllProducers = (
    page?: number,
    pageSize?: number,
    search?: string
) =>    
api.get<BaseItems<Producer>>('/producers', {
        params: { page, pageSize, search },
    });

export const fetchProducerProductionUnits = (id: number) =>
    api.get<BaseItems<ProductionUnit>>(`/producers/${id}/units`);

// TODO - descobrir se isto é usado em algum lado
// export const fetchProductProducer = (specId: number) =>
//     api.get<Producer[]>(`/products/${specId}`);

export const desativarProducer = (producerId: number, search?: string) =>
    api.delete(`/producers/${producerId}`, { params: { search } });

export const ativarProducer = (producerId: number) =>
    api.post(`/producers/${producerId}/reativate`);

export const updateProducer = (
    producerId: number,
    formData: any,
    search?: string
) => api.put(`/producers/${producerId}`, formData, { params: { search } });

export const getAddressPU = (producerId: number, search?: string) =>
    api.get<BaseItems<ProductionUnit>>(`/producers/${producerId}/units`, {
        params: { search },
    });
//nao da com o include all
export const getProducerId = (producerId: number, search?: string) =>
    api.get<Producer>(`/producers/${producerId}?includeAll=true`, {
        params: { search },
    });