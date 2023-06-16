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

export const fetchReportMap = (
    id: number,
    dataInicio?: string,
    dataFim?: string,
    raio?: number
) =>
    api.get<ReportMap[]>(
        `/reports/${id}/map?dataInicio=${dataInicio}&dataFim=${dataFim}&raio=${raio}`
    );

export const fetchReportEvolution = (
    id: number,
    dataInicio?: string,
    dataFim?: string,
    raio?: number,
    view?: string
) =>
    api.get<Record<string, ReportEvolution>>(
        `/reports/${id}/evolution?dataInicio=${dataInicio}&dataFim=${dataFim}&raio=${raio}&${view}=true`
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
