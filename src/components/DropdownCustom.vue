<template>
  <div class="card flex justify-content-center">
    <Dropdown
      v-model="selectedView"
      editable
      :options="view"
      option-label="name"
      placeholder="Escolha o que deseja visualizar"
      class="w-full"
    />
  </div>
  <!-- A usar para os pedidos -->
  <!-- {{ selectedView.code }} -->
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Dropdown from 'primevue/dropdown';

const selectedView = ref();
const view = ref([
  { name: 'Número de encomendas', code: 'numeroEncomendas' },
  { name: 'Total de produtos comprados', code: 'totalProdutos' },
  { name: 'Total gasto em compras', code: 'comprasTotais' },
]);
</script>
