<template>
  <div id="container">
    <div id="titulo">
    <h1>Consumidor {{  $route.params.id }}</h1>
    </div>
  
<div class="cart" >
  <b-card id="b-card"
    :title="users['name']"
    :img-src="users['image'] && users['image']['url'] ? users['image']['url'] : '../semimagem.png'"
    :img-alt="users['image'] && users['image']['alt'] ? users['image']['alt'] : 'Default image'"
    img-top
    tag="article"
    style="max-width: 30rem;"
    class="mb-2"
>
  <b-card-text>
    <strong>Email: </strong>{{ users['email'] || 'Não definido'}}
    <br>
    <strong>Telemóvel: </strong>{{ users['phone'] || 'Nnão definido'}}
    <br>
    <strong>Morada: </strong>
    {{ users['addresses'] && users['addresses'][0] ? users['addresses'][0]['street'] + ', nº' + users['addresses'][0]['number'] + ', porta ' + users['addresses'][0]['door'] + ' ' + users['addresses'][0]['zipCode'] + ', ' + users['addresses'][0]['city'] : 'Não definido'}}
    <div v-for="num in users['addresses'] ? users['addresses'].length-1 : 0">
      <strong>Morada: </strong>
      {{ users['addresses'] && users['addresses'][num] ? users['addresses'][num]['street'] + ', nº' + users['addresses'][num]['number'] + ', porta ' + users['addresses'][num]['door'] + ' ' + users['addresses'][num]['zipCode'] + ', ' + users['addresses'][num]['city'] : 'Não definido'}}
    </div>
  </b-card-text>


    <div class="botaoCancel">
    <b-button v-if="users['deletedAt']===null" href="#" variant="secondary" @click="showCancelDialog"><span style="color:white;">Desativar conta</span></b-button>
    <b-button v-else href="#" variant="secondary" @click="reativar"><span style="color:white;">Reativar conta</span></b-button>
  </div>
  </b-card>

</div> 
  </div>
</template>
<script lang="ts">
import Swal from 'sweetalert2';

import {getConsumerId, desativarConsumer, ativarConsumer} from '../api/consumers'
import { onMounted, ref} from "vue";
import { Consumer } from "../types/interfaces";
export default {
  setup() {
    const id = ref(0);
    const users = ref<Consumer[]>([]);
    onMounted(async () => {
      
      id.value = window.location.pathname.split('/').pop()?.toString();
      console.log(id.value);

      try {
        const response = await getConsumerId(id.value);
        users.value = response.data;
      } catch (error) {
        console.error(error);
      }
    });

    return { users, id };
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
}).then(async(result) => {
  if (result.isConfirmed) {
    desativarConsumer(this.id)
  .then(() => {
    Swal.fire(
      'Desativa!',
      'A conta encontra-se desativada.',
      'success'
    );
  })
  .catch((error) => {
    console.error(error);

    if (error.response && error.response.status === 400) {
      Swal.fire(
        'Erro ao desativar conta',
        'Ocorreu um erro na requisição, não foi possível concluir a requisição de desativar conta.',
        'error'
      );
    } else {
      Swal.fire(
        'Erro!',
        'Não foi possível desativar a conta.',
        'error'
      );
    }
  });

  }
})
  },
  reativar(): void {
      Swal.fire({
  title: 'Reativar conta?',
  text: "A conta pode voltar a ser desativada.",
  icon: 'warning',
  showCancelButton: true,
  cancelButtonText: "Cancelar",
  confirmButtonColor: '#d33',
  cancelButtonColor: '#3085d6' ,
  confirmButtonText: 'Sim, reativar!'
}).then(async(result) => {
  if (result.isConfirmed) {
    ativarConsumer(this.id)
  .then(() => {
    Swal.fire(
      'Reativa!',
      'A conta encontra-se ativa novamente.',
      'success'
    );
  })
  .catch((error) => {
    console.error(error);
    if (error.response && error.response.status === 400) {
      Swal.fire(
        'Erro ao reativar a conta',
        'Ocorreu um erro na requisição, não foi possível concluir a requisição de ativar a conta.',
        'error'
      );
    } else {
      Swal.fire(
        'Erro!',
        'Não foi possível reativar a conta.',
        'error'
      );
    }
  });

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
  width: 800px !important;
  align-items: center;
  justify-content: center;
}

#b-card{
  background-color: rgb(239, 243, 247)!important;

}

/* estilos para telas com largura menor ou igual a 600px */
@media (max-width: 600px) {

  .cart {
    width: 300px;

  }
}
</style>