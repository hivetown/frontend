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
          <span>{{ productCategory.name }}</span>
        </div>

        <h5 class="name-prod">{{ productSpec.name }}</h5>
        <p class="grey-txt mt-3 description">{{ productSpec.description }}</p>
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
<style scoped>
.product {
  min-height: 40vh;
}

.description {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.name-prod {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
<script setup lang="ts">
import { fetchProductCategories } from '@/api';
import { Category, ProductSpec } from '@/types';
import { PropType } from 'vue';
</script>

<script lang="ts">
export default {
  data() {
    return {
      isFavorite: false, // Se o produto está nos favoritos
      productCategory: {} as Category, // Categoria do produto
      selectedId: null as number | null, // Id do produto selecionado
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
  },
  async beforeMount() {
    const productCategories = await fetchProductCategories(this.productSpec.id);
    this.productCategory = productCategories.data.items[0];
  },
};
</script>
