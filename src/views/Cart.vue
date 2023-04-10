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
        <div>
          <div class="input-group">
  <label>
    <input type="checkbox" v-model="showEnderecos" @change="desmarcarCheckbox2"> Endereco predefinido
  </label>
</div>
<div class="input-group">
  <label>
    <input type="checkbox" v-model="showEnderecos2" @change="desmarcarCheckbox1"> Selecionar novo endereco
  </label>
</div>
<Enderecos v-if="showEnderecos2" />
</div>
<button  @click="submitOrder" type="button" class="btn btn-outline-secondary btn-sm" style="text-align: center;">
                    Finalizar a compra
                  </button>
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
import Enderecos from "@/components/Enderecos.vue";

</script>

<script lang="ts">
import { postOrderPayment } from '../api/cart';
import { deleteCart } from '../api/cart';

  export default {
    data() {
      return {
        showEnderecos: false,
        showEnderecos2: false
      }
    },
  methods: {
    desmarcarCheckbox1() {
        this.showEnderecos = false;
      },
      desmarcarCheckbox2() {
        this.showEnderecos2 = false;
      },
      goBack() {window.history.back();},
      
    async submitOrder() {
      try {
    
          // await postOrderPayment(this.userId, this.shippingAddress);
          //TODO trocar o 11 para o id do usar logado
          const response = await postOrderPayment('25', { shippingAddressId: 1319 });
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


