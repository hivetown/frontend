<template>
  <div v-if="(orders?.items?.length || 0) < 1">
    <h3 class="semencoemndas">
      <i id="icon" class="bi bi-emoji-frown"></i><br />Ainda não foram efetuadas
      encomendas.
    </h3>
  </div>
  <div v-else>
    <div class="loading-spinner" v-if="isLoading">
      <Loader style="display: block; align-items: center" />
    </div>
    <div class="table-container" v-if="!isLoading" style="overflow: auto">
      <div></div>
      <table v-if="!!orders?.items" style="border: 2px" class="table">
        <thead>
          <tr>
            <th>
              <h4>Código</h4>
            </th>
            <th><h4>Artigos</h4></th>

            <th><h4>Estado</h4></th>
            <th><h4>Morada de entrega</h4></th>

            <th id="coluna-data">
              <div class="data">
                <h4>Data</h4>
              </div>
            </th>
            <th><h4>Total</h4></th>
            <th><h4>Exportar dados</h4></th>
            <th><h4></h4></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, idx) in orders.items" :key="order.id">
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
              >
                <img
                  style="width: 75px"
                  :src="ordersImage[order.id].url"
                  :alt="ordersImage[order.id].alt"
                  v-if="!!ordersImage[order.id]"
                />
                <p class="texto" v-else>Produtos sem <br />imagem</p>
              </router-link>
            </td>

            <td>
              <div style="display: inline-flex; gap: 0.5vh">
                <router-link
                  :to="'/encomenda/id' + order.id"
                  style="text-decoration: none; color: black"
                >
                  <div class="status-info">
                    <i
                      v-if="
                        orderStatusTranslation(order.generalStatus) ===
                        'Entregue'
                      "
                      class="bi bi-check-all"
                    ></i>
                    <i
                      v-if="
                        orderStatusTranslation(order.generalStatus) ===
                        'Em processamento'
                      "
                      class="bi bi-arrow-repeat mr-2"
                    ></i>
                    <i
                      v-if="
                        orderStatusTranslation(order.generalStatus) === 'Pago'
                      "
                      class="bi bi-currency-euro"
                    ></i>
                    <i
                      v-if="
                        orderStatusTranslation(order.generalStatus) ===
                        'Cancelada'
                      "
                      class="bi bi-x"
                      style="margin-top: -0.5vh"
                    ></i>
                    <i
                      v-if="
                        orderStatusTranslation(order.generalStatus) ===
                        'Em transporte'
                      "
                      class="bi bi-truck mr-2"
                    ></i>

                    <p class="texto">
                      {{ orderStatusTranslation(order.generalStatus) }}
                    </p>
                  </div></router-link
                >
              </div>

              <div v-if="order.generalStatus === 'Shipped'">
                <PrimeButton
                  rounded
                  outlined
                  severity="info"
                  style="color: #5a5a5a; font-size: 0.6em"
                  @click="cancelarEncomendaImpossivel()"
                  >Cancelar encomenda</PrimeButton
                >
              </div>
              <div
                v-if="
                  order.generalStatus === 'Paid' ||
                  order.generalStatus === 'Processing'
                "
              >
                <!-- Conteúdo a ser exibido caso a encomenda esteja paga ou em processamento -->
                <PrimeButton
                  rounded
                  outlined
                  severity="info"
                  style="color: #5a5a5a; font-size: 0.6em"
                  @click="cancelarEncomenda(order)"
                  >Cancelar encomenda</PrimeButton
                >
              </div>
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
              <router-link
                :to="'/encomenda/id' + order.id"
                style="text-decoration: none; color: black"
                ><span class="texto">{{
                  order.orderDate.substring(0, 10)
                }}</span></router-link
              >
            </td>

            <td>
              <router-link
                :to="'/encomenda/id' + order.id"
                style="text-decoration: none; color: black"
                ><span class="texto">{{ order.totalPrice }}€</span></router-link
              >
            </td>

            <td style="text-align: center">
              <input
                id="name"
                type="checkbox"
                style="transform: scale(2)"
                @change="onCheckboxChange()"
                :value="order.id"
                v-model="selectedOrders[idx]"
              />
              <span v-if="selectedOrders[idx]"></span>
            </td>

            <td>
              <router-link :to="'/encomenda/id' + order.id">
                <PrimeButton
                  rounded
                  outlined
                  severity="info"
                  style="color: #5a5a5a; font-size: 0.7em"
                  >Ver detalhes</PrimeButton
                >
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="btn-div" v-if="isExportButtonVisible">
      <PrimeButton
        severity="secondary"
        rounded
        id="botao"
        @click="exportSelectedOrders"
        ><span>Exportar dados</span></PrimeButton
      >
    </div>
    <Pagination
      class="mt-5"
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
import Swal from 'sweetalert2';
import PrimeButton from 'primevue/button';
import { PageState } from 'primevue/paginator';
import { exportOrders } from '../api/orders';
import { BaseItems, Image, Order, OrderItem } from '../types/interfaces';
import { onMounted, ref, computed } from 'vue';
import { fetchAllOrders, cancelOrder, fetchAllItems } from '../api/orders';
import { useStore } from '@/store';
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import Loader from '@/components/Loader.vue';
const isLoading = ref(true);

