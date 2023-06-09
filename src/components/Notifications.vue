<template>
  <b-list-group>
    <b-list-group-item
      v-for="num in orderItem['totalItems']"
      :key="num"
      :active="orderItem['items'][num - 1]['readAt'] == null"
      class="flex-column align-items-start"
    >
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">{{ orderItem['items'][num - 1]['title'] }}</h5>
        <small>{{ orderItem['items'][num - 1]['createdAt'] }}</small>
      </div>
      <p class="mb-1">{{ orderItem['items'][num - 1]['message'] }}</p>
      <small
        v-if="orderItem['items'][num - 1]['readAt'] == null"
        @click="marcarComoLida(orderItem['items'][num - 1]['id'])"
      >
        <u>Marcar como lida</u>
      </small>

      <small
        v-else
        @click="marcarComoNaoLida(orderItem['items'][num - 1]['id'])"
      >
        <u>Marcar como não lida</u></small
      >
    </b-list-group-item>
  </b-list-group>
</template>
<script lang="ts">
import { ref } from 'vue';
import {
  postRead,
  postUnread,
  getAllNotifications,
} from '../api/notifications';

const orderItem = ref([]);
const quantidade = ref([]);
let intervalId = null; // Variável para armazenar o ID do intervalo

export default {
  data() {
    return {
      orderItem,
    };
  },
  async mounted() {
    await this.loadNotifications();
    this.startAutoReload(); // Inicia o recarregamento automático
  },
  beforeUnmount() {
    this.stopAutoReload(); // Para o recarregamento automático antes de desmontar o componente
  },
  methods: {
    async loadNotifications() {
      try {
        const responseItem = await getAllNotifications();
        orderItem.value = responseItem.data;
        quantidade.value = responseItem.data.totalItems;
      } catch (error) {
        console.error(error);
      }
    },
    async marcarComoLida(id) {
      await postRead(id);
      await this.reloadPage();
    },
    async marcarComoNaoLida(id) {
      await postUnread(id);
      await this.reloadPage();
    },
    async reloadPage() {
      const scrollPosition = window.scrollY || window.pageYOffset;
      try {
        await new Promise((resolve) => setTimeout(resolve, 500)); // Aguarda 500ms (opcional)
        await this.loadNotifications();
        window.scrollTo(0, scrollPosition);
      } catch (error) {
        console.error(error);
      }
    },
    startAutoReload() {
      intervalId = setInterval(() => {
        this.loadNotifications();
      }, 5000);
    },
    stopAutoReload() {
      clearInterval(intervalId);
    },
  },
};
</script>
