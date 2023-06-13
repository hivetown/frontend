import { CreateProducer } from '@/types';
import { Producer } from '../types/interfaces';
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
    api.get<any[]>(
        `/reports/${id}/clients?dataInicio=${dataInicio}&dataFim=${dataFim}&raio=${raio}&${view}=true`
    );
// consumer is consumer or supplier
export const postConsumer = (producer: Producer) =>
    api.post('/producer', producer);

export const getProducersValues = (search?: string) =>
    api.get<Producer[]>('/producers', { params: { search } });

export const getProducers = (
    page?: number,
    pageSize?: number,
    search?: string
) =>
    api.get<Producer[]>('/producers?includeAll=true', {
        params: { page, pageSize, search },
    });

export const getProducerId = (producerId: number, search?: string) =>
    api.get<Producer[]>(`/producers/${producerId}?includeAll=true`, {
        params: { search },
    });

export const desativarProducer = (producerId: number, search?: string) =>
    api.delete(`/producers/${producerId}`, { params: { search } });

export const ativarProducer = (producerId: number, search?: string) =>
    api.post(`/producers/${producerId}/reativate`);

export const updateProducer = (
    producerId: number,
    formData: any,
    search?: string
) => api.put(`/producers/${producerId}`, formData, { params: { search } });

export const getAddressPU = (
    producerId: number,
    AddressId: number,
    search?: string
) =>
    api.get<Producer[]>(`/producers/${producerId}/units/${AddressId}`, {
        params: { search },
    });
