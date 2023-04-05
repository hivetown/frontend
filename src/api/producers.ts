import { Producer } from "../types/interfaces";
import { api } from "./_base";

// consumer is consumer or supplier
export const postConsumer = (producer: Producer) => 
    api.post("/producer", producer);
