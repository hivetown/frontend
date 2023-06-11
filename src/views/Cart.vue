<template>
  <div class="root">
    <button
      @click="goBack"
      type="button"
      class="btn btn-outline-secondary btn-sm"
      style="float: "
    >
      Voltar
    </button>
    <div class="wrapper-mains">
      <h1>Carrinho</h1>
      <h5>
        Aqui poderá consultar os itens que estão atualmente no seu carrinho:
      </h5>

      <table class="table table-responsive-md">
        <tr>
          <td class="left-column">
            <div>
              <!---->
              <div v-if="login">
                <CartItem
                  v-for="cartItem in itensCarrinho.items"
                  :cart-item="cartItem"
                  @deleteCartItem="itemRemoved"
                  @updateCartItem="refreshValues"
                ></CartItem>
              </div>
              <div v-else>
                <p>Não possui itens no carrinho.</p>
              </div>
            </div>
          </td>

          <td class="right-column">
            <div>
              <h2>Totais</h2>
              <div style="height: 2vh"></div>

              <p style="text-align: justify; font-size: 1.3em">
                Total de items: <span class="checkout">{{ getItems() }}</span
                ><br />
                Preço Total: <span class="checkout">{{ getPrice() }}</span
                ><br />
              </p>
              <div style="text-align: center">
                <button
                  type="button"
                  class="btn btn-outline-secondary btn-sm"
                  style="text-align: center"
                >
                  Processeguir para Pagamento & Envio
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
import CartItem from '@/components/CartItem.vue';
</script>

<script lang="ts">
import { deleteCartItem, fetchCartItems } from '../api/consumers';
//import { Product } from '@/types';
//import { defineComponent } from 'vue';
import { Cart } from '@types'; //TODO: Pode dar erro
//import { getSystemErrorMap } from 'util';

export default {
  data() {
    return {
      itensCarrinho: {} as Cart,
      login: false,

      selected: null,
      options: [
        { value: null, text: '--Escolha o local de recolha--', disabled: true },
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
    goBack() {
      window.history.back();
    },

    itemRemoved(idToRmv: number) {
      const indexToRemove = this.itensCarrinho.items.findIndex(
        (item) => item.producerProduct!.id === idToRmv
      );
      if (indexToRemove !== -1) {
        this.itensCarrinho.items.splice(indexToRemove, 1);
        this.refreshValues();
      }
    },

    getItems() {
      if (this.login == true) {
        return this.nElementos;
      } else {
        return 0;
      }
    },

    getPrice() {
      if (this.login == true) {
        return this.precoTotal;
      } else {
        return 0;
      }
    },

    countItems() {
      let totalQtd = 0;
      for (let i = 0; i < this.itensCarrinho['items'].length; i++) {
        totalQtd += parseFloat(
          JSON.stringify(this.itensCarrinho['items'][i].quantity)
        );
      }
      return totalQtd;
    },

    countPrice() {
      let totalSum = 0;
      for (let i = 0; i < this.itensCarrinho['items'].length; i++) {
        totalSum +=
          parseFloat(
            JSON.stringify(
              this.itensCarrinho['items'][i].producerProduct?.currentPrice
            )
          ) *
          parseFloat(JSON.stringify(this.itensCarrinho['items'][i].quantity));
      }
      totalSum = parseInt(totalSum.toFixed(2));
      const toCurrency = totalSum.toLocaleString('pt-PT', {
        style: 'currency',
        currency: 'EUR',
      });
      return toCurrency;
    },

    async refreshValues() {
      const itensCarrinho = await fetchCartItems(999);
      this.itensCarrinho = itensCarrinho.data;
      this.nElementos = this.countItems();
      this.precoTotal = parseInt(this.countPrice());
      console.log(this.nElementos, this.precoTotal);
    },

    checkLogin() {
      if (this.$store.state.user != undefined) {
        this.login = true;
      }
    },
  },

  // Buscar Info do Carrinho
  async beforeMount() {
    this.checkLogin();
    if (this.login == true) {
      this.refreshValues();
    }
  },
};
</script>
<style scoped>
.wrapper-mains {
  height: auto;
  background: white;
  text-align: center;
  margin: auto;
  padding: 20px;
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
