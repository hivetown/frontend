<template>
  <div>
    <h1 class="dgreen-txt main-txt mt-4">Histórico de encomendas</h1>
    <br />
    <div
      class="parent table-container-main"
      v-if="$store.state.user?.user?.type === 'CONSUMER'"
    >
      <OrderHistory />
    </div>
    <div
      class="parent table-container-main"
      v-if="$store.state.user?.user?.type === 'PRODUCER'"
    >
      <OrderHistoryProducer />
    </div>
  </div>
</template>

<script lang="ts">
import OrderHistory from '../components/OrderHistory.vue';
import OrderHistoryProducer from '../components/OrderHistoryProducer.vue';

export default {
  components: {
    OrderHistory,
    OrderHistoryProducer,
  },
};
</script>
<style scoped>
h1 {
  text-align: center;
  font-size: 2.3rem;
}

@media (max-width: 768px) {
  h1 {
    font-size: 1.8rem;
  }

  .table-container-main {
    height: 70vh;
  }
}
</style>
