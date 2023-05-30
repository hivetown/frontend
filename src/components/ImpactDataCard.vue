<template>
  <div class="impact-data-card" :style="{ 'background-color': color }">
    <div class="p-2">
      <div class="d-flex justify-content-center mb-2">
        <div
          class="d-flex gap-2 justify-content-center py-1"
          style="
            border-radius: 50%;
            width: 18%;
            border: 1px solid white;
            box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
          "
        >
          <i
            :class="icon"
            style="font-size: 2.1vh; margin-bottom: 2%; color: white"
          ></i>
        </div>
      </div>

      <!-- number -->
      <div v-if="value && title">
        <h1
          v-if="title === 'Total gasto'"
          class="text-center"
          style="color: white"
        >
          {{ value }}€
        </h1>
        <h1 v-else class="text-center" style="color: white">{{ value }}</h1>
        <!-- title -->
        <p class="text-center py-2" style="color: white">{{ title }}</p>
      </div>
      <div v-else>
        <h1 class="text-center" style="color: white">-</h1>
        <!-- title -->
        <p class="text-center py-2" style="color: white">{{ title }}</p>
      </div>

      <div class="d-flex gap-2 justify-content-center py-5">
        <!-- <i :class="icon"></i> -->
        <!-- <p class="grey-txt">{{ title }}</p> -->
      </div>
    </div>
  </div>
</template>

<style>
.impact-data-card {
  height: 18vh;
  width: 27vh;
  border-radius: 1vh;
  padding: 1vh;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
}
</style>

<script lang="ts">
export default {
  props: {
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: false,
      default: '#F1B24A',
    },
  },
};
</script>
