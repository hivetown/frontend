<template>
  <div class="container">
    <!-- <h2 class="mb-5" v-if="productionUnit"> -->
    <!-- Produtos da Unidade: {{ productionUnit.name }}
      <ManageProduct
        class="ml-2"
        method="create"
        :default-production-unit="productionUnit"
        @product-managed="loadUnitProducts"
      /> -->
    <h2 class="dgreen-txt main-txt" v-if="productionUnit">Produtos</h2>
    <span style="color: black; font-size: 1.2em"
      >Associados à unidade de produção: {{ productionUnit.name }}</span
    >
    <div
      style="
        display: flex;
        align-items: center;
        gap: 1vh;
        margin-top: 2vh;
        margin-bottom: 2vh;
      "
    >
      <span style="font-size: 1.3em">Criar produto</span>
      <ManageProduct
        class="ml-2"
        method="create"
        :default-production-unit="productionUnit"
        @product-managed="loadUnitProducts"
      />
    </div>
    <!-- </h2> -->

    <div v-if="isLoading">
      <Loader />
    </div>
    <div
      v-else
      class="row row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-6 g-4"
    >
      <template v-if="!isLoading && products && products.items.length">
        <div v-for="product in products.items" :key="product.id">
          <b-card class="prod-card position-relative">
            <img
              style="cursor: default"
              :src="product.productSpec!.images[0].url"
              class="square-image"
              :alt="product.productSpec!.images[0].alt"
            />
          </b-card>
          <b-card-text class="mt-3">
            <div>
              <h5 style="height: 7vh">{{ product.productSpec!.name }}</h5>

              <p><span class="fw-bold">Stock:</span> {{ product.stock }}</p>

              <p class="grey-txt mt-3 name-limited" style="height: 10vh">
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
                  @product-managed="loadUnitProducts"
                />

                <DeleteProduct
                  :producer-product="product"
                  @delete-product="deleteProduct"
                />
              </div>
            </div>
          </b-card-text>
        </div>
      </template>
      <div v-else>
        <p>Esta Unidade de Produção ainda não tem produtos associados.</p>
      </div>
    </div>

    <Pagination
      class="mt-5"
      v-if="products"
      :items="products"
      :page="currentFilters.page"
      :page-size="currentFilters.pageSize"
      @page-change="onPageChange"
    >
      ></Pagination
    >
  </div>
</template>

<script lang="ts">
import Loader from '@/components/Loader.vue';
import { fetchAllUnitProducts } from '@/api/unitProducts';
import Pagination from '@/components/Pagination.vue';
import { BaseItems, ProducerProduct, ProductionUnit } from '@/types';
import { fetchUnit } from '@/api/unitData';
import ManageProduct from '@/components/producer/products/ManageProduct.vue';
import DeleteProduct from '@/components/producer/products/DeleteProduct.vue';
import { PageState } from 'primevue/paginator';

export default {
  components: {
    Pagination,
    ManageProduct,
    DeleteProduct,
    Loader,
  },
  data() {
    return {
      products: {} as BaseItems<ProducerProduct>,
      productionUnit: {} as ProductionUnit,
      currentFilters: {
        page: 1,
        pageSize: 24,
      },
      producerId: 0,
      unitId: 0,
      isLoading: true,
    };
  },
  watch: {
    currentFilters: {
      handler(newFilters) {
        this.$router.push({
          query: {
            ...newFilters,
          },
        });
      },
      deep: true,
    },
  },
  methods: {
    deleteProduct(data: ProducerProduct) {
      const productIdx = this.products.items.findIndex((p) => p.id === data.id);
      if (productIdx === -1) return;

      this.products.items.splice(productIdx, 1);
      this.products.totalItems--;
    },
    async loadUnitProducts() {
      try {
        this.isLoading = true;

        const producerId = parseInt(this.$route.params.producerId as string);
        const unitId = parseInt(this.$route.params.unitId as string);

        const allUnitProducts = await fetchAllUnitProducts(
          producerId,
          unitId,
          this.currentFilters.page,
          this.currentFilters.pageSize
        );

        this.products = allUnitProducts.data;
      } finally {
        this.isLoading = false;
      }
    },
    async onPageChange(page: Partial<PageState>) {
      if (page.page) {
        this.currentFilters.page = page.page + 1;
      }

      if (page.rows) {
        this.currentFilters.pageSize = page.rows;
      }

      await this.loadUnitProducts();
    },
  },
  async beforeMount() {
    try {
      this.producerId = parseInt(this.$route.params.producerId as string);
      this.unitId = parseInt(this.$route.params.unitId as string);
      this.currentFilters.page =
        parseInt(this.$route.query.page as string) || 1;
      this.currentFilters.pageSize =
        parseInt(this.$route.query.pageSize as string) || 24;

      // In this phase it is still loading (default is true)
      this.productionUnit = (
        await fetchUnit(this.producerId, this.unitId)
      ).data;

      // And will only be set to false after the products are loaded
      await this.loadUnitProducts();
    } finally {
      this.isLoading = false;
    }
  },
};
</script>

<style scoped>
.name-limited {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 768px) {
  h2 {
    text-align: center;
  }
}
</style>
