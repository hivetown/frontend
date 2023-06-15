a
<template>
  <div class="table-container" style="overflow: auto">
    <table class="table table-striped" v-if="orderItems">
      <thead>
        <tr>
          <th id="col" scope="col">Artigo</th>
          <th id="col" scope="col"></th>
          <th id="col" scope="col">Fornecedor</th>
          <th id="col" scope="col">Preço</th>
          <th id="col" scope="col">Quantidade</th>
          <th id="col" scope="col">Eventos</th>
          <th id="col" scope="col">Estado</th>
          <th id="col" scope="col">Total</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="orderItem in orderItems.items"
          :key="orderItem.producerProduct.id"
        >
          <!-- Typescript (it has productSpec but typings) -->
          <td>
            <!-- TOOD URL do producerproduct -->
            <a
              :href="
                '/products/' +
                orderItem.producerProduct.productSpec!.id +
                '/products/' +
                orderItem.producerProduct.id
              "
              ><img
                v-if="orderItem.producerProduct.productSpec!.images"
                :src="orderItem.producerProduct.productSpec!.images[0].url"
                :alt="orderItem.producerProduct.productSpec!.images[0].alt"
                style="height: 50px"
              />
              <p class="texto" v-else>Imagem <br />indisponível</p></a
            >
          </td>
          <td>
            <a
              class="texto"
              :href="'/products/' + orderItem.producerProduct.productSpec!.id"
              >{{ orderItem.producerProduct.productSpec!.name }}</a
            >
          </td>
          <td>
            <a
              class="texto"
              :href="'/producer/'+orderItem.producerProduct.producer!.user.id"
              ><p class="texto">
                {{ orderItem.producerProduct.producer!.user.name }}
              </p></a
            >
          </td>
          <td>
            <p class="texto">{{ orderItem['price'] }} €</p>
          </td>
          <td>
            <p class="texto">{{ orderItem['quantity'] }}</p>
          </td>
          <td v-if="eventos[orderItem.producerProduct.id]">
            <p class="texto">
              Última verificação:
              {{ eventos[orderItem.producerProduct.id].date.substring(0, 10) }}
              {{ eventos[orderItem.producerProduct.id].date.substring(11, 19) }}
            </p>
            <p class="texto">
              Encontra-se em:
              {{ eventos[orderItem.producerProduct.id].address.street }},
              {{ eventos[orderItem.producerProduct.id].address.parish }},
              {{ eventos[orderItem.producerProduct.id].address.city }}
            </p>
          </td>
          <td>
            <div
              v-if="orderItem['status'] === 'Delivered'"
              style="display: inline-flex"
            >
              <i class="bi bi-check-all"></i>
              <p class="texto">Entregue</p>
            </div>
            <div
              v-if="orderItem['status'] === 'Processing'"
              style="display: inline-flex"
            >
              <i class="bi bi-arrow-repeat"></i>
              <p class="texto">Em processamento</p>
            </div>
            <div
              v-if="orderItem['status'] === 'Paid'"
              style="display: inline-flex"
            >
              <i class="bi bi-cash-coin"></i>
              <p class="texto">Pago</p>
            </div>
            <div
              v-if="orderItem['status'] === 'Canceled'"
              style="display: inline-flex"
            >
              <i class="bi bi-x-lg"></i>
              <p class="texto">Cancelado</p>
            </div>
            <div
              v-if="orderItem['status'] === 'Shipped'"
              style="display: inline-flex"
            >
              <i class="bi bi-truck"></i>
              <p class="texto">Em andamento</p>
            </div>
          </td>

          <td>
            <p class="texto">
              {{ orderItem['quantity'] * orderItem['price'] }}
              €
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <br />
  <h5 class="resumo" id="data">Encomenda efetuada em: {{ date }}</h5>
  <h3 class="resumo">Total: {{ totalSum }}€</h3>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, PropType, onBeforeMount } from 'vue';
