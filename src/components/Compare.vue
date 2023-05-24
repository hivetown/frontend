<template>
  <!-- Div principal -->
  <div class="parent mt-3">
    <div class="px-3">
      <h3 class="dgreen-txt">Comparador</h3>
      <p class="grey-txt">A comparar <span>2</span> produtos</p>
    </div>
    <!-- Produtos a comparar -->
    <div class="d-flex mt-5 px-3" style="gap: 20vh">
      <ProductCard
        style="margin-left: 25vh"
        :product-title="productSpec1.name"
        :product-description="productSpec1.description"
        :product-image="product1Img.url"
        :product-id="product1Id"
        :product-price="[productSpec1.minPrice, productSpec1.maxPrice]"
      />
      <ProductCard
        :product-title="productSpec2.name"
        :product-description="productSpec2.description"
        :product-image="product2Img.url"
        :product-id="product2Id"
        :product-price="[productSpec2.minPrice, productSpec2.maxPrice]"
      />
    </div>
    <!-- Características dos produtos a ser comparados -->
    <!-- <div class="spec-to-compare">
      <ProductSpec :fields-totais="fieldsTotais"></ProductSpec>
    </div> -->
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
// import ProductSpec from '@/components/ProductSpec.vue';

// API
import {
  fetchProduct,
  fetchProductCategories,
  fetchProductCategoriesFields,
} from '@/api';
import {
  BaseItems,
  Category,
  ProductSpec,
  ProductSpecField,
  Image,
} from '@/types';
import { defineComponent } from 'vue';
</script>

<script lang="ts">
export default defineComponent({
  data() {
    return {
      // Dados da BD
      productSpec1: {} as ProductSpec,
      productSpec2: {} as ProductSpec,
      product1Img: {} as Image,
      product2Img: {} as Image,
      product1Categories: {} as BaseItems<Category>,
      product2Categories: {} as BaseItems<Category>,
      fields1: [] as [number, ProductSpecField[]][],
      fields2: [] as [number, ProductSpecField[]][],
      categoriasTotais: {} as Record<number, (number | number[])[]>,
      fieldsTotais: {} as Record<number, (number | number[])[]>,
    };
  },
  props: {
    product1Id: {
      type: Number,
      required: true,
    },
    product2Id: {
      type: Number,
      required: true,
    },
  },

  // A fazer antes de montar o componente
  async beforeMount() {
    // console.log("foi recarregado")
    // Carregar os dados do produto 1
    const productSpec1 = await fetchProduct(this.product1Id);
    this.productSpec1 = productSpec1.data;
    this.product1Img = productSpec1.data.images[0];

    const product1Categories = await fetchProductCategories(this.product1Id);
    this.product1Categories = product1Categories.data;

    // Carregar os dados do produto 2
    const productSpec2 = await fetchProduct(this.product2Id);
    this.productSpec2 = productSpec2.data;
    this.product2Img = productSpec2.data.images[0];

    const product2Categories = await fetchProductCategories(this.product2Id);
    this.product2Categories = product2Categories.data;

    // Juntar todas as categorias dos dois produtos
    try {
      // Do produto 1
      for (const categoria of this.product1Categories.items) {
        if (!(categoria.id in this.categoriasTotais)) {
          this.categoriasTotais[categoria.id] = [1];
        } else {
          this.categoriasTotais[categoria.id].push([1]);
        }
        const response = await fetchProductCategoriesFields(
          this.product1Id,
          categoria.id
        );
        this.fields1.push([categoria.id, response.data.items]);
      }
      // Do produto 2
      for (const categoria of this.product2Categories.items) {
        // Junta as categorias dos dois produtos que são iguais
        if (!(categoria.id in this.categoriasTotais)) {
          this.categoriasTotais[categoria.id] = [2];
        } else {
          this.categoriasTotais[categoria.id].push([2]);
        }
        const response = await fetchProductCategoriesFields(
          this.product2Id,
          categoria.id
        );
        this.fields2.push([categoria.id, response.data.items]);
      }
    } catch (error) {
      console.log('Erro: ' + error);
    }

    // Para cada categoria das categorias totais, vê os fields dela por produto
    for (const [cat] of Object.entries(this.categoriasTotais)) {
      for (const field of this.fields1) {
        if (String(field[0]) == cat) {
          if (!(cat in this.fieldsTotais)) {
            this.fieldsTotais[Number(cat)] = [[1], [Number(field[1])]];
          } else {
            Array(this.fieldsTotais[Number(cat)][0]).push(1);
            Array(this.fieldsTotais[Number(cat)][1]).push(Number(field[1]));
          }
        }
      }
      for (const field of this.fields2) {
        if (String(field[0]) == cat) {
          if (!(cat in this.fieldsTotais)) {
            this.fieldsTotais[Number(cat)] = [[2], [Number(field[1])]];
          } else {
            Array(this.fieldsTotais[Number(cat)][0]).push(2);
            Array(this.fieldsTotais[Number(cat)][1]).push(Number(field[1]));
          }
        }
      }
    }
  },
  components: { ProductCard },
});
</script>
