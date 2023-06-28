<template>
  <div class="d-flex gap-4">
    <!-- Ir para a página do item -->
    <router-link :to="'/products/' + cartItem.productSpec">
      <!-- Imagem do produto -->
      <b-card class="prod-card">
        <img
          :src="cartItemImageURL"
          class="square-image"
          :alt="cartItemImageALT"
        />
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
          <p class="mt-3">{{ cartItem.currentPrice }}€/item</p>
          <div class="d-flex ms-auto mt-3 justify-content-end">
            <h4>{{ priceCalc() }}€</h4>
          </div>
          <!-- Remover item do carrinho -->
          <div class="d-flex ms-auto justify-content-end">
            <button
              @click="showConfirmation"
              variant="danger"
              type="button"
              class="btn btn-outline-secondary circle-btn"
              title="Remover do carrinho"
            >
              <i class="bi bi-x-lg"></i>
            </button>
            <b-modal
              v-model="confirmationModal"
              title="Confirmação de Remoção"
              hide-footer
            >
              <p>Tem a certeza que pretende remover o item do carrinho?</p>
              <div class="d-flex justify-content-end">
                <button class="btn btn-secondary mr-2" @click="cancelDeletion">
                  Cancelar
                </button>
                <button class="btn btn-danger" @click="confirmDeletion">
                  Remover
                </button>
              </div>
            </b-modal>
          </div>
        </div>
      </div>
    </b-card-text>
  </div>
  <!-- N.A.U. FIZ ZONA TESTE-->
</template>

<script lang="ts">
import { fetchProduct } from '@/api';
import { PropType } from 'vue';
// N.A.U. - Import
import { CartNAU } from '@/utils/cartItemNAU';
import { ProducerProduct } from '@/types';

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
      cartItemImageURL: 'Imagem do Produto',
      cartItemImageALT: 'Descrição do Produto',
      cartItemStock: 1,

      // N.A.U. - Começar carrinho
      cartNAU: new CartNAU(),

      // Botão de confirmação
      confirmationModal: false,
    };
  },

  props: {
    // Isto são coisas que se recebe do componente pai
    cartItem: {
      type: Object as PropType<ProducerProduct>,
      required: true,
    },
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
      this.removeCartItem();
      this.confirmationModal = false;
    },

    // Buscar detalhes do item (descrição, imagem)
    async getDetails() {
      await this.checkLogin();
      this.setupQts();

      this.cartItemDetails = await fetchProduct(
        Number(this.cartItem.productSpec)
      );
      this.cartItemDetails = this.cartItemDetails.data;
      this.cartItemImageURL = this.cartItemDetails.images[0].url;
      this.cartItemImageALT = this.cartItemDetails.images[0].alt;

      this.getCartNAU();
      this.cartNAU.getCart();
      this.selectedValue = this.cartNAU.getQuantity(this.cartItem);
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
        for (let y = 1; y <= cartInCartNAU[i].stock; y++) {
          const build = { value: y, text: y.toString() };
          opts.push(build);
        }
      }
      this.options = opts;
      return opts;
    },

    // Atualizar quantidade do item
    updateQnt(newQnt: number) {
      this.cartNAU.changeQuantity(this.cartItem, newQnt);
      this.$emit('updateCartItem');
    },

    // Encontrar indice na local storage do item
    findIndex() {
      this.getCartNAU();
      const cartInCartNAU = this.cartNAU.getCart();
      for (let i = 0; i < this.cartNAU.getCart().length; i++) {
        if (cartInCartNAU[i].id === this.cartItem.id) {
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
        return (
          cartInCartNAU[i].currentPrice *
          this.cartNAU.getQuantity(this.cartItem)
        );
      }
      return 0;
    },

    // Remover item do carrinho
    async removeCartItem(): Promise<void> {
      try {
        this.getCartNAU();
        this.cartNAU.removeItem(this.cartItem);
        this.$emit('deleteCartItem', this.cartItem.id);
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

    async beforeMount() {
      this.getCartNAU();
      this.getDetails;
    },
  },
};
</script>

<style scoped>
.square-image {
  width: 50%;
  height: 50%;
}
</style>
