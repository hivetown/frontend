import { Address, Consumer, CreateConsumer } from '@/types';
import { api } from './_base';

export const createConsumer = async (consumer: CreateConsumer) =>
    api.post<Consumer>('/consumers', consumer);

export const createConsumerAddress = (id: number, address: Address) =>
    api.post(`/consumers/${id}/addresses`, address);

// consumer is consumer or supplier
export const postConsumer = (consumer: CreateConsumer) => 
    api.post("/consumers", consumer);
