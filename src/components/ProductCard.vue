<template>
  <div class="mb-5 product">
    <!-- Imagem do produto -->
    <b-card class="prod-card">
      <span class="position-absolute fav">
        <i
          :class="[isFavorite ? 'bi-heart-fill' : 'bi-heart']"
          @click="isFavorite = !isFavorite"
        >
        </i>
      </span>
      <router-link :to="'/products/' + productSpec.id">
        <img
          :src="productImage.url"
          :alt="productImage.alt"
          class="square-image"
        />
      </router-link>
    </b-card>

    <!-- Informação do produto -->
    <b-card-text>
      <div>
        <!-- Categoria -->
        <!-- <div class="rounded-pill text-center mt-3 mb-3 w-50 prod-category">{{ productCategory.name}}</div> -->
        <div
          v-if="productCategory && productCategory.name"
          class="rounded-pill text-center mt-3 mb-3 w-50 prod-category"
        >
          {{ productCategory.name }}
        </div>

        <h5>{{ productSpec.name }}</h5>
        <p class="grey-txt mt-3">{{ productSpec.description }}</p>
        <div class="d-flex gap-2">
          <h4 class="mb-3">
            {{ productPricing }}
          </h4>
          <!-- TODO, fazer com que seja  -->
          <!-- <p class="mt-1 grey-txt text-decoration-line-through">1025€</p> -->
        </div>

        <!-- Botões -->
        <div class="d-flex gap-2 buttons">
          <button
            @click="itemAdded(productSpec.id)"
            type="button"
            class="btn btn-outline-secondary circle-btn"
            v-b-tooltip.hover
            title="Adicionar ao carrinho"
          >
            <i class="bi bi-cart"></i>
          </button>

          <router-link :to="'/products/' + productSpec.id">
            <button
              type="button"
              class="btn btn-outline-secondary circle-btn"
              v-b-tooltip.hover
              title="Ver produto"
            >
              <i class="bi bi-eye"></i>
            </button>
          </router-link>
          <button
            type="button"
            class="btn btn-outline-secondary circle-btn"
            v-b-tooltip.hover
            title="Comparar produto"
            :disabled="!canCompare"
            @click="setupCompare()"
          >
            <i class="bi bi-arrow-left-right"></i>
          </button>
          <!-- <button @click="sendId">Enviar ID</button> -->
        </div>
      </div>
    </b-card-text>
  </div>
</template>

<style>
.product {
  max-width: 18%;
}

.prod-card {
  background-color: #f3f3f3 !important;
  border-radius: 1.3em !important;
  cursor: pointer;
}

.prod-card .card-body {
  padding: 0 !important;
}

.square-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ajusta a imagem para preencher todo o espaço disponível */
  border-radius: 1.3em !important;
}

.fav {
  right: 4%;
  top: 4%;
  width: 3vh;
  height: 3vh;
  background-color: #f3f3f3;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fav i {
  color: #dc6942;
  cursor: pointer;
}

.prod-category {
  background-color: #9dc88d;
  /* A cor irá variar de acordo com a categoria */
  cursor: pointer;
}
</style>

<script setup lang="ts">
import { fetchProductCategories } from '@/api';
import { Category, ProductSpec, Image } from '@/types';
import { PropType, computed } from 'vue';
import { addCartItem } from '../api/consumers';
</script>

<script lang="ts">
export default {
  data() {
    return {
      isFavorite: false, // Se o produto está nos favoritos
      productCategory: {} as Category, // Categoria do produto
      selectedId: null as number | null, // Id do produto selecionado

      userLoggedId: 0 as number,
      userLoggedName: '' as string,
      userLoggedNImage: {} as Image,
      userLoggedType: '' as string,
    };
  },
  computed: {
    productImage() {
      return this.productSpec.images[0];
    },
    productPricing() {
      const { minPrice, maxPrice } = this.productSpec;
      if (minPrice === maxPrice) {
        if (minPrice === 0) return 'Grátis';

        return `${minPrice} €`;
      }

      return `${minPrice} € - ${maxPrice} €`;
    },
  },
  props: {
    productSpec: {
      type: Object as PropType<ProductSpec>,
      required: true,
    },
    canCompare: {
      type: Boolean,
      default: true,
    },
  },
  emits: {
    // eslint-disable-next-line no-unused-vars
    compare: (productSpec: ProductSpec) => true,
  },
  methods: {
    setupCompare() {
      this.$emit('compare', this.productSpec);
    },

    // Adicionar Items ao carrinho -----
    async itemAdded(idToAdd: number) {
      if (this.userLoggedId === undefined) {
        const itemInfo = await fetchProduct(idToAdd);
        const itemInfo2 = await fetchProducerProducts(idToAdd);

        console.log('info', itemInfo);
        console.log('info2', itemInfo2);

        console.log();
      } else {
        console.log('productSpec', this.productSpec);
        this.getLoginInfo();
        console.log(idToAdd);
        await addCartItem(this.userLoggedId, idToAdd, 1);
      }
    },

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

  // /--------------------------------

  async beforeMount() {
    const productCategories = await fetchProductCategories(this.productSpec.id);
    this.productCategory = productCategories.data.items[0];
  },
};
</script>
