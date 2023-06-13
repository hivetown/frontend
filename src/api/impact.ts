import {
    ReportCard,
    ReportMap,
    ReportEvolution,
    ReportBarChartProduct,
} from '@/types';
import { api } from './_base';

export const fetchReportCards = (
    id: number,
    dataInicio?: string,
    dataFim?: string,
    raio?: number
) =>
    api.get<ReportCard>(
        `/reports/${id}/flashcards?dataInicio=${dataInicio}&dataFim=${dataFim}&raio=${raio}`
    );

export const fetchAdminReportCards = (
    dataInicio?: string,
    dataFim?: string,
    raio?: number
) =>
    api.get<ReportCard>(
        `/reports/admin/flashcards?dataInicio=${dataInicio}&dataFim=${dataFim}&raio=${raio}`
    );

export const fetchReportMap = (
    id: number,
    dataInicio?: string,
    dataFim?: string,
    raio?: number
) =>
    api.get<ReportMap[]>(
        `/reports/admin/map?dataInicio=${dataInicio}&dataFim=${dataFim}&raio=${raio}`
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
    view?: string
) =>
    api.get<ReportEvolution>(
        `/reports/${id}/evolution?dataInicio=${dataInicio}&dataFim=${dataFim}&raio=${raio}&${view}=true`
    );

export const fetchAdminReportEvolution = (
    dataInicio?: string,
    dataFim?: string,
    raio?: number,
    view?: string
) =>
    api.get<ReportEvolution>(
        `/reports/admin/evolution?dataInicio=${dataInicio}&dataFim=${dataFim}&raio=${raio}&${view}=true`
    );

export const fetchReportProducts = (
    id: number,
    dataInicio?: string,
    dataFim?: string,
    raio?: number,
    view?: string
) =>
    api.get<ReportBarChartProduct[]>(
        `/reports/${id}/products?dataInicio=${dataInicio}&dataFim=${dataFim}&raio=${raio}&${view}=true`
    );

export const fetchAdminReportProducts = (
    dataInicio?: string,
    dataFim?: string,
    raio?: number,
    view?: string
) =>
    api.get<ReportBarChartProduct[]>(
        `/reports/admin/products?dataInicio=${dataInicio}&dataFim=${dataFim}&raio=${raio}&${view}=true`
    );

export const fetchAdminReportClients = (
    dataInicio?: string,
    dataFim?: string,
    raio?: number,
    view?: string
) =>
    // TODO - substituir o tipo any pelo tipo correto
    api.get<any[]>(
        `/reports/admin/clients?dataInicio=${dataInicio}&dataFim=${dataFim}&raio=${raio}&${view}=true`
    );
