<template>
  <!-- Div principal -->
  <div class="parent mt-3">
    <div class="px-3">
      <h3 class="dgreen-txt">Comparador</h3>
      <p class="grey-txt">
        A comparar <span>{{ products.length }}</span> produtos
      </p>
    </div>
    <!-- Produtos a comparar -->
    <div class="d-flex mt-5 justify-content-end" style="gap: 10%">
      <ProductCard
        style="width: 30%"
        v-for="product in products"
        :key="product.id"
        :product-spec="product"
      />
    </div>
    <!-- Características dos produtos a ser comparados -->
    <div class="spec-to-compare">
      <ProductSpec
        :loading="loadingProductsFields"
        :products-fields="productsFields"
      ></ProductSpec>
    </div>
  </div>
</template>

<style>
.spec-category-text {
  height: 5vh;
  background-color: #f3f3f3;
}
</style>

<script setup lang="ts">
// Componentes
import ProductCard from '@/components/ProductCard.vue';
import ProductSpec from '@/components/ProductSpec.vue';

// API
import { fetchProductCategories, fetchProductCategoriesFields } from '@/api';
import {
  Category,
  ProductSpecFieldWithCategory,
  ProductSpec as Specification,
} from '@/types';
import { PropType, defineComponent } from 'vue';
</script>

<script lang="ts">
export default defineComponent({
  data() {
    return {
      // Dados da BD
      productsCategories: [] as Category[][],
      productsFields: [] as Record<number, ProductSpecFieldWithCategory>,
      loadingProductsFields: false,
    };
  },
  props: {
    products: {
      type: Object as PropType<Specification[]>,
      required: true,
    },
  },

  // A fazer antes de montar o componente
  async beforeMount() {
    this.loadingProductsFields = true;

    for (const product of this.products) {
      this.productsCategories.push(
        (await fetchProductCategories(product.id)).data.items
      );
    }

    // Juntar todas as categorias dos dois produtos
    // Para cada produto
    for (let idx = 0; idx < this.products.length; idx++) {
      const product = this.products[idx];

      // Para cada categoria
      for (const categoria of this.productsCategories[idx]) {
        const fields = await fetchProductCategoriesFields(
          product.id,
          categoria.id
        );

        // Fill the array with the amount of products
        if (!this.productsFields[categoria.id])
          this.productsFields[categoria.id] = {
            category: categoria,
            products: Array(this.products.length).fill(null).map(Object),
          };

        // Os vários fields da categoria dum produto
        this.productsFields[categoria.id].products[idx] = {
          fieldValues: fields.data.items,
        };
      }
    }

    this.loadingProductsFields = false;
  },
  components: { ProductCard },
});
</script>
