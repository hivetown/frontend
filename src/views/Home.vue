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
        <CategoryCard
          title="Eletrónica"
          :image="{
            url: 'categories/tech.png',
            alt: 'Eletrónica',
            name: 'Eletrónica',
          }"
        />
      </router-link>
      <router-link to="/products">
        <CategoryCard
          title="Arte"
          :image="{ url: 'categories/art.png', alt: 'Arte', name: 'Arte' }"
        />
      </router-link>
      <router-link to="/products">
        <CategoryCard
          title="Moda"
          :image="{ url: 'categories/clothes.png', alt: 'Moda', name: 'Moda' }"
        />
      </router-link>
      <router-link to="/products">
        <CategoryCard
          title="Desporto"
          :image="{
            url: 'categories/sport.png',
            alt: 'Desporto',
            name: 'Desporto',
          }"
        />
      </router-link>
      <!-- <CategoryCard title="Animais" image="categories/pets.png" /> -->
      <router-link to="/products">
        <CategoryCard
          title="Jardim"
          :image="{
            url: 'categories/garden.png',
            alt: 'Jardim',
            name: 'Jardim',
          }"
        />
      </router-link>
      <router-link to="/products">
        <CategoryCard
          title="Bebé"
          :image="{
            url: 'categories/baby.png',
            alt: 'Bebé',
            name: 'Bebé',
          }"
        />
      </router-link>
      <router-link to="/products">
        <CategoryCard
          title="Beleza"
          :image="{
            url: 'categories/beauty.png',
            alt: 'Beleza',
            name: 'Beleza',
          }"
        />
      </router-link>
      <router-link to="/products">
        <CategoryCard
          title="Casa"
          :image="{
            url: 'categories/house.png',
            alt: 'Casa',
            name: 'Casa',
          }"
        />
      </router-link>
      <router-link to="/products">
        <CategoryCard
          title="Livros"
          :image="{
            url: 'categories/books.png',
            alt: 'Livros',
            name: 'Livros',
          }"
        />
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
    <div
      :class="{
        flex: true,
        'flex-wrap': true,
        'gap-3': true,
        'justify-content-center': true,
      }"
    >
      <Loader v-if="loadingPopularProducts || !popularProducts" />
      <div
        class="flex flex-none w-full sm:w-6 md:w-4 lg:w-3 xl:w-2"
        v-else
        v-for="(product, index) in popularProducts.items.slice(0, 10)"
        :key="index"
      >
        <ProductCard :product-spec="product" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Banner from '@/components/Banner.vue';
import CategoryCard from '@/components/CategoryCard.vue';
import ProductCard from '@/components/ProductCard.vue';
import Loader from '@/components/Loader.vue';
import { BaseItems, ProductSpec } from '@/types';
import { fetchAllProducts } from '@/api';

export default {
  components: {
    Banner,
    CategoryCard,
    ProductCard,
    Loader,
  },
  data() {
    return {
      popularProducts: {} as BaseItems<ProductSpec>,
      loadingPopularProducts: true,
    };
  },
  methods: {
    async loadPopularProducts() {
      this.loadingPopularProducts = true;

      try {
        this.popularProducts = (
          await fetchAllProducts({
            orderBy: 'popularityDesc',
            pageSize: 12,
          })
        ).data;
      } finally {
        this.loadingPopularProducts = false;
      }
    },
  },
  async beforeMount() {
    this.loadPopularProducts();
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
