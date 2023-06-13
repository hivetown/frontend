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
              <div v-if="nElementos != 0">
                <div v-if="login">
                  <CartItem
                    v-for="cartItem in itensCarrinho.items"
                    :cart-item="cartItem"
                    @deleteCartItem="itemRemoved"
                    @updateCartItem="refreshValues"
                  ></CartItem>
                </div>
                <div v-else>
                  <CartItem
                    v-for="cartItem in itensCarrinhoNAU"
                    :cart-item="cartItem"
                    @deleteCartItem="itemRemoved"
                    @updateCartItem="refreshValues"
                  ></CartItem>
                </div>
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

  <!--------------------DIV DE TESTE-------------------->
  <div>
    <button
      @click="itemAddedNAU(1)"
      variant="danger"
      type="button"
      class="btn btn-outline-secondary circle-btn"
      title="Remover do carrinho"
    >
      <i class="bi bi-bag-plus-fill"></i>
    </button>
    <button
      @click="itemAddedNAU(2)"
      variant="danger"
      type="button"
      class="btn btn-outline-secondary circle-btn"
      title="Remover do carrinho"
    >
      <i class="bi bi-bag-plus-fill"></i>
    </button>
    <button
      @click="itemAddedNAU(3)"
      variant="danger"
      type="button"
      class="btn btn-outline-secondary circle-btn"
      title="Remover do carrinho"
    >
      <i class="bi bi-bag-plus-fill"></i>
    </button>
    <button
      @click="rmvCart()"
      variant="danger"
      type="button"
      class="btn btn-outline-secondary circle-btn"
      title="Remover do carrinho"
    >
      <i class="bi bi-bag-plus-fill"></i>
    </button>
    <button
      @click="fetchItemsFromBD()"
      variant="danger"
      type="button"
      class="btn btn-outline-secondary circle-btn"
      title="Remover do carrinho"
    >
      <i class="bi bi-bag-plus-fill"></i>
    </button>
  </div>
  <!--------------------DIV DE TESTE-------------------->
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
import { Cart, Image } from '@/types'; //TODO: Pode dar erro
import { computed } from 'vue';
//import { getSystemErrorMap } from 'util';
// --- Non-Aut-User TESTE ---
import { CartNAU, CartItemNAU } from '@/utils/cartItemNAU.js';
import { ProducerProduct } from '@types';
import { fetchProduct, fetchProducerProducts } from '@/api/products';
// Use the CartItemNAU class as needed

export default {
  data() {
    return {
      itensCarrinho: {} as Cart,
      login: false,

      nElementos: 1,
      precoTotal: '0,00 €',

      userLoggedId: 2 as number,
      userLoggedName: '' as string,
      userLoggedNImage: {} as Image,
      userLoggedType: '' as string,

      CartNAU: new CartNAU(),
      itensCarrinhoNAU: [],
    };
  },

  // Botão "Voltar"
  methods: {
    // --- Non-Aut-User TESTE ---
    async itemAddedNAU(idToAdd: number) {
      const itemInfo = await fetchProduct(155);
      const itemInfo2 = await fetchProducerProducts(idToAdd);
      console.log(itemInfo.data);
      console.log(itemInfo2);

      console.log(this.CartNAU);
    },

    rmvCart() {
      this.CartNAU.cleanCart();
    },
    // --------------------------

    goBack() {
      window.history.back();
    },

    itemRemoved(idToRmv: number) {
      if (this.login == true) {
        const indexToRemove = this.itensCarrinho.items.findIndex(
          (item) => item.producerProduct!.id === idToRmv
        );
        if (indexToRemove !== -1) {
          this.itensCarrinho.items.splice(indexToRemove, 1);
          this.refreshValues();
        }
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
        return '0,00 €';
      }
    },

    countItems() {
      if (this.login == true) {
        let totalQtd = 0;
        for (let i = 0; i < this.itensCarrinho['items'].length; i++) {
          totalQtd += parseFloat(
            JSON.stringify(this.itensCarrinho['items'][i].quantity)
          );
        }
        return totalQtd;
      } else {
        return 0;
      }
    },

    countPrice() {
      if (this.login == true) {
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
      }
      return 0;
    },

    async refreshValues() {
      //Guardar em Vars informação do User    const store = useStore();
      const userLoggedId = computed(() => this.$store.state.user);
      if (userLoggedId.value) {
        this.login = true;
        this.userLoggedId = userLoggedId.value['user']['id'];
        this.userLoggedName = userLoggedId.value['user']['name'];
        this.userLoggedType = userLoggedId.value['user']['type'];
        if (userLoggedId.value['user']['image']) {
          this.userLoggedNImage = userLoggedId.value['user']['image'];
        }
      }
      if (this.login == true) {
        const itensCarrinho = await fetchCartItems(this.userLoggedId);
        this.itensCarrinho = itensCarrinho.data;
        console.log(itensCarrinho);
        this.nElementos = this.countItems();
        this.precoTotal = this.countPrice();
      }
    },

    checkLogin() {
      if (this.$store.state.user != undefined) {
        this.refreshValues();
      }
    },
  },

  // Buscar Info do Carrinho
  async beforeMount() {
    this.refreshValues();
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
