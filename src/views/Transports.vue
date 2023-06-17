<template>
  <div class="container">
    <h1 class="mb-5">Veículos de Transporte</h1>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      <template v-if="allTransportsData?.items?.length">
        <div
          v-for="transport in allTransportsData.items"
          :key="transport.id"
          class="col"
        >
          <b-card class="prod-card position-relative">
            <img
              :src="transport.image.url"
              class="square-image"
              :alt="transport.image.alt"
            />
          </b-card>
          <b-card-text class="">
            <div>
              <div
                class="rounded-pill text-center mt-3 mb-3 w-50 prod-category"
              >
                {{ transport.licensePlate }}
              </div>
              <p>
                <span
                  :style="{
                    color: transport.status === 'AVAILABLE' ? 'green' : 'red',
                  }"
                >
                  {{
                    transport.status === 'AVAILABLE'
                      ? 'Disponível'
                      : 'Indisponível'
                  }}
                </span>
              </p>
              <h5>UP:</h5>
              <p>
                {{ transport.productionUnit!.name }}
              </p>
              <div class="d-flex gap-2">
                <router-link :to="'/product/edit/' + transport.id">
                  <button
                    type="button"
                    class="btn btn-outline-secondary circle-btn"
                    v-b-tooltip.hover
                    title="Editar veículo"
                  >
                    <i class="bi bi-pencil"></i>
                  </button>
                </router-link>
                <button
                  type="button"
                  class="btn btn-outline-secondary circle-btn"
                  v-b-tooltip.hover
                  title="Remover veículo"
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
            v-if="allTransportsData"
            :total-rows="allTransportsData.totalItems"
            :per-page="allTransportsData.pageSize"
          >
            ></Pagination
          >
        </div>
      </template>
      <div v-else>
        <p>Ainda não tem veículos registados.</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { BaseItems, Transport } from '@/types';
import { fetchAllTransports } from '@/api/transports';
import Pagination from '../components/Pagination.vue';
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      allTransportsData: {} as BaseItems<Transport>,
    };
  },
  async mounted() {
    try {
      const id = this.$store.state.user!.user.id;

      const page = parseInt(this.$route.query.page as string) || 1;
      const pageSize = parseInt(this.$route.query.pageSize as string) || 24;

      const allTransportsData = await fetchAllTransports(id, page, pageSize);
      this.allTransportsData = allTransportsData.data;
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
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
  color: green;
}

.red-text {
  color: red;
}
</style>
