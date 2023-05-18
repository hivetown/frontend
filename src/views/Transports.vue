<template>
  <div class="container">
    <h1 class="mb-5">Unidades de Produção</h1>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      <div
        v-for="transport in transportVehicles.items"
        :key="transport.id"
        class="col"
      >
        <!-- <div v-for="product in products" :key="product.id" class="col"> -->
        <b-card class="prod-card position-relative">
          <img
            :src="'https://images.pexels.com/photos/209251/pexels-photo-209251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'"
            class="square-image"
            alt="Imagem do produto"
          />
        </b-card>
        <b-card-text class="">
          <div>
            <div class="rounded-pill text-center mt-3 mb-3 w-50 prod-category">
              {{ transport.id }}
            </div>
            <h5>{{ transport.address.district }}</h5>
            <p>{{ transport.address.city }}</p>
            <p>{{ transport.address.county }}</p>
            <p class="grey-txt mt-3">
              {{ transport.address.floor }}, {{ transport.address.door }}
            </p>
            <div class="d-flex gap-2">
              <h4 class="mb-3">{{ transport.address.floor }}º Andar</h4>
              <!-- <p class="mt-1 grey-txt text-decoration-line-through">{{ product.oldPrice }}€</p> -->
            </div>
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
    </div>
  </div>
</template>

<!-- <template>
	<div class="container">
	  <h1 class="mb-5">My Products</h1>
	  <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
		<div v-for="product in products" :key="product.id" class="col">
		  <b-card class="prod-card position-relative">
		   
			<img :src="product.productSpec?.image" class="square-image" alt="Product image" />
		  </b-card>
		  <b-card-text class="">
			<div>
			  <div class="rounded-pill text-center mt-3 mb-3 w-50 prod-category">{{ product.category }}</div>
			  <h5>{{ product.productSpec?.name }}</h5>
			  <p class="grey-txt mt-3">{{ product.productSpec?.description }}</p>
			  <div class="d-flex gap-2">
				<h4 class="mb-3">{{ product.currentPrice }}€</h4>
				<p class="mt-1 grey-txt text-decoration-line-through">{{ product.oldPrice }}€</p>
			  </div>
			  <div class="d-flex gap-2">
				<router-link :to="'/product/edit/' + product.id">
				  <button type="button" class="btn btn-outline-secondary circle-btn" v-b-tooltip.hover title="Editar produto">
					<i class="bi bi-pencil"></i>
				  </button>
				</router-link>
				<button type="button" class="btn btn-outline-secondary circle-btn" v-b-tooltip.hover title="Remover produto">
				  <i class="bi bi-trash"></i>
				</button>
			  </div>
			</div>
		  </b-card-text>
		</div>
	  </div>
	</div>
  </template> -->
<script lang="ts">
import { defineComponent, ref, onMounted, inject } from 'vue';
import { TransportVehicles } from '@/types/TransportVehicles';
import { fetchAllUnits } from '@/api/units';
import { fetchAuth } from '../api/auth';
import { ProducerProducts } from '@types';
import Pagination from '../components/Pagination.vue';

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      transportVehicles: [] as Transports[],
      allTransportsData: {},
    };
  },
  async mounted() {
    try {
      const authArray = await fetchAuth();
      const { id } = authArray.data;
      console.log('Producer ID:', id);

      const page = parseInt(this.$route.query.page) || 1;
      const pageSize = parseInt(this.$route.query.pageSize) || 24;
      const categoryId = parseInt(this.$route.query.categoryId) || 1;

      const allTransportsData = await fetchAllUnits(
        2,
        page,
        pageSize,
        categoryId
      );

      console.log('allTransportsData:', allTransportsData);

      const transportVehiclesArray = allTransportsData.data;
      //   console.log('Production Units:', transportVehiclesArray);

      this.transportVehicles = transportVehiclesArray;
      console.log('Production Units:', this.transportVehicles);
      this.allTransportsData = allTransportsData;
    } catch (error) {
      console.error(error);
    }
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
</style>
