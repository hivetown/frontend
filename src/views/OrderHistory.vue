<template>
  <div>
    <h1>Histórico de encomendas</h1>
    <br />
    <!--<OrderHistory/>-->
    <OrderHistory />
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

import { Order } from '../types/interfaces';
import { fetchAuth } from '../api/auth';

const orders = ref<Order[]>([]);
const search = ref('');
var id = 0;
onMounted(async () => {
  const responseItem = await fetchAuth();
  id = responseItem.data['id'];
  console.log(id);
});

watch(search);
</script>

<script lang="ts">
import OrderHistory from '../components/OrderHistory.vue';

export default {
  components: {
    OrderHistory,
  },
};
</script>
<style scoped>
h1 {
  text-align: center;
}
</style>
