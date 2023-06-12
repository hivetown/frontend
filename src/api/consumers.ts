import {
    Address,
    Consumer,
    CreateConsumer,
    ReportCard,
    ReportMap,
    ReportEvolution,
    ReportBarChartProduct,
} from '@/types';
import { api } from './_base';

export const createConsumer = async (consumer: CreateConsumer) =>
    api.post<Consumer>('/consumers', consumer);

export const createConsumerAddress = (id: number, address: Address) =>
    api.post(`/consumers/${id}/addresses`, address);

export const fetchConsumerReportCards = (
    id: number,
    dataInicio?: string,
    dataFim?: string,
    raio?: number
) =>
    api.get<ReportCard>(
        `/reports/${id}/flashcards?dataInicio=${dataInicio}&dataFim=${dataFim}&raio=${raio}`
    );

export const fetchConsumerReportMap = (
    id: number,
    dataInicio?: string,
    dataFim?: string,
    raio?: number
) =>
    api.get<ReportMap[]>(
        `/reports/${id}/map?dataInicio=${dataInicio}&dataFim=${dataFim}&raio=${raio}`
    );

export const fetchConsumerReportEvolution = (
    id: number,
    dataInicio?: string,
    dataFim?: string,
    raio?: number,
    view?: string
) =>
    api.get<ReportEvolution>(
        `/reports/${id}/evolution?dataInicio=${dataInicio}&dataFim=${dataFim}&raio=${raio}&${view}=true`
    );

export const fetchConsumerReportProducts = (
    id: number,
    dataInicio?: string,
    dataFim?: string,
    raio?: number,
    view?: string
) =>
    api.get<ReportBarChartProduct[]>(
        `/reports/${id}/products?dataInicio=${dataInicio}&dataFim=${dataFim}&raio=${raio}&${view}=true`
    );
// consumer is consumer or supplier
export const postConsumer = (consumer: CreateConsumer) =>
    api.post('/consumers', consumer);

export const getConsumersValues = (search?: string) =>
    api.get<Consumer[]>('/consumers', { params: { search } });

export const getConsumers = (
    page?: number,
    pageSize?: number,
    search?: string
) =>
    api.get<Consumer[]>('/consumers?includeAll=true', {
        params: { page, pageSize, search },
    });

export const getConsumerId = (consumerId: number, search?: string) =>
    api.get<Consumer[]>(`/consumers/${consumerId}?includeAll=true`, {
        params: { search },
    });

export const desativarConsumer = (consumerId: number, search?: string) =>
    api.delete(`/consumers/${consumerId}`, { params: { search } });

export const ativarConsumer = (consumerId: number, search?: string) =>
    api.post(`/consumers/${consumerId}/reativate`);

export const updateConsumer = (
    consumerId: number,
    formData: any,
    search?: string
) => api.put(`/consumers/${consumerId}`, formData, { params: { search } });
