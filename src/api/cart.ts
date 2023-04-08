import { ShippingAdress } from '../types/interfaces';
import { api } from "./_base";

export const postOrderPayment = (userId: string, shippingAddress: ShippingAdress) => 
//TODO trocar userId pelo id do user logado
    api.post(`/consumers/${userId}/orders`, shippingAddress);