import { fetchAllItems } from '../api/orders';
import { getShipment } from '../api/orders';
import { useRoute } from 'vue-router';
import { useStore } from '@/store';
import { BaseItems, Order, OrderItem, ShipmentEvent } from '@/types';
const orderItems = ref<BaseItems<OrderItem>>();
const totalSum = ref(0);
const date = ref('');
const eventos = ref<{ [id: number]: ShipmentEvent }>({});
const route = useRoute();
//obtem o id do link
const store = useStore();
const user2 = computed(() => store.state.user);

const props = defineProps({
  order: {
    type: Object as PropType<Order>,
    required: true,
  },
});

onBeforeMount(async () => {
  const idO: string = route.params.id as string;
  if (user2.value && user2.value.user && user2.value.user.id) {
    const responseItem = await fetchAllItems(user2.value.user.id, idO);
    orderItems.value = responseItem.data;

    date.value = props.order.orderDate.substring(0, 10);

    for (const orderItem of orderItems.value.items) {
      totalSum.value += orderItem['price'] * orderItem['quantity'];

      const responseShipment = (
        await getShipment(
          user2.value.user.id,
          parseInt(idO),
          orderItem.producerProduct.id
        )
      ).data;

      eventos.value[orderItem.producerProduct.id] =
        responseShipment.events[responseShipment.events.length - 1];
    }
  }
});
</script>
<style scoped>
.bi-truck {
  animation: fade 2s ease-in-out infinite alternate;
}

@keyframes fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.bi-box-seam {
  animation: spin 2s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.texto {
  font-size: 13px;
}

.table thead th {
  position: sticky;
  top: 0;
  /* Prefixos do navegador */
  position: -webkit-sticky;
  position: -moz-sticky;
  position: -ms-sticky;
  z-index: 2;
}

.table th,
.table td {
  padding: 10px;
  font-size: 20px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

tr:hover {
  background-color: #f5f5f5;
  z-index: -2;
}

span {
  color: black;
}
.numero {
  color: black;
  text-decoration: none;
}

th {
  background-color: #e9e5de !important;
  font-size: 30px;
  color: rgb(0, 0, 0);
}

.table {
  max-height: 80%; /* Altura máxima da tabela */
  margin: auto;
  overflow-y: scroll; /* Adiciona uma barra de rolagem vertical */
  position: relative;
}
.resumo {
  margin-top: 20px;
  font-size: 15px;
  text-align: right;
}
.table-container {
  max-height: 450px; /* Altura máxima da tabela */
  margin: auto;
  margin-top: 0px;
  max-width: 100%;
  overflow-y: scroll; /* Adiciona uma barra de rolagem vertical */
  position: relative;
}
#col {
  font-size: 15px !important;
}

@media (max-width: 768px) {
  /* regras de estilo para telas menores que 768px */
  .table-container {
    overflow-x: auto;
    width: 100%;
  }
  table {
    width: 100%;
    font-size: 5px;
  }
}
@media only screen and (max-width: 660px) {
  /*em telemovel remove colunas,5 */

  .table th:nth-child(6),
  .table td:nth-child(6) {
    display: none;
  }
  .table th:nth-child(1),
  .table td:nth-child(1) {
    display: none;
  }

  .table th:nth-child(4),
  .table td:nth-child(4) {
    display: none;
  }

  header {
    font-size: 8px;
  }

  header {
    font-size: 8px;
  }

  img {
    width: 40px;
  }
  .table {
    text-align: center;
    border-collapse: collapse;
    margin-bottom: 10px;
    font-size: 11px;
    border: 2px;
  }

  .table th,
  .table td {
    padding: 5px;
    font-size: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  h4,
  a,
  p {
    font-size: 12px !important;
  }
  i {
    font-size: 13px !important;
  }
  .resumo {
    margin-top: 10px;
    font-size: 15px;
    text-align: right;
    margin-right: 30px;
  }
}
</style>
