<template>
    <div>
    <h1>Histórico de encomendas</h1>
    <br>
    <!--<OrderHistory/>-->
    <Exp/>
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
import OrderHistory from "@components/oh.vue";
import Exp from "@/components/exp.vue";

export default{
  components: {
  Exp
  }
}
</script>
<style scoped>
h1 {
  text-align: center;
}
</style>