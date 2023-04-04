<template>
  <div>
    <h1>Histórico de encomendas</h1>
    <br>
    <OrderHistory/>
<!--
    <ul>
      <li v-for="num in orders['totalItems'] " :key="num">{{ num-1 }}</li>
      <p>Codigo da encomenda: {{ orders['items'] && orders['items'][0] ? orders['items'][0]['id'] : '' }}</p>

    </ul>
    <p>Codigo da encomenda: {{ orders['items'] && orders['items'][0] ? orders['items'][0]['id'] : '' }}</p>
  -->
  <p>{{ orders }}</p>
  <table>
  <thead>
    <tr>
      <th>#</th>
      <th>Código da Encomenda</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="num in orders['totalItems']" :key="num">
      <td>{{ orders['items'] && orders['items'][num-1] ? orders['items'][num-1]['id'] : '' }}</td>
    </tr>
  </tbody>
</table>

<!--trocar o 0 pelo valor, ou seja fazer um for por cada encomenda-->



    <!--total items-->
    <!---<p> {{ orders['totalItems'] }} </p>-->
    <!--preco-->
    <!--
    <p>preco:</p>
  <p> {{ orders['items'][1]['price'] }} </p>
  <p>status:</p>
  <p> {{ orders['items'][0]['status'] }} </p>
  <p>codigo encomenda:</p>
  <p> {{ orders['items'][0] }} </p>-->






  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref, watch } from "vue";
   import { fetchAllOrders } from "../api";
   import { Order } from "../types/interfaces";
  const orders = ref<Order[]>([]);
  const fetchProducts = async (search?: string) => {
     orders.value = await fetchAllOrders(search).then((ps) => ps.data);
   };
   onMounted(fetchProducts);
   const search = ref("");
   watch(search, fetchProducts);
</script>
<script lang="ts">
import OrderHistory from "@/components/OrderHistory.vue";
export default{
  components: {
  OrderHistory
  }
}
</script>
<style scoped>
h1 {
  text-align: center;
}
</style>
