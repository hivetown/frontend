import { Consumer, CreateConsumer } from '../types/interfaces';
import { api } from "./_base";

// consumer is consumer or supplier
export const postConsumer = (consumer: CreateConsumer) => 
    api.post("/consumers", consumer);

export const getConsumers = (search?: string) => 
    api.get<Consumer[]>("/consumers", { params: { search } });

export const getConsumerId = (consumerId: number, search?: string) => 
    api.get<Consumer[]>(`/consumers/${consumerId}`, { params: { search } });

