<template>
  <div>
    <!-- Slider -->
    <div class="d-flex mb-4 mt-3 w-75">
      <span class="me-2 grey-txt">{{ minValue }}€</span>
      <b-form-input
        id="range-input"
        v-model="value"
        type="range"
        :min="minValue"
        :max="maxValue"
      />
      <span class="ms-2 grey-txt">{{ maxValue }}€</span>
    </div>
	
	<!-- Inputs de valor -->
    <div class="d-flex" style="gap: 0.2em; border-bottom: 1px solid #f3f3f3">
      <b-form-input
        class="rounded-pill"
        id="min-input"
		v-model="minValue"
        type="number"
        placeholder="€ mín"
		min="0" 
		:max="maxInputValue - 1" 
      />
      <span class="py-1 grey-txt">-</span>
      <b-form-input
        class="rounded-pill mb-4"
        id="max-input"
		v-model="maxInputValue" 
        type="number"
        placeholder="€ máx"
      />
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    data() {
      return {
        value: 100, // Valor do slider quando a página é carregada
        minValue: 0,
        //  maxValue: 0,
        // maxInputValue: null,

        // TODO - por o preço a funcionar 
        maxValue: this.maxPrice ? this.maxPrice.maxPrice : 0,
        maxInputValue: this.maxPrice ? this.maxPrice.maxPrice : null,
        // maxValue: this.maxPrice.maxPrice,
        // maxInputValue: this.maxPrice.maxPrice,
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
      const minInput = document.getElementById("min-input");

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
        } else if (value < this.minValue) {
          event.target.value = this.minValue;
        } else if (value > this.maxValue) {
          event.target.value = this.maxValue;
        }
      });
      minInput.addEventListener("input", (event) => {
        const value = parseInt(event.target.value);
        if (value < 0) {
          event.target.value = 0;
        }
        this.minValue = value;
        rangeInput.min = value;
      });
    },
  };
</script>



<style>
  /* Bolinha do preço ////////////////////////////////////// */
  /* Para navegadores Webkit */
  #range-input::-webkit-slider-thumb {
    background-color: #F1B24A;
  }

  /* Para navegadores Gecko */
  #range-input::-moz-range-thumb {
    background-color: #F1B24A;
  }

  /* Para navegadores que suportem ambas as pseudo-classes */
  #range-input::-webkit-slider-thumb,
  #range-input::-moz-range-thumb {
    background-color: #F1B24A;
  }

  input[type="range"]:focus::-webkit-slider-thumb {
    box-shadow: 0 0 0 0.2rem rgba(241, 178, 74, 0.25) !important;
  }
  /* ////////////////////////////////////////////////////// */

  /* Inputs do preço */
  #min-input,
  #max-input {
    border: solid 1px #e9e9e9 !important;
    width: 28%;
    height: 80%;
    color: #5a5a5a;
    font-size: 1.5vh;
  }

  #min-input:focus,
  #max-input:focus {
    box-shadow: 0 0 0 0.2rem rgba(241, 178, 74, 0.25) !important;
  }

  #min-input::placeholder,
  #max-input::placeholder {
    color: #a9a9a9;
  }
</style>
