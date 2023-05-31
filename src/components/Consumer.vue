<template>
  <h3>Consumidores</h3>
  <div class="card-container">
    <div v-for="idx in qtd" :key="idx">
      <!--TODO trocar para users.image-->
      <b-card
        id="b-card"
        :title="users['items'][idx - 1]['user']['name']"
        :img-src="
          users['items'][idx - 1]['user']['image']
            ? users['items'][idx - 1]['user']['image']['url']
              ? users['items'][idx - 1]['user']['image']['url']
              : '../../public/semimagem.png'
            : '../../public/semimagem.png'
        "
        :img-alt="
          users['items'][idx - 1]['user']['image']
            ? users['items'][idx - 1]['user']['image']['alt']
              ? users['items'][idx - 1]['user']['image']['alt']
              : 'sem imagem'
            : 'sem imagem'
        "
        img-top
        tag="article"
        style="max-width: 17rem"
        class="mb-2"
      >
        <b-card-text>
          {{ users['items'][idx - 1]['user']['email'] }} <br />
          {{ users['items'][idx - 1]['user']['type'] }}
        </b-card-text>
        <b-button
          :href="'admin/consumer/' + users['items'][idx - 1]['user']['id']"
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
    @page-changed="onPageChanged"
  >
  </Pagination>
</template>

<script lang="ts">
import Pagination from '../components/Pagination.vue';
import { getConsumers, getConsumersValues } from '../api/consumers';
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
        const responseItems = await getConsumersValues();
        page.value = responseItems.data.page;
        const urlSearchParams = new URLSearchParams(window.location.search);
        page.value = parseInt(urlSearchParams.get('page'));
        pageSize.value = responseItems.data.pageSize;
        totalItems.value = responseItems.data.totalItems;
        const response = await getConsumers(page.value, pageSize.value);
        users.value = response.data;
        qtd.value = users.value.items.length;
      } catch (error) {
        console.error(error);
      }
    });
    return { users, qtd, page, pageSize, totalItems };
  },
  methods: {
    onPageChanged(newPageNumber: number): void {
      this.page = newPageNumber;
      this.myFunction(); // chame sua função aqui
    },
    myFunction(): void {
      // sua função aqui
      const response = getConsumers(this.page, this.pageSize);
      this.users = response.data;
    },
    handlePageChange(value: number) {
      this.page = value;
    },
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
