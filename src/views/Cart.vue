<template >
  
  <div class="parent">
    <div style="text-align: center;">
        <button @click="goBack" type="button" class="btn btn-outline-secondary btn-sm" style="float:">
          Voltar
        </button>
    </div>
    
    <table class="table table-responsive-md">
        <tr>
            <td class="left-column">
            <div>
                X items no carrinho

                <div style="height:2vh"></div>

                <CartItem></CartItem>
                <CartItem></CartItem>
            </div>
            </td>

            <td class="right-column">
            <div>
              
              <h3>Rever a comprar</h3>
                <div style="height:2vh"></div>

                <p style="text-align: justify;">
                  Sub-total: <span class="checkout">0,00€</span><br>
                  Entrega: <span class="checkout">0,00€</span><br>
                </p>

                <div style="height:5vh;"></div>

                <button type="button" class="btn btn-outline-secondary btn-sm checkout" >
                  Aplicar
                </button>

                <div style="height:10vh;"></div>
                <p>
                  Total: <span class="checkout">0,00€</span><br>
                </p>
                <div style="text-align: center;">

                  <!--
                  <button  @click="apagar" type="button" class="btn btn-outline-secondary btn-sm" style="text-align: center;">
                    apagar carrinho
                  </button>-->
                </div>
            </div>
        </td>
        </tr>
       
  <h3>Selecione o endereço de envio</h3>
<div class="form-check form-check-inline">
  <button  type="button" class="btn btn-outline-secondary btn-sm" style="text-align: center;">
    <a href="/addAddress">
                    Adicionar novo endereco
    </a>
</button>
   <h5> Endereços definidos </h5>
   <div class="row">
    <div class="col-sm-6" v-for="(num, index) in address2.totalItems" :key="index">
      <!-- Utilize classes do Bootstrap para criar uma grade de duas colunas -->
      <div class="form-check">
  <input class="form-check-input" type="checkbox" :value="address2['items'][num-1]['id']" v-model="selectedItems" @change="checkButtonDisabled"  />
  <label class="form-check-label" for="checkbox{{ index + 1 }}">
    <div class="border p-3" style="width: 500px;">
 <!-- Adicione a classe "border" para criar a borda e "p-3" para adicionar espaçamento interno -->
      <p>{{ address2['items'][num-1]['street'] }}, numero {{ address2['items'][num-1]['door']}}, andar {{ address2['items'][num-1]['floor']}}</p>
      <p>{{ address2['items'][num-1]['zipCode'] }}, {{ address2['items'][num-1]['parish'] }}</p>
      <p>Distrito de {{ address2['items'][num-1]['district'] }}</p>
      <p>{{ address2['items'][num-1]['latitude'] }}, {{ address2['items'][num-1]['longitude'] }}</p>
    </div>
  </label>
</div>

    </div>
  </div>
  <button  @click="submitOrder" type="button" class="btn btn-outline-secondary btn-sm" style="text-align: center;" :disabled="isButtonDisabled">
                    Finalizar a compra
</button>
</div>
<br>


    </table>

  </div>
  
</template>


<style>

.container {
  display: flex;
align-items: center;
}


table {
border: 1px solid #aaa;
width: 100%;
border-collapse: collapse;
}

@media (max-width: 800px) {
tr {
  display: block;
}

td {
  border: 1px solid black;
  padding-left: 10px;
  padding-right: 10px;
  display: inline-block;
  word-break: break-all;
}
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



</style>

<script setup lang="ts"> 
import CartItem from "@/components/CartItem.vue";
import { onMounted, ref} from "vue";
import {getAddresses, postOrderPayment} from "../api/cart.ts";
const address2 = ref<Order[]>([]); //array com os produtos

onMounted(async () => {
const addresses = await getAddresses('3');
console.log(addresses.data.items);
address2.value=addresses.data;
});

</script>

<script lang="ts">
import { Address } from '../types/interfaces';
import { postNewAdress } from '../api/consumers';

  export default {
    data() {
      return {
        showEnderecos: false,
        showEnderecos2: false,

        isLoading: false,
        selectedItems: [], // Variável de dados para armazenar os checkboxes selecionados
        isButtonDisabled: true, // Variável de dados para controlar o estado do botão
        address2: {
        items: '' // Valor inicial vazio
      }

      }
    },
    
    
  methods: {
    checkButtonDisabled() {
      // Verifica se algum checkbox está selecionado e atualiza o estado do botão
      this.isButtonDisabled = this.selectedItems.length === 0;
      console.log(this.selectedItems); // Exemplo de como acessar o valor selecionado

    },
    async obtemEnderecos(){
     // const addresses = await getAddresses('4');
      //console.log(addresses.data.items);
      console.log('oi');
    },
    //vai buscar os dados do enderco novo e adicionar ao user
    
    desmarcarCheckbox1() {
        this.showEnderecos = false;
      },
      desmarcarCheckbox2() {
        this.showEnderecos2 = false;
      },
      goBack() {
        window.history.back();
      },
      
    async submitOrder() {
      var id = (this.selectedItems[0]);
     // var id=; //TODO trocar pq nao tem endereco associado ainda, pelo de cima q e o selected
      try {
        //const responseAdress = await postNewAdress()
    
        // await postOrderPayment(this.userId, this.shippingAddress);
          //TODO trocar o 1 para o id do usar logado
        const response = await postOrderPayment('3', { shippingAddressId: id});
        window.location.href = (response.data['checkout_url']);
        console.log('Pedido enviado com sucesso!');
          
        } catch (error) {
          console.error(error);
          console.log('Erro ao enviar o pedido. Por favor, tente novamente mais tarde.');
        }
      },
      async apagar() {
        try {
    
    // await postOrderPayment(this.userId, this.shippingAddress);
    //TODO trocar o 11 para o id do usar logado
  await deleteCart('25');
    console.log('Carrinho apagado com sucesso!');
    
  } catch (error) {
    console.error(error);
    console.log('Erro ao apagar carrinho.');
  }
        
      }
      
  }
  
  };
</script>


