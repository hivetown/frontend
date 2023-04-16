import { Consumer, CreateConsumer } from '../types/interfaces';
import { api } from "./_base";

// consumer is consumer or supplier
export const postConsumer = (consumer: CreateConsumer) => 
    api.post("/consumers", consumer);
