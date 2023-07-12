<template>
  <div class="account-disabled">
    <div class="sad-face">:(</div>
    <div class="text">Lamentamos vê-lo partir</div>
    <PrimeButton rounded class="mt-2" @click="goTo('/')"
      >Ir para o Início</PrimeButton
    >
  </div>
</template>

<script setup lang="ts">
import PrimeButton from 'primevue/button';
import { useRouter } from 'vue-router';

const router = useRouter();
const goTo = (path: string) => router.push(path);
</script>

<style scoped>
.account-disabled {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.sad-face {
  font-size: 10rem;
}

.text {
  font-size: 2rem;
}
</style>
