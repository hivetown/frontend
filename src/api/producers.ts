import {
    CreateProducer,
    CreateProducerProduct,
    ProducerProduct,
    UpdateProducerProduct,
} from '@/types';
import { api } from './_base';

export const createProducer = async (producer: CreateProducer) =>
    api.post('/producers', producer);

export const fetchAllProductionUnits = async (
    producerId: number,
    search?: string
) => api.get(`/producers/${producerId}/units`, { params: { search } });

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
