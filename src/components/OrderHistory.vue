com




<template>
  <h3 class="semencoemndas" v-if="orders['totalItems'] === 0">
    <i id="icon" class="bi bi-emoji-frown"></i><br />Ainda não foram efetuadas
    encomendas.
  </h3>

  <div class="table-container" style="overflow: auto">
    <div></div>
    <table v-if="orders['totalItems'] !== 0" style="border: 2px" class="table">
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
        <tr v-for="num in orders['totalItems']" :key="num">
          <td>
            <input
              id="name"
              type="checkbox"
              style="transform: scale(1.2)"
              @change="onCheckboxChange()"
              :value="orders['items'][num - 1]['id']"
              v-model="selectedOrders[num - 1]"
            />
            <span v-if="selectedOrders[num - 1]"></span>
          </td>

          <td>
            <div class="carousel-container">
              <div class="carousel">
                <div
                  id="myCarousel"
                  class="carousel slide"
                  data-ride="carousel"
                >
                  <div>
                    <div
                      v-if="
                        encomendasImage[num] === undefined ||
                        encomendasImage[num] === null ||
                        encomendasImage[num].length === 0
                      "
                    >
                      <div class="carousel-inner" role="listbox">
                        <a
                          :href="'/encomenda/id' + orders?.items[num - 1]?.id"
                          style="text-decoration: none; color: black"
                        >
                          <img
                            style="width: 75px"
                            :src="encomendasImage[1].toString()"
                            :alt="'Image ' + orders?.items[num - 1]?.id"
                            v-if="
                              encomendasImage[1] &&
                              encomendasImage[1].length !== 0
                            "
                          />
                          <p class="texto" v-else>Produtos sem <br />imagem</p>
                        </a>
                      </div>
                    </div>
                    <div v-else>
                      <ol
                        v-if="encomendasImage[num].length > 1"
                        class="carousel-indicators"
                      >
                        <li
                          v-for="(image, index) in encomendasImage[num]"
                          :key="index"
                          :class="{ active: index === 0 }"
                        ></li>
                      </ol>

                      <div class="carousel-inner" role="listbox">
                        <div
                          v-for="(image, index) in encomendasImage[num]"
                          :key="index"
                          :class="{ item: true, active: index === 0 }"
                        >
                          <a
                            :href="'/encomenda/id' + orders?.items[num - 1]?.id"
                            style="text-decoration: none; color: black"
                          >
                            <img
                              style="width: 75px"
                              :src="image"
                              :alt="'Image ' + (index + 1)"
                              v-if="image !== null"
                            />
                            <p class="texto" v-else>Produto sem <br />imagem</p>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <a :href="`/encomenda/id${orders['items'][num - 1]['id']}`">
                </a>
              </div>
            </div>
          </td>

          <td>
            <a
              class="texto"
              :href="'/encomenda/id' + orders?.items[num - 1]?.id"
              style="text-decoration: none; color: black"
              >{{
                orders['items'] && orders['items'][num - 1]
                  ? orders['items'][num - 1]['id']
                  : ''
              }}</a
            >
          </td>

          <td>
            <div
              v-if="
                orders.items &&
                orders.items[num - 1] &&
                orders.items[num - 1].generalStatus === 'Delivered'
              "
              style="display: inline-flex"
            >
              <i class="bi bi-check-all"></i>
              <a
                :href="'/encomenda/id' + orders?.items[num - 1]?.id"
                style="text-decoration: none; color: black"
              >
                <p class="texto">Entregue</p></a
              >
            </div>
            <div
              v-if="
                orders.items &&
                orders.items[num - 1] &&
                orders.items[num - 1].generalStatus === 'Processing'
              "
              style="display: inline-flex"
            >
              <i class="bi bi-box-seam"></i>
              <a
                :href="'/encomenda/id' + orders?.items[num - 1]?.id"
                style="text-decoration: none; color: black"
              >
                <p class="texto">Em processamento</p></a
              >
            </div>
            <div
              v-if="
                orders.items &&
                orders.items[num - 1] &&
                orders.items[num - 1].generalStatus === 'Paid'
              "
              style="display: inline-flex"
            >
              <i class="bi bi-cash-coin"></i>
              <a
                :href="'/encomenda/id' + orders?.items[num - 1]?.id"
                style="text-decoration: none; color: black"
                ><p class="texto">Pago</p>
              </a>
            </div>
            <div
              v-if="
                orders.items &&
                orders.items[num - 1] &&
                orders.items[num - 1].generalStatus === 'Canceled'
              "
              style="display: inline-flex"
            >
              <i class="bi bi-x-lg"></i>
              <a
                :href="'/encomenda/id' + orders?.items[num - 1]?.id"
                style="text-decoration: none; color: black"
                ><p class="texto">Cancelada</p></a
              >
            </div>
            <div
              v-if="
                orders.items &&
                orders.items[num - 1] &&
                orders.items[num - 1].generalStatus === 'Shipped'
              "
              style="display: inline-flex"
            >
              <i class="bi bi-truck"></i>
              <a
                :href="'/encomenda/id' + orders?.items[num - 1]?.id"
                style="text-decoration: none; color: black"
                ><p class="texto">Em andamento</p></a
              >
            </div>

            <div
              v-if="
                orders.items &&
                orders.items[num - 1] &&
                orders.items[num - 1].generalStatus === 'Shipped'
              "
            >
              <BButton
                class="botao2"
                variant="outline-primary"
                @click="cancelarEncomendaImpossivel()"
                >Cancelar encomenda</BButton
              >
            </div>
            <div
              v-if="
                orders.items &&
                orders.items[num - 1] &&
                (orders.items[num - 1].generalStatus === 'Paid' ||
                  orders.items[num - 1].generalStatus === 'Processing')
              "
            >
              <!-- Conteúdo a ser exibido caso a encomenda esteja paga ou em processamento -->
              <BButton
                class="botao2"
                variant="outline-primary"
                @click="cancelarEncomenda(num)"
                >Cancelar encomenda</BButton
              >
            </div>
          </td>
          <td>
            <a
              :href="'/encomenda/id' + orders?.items[num - 1]?.id"
              style="text-decoration: none; color: black"
              ><p id="morada2">
                {{ orders['items'][num - 1]['shippingAddress']['street'] }},
                nº{{ orders['items'][num - 1]['shippingAddress']['number'] }},
                andar {{ orders['items'][num - 1]['shippingAddress']['floor'] }}
              </p></a
            >

            <a
              :href="'/encomenda/id' + orders?.items[num - 1]?.id"
              style="text-decoration: none; color: black"
              ><p id="morada2">
                {{ orders['items'][num - 1]['shippingAddress']['zipCode'] }},
                {{ orders['items'][num - 1]['shippingAddress']['city'] }}
              </p></a
            >

            <a
              :href="'/encomenda/id' + orders?.items[num - 1]?.id"
              style="text-decoration: none; color: black"
              ><p id="morada2">
                {{ orders['items'][num - 1]['shippingAddress']['latitude'] }},
                {{ orders['items'][num - 1]['shippingAddress']['longitude'] }}
              </p></a
            >
          </td>

          <td>
            <a
              :href="'/encomenda/id' + orders?.items[num - 1]?.id"
              style="text-decoration: none; color: black"
              class="texto"
              >{{
                orders['items'] && orders['items'][num - 1]
                  ? orders['items'][num - 1]['orderDate'].substring(0, 10)
                  : ''
              }}</a
            >
          </td>
          <td>
            <a
              :href="'/encomenda/id' + orders?.items[num - 1]?.id"
              style="text-decoration: none; color: black"
              class="texto"
              >{{
                orders['items'] && orders['items'][num - 1]
                  ? orders['items'][num - 1]['totalPrice']
                  : ''
              }}€</a
            >
          </td>

          <td>
            <BButton
              class="botao2"
              variant="outline-primary"
              :href="'/encomenda/id' + orders.items[num - 1]?.id"
              >Ver detalhes</BButton
            >
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
import { Order } from '../types/interfaces';
import { onMounted, ref, Ref, computed } from 'vue';
import { fetchAllOrders, cancelOrder, fetchAllItems } from '../api/orders';
import { useStore } from '@/store';
var idU = 0;
const arr: { value: number[] } = ref([]);
const store = useStore();
const encomendas: number[] = [];
const encomendasImage: Ref<any[]> = ref([]);
const orderIds = ref<number[]>([]); //array com o id das encomendas
const encomendaId: Ref<any[]> = ref([]);
const user2 = computed(() => store.state.user);
if (user2.value && user2.value.user && user2.value.user.id) {
  idU = user2.value.user.id;
}
const orders = ref<any>('');

