<template>
  <div>
    <h1>Histórico de encomendas</h1>
    <br />
    <!--<OrderHistory/>-->
    <OrderHistory />
  </div>
</template>

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
