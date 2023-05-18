<template>
  <div class="d-flex gap-4"></div>
</template>

<script lang="ts">
import { getUnit } from '@api';
export default {
  data() {
    return {};
  },

  props: {},

  methods: {
    getProdUnit(producerId: number, unitId: number) {
      getUnit(producerId, unitId);
    },
  },
};
</script>
