<template>
  <div class="producer-products">
    <h2>{{ producerName }}'s Products</h2>
    <div class="product-list">
      <div v-for="product in products" :key="product.id" class="product-item">
        <b-card>
          <!-- Product Image -->
          <router-link :to="'/products/' + product.id">
            <img :src="product.image" class="product-image" />
          </router-link>
          <!-- Product Info -->
          <div class="product-info">
            <router-link :to="'/products/' + product.id">
              <h3>class="product-title">{{ product.title }}</h3>
            </router-link>
            <p class="product-description">{{ product.description }}</p>
            <p class="product-price">{{ product.price }}</p>
            <div class="product-actions">
              <button class="btn btn-primary">Edit</button>
              <button class="btn btn-danger">Delete</button>
            </div>
          </div>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { Product } from '@/types/Product';
import { fetchAllProducts } from '@/api/producerProducts';
import { fetchAuth } from '../api/auth';
export default defineComponent({
  setup() {
    const products = ref<Product[]>([]);

    onMounted(async () => {
      try {
        const authArray = await fetchAuth();
        const { id } = authArray.data;
        console.log('Producer ID:', id);
        products.value = await fetchAllProducts(id);
      } catch (error) {
        console.error(error);
      }
    });

    return {
      products,
    };
  },
});
</script>

<style scoped>
/* Add custom styles here */
</style>

<!-- <template>
  <div>
    <h1>{{ producerName }} Products</h1>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { fetchAllProducts } from '@/api/producerProducts';
import { Product } from '../types/interfaces/Product';
import { fetchAuth } from '../api/auth';

export default defineComponent({
  props: {
    producerId: {
      type: Number,
      required: true,
    },
    producerName: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const products = ref<Product[]>([])
    const producerId = ref<number>(props.producerId)
    const producerName = ref<string>(props.producerName)

    onMounted(async () => {
      try {
        const authArray = await fetchAuth();
        const { id } = authArray.data;
        producerId.value = id;
        products.value = await fetchAllProducts(producerId.value)
      } catch (error) {
        console.error(error)
      }
    })

    return {
      producerId,
      producerName,
      products,
    }
  },
})
</script> -->
