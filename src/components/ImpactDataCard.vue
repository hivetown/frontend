<template>
  <div class="impact-data-card" :style="{ 'background-color': color }">
    <div class="p-2">
      <div class="d-flex justify-content-center mb-2">
        <div class="d-flex gap-2 justify-content-center py-1 data-card-icon">
          <i
            :class="icon"
            style="font-size: 2.1vh; margin-bottom: 2%; color: white"
          ></i>
        </div>
      </div>

      <!-- number -->
      <div v-if="value && title" class="text-container">
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

      <div v-if="cancelValue" class="cancel-txt">
        <p
          v-if="textCancel == 'Dinheiro devolvido:'"
          style="font-size: 0.95em"
          class="text-center"
        >
          {{ textCancel }} {{ cancelValue }} €
        </p>
        <p v-else style="font-size: 0.95em" class="text-center">
          {{ textCancel }} {{ cancelValue }}
        </p>
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

<style scoped>
.data-card-icon {
  border-radius: 50%;
  width: 4vh;
  height: 4vh;
  border: 1px solid white;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
  display: block;
  margin: auto;
}

@media (max-width: 767px) {
  .text-container {
    max-width: 100% !important;
    /* background-color: blue; */
    min-height: 10vh !important;
  }
  h1 {
    font-size: 1em;
  }
  p {
    font-size: 0.7em;
  }
  .cancel-txt {
    margin-top: 2vh;
    width: 100% !important;
    /* background-color: green; */
    font-size: 0.8em !important;
  }
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
    textCancel: {
      type: String,
      required: false,
      default: '',
    },
    cancelValue: {
      type: Number,
      required: false,
      default: undefined,
    },
  },
};
</script>
