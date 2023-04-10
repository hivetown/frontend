import { AddressConsumer } from "../types/interfaces";
import { api } from "./_base";

export const postAddressConsumer = (id: number, address: AddressConsumer) =>
    api.post(`/consumers/${id}/adresses`, address);
