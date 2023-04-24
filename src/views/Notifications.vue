<template>
    <h1>Notificações</h1>
    <div class="notificacoes">
        <Notifications />
    </div>
  </template>
    
<script lang="ts">
import Notifications from '../components/Notifications.vue'
export default {
    components: {
        Notifications
    }
}
</script>
<style scoped>
.notificacoes {
  width: 900px;
  margin: auto;
}
h1 {
    text-align: center;
    margin: auto;
    font-family: 'DM Serif Display';
    margin-bottom: 10px;
}
@media only screen and (max-width: 600px) {
  .notificacoes{
      width: 300px;
  }
}
</style>
