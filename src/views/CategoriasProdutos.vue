<template>
  <div class="parent mb-4">
    <b-breadcrumb>
      <b-breadcrumb-item href="#home">
        <b-icon
          icon="house-fill"
          scale="1.25"
          shift-v="1.25"
          aria-hidden="true"
        ></b-icon>
        Home
      </b-breadcrumb-item>
      <b-breadcrumb-item href="#foo">Foo</b-breadcrumb-item>
      <b-breadcrumb-item href="#bar">Bar</b-breadcrumb-item>
      <b-breadcrumb-item active>Baz</b-breadcrumb-item>
    </b-breadcrumb>
  </div>

  <div class="d-flex parent">
    <div class="lat-bar" style="width: 20%">
      <div id="filters">
        <div>
          <h5 class="grey-txt">Categorias</h5>
          <CategoryFilter></CategoryFilter>
        </div>
        <div>
          <h5 class="grey-txt mt-3">Preço</h5>
          <PriceFilter></PriceFilter>
        </div>
        <div>
          <h5 class="grey-txt mt-3">Fornecedor</h5>
          <SupplierFilter></SupplierFilter>
        </div>
        <div class="mt-4" style="border-top: 1px solid #f3f3f3">
          <h5 class="grey-txt mt-3">Avaliação</h5>
          <RatingFilter></RatingFilter>
        </div>
      </div>
    </div>

    <div class="" style="width: 100%">
      <!-- TODO trocar para a categoria escolhida -->
      <h3 class="parent dgreen-txt">Portáteis</h3>
      <CustomViews></CustomViews>
      <div>
        <!-- TODO por isto automático -->
        <div class="parent d-flex justify-content-center gap-8 mt-5">
          <ProductCard></ProductCard>
          <ProductCard></ProductCard>
          <ProductCard></ProductCard>
          <ProductCard></ProductCard>
        </div>
        <div class="parent d-flex justify-content-center gap-8 mt-5">
          <ProductCard></ProductCard>
          <ProductCard></ProductCard>
          <ProductCard></ProductCard>
          <ProductCard></ProductCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CategoryFilter from "@/components/CategoryFilter.vue";
import PriceFilter from "@/components/PriceFilter.vue";
import SupplierFilter from "@/components/SupplierFilter.vue";
import RatingFilter from "@/components/RatingFilter.vue";
import CustomViews from "@/components/CustomViews.vue";

import ProductCard from "@/components/ProductCard.vue";
import { onMounted, ref, watch } from "vue";
import { fetchAllProducts } from "@/api";
import { Product } from "@/types/interfaces";

const products = ref<Product[]>([]);

const fetchProducts = async (search?: string) => {
  products.value = await fetchAllProducts(search).then((ps) => ps.data);
};

onMounted(fetchProducts);

const search = ref("");
watch(search, fetchProducts);
</script>
