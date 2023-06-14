a
<template>
  <div class="table-container" style="overflow: auto">
    <table class="table table-striped">
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
        <tr v-for="num in orderItem['totalItems']" :key="num">
          <td>
            <a
              :href="
                '/products/' +
                orderItem?.items[num - 1]?.producerProduct?.productSpec?.id
              "
              ><img
                v-if="
                  orderItem['items'][num - 1]['producerProduct']['productSpec'][
                    'images'
                  ].length !== 0
                "
                :src="
                  orderItem?.items[num - 1]?.producerProduct?.productSpec
                    ?.images[0]?.url
                "
                :alt="
                  orderItem?.items[num - 1]?.producerProduct?.productSpec
                    ?.images[0]?.alt
                "
                style="height: 50px"
              />
              <p id="texto" v-else>Imagem <br />indisponível</p></a
            >
          </td>
          <!--TODO por marcas e produto como links-->
          <!-- <td><img src="https://i.imgur.com/o2fKskJ.jpg"></td> -->
          <td>
            <a
              id="texto"
              :href="
                '/products/' +
                orderItem?.items[num - 1]?.producerProduct?.productSpec?.id
              "
              >{{
                orderItem['items'][num - 1]['producerProduct']['productSpec'][
                  'name'
                ]
              }}</a
            >
          </td>
          <td>
            <a id="texto" :href="'/producer/'"
              ><p id="texto">
                {{
                  orderItem['items'][num - 1]['producerProduct']['producer'][
                    'name'
                  ]
                }}
              </p></a
            >
          </td>
          <td>
            <p id="texto">{{ orderItem['items'][num - 1]['price'] }} €</p>
          </td>
          <td>
            <p id="texto">{{ orderItem['items'][num - 1]['quantity'] }}</p>
          </td>
          <td>
            <p id="texto">Última verificação: {{ eventos[num - 1]['date'].substring(0,10) }} {{ eventos[num - 1]['date'].substring(11,19) }} </p>
            <p id="texto">
              Encontra-se em: {{ eventos[num - 1]['address']['street'] }},
              {{ eventos[num - 1]['address']['parish'] }},
              {{ eventos[num - 1]['address']['city'] }}
            </p>
          </td>
          <td>
            <div
              v-if="orderItem['items'][num - 1]['status'] === 'Delivered'"
              style="display: inline-flex"
            >
              <i class="bi bi-check-all"></i>
              <p id="texto">Entregue</p>
            </div>
            <div
              v-if="orderItem['items'][num - 1]['status'] === 'Processing'"
              style="display: inline-flex"
            >
              <i class="bi bi-arrow-repeat"></i>
              <p id="texto">Em processamento</p>
            </div>
            <div
              v-if="orderItem['items'][num - 1]['status'] === 'Paid'"
              style="display: inline-flex"
            >
              <i class="bi bi-cash-coin"></i>
              <p id="texto">Pago</p>
            </div>
            <div
              v-if="orderItem['items'][num - 1]['status'] === 'Canceled'"
              style="display: inline-flex"
            >
              <i class="bi bi-x-lg"></i>
              <p id="texto">Cancelado</p>
            </div>
            <div
              v-if="orderItem['items'][num - 1]['status'] === 'Shipped'"
              style="display: inline-flex"
            >
              <i class="bi bi-truck"></i>
              <p id="texto">Em andamento</p>
            </div>
          </td>

          <td>
            <p id="texto">
              {{
                orderItem['items'][num - 1]['quantity'] *
                orderItem['items'][num - 1]['price']
              }}
              €
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <br />
  <h5 class="resumo" id="data"></h5>
  <h3 class="resumo" id="totalSum"></h3>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { fetchAllItems } from '../api/orders';
import { fetchAllOrders, getShipment } from '../api/orders';
import { useRoute } from 'vue-router';
import { useStore } from '@/store';
var idU = 0;
const orderItem =  ref<any>('');
var totalSum = 0;
var date = '';
const orders =  ref<any>('');
const lista: number[] = [];
const eventos = ref<any[]>([]);
const route = useRoute();
//obtem o id do link
const store = useStore();
const user2 = computed(() => store.state.user);
if (user2.value && user2.value.user && user2.value.user.id) {
  idU = user2.value.user.id;
}
onMounted(async () => {
  const idO: string = route.params.id as string;
  //TODO por user logado
  const responseItem = await fetchAllItems(idU, idO);
  orderItem.value = responseItem.data;

  //TODO por user logado
  const response = await fetchAllOrders(idU);
  orders.value = response.data;
  for (let i = 0; i < orderItem.value.items.length; i++) {
    totalSum +=
      orderItem.value.items[i]['price'] * orderItem.value.items[i]['quantity'];
    lista.push(orderItem.value.items[i]['producerProduct']['id']);
  }
  for (let x = 0; x < lista.length; x++) {
    const responseShipment = await getShipment(idU, parseInt(idO), (lista[x]));
	console.log(responseShipment)
    eventos.value.push(
      responseShipment.data['events'][
        responseShipment.data['events'].length - 1
      ] 
    );

  }

  const totalSumElement = document.getElementById('totalSum');
  if (totalSumElement instanceof HTMLElement) {
    totalSumElement.innerHTML = `Total: ${totalSum}€`;
  }
  for (let i = 0; i < orders.value.items.length; i++) {
    if (orders.value.items[i].id == idO) {
      date = orders.value.items[i].orderDate.substring(0, 10);
	  const element = document.getElementById('data');
if (element !== null) {
  element.textContent =   'Encomenda efetuada em: ' + date;
}
      
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
#texto {
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
