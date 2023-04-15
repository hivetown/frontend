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
        <a href="/createOrder"><button  type="button" class="btn btn-outline-secondary btn-sm" style="text-align: center;">Finalizar compra</button></a>

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


</script>

<script lang="ts">

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
   
      goBack() {
        window.history.back();
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


