<template>
  <div class="parent" style="background-color: ">
    <div class="table-container" style="overflow: auto" v-if="$store.state.user?.user?.type === 'CONSUMER'">
		<h5 class="" id="data" style="margin-right: 0px; text-align: right;">Encomenda efetuada em: {{ date }}</h5>
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
            <td v-if="eventos[orderItem.producerProduct.id]">
              <p class="texto">
                Última verificação:
                {{
                  eventos[orderItem.producerProduct.id].date.substring(0, 10)
                }}
                {{
                  eventos[orderItem.producerProduct.id].date.substring(11, 19)
                }}
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
	  <div class="resumo" style="background-color: ">
      <h3 class="">Total: {{ totalSum }}€</h3>
    </div>
    </div>
    <br />
    
	<!--HISTORICO PRODUCER-->
	<div class="table-container" style="overflow: auto" v-if="$store.state.user?.user?.type === 'PRODUCER'">
		<div style="text-align: right;"><h5 class="" id="data">Encomenda efetuada em: {{ date }}</h5></div>
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
                <p class="texto">Em andamento</p>
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
				{{ String(orderItem.producerProduct.productionDate).substring(0,10) }}
				{{ String(orderItem.producerProduct.productionDate).substring(11,19) }}

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
	  <div class="resumo" style="background-color: ">
     
    </div>
    </div>
    <br />
   
  </div>
</template>

<script setup lang="ts">
import { ref, computed, PropType, onBeforeMount } from 'vue';
import { fetchAllItems, fetchAllItemsProducer, fetchAllOrders } from '../api/orders';
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
	if (user2.value.user.type==="CONSUMER"){
		const responseItem = await fetchAllItems(user2.value.user.id, idO);
		orderItems.value = responseItem.data;
		date.value = props.order.orderDate; 
		console.log(props.order.orderDate);
	} else{
		const responseItem = await fetchAllItemsProducer(user2.value.user.id, idO);
		orderItems.value = responseItem.data;
		date.value = props.order.orderDate.substring(0, 10);
	
	}
	if (user2.value.user.type==="CONSUMER"){
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
