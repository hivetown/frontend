<template>
  <div>
    <!-- <b-card
        v-for="(product, index) in products"
        :key="index"
        :title="product.name"
        :img-src="product.imageUrl"
      >
        <p class="card-text">{{ product.description }}</p>
        <p class="card-text">{{ product.price }}</p>
      </b-card> -->
    <b-card v-for="(product, index) in products" :key="index"> </b-card>
  </div>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue';
import { fetchAllProducts } from '@/api/products';
import { Product } from '@/types/interfaces';

export default {
  name: 'ProductList',
  components: {},
  setup() {
    const products = ref<Product[]>([]);

    const fetchProducts = async () => {
      const response = await fetchAllProducts();
      products.value = response.data;
    };

    onMounted(fetchProducts);

    return { products };
  },
};
</script>
