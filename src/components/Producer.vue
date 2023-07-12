<template>
  <!-- <h3>Produtores</h3> -->
  <div v-if="isLoading">
    <Loader />
  </div>
  <div class="card-container mt-5" v-if="!isLoading && producers">
    <div v-for="(producer, idx) in producers.items" :key="idx">
      <!-- <b-card
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
      </b-card> -->
      <div class="card flex align-items-center justify-content-center">
        <Card style="width: 18em">
          <template #header>
            <img
              style="
                object-fit: cover !important;
                object-position: top !important;
                width: 100%;
                border-radius: 0.375rem 0.375rem 0 0;
              "
              :src="
                producer.user.image ? producer.user.image.url : '/semimagem.png'
              "
              :alt="
                producer.user.image
                  ? producer.user.image.alt
                  : `Imagem de ${producer.user.name}`
              "
            />
          </template>
          <template #title>
            <span style="font-size: 0.9em !important">{{
              producer.user.name
            }}</span>
          </template>
          <template #subtitle>
            <p v-if="producer.user.type === 'PRODUCER'">Produtor</p>
            <p v-else>{{ producer.user.type }}</p>
            <p v-if="producer.deletedAt != null">Conta desativa</p>
          </template>
          <template #content>
            <div style="height: 5vh">
              <span style="font-size: 0.8em">{{ producer.user.email }}</span>
            </div>
          </template>
          <template #footer>
            <PrimeButton
              rounded
              @click="routeTo(`/admin/producer/${producer.user.id}`)"
              >Ver perfil</PrimeButton
            >
          </template>
        </Card>
      </div>
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
import Loader from '@/components/Loader.vue';
import Pagination from '@/components/Pagination.vue';
import { onBeforeMount, ref, watch } from 'vue';
import { BaseItems, Producer } from '@/types';
import { PageState } from 'primevue/paginator';
import { useRoute } from 'vue-router';
import PrimeButton from 'primevue/button';
import Card from 'primevue/card';
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
  /* margin: -10px; */
  /* background-color: green; */
  justify-content: center;
}

.card-container > div {
  margin: 25px;
}
#b-card {
  background-color: rgb(239, 243, 247);
  height: 400px;
}

.card-text {
  font-size: 0.8em !important;
}
</style>
