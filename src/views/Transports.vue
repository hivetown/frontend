<template>
  <div class="container">
    <h1 class="mb-5">Veículos de Transporte</h1>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      <template
        v-if="
          transportVehicles &&
          transportVehicles.items &&
          transportVehicles.items.length > 0
        "
      >
        <div
          v-for="transport in transportVehicles.items"
          :key="transport.id"
          class="col"
        >
          <!-- <div v-for="product in products" :key="product.id" class="col"> -->
          <b-card class="prod-card position-relative">
            <!-- <img
            :src="product.productSpec.images[0].url"
            class="square-image"
            alt="Imagem do produto"
          /> -->
            <img
              :src="transport.image.url"
              class="square-image"
              alt="Imagem do veículo"
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
                {{ transport.productionUnit.name }}
              </p>

              <!-- <p>{{ transport.address.county }}</p>
            <p class="grey-txt mt-3">
              {{ transport.address.floor }}, {{ transport.address.door }}
            </p>
            <div class="d-flex gap-2">
              <h4 class="mb-3">{{ transport.address.floor }}º Andar</h4>
            </div> -->
              <div class="d-flex gap-2">
                <router-link :to="'/product/edit/' + transport.id">
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
            v-if="allTransportsData && allTransportsData.data"
            :total-rows="allTransportsData.data.totalItems"
            :per-page="allTransportsData.data.pageSize"
            :current-page="allTransportsData.data.page"
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
import { TransportVehicles } from '@/types/TransportVehicles';
import { fetchAllTransports } from '@/api/transports';
import Pagination from '../components/Pagination.vue';
import { useStore } from '@/store';
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      transportVehicles: [] as TransportVehicles[],
      allTransportsData: {},
      transport: {
        status: 'AVAILABLE', // Set the initial status value here
      },
    };
  },
  async mounted() {
    try {
      const store = useStore();
      const id = store.state.user!.user.id;
      console.log('iddd', id);

      const page = parseInt(this.$route.query.page) || 1;
      const pageSize = parseInt(this.$route.query.pageSize) || 24;

      const allTransportsData = await fetchAllTransports(2, page, pageSize);

      console.log('allTransportsData:', allTransportsData);

      const transportVehiclesArray = allTransportsData.data;
      //   console.log('Production Units:', transportVehiclesArray);

      this.transportVehicles = transportVehiclesArray;
      console.log('Transportes:', this.transportVehicles);
      this.allTransportsData = allTransportsData;
    } catch (error) {
      console.error(error);
    }
  },
  computed: {
    getStatusText() {
      if (this.transport.status === 'AVAILABLE') {
        return 'Disponível';
      } else if (this.transport.status === 'UNAVAILABLE') {
        console.log('UNAVAILABLE');
        return 'Indisponível';
      }
      return '';
    },
  },
};
</script>

<style>
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

.green-text {
  color: green;
}

.red-text {
  color: red;
}
</style>