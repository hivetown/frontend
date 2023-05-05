import { Consumer, CreateConsumer } from '../types/interfaces';
import { api } from "./_base";

// consumer is consumer or supplier
export const postConsumer = (consumer: CreateConsumer) => 
    api.post("/consumers", consumer);

export const getConsumersValues = (search?: string) => 
    api.get<Consumer[]>("/consumers", { params: { search } });

export const getConsumers = (page?: number, pageSize?: number, search?: string) =>
    api.get<Consumer[]>("/consumers?includeAll=true", { params: { page, pageSize, search } });


export const getConsumerId = (consumerId: number, search?: string) => 
    api.get<Consumer[]>(`/consumers/${consumerId}?includeAll=true`, { params: { search } });

export const desativarConsumer = (consumerId: number, search? : string) =>
    api.delete(`/consumers/${consumerId}`, { params: { search } });

export const ativarConsumer = (consumerId: number, search? : string) =>
    api.post(`/consumers/${consumerId}/reativate`);

export const updateConsumer = (consumerId: number, formData: any, search?: string) =>
    api.put(`/consumers/${consumerId}`, formData, { params: { search } });
