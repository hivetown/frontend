<template>
  <div>
    <h1>Histórico de encomendas</h1>
    <br>
    <OrderHistory/>
  </div>
</template>

<script>
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
