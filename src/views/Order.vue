<template>
    <div class="root">
      <div class="wrapper-mains">
        <div >
            <!-- TODO adicionar o numero da encomenda -->
            <p class="titulo" v-if="orderItem.order">Progresso da encomenda {{ orderItem.order.id }}</p>
            <p v-else>Order not found</p>
          <Progresso :length="4"></Progresso>
        </div>
      </div>
      <div class="tabela">
        <OrderDetails />
        
    </div>
    </div>
    
  </template>
  <script lang="ts">
  import Progresso from '../components/Progress.vue';
  import OrderDetails from '../components/OrderDetails.vue';
  export default {
    components:{
      Progresso,
      OrderDetails,
    }
  }
  </script>
  <script setup lang="ts">
  import { onMounted, ref} from "vue";
   import { fetchOrder } from "../api";
   import { Order } from "../types/interfaces";
   const orderItem = ref<Order[]>([]); //array com os produtos
    const search = ref('');
    onMounted(async () => {
      const responseItem = await fetchOrder('86', '548');
      orderItem.value=responseItem.data;
   })
</script>
  <style scoped>
  .wrapper-mains{
      height: auto;
      background: white;
      text-align: center;
      margin: auto;
      padding: 20px  ;
  }
  .textarea{
      display: block;
      width: 100%;
      height: 70px;
      border-radius: 5px;
  }
  .tabela{
    margin-top: 180px;
  }
  
  .titulo {
    font-size: 30px;
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
  