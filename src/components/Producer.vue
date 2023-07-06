<template>
  <h3>Produtores</h3>
  <div class="loading-spinner" v-if="isLoading">
    <ProgressSpinner
      style="width: 50px; height: 50px"
      stroke-width="8"
      fill="var(--surface-ground)"
      animation-duration=".5s"
      aria-label="Loading Product specifications"
    />
  </div>
  <div class="card-container" v-if="!isLoading && producers">
    <div v-for="(producer, idx) in producers.items" :key="idx">
      <b-card
        id="b-card"
        :title="producer.user.name"
        :img-src="
          producer.user.image ? producer.user.image.url : '/semimagem.png'
        "
        :img-alt="
          producer.user.image
            ? producer.user.image.alt
            : `Imagem de ${producer.user.name}`
        "
        img-top
        tag="article"
        style="max-width: 17rem"
        class="mb-2"
      >
        <b-card-text>
          {{ producer.user.email }} <br />
          <p v-if="producer.user.type === 'PRODUCER'">Produtor</p>
          <p v-else>{{ producer.user.type }}</p>
          <p v-if="producer.deletedAt != null">Conta desativa</p>
        </b-card-text>
        <PrimeButton @click="routeTo(`/admin/producer/${producer.user.id}`)"
          >Ver perfil</PrimeButton
        >
      </b-card>
    </div>
  </div>

  <Pagination
    v-if="producers"
    :items="producers"
    :page-size="currentFilters.pageSizeP"
    :page="currentFilters.pageP"
    @page-change="onPageChange"
  >
  </Pagination>
</template>
<script setup lang="ts">
import ProgressSpinner from 'primevue/progressspinner';
import Pagination from '@/components/Pagination.vue';
import { onBeforeMount, ref, watch } from 'vue';
import { BaseItems, Producer } from '@/types';
import { PageState } from 'primevue/paginator';
import { useRoute } from 'vue-router';
import PrimeButton from 'primevue/button';
import { fetchAllProducers } from '@/api';
import { useRouter } from 'vue-router';

const isLoading = ref(true);
const producers = ref<BaseItems<Producer>>();
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

const loadProducers = async () => {
  isLoading.value = true;

  try {
    const response = await fetchAllProducers({
      page: currentFilters.value.pageP,
      pageSize: currentFilters.value.pageSizeP,
      includeAll: true,
    });

    producers.value = response.data;
  } finally {
    isLoading.value = false;
  }
};

onBeforeMount(loadProducers);

const onPageChange = async (page: Partial<PageState>) => {
  if (page.page) {
    currentFilters.value.pageP = page.page + 1;
  }

  if (page.rows) {
    currentFilters.value.pageSizeP = page.rows;
  }

  await loadProducers();
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
