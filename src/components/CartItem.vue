<template>
  <div class="d-flex gap-4">
    <!-- Ir para a página do item -->
    <router-link :to="'/products/' + cartItem.producerProduct!.productSpec.id">
      <!-- Imagem do produto -->
      <b-card class="prod-card">
        <img :src="cartItemImageURL" class="square-image" alt="Product image" />
      </b-card>
    </router-link>

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
          <p class="mt-3">{{ cartItem.producerProduct.currentPrice }}€/item</p>
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
import { updateQuantityCartItem, fetchProduct, deleteCartItem } from '@/api';
import { CartItem, Image } from '@/types';
import { PropType, computed } from 'vue';
// N.A.U. - Import
import { CartNAU } from '@/utils/cartItemNAU.js';

export default {
  data() {
    return {
      // Definir quantidade selecionada no carrinho e quantidades possíveis
      selectedValue: this.cartItem.quantity,
      options: this.setupQts(),

      // Detalhes do item
      cartItemPrice: this.priceCalc(),
      cartItemDetails: this.getDetails(),
      cartItemImageURL: 'none',

      // Guardar informações do login
      userLoggedId: 0 as number,
      userLoggedName: '' as string,
      userLoggedNImage: {} as Image,
      userLoggedType: '' as string,

      // N.A.U. - Começar carrinho
      CartNAU: new CartNAU(),
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
      this.cartItemDetails = await fetchProduct(
        this.cartItem.producerProduct!.productSpec.id
      );
      this.cartItemDetails = this.cartItemDetails.data;
      this.cartItemImageURL = this.cartItemDetails.images[0].url;
    },

    // Buscar quantidade do carrinho
    setupQts() {
      this.getLoginInfo();
      const opts: { value: number; text: string }[] = [];
      for (let i = 1; i <= this.cartItem.producerProduct!.stock; i++) {
        const build = { value: i, text: i.toString() };
        opts.push(build);
      }
      return opts;
    },

    // Calcular preço do item
    priceCalc(): number {
      return (
        this.cartItem.producerProduct.currentPrice * this.cartItem.quantity
      );
    },

    // Remover item do carrinho
    async removeCartItem(): Promise<void> {
      try {
        this.getLoginInfo();
        if (confirm('Tem a certeza que quer remover o item do seu carrinho?')) {
          await deleteCartItem(
            this.userLoggedId,
            this.cartItem.producerProduct!.id
          );
          this.$emit('deleteCartItem', this.cartItem.producerProduct!.id);
        } else {
          /* do nothing */
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    },

    // Atualizar quantidade do item
    async updateQnt(): Promise<void> {
      try {
        this.getLoginInfo();
        await updateQuantityCartItem(
          this.userLoggedId,
          this.cartItem.producerProduct!.id,
          this.selectedValue
        );
        this.$emit('updateCartItem');
      } catch (error) {
        if (error instanceof Error) {
          if (error.message === 'Request failed with status code 400') {
          } else {
            console.log(error.message);
          }
        }
      }
    },

    // Buscar Info do Carrinho
    getLoginInfo() {
      const userLoggedId = computed(() => this.$store.state.user);
      if (userLoggedId.value) {
        this.userLoggedId = userLoggedId.value['user']['id'];
        this.userLoggedName = userLoggedId.value['user']['name'];
        this.userLoggedType = userLoggedId.value['user']['type'];
        if (userLoggedId.value['user']['image']) {
          this.userLoggedNImage = userLoggedId.value['user']['image'];
        }
      }
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
