import {
    Address,
    Consumer,
    CreateConsumer,
    ReportCard,
    ReportMap,
    ReportEvolution,
    ReportBarChartProduct,
    CreateAddress,
} from '@/types';
import { api } from './_base';

// POST
export const createConsumer = async (consumer: CreateConsumer) =>
    api.post<Consumer>('/consumers', consumer);

export const createConsumerAddress = (id: number, address: Address) =>
    api.post(`/consumers/${id}/addresses`, address);

export const getConsumerAddresses = (id: number) =>
    api.get(`/consumers/${id}/addresses`);
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
    api.get('/consumers?includeAll=true', {
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
export const postNewAdress = (consumerId: number, address: CreateAddress) =>
    api.post(`/consumers/${consumerId}/addresses`, address);

export const cancelPayment = (consumerId: number, sessionId: string) =>
    api.post(`/consumers/${consumerId}/orders/cancel?session_id=${sessionId}`);

// GET
export const fetchConsumerReportCards = (
    id: number,
    dataInicio?: string,
    dataFim?: string,
    raio?: number,
    categoryId?: number
) =>
    api.get<ReportCard>(`/reports/${id}/flashcards`, {
        params: {
            dataInicio,
            dataFim,
            raio,
            categoryId,
        },
    });

// export const fetchConsumerReportMap = (
//     id: number,
//     dataInicio?: string,
//     dataFim?: string,
//     raio?: number
// ) =>
//     api.get<ReportMap[]>(
//         `/reports/${id}/map?dataInicio=${dataInicio}&dataFim=${dataFim}&raio=${raio}`
//     );

// export const fetchConsumerReportEvolution = (params?: {
//     id: number;
//     dataInicio?: string;
//     dataFim?: string;
//     raio?: number;
//     categoryId?: number;
//     view: string;
// }) =>
//     // api.get<Record<string, ReportEvolution>>(
//     //     `/reports/${id}/evolution?dataInicio=${dataInicio}&dataFim=${dataFim}&raio=${raio}&categoryId=${categoryId}&${view}=true`
//     // );
//     api.get<Record<string, ReportEvolution>>(`/reports/${id}/evolution`, {
//         params,
//     });

export const fetchConsumerReportEvolution = (
    id: number,
    dataInicio?: string,
    dataFim?: string,
    raio?: number,
    categoryId?: number,
    view?: string
) =>
    // api.get<Record<string, ReportEvolution>>(
    //     `/reports/${id}/evolution?dataInicio=${dataInicio}&dataFim=${dataFim}&raio=${raio}&categoryId=${categoryId}&${view}=true`
    // );

    // Isto funciona apesar do erro, é só resolver
    api.get<Record<string, ReportEvolution>>(`/reports/${id}/evolution`, {
        params: {
            dataInicio,
            dataFim,
            raio,
            categoryId,
            [view]: true,
        },
    });

export const fetchConsumerReportProducts = (
    id: number,
    dataInicio?: string,
    dataFim?: string,
    raio?: number,
    categoryId?: number,
    view?: string
) =>
    api.get<ReportBarChartProduct[]>(`/reports/${id}/products`, {
        params: {
            dataInicio,
            dataFim,
            raio,
            categoryId,
            [view]: true,
        },
    });
