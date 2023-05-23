import { CreateProducer, CreateProducerProduct, Product } from '@/types';
import { api } from './_base';

export const createProducer = async (producer: CreateProducer) =>
    api.post('/producers', producer);

export const fetchAllProductionUnits = async (
    producerId: number,
    search?: string
) => api.get(`/producers/${producerId}/units?search=${search}`);

export const createProducerProduct = async (
    producerId: number,
    product: CreateProducerProduct
) => api.post<Product>(`/producers/${producerId}/products`, product);
