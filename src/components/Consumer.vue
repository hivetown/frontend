<template>
  <h3>Consumidores</h3>
  <div class="loading-spinner" v-if="isLoading">
    <Loader />
  </div>
  <div class="card-container" v-if="!isLoading && consumers">
    <div v-for="(consumer, idx) in consumers.items" :key="idx">
      <b-card
        id="b-card"
        :title="consumer.user.name"
        :img-src="
          consumer.user.image ? consumer.user.image.url : '/semimagem.png'
        "
        :img-alt="
          consumer.user.image
            ? consumer.user.image.alt
            : `Imagem de ${consumer.user.name}`
        "
        img-top
        tag="article"
        style="max-width: 17rem"
        class="mb-2"
      >
        <b-card-text>
          {{ consumer.user.email }} <br />
          <p v-if="consumer.user.type === 'CONSUMER'">Consumidor</p>
          <p v-else>{{ consumer.user.type }}</p>
          <p v-if="consumer.deletedAt != null">Conta desativa</p>
        </b-card-text>
        <PrimeButton @click="routeTo(`/admin/consumer/${consumer.user.id}`)"
          >Ver perfil</PrimeButton
        >
      </b-card>
    </div>
  </div>

  <Pagination
    v-if="consumers"
    :items="consumers"
    :page-size="currentFilters.pageSizeC"
    :page="currentFilters.pageC"
    @page-change="onPageChange"
  >
  </Pagination>
</template>
<script setup lang="ts">
import Loader from '@/components/Loader.vue';
import Pagination from '@/components/Pagination.vue';
import { onBeforeMount, ref, watch } from 'vue';
import { BaseItems, Consumer } from '@/types';
import { PageState } from 'primevue/paginator';
import { useRoute } from 'vue-router';
import PrimeButton from 'primevue/button';
import { fetchAllConsumers } from '@/api';
import { useRouter } from 'vue-router';

const isLoading = ref(true);
const consumers = ref<BaseItems<Consumer>>();
const route = useRoute();
const router = useRouter();
const currentFilters = ref({
  pageC: Number(route.query.pageC) || 1,
  pageSizeC: Number(route.query.pageSizeC) || 24,
  pageP: Number(route.query.pageP) || 1,
  pageSizeP: Number(route.query.pageSizeP) || 24,
});

watch(currentFilters.value, (newFilters) => {
  router.push({
    query: {
      ...newFilters,
    },
  });
});

const loadConsumers = async () => {
  isLoading.value = true;

  try {
    const response = await fetchAllConsumers({
      page: currentFilters.value.pageC,
      pageSize: currentFilters.value.pageSizeC,
      includeAll: true,
    });

    consumers.value = response.data;
  } finally {
    isLoading.value = false;
  }
};

onBeforeMount(loadConsumers);

const onPageChange = async (page: Partial<PageState>) => {
  if (page.page) {
    currentFilters.value.pageC = page.page + 1;
  }

  if (page.rows) {
    currentFilters.value.pageSizeC = page.rows;
  }

  await loadConsumers();
};

const routeTo = (path: string) => {
  router.push(path);
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
  height: 400px;
}
</style>
