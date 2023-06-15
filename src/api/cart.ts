import { ShippingAdress } from '../types/interfaces';
import { api } from './_base';

export const postOrderPayment = (
    userId: number,
    shippingAddress: ShippingAdress
) => {
    return api.post(`/consumers/${userId}/orders`, shippingAddress);
};

export const deleteCart = (userId: string) => {
    return api.delete(`/consumers/${userId}/cart`);
};

export const getAddresses = (userId: number) => {
    return api.get(`/consumers/${userId}/addresses`);
};
export const getCart = (userId: number) => {
    return api.get(`/consumers/${userId}/cart`);
};
export const getProduct = (userId: number) => {
    return api.get(`/products/${userId}/products`);
};
