<template>
  <div class="container">
    <h1 class="mb-5">Produtos da UP: {{ unitName }}</h1>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      <template
        v-if="
          unitProducts && unitProducts.items && unitProducts.items.length > 0
        "
      >
        <div
          v-for="product in unitProducts.items"
          :key="product.id"
          class="col"
        >
          <b-card class="prod-card position-relative">
            <img
              :src="product.productSpec.images[0].url"
              class="square-image"
              :alt="product.productSpec.images[0].alt"
            />
          </b-card>
          <b-card-text class="">
            <div>
              <div
                class="rounded-pill text-center mt-3 mb-3 w-50 prod-category"
              >
                {{ product.category }}
              </div>
              <h5>{{ product.productSpec.name }}</h5>
              <p>UP: {{ product.productionUnit.name }}</p>
              <p class="grey-txt mt-3">{{ product.productSpec.description }}</p>
              <div class="d-flex gap-2">
                <h4 class="mb-3">{{ product.currentPrice }}€</h4>
              </div>
              <div class="d-flex gap-2">
                <router-link :to="'/product/edit/' + product.id">
                  <button
                    type="button"
                    class="btn btn-outline-secondary circle-btn"
                    v-b-tooltip.hover
                    title="Editar produto"
                  >
                    <i class="bi bi-pencil"></i>
                  </button>
                </router-link>
                <button
                  type="button"
                  class="btn btn-outline-secondary circle-btn"
                  v-b-tooltip.hover
                  title="Remover produto"
                >
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </div>
          </b-card-text>
        </div>
        <div
          class=""
          style="
            display: flex;
            flex-direction: row-reverse;
            justify-content: center;
          "
        >
          <Pagination
            v-if="allUnitProducts && allUnitProducts.data"
            :total-rows="allUnitProducts.data.totalItems"
            :per-page="allUnitProducts.data.pageSize"
          >
            ></Pagination
          >
        </div>
      </template>
      <div v-else>
        <p>Esta Unidade de Produção ainda não tem produtos associados.</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { fetchAllUnitProducts } from '@/api/unitProducts';
import Pagination from '../components/Pagination.vue';
import { Product } from '@/types';
import { useRoute, RouteLocationNormalizedLoaded } from 'vue-router';
export default {
  computed: {
    unitName(): string {
      return this.$route.params.unitName as string;
    },
  },
  components: {
    Pagination,
  },
  data() {
    return {
      unitProducts: [] as Product[],
      allUnitProducts: {
        data: {
          totalItems: 0,
          pageSize: 0,
          page: 0,
        },
      },
    };
  },
  async mounted() {
    try {
      const route = useRoute() as RouteLocationNormalizedLoaded;
      const producerId = parseInt(route.params.producerId as string);
      const unitId = parseInt(route.params.unitId as string);
      const page = parseInt(route.query.page as string) || 1;
      const pageSize = parseInt(route.query.pageSize as string) || 24;

      const allUnitProducts = await fetchAllUnitProducts(
        producerId,
        unitId,
        page,
        pageSize
      );

      const unitProductsArray = allUnitProducts.data;

      this.unitProducts = unitProductsArray;
      this.allUnitProducts = allUnitProducts;
    } catch (error) {
      console.error(error);
    }
  },
};
</script>
