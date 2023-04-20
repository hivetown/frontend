<template >
    <div class="root">
      <button @click="goBack" type="button" class="btn btn-outline-secondary btn-sm" style="float:">
            Voltar
          </button>
      <div class="wrapper-mains">

      
      
      <h1>Carrinho</h1>
      <h5>Aqui poderá consultar os itens que estão atualmente no seu carrinho:</h5>

      <table class="table table-responsive-md">
          <tr>
              <td class="left-column">
              <div>

                  <!--{{ itensCarrinho }}-->

                  <!--{{ itensCarrinho }}-->

                  <CartItem v-for="cartItem in itensCarrinho.items" :cartItem="cartItem"></CartItem><!--   -->
                  <!--<CartItem v-for="id in nElementos" :key="id" :itensCarrinho.items="[id]"></CartItem>-->

                  <!--<CartItem :productId="produto.id" :productTitle="produto.name" :productDescription="produto.description"></CartItem>-->
              </div>
              </td>

              <td class="right-column">
              <div>
                <h3>Rever a comprar</h3>
                  <div style="height:2vh"></div>

                  <p style="text-align: justify;">
                    Total de items: <span class="checkout">{{ nElementos }}</span><br>
                    Sub-total: <span class="checkout">{{ precoTotal }}€</span><br>
                    Entrega: <span class="checkout">0,00€</span><br>
                  </p>

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

                  <p style="text-align: justify;">
                    Total: <span class="checkout">{{ precoTotal }}€</span><br>
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

        nElementos: 0,

        precoTotal: 0.0,
      };
    },

    // Botão "Voltar"
    methods: {
        goBack() {window.history.back();},
    },
    
    // Buscar Info do Carrinho
    async beforeMount(){
      const itensCarrinho=await fetchCartItems(1);
      this.itensCarrinho=itensCarrinho.data;
      //console.log(JSON.stringify(this.itensCarrinho));

      let totalQtd = 0;
      for (let i=0; i < this.itensCarrinho["items"].length; i++) {
        totalQtd += parseFloat(JSON.stringify(this.itensCarrinho["items"][i].quantity));
      }
      this.nElementos = totalQtd;

      //console.log(this.nElementos);

      //console.log(this.listaQuantidade)

      //console.log(JSON.stringify(this.itensCarrinho.items[0].quantity));
      //console.log(Object.values(this.itensCarrinho["items"][0].producerProduct));
      //console.log(JSON.stringify(this.itensCarrinho["items"][0].producerProduct?.currentPrice));

      let totalSum = 0;
      for (let i=0; i < this.itensCarrinho["items"].length; i++) {
        totalSum += parseFloat(JSON.stringify(this.itensCarrinho["items"][i].producerProduct?.currentPrice));
      }
      //console.log(totalSum);
      this.precoTotal=totalSum.toFixed(2);
    },
  };
  

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