onMounted(async () => {
  const response = await fetchAllOrders(idU);
  orders.value = response.data;
  orders.value.items.forEach((item: { id: number }) => {
    orderIds.value.push(item.id);
  });

  for (let i = 0; i < orders.value.totalItems; i++) {
    encomendas.push(orders.value.items[i].id);
    arr.value.push(i);
  }
  arr.value.reverse();

  for (let i = 0; i < encomendas.length; i++) {
    //TODO por user logado
    const response1 = await fetchAllItems(idU, encomendas[i].toString());
    const newEncomenda = { [encomendas[i]]: response1.data };
    encomendaId.value.push(newEncomenda);
    const encomendaX: Order[] = [];

	for (
      let j = 0;
      j < encomendaId.value[i][encomendas[i]]['items'].length - 1;
      j++
    ) {
      encomendaX.push(
        encomendaId.value[i][encomendas[i]] &&
          encomendaId.value[i][encomendas[i]]['items'] &&
          encomendaId.value[i][encomendas[i]]['items'][j] &&
          encomendaId.value[i][encomendas[i]]['items'][j]['producerProduct'] &&
          encomendaId.value[i][encomendas[i]]['items'][j]['producerProduct'][
            'productSpec'
          ] &&
          encomendaId.value[i][encomendas[i]]['items'][j]['producerProduct'][
            'productSpec'
          ]['images'] &&
          encomendaId.value[i][encomendas[i]]['items'][j]['producerProduct'][
            'productSpec'
          ]['images'][0] &&
          encomendaId.value[i][encomendas[i]]['items'][j]['producerProduct'][
            'productSpec'
          ]['images'][0]['url']
          ? encomendaId.value[i][encomendas[i]]['items'][j]['producerProduct'][
              'productSpec'
            ]['images'][0]['url']
          : null
      );
    }
    encomendasImage.value.push(encomendaX);


  }
});
function cancelarEncomenda(num: number) {
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
      try {
        //TODO trocar p user logado
        cancelOrder(idU, orders.value['items'][num - 1]['id'])
          .then((response) => {
            console.log('cancelou');
            // exibe o Swal2 para "Encomenda cancelada!" após o cancelamento da encomenda
            Swal.fire({
              title: 'Encomenda cancelada!',
              text: 'Sua encomenda foi cancelada com sucesso.',
              icon: 'success',
            }).then((result) => {
              if (result.isConfirmed) {
                // Redirecionar para a página desejada
                window.location.href = '/encomendas'; // Substitua com a URL da página desejada
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
            } else {
              console.log(error);
              console.log('erro ao cancelar encomenda');
            }
          });
      } catch (error: any) {
        console.log(error);
        console.log('erro ao cancelar encomenda');
      }
    }
  });
}
function exportSelectedOrders() {
  //idU = user2.value['user']['id'];
  if (user2.value && user2.value.user && user2.value.user.id) {
    idU = user2.value.user.id;
  }

  let arr = [];
  let checkboxes = document.querySelectorAll("input[type='checkbox']:checked");
  for (let i = 0; i < checkboxes.length; i++) {
    // arr.push(checkboxes[i].value);
    arr.push((checkboxes[i] as HTMLInputElement).value);
  }
  //TODO trocar para user logado
  return exportOrders(idU, arr);
}

function onCheckboxChange() {
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
<script lang="ts">
import { exportOrders } from '../api/orders';

export default {
  data() {
    return {
      selectedOrders: [],
    };
  },
  computed: {
    isExportButtonVisible() {
      return this.selectedOrders.length > 0;
    },
  },
};
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
