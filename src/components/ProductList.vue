<template>
  <div class="grid justify-content-center">
    <div
      class="col-12 sm:col-6 lg:col-4 xl:col-3"
      v-for="product in products"
      :key="product.id"
    >
      <div class="item">
        <ProductCardVue :product="product" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductCardVue from './ProductCard_old.vue';
import { Product } from '../types/interfaces';

const props = defineProps<{ products: Product[] }>();
</script>
