<!-- <template>
  <div class="producer-products">
    <h2>{{ producerName }}'s Products</h2>
    <div class="product-list">
      <div v-for="product in products" :key="product.id" class="product-item">
        <b-card>
          
          <router-link :to="'/products/' + product.id">
            <img :src="product.image" class="product-image" />
          </router-link>
         
          <div class="product-info">
            <router-link :to="'/products/' + product.id">
              <h3>class="product-title">{{ product.title }}</h3>
            </router-link>
            <p class="product-description">{{ product.description }}</p>
            <p class="product-price">{{ product.price }}</p>
            <div class="product-actions">
              <button class="btn btn-primary">Edit</button>
              <button class="btn btn-danger">Delete</button>
            </div>
          </div>
        </b-card>
      </div>
    </div>
  </div>
</template> -->
<!-- <template>
  <div class="producer-products">
    <h2>{{ producerName }}'s Products</h2>
    <div class="product-list">
      <div v-for="product in products" :key="product.id" class="product-item">
        <b-card>

          <router-link :to="'/products/' + product.id">
            <img :src="product.image" class="product-image" />
          </router-link>

          <div class="product-info">
            <router-link :to="'/products/' + product.id">
              <h3 class="product-title">{{ product.title }}</h3>
            </router-link>
            <p class="product-description">{{ product.description }}</p>
            <p class="product-price">{{ product.price }}</p>
            <div class="product-actions">
              <button class="btn btn-primary">Edit</button>
              <button class="btn btn-danger">Delete</button>
            </div>
          </div>
        </b-card>
      </div>
    </div>
  </div>
</template> -->
<!-- <template>
  <div>
    <h1>My Products</h1>
    <div v-for="product in products.items" :key="product.id">
      <h2>{{ product.productSpec?.name }}</h2>
      <p>{{ product.productSpec?.description }}</p>
      <p>Price: ${{ product.currentPrice }}</p>
      <p>In stock: {{ product.stock }}</p>
    </div>
  </div>
</template> -->
<template>
  <div class="container">
    <h1 class="mb-5">Meus Produtos</h1>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      <div v-for="product in products.items" :key="product.id" class="col">
        <b-card class="prod-card position-relative">
          <!-- <span class="position-absolute top-0 end-0 p-3 fav">
            <i class="bi bi-heart" style="color: #dc6942; cursor: pointer"></i>
          </span> -->
          <img :src="product.productSpec.image" class="square-image" alt="Imagem do produto" />
        </b-card>
        <b-card-text class="">
          <div>
            <div class="rounded-pill text-center mt-3 mb-3 w-50 prod-category">{{ product.category }}</div>
            <h5>{{ product.productSpec.name }}</h5>
            <p>UP {{ product.productionUnit.id }}</p>
            <p class="grey-txt mt-3">{{ product.productSpec.description }}</p>
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

import { defineComponent, ref, onMounted } from 'vue';
import { Product } from '@/types/Product';
import { fetchAllProducts } from '@/api/producerProducts';
import { fetchAuth } from '../api/auth';
import { ProducerProducts } from '@types';
export default defineComponent({
  setup() {
    const products = ref<Product[]>([]);

    onMounted(async () => {
      try {
        const authArray = await fetchAuth();
        const { id } = authArray.data;
        console.log('Producer ID:', id);

        const response = await fetchAllProducts(1);
        console.log('Response:', response);

        // const products = response.data as unknown as ProducerProducts;
        // console.log('Products:', products.items);

        const productsArray = response.data;
        console.log('Products:', productsArray);

        products.value = productsArray;
      } catch (error) {
        console.error(error);
      }
    });

    return {
      products,
    };
  },
});
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
  background-color: #9dc88d; /* A cor irá variar de acordo com a categoria */
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


<!-- <template>
  <div>
    <h1>{{ producerName }} Products</h1>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { fetchAllProducts } from '@/api/producerProducts';
import { Product } from '../types/interfaces/Product';
import { fetchAuth } from '../api/auth';

export default defineComponent({
  props: {
    producerId: {
      type: Number,
      required: true,
    },
    producerName: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const products = ref<Product[]>([])
    const producerId = ref<number>(props.producerId)
    const producerName = ref<string>(props.producerName)

    onMounted(async () => {
      try {
        const authArray = await fetchAuth();
        const { id } = authArray.data;
        producerId.value = id;
        products.value = await fetchAllProducts(producerId.value)
      } catch (error) {
        console.error(error)
      }
    })

    return {
      producerId,
      producerName,
      products,
    }
  },
})
</script> -->
