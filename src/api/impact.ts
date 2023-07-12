import {
    ReportCard,
    ReportMap,
    ReportEvolution,
    ReportBarChartProduct,
    reportProducerClients,
} from '@/types';
import { api } from './_base';

export const fetchReportCards = (
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

export const fetchAdminReportCards = (
    dataInicio?: string,
    dataFim?: string,
    raio?: number,
    categoryId?: number
) =>
    // api.get<ReportCard>(
    //     `/reports/admin/flashcards?dataInicio=${dataInicio}&dataFim=${dataFim}&raio=${raio}`
    // );
    api.get<ReportCard>('/reports/admin/flashcards', {
        params: {
            dataInicio,
            dataFim,
            raio,
            categoryId,
        },
    });

export const fetchReportMap = (
    id: number,
    dataInicio?: string,
    dataFim?: string,
    raio?: number
) =>
    api.get<ReportMap[]>(
        `/reports/${id}/map?dataInicio=${dataInicio}&dataFim=${dataFim}&raio=${raio}`
    );

export const fetchAdminReportMap = (
    dataInicio?: string,
    dataFim?: string,
    raio?: number
) =>
    api.get<ReportMap[]>(
        `/reports/admin/map?dataInicio=${dataInicio}&dataFim=${dataFim}&raio=${raio}`
    );

export const fetchReportEvolution = (
    id: number,
    dataInicio?: string,
    dataFim?: string,
    raio?: number,
    categoryId?: number,
    view?: string
) =>
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

export const fetchAdminReportEvolution = (
    dataInicio?: string,
    dataFim?: string,
    raio?: number,
    categoryId?: number,
    view?: string
) =>
    // api.get<Record<string, ReportEvolution>>(
    //     `/reports/admin/evolution?dataInicio=${dataInicio}&dataFim=${dataFim}&raio=${raio}&${view}=true`
    // );
    api.get<Record<string, ReportEvolution>>('/reports/admin/evolution', {
        params: {
            dataInicio,
            dataFim,
            raio,
            categoryId,
            [view!]: true,
        },
    });

export const fetchReportProducts = (
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

export const fetchAdminReportProducts = (
    dataInicio?: string,
    dataFim?: string,
    raio?: number,
    categoryId?: number,
    view?: string
) =>
    // api.get<ReportBarChartProduct[]>(
    //     `/reports/admin/products?dataInicio=${dataInicio}&dataFim=${dataFim}&raio=${raio}&${view}=true`
    // );
    api.get<ReportBarChartProduct[]>('/reports/admin/products', {
        params: {
            dataInicio,
            dataFim,
            raio,
            categoryId,
            [view!]: true,
        },
    });

export const fetchAdminReportClients = (
    dataInicio?: string,
    dataFim?: string,
    raio?: number,
    categoryId?: number,
    view?: string
) =>
    // TODO - substituir o tipo any pelo tipo correto
    // api.get<reportProducerClients[]>(
    //     `/reports/admin/clients?dataInicio=${dataInicio}&dataFim=${dataFim}&raio=${raio}&${view}=true`
    // );
    api.get<reportProducerClients[]>('/reports/admin/clients', {
        params: {
            dataInicio,
            dataFim,
            raio,
            categoryId,
            [view!]: true,
        },
    });
