<template></template>

<script setup lang="ts">
// import CartItem from '@/components/CartItem.vue';
</script>
<script lang="ts">
//import { fetchCartItems, deleteCart } from '../api/consumers';
//import { Cart, Image } from '@/types';
//import { computed } from 'vue';
//import { ProducerProduct } from '../types/interfaces';

export default {
  data() {
    return {
      // Guardar informações do login
      //userLoggedId: 0 as number,
      //userLoggedName: '' as string,
      //userLoggedNImage: {} as Image,
      //userLoggedType: '' as string,
    };
  },

  methods: {
    // Buscar Info do Carrinho
    async beforeMount() {},
  },
};
</script>
<style scoped>
.container {
  display: flex;
  align-items: center;
}

table {
  border: 1px solid #aaa;
  width: 100%;
  border-collapse: collapse;
}

.left-column {
  width: 55%;
}

.right-column {
  width: 25%;
}

.checkout {
  float: right;
  text-align: center;
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
