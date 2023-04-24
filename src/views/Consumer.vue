<template>
    <h1>Consumidor {{  $route.params.id }}</h1>
    
<div class="cart">
  <b-card
    title="nome"
    img-src="https://picsum.photos/600/300/?image=25"
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 30rem;"
    class="mb-2"
  >
    <b-card-text>
      email
      <br>
      telefone
      <br>
      tipo
      <br>
    </b-card-text>

    <b-button href="#" variant="primary">Desativar conta</b-button>
  </b-card>
</div>
</template>
<script lang="ts">
import {getConsumerId} from '../api/consumers'
import { onMounted, ref} from "vue";
import { Consumer } from "../types/interfaces";
export default {
  setup() {
  
    const users = ref<Consumer[]>([]);
    onMounted(async () => {
      const id = ref<number>([]);
      id.value = window.location.pathname.split('/').pop()?.toString();
      console.log(id.value);

      try {
        const response = await getConsumerId(id.value);
        users.value = response.data;
      } catch (error) {
        console.error(error);
      }
    });

    return { users };
  },
};

</script>
<style scoped>
h1 {
    text-align: center;
    font-family: 'DM Serif Display';
}
.cart {
    width: 800px;
    margin-left: 440px;
}
</style>