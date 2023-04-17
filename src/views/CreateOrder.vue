<template>
    <div class="form-address">
        <br>
      <a id="voltar" style=" color:black; text-decoration: none;" href="/carrinho"><i class="bi bi-arrow-left-circle"></i> Voltar</a>
      <br>
        <br>
    <h3 class="titulo">Selecione o endereço de envio</h3>
    <div class="form-check form-check-inline">
<br>
    <h4> Endereços definidos </h4>
<div class="row" v-if="address2.totalItems > 0">
        <div class="col-sm-6" v-for="(num, index) in address2.totalItems" :key="index">
        <!-- Utilize classes do Bootstrap para criar uma grade de duas colunas -->
        <div class="form-check">
    <input class="form-check-input" type="radio" :value="address2['items'][num-1]['id']" v-model="selectedItems" @change="checkButtonDisabled"  />
    <label class="form-check-label" for="radio{{ index + 1 }}">
        <div class="border p-3" id="caixa">
    <!-- Adicione a classe "border" para criar a borda e "p-3" para adicionar espaçamento interno -->
        <p>{{ address2['items'][num-1]['street'] }}, numero {{ address2['items'][num-1]['number']}} {{ address2['items'][num-1]['door']}}, andar {{ address2['items'][num-1]['floor']}}</p>
        <p>{{ address2['items'][num-1]['zipCode'] }}, {{ address2['items'][num-1]['parish'] }}</p>
        <p>Distrito de {{ address2['items'][num-1]['district'] }}</p>
        <p>{{ address2['items'][num-1]['latitude'] }}, {{ address2['items'][num-1]['longitude'] }}</p>
        </div>
    </label>
    </div>

        </div>
        
    </div>
    <p v-else>Ainda não existem endereços salvos!</p>

    </div>
    <div id="adiciona">
    <h3 class="titulo">Ou</h3>
        <a id="adc" href="/addAddress">
                        Adicionar novo endereço
        </a>
    <br>
    
</div>

<div id="finalizar">
    <button  id="btn" @click="submitOrder" type="button" class="btn btn-outline-secondary btn-sm" style="text-align: center;" :disabled="isButtonDisabled">
                        Finalizar a compra
    </button>
    <div id="aviso" v-if="isButtonDisabled">*Selecione pelo menos um endereço para finalizar a encomenda</div>

    
</div>

    <br>
</div>
</template>
<script setup lang="ts"> 
import Swal from 'sweetalert2';
import CartItem from "@/components/CartItem.vue";
import { onMounted, ref} from "vue";
import {getAddresses, postOrderPayment} from "../api/cart.ts";
const address2 = ref<Order[]>([]); //array com os produtos

onMounted(async () => {
  //TODO trocar pelo id do user logado
const addresses = await getAddresses('2');
console.log(addresses.data.items);
address2.value=addresses.data;
});

</script>
<script lang="ts">

  export default {
    data() {
      return {
        selectedItems: [], // Variável de dados para armazenar os checkboxes selecionados
        isButtonDisabled: true, // Variável de dados para controlar o estado do botão

      }
    },
    methods: {
    checkButtonDisabled() {
      // Verifica se algum checkbox está selecionado e atualiza o estado do botão
      this.isButtonDisabled = this.selectedItems.length === 0;
      console.log(this.selectedItems); // Exemplo de como acessar o valor selecionado

    },
    async submitOrder() {
      if (this.isButtonDisabled) {
        // Emitir um alerta
        alert("O botão está desabilitado!");
      } 
      var id = (this.selectedItems);
     // var id=; //TODO trocar pq nao tem endereco associado ainda, pelo de cima q e o selected
      try {
        //const responseAdress = await postNewAdress()
    
        // await postOrderPayment(this.userId, this.shippingAddress);
          //TODO trocar o 1 para o id do usar logado
        const response = await postOrderPayment('2', { shippingAddressId: id});
        window.location.href = (response.data['checkout_url']);
        console.log('Pedido enviado com sucesso!');
          
        } catch (error) {
          if (error.response.status === 400){
            console.log('p');
            Swal.fire({
          title: 'Oops... Falta de stock!',
          text: 'A encomenda não foi efetuada devido a falta de stock. Pedimos desculpa pelo incómodo.',
          icon: 'error',
          confirmButtonColor: '#797dc3',
          confirmButtonText: 'Ok',
        })
      }
          //console.error(error);
          console.log('Erro ao enviar o pedido. Por favor, tente novamente mais tarde.');
        }
      },
    }
  }
</script>
<style scoped>
#adc{
    font-size: 28px;
    color:black;
    
}
#aviso{
  color: rgb(110, 102, 102);
}
 .titulo {
      text-align: center;
      font-size: 35px;
      margin-top: 20px;
      font-family: "DM Serif Display";
    }
#caixa {
    width: 500px !important;
}
#adiciona {
    text-align: center;
}
.form-address {
      margin-left: 100px;
      margin-right: 100px;
      background-color: beige;
      height: 850px;
      border-radius: 10px;
    }
#finalizar {
    margin-top: 20px;
    text-align: right;
}
#voltar {
      font-size: 30px;
      font-style: bold;
}
#btn {
    font-size: 20px;
}
input[type="radio"]{
  width: 30px;
  margin-right: 5px;
  height: 30px;
}
@media (max-width: 768px) { /* Substitua 768px pelo valor desejado para a largura de tela */
        .form-address {
            margin-left: 10px; /* Ajuste a margem esquerda para telas menores */
            margin-right: 10px; /* Ajuste a margem direita para telas menores */
            height: auto; /* Ajuste a altura para telas menores */
        }
        
    }
    #caixa {
    width: 300px;
}
</style>