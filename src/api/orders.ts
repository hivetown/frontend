import { Order } from "../types/interfaces";
import { Consumer } from "../types/interfaces";
import { api } from "./_base";

export const fetchAllOrders = (userId: number, search?: string) =>
    api.get<Order[]>(`/consumers/1/orders`, { params: { search } });

export const fetchAllItems = (userId: number, orderId: string, search?: string) =>
    api.get<Order[]>(`/consumers/${userId}/orders/${orderId}/items`, { params: { search } });

export const cancelOrder = (userId: number, orderId: number, search?: string) =>
    api.delete(`/consumers/${userId}/orders/${orderId}`, { params: { search } });
  
export const fetchUser = (search?: string) =>
    api.get<Consumer[]>(`/auth`, { params: { search } });

    export const exportOrders = async (userId: number, orders: string[]) => {
        // Transforma o array de orders em uma string de query parameter
        const ordersQueryParam = orders.map(order => `id[]=${order}`).join('&');
      
        try {
          // Faz a chamada à API com a URL correta incluindo a string de query parameter
          const response = await api.get<Order[]>(`/consumers/${userId}/orders/export?${ordersQueryParam}`);
      
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
      
      