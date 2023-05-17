<template>
  <h3>Produtores</h3>
  <div class="card-container">
    <div v-for="idx in qtd" :key="idx">
      <!--TODO trocar para users.image-->
      <b-card
        id="b-card"
        :title="users['items'][idx - 1]['name']"
        :img-src="users['items'][idx - 1]['image']['url']"
        :img-alt="users['items'][idx - 1]['image']['alt']"
        img-top
        tag="article"
        style="max-width: 17rem"
        class="mb-2"
      >
        <b-card-text>
          {{ users['items'][idx - 1]['email'] }} <br />
          {{ users['items'][idx - 1]['type'] }}
        </b-card-text>
        <b-button
          :href="'admin/producer/' + users['items'][idx - 1]['id']"
          class="custom-button"
          >Ver perfil</b-button
        >
      </b-card>
    </div>
  </div>
  <Pagination
    :total-rows="totalItems"
    :per-page="pageSize"
    :current-page="page"
  >
  </Pagination>
</template>

<script lang="ts">
import Pagination from '../components/Pagination.vue';
import { getProducers, getProducersValues } from '../api/producers';
import { onMounted, ref } from 'vue';
import { Consumer } from '../types/interfaces';
export default {
  components: { Pagination },
  setup() {
    const users = ref<Consumer[]>([]);
    const qtd = ref(0);
    const page = ref(1);
    const pageSize = ref(24);
    const totalItems = ref(0);
    onMounted(async () => {
      try {
        const responseItems = await getProducersValues();
        page.value = responseItems.data.page;
        pageSize.value = responseItems.data.pageSize;
        totalItems.value = responseItems.data.totalItems;
        const response = await getProducers(page.value, pageSize.value);
        users.value = response.data;
        qtd.value = users.value.items.length;
      } catch (error) {
        console.error(error);
      }
    });

    return { users, qtd, page, pageSize, totalItems };
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
#b-card {
  background-color: rgb(239, 243, 247);
}
.custom-button {
  background-color: #f1b24a; /* Cor de fundo personalizada */
  color: #ffffff; /* Cor do texto personalizada */
  /* Mais estilos personalizados aqui */
}
</style>
