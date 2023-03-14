import { Producer } from "../types/interfaces";
import { api } from "./_base";

// consumer is consumer or supplier
export const postConsumer = (consumer: Producer) => 
    api.post("/consumers", consumer);
