import {
    CreateProducer,
    CreateProducerProduct,
    UpdateProducerProduct,
    BaseItems,
    Producer,
    ProductionUnit,
    reportProducerClients,
    ProducerProduct,
    Shipment,
    Carrier,
} from '@/types';
import { api } from './_base';

export const createProducer = async (producer: CreateProducer) =>
    api.post('/producers', producer);

export const getProducersValues = (search?: string) =>
    api.get<any>('/producers', { params: { search } });
export const fetchProducerProductionUnits = async (
    producerId: number,
    search?: string
) =>
    api.get<BaseItems<ProductionUnit>>(`/producers/${producerId}/units`, {
        params: { search },
    });

export const createProducerProduct = async (
    producerId: number,
    product: CreateProducerProduct
) => api.post<ProducerProduct>(`/producers/${producerId}/products`, product);

export const updateProducerProduct = async (
    producerId: number,
    producerProductId: number,
    product: UpdateProducerProduct
) =>
    api.put<ProducerProduct>(
        `/producers/${producerId}/products/${producerProductId}`,
        product
    );

export const deleteProducerProduct = async (
    producerId: number,
    producerProductId: number
) => api.delete(`/producers/${producerId}/products/${producerProductId}`);
export const fetchProducerReportClients = (
    id: number,
    dataInicio?: string,
    dataFim?: string,
    raio?: number,
    view?: string
) =>
    // TODO - substituir o tipo any pelo tipo correto
    api.get<reportProducerClients[]>(
        `/reports/${id}/clients?dataInicio=${dataInicio}&dataFim=${dataFim}&raio=${raio}&${view}=true`
    );
export const fetchProducer = (id: number) =>
    api.get<Producer>(`/producers/${id}`);

export const fetchAllProducers = (params?: {
    page?: number;
    pageSize?: number;
    search?: string;
    includeAll?: boolean;
}) =>
    api.get<BaseItems<Producer>>('/producers', {
        params,
    });

// TODO - descobrir se isto é usado em algum lado
// export const fetchProductProducer = (specId: number) =>
//     api.get<Producer[]>(`/products/${specId}`);

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
    api.get<BaseItems<ProductionUnit>>(`/producers/${producerId}/units`, {
        params: { search },
    });
//nao da com o include all
export const getProducerId = (producerId: number, search?: string) =>
    api.get<Producer>(`/producers/${producerId}?includeAll=true`, {
        params: { search },
    });

export const associateOrderItemShipment = (
    producerId: number,
    unitId: number,
    carrierId: number,
    shipmentId: number
) =>
    api.post<Shipment>(
        `/producers/${producerId}/units/${unitId}/carriers/${carrierId}/shipments`,
        {
            shipmentId,
        }
    );

export const fetchAllProductionUnitCarriers = (
    producerId: number,
    unitId: number,
    params?: {
        page?: number;
        pageSize?: number;
        status?: 'Available' | 'Unavailable';
    }
) =>
    api.get<BaseItems<Carrier>>(
        `/producers/${producerId}/units/${unitId}/carriers`,
        { params }
    );
