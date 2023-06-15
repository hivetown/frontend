<template>
  <Banner></Banner>

  <div id="categories" class="parent py-3">
    <div class="title d-flex justify-content-between align-items-center mb-5">
      <h3 class="grey-txt">Categorias Populares</h3>
      <!-- <button type="button" class="btn btn-outline-secondary btn-sm">
        Ver todas
      </button> -->
    </div>
    <div class="d-flex cards-mobile">
      <!-- TODO - routes para as categorias -->
      <router-link to="/products">
        <CategoryCard title="Eletrónica" image="categories/tech.png" />
      </router-link>
      <router-link to="/products">
        <CategoryCard title="Arte" image="categories/art.png" />
      </router-link>
      <router-link to="/products">
        <CategoryCard title="Moda" image="categories/clothes.png" />
      </router-link>
      <router-link to="/products">
        <CategoryCard title="Desporto" image="categories/sport.png" />
      </router-link>
      <!-- <CategoryCard title="Animais" image="categories/pets.png" /> -->
      <router-link to="/products">
        <CategoryCard title="Jardim" image="categories/garden.png" />
      </router-link>
      <router-link to="/products">
        <CategoryCard title="Bebé" image="categories/baby.png" />
      </router-link>
      <router-link to="/products">
        <CategoryCard title="Beleza" image="categories/beauty.png" />
      </router-link>
      <router-link to="/products">
        <CategoryCard title="Casa" image="categories/house.png" />
      </router-link>
      <router-link to="/products">
        <CategoryCard title="Livros" image="categories/books.png" />
      </router-link>
    </div>
  </div>

  <div id="products" class="parent py-3">
    <div class="title d-flex justify-content-between align-items-center mb-5">
      <h3 class="grey-txt">Produtos Populares</h3>
      <button type="button" class="btn btn-outline-secondary btn-sm">
        <router-link to="/products">Ver todos</router-link>
      </button>
    </div>
    <div class="d-flex products-list">
      <div v-for="(product, index) in products" :key="index">
        <ProductCard :product-spec="product" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Banner from '@/components/Banner.vue';
import CategoryCard from '@/components/CategoryCard.vue';
import ProductCard from '@/components/ProductCard.vue';
import { ProductSpec } from '@types';
import { fetchProduct } from '@/api';
</script>

<script lang="ts">
export default {
  data() {
    return {
      products: [] as ProductSpec[],
    };
  },

  async beforeMount() {
    for (let i = 1; i < 5; i++) {
      const product = await fetchProduct(i);
      this.products.push(product.data);
    }
  },
};
</script>
<style>
.cards-mobile {
  flex-wrap: nowrap;
  justify-content: space-between;
  gap: 2vh;
}

.products-list {
  justify-content: space-evenly;
  flex-wrap: wrap;
}

.products-list .product {
  max-width: 25vh !important;
}

@media (max-width: 1940px) {
  .cards-mobile {
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
}

@media (max-width: 767px) {
  .cards-mobile {
    gap: 2vh;
  }

  .products-list .product {
    max-width: 15vh !important;
  }
}
</style>
