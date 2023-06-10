<template>
  <div id="notificacoes">
    <div id="popup" class="sticky-bar" v-if="showPopup">
      <h5>Notificações</h5>
      <div class="content">
        <p v-if="orderItem.totalItems == 0">Não existem notificações novas.</p>
        <b-list-group v-else>
          <b-list-group-item
            v-for="num in orderItem['totalItems']"
            :key="num"
            href="/notifications?page=1"
            :active="true"
            class="flex-column align-items-start"
          >
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{{ orderItem['items'][num - 1]['title'] }}</h5>
              <small>{{ orderItem['items'][num - 1]['createdAt'] }}</small>
            </div>
            <p class="mb-1">{{ orderItem['items'][num - 1]['message'] }}</p>
            <hr />
          </b-list-group-item>
          <hr />
        </b-list-group>
      </div>
      <a id="not" href="/notifications?page=1">Ver todas</a>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue';
import {
  getUnreadNotifications,
  getAllNotifications,
} from '../api/notifications';
const orderItem = ref([]);
export default {
  data() {
    return {
      orderItem,
      showPopup: true,
    };
  },
  mounted() {
    getUnreadNotifications()
      .then((responseItem) => {
        orderItem.value = responseItem.data;
      })
      .catch((error) => {
        console.error(error);
        // Lide com o erro aqui
      });
    // if (this.notifications.length > 0) {
    //  this.notifications[0].unread = false;
    //}
  },
  methods: {
    openPopup() {
      this.showPopup = true;
    },
    closePopup() {
      this.showPopup = false;
    },
  },
};
</script>

<style scoped>
hr {
  color: black;
}
#popup {
  border-radius: 1%;
  position: absolute;
  top: 64%;
  right: 1%;
  width: 500px;
  background-color: #f3f3f3;
  border: 1px solid #ccc;
  padding: 10px;
  z-index: 9999;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

#popup h5 {
  margin-top: 0;
}

.sticky-bar {
  position: sticky;
  top: 0;
  /* Prefixos do navegador */
  position: -webkit-sticky;
  position: -moz-sticky;
  position: -ms-sticky;
  z-index: 2;
  overflow-y: auto; /* Habilita a rolagem vertical */
  max-height: 500px; /* Define a altura máxima da barra */
}

.content {
  margin-top: 20px; /* Ajuste para a altura da barra sticky */
}

.active {
  background-color: #d3e3e6 !important; /* Define a cor de fundo para as notificações não lidas */
  border-color: #d3e3e6 !important;
}
</style>
