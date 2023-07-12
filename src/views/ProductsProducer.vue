<template>
  <div class="center-page">
    <div class="container">
      <div class="mb-5">
        <h2 class="mb-5 dgreen-txt main-txt">Produtos</h2>
        <div style="display: flex; align-items: center; gap: 1vh">
          <span style="font-size: 1.3em">Criar produto</span>
          <ManageProduct method="create" @product-managed="loadProducts" />
        </div>
      </div>

      <Loader v-if="isLoading" />

      <div
        v-else
        class="row row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-6 g-4"
      >
        <template
          v-if="products && products.items && products.items.length > 0"
        >
          <div v-for="product in products.items" :key="product.id">
            <!-- <div v-for="product in products" :key="product.id" class="col"> -->
            <b-card class="prod-card position-relative">
              <!-- <span class="position-absolute top-0 end-0 p-3 fav">
            <i class="bi bi-heart" style="color: #dc6942; cursor: pointer"></i>
          </span> -->
              <img
                style="cursor: default"
                :src="product.productSpec!.images[0].url"
                class="square-image"
                :alt="product.productSpec!.images[0].alt"
              />
            </b-card>
            <b-card-text class="">
              <div class="mt-3">
                <h5 class="name-limited">{{ product.productSpec!.name }}</h5>
                <p class="name-limited">
                  <span class="fw-bold">Unidade: </span
                  >{{ product.productionUnit!.name }}
                </p>
                <p class="grey-txt mt-3 description">
                  {{ product.productSpec!.description }}
                </p>
                <div class="d-flex gap-2">
                  <h4 class="mb-3">{{ product.currentPrice }}€</h4>
                  <!-- <p class="mt-1 grey-txt text-decoration-line-through">{{ product.oldPrice }}€</p> -->
                </div>
                <div class="d-flex gap-2">
                  <ManageProduct
                    :default-product-spec="product.productSpec"
                    :default-production-unit="product.productionUnit"
                    :default-price="product.currentPrice"
                    :default-stock="product.stock"
                    :default-production-date="new Date(product.productionDate)"
                    method="update"
                    :producer-product-id="product.id"
                    @product-managed="loadProducts"
                  />

                  <SelectPU
                    :default-product-spec="product.productSpec"
                    :default-production-unit="product.productionUnit"
                    :default-price="product.currentPrice"
                    :default-stock="product.stock"
                    :default-production-date="new Date(product.productionDate)"
                    method="update"
                    :producer-product-id="product.id"
                    @product-managed="loadProducts"
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
          <p>Ainda não tem produtos registados.</p>
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
  </div>
</template>

<script lang="ts">
import { BaseItems, ProducerProduct } from '@/types';
import { fetchAllProducts } from '@/api/producerProducts';
import Pagination from '../components/Pagination.vue';
import Loader from '@/components/Loader.vue';
import ManageProduct from '@/components/producer/products/ManageProduct.vue';
import DeleteProduct from '@/components/producer/products/DeleteProduct.vue';
import { PageState } from 'primevue/paginator';
import SelectPU from '@/components/producer/products/SelectPU.vue';

export default {
  components: {
    Pagination,
    Loader,
    ManageProduct,
    DeleteProduct,
    SelectPU,
  },
  data() {
    return {
      products: {} as BaseItems<ProducerProduct>,
      currentFilters: {
        page: 1,
        pageSize: 24,
      },
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
    async loadProducts() {
      try {
        this.isLoading = true;

        const producerId = this.$store.state.user!.user.id;

        const allUnitProducts = await fetchAllProducts(
          producerId,
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

      await this.loadProducts();
    },
  },
  async mounted() {
    try {
      this.currentFilters.page =
        parseInt(this.$route.query.page as string) || 1;
      this.currentFilters.pageSize =
        parseInt(this.$route.query.pageSize as string) || 24;

      await this.loadProducts();
    } catch (error) {
      console.error(error);
    }
  },
};
</script>
<style scoped>
.center-page {
  display: flex;
  justify-content: center;
}

.square-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.fav {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
}

.prod-category {
  background-color: #9dc88d;
  /* A cor irá variar de acordo com a categoria */
  cursor: pointer;
}

.grey-txt {
  color: #888;
  font-size: 0.9rem;
}

.circle-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
  color: #333;
}

h2 {
  text-transform: capitalize;
  font-size: 2em;
}
.description {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.name-limited {
  display: -webkit-box;
  -webkit-line-clamp: 2;
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
