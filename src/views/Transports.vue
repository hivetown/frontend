<template>
  <div class="container">
    <h2 class="mb-5 dgreen-txt main-txt">Veículos de Transporte</h2>

    <Loader v-if="isLoading" />
    <div
      v-else
      class="row row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-6 g-4"
    >
      <template v-if="carriers && carriers.items.length">
        <div v-for="transport in carriers.items" :key="transport.id">
          <b-card class="prod-card position-relative">
            <img
              style="cursor: default"
              :src="transport.image.url"
              class="square-image"
              :alt="transport.image.alt"
            />
          </b-card>
          <b-card-text class="">
            <div>
              <div
                style="color: white"
                class="rounded-pill text-center mt-3 mb-3 w-50 prod-category"
              >
                {{ transport.licensePlate }}
              </div>
              <h5>
                <span
                  :style="{
                    color:
                      transport.status === 'AVAILABLE' ? '#4d774e' : '#dc6942',
                  }"
                >
                  {{
                    transport.status === 'AVAILABLE'
                      ? 'Disponível'
                      : 'Indisponível'
                  }}
                </span>
              </h5>
              <h6>Unidade associada:</h6>
              <p style="height: 7vh">
                {{ transport.productionUnit!.name }}
              </p>
              <div class="d-flex gap-2">
                <router-link :to="'/product/edit/' + transport.id">
                  <!-- <button
                    type="button"
                    class="btn btn-outline-secondary circle-btn"
                    v-b-tooltip.hover
                    title="Editar veículo"
                  >
                    <i class="bi bi-pencil"></i>
                  </button> -->
                  <PrimeButton
                    rounded
                    outlined
                    icon="pi pi-pencil"
                    v-b-tooltip.hover
                    title="Editar veículo"
                    style="color: #5a5a5a !important"
                  />
                </router-link>
                <!-- <button
                  type="button"
                  class="btn btn-outline-secondary circle-btn"
                  v-b-tooltip.hover
                  title="Remover veículo"
                >
                  <i class="bi bi-trash"></i>
                </button> -->
                <PrimeButton
                  rounded
                  outlined
                  icon="pi pi-trash"
                  severity="danger"
                  v-b-tooltip.hover
                  title="Remover veículo"
                />
              </div>
            </div>
          </b-card-text>
        </div>
      </template>
      <div v-else>
        <p>Ainda não tem veículos registados.</p>
      </div>
    </div>

    <Pagination
      class="mt-5"
      v-if="carriers"
      :items="carriers"
      :page="currentFilters.page"
      :page-size="currentFilters.pageSize"
      @page-change="onPageChange"
    >
      ></Pagination
    >
  </div>
</template>

<script lang="ts">
import { BaseItems, Transport } from '@/types';
import { fetchAllTransports } from '@/api/transports';
import Pagination from '../components/Pagination.vue';
import Loader from '../components/Loader.vue';
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
      carriers: {} as BaseItems<Transport>,
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
  async beforeMount() {
    try {
      this.currentFilters.page =
        parseInt(this.$route.query.page as string) || 1;
      this.currentFilters.pageSize =
        parseInt(this.$route.query.pageSize as string) || 24;

      await this.loadCarriers();
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    async loadCarriers() {
      try {
        this.isLoading = true;

        const producerId = this.$store.state.user!.user.id;

        const res = await fetchAllTransports(
          producerId,
          this.currentFilters.page,
          this.currentFilters.pageSize
        );

        this.carriers = res.data;
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

      await this.loadCarriers();
    },
    getStatusText(transport: Transport) {
      if (transport.status === 'AVAILABLE') {
        return 'Disponível';
      } else if (transport.status === 'UNAVAILABLE') {
        return 'Indisponível';
      }
      return '';
    },
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

.green-text {
  color: #4d774e;
}

.red-text {
  color: #dc6942;
}

h2 {
  text-transform: capitalize;
  font-size: 2em;
}

@media (max-width: 768px) {
  h2 {
    text-align: center;
  }

  .mobile-pagination-prods {
    scale: 0.8 !important;
    margin-left: -12vh;
  }
}
</style>
