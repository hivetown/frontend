<template>
  <h3>Consumidores</h3>
  <div class="card-container" v-if="users">
    <div v-for="idx in qtd" :key="idx">
		<b-card
  id="b-card"
  :title="users.items[idx - 1]?.user?.name || ''"
  :img-src="
    users.items[idx - 1]?.user?.image?.url
      ? users.items[idx - 1]?.user?.image?.url
      : '../../public/semimagem.png'
  "
  :img-alt="
    users.items[idx - 1]?.user?.image
      ? users.items[idx - 1]?.user?.image?.alt || 'sem imagem'
      : 'sem imagem'
  "
  img-top
  tag="article"
  style="max-width: 17rem"
  class="mb-2"
>

        <b-card-text>
          {{ users.items[idx - 1].user.email }} <br />
          <p v-if="users.items[idx-1].user.type==='CONSUMER'">Consumidor</p>
		  <p v-else>{{ users.items[idx - 1].user.type }}</p>
		  <p v-if="users.items[idx-1].deletedAt != null">Conta desativa</p>
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
<script setup lang="ts">
import Pagination from '../components/Pagination.vue';
import { getConsumers, getConsumersValues } from '../api/consumers';
import { onMounted, ref } from 'vue';
import { BaseItems, Consumer } from '@types';

const users = ref<BaseItems<Consumer>>();
const qtd = ref(0);
const page = ref(1);
const pageSize = ref(24);
const totalItems = ref(0);

onMounted(async () => {
  try {
    const responseItems = await getConsumersValues();
    page.value = responseItems.data.page;

    const urlSearchParams = new URLSearchParams(window.location.search);
    const pageParam = urlSearchParams.get('page');
    if (pageParam) {
			if (pageParam> responseItems.data.totalPages){
				page.value = responseItems.data.totalPages;
			}else{
				page.value = Number(pageParam);
			}
		}

    pageSize.value = responseItems.data.pageSize;
    totalItems.value = responseItems.data.totalItems;

    const response = await getConsumers(page.value, pageSize.value);
    users.value = response.data;
	qtd.value = Number(users.value?.items.length);
  } catch (error) {
    console.error(error);
  }
});

function onPageChanged(newPageNumber: number): void {
  page.value = newPageNumber;
  myFunction();
}

function myFunction(): void {
  const response = getConsumers(page.value, pageSize.value);
  response.then((res) => {
    users.value = res.data;
  });
}

function handlePageChange(value: number) {
  page.value = value;
}
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
