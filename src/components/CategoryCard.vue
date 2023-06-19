<template>
  <b-card class="category-card" :img-src="image.url" :img-alt="image.alt">
    <div class="card-img-overlay d-flex justify-content-center text-white">
      <h5 class="card-title text-center">{{ title }}</h5>
    </div>
  </b-card>
</template>

<style>
.category-card {
  min-width: 15vh !important;
  height: 20vh !important;
}

.category-card h5 {
  margin-top: 1vh;
  color: white;
}

.category-card img {
  border-radius: 1.3em !important;
  /* max-height: 22vh; */
  width: 100%;
  height: 100%;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
}

@media (max-width: 767px) {
  .category-card {
    min-width: 10vh !important;
    height: 14vh !important;
  }

  .category-card h5 {
    margin-top: 0.3vh !important;
  }
}
</style>

<script lang="ts">
import { Image } from '@/types';
import { PropType } from 'vue';
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: Object as PropType<Omit<Image, 'id'>>,
      required: true,
    },
  },
};
</script>
