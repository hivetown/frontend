<template>
  <!-- Botão de pesquisa -->
  <div>
    <b-button @click="showModal" class="show-search-btn d-none d-lg-block">
      <i class="bi bi-search"></i>
    </b-button>
  </div>

  <!-- Conteúdo do modal -->
  <div>
    <b-modal v-model="show" centered>
      <div class="d-block parent">
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
.show-search-btn {
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
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  transition: opacity 0.3s ease-in-out;
  opacity: 0;
  z-index: 9999;
  color: #f1f1f1 !important;
}

.show-show-search-btn .show-search-btn {
  opacity: 1;
}

.modal .btn-secondary {
  background-color: #dc6942 !important;
  border: solid 1px #dc6942 !important;
  border-radius: 1.3em;
  width: 9vh;
}

.modal .btn-primary {
  background-color: #4d774e !important;
  border: solid 1px #4d774e !important;
  border-radius: 1.3em;
  width: 9vh;
}

.modal-header {
  border-bottom: none !important;
}

.modal-footer {
  border-top: none !important;
}

input[type='search']:focus {
  border: none !important;
  box-shadow: 0 0 0 0.2rem rgba(241, 178, 74, 0.25) !important;
}
</style>

<script lang="ts">
import { defineComponent, onUnmounted, ref, watch } from 'vue';
export default defineComponent({
  name: 'ShowSearch',

  setup() {
    const showSearchBtn = ref(false);
    const showSearch = ref(false);
    const show = ref(false);
    // const checkScrollPosition = () => {
    //   showSearchBtn.value = window.pageYOffset > 0;
    // };
    function checkScrollPosition() {
      showSearchBtn.value = window.pageYOffset > 0;
    }

    watch(showSearchBtn, (newValue) => {
      if (newValue) {
        document.body.classList.add('show-show-search-btn');
      } else {
        document.body.classList.remove('show-show-search-btn');
      }
    });

    function showModal() {
      show.value = true;
    }

    function closeModal() {
      show.value = false;
    }

    window.addEventListener('scroll', checkScrollPosition);

    onUnmounted(() => {
      window.removeEventListener('scroll', checkScrollPosition);
    });

    return {
      showSearchBtn,
      showSearch,
      show,
      showModal,
      closeModal,
    };
  },

  //   beforeUnmount() {
  //     window.removeEventListener('scroll', checkScrollPosition);
  //   },
});
</script>
