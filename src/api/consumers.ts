import {
    Address,
    Consumer,
    CreateConsumer,
    ReportCard,
    ReportMap,
    ReportEvolution,
    ReportBarChartProduct,
	CreateAddress
} from '@/types';
import { api } from './_base';

// POST
export const createConsumer = async (consumer: CreateConsumer) =>
    api.post<Consumer>('/consumers', consumer);

export const createConsumerAddress = (id: number, address: Address) =>
    api.post(`/consumers/${id}/addresses`, address);

// consumer is consumer or supplier
export const postConsumer = (consumer: CreateConsumer) =>
	api.post('/consumers', consumer);

export const postNewAdress = (consumerId: number, address: CreateAddress) =>
	api.post(`/consumers/${consumerId}/addresses`, address);

export const cancelPayment = (consumerId: number, sessionId: string) =>
	api.post(`/consumers/${consumerId}/orders/cancel?session_id=${sessionId}`);


// GET
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
