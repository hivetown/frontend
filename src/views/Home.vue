<template>
  <Banner></Banner>

  <div id="categories" class="parent py-3">
    <div class="title d-flex justify-content-between align-items-center mb-5">
      <h3 class="grey-txt">Categorias Populares</h3>
      <button type="button" class="btn btn-outline-secondary btn-sm">
        Ver todas
      </button>
    </div>
    <div class="d-flex gap-4 justify-content-center">
      <CategoryCard title="Tecnologia" image="categories/tech.png" />
      <CategoryCard title="Arte" image="categories/art.png" />
      <CategoryCard title="Moda" image="categories/clothes.png" />
      <CategoryCard title="Desporto" image="categories/sport.png" />
      <CategoryCard title="Animais" image="categories/pets.png" />
      <CategoryCard title="Tecnologia" image="categories/tech.png" />
      <CategoryCard title="Arte" image="categories/art.png" />
      <CategoryCard title="Moda" image="categories/clothes.png" />
      <CategoryCard title="Desporto" image="categories/sport.png" />
      <CategoryCard title="Animais" image="categories/pets.png" />
    </div>
  </div>

  <div id="products" class="parent py-3">
    <div class="title d-flex justify-content-between align-items-center mb-5">
      <h3 class="grey-txt">Produtos Populares</h3>
      <button type="button" class="btn btn-outline-secondary btn-sm">
        <router-link to="/produtos">Ver todos</router-link>
      </button>
    </div>
    <div class="d-flex justify-content-center" style="gap: 12vh">
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
      <ProductCard></ProductCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import Banner from '@/components/Banner.vue';
import CategoryCard from '@/components/CategoryCard.vue';
import ProductCard from '@/components/ProductCard.vue';
</script>
