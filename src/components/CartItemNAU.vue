CartItemNAU
<template>
  <div class="d-flex gap-4">
    <!-- Ir para a página do item -->
    <div v-if="login">
      <router-link :to="'/products/' + cartItem.producerProduct.productSpec.id">
        <!-- Imagem do produto -->
        <b-card class="prod-card">
          <img
            :src="cartItemImageURL"
            class="square-image"
            alt="Product image"
          />
        </b-card>
      </router-link>
    </div>
    <div v-else>
      <router-link :to="'/products/' + cartItem.id">
        <!-- Imagem do produto -->
        <b-card class="prod-card">
          <img
            :src="cartItemImageURL"
            class="square-image"
            alt="Product image"
          />
        </b-card>
      </router-link>
    </div>
    <!-- Detalhes do item -->
    <b-card-text class="w-100">
      <div style="margin-top: 45px">
        <!-- Nome -->
        <div class="d-flex">
          <h5>{{ cartItemDetails.name }}</h5>
        </div>

        <!-- Quantidade -->
        <div class="d-flex gap-2">
          <p class="mt-3">Quantidade:</p>
          <!-- Botão para selecionar quantidade do item -->
          <div class="d-flex" style="margin-top: -10px">
            <b-col col lg="20">
              <b-form-select
                v-model="selectedValue"
                :options="options"
                size="sm"
                class="mt-3"
                @input="updateQnt"
              ></b-form-select>
            </b-col>
          </div>
          <!-- Preço do item -->
          <p class="mt-3">TODO€/item</p>
          <div class="d-flex ms-auto mt-3 justify-content-end">
            <h4>{{ priceCalc() }}€</h4>
          </div>
          <!-- Remover item do carrinho -->
          <div class="d-flex ms-auto justify-content-end">
            <button
              @click="removeCartItem"
              variant="danger"
              type="button"
              class="btn btn-outline-secondary circle-btn"
              title="Remover do carrinho"
            >
              <i class="bi bi-x-lg"></i>
            </button>
          </div>
        </div>
      </div>
    </b-card-text>
  </div>

  <!-- N.A.U. ZONA DE TESTE -->

  <button
    @click="itemAddNAU(cartItem)"
    type="button"
    class="btn btn-outline-secondary circle-btn"
    title="N.A.U. add item botão teste"
  >
    <i class="bi bi-x-lg"></i>
  </button>

  <button
    @click="excludecache"
    type="button"
    class="btn btn-outline-secondary circle-btn"
    title="N.A.U. apagar cache botão teste"
  >
    <i class="bi bi-x-lg"></i>
  </button>

  <!-- N.A.U. FIZ ZONA TESTE-->
</template>

<script lang="ts">
import { fetchProduct, deleteCartItem } from '@/api';
import { CartItem, Image } from '@/types';
import { PropType } from 'vue';
// N.A.U. - Import
import { CartNAU } from '@/utils/cartItemNAU.js';

export default {
  data() {
    return {
      // Verificador de login para o checkLogin()
      login: false,

      // Definir quantidade selecionada no carrinho e quantidades possíveis
      selectedValue: 0,
      options: this.setupQts(),

      // Detalhes do item
      cartItemPrice: this.priceCalc(),
      cartItemDetails: this.getDetails(),
      cartItemImageURL: 'none',
      cartItemStock: 1,

      // N.A.U. - Começar carrinho
      cartNAU: new CartNAU(),
    };
  },

  props: {
    // Isto são coisas que se recebe do componente pai
    cartItem: {
      type: Object as PropType<CartItem>,
      required: true,
    },
  },

  methods: {
    // ------------------ N.A.U. ------------------
    // N.A.U. - Adicionar item ao carrinho
    // Exemplo para CartItem.vue itemAddNAU(this.cartItem)
    itemAddNAU(cartItem: CartItem) {
      this.CartNAU.addItem(cartItem);
    },

    // N.A.U. - APAGAR CART - TEMPORÁRIO
    excludecache() {
      this.CartNAU.cleanCart();
    },
    // --------------------------------------------

    // Buscar detalhes do item (descrição, imagem)
    async getDetails() {
      await this.checkLogin();
      this.setupQts();
      this.cartItemDetails = await fetchProduct(this.cartItem.id);
      console.log('detalhes', this.cartItemDetails);
      this.cartItemDetails = this.cartItemDetails.data;
      this.cartItemImageURL = this.cartItemDetails.images[0].url;

      this.getCartNAU();
      const cartInCartNAU = this.cartNAU.getCart();
      this.selectedValue = cartInCartNAU[this.findIndex()].quantity;
    },

    // BUSCAR COISAS A LOCALSTORAGE
    getCartNAU() {
      const cartNAUInstance = new CartNAU();

      this.cartNAU = cartNAUInstance;
    },

    // Buscar quantidade do carrinho
    setupQts() {
      this.getCartNAU();
      const cartInCartNAU = this.cartNAU.getCart();
      const opts: { value: number; text: string }[] = [];

      const i = this.findIndex();
      if (i !== undefined) {
        for (let y = 1; y <= cartInCartNAU[i].producerProduct.stock; y++) {
          const build = { value: y, text: y.toString() };
          opts.push(build);
          console.log('testeeee');
        }
      }
      this.options = opts;
      return opts;
    },

    // Atualizar quantidade do item
    updateQnt(newQnt: number) {
      console.log('encontrou');
      this.cartNAU.changeQuantity(this.cartItem, newQnt);
      this.$emit('updateCartItem');
      console.log('correu)');
    },

    findIndex() {
      this.getCartNAU();
      const cartInCartNAU = this.cartNAU.getCart();
      for (let i = 1; i < this.cartNAU.getCart().length; i++) {
        if (
          cartInCartNAU[i].producerProduct.productSpec.id === this.cartItem.id
        ) {
          return i;
        }
      }
    },

    // Calcular preço do item
    priceCalc() {
      this.getCartNAU();
      const cartInCartNAU = this.cartNAU.getCart();
      const i = this.findIndex();
      if (i !== undefined) {
        console.log('ass', cartInCartNAU[i].producerProduct.stock);
        return (
          cartInCartNAU[i].producerProduct.currentPrice *
          cartInCartNAU[i].quantity
        );
      }
      return 0;
    },

    // Remover item do carrinho
    async removeCartItem(): Promise<void> {
      try {
        this.getCartNAU();
        const i = this.findIndex();
        if (confirm('Tem a certeza que quer remover o item do seu carrinho?')) {
          this.cartNAU.removeItem(this.cartItem);
          this.$emit('deleteCartItem', this.cartItem.id);
        } else {
          /* do nothing */
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    },

    // Verificar o login do user
    checkLogin() {
      return false;
    },
  },
};
</script>

<style>
.square-image {
  width: 50%;
  height: 50%;
}
</style>
