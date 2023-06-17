<template>
  <div>
    <h1>Histórico de encomendas</h1>
    <br />
    <!--<OrderHistory/>-->
    <OrderHistoryProducer />
  </div>
</template>

<script lang="ts">
import OrderHistoryProducer from '../components/OrderHistoryProducer.vue';

export default {
  components: {
    OrderHistoryProducer,
  },
};
</script>
<style scoped>
h1 {
  text-align: center;
}
</style>
