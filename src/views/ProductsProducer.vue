<template>
  <div class="container">
    <h1 class="mb-5">Meus Produtos</h1>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      <template v-if="products && products.items && products.items.length > 0">
        <div v-for="product in products.items" :key="product.id" class="col">
          <!-- <div v-for="product in products" :key="product.id" class="col"> -->
          <b-card class="prod-card position-relative">
            <!-- <span class="position-absolute top-0 end-0 p-3 fav">
            <i class="bi bi-heart" style="color: #dc6942; cursor: pointer"></i>
          </span> -->
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
                <!-- <p class="mt-1 grey-txt text-decoration-line-through">{{ product.oldPrice }}€</p> -->
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
            v-if="allProductsData && allProductsData.data"
            :total-rows="allProductsData.data.totalItems"
            :per-page="allProductsData.data.pageSize"
            :current-page="allProductsData.data.page"
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
</template>

<script lang="ts">
import { Product } from '@/types';
import { fetchAllProducts } from '@/api/producerProducts';
import { useRoute, RouteLocationNormalizedLoaded } from 'vue-router';
import Pagination from '../components/Pagination.vue';
import { useStore } from '@/store';

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      products: [] as Product[],
      allProductsData: {
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
      const store = useStore();
      const id = store.state.user!.user.id;
      const route = useRoute() as RouteLocationNormalizedLoaded;
      const page = parseInt(route.query.page as string) || 1;
      const pageSize = parseInt(route.query.pageSize as string) || 24;
      const allProductsData = await fetchAllProducts(id, page, pageSize);
      const productsArray = allProductsData.data;
      this.products = productsArray;
      this.allProductsData = allProductsData;
    } catch (error) {
      console.error(error);
    }
  },
};
</script>
<style scoped>
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
</style>
