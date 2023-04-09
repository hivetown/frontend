import { Order, Consumer } from "../types/interfaces";
import { api } from "./_base";

export const fetchAllOrders = (userId: string, search?: string) =>
    api.get<Order[]>(`/consumers/${userId}/orders`, { params: { search } });

export const fetchAllItems = (userId: string, orderId: string, search?: string) =>
    api.get<Order[]>(`/consumers/${userId}/orders/${orderId}/items`, { params: { search } });
  
export const fetchOrder = (userId: string, orderId: string, search?: string) =>
    api.get<Order[]>(`/consumers/${userId}/orders/${orderId}`, { params: { search } });

//obtem o user logado
export const fetchUser = (search?: string) =>
    api.get<Consumer[]>(`/auth`, { params: { search } });

