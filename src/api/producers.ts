import { Producer, CreateProducer } from "../types/interfaces";
import { api } from "./_base";


export const postProducer = (producer: CreateProducer) => 
    api.post("/producers", producer);
