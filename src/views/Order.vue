<template>
  <div class="root parent">
    <router-link to="/encomendas" class="p-2 grey-txt text-decoration-none">
      <PageBack></PageBack>
    </router-link>

    <div class="wrapper-mains">
      <div id="principal">
        <p class="titulo">Estado da encomenda nº {{ $route.params.id }}</p>
        <Progress
          :order="order"
          :length="4"
          v-if="order.generalStatus !== 'Canceled'"
        ></Progress>
        <i v-else class="bi bi-x-circle">Encomenda cancelada</i>
      </div>
      <div
        class="tabela"
        :style="{
          marginTop: order.generalStatus === 'Canceled' ? '20px' : '',
        }"
      >
        <OrderDetails :order="order" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Progress from '../components/Progress.vue';
import PageBack from '../components/PageBack.vue';
import OrderDetails from '../components/OrderDetails.vue';
import { ref, computed, onBeforeMount } from 'vue';
import { useStore } from '@/store';
import { fetchOrder } from '../api/orders';
import { useRoute } from 'vue-router';
import { Order } from '@/types';
const route = useRoute();
const order = ref<Order>({} as Order);
const store = useStore();
const user2 = computed(() => store.state.user);
onBeforeMount(async () => {
  if (user2.value && user2.value.user && user2.value.user.id) {
    if (typeof route.params.id === 'string') {
      const id = route.params.id;

      const responseItem = await fetchOrder(user2.value.user.id, id);
      order.value = responseItem.data;
    }
  }
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
  margin-top: 5vh;
}
.titulo {
  font-size: 1.8em;
}
@media (max-width: 660px) {
  .titulo {
    font-size: 1.3em;
    text-align: center !important;
  }
  .resumo {
    margin-top: 10px;
    text-align: right;
    margin-right: 40px;
  }
}
</style>
