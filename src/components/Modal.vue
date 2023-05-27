<template>
  <div id="notificacoes">
    <div id="popup" class="sticky-bar" v-if="showPopup">
      <h5>Notificações</h5>
      <div class="content">
        <b-list-group>
          <!-- _active mete a azul as nao lidas-->
          <b-list-group-item
            v-for="num in orderItem['totalItems']"
            :key="num"
            href="/notifications"
            :active="true"
            class="flex-column align-items-start"
          >
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{{ orderItem["items"][num - 1]["title"] }}</h5>
              <small>{{ orderItem["items"][num - 1]["createdAt"] }}</small>
            </div>
            <p class="mb-1">{{ orderItem["items"][num - 1]["message"] }}</p>
            <hr />
          </b-list-group-item>
          <hr />
        </b-list-group>
      </div>
      <a id="not" href="/notifications">Ver todas</a>
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
        console.log(orderItem.value);
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
<style>
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

#popup h2 {
  margin-top: 0;
}

#popup ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

#popup li {
  margin-bottom: 5px;
}

#popup button {
  margin-top: 10px;
}
.sticky-bar {
  position: sticky;
  top: 0;
  /* Prefixos do navegador */
  position: -webkit-sticky;
  position: -moz-sticky;
  position: -ms-sticky;
  z-index: 2;
}
.content {
  margin-top: 20px; /* adjust to the height of your sticky bar */
}
.active {
  background-color: #d3e3e6 !important; /* set the background color for unread notifications */
  border-color: #d3e3e6 !important;
}
</style>
