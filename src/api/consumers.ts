import { Cart, Consumer, CreateConsumer } from '../types/interfaces';
import { api } from "./_base";

// consumer is consumer or supplier
export const postConsumer = (consumer: CreateConsumer) => 
    api.post("/consumers", consumer);

// Cart Stuff
export const fetchCartItems = (consumer: number) =>
    api.get<Cart>(`/consumers/${consumer}/cart`); //NOTA: Usa-se ` quando há uma var.