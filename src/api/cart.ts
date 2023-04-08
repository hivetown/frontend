import { ShippingAdress } from '../types/interfaces';
import { api } from "./_base";

export const postOrderPayment = (userId: string, shippingAddress: ShippingAdress) => {
  return api.post(`/consumers/${userId}/orders`, shippingAddress);
};
