<template>
  <div>
    <h1>Histórico de encomendas</h1>
    <br />
    <!--<OrderHistory/>-->
    <OrderHistory />
  </div>
</template>
<script setup lang="ts">
import { Order } from '../types/interfaces';
import { ref, watch, computed } from 'vue';
import { useStore } from '@/store';
const orders = ref<Order[]>([]);
const search = ref('');
var id = 0;
const store = useStore();
const user2 = computed(() => store.state.user);
id = user2.value['user']['id'];

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
