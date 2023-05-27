<template>
<b-list-group>
                             <!-- _active mete a azul as nao lidas-->
        <b-list-group-item v-for="(notification, index) in notifications"
                           :key="index"
                           :href="notification.link"
                           :active="!notification.unread"
                           class="flex-column align-items-start">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{ notification.title }}</h5>
            <small>{{ notification.date }}</small>
          </div>
          <p class="mb-1">{{ notification.body }}</p>
          <small>{{ notification.footer }}</small>
        </b-list-group-item>
      </b-list-group>
  </template>
  
  <script>
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
      };
    },
    mounted() {
     // if (this.notifications.length > 0) {
      //  this.notifications[0].unread = false;
      //}
    },
  };
  </script>
