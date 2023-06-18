<template>
  <div class="center-page">
    <div class="container">
      <h2 class="mb-5 dgreen-txt main-txt">
        Produtos
        <ManageProduct
          class="ml-2"
          method="create"
          @product-managed="refreshWindow(1000)"
        />
      </h2>

      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-6 g-4">
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
          <div class="parent" style="display: flex; justify-content: center">
            <Pagination
              v-if="products"
              :total-rows="products.totalItems"
              :per-page="products.pageSize"
            >
              ></Pagination
            >
          </div>
        </template>
        <div v-else>
          <p>Ainda não tem produtos registados.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { BaseItems, ProducerProduct } from '@/types';
import { fetchAllProducts } from '@/api/producerProducts';
import { useRoute, RouteLocationNormalizedLoaded } from 'vue-router';
import Pagination from '../components/Pagination.vue';
import { useStore } from '@/store';
import ManageProduct from '@/components/producer/products/ManageProduct.vue';
import DeleteProduct from '@/components/producer/products/DeleteProduct.vue';

export default {
  components: {
    Pagination,
    ManageProduct,
    DeleteProduct,
  },
  data() {
    return {
      products: {} as BaseItems<ProducerProduct>,
    };
  },
  methods: {
    refreshWindow(timeout: number = 0) {
      setTimeout(() => window.location.reload(), timeout);
    },
    deleteProduct(data: ProducerProduct) {
      const productIdx = this.products.items.findIndex((p) => p.id === data.id);
      if (productIdx === -1) return;

      this.products.items.splice(productIdx, 1);
      this.products.totalItems--;
    },
  },
  async mounted() {
    try {
      const store = useStore();
      const id = store.state.user!.user.id;
      const route = useRoute() as RouteLocationNormalizedLoaded;
      const page = parseInt(route.query.page as string) || 1;
      const pageSize = parseInt(route.query.pageSize as string) || 24;
      const allProductsData = await fetchAllProducts(id, page, pageSize);
      const productsArray = allProductsData.data;
      this.products = productsArray;
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

@media (max-width: 768px) {
  h2 {
    text-align: center;
  }
}
</style>
