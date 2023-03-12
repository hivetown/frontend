import { Consumer } from "../types/consumer";
import { api } from "./_base";

// consumer is consumer or supplier
export const postConsumer = (consumer: CONSUMER) => 
    api.post("/consumers", consumer);
