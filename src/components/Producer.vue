<template>
    <h3>Produtores</h3>
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

        <b-button href="#" variant="primary">Ver perfil</b-button>
    </b-card>
    </div>
    </div>
</template>

<script lang="ts">
import {getProducers} from '../api/producers'
import { onMounted, ref} from "vue";
import { Producer } from "../types/interfaces";
export default {
  setup() {
    const users = ref<Producer[]>([]);

    onMounted(async () => {
      try {
        const response = await getProducers();
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