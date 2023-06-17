import { CreateProducer } from '@/types';
import { Producer, productionUnit, BaseItems } from '../types/interfaces';
import { api } from './_base';

export const createProducer = async (producer: CreateProducer) =>
    api.post('/producers', producer);

export const getProducersValues = (search?: string) =>
    api.get<any>('/producers', { params: { search } });
//nao da com o includeall
export const getProducers = (
    page?: number,
    pageSize?: number,
    search?: string
) =>
    api.get<any>('/producers', {
        params: { page, pageSize, search },
    });
//nao da com o include all
export const getProducerId = (producerId: number, search?: string) =>
    api.get<Producer>(`/producers/${producerId}`, {
        params: { search },
    });

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
    api.get<BaseItems<productionUnit>>(`/producers/${producerId}/units`, {
        params: { search },
    });
