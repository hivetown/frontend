<template>
  <div :class="['error-popup', type === 'error' ? 'error' : 'warning']">
    {{ message }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'error',
      validator: (value: string) => ['error', 'warning'].includes(value),
    },
  },
});
</script>

<style scoped>
.error-popup {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  color: rgb(0, 0, 0);
  font-size: 16px;
  border-radius: 4px;
}

.error {
  background-color: #ed1c1c;
}

.warning {
  background-color: #ecbc00;
}
</style>
