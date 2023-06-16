import { Address, Consumer, CreateConsumer } from '@/types';
import { api } from './_base';

export const createConsumer = async (consumer: CreateConsumer) =>
    api.post<Consumer>('/consumers', consumer);

export const createConsumerAddress = (id: number, address: Address) =>
    api.post(`/consumers/${id}/addresses`, address);

// consumer is consumer or supplier
export const postConsumer = (consumer: CreateConsumer) =>
    api.post('/consumers', consumer);

export const getConsumersValues = (search?: string) =>
    api.get<any>('/consumers', { params: { search } });

export const getConsumers = (
    page?: number,
    pageSize?: number,
    search?: string
) =>
    api.get<any>('/consumers?includeAll=true', {
        params: { page, pageSize, search },
    });

export const getConsumerId = (consumerId: number) =>
    api.get<Consumer>(`/consumers/${consumerId}?includeAll=true`);

export const desativarConsumer = (consumerId: number, search?: string) =>
    api.delete(`/consumers/${consumerId}`, { params: { search } });

export const ativarConsumer = (consumerId: number) =>
    api.post(`/consumers/${consumerId}/reativate`);

export const updateConsumer = (
    consumerId: number,
    formData: any,
    search?: string
) => api.put(`/consumers/${consumerId}`, formData, { params: { search } });
