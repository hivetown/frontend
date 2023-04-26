<template>
  <!-- MUDAR O NOME DA CLASSE DO SCROLL-TOP -->
  <div>
    <!-- <b-button @click="scrollToTop" class="scroll-top-btn" variant="primary"> -->
    <!-- <b-button @click="showSearch = !showSearch" class="scroll-top-btn"> -->
    <b-button @click="showModal" class="scroll-top-btn d-none d-lg-block">
      <i class="bi bi-search"></i>
    </b-button>
    <!-- Restante do seu conteúdo aqui -->
    <b-collapse v-model="showSearch">
      <form class="d-flex">
        <input
          class="form-control me-2"
          type="search"
          placeholder="Pesquisar"
          aria-label="Pesquisar"
        />
        <button class="btn btn-outline-success" type="submit">Pesquisar</button>
      </form>
    </b-collapse>
  </div>

  <div>
    <!-- <b-button variant="primary" @click="showModal">Launch demo modal</b-button> -->
    <b-modal v-model="show" centered>
      <div class="d-block">
        <p>O que procura?</p>
        <input
          class="form-control me-2 rounded-pill"
          type="search"
          placeholder="Pesquisar"
          aria-label="Pesquisar"
        />
        <!-- <button class="btn btn-outline-success" type="submit">Pesquisar</button> -->
        <!-- <b-button variant="primary" class="mt-3" @click="closeModal">Pesquisar</b-button> -->
      </div>
    </b-modal>
  </div>
</template>

<style>
.scroll-top-btn {
  position: fixed !important;
  background-color: #5a5a5a !important;
  bottom: 1rem;
  right: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  border-radius: 100% !important;
  border: none !important;
  /* box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px; */
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  transition: opacity 0.3s ease-in-out;
  opacity: 0;
  z-index: 9999;
  color: #f1f1f1 !important;
}

.show-scroll-top-btn .scroll-top-btn {
  opacity: 1;
}

.modal .btn-secondary {
  background-color: #dc6942 !important;
  border: solid 1px #dc6942 !important;
}

.modal .btn-primary {
  background-color: #4d774e !important;
  border: solid 1px #4d774e !important;
}
</style>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'ShowSearch',
  setup() {
    const showScrollTopBtn = ref(false);

    const checkScrollPosition = () => {
      showScrollTopBtn.value = window.pageYOffset > 0;
    };

    const showSearch = ref(false);

    watch(showScrollTopBtn, (newValue) => {
      if (newValue) {
        document.body.classList.add('show-scroll-top-btn');
      } else {
        document.body.classList.remove('show-scroll-top-btn');
      }
    });

    // const scrollToTop = () => {
    //   window.scrollTo({ top: 0, behavior: 'smooth' });
    // };

    const show = ref(false);

    function showModal() {
      show.value = true;
    }

    function closeModal() {
      show.value = false;
    }

    window.addEventListener('scroll', checkScrollPosition);

    return {
      showScrollTopBtn,
      //   scrollToTop,
      showSearch,

      show,
      showModal,
      closeModal,
    };
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.checkScrollPosition);
  },
});
</script>
