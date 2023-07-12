<template>
  <Toast>
    <template #message="slotProps">
      <div class="p-toast-message-text">
        <span class="p-toast-summary">{{ slotProps.message.summary }}</span>
        <div class="p-toast-detail" v-html="slotProps.message.detail" />
      </div>
    </template>
  </Toast>
  <div class="root">
    <!-- <button
      @click="goBack"
      type="button"
      class="btn btn-outline-secondary btn-sm"
      style="float: "
    >
      Voltar
    </button> -->
    <div class="parent" @click="goBack">
      <PageBack style="margin-top: -2vh"></PageBack>
    </div>
    <div class="wrapper-mains parent">
      <h1>Carrinho</h1>
      <h5>
        Aqui poderá consultar os itens que estão atualmente no seu carrinho:
      </h5>

      <button @click="showConfirmation">Limpar Carrinho</button>
      <b-modal
        v-model="confirmationModal"
        title="Confirmação de Remoção"
        hide-footer
      >
        <p>Tem a certeza que pretende remover TODOS os itens do carrinho?</p>
        <div class="d-flex justify-content-end">
          <button class="btn btn-secondary mr-2" @click="cancelDeletion">
            Cancelar
          </button>
          <button class="btn btn-danger" @click="confirmDeletion">
            Remover
          </button>
        </div>
      </b-modal>

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
                    @delete-cart-item="removeItem"
                    @update-cart-item="refreshValues"
                    :key="cartItem.producerProduct.productSpec?.id"
                  ></CartItem>
                </div>
                <!---->
                <div v-else>
                  <CartItemNAU
                    v-for="cartItem in itemsCartNAU"
                    :cart-item="cartItem"
                    @delete-cart-item="removeItem"
                    @update-cart-item="refreshValues"
                    :key="cartItem.id"
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
                    Prosseguir para Pagamento &amp; Envio
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

<script lang="ts">
import {
  fetchCartItems,
  deleteCart,
  addCartItem,
  deleteCartItem,
  updateQuantityCartItem,
} from '../api/consumers';
import { Cart, Image } from '@/types';
import { computed } from 'vue';
import PageBack from '@/components/PageBack.vue';
// N.A.U. - Import
import { CartNAU } from '@/utils/cartItemNAU';
import { ProducerProduct } from '../types/interfaces';

import CartItem from '@/components/CartItem.vue';
import CartItemNAU from '@/components/CartItemNAU.vue';

import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

export default {
  components: { CartItem, CartItemNAU, Toast, PageBack },

  data() {
    return {
      // Informações dos itens do carrinho do user
      itemsCart: {} as Cart,

      // N.A.U. - Começar carrinho
      cartNAU: new CartNAU(),
      itemsCartNAU: [] as Array<ProducerProduct>,
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

      //Pop-up remover itens
      confirmationModal: false,

      toast: useToast(),
    };
  },

  methods: {
    // Botão de confirmação
    showConfirmation() {
      this.confirmationModal = true;
    },
    cancelDeletion() {
      this.confirmationModal = false;
    },
    confirmDeletion() {
      this.cleanCart();
      this.confirmationModal = false;
    },

    // Botão de voltar para trás
    goBack() {
      this.$router.go(-1); // Navega para a página anterior
    },

    async cleanCart() {
      if (this.login) {
        await deleteCart(this.userLoggedId);
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
        }
      } else {
        this.refreshValues();
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
        const carrinhoQuantidades = this.cartNAU.getCartQuantities();
        let totalQtd = 0;
        for (let i = 0; i < carrinho.length; i++) {
          totalQtd += carrinhoQuantidades[i];
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
        const carrinhoQuantidades = this.cartNAU.getCartQuantities();
        let totalSum = 0;

        for (let i = 0; i < carrinho.length; i++) {
          totalSum += carrinho[i].currentPrice * carrinhoQuantidades[i];
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
        await this.addNAUItems();
        const itemsCart = await fetchCartItems(this.userLoggedId);

        // Resto AU
        this.itemsCart = itemsCart.data;

        //Verificações de stock
        for (let i = 0; i < this.itemsCart.items.length; i++) {
          // Caso não haja stock
          if (this.itemsCart.items[i].producerProduct.stock === 0) {
            await deleteCartItem(
              this.userLoggedId,
              this.itemsCart.items[i].producerProduct.id
            );
            this.toast.add({
              severity: 'error',
              summary: 'Produto sem stock',
              detail: `O produto ${this.itemsCart.items[i].producerProduct.productSpec?.name} está de momento sem stock.`,
              life: 10000,
            });
          }
          // Caso tenha mais itens do que stock existente
          if (
            this.itemsCart.items[i].producerProduct.stock <
            this.itemsCart.items[i].quantity
          ) {
            updateQuantityCartItem(
              this.userLoggedId,
              this.itemsCart.items[i].producerProduct.id,
              this.itemsCart.items[i].producerProduct.stock
            );
            this.toast.add({
              severity: 'error',
              summary: 'Stock insuficiente',
              detail: `A quantidade do produto ${this.itemsCart.items[i].producerProduct.productSpec?.name} estava acima do stock existente portanto a sua quantidade está agora com o máximo de stock possível.`,
              life: 10000,
            });
          }
        }
        this.itemsNumber = this.countItems();
        this.itemsPrice = this.countPrice();
      } else {
        this.itemsCartNAUQuantities = [];
        let itemsCart: Array<ProducerProduct> = [];

        const cartInCartNAU = this.cartNAU.getCart();
        const carrinhoQuantidades = this.cartNAU.getCartQuantities();

        for (let i = 0; i < this.cartNAU.getCart().length; i++) {
          itemsCart.push(cartInCartNAU[i]);
          this.itemsCartNAUQuantities.push(carrinhoQuantidades[i]);
        }

        // Resto NAU
        this.itemsCartNAU = itemsCart;
        this.itemsNumber = this.countItems();
        this.itemsPrice = this.countPrice();
      }
    },

    // Adicionar items do NAU
    async addNAUItems() {
      // Adicionar items do NAU
      const carrinho = this.cartNAU.getCart();
      const carrinhoQuantidades = this.cartNAU.getCartQuantities();

      console.log('carrinhoTotal:', carrinho);
      console.log('quantidadeTotal:', carrinhoQuantidades);

      for (let i = 0; i < carrinho.length; i++) {
        console.log('item:', carrinho[i]);
        console.log('quantidade:', carrinhoQuantidades[i]);
        await addCartItem(
          this.userLoggedId,
          carrinho[i].id,
          carrinhoQuantidades[i]
        );
      }
      this.cartNAU.cleanCart();
    },

    // Verificar o login do user
    async checkLogin() {
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
          await this.refreshValues();
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
    await this.checkLogin();
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
