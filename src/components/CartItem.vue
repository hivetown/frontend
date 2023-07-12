<template>
  <div class="d-flex gap-4">
    <!-- Ir para a página do item -->
    <router-link
      :to="'/products/' + (cartItem?.producerProduct?.productSpec?.id ?? '')"
    >
      <!-- Imagem do produto -->
      <b-card style="display: flex; justify-content: center !important">
        <img
          :src="cartItemImageURL"
          style="height: 15vh; border-radius: 0.5em"
          :alt="cartItemImageALT"
        />
      </b-card>
    </router-link>

    <!-- Detalhes do item -->
    <b-card-text
      class="w-100"
      style="background-color: ; display: flex; align-items: center"
    >
      <div
        style="
          background-color: ;
          width: 100%;
          display: flex;
          justify-content: space-between;
        "
      >
        <div>
          <!-- Nome -->
          <div class="d-flex">
            <h5>{{ cartItem.producerProduct.productSpec?.name }}</h5>
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
          </div>

          <!-- Preço do item -->
          <p class="mt-3">
            Preço unitário: {{ cartItem.producerProduct.currentPrice }}€
          </p>
        </div>
        <div
          style="
            background-color: ;
            display: flex;
            align-items: center;
            gap: 5vh;
          "
        >
          <div class="ms-auto mt-3">
            <h4>{{ priceCalc() }}€</h4>
          </div>

          <!-- Remover item do carrinho -->
          <PrimeButton
            @click="showConfirmation"
            severity="danger"
            outlined
            rounded
            title="Remover do carrinho"
            icon="pi pi-trash"
          >
          </PrimeButton>
        </div>
        <b-modal
          v-model="confirmationModal"
          title="Confirmação de Remoção"
          hide-footer
        >
          <p>Tem a certeza que pretende remover o item do carrinho?</p>
          <div class="d-flex justify-content-end gap-2">
            <PrimeButton severity="info" rounded @click="cancelDeletion">
              Cancelar
            </PrimeButton>
            <PrimeButton severity="danger" rounded @click="confirmDeletion">
              Remover
            </PrimeButton>
          </div>
        </b-modal>
      </div>
    </b-card-text>
  </div>
</template>

<script lang="ts">
import { updateQuantityCartItem, deleteCartItem } from '@/api';
import { CartItem, Image } from '@/types';
import { PropType, computed } from 'vue';
import PrimeButton from 'primevue/button';
// N.A.U. - Import
import { CartNAU } from '@/utils/cartItemNAU';

export default {
  emits: ['delete-cart-item', 'update-cart-item'],
  data() {
    return {
      // Definir quantidade selecionada no carrinho e quantidades possíveis
      selectedValue: this.cartItem.quantity,
      options: this.setupQts(),

      // Detalhes do item
      cartItemPrice: this.priceCalc(),
      cartItemImageURL: 'Imagem do Produto',
      cartItemImageALT: 'Descrição do Produto',

      // Guardar informações do login
      userLoggedId: 0 as number,
      userLoggedName: '' as string,
      userLoggedNImage: {} as Image,
      userLoggedType: '' as string,

      // N.A.U. - Começar carrinho
      CartNAU: new CartNAU(),

      // Botão de confirmação
      confirmationModal: false,
    };
  },

  props: {
    // Isto são coisas que se recebe do componente pai
    cartItem: {
      type: Object as PropType<CartItem>,
      required: true,
    },
  },
  components: {
    PrimeButton,
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
      if (this.cartItem.producerProduct!.productSpec !== undefined) {
        this.cartItemImageURL =
          this.cartItem.producerProduct.productSpec.images[0].url;
        this.cartItemImageALT =
          this.cartItem.producerProduct.productSpec.images[0].alt;
      }
    },

    // Buscar quantidade do carrinho
    setupQts() {
      const opts: { value: number; text: string }[] = [];
      for (let y = 1; y <= this.cartItem.producerProduct.stock; y++) {
        const build = { value: y, text: y.toString() };
        opts.push(build);
      }
      this.options = opts;
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
        await deleteCartItem(
          this.userLoggedId,
          this.cartItem.producerProduct!.id
        );
        this.updateQnt();
        this.$emit('delete-cart-item', this.cartItem.producerProduct!.id);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    },

    // Atualizar quantidade do item
    async updateQnt(): Promise<void> {
      await updateQuantityCartItem(
        this.userLoggedId,
        this.cartItem.producerProduct!.id,
        this.selectedValue
      );
      this.$emit('update-cart-item');
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
  async beforeMount() {
    this.getLoginInfo();
    this.getDetails();
  },
};
</script>

<style scoped>
.square-image {
  width: 50%;
  height: 50%;
}
</style>
