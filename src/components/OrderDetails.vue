<template>
  <h5
    class="parent"
    style="display: flex; justify-content: flex-start"
    id="data"
  >
    <p v-if="$store.state.user?.user?.type === 'CONSUMER'">
      Efetuada a: <span class="fw-bold"> {{ date }}</span>
    </p>
    <p v-else>
      Efetuada a:
      <span class="fw-bold">
        {{ orderItems?.items[0].orderDate?.substring(0, 10) }}</span
      >
    </p>
  </h5>
  <div class="parent" style="background-color: ">
    <div
      class="table-container"
      style="overflow: auto"
      v-if="$store.state.user?.user?.type === 'CONSUMER'"
    >
      <div class="loading-spinner" v-if="isLoading">
        <Loader />
      </div>
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
            <th id="col" scope="col" style="width: 80px">Total</th>
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
              <router-link
                :to="
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
                <p class="texto" v-else>
                  Imagem <br />indisponível
                </p></router-link
              >
            </td>
            <td>
              <router-link
                class="texto"
                :to="'/products/' + orderItem.producerProduct.productSpec!.id"
                ><span style="color: black !important">{{
                  orderItem.producerProduct.productSpec!.name
                }}</span></router-link
              >
            </td>
            <td>
              <router-link
                class="texto"
                :to="'/producer/'+orderItem.producerProduct.producer!.user.id"
                ><span style="color: black !important">
                  {{ orderItem.producerProduct.producer!.user.name }}
                </span></router-link
              >
            </td>
            <td>
              <p class="texto">{{ orderItem['price'] }} €</p>
            </td>
            <td class="text-center">
              <p class="texto">{{ orderItem['quantity'] }}</p>
            </td>
            <td v-if="getLastShipmentEvent(orderItem)">
              <p class="texto">
                Última verificação:
                {{ getLastShipmentEvent(orderItem)!.date.substring(0, 10) }}
                {{ getLastShipmentEvent(orderItem)!.date.substring(11, 19) }}
              </p>
              <p class="texto">
                Encontra-se em:
                {{ getLastShipmentEvent(orderItem)!.address.street }},
                {{ getLastShipmentEvent(orderItem)!.address.parish }},
                {{ getLastShipmentEvent(orderItem)!.address.city }}
              </p>
            </td>
            <td>
              <div
                class="status-info"
                v-if="orderItem['status'] === 'Delivered'"
                style="display: inline-flex; gap: 0.5vh"
              >
                <i class="bi bi-check-all"></i>
                <p class="texto">Entregue</p>
              </div>
              <div
                v-if="orderItem['status'] === 'Processing'"
                style="display: inline-flex; gap: 0.5vh"
              >
                <i class="bi bi-arrow-repeat mr-2"></i>
                <p class="texto">Em processamento</p>
              </div>
              <div
                v-if="orderItem['status'] === 'Paid'"
                style="display: inline-flex; gap: 0.5vh"
              >
                <i class="bi bi-currency-euro"></i>
                <p class="texto">Pago</p>
              </div>
              <div
                v-if="orderItem['status'] === 'Canceled'"
                style="display: inline-flex; gap: 0.5vh"
              >
                <i class="bi bi-x-lg"></i>
                <p class="texto">Cancelado</p>
              </div>
              <div
                v-if="orderItem['status'] === 'Shipped'"
                style="display: inline-flex; gap: 0.5vh"
              >
                <i class="bi bi-truck mr-2"></i>
                <p class="texto">Em transporte</p>
              </div>
            </td>

            <td style="width: 10vh !important">
              <p class="texto">
                {{ orderItem['quantity'] * orderItem['price'] }}
                €
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="$store.state.user?.user?.type === 'CONSUMER'" class="resumo">
      <h3 class="">Total: {{ totalSum }}€</h3>
    </div>
    <br />

    <!--HISTORICO PRODUCER-->

    <div
      class="table-container"
      style="overflow: auto"
      v-if="$store.state.user?.user?.type === 'PRODUCER'"
    >
      <div class="loading-spinner" v-if="isLoading">
        <Loader />
      </div>
      <table class="table table-striped" v-if="orderItems">
        <thead>
          <tr>
            <th id="col" scope="col">Artigo</th>
            <th id="col" scope="col"></th>
            <th id="col" scope="col">Estado</th>
            <th id="col" scope="col">Stock</th>
            <th id="col" scope="col">Preço</th>
            <th id="col" scope="col">Quantidade</th>
            <th id="col" scope="col">Unidade de produção</th>
            <th id="col" scope="col">Data de produção</th>
            <th id="col" scope="col">Total</th>
            <th
              id="col"
              scope="col"
              v-if="
                store.state.user?.user.type === 'PRODUCER' && shouldShowVehicle
              "
            >
              Veículo
            </th>
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
              <router-link
                :to="
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
                <p class="texto" v-else>
                  Imagem <br />indisponível
                </p></router-link
              >
            </td>
            <td>
              <router-link
                class="texto"
                :to="'/products/' + orderItem.producerProduct.productSpec!.id"
                ><span style="color: black !important">{{
                  orderItem.producerProduct.productSpec!.name
                }}</span></router-link
              >
            </td>
            <td>
              <div
                class="status-info"
                v-if="orderItem['status'] === 'Delivered'"
                style="display: inline-flex; gap: 0.5vh"
              >
                <i class="bi bi-check-all"></i>
                <p class="texto">Entregue</p>
              </div>
              <div
                v-if="orderItem['status'] === 'Processing'"
                style="display: inline-flex; gap: 0.5vh"
              >
                <i class="bi bi-arrow-repeat mr-2"></i>
                <p class="texto">Em processamento</p>
              </div>
              <div
                v-if="orderItem['status'] === 'Paid'"
                style="display: inline-flex; gap: 0.5vh"
              >
                <i class="bi bi-currency-euro"></i>
                <p class="texto">Pago</p>
              </div>
              <div
                v-if="orderItem['status'] === 'Canceled'"
                style="display: inline-flex; gap: 0.5vh"
              >
                <i class="bi bi-x-lg"></i>
                <p class="texto">Cancelado</p>
              </div>
              <div
                v-if="orderItem['status'] === 'Shipped'"
                style="display: inline-flex; gap: 0.5vh"
              >
                <i class="bi bi-truck mr-2"></i>
                <p class="texto">Em transporte</p>
              </div>
            </td>
            <td>
              <router-link
                class="texto"
                :to="'/producer/'+orderItem.producerProduct.producer!.user.id"
                ><span style="color: black !important">
                  {{ orderItem.producerProduct.stock }}
                </span></router-link
              >
            </td>
            <td>
              <p class="texto">{{ orderItem['price'] }} €</p>
            </td>
            <td class="text-center">
              <p class="texto">{{ orderItem['quantity'] }}</p>
            </td>

            <td>
              {{ orderItem.producerProduct.productionUnit?.name }}
            </td>
            <td>
              {{
                String(orderItem.producerProduct.productionDate).substring(
                  0,
                  10
                )
              }}
              {{
                String(orderItem.producerProduct.productionDate).substring(
                  11,
                  19
                )
              }}
            </td>
            <td>
              <p class="texto">
                {{ orderItem['quantity'] * orderItem['price'] }}€
              </p>
            </td>
            <template v-if="store.state.user?.user.type === 'PRODUCER'">
              <td v-if="orderItem.status === 'Paid'">
                <ManageOrderItemCarrier
                  v-if="orderItem.producerProduct && orderId"
                  :order-item="orderItem"
                  :order-id="Number(orderId)"
                  @order-item-carrier-assigned="onOrderItemAssigned(orderItem)"
                />
              </td>
              <td
                v-else-if="
                  orderItem.status === 'Processing' &&
                  shipments[orderItem.producerProduct.id]
                "
              >
                <SetForDelivery
                  :carrier="shipments[orderItem.producerProduct.id].carrier!"
                  :order-id="Number(orderId)"
                  :order-item="orderItem"
                  @carrier-in-delivery="onOrderItemAssigned(orderItem)"
                />
              </td>
            </template>
          </tr>
        </tbody>
      </table>
      <div class="resumo">
        <h3 class="">Total: {{ totalSum }}€</h3>
      </div>
    </div>
    <br />
  </div>
</template>

<script setup lang="ts">
import Loader from '@/components/Loader.vue';
import ManageOrderItemCarrier from './producer/orders/ManageOrderItemCarrier.vue';
import SetForDelivery from './producer/carriers/SetForDelivery.vue';
import { ref, onBeforeMount, computed } from 'vue';
import {
  fetchAllItems,
  fetchAllItemsProducer,
  fetchAllOrders,
} from '../api/orders';
import { getShipment } from '../api/orders';
import { useRoute } from 'vue-router';
import { useStore } from '@/store';
import { BaseItems, OrderItem, Shipment } from '@/types';
const isLoading = ref(true);
const orderItems = ref<BaseItems<OrderItem>>();
const totalSum = ref(0);
const date = ref<{ [id: number]: String }>({});
const shipments = ref<{ [id: number]: Shipment }>({});
const route = useRoute();
const store = useStore();
const orderId = ref(route.params.id as string);

const shouldShowVehicle = computed(() => {
  return (
    store.state.user?.user.type === 'PRODUCER' &&
    orderItems.value?.items.some((item) =>
      // TODO add Processing and Shipped when implementing carrier exiting/incoming
      (['Paid', 'Processing'] as OrderItem['status'][]).includes(item.status)
    )
  );
});

const getLastShipmentEvent = (orderItem: OrderItem) => {
  const shipment = shipments.value[orderItem.producerProduct.id];
  if (!shipment) return null;
  return shipment.events[shipment.events.length - 1];
};

