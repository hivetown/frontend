import { AddressConsumer } from "../types/interfaces";
import { api } from "./_base";


export const postAddressConsumer = (authId: number, address: AddressConsumer) =>
    api.post("/consumers/${authId}/adresses", address);