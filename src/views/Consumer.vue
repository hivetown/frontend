<template>
  <div id="container">
    <div id="titulo">
    <h1>Consumidor {{  $route.params.id }}</h1>
    </div>
<div class="cart">
  <b-card id="b-card"
    :title="users['name']"
    :img-src="users['image']['url']"
    :img-alt="users['image']['alt']"
    img-top
    tag="article"
    style="max-width: 30rem;"
    class="mb-2"
  >
    <b-card-text>
      Email: {{users['email']}}
      <br>
      Telemóvel: {{users['phone']}}
      <br>
      Morada: {{users['address']['street']}}, nº{{users['address']['number']}}, porta {{users['address']['door']}}
      <br>
      {{users['address']['zipCode']}}, {{users['address']['city']}}
    </b-card-text>

    <b-button href="#" variant="secondary" @click="showCancelDialog"><span style="color:white;">Desativar conta</span></b-button>
  </b-card>
</div> 
  </div>
</template>
<script lang="ts">
import Swal from 'sweetalert2';

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
  methods: {
    showCancelDialog(): void {
      Swal.fire({
  title: 'Dasativar conta?',
  text: "A conta pode voltar a ser ativada.",
  icon: 'warning',
  showCancelButton: true,
  cancelButtonText: "Cancelar",
  confirmButtonColor: '#d33',
  cancelButtonColor: '#3085d6' ,
  confirmButtonText: 'Sim, desativar!'
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire(
      'Desativa!',
      'A conta encontra-se desativada.',
      'success'
    )
  }
})
  }

  }
};

</script>
<style scoped>
h1 {
  text-align: center;
  font-family: 'DM Serif Display';
}

.cart {
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

#b-card{
  background-color: rgb(239, 243, 247)!important;

}

/* estilos para telas com largura menor ou igual a 600px */
@media (max-width: 600px) {

  .cart {
    width: 350px;

  }
}
</style>