const loadItems = async () => {
  if (!store.state.user || !store.state.user.user?.id) return;

  if (store.state.user.user.type === 'CONSUMER') {
    try {
      isLoading.value = true;
      const responseItem = await fetchAllItems(
        store.state.user.user.id,
        orderId.value
      );
      orderItems.value = responseItem.data;

      const res = await fetchAllOrders(store.state.user.user.id);
      for (let i = 0; i < res.data.items.length; i++) {
        if (res.data.items[i].id === Number(orderId.value)) {
          date.value = res.data.items[i].orderDate.substring(0, 10);
        }
      }
    } finally {
      isLoading.value = false;
    }
  } else {
    try {
      isLoading.value = true;
      const responseItem = await fetchAllItemsProducer(
        store.state.user.user.id,
        orderId.value
      );
      orderItems.value = responseItem.data;
    } finally {
      isLoading.value = false;
    }
  }

  for (const orderItem of orderItems.value.items) {
    totalSum.value += orderItem['price'] * orderItem['quantity'];

    const responseShipment = (
      await getShipment(
        store.state.user.user.id,
        parseInt(orderId.value),
        orderItem.producerProduct.id,
        store.state.user!.user.type.toLowerCase() as 'producer' | 'consumer'
      )
    ).data;
    shipments.value[orderItem.producerProduct.id] = responseShipment;
  }
};

onBeforeMount(loadItems);

const emit = defineEmits({
  // eslint-disable-next-line no-unused-vars
  orderItemCarrierAssigned: (orderItem: OrderItem) => true,
});
const onOrderItemAssigned = (orderItem: OrderItem) => {
  emit('orderItemCarrierAssigned', orderItem);
  loadItems();
};
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
  text-decoration: none;
}

.texto span:hover {
  text-decoration: underline;
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
  padding: 1vh;
  font-size: 1.2em;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #9dc88d !important;
  font-size: 1.3em !important;
  padding: 1.5vh !important;
  color: #2a2a2a !important;
}

.table {
  max-height: 80%; /* Altura máxima da tabela */
  margin: auto;
  overflow-y: scroll; /* Adiciona uma barra de rolagem vertical */
  overflow-x: scroll;
  position: relative;
}
.resumo {
  margin-top: 20px;
  text-align: right;
}
.table-container {
  max-height: 450px; /* Altura máxima da tabela */
  margin: auto;
  margin-top: 0px;
  /* max-width: 100%; */
  overflow-y: scroll; /* Adiciona uma barra de rolagem vertical */
  position: relative;
}
/* #col {
  font-size: 15px !important;
} */

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
    justify-content: center !important;
    align-items: center !important;
    padding: 5px;
    font-size: 10px;
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
    text-align: right;
    margin-right: 30px;
  }
  .resumo h3 {
    font-size: 15px;
  }
}
</style>
