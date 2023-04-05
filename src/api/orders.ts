import { Order } from "../types/interfaces";
import { api } from "./_base";

export const fetchAllOrders = (userId: string, search?: string) =>
    api.get<Order[]>(`/consumers/${userId}/orders`, { params: { search } });

export const fetchAllItems = (orderId: string, search?: string) =>
    api.get<Order[]>(`/consumers/8/orders/${orderId}/items`, { params: { search } });
  
export const fetchOrder = (orderId: string, search?: string) =>
    api.get<Order[]>(`/consumers/8/orders/${orderId}`, { params: { search } });