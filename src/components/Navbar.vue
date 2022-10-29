<template>
  <div
    class="py-1 grid justify-content-center bg-blue-100 border-bottom-2 border-blue-200"
  >
    <div class="col-1">
      <img :src="Logo" alt="logo" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from "../assets/vue.svg";
console.log("s");
</script>
