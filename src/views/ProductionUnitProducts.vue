<template>
  <div class="container">
    <h2 class="mb-5">
      Produtos da Unidade: {{ unitName }}
      <ManageProduct
        class="ml-2"
        method="create"
        :default-production-unit="productionUnit"
        @product-managed="refreshWindow(1000)"
      />
    </h2>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-6 g-4">
      <template v-if="allUnitProducts?.items?.length">
        <div v-for="product in allUnitProducts.items" :key="product.id">
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
                <ManageProduct
                  :default-product-spec="product.productSpec"
                  :default-production-unit="productionUnit"
                  :default-price="product.currentPrice"
                  :default-stock="product.stock"
                  :default-production-date="new Date(product.productionDate)"
                  method="update"
                  :producer-product-id="product.id"
                  @product-managed="refreshWindow(1000)"
                />

                <DeleteProduct
                  :producer-product="product"
                  @delete-product="deleteProduct"
                />
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
            class="mobile-pagination-prods"
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
import { BaseItems, ProducerProduct, ProductionUnit } from '@/types';
import { fetchUnit } from '@/api/unitData';
import ManageProduct from '@/components/producer/products/ManageProduct.vue';
import DeleteProduct from '@/components/producer/products/DeleteProduct.vue';

export default {
  computed: {
    unitName(): string {
      return this.$route.params.unitName as string;
    },
  },
  components: {
    Pagination,
    ManageProduct,
    DeleteProduct,
  },
  data() {
    return {
      allUnitProducts: {} as BaseItems<ProducerProduct>,
      productionUnit: {} as ProductionUnit,
    };
  },
  methods: {
    refreshWindow(timeout: number = 0) {
      setTimeout(() => window.location.reload(), timeout);
    },
    deleteProduct(data: ProducerProduct) {
      const productIdx = this.allUnitProducts.items.findIndex(
        (p) => p.id === data.id
      );
      if (productIdx === -1) return;

      this.allUnitProducts.items.splice(productIdx, 1);
      this.allUnitProducts.totalItems--;
    },
  },
  async mounted() {
    try {
      const route = useRoute() as RouteLocationNormalizedLoaded;
      const producerId = parseInt(route.params.producerId as string);
      const unitId = parseInt(route.params.unitId as string);
      const page = parseInt(route.query.page as string) || 1;
      const pageSize = parseInt(route.query.pageSize as string) || 24;

      this.productionUnit = (await fetchUnit(producerId, unitId)).data;

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

<style scoped>
@media (max-width: 768px) {
  h2 {
    text-align: center;
  }

  .mobile-pagination-prods {
    scale: 0.8 !important;
    margin-left: -14vh;
  }
}
</style>
