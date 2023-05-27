<template>
    <div  id="notificacoes">
      <div id="popup" class="sticky-bar" v-if="showPopup">
        <h5>Notificações</h5>
        
        <div class="content" >
        <b-list-group>
        <!-- _active mete a azul as nao lidas-->
        <b-list-group-item v-for="(notification, index) in notifications"
                           :key="index"
                           href="/notifications"
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
        </div>
        <a id="not" href="/notifications">Ver todas</a>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        showPopup: true,
        notifications: [
          {
            title: 'Notification 1',
            body: 'Body of notification 1',
            footer: 'Footer of notification 1',
            date: '3 days ago',
            unread: true,
          },
          {
            title: 'Notification 2',
            body: 'Body of notification 2',
            footer: 'Footer of notification 2',
            date: '2 days ago',
            unread: true,
          },
          {
            title: 'Notification 3',
            body: 'Body of notification 3',
            footer: 'Footer of notification 3',
            date: '1 day ago',
            unread: false,
          },
        ],
      };
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
    border-radius:1%;
    position: absolute;
    top: 64%;
    right: 12%;
    width: 400px;
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
  z-index: 2 ;
}
.content {
  margin-top: 20px; /* adjust to the height of your sticky bar */
}
.active {
  background-color: #d3e3e6 !important; /* set the background color for unread notifications */
  border-color:  #d3e3e6 !important;
}
 
  </style>
  