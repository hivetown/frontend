<template>
  <div class="error-popup">
    {{ message }}
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    message: {
      type: String,
      required: true
    }
  }
})
</script>

<style scoped>
.error-popup {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  background-color: #ff0000;
  color: #fff;
  font-size: 16px;
  border-radius: 4px;
}
</style>
