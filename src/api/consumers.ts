import {
    Address,
    Consumer,
    CreateConsumer,
    ReportCard,
    ReportEvolution,
    ReportBarChartProduct,
    CreateAddress,
    BaseItems,
} from '@/types';
import { Cart } from '../types/interfaces';
import { api } from './_base';

// consumer is consumer or supplier
export const createConsumer = (consumer: CreateConsumer) =>
    api.post<Consumer>('/consumers', consumer);

// Cart Stuff
export const fetchCartItems = (consumer: number) =>
    api.get<Cart>(`/consumers/${consumer}/cart`);
// NOTA: Usa-se ` quando há uma var.
// tem um <> porque é um tipo (get) que tem retorno

export const addCartItem = (
    consumer: number,
    producerProduct: number,
    quantity: number
) => api.post(`/consumers/${consumer}/cart`, { producerProduct, quantity });

export const deleteCartItem = (consumer: number, producerProduct: number) =>
    api.delete(`/consumers/${consumer}/cart/${producerProduct}`);

export const deleteCart = (consumer: number) =>
    api.delete(`/consumers/${consumer}/cart`);

export const updateQuantityCartItem = (
    consumer: number,
    producerProduct: number,
    quantity: number
) => api.put(`/consumers/${consumer}/cart/${producerProduct}`, { quantity });

export const createConsumerAddress = (id: number, address: Address) =>
    api.post(`/consumers/${id}/addresses`, address);

export const getConsumerAddresses = (id: number) =>
    api.get(`/consumers/${id}/addresses`);
// consumer is consumer or supplier
export const postConsumer = (consumer: CreateConsumer) =>
    api.post('/consumers', consumer);

export const fetchAllConsumers = (params?: {
    page?: number;
    pageSize?: number;
    search?: string;
    includeAll?: boolean;
}) =>
    api.get<BaseItems<Consumer>>('/consumers', {
        params,
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
            [view!]: true,
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
            [view!]: true,
        },
    });