const store = useStore();
const user2 = computed(() => store.state.user);
//let page = ref(1);
//const pageSize = ref(24);
const route = useRoute();
const router = useRouter();
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
const orders = ref<BaseItems<Order>>();
/**
 * {
 * 	id: Image
 * }
 */
const ordersImage = ref<{ [id: number]: Image }>({});
const selectedOrders = ref([]);

const isExportButtonVisible = computed(() => {
  return selectedOrders.value.length > 0;
});

const findFirstImage = (order: OrderItem[]) => {
  const image = order.find(
    (item) => item.producerProduct.productSpec?.images.length
  );
  return image ? image.producerProduct.productSpec?.images[0] : undefined;
};

onMounted(async () => {
  if (user2.value && user2.value.user && user2.value.user.id) {
    try {
      isLoading.value = true;
      const response = await fetchAllOrders(
        user2.value.user.id,
        currentFilters.value.pageC,
        currentFilters.value.pageSizeC
      );
      orders.value = response.data;
      console.log(orders.value);
      for (const order of orders.value.items) {
        const orderItems = await fetchAllItems(
          user2.value.user.id,
          order.id.toString()
        );

        const image = findFirstImage(orderItems.data.items);
        if (image) {
          ordersImage.value[order.id] = image;
        }
      }
    } finally {
      isLoading.value = false;
    }
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

const loadOrders = async () => {
  isLoading.value = true;

  try {
    if (user2.value) {
      const response = await fetchAllOrders(
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
function cancelarEncomenda(order: Order) {
  // exibe uma mensagem de confirmação para o usuário
  Swal.fire({
    title: 'Deseja cancelar a encomenda?',
    text: 'Esta ação não poderá ser desfeita',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sim, cancelar',
    cancelButtonText: 'Não, voltar',
  }).then((result) => {
    if (result.isConfirmed) {
      if (user2.value && user2.value.user && user2.value.user.id) {
        cancelOrder(user2.value.user.id, order.id)
          .then(() => {
            // exibe o Swal2 para "Encomenda cancelada!" após o cancelamento da encomenda
            Swal.fire({
              title: 'Encomenda cancelada!',
              text: 'Sua encomenda foi cancelada com sucesso.',
              icon: 'success',
            }).then((result) => {
              if (result.isConfirmed) {
                // Redirecionar para a página desejada
                window.location.reload();
              }
            });
          })
          .catch((error) => {
            if (error.response && error.response.status === 400) {
              Swal.fire({
                icon: 'error',
                title: 'Não é possível cancelar esta encomenda',
                text: 'Esta encomenda já se encontra em transporte ou já foi entregue.',
                confirmButtonText: 'OK',
              });
            }
          });
      }
    }
  });
}
function exportSelectedOrders() {
  let arr = [];
  // eslint-disable-next-line quotes
  let checkboxes = document.querySelectorAll("input[type='checkbox']:checked");
  for (let i = 0; i < checkboxes.length; i++) {
    // arr.push(checkboxes[i].value);
    arr.push((checkboxes[i] as HTMLInputElement).value);
  }
  if (user2.value && user2.value.user && user2.value.user.id) {
    return exportOrders(user2.value.user.id, arr);
  }
}

function onCheckboxChange() {
  // eslint-disable-next-line quotes
  let checkboxes = document.querySelectorAll("input[type='checkbox']:checked");
  if (checkboxes.length == 0) {
    var button = document.getElementById('botao');
    if (button !== null) {
      button.style.display = 'none';
    }
  } else {
    var button2 = document.getElementById('botao');
    if (button2 !== null) {
      button2.style.display = 'block';
    }
  }
}

function cancelarEncomendaImpossivel() {
  // exibe uma mensagem de alerta para o usuário
  Swal.fire({
    icon: 'error',
    title: 'Não é possível cancelar esta encomenda',
    text: 'Esta encomenda já se encontra em transporte ou já foi entregue.',
    confirmButtonText: 'OK',
  });
}
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
  width: 95%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 3vh;
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
    max-height: 90% !important;
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
/* @media (max-width: 768px) {
  .table {
    display: block;
    overflow-x: auto;
    width: 100%;
  }
  .table thead,
  .table tbody,
  .table th,
  .table td,
  .table tr {
    display: block;
  }
  .table thead {
    position: relative;
    visibility: hidden;
  }
  .table thead th {
    position: absolute;
    white-space: nowrap;
    visibility: hidden;
  }
  .table tbody tr {
    margin-bottom: 30px;
  }
  .table td {
    border: none;
    border-bottom: 1px solid #eee;
    position: relative;
    padding-left: 50%;
    white-space: normal;
    text-align: left;
  }
  .table td:before {
    position: absolute;
    top: 6px;
    left: 6px;
    width: 45%;
    padding-right: 10px;
    white-space: nowrap;
    text-align: left;
    font-weight: bold;
  }
} */
</style>
