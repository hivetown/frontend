<template>
  <h1>Utilizadores</h1>
  <div class="botoes">
    <h6>Mostrar resultados para:</h6>
    <div style="display: inline-block">
      <input
        style="display: inline-block"
        type="radio"
        id="option1"
        name="options"
        v-model="selectedOption"
        value="option1"
        checked
      />
      <label style="display: inline-block; font-size: 12px" for="option1">
        Todos os utilizadores</label
      >
    </div>
    <div>
      <input
        style="display: inline-block"
        type="radio"
        id="option2"
        name="options"
        v-model="selectedOption"
        value="option2"
      />
      <label style="display: inline-block; font-size: 12px" for="option2">
        Apenas consumidores</label
      >
    </div>
    <div>
      <input
        style="display: inline-block"
        type="radio"
        id="option3"
        name="options"
        v-model="selectedOption"
        value="option3"
      />
      <label style="display: inline-block; font-size: 12px" for="option3">
        Apenas produtores</label
      >
      <br />
    </div>
  </div>
  <div
    class="consumer"
    v-if="selectedOption === 'option1' || selectedOption === 'option2'"
  >
    <Consumer></Consumer>
  </div>
  <div
    class="producer"
    v-if="selectedOption === 'option1' || selectedOption === 'option3'"
  >
    <Producer></Producer>
  </div>
</template>

<script lang="ts">
import Consumer from '../components/Consumer.vue';
import Producer from '../components/Producer.vue';
export default {
  components: {
    Consumer,
    Producer,
  },
  data() {
    return {
      selectedOption: 'option1',
    };
  },
};
</script>
<style scoped>
h6 {
  margin-left: 20px;
}
h1 {
  font-family: 'DM Serif Display';
  text-align: center;
}
.consumer,
.producer {
  margin-left: 25px;
  margin-right: 25px;
}
.botoes {
  margin-bottom: 10px;
}
input[type='radio']:checked {
  background: #2196f3;
}
input {
  appearance: none;
  -webkit-appearance: none;
  width: 14px;
  height: 14px;
  margin-left: 20px;
  margin-right: 10px;
  border-radius: 50%;
  background: #e8e8e8;
  border: 2px solid #fff;
  padding: 0;

  /* The outline will be the outer circle */
  outline: 1px solid #999;
}
</style>
