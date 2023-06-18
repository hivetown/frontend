import { ProductionUnit, Address } from '@/types';
import { BaseItems, CreateProducer, Producer } from '@/types';
import { api } from './_base';

export const createProducer = async (producer: CreateProducer) =>
    api.post('/producers', producer);

export const getUnits = (producerId: number) => api.get(`/${producerId}/units`);

export const getUnit = (producerId: number, unitId: number) =>
    api.get(`/producers/${producerId}/units/${unitId}`);

export const getProductionUnitProducts = (producerId: number, unitId: number) =>
    api.get(`/producers/${producerId}/units/${unitId}/products`);

export const fetchProductionUnits = (producerId: number) =>
    api.get<ProductionUnit>(`/producers/${producerId}/units`);

export const createProductionUnit = (
    producerId: number,
    name: string,
    address: Address
) => api.post(`/producers/${producerId}/units`, { name, address });

export const updateProductionUnit = (
    producerId: number,
    unitId: number,
    name: string,
    address: number
) => api.put(`/producers/${producerId}/units/${unitId}`, { name, address });

export const deleteProductionUnit = (producerId: number, unitId: number) =>
    api.delete(`/producers/${producerId}/units/${unitId}`);
export const fetchProducer = (id: number) =>
    api.get<Producer>(`/producers/${id}`);

export const fetchAllProducers = (
    page?: number,
    pageSize?: number,
    search?: string
) =>
    api.get<BaseItems<Producer>>('/producers', {
        params: { page, pageSize, search },
    });

export const fetchProducerProductionUnits = (id: number) =>
    api.get<BaseItems<ProductionUnit>>(`/producers/${id}/units`);

// TODO - descobrir se isto é usado em algum lado
// export const fetchProductProducer = (specId: number) =>
//     api.get<Producer[]>(`/products/${specId}`);
