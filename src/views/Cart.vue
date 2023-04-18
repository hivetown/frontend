<template >
  
    <div class="parent">
      <div style="text-align: center;">
          <button @click="goBack" type="button" class="btn btn-outline-secondary btn-sm" style="float:">
            Voltar
          </button>
      </div>
      
      <h1>Carrinho</h1>

      <table class="table table-responsive-md">
          <tr>
              <td class="left-column">
              <div>
                  <h5>Você atualmente possui {{ nElementos }} produtos <strong><u>distintos</u></strong> no seu carrinho:</h5>
                  <div style="height:2vh"></div>

                  <!--{{ itensCarrinho }}-->

                  <div style="height:2vh"></div>

                  <!--{{ itensCarrinho.items[0].producerProduct }}-->


                  <div style="height:2vh"></div>

                  <CartItem v-for="cartItem in itensCarrinho.items" :key="cartItem.producerProduct.id" :cartItem="cartItem"></CartItem>

                  <!--<CartItem :productId="produto.id" :productTitle="produto.name" :productDescription="produto.description"></CartItem>-->
              </div>
              </td>

              <td class="right-column">
              <div>
                <h3>Rever a comprar</h3>
                  <div style="height:2vh"></div>

                  <p style="text-align: justify;">
                    Total de items: <span class="checkout">Muitos</span><br>
                    Sub-total: <span class="checkout">0,00€</span><br>
                    Entrega: <span class="checkout">0,00€</span><br>
                  </p>

                  <div style="height:5vh;"></div>

                  <b-row>
                    <b-col col lg="8">
                    <div>
                    <b-form-select v-model="selected" :options="options" size="sm"></b-form-select>
                    </div>
                    </b-col>
                    <b-col>
                    <button type="button" class="btn btn-outline-secondary btn-sm checkout" >
                    Aplicar
                    </button>
                    </b-col>
                  </b-row>

                  <div style="height:5vh;"></div>

                  <p>
                    Total: <span class="checkout">0,00€</span><br>
                  </p>
                  <div style="text-align: center;">
                    <button type="button" class="btn btn-outline-secondary btn-sm" style="text-align: center;">
                      Finalizar a compra
                    </button>
                  </div>
              </div>
          </td>
          </tr>
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
  import { fetchCartItems } from "../api/consumers"
  import { Product } from "@/types";
  import { defineComponent } from "vue";
  import { Cart } from '@types/interfaces';
  import { getSystemErrorMap } from "util";

  export default {

    data(){
      return {
        itensCarrinho: {} as Cart,

        selected: null,
        options: [
          { value: null, text: '--Escolha o local de recolha--', disabled: true},
          { value: 1, text: 'Morada nº1' },
          { value: 2, text: 'Morada nº2' },
          { value: 3, text: 'Ponto de Recolha' },
          { value: 4, text: 'Loja' },
        ],

        nElementos: 0
      };
    },

    // Botão "Voltar"
    methods: {
        goBack() {window.history.back();}
    },
    
    // Buscar Info do Carrinho
    async beforeMount(){
      const itensCarrinho=await fetchCartItems(1);

      this.itensCarrinho=itensCarrinho.data;
      console.log(JSON.stringify(this.itensCarrinho));

      this.nElementos = this.itensCarrinho["items"].length;
    },

  };
  

</script>

