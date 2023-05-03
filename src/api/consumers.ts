import { Cart, Consumer, CreateConsumer } from '../types/interfaces';
import { api } from "./_base";

// consumer is consumer or supplier
export const postConsumer = (consumer: CreateConsumer) => 
    api.post("/consumers", consumer);

// Cart Stuff
export const fetchCartItems = (consumer: number) =>
    api.get<Cart>(`/consumers/${consumer}/cart`); //NOTA: Usa-se ` quando há uma var.
     // tem um <> porque é um tipo (get) que tem retorno

export const deleteCartItem = (consumerId: number, producerProductId: number) =>
    api.delete(`/consumers/${consumerId}/cart/${producerProductId}`);
    // O método (delete) vê-se no @ da API