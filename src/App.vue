<template>
  <NavbarVue />

  <div
    class="m-3 py-1 px-5 border-round border-solid border-gray-300 bg-gray-200"
  >
    <div class="my-4">
      <h1 class="text-4xl m-0">Products</h1>
      <span class="p-input-icon-right">
        <i class="pi pi-search" />
        <InputText type="text" v-model="search" placeholder="Search" />
      </span>
    </div>

    <ProductcListVue :products="products" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import InputText from "primevue/inputtext";
import { fetchAllProducts } from "./api";
import NavbarVue from "./components/Navbar.vue";
import ProductcListVue from "./components/ProductList.vue";
import { Product } from "./types/interfaces";

const products = ref<Product[]>([]);

const fetchProducts = async (search?: string) => {
  products.value = await fetchAllProducts(search).then((ps) => ps.data);
};

onMounted(fetchProducts);

const search = ref("");
watch(search, fetchProducts);
</script>
