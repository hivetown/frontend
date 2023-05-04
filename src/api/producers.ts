import { Producer } from "../types/interfaces";
import { api } from "./_base";

// consumer is consumer or supplier
export const postConsumer = (producer: Producer) => 
    api.post("/producer", producer);

export const getProducersValues = (search?: string) => 
    api.get<Producer[]>("/producer", { params: { search } });

export const getProducers = (page?: number, pageSize?: number, search?: string) =>
    api.get<Producer[]>("/producers", { params: { page, pageSize, search } });


