<template>
  <div>
    <h1 class="dgreen-txt main-txt mt-4">Histórico de encomendas</h1>
    <br />
    <div class="parent table-container-main">
      <OrderHistory />
    </div>
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
  font-size: 2.3rem;
}

.table-container-main {
  display: flex;
  justify-content: center !important;
  align-items: center !important;
}

@media (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }

  .table-container-main {
    height: 70vh;
  }
}
</style>
