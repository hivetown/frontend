<template>
  <div>
    <div class="d-flex mb-4 mt-3 w-75">
      <span class="me-2 grey-txt">{{ minValue }}€</span>
      <b-form-input id="range-input" v-model="value" type="range" :min="minValue" :max="maxValue" />
      <span class="ms-2 grey-txt">{{ maxValue }}€</span>
    </div>
    <div class="d-flex" style="gap:0.2em; border-bottom: 1px solid #f3f3f3; ">
      <b-form-input class="rounded-pill" id="min-input" v-model="minValue" type="number" placeholder="€ mín" />
      <span class="py-1 grey-txt">-</span>
      <b-form-input class="rounded-pill mb-4" id="max-input" v-model="maxInputValue" type="number" placeholder="€ máx" />
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: 100,
        minValue: 0,
        maxValue: this.maxPrice.maxPrice,
        maxInputValue: this.maxPrice.maxPrice,
      };
    },
     props: {
      maxPrice: {
        type: Number,
        required: true,
      },
    },
    mounted() {
      const rangeInput = document.getElementById("range-input");
      const maxInput = document.getElementById("max-input");

      rangeInput.addEventListener("input", (event) => {
        const value = parseInt(event.target.value);
        if (value >= this.minValue && value <= this.maxValue) {
          this.value = value;
          maxInput.value = value;
        }
      });

      maxInput.addEventListener("input", (event) => {
        const value = parseInt(event.target.value);
        if (value >= this.minValue && value <= this.maxValue) {
          this.value = value;
          rangeInput.value = value;
        } else {
          event.target.value = this.maxInputValue;
        }
      });
    },
  };
</script>

<style>
#min-input,
#max-input {
    border: solid 1px #e9e9e9 !important;
    width: 28%;
    height: 80%;
    color: #5a5a5a;
    font-size: 1.5vh;
  }

  #min-input::placeholder,
  #max-input::placeholder {
    color: #a9a9a9;
  }
</style>