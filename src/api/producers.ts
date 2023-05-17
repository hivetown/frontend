import { Address, CreateProducer } from '@/types';
import { api } from './_base';

export const createProducer = async (producer: CreateProducer) =>
    api.post('/producers', producer);

export const getUnit = (producerId: number, unitId: number) =>
    api.get(`/${producerId}/units/${unitId}`);

export const createProdutionUnit = (
    producerId: number,
    name: string,
    address: Address
) => api.post(`/${producerId}/units`, { name, address });

export const updateProductionUnit = (
    producerId: number,
    unitId: number,
    name: string,
    address: Address
) => api.post(`/${producerId}/units/${unitId}`, { name, address });

export const deleteProductionUnit = (producerId: number, unitId: number) =>
    api.delete(`/${producerId}/units/${unitId}`);
