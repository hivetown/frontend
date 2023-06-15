import { Order, Consumer } from '../types/interfaces';
import { api } from './_base';

export const fetchAllOrders = (userId: number, search?: string) =>
    api.get<Order[]>(`/consumers/${userId}/orders`, { params: { search } });

export const fetchAllItems = (
    userId: number,
    orderId: string,
    search?: string
) =>
    api.get<Order[]>(`/consumers/${userId}/orders/${orderId}/items`, {
        params: { search },
    });

export const fetchOrder = (userId: number, orderId: string, search?: string) =>
    api.get<Order[]>(`/consumers/${userId}/orders/${orderId}`, {
        params: { search },
    });


export const getShipment = (
    consumerId: number,
    orderId: number,
    producerProduct: number,
    search?: string
) =>
    api.get(
        `/consumers/${consumerId}/orders/${orderId}/items/${producerProduct}/shipment`,
        { params: { search } }
    );
