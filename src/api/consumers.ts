import { Address, Consumer, CreateConsumer, Address2 } from '@/types';
import { api } from './_base';

export const createConsumer = async (consumer: CreateConsumer) =>
    api.post<Consumer>('/consumers', consumer);

export const createConsumerAddress = (id: number, address: Address) =>
    api.post(`/consumers/${id}/addresses`, address);

// consumer is consumer or supplier
export const postConsumer = (consumer: CreateConsumer) =>
    api.post('/consumers', consumer);

export const postNewAdress = (consumerId: number, address: Address2) =>
    api.post(`/consumers/${consumerId}/addresses`, address);

export const cancelPayment = (consumerId: number, sessionId: string) =>
    api.post(`/consumers/${consumerId}/orders/cancel?session_id=${sessionId}`);
