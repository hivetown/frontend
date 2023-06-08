<template>
  <div class="root">
    <div class="wrapper-mains">
      <div id="principal">
        <p class="titulo" v-if="orders['totalItems'] === 0">
          Ainda não foi realizada nenhuma encomenda
        </p>
        <p class="titulo" v-if="orders['totalItems'] !== 0">
          Estado da encomenda {{ $route.params.id }}
        </p>
        <Progresso
          :length="4"
          v-if="
            orders['totalItems'] !== 0 && orderItem['status'] !== 'Canceled'
          "
        ></Progresso>
        <i v-if="orderItem['status'] === 'Canceled'" class="bi bi-x-circle"
          >Encomenda cancelada</i
        >
      </div>
      <div
        class="tabela"
        v-if="orders['totalItems'] !== 0"
        :style="{
          marginTop: orderItem['status'] === 'Canceled' ? '20px' : '',
        }"
      >
        <OrderDetails />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Progresso from '../components/Progress.vue';
import OrderDetails from '../components/OrderDetails.vue';
export default {
  components: {
    Progresso,
    OrderDetails,
  },
};
</script>
<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useStore } from '@/store';
import { fetchAllOrders, fetchOrder } from '../api/orders';
import { useRoute } from 'vue-router';
import { Order, Consumer } from '../types/interfaces';
const route = useRoute();
var idU = 0;
const orderItem = ref<Order[]>([]); //array com os produtos
const orders = ref<Order[]>([]);
const store = useStore();
const user2 = computed(() => store.state.user);
idU = user2.value['user']['id'];
onMounted(async () => {
  const responseOrder = await fetchAllOrders(idU);
  orders.value = responseOrder.data;
  const id: string = route.params.id;
  //TODO por user logado
  const responseItem = await fetchOrder(idU, id);
  orderItem.value = responseItem.data;
});
</script>
<style scoped>
.wrapper-mains {
  height: auto;
  background: white;
  text-align: center;
  margin: auto;
  padding: 20px;
}
.textarea {
  display: block;
  width: 100%;
  height: 70px;
  border-radius: 5px;
}
.tabela {
  margin-top: 180px;
}
.titulo {
  font-size: 20px;
}
@media (max-width: 660px) {
  .titulo {
    font-size: 25px;
    text-align: center !important;
  }
  .resumo {
    margin-top: 10px;
    text-align: right;
    margin-right: 40px;
  }
}
</style>
