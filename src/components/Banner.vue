<template>
  <div>
    <b-card class="mx-auto rounded-xl banner" flat overlay img-src="c1.svg">
      <template #img>
        <img src="/c1.svg" alt="Banner" class="img-fluid d-none d-md-block" />
        <img src="/bra.svg" alt="Mobile Banner" class="img-fluid d-md-none" />
      </template>
      <div class="d-flex justify-content-center align-items-center h-100 teste">
        <div class="col-sm-10 col-md-8 col-lg-4 max-height-130">
          <div class="d-flex flex-column">
            <h1 class="main-title text-center">
              Descubra o melhor da sua colmeia!
            </h1>
            <p class="text-center grey-txt other-text-banner">
              Encontre os melhores produtos da sua comunidade local
            </p>
            <form @submit="submitSearch">
              <b-form-input
                class="rounded-pill search search-mobile"
                type="search"
                placeholder=" Pesquisar"
                v-model="search"
              />
            </form>
          </div>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const search = ref('');
const submitSearch = ($e: Event) => {
  $e.preventDefault();

  if (search.value) {
    router.push({ path: '/products', query: { search: search.value } });
  }
};
</script>

<style scoped>
form {
  padding: 0 !important;
}
.search {
  border: solid 2px #f1b24a !important;
  display: block;
  margin: auto;
}

.main-title {
  color: #164a41;
  font-weight: 600;
  font-family: 'DM Serif Display', serif;
}

.max-height-130 {
  max-height: 130%;
}

@media (max-width: 767px) {
  .main-title {
    font-size: 2rem;
    max-width: 75%;
    display: block;
    margin: auto;
    margin-top: 4%;
  }

  .other-text-banner {
    display: none;
  }

  .search-mobile {
    margin-top: 2vh;
    max-width: 80%;
  }
}
</style>
