<template>
  <h3 class="semencoemndas" v-if="!orders?.items.length>0">
    <i id="icon" class="bi bi-emoji-frown"></i><br />Ainda não foram efetuadas
    encomendas.
  </h3>

  <div class="table-container" style="overflow: auto">
    <div></div>
    <table v-if="!!orders?.items" style="border: 2px" class="table">
      <thead>
        <tr>
          <th><h4>Exportar dados</h4></th>

          <th><h4>Artigos</h4></th>
          <th>
            <h4>Código</h4>
          </th>
          <th><h4>Estado</h4></th>
          <th><h4>Morada de entrega</h4></th>

          <th id="coluna-data">
            <div class="data">
              <h4>Data</h4>
            </div>
          </th>
          <th><h4>Total</h4></th>

          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(order, idx) in orders.items" :key="order.id">
          <td>
            <input
              id="name"
              type="checkbox"
              style="transform: scale(1.2)"
              @change="onCheckboxChange()"
              :value="order.id"
              v-model="selectedOrders[idx]"
            />
            <span v-if="selectedOrders[idx]"></span>
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
            <router-link
              :to="'/encomenda/id' + order.id"
              class="texto"
              style="text-decoration: none; color: black"
              >{{ order.id }}</router-link
            >
          </td>

          <td>
            <div style="display: inline-flex">
              <i class="bi bi-check-all"></i>
              <router-link
                :to="'/encomenda/id' + order.id"
                style="text-decoration: none; color: black"
              >
                <p class="texto">
                  {{ orderStatusTranslation(order.generalStatus) }}
                </p></router-link
              >
            </div>

            <div v-if="order.generalStatus === 'Shipped'">
              <BButton
                class="botao2"
                variant="outline-primary"
                @click="cancelarEncomendaImpossivel()"
                >Cancelar encomenda</BButton
              >
            </div>
            <div
              v-if="
                order.generalStatus === 'Paid' ||
                order.generalStatus === 'Processing'
              "
            >
              <!-- Conteúdo a ser exibido caso a encomenda esteja paga ou em processamento -->
              <BButton
                class="botao2"
                variant="outline-primary"
                @click="cancelarEncomenda(order)"
                >Cancelar encomenda</BButton
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
              class="texto"
              >{{ order.orderDate.substring(0, 10) }}</router-link
            >
          </td>
          <td>
            <router-link
              :to="'/encomenda/id' + order.id"
              style="text-decoration: none; color: black"
              class="texto"
              >{{ order.totalPrice }}€</router-link
            >
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
  <BButton
    id="botao"
    class="botao"
    variant="outline-primary"
    v-if="isExportButtonVisible"
    @click="exportSelectedOrders"
    >Exportar dados</BButton
  >
</template>

<script setup lang="ts">
import Swal from 'sweetalert2';
import { exportOrders } from '../api/orders';
import { BaseItems, Image, Order, OrderItem } from '../types/interfaces';
import { onMounted, ref, computed } from 'vue';
import { fetchAllOrders, cancelOrder, fetchAllItems } from '../api/orders';
import { useStore } from '@/store';
const store = useStore();
const user2 = computed(() => store.state.user);

const orderStatusTranslation = (status: string) => {
  switch (status) {
    case 'Delivered':
      return 'Entregue';
    case 'Paid':
      return 'Pago';
    case 'Processing':
      return 'Em processamento';
    case 'Shipped':
      return 'Em andamento';
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
    const response = await fetchAllOrders(user2.value.user.id);
    orders.value = response.data;

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
  }
});

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
                text: 'Esta encomenda já se encontra em andamento ou já foi entregue.',
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
    text: 'Esta encomenda já se encontra em andamento ou já foi entregue.',
    confirmButtonText: 'OK',
  });
}
</script>

<style scoped>
#morada2 {
  font-size: 11px;
}
.texto,
i,
#morada {
  font-size: 13px;
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
  background-color: #e9e5de !important;
  /* Prefixos do navegador */
  position: -webkit-sticky;
  position: -moz-sticky;
  position: -ms-sticky;
  z-index: 2;
}

h3 {
  text-align: center;
  margin-top: 150px;
  margin-bottom: 150px;
}

.table-container {
  max-height: 450px; /* Altura máxima da tabela */
  max-width: 1600px;
  margin: auto;
  max-width: 92%;
  overflow-y: scroll; /* Adiciona uma barra de rolagem vertical */
  position: relative;
}
.table {
  text-align: center;
  border-collapse: collapse;
  margin-bottom: 20px;
  font-size: 16px;
  border: 2px;
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

.botao {
  width: 190px;
  margin-left: 80px;
  margin-top: 20px;
}
</style>
