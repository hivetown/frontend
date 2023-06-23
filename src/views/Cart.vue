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

      <button @click="cleanCart()">Limpar Carrinho</button>

      <table class="table table-responsive-md">
        <tr>
          <td class="left-column">
            <div>
              <!---->
              <div v-if="itemsNumber != 0">
                <div v-if="login">
                  <CartItem
                    v-for="cartItem in itemsCart.items"
                    :cart-item="cartItem"
                    @deleteCartItem="removeItem"
                    @updateCartItem="refreshValues"
                  ></CartItem>
                </div>
                <!---->
                <div v-else>
                  <CartItemNAU
                    v-for="cartItem in itemsCartNAU"
                    :cart-item="cartItem"
                    @deleteCartItem="removeItem"
                    @updateCartItem="refreshValues"
                  ></CartItemNAU>
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
                <a href="/createOrder">
                  <button
                    type="button"
                    class="btn btn-outline-secondary btn-sm"
                    style="text-align: center"
                  >
                    Prosseguir para Pagamento & Envio
                  </button>
                </a>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<!-- Sim, existem dois scripts mas se não estiver assim  -->
<!-- não funciona de todo por isso é melhor deixar estar -->
<script setup lang="ts">
import CartItem from '@/components/CartItem.vue';
import CartItemNAU from '@/components/CartItemNAU.vue';
</script>
<script lang="ts">
import { fetchCartItems, deleteCart } from '../api/consumers';
import { Cart, Image } from '@/types';
import { computed } from 'vue';
// N.A.U. - Import
import { CartNAU } from '@/utils/cartItemNAU.js';
import { ProductSpec } from '../types/interfaces';

export default {
  data() {
    return {
      // Informações dos itens do carrinho do user
      itemsCart: {} as Cart,

      // N.A.U. - Começar carrinho
      cartNAU: new CartNAU(),
      itemsCartNAU: [] as Array<ProductSpec>,
      itemsCartNAUQuantities: [] as number[],

      // Verificador de login para o checkLogin()
      login: false,

      // Contador de itens e preço total
      itemsNumber: 0,
      itemsPrice: '0,00 €',

      // Guardar informações do login
      userLoggedId: 0 as number,
      userLoggedName: '' as string,
      userLoggedNImage: {} as Image,
      userLoggedType: '' as string,
    };
  },

  methods: {
    // Botão de voltar para trás
    goBack() {
      window.history.back();
    },

    cleanCart() {
      if (this.login) {
        deleteCart(this.userLoggedId);
      } else {
        this.cartNAU.cleanCart();
      }
      this.refreshValues();
    },

    // Remover item do carrinho
    removeItem(idToRmv: number) {
      if (this.login) {
        const indexToRemove = this.itemsCart.items.findIndex(
          (item) => item.producerProduct!.id === idToRmv
        );
        if (indexToRemove !== -1) {
          this.itemsCart.items.splice(indexToRemove, 1);
          //this.refreshValues();
        }
        location.reload();
      } else {
        this.refreshValues();
        location.reload();
      }
    },

    // Buscar número de itens
    getItems() {
      return this.itemsNumber;
    },

    // Buscar preço total
    getPrice() {
      return this.itemsPrice;
    },

    // Contador de itens
    countItems() {
      let totalQtd = 0;
      let items;
      if (this.login) {
        items = this.itemsCart['items'];
        for (let i = 0; i < items.length; i++) {
          totalQtd += parseFloat(JSON.stringify(items[i].quantity));
        }
        return totalQtd;
      } else {
        const carrinho = this.cartNAU.getCart();
        let totalQtd = 0;
        for (let i = 0; i < carrinho.length; i++) {
          totalQtd += carrinho[i].quantity;
        }
        return totalQtd;
      }
    },

    // Contador de preço total
    countPrice() {
      let totalSum = 0;
      let toCurrency = '0,00';
      // para AU
      if (this.login) {
        for (let i = 0; i < this.itemsCart['items'].length; i++) {
          totalSum +=
            parseFloat(
              JSON.stringify(
                this.itemsCart['items'][i].producerProduct?.currentPrice
              )
            ) * parseFloat(JSON.stringify(this.itemsCart['items'][i].quantity));
        }
        totalSum = parseInt(totalSum.toFixed(2));
        toCurrency = totalSum.toLocaleString('pt-PT', {
          style: 'currency',
          currency: 'EUR',
        });
        return toCurrency;
      } else {
        const carrinho = this.cartNAU.getCart();
        let totalSum = 0;

        for (let i = 0; i < carrinho.length; i++) {
          totalSum += carrinho[i].currentPrice * carrinho[i].quantity;
        }
        totalSum = parseInt(totalSum.toFixed(2));
        toCurrency = totalSum.toLocaleString('pt-PT', {
          style: 'currency',
          currency: 'EUR',
        });
        return toCurrency;
      }
    },

    // Atualizar info dos itens do carrinho, quantidade de itens e preço total
    async refreshValues() {
      // para AU
      if (this.login) {
        const itemsCart = await fetchCartItems(this.userLoggedId);

        // Resto AU
        this.itemsCart = itemsCart.data;
        this.itemsNumber = this.countItems();
        this.itemsPrice = this.countPrice();

        // para NAU
      } else {
        this.itemsCartNAUQuantities = [];
        let itemsCart: Array<ProductSpec> = [];

        const cartInCartNAU = this.cartNAU.getCart();

        //for (let i = 0; i < this.cartNAU.getCart().length; i++) {
        //  const newItem = await fetchProduct(cartInCartNAU[i].productSpec);
        //  itemsCart.push(newItem.data);
        //  this.itemsCartNAUQuantities.push(cartInCartNAU[i].quantity);
        //}
        for (let i = 0; i < this.cartNAU.getCart().length; i++) {
          itemsCart.push(cartInCartNAU[i]);
          this.itemsCartNAUQuantities.push(cartInCartNAU[i].quantity);
        }

        // Resto NAU
        this.itemsCartNAU = itemsCart;
        this.itemsNumber = this.countItems();
        this.itemsPrice = this.countPrice();
      }
    },

    // Verificar o login do user
    checkLogin() {
      //Guardar em Vars informação do User    const store = useStore();
      const userLoggedId = computed(() => this.$store.state.user);

      // Verifica se o login foi não executado
      if (this.login == false) {
        // Confirmação que existe informação para guardar
        if (userLoggedId.value) {
          this.login = true;
          this.userLoggedId = userLoggedId.value['user']['id'];
          this.userLoggedName = userLoggedId.value['user']['name'];
          this.userLoggedType = userLoggedId.value['user']['type'];
          if (userLoggedId.value['user']['image']) {
            this.userLoggedNImage = userLoggedId.value['user']['image'];
          }
          this.refreshValues();
          return true;
          // Caso não exista não há user
        } else {
          this.refreshValues();
          return false;
        }
        // Se existir login
      } else {
        return true;
      }
    },
  },

  // Buscar Info do Carrinho
  async beforeMount() {
    this.checkLogin();
  },
};
</script>
<style scoped>
.container {
  display: flex;
  align-items: center;
}

table {
  border: 1px solid #aaa;
  width: 100%;
  border-collapse: collapse;
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
.wrapper-mains {
  /* height: auto;
  background: white;
  text-align: center;
  margin: auto;
  padding: 20px; */
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
