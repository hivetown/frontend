import {
    BaseItems,
    Order,
    OrderItem,
    OrderProducer,
    Shipment,
    SpecificOrder,
} from '../types/interfaces';
import { api } from './_base';

export const fetchAllOrders = (
    userId: number,
    page?: number,
    pageSize?: number
) => {
    let url = `/consumers/${userId}/orders`;
    if (page !== undefined && pageSize !== undefined) {
        url += `?page=${page}&pageSize=${pageSize}`;
    }
    return api.get<BaseItems<Order>>(url);
};

export const fetchAllItems = (userId: number, orderId: number) =>
    api.get<BaseItems<OrderItem>>(
        `/consumers/${userId}/orders/${orderId}/items`
    );

export const fetchAllOrdersProducer = (
    userId: number,
    page: number,
    pageSize: number
) =>
    api.get<BaseItems<OrderProducer>>(
        `/producers/${userId}/orders?page=${page}&pageSize=${pageSize}`
    );

export const fetchAllItemsProducer = (userId: number, orderId: number) =>
    api.get<BaseItems<OrderItem>>(
        `/producers/${userId}/orders/${orderId}/items`
    );
export const fetchOrder = (userId: number, orderId: string) =>
    api.get<SpecificOrder>(`/consumers/${userId}/orders/${orderId}`);

export const fetchOrderProducer = (userId: number, orderId: string) =>
    api.get<SpecificOrder>(`/producers/${userId}/orders/${orderId}`);

export const getShipment = (
    consumerId: number,
    orderId: number,
    producerProduct: number,
    consumerOrProducer: 'consumer' | 'producer' = 'consumer'
) =>
    api.get<Shipment>(
        `/${consumerOrProducer}s/${consumerId}/orders/${orderId}/items/${producerProduct}/shipment`
    );

export const cancelOrder = (userId: number, orderId: number, search?: string) =>
    api.delete(`/consumers/${userId}/orders/${orderId}`, {
        params: { search },
    });

export const exportOrders = async (userId: number, orders: string[]) => {
    // Transforma o array de orders em uma string de query parameter
    const ordersQueryParam = orders.map((order) => `id[]=${order}`).join('&');

    try {
        // Faz a chamada à API com a URL correta incluindo a string de query parameter
        const response = await api.get<Order[]>(
            `/consumers/${userId}/orders/export?${ordersQueryParam}`
        );

        // Obtém o conteúdo da resposta
        const ordersData = response.data;

        // Converte o objeto JavaScript para uma string JSON formatada com 2 espaços em branco
        const jsonString = JSON.stringify(ordersData, null, 2);

        // Cria um Blob com a string JSON
        const blob = new Blob([jsonString], { type: 'application/json' });

        // Cria um URL temporário para o Blob
        const url = URL.createObjectURL(blob);

        // Cria um link de download programaticamente
        const link = document.createElement('a');
        link.href = url;
        link.download = 'orders.json'; // Define o nome do arquivo de download
        document.body.appendChild(link);

        // Clica no link de download para iniciar o download
        link.click();

        // Remove o link de download e revoga o URL temporário
        link.remove();
        URL.revokeObjectURL(url);

        // Retorna os dados da resposta, se necessário
        return ordersData;
    } catch (error) {
        // Lida com erros, se necessário
        console.error('Erro ao exportar pedidos:', error);
        throw error;
    }
};
