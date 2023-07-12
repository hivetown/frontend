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
          v-if="
            order.status !== 'Canceled' && order.generalStatus !== 'Canceled'
          "
        ></Progress>
        <!--
			tive de trocar de generalStatus p status pq por alguma razao nao tem generalstatus e sim status - nao percebo se o tipo e q
			esta errado
		-->
        <i
          v-if="
            order.status === 'Canceled' || order.generalStatus === 'Canceled'
          "
          class="bi bi-x-circle"
          >Encomenda cancelada</i
        >
      </div>
      <div
        class="tabela"
        :style="{
          marginTop: order.status === 'Canceled' ? '20px' : '',
        }"
      >
        <OrderDetails />
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
import { fetchOrder, fetchOrderProducer } from '../api/orders';
import { useRoute } from 'vue-router';
import { SpecificOrder } from '@/types';
const route = useRoute();
const order = ref<SpecificOrder>({} as SpecificOrder);
const store = useStore();
const user2 = computed(() => store.state.user);
onBeforeMount(async () => {
  if (user2.value && user2.value.user && user2.value.user.id) {
    if (typeof route.params.id === 'string') {
      const id = route.params.id;
      if (user2.value.user.type === 'CONSUMER') {
        const responseItem = await fetchOrder(user2.value.user.id, id);
        order.value = responseItem.data;
      }
      if (user2.value.user.type === 'PRODUCER') {
        const responseItem = await fetchOrderProducer(user2.value.user.id, id);
        order.value = responseItem.data;
      }
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
