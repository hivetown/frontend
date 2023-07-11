<template>
  <div class="loading-spinner" v-if="isLoading">
    <Loader />
  </div>
  <div v-if="(orders?.items?.length || 0) < 1">
    <h3 class="semencoemndas">
      <i id="icon" class="bi bi-emoji-frown"></i><br />Ainda não foram efetuadas
      encomendas.
    </h3>
  </div>
  <div v-else>
    <div class="table-container" style="overflow: auto">
      <table v-if="!!orders?.items" style="border: 2px" class="table">
        <thead>
          <tr>
            <th>
              <h4>Código</h4>
            </th>
            <th><h4>Morada de entrega</h4></th>
            <th><h4>Estado da encomenda</h4></th>
            <th><h4>Data de encomenda</h4></th>
            <th><h4>Ver detalhes</h4></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders.items" :key="order.id">
            <td>
              <router-link
                :to="'/encomenda/id' + order.id"
                class="texto"
                style="text-decoration: none; color: black"
                >{{ order.id }}</router-link
              >
            </td>
            <td>
              <router-link
                :to="'/encomenda/id' + order.id"
                style="text-decoration: none; color: black"
                ><p id="morada2">
                  {{ order.shippingAddress.street }}, nº{{
                    order.shippingAddress.number
                  }}, andar {{ order.shippingAddress.floor }}
                </p></router-link
              >

              <router-link
                :to="'/encomenda/id' + order.id"
                style="text-decoration: none; color: black"
                ><p id="morada2">
                  {{ order.shippingAddress.zipCode }},
                  {{ order.shippingAddress.city }}
                </p></router-link
              >

              <router-link
                :to="'/encomenda/id' + order.id"
                style="text-decoration: none; color: black"
                ><p id="morada2">
                  {{ order.shippingAddress.latitude }},
                  {{ order.shippingAddress.longitude }}
                </p></router-link
              >
            </td>
            <td>
              <i
                v-if="orderStatusTranslation(order.status) === 'Entregue'"
                class="bi bi-check-all"
              ></i>
              <i
                v-if="
                  orderStatusTranslation(order.status) === 'Em processamento'
                "
                class="bi bi-arrow-repeat mr-2"
              ></i>
              <i
                v-if="orderStatusTranslation(order.status) === 'Pago'"
                class="bi bi-currency-euro"
              ></i>
              <i
                v-if="orderStatusTranslation(order.status) === 'Cancelada'"
                class="bi bi-x"
                style="margin-top: -0.5vh"
              ></i>
              <i
                v-if="orderStatusTranslation(order.status) === 'Em transporte'"
                class="bi bi-truck mr-2"
              ></i>

              {{ orderStatusTranslation(order.status) }}
            </td>
            <td>
              {{ order.orderDate.substring(0, 10) }}
              {{ order.orderDate.substring(11, 19) }}
            </td>
            <td>
              <router-link :to="'/encomenda/id' + order.id">
                <BButton class="botao2" variant="outline-primary"
                  >Ver detalhes</BButton
                >
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagination
      v-if="orders"
      :items="orders"
      :page-size="currentFilters.pageSizeC"
      :page="currentFilters.pageC"
      @page-change="onPageChange"
    >
    </Pagination>
  </div>
</template>

