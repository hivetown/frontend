<template>
  <div class="container">
    <h1 class="mb-5">Unidades de Produção</h1>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      <template
        v-if="
          productionUnits &&
          productionUnits.items &&
          productionUnits.items.length > 0
        "
      >
        <div v-for="unit in productionUnits.items" :key="unit.id" class="col">
          <router-link
            :to="{
              name: 'ProductionUnitProducts',
              params: {
                producerId: unit.producer,
                unitId: unit.id,
                unitName: unit.name,
              },
            }"
          >
            <b-card class="prod-card position-relative">
              <img
                :src="'https://images.pexels.com/photos/209251/pexels-photo-209251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'"
                class="square-image"
                alt="Imagem da unidade de produção"
              />
            </b-card>
            <b-card-text class="">
              <div>
                <div
                  class="rounded-pill text-center mt-3 mb-3 w-50 prod-category"
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
        <div
          class=""
          style="
            display: flex;
            flex-direction: row-reverse;
            justify-content: center;
          "
        >
          <Pagination
            v-if="allUnitsData && allUnitsData.data"
            :total-rows="allUnitsData.data.totalItems"
            :per-page="allUnitsData.data.pageSize"
            :current-page="allUnitsData.data.page"
          >
            ></Pagination
          >
        </div>
      </template>
      <div v-else>
        <p>Ainda não tem Unidades de Produção registadas.</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ProductionUnits } from '@/types';
import { fetchAllUnits } from '@/api/units';
import Pagination from '../components/Pagination.vue';
import { useStore } from '@/store';

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      productionUnits: [] as ProductionUnits[],
      allUnitsData: {},
    };
  },
  async mounted() {
    try {
      const store = useStore();
      const id = store.state.user!.user.id;
      console.log('iddd', id);

      const page = parseInt(this.$route.query.page) || 1;
      const pageSize = parseInt(this.$route.query.pageSize) || 24;

      const allUnitsData = await fetchAllUnits(6, page, pageSize);

      console.log('allUnitsData:', allUnitsData);

      const productionUnitsArray = allUnitsData.data;
      //   console.log('Production Units:', productionUnitsArray);

      this.productionUnits = productionUnitsArray;
      console.log('Production Units:', this.productionUnits);
      this.allUnitsData = allUnitsData;
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style>
.production-unit-card a {
  text-decoration: none;
}

.prod-card {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: none;
  overflow: hidden;
  width: 130px;
  height: 250px;
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
</style>
