<template>
  <div>
    <span class="p-float-label p-input-icon-right">
      <PrimeInputText
        id="productSearch"
        v-model="searchQuery"
        :minlength="3"
        :class="{
          'p-invalid': !isQueryValid,
        }"
      />
      <label for="productSearch">Produto a adicionar</label>

      <small v-if="!isQueryValid"
        >Insira pelo menos 3 caracteres para pesquisar um produto</small
      >

      <i v-if="searching" class="pi pi-spin pi-spinner"></i>
    </span>

    <div class="grid justify-content-center gap-3">
      <ProductCard
        v-for="product in products.items"
        :key="product.id"
        :product="product"
        class="col-6 md:col-3 lg:col-2"
      ></ProductCard>
    </div>
  </div>
</template>

<script lang="ts">
import { fetchAllProducts } from '@/api';
import PrimeInputText from 'primevue/inputtext';
import { computed, ref, watch } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import { useRouter } from 'vue-router';
import { BaseItems, ProductSpecification } from '@types';
import { useRoute } from 'vue-router';
import ProductCard from '@/components/ProductCard.vue';

export default {
  name: 'CreateProduct',
  components: {
    PrimeInputText,
    ProductCard,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const searchQuery = ref((route.query.search as string) || '');
    const searching = ref(false);
    const products = ref({} as BaseItems<ProductSpecification>);

    const fetchProducts = useDebounceFn(async () => {
      console.log('fetching', searchQuery.value, isQueryValid.value);
      if (!isQueryValid.value) return;

      const { data } = await fetchAllProducts(searchQuery.value);
      products.value = data;
      router.push({ query: { search: searchQuery.value } });
    }, 1000);

    watch(searchQuery, async () => {
      console.log('searching', searchQuery.value);
      searching.value = true;
      await fetchProducts().finally(() => (searching.value = false));
    });

    const isQueryValid = computed(() => {
      return searchQuery.value && searchQuery.value.length >= 3;
    });

    fetchProducts();

    return {
      searchQuery,
      fetchProducts,
      searching,
      isQueryValid,
      products,
    };
  },
};
</script>