<script setup lang="ts">
import Pagination from '../components/Pagination.vue';
import { PageState } from 'primevue/paginator';
import { BaseItems, OrderProducer } from '../types/interfaces';
import { onMounted, ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { fetchAllOrdersProducer } from '../api/orders';
import { useStore } from '@/store';
import Loader from '@/components/Loader.vue';
const store = useStore();
const user2 = computed(() => store.state.user);
const route = useRoute();
const router = useRouter();
const isLoading = ref(true);
const currentFilters = ref({
  pageC: Number(route.query.pageC) || 1,
  pageSizeC: Number(route.query.pageSizeC) || 24,
  pageP: Number(route.query.pageP) || 1,
  pageSizeP: Number(route.query.pageSizeP) || 24,
});

watch(currentFilters.value, (newFilters) => {
  router.push({
    query: {
      ...newFilters,
    },
  });
});
const orderStatusTranslation = (status: string) => {
  switch (status) {
    case 'Delivered':
      return 'Entregue';
    case 'Paid':
      return 'Pago';
    case 'Processing':
      return 'Em processamento';
    case 'Shipped':
      return 'Em transporte';
    case 'Canceled':
      return 'Cancelada';
    default:
      return 'Desconhecido';
  }
};

const orders = ref<BaseItems<OrderProducer>>();

onMounted(async () => {
  if (user2.value && user2.value.user && user2.value.user.id) {
    try {
      isLoading.value = true;
      const response = await fetchAllOrdersProducer(
        user2.value.user.id,
        currentFilters.value.pageC,
        currentFilters.value.pageSizeC
      );
      orders.value = response.data;
    } finally {
      isLoading.value = false;
      console.log(orders.value);
    }
    //for (let i = 1; i <= response.data.totalPages; i++) {
    //  totalItems.value += (
    // await fetchAllOrdersProducer(user2.value.user.id, i, pageSize.value)
    // ).data.items.length;
    // }
  }
});

const onPageChange = async (page: Partial<PageState>) => {
  if (page.page) {
    currentFilters.value.pageC = page.page + 1;
  }

  if (page.rows) {
    currentFilters.value.pageSizeC = page.rows;
  }

  await loadOrders();
};

const routeTo = (path: string) => {
  router.push(path);
};

const loadOrders = async () => {
  isLoading.value = true;

  try {
    if (user2.value) {
      const response = await fetchAllOrdersProducer(
        user2.value.user.id,
        currentFilters.value.pageC,
        currentFilters.value.pageSizeC
      );

      orders.value = response.data;
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
#morada2 {
  font-size: 0.8em;
}
.texto,
#morada {
  font-size: 0.9em;
}

td i {
  font-size: 1.3em;
}
.carousel-container {
  display: flex;
  flex-wrap: wrap;
}
.semEncomendas,
#icon {
  font-size: 110px !important;
}

[v-cloak] {
  display: none;
}

.table thead th {
  position: sticky;
  top: 0;
  background-color: #9dc88d !important;
  /* Prefixos do navegador */
  position: -webkit-sticky;
  position: -moz-sticky;
  position: -ms-sticky;
  z-index: 2;
}

.table thead th:first-child,
.table tbody td:first-child {
  text-align: center;
}

.table thead th:nth-last-child(2) {
  text-align: center;
}

h3 {
  text-align: center;
  margin-top: 150px;
  margin-bottom: 150px;
}

.table-container {
  width: 90%;
  max-height: 50vh; /* Altura máxima da tabela */
  overflow-y: scroll; /* Adiciona uma barra de rolagem vertical */
  position: relative;
  display: block;
  margin: auto;
}
.table th,
.table td {
  padding: 1.5vh;
  font-size: 1.2em;
  text-align: left;
  border-bottom: 1px solid #ddd;
  vertical-align: middle;
}
.table h4 {
  color: #2a2a2a !important;
  font-weight: bold !important;
  font-size: 1.1em !important;
}

tr:hover {
  background-color: #f5f5f5;
  z-index: -2;
}

.btn-div {
  width: 12%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.botao {
  padding: 0.7em;
  background-color: #4d774e;
  border-radius: 5em;
  border: 2px solid #4d774e;
}

.botao2 {
  padding: 0.6em;
  border-radius: 0.8em;
  border: 2px solid #f3f3f3;
}

.botao span {
  color: white !important;
}

.botao:hover {
  background-color: #3c5e3c !important;
  border: 2px solid #3c5e3c !important;
}

.botao2:hover {
  background-color: #f3f3f3 !important;
  border: 2px solid #f3f3f3 !important;
}

.btn {
  color: black !important;
}

.status-info {
  display: flex;
  gap: 0.5em;
}

.status-info i {
  margin-top: -2%;
}

@media (max-width: 768px) {
  .table-container {
    width: 100% !important;
    max-height: 100% !important;
  }

  .table h4 {
    font-size: 0.75em !important;
  }

  .botao,
  .botao2 {
    font-size: 0.7em;
  }

  .texto,
  #morada,
  #morada2 {
    font-size: 0.7em;
  }

  .table thead th {
    min-width: 15vh;
  }
}
</style>
