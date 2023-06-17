<template>
  <div class="container">
    <h1 class="mb-5">Produtos da UP: {{ unitName }}</h1>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      <template v-if="allUnitProducts?.items?.length">
        <div
          v-for="product in allUnitProducts.items"
          :key="product.id"
          class="col"
        >
          <b-card class="prod-card position-relative">
            <img
              :src="product.productSpec!.images[0].url"
              class="square-image"
              :alt="product.productSpec!.images[0].alt"
            />
          </b-card>
          <b-card-text class="">
            <div>
              <h5>{{ product.productSpec!.name }}</h5>
              <p>UP: {{ product.productionUnit!.name }}</p>
              <p class="grey-txt mt-3">
                {{ product.productSpec!.description }}
              </p>
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
            v-if="allUnitProducts"
            :total-rows="allUnitProducts.totalItems"
            :per-page="allUnitProducts.pageSize"
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
import { useRoute, RouteLocationNormalizedLoaded } from 'vue-router';
import { BaseItems, ProducerProduct } from '@/types';
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
      allUnitProducts: {} as BaseItems<ProducerProduct>,
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

      this.allUnitProducts = allUnitProducts.data;
    } catch (error) {
      console.error(error);
    }
  },
};
</script>
