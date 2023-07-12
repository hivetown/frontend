<template>
  <div class="container">
    <h2 class="mb-5 dgreen-txt main-txt">Unidades de Produção</h2>

    <Loader v-if="isLoading" />
    <div
      v-else
      class="row row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-6 g-4"
    >
      <template v-if="productionUnits && productionUnits.items.length">
        <div v-for="unit in productionUnits.items" :key="unit.id">
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
          </router-link>
          <b-card-text class="">
            <div>
              <div
                class="rounded-pill text-center mt-3 mb-3 w-25 prod-category"
              >
                <!-- {{ unit.id }} -->
              </div>
              <router-link
                :to="{
	            	name: 'ProductionUnitProducts',
	            	params: {
	            		producerId: unit.producer as number,
	            		unitId: unit.id,
	            	},
	            }"
              >
                <h5>{{ unit.address.district }}</h5>
                <h6><span class="fw-bold">Id:</span> {{ unit.id }}</h6>
                <p style="height: 5vh; display: flex; align-items: center">
                  {{ unit.address.city }}
                </p>
                <p class="grey-txt">
                  {{ unit.address.floor }}, {{ unit.address.door }}
                  {{ unit.address.zipCode }}
                </p>
                <span>Morada completa:</span>
                <p style="font-size: 0.7em; height: 7vh">
                  {{ unit.address.getFullAddress }}
                </p>
              </router-link>
              <div class="d-flex gap-2">
                <router-link :to="'/product/edit/' + unit.id">
                  <PrimeButton
                    rounded
                    outlined
                    v-b-tooltip.hover
                    title="Editar produto"
                    :icon="'pi pi-pencil'"
                    style="color: #5a5a5a !important"
                  >
                  </PrimeButton>
                </router-link>
                <PrimeButton
                  rounded
                  outlined
                  v-b-tooltip.hover
                  title="Remover produto"
                  :icon="'pi pi-trash'"
                  severity="danger"
                >
                </PrimeButton>
              </div>
            </div>
          </b-card-text>
        </div>
      </template>
      <div v-else>
        <p>Ainda não tem Unidades de Produção registadas.</p>
      </div>
    </div>
  </div>

  <Pagination
    class="mt-5"
    v-if="productionUnits"
    :items="productionUnits"
    :page="currentFilters.page"
    :page-size="currentFilters.pageSize"
    @page-change="onPageChange"
  >
    ></Pagination
  >
</template>

<script lang="ts">
import { BaseItems, ProductionUnit } from '@/types';
import { fetchAllUnits } from '@/api/units';
import Pagination from '@/components/Pagination.vue';
import Loader from '@/components/Loader.vue';
import { PageState } from 'primevue/paginator';
import PrimeButton from 'primevue/button';

export default {
  components: {
    Pagination,
    Loader,
    PrimeButton,
  },
  data() {
    return {
      productionUnits: {} as BaseItems<ProductionUnit>,
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
    async loadProductionUnits() {
      this.isLoading = true;
      try {
        const userId = this.$store.state.user!.user.id;
        const allUnitsData = await fetchAllUnits(
          userId,
          this.currentFilters.page,
          this.currentFilters.pageSize
        );

        this.productionUnits = allUnitsData.data;
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

      await this.loadProductionUnits();
    },
  },
  async beforeMount() {
    try {
      this.currentFilters.page =
        parseInt(this.$route.query.page as string) || 1;
      this.currentFilters.pageSize =
        parseInt(this.$route.query.pageSize as string) || 24;

      await this.loadProductionUnits();
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
}
</style>
