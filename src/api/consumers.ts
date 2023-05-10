import { Cart, Consumer, CreateConsumer } from "../types/interfaces";
import { api } from "./_base";

// consumer is consumer or supplier
export const postConsumer = (consumer: CreateConsumer) =>
    api.post("/consumers", consumer);

// Cart Stuff
export const fetchCartItems = (consumer: number) =>
    api.get<Cart>(`/consumers/${consumer}/cart`);
// NOTA: Usa-se ` quando há uma var.
// tem um <> porque é um tipo (get) que tem retorno

export const addCartItem = (
    consumer: number,
    producerProduct: number,
    quantity: number
) => api.post(`/consumers/${consumer}/cart`, { producerProduct, quantity });

export const deleteCartItem = (consumer: number, producerProduct: number) =>
    api.delete(`/consumers/${consumer}/cart/${producerProduct}`);
// O método (delete) vê-se no @ da API

export const updateQuantityCartItem = (
    consumer: number,
    producerProduct: number,
    quantity: number
) => api.put(`/consumers/${consumer}/cart/${producerProduct}`, quantity);
