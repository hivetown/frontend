import { Order } from "../types/interfaces";
import { api } from "./_base";

export const fetchAllOrders = (search?: string) =>
//TODO trocar o 1 pelo valor do user logado
    api.get<Order[]>("/consumers/6/orders", { params: { search } });

  