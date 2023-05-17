<template>
  <div class="surface-card shadow-2 border-rounded p-4">
    <div
      class="flex flex-column align-items-center border-bottom-1 surface-border pb-3"
    >
      <Image
        :src="product.specification!.image"
        alt="product image"
        height="210"
        class="mb-3"
      />

      <span class="text-lg text-900 font-medium mb-2 p-component">
        {{ product.specification!.name }}
      </span>

      <span class="text-600 font-medium mb-3 p-component">
        {{ product.specification!.description }}
      </span>

      <span class="text-2xl text-800 block mb-3 font-semibold p-component">
        {{ product.currentPrice }} €
      </span>

      <span class="p-component text-700">Vendido por</span>
      <span class="text-xl text-700 block mb-3 font-semibold p-component">
        {{ product.producer!.user.name }}
      </span>
    </div>

    <div class="flex pt-3 justify-content-between align-items-center">
      <Button
        class="p-button-text"
        icon="pi pi-shopping-cart"
        label="Comprar"
      />
      <Button class="p-button-text" icon="pi pi-heart" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Product } from '../types/interfaces';

const props = defineProps<{ product: Product }>();
</script>
