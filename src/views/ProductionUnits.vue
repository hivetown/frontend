<template>
  <div class="container">
    <h2 class="mb-5 dgreen-txt main-txt">Unidades de Produção</h2>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-6 g-4">
      <template v-if="allUnitsData?.items">
        <div v-for="unit in allUnitsData.items" :key="unit.id">
          <router-link
            :to="{
              name: 'ProductionUnitProducts',
              params: {
                producerId: unit.producer as number,
                unitId: unit.id,
              },
            }"
          >
            <b-card class="prod-card position-relative">
              <img
                :src="unit.images![0].url"
                class="square-image"
                :alt="unit.images![0].alt"
              />
            </b-card>
            <b-card-text class="">
              <div>
                <div
                  class="rounded-pill text-center mt-3 mb-3 w-25 prod-category"
                >
                  {{ unit.id }}
                </div>
                <h5>{{ unit.address.district }}</h5>
                <p>{{ unit.address.city }}</p>
                <p>{{ unit.address.county }}</p>
                <p class="grey-txt mt-3">
                  {{ unit.address.floor }}, {{ unit.address.door }}
                </p>
                <div class="d-flex gap-2">
                  <h4 class="mb-3">{{ unit.address.floor }}º Andar</h4>
                </div>
                <div class="d-flex gap-2">
                  <router-link :to="'/product/edit/' + unit.id">
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
          </router-link>
        </div>
      </template>
      <div v-else>
        <p>Ainda não tem Unidades de Produção registadas.</p>
      </div>
    </div>
  </div>
  <div
    class=""
    style="display: flex; flex-direction: row-reverse; justify-content: center"
  >
    <!-- <Pagination
      class="mobile-pagination-prods mt-4"
      v-if="allUnitsData"
      :total-rows="allUnitsData.totalItems"
      :per-page="allUnitsData.pageSize"
    >
      ></Pagination
    > -->
  </div>
</template>

<script lang="ts">
import { BaseItems, ProductionUnit } from '@/types';
import { fetchAllUnits } from '@/api/units';
import Pagination from '../components/Pagination.vue';
import { useStore } from '@/store';
import { useRoute, RouteLocationNormalizedLoaded } from 'vue-router';
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      allUnitsData: {} as BaseItems<ProductionUnit>,
    };
  },
  async mounted() {
    try {
      const store = useStore();
      const id = store.state.user!.user.id;

      const route = useRoute() as RouteLocationNormalizedLoaded;
      const page = parseInt(route.query.page as string) || 1;
      const pageSize = parseInt(route.query.pageSize as string) || 24;

      const allUnitsData = await fetchAllUnits(id, page, pageSize);
      this.allUnitsData = allUnitsData.data;
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style scoped>
* {
  color: black;
  text-decoration: none;
}
.production-unit-card a {
  text-decoration: none;
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
