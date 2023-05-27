<template>
  <b-list-group>
    <b-list-group-item
      v-for="num in orderItem['totalItems']"
      :key="num"
      :active="orderItem[num - 1] && orderItem[num - 1].readAt === null"
      class="flex-column align-items-start"
    >
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">{{ orderItem["items"][num - 1]["title"] }}</h5>
        <small>{{ orderItem["items"][num - 1]["createdAt"] }}</small>
      </div>
      <p class="mb-1">{{ orderItem["items"][num - 1]["message"] }}</p>
    </b-list-group-item>
  </b-list-group>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue';
import {
  getUnreadNotifications,
  getAllNotifications,
} from '../api/notifications';
const orderItem = ref([]);
const quantidade = ref([]);
export default {
  data() {
    return {
      notifications: [
        {
          title: 'Notification 1',
          body: 'Body of notification 1',
          footer: 'Footer of notification 1',
          date: '3 days ago',
          link: '#',
          unread: true,
        },
        {
          title: 'Notification 2',
          body: 'Body of notification 2',
          footer: 'Footer of notification 2',
          date: '2 days ago',
          link: '#',
          unread: true,
        },
        {
          title: 'Notification 3',
          body: 'Body of notification 3',
          footer: 'Footer of notification 3',
          date: '1 day ago',
          link: '#',
          unread: false,
        },
      ],
      orderItem,
    };
  },
  mounted() {
    getAllNotifications()
      .then((responseItem) => {
        orderItem.value = responseItem.data;
        quantidade.value = responseItem.data.totalItems;
      })
      .catch((error) => {
        console.error(error);
        // Lide com o erro aqui
      });
    // if (this.notifications.length > 0) {
    //  this.notifications[0].unread = false;
    //}
  },
};
</script>
