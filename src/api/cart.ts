import { ShippingAdress } from '../types/interfaces';
import { api } from "./_base";

//TODO trocar p user logado

export const postOrderPayment = (userId: string, shippingAddress: ShippingAdress ) => {
  return api.post(`/consumers/${userId}/orders`, shippingAddress);
};

export const deleteCart = (userId: string) => {
  return api.delete(`/consumers/${userId}/cart`)
}

export const getAddresses = (userId: string) => {
  return api.get(`/consumers/${userId}/addresses`)
}