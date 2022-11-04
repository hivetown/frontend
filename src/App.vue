<template>
  <div class="m-3 py-1 px-5 border-round bg-gray-100">
    <div class="my-4">
      <h1 class="text-4xl my-1 p-component">
        Products
        <span class="text-xs">{{ products.length }} products</span>
      </h1>
      <span class="p-input-icon-right">
        <i class="pi pi-search" />
        <InputText type="text" v-model="search" placeholder="Search" />
      </span>
    </div>

    <ProductListVue :products="products" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import InputText from "primevue/inputtext";
import { fetchAllProducts } from "./api";
import ProductListVue from "./components/ProductList.vue";
import { Product } from "./types/interfaces";

const products = ref<Product[]>([]);

const fetchProducts = async (search?: string) => {
  products.value = await fetchAllProducts(search).then((ps) => ps.data);
};

onMounted(fetchProducts);

const search = ref("");
watch(search, fetchProducts);
</script>
