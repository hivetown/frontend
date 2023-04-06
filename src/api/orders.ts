import { Order } from "../types/interfaces";
import { Consumer } from "../types/interfaces";
import { api } from "./_base";

export const fetchAllOrders = (userId: string, search?: string) =>
    api.get<Order[]>(`/consumers/${userId}/orders`, { params: { search } });

export const fetchAllItems = (orderId: string, search?: string) =>
    api.get<Order[]>(`/consumers/6/orders/${orderId}/items`, { params: { search } });
  
export const fetchUser = (search?: string) =>
    api.get<Consumer[]>(`/auth`, { params: { search } });
