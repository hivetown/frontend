<template>
    <h3>Consumidores</h3>
    <div class="card-container">
    <div v-for="user in users" :key="user.id">
<!--TODO trocar para users.image-->
    <b-card
        :title="user.name"
        img-src="https://picsum.photos/600/300/?image=25" 
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 17rem;"
        class="mb-2"
    >
        <b-card-text>
        {{user.email}} <br> {{user.type}}
        </b-card-text>
        <b-button :href="'/consumer/' + user.id" variant="primary">Ver perfil</b-button>
    </b-card>
    </div>
    </div>
</template>

<script lang="ts">
import {getConsumers} from '../api/consumers'
import { onMounted, ref} from "vue";
import { Consumer } from "../types/interfaces";
export default {
  setup() {
    const users = ref<Consumer[]>([]);

    onMounted(async () => {
      try {
        const response = await getConsumers();
        users.value = response.data;
      } catch (error) {
        console.error(error);
      }
    });

    return { users };
  },
};
</script>
<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
  margin: -10px;
}

.card-container > div {
  margin: 25px;
}
</style>