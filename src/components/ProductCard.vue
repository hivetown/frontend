<template>
  <Card>
    <template #content>
      <div class="row justify-space-evenly">
        <div class="flex xs12 md6 xl4">
          <div class="item">
            <Image :src="product.specification!.image" height="250" />
          </div>
        </div>
        <div class="flex xs12 md6 xl4">
          <div class="item">
            <h3>{{ product.specification!.name }}</h3>
            <p>{{ product.specification!.description }}</p>
            <p>{{ product.currentPrice }}€</p>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import Card from "primevue/card";
import Image from "primevue/image";

import { Product } from "../types/interfaces";

const props = defineProps<{ product: Product }>();
</script>
