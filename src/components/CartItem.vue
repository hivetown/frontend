<template>
  <div class="d-flex gap-4">
    <router-link :to="'/products/' + cartItem.producerProduct!.id">
      <b-card class="prod-card">
        <!-- <img src="https://placehold.jp/150x150.png" class="square-image"> -->
        <img :src="cartItemImageURL" class="square-image" alt="Product image" />
      </b-card>
    </router-link>
    <b-card-text class="w-100">
      <div style="margin-top: 45px">
        <!--<p>{{cartItem}}</p>-->

        <div class="d-flex">
          <h5>{{ cartItemDetails.name }}</h5>
        </div>

        <div class="d-flex gap-2">
          <p class="mt-3">Quantidade:</p>
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
          <p class="mt-3">{{ cartItem.producerProduct!.currentPrice }}€/item</p>
          <div class="d-flex ms-auto mt-3 justify-content-end">
            <h4>{{ priceCalc() }}€</h4>
          </div>
          <!-- O <p> seguinte apenas é adicionado quando o item tem outro preço e está agor em promoção -->

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
</template>

<script lang="ts">
import { CartItem, Image } from '@/types';
import { PropType, computed } from 'vue';
import { deleteCartItem } from '@/api'; //'@/api' vai buscar ao src/api/index.ts que por sua vez vai ao src/api/consumers.ts
import { updateQuantityCartItem, fetchProduct } from '@/api';
import { CartNAU, CartItemNAU } from '@/utils/cartItemNAU.js';

// --------------------------

export default {
  data() {
    return {
      selectedValue: this.cartItem.quantity,
      selectedValueBackup: this.selectedValue,
      options: this.setupQts(),
      cartItemPrice: this.priceCalc(),
      cartItemDetails: this.getDetails(),
      cartItemImageURL: 'none',

      userLoggedId: 0 as number,
      userLoggedName: '' as string,
      userLoggedNImage: {} as Image,
      userLoggedType: '' as string,

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
    itemAddedNAU(idToAdd: number, quantity: number) {
      this.CartNAU.buildCartNonAut(new CartItemNAU(idToAdd, quantity));
      console.log(this.CartNAU);
    },

    async getDetails() {
      this.cartItemDetails = await fetchProduct(
        this.cartItem.producerProduct!.id
      );
      this.cartItemDetails = this.cartItemDetails.data;
      this.cartItemImageURL = this.cartItemDetails.images[0].url;
    },

    setupQts() {
      this.getLoginInfo();
      const opts: { value: number; text: string }[] = [];
      for (let i = 1; i < this.cartItem.producerProduct!.stock; i++) {
        const build = { value: i, text: i.toString() };
        opts.push(build);
      }
      return opts;
    },

    priceCalc(): number {
      return (
        this.cartItem.producerProduct!.currentPrice * this.cartItem.quantity
      );
    },

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

    async updateQnt(): Promise<void> {
      console.log('cartItem', this.cartItem);
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
            console.log('Produto fora de stock');
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
      console.log(this.userLoggedId);
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
