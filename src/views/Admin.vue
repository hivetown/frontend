<template>
  <h1 class="dgreen-txt">Utilizadores</h1>
  <b-tabs v-model="activeTab" class="parent mt-5">
    <b-tab title="Consumidores" @click="activateFirstTab">
      <div class="parent">
        <Consumer></Consumer>
      </div>
    </b-tab>
    <b-tab title="Produtores" @click="activateSecondTab">
      <div class="parent">
        <Producer></Producer>
      </div>
    </b-tab>
  </b-tabs>
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
      activeTab: 0, // Índice da aba ativa
    };
  },
  mounted() {
    const lastActiveTab = localStorage.getItem('lastActiveTab');
    if (lastActiveTab !== null) {
      this.activeTab = parseInt(lastActiveTab);
    }
  },
  methods: {
    activateFirstTab() {
      this.activeTab = 0;
      localStorage.setItem('lastActiveTab', this.activeTab.toString());
    },
    activateSecondTab() {
      this.activeTab = 1;
      localStorage.setItem('lastActiveTab', this.activeTab.toString());
    },
  },
};
</script>

<style scoped>
h1 {
  font-family: 'DM Serif Display';
  text-align: center;
}
.consumer,
.producer {
  margin-left: 25px;
  margin-right: 25px;
}
</style>
