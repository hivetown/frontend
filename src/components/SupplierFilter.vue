<template>
  <!-- TODO fazer de forma recursiva para ir buscar as outras páginas -->
  <div>
    <!-- <b-form-input
      class="mt-3 mb-3 light-search"
      type="search"
      placeholder="Pesquisar fornecedores"
    /> -->

    <p class="producer-txt mb-1 parent">
      {{ producerAmount }} fornecedores encontrados:
    </p>
    <div class="option-list">
      <b-form-group v-slot="{ ariaDescribedby }">
        <b-form-checkbox
          v-for="poducer in allProducers"
          v-model="selected"
          :key="poducer.user.id"
          :value="poducer.user.name"
          :aria-describedby="ariaDescribedby"
          name="flavour-3a"
        >
          {{ poducer.user.name }}
        </b-form-checkbox>
      </b-form-group>
    </div>
  </div>
</template>

<style>
.option-list {
  padding: 4px;
  max-height: 20vh;
  overflow-y: auto;
  color: #5a5a5a;
}

.light-search:focus {
  box-shadow: 0 0 0 0.2rem rgba(241, 178, 74, 0.25) !important;
}

.producer-txt {
  font-size: 0.9rem;
  color: #5a5a5a;
}
</style>

<script lang="ts">
import { fetchAllProducers } from '@/api';
import { Producer } from '@/types';
export default {
  data() {
    return {
      allProducers: [] as Producer[],
      producerAmount: 0 as number,
      selected: [], // Must be an array reference!
    };
  },

  async beforeMount() {
    // Carrega apenas a primeira página de produtores
    const allProducers = await fetchAllProducers(1);
    this.allProducers = allProducers.data.items;
    this.producerAmount = allProducers.data.totalItems;
  },
};
</script>
