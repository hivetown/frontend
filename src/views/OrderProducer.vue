<template>
  <div class="root">
    <router-link
      to="/encomendas"
      class="p-2 grey-txt text-decoration-none"
      style="font-weight: 500; margin-left: 20px"
      ><i class="bi bi-arrow-left"></i>Voltar
    </router-link>

    <div class="wrapper-mains">
      <div id="principal">
        <p class="titulo">Estado da encomenda {{ $route.params.id }}</p>
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
        <OrderDetailsProducer :order="order" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Progress from '../components/Progress.vue';
import OrderDetailsProducer from '../components/OrderDetailsProducer.vue';
import { ref, computed, onBeforeMount } from 'vue';
import { useStore } from '@/store';
import { getOrders } from '../api/producers';
import { useRoute } from 'vue-router';
import { Order } from '@/types';
const route = useRoute();
const order = ref<Order>({} as Order);
const store = useStore();
const user2 = computed(() => store.state.user);
onBeforeMount(async () => {
  console.log('teste1', user2.value);
  if (user2.value && user2.value.user && user2.value.user.id) {
    const responseItem = await getOrders(user2.value.user.id);
    order.value = responseItem.data;
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
  margin-top: 180px;
}
.titulo {
  font-size: 20px;
}
@media (max-width: 660px) {
  .titulo {
    font-size: 25px;
    text-align: center !important;
  }
  .resumo {
    margin-top: 10px;
    text-align: right;
    margin-right: 40px;
  }
}
</style>
