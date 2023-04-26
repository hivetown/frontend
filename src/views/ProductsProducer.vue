<template>
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
</script>
