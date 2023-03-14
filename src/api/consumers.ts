import { Consumer } from "../types/interfaces";
import { api } from "./_base";

// consumer is consumer or supplier
export const postConsumer = (consumer: Consumer) => 
    api.post("/consumers", consumer);
