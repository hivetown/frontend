<template>
  <!-- Botão de pesquisa -->
  <div>
    <b-button
      v-if="showSearchBtn"
      @click="openDialog"
      class="show-search-btn d-none d-lg-block"
    >
      <i class="bi bi-search s-icon"></i>
    </b-button>
  </div>

  <!-- Conteúdo do modal -->
  <div>
    <PDialog v-model:visible="dialogVisible" modal header="Pesquisar">
      <form @submit="submitSearch" class="flex flex-column">
        <p>O que procura?</p>
        <span class="p-input-icon-left">
          <i class="pi pi-search" />
          <InputText
            id="searchDialogInput"
            v-model="searchQuery"
            placeholder="Pesquisa"
            :class="{ 'p-invalid': searchQueryError }"
          />
        </span>
        <small class="p-error" v-if="searchQueryError">{{
          searchQueryError
        }}</small>

        <PButton
          class="mt-3 w-full"
          type="submit"
          :loading="submitting"
          icon="pi pi-check"
          >Pesquisar</PButton
        >
      </form>
    </PDialog>
  </div>
</template>

<style scoped>
form {
  padding: 0;
}
.search-modal-input {
  /* background-color: red !important; */
  width: 100%;
}

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
  z-index: 9999;
  color: #f1f1f1 !important;
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

.modal .btn-secondary .btn-content,
.modal .btn-primary .btn-content {
  color: white !important;
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

.s-icon {
  color: white;
}
</style>

<script lang="ts">
import { defineComponent, onUnmounted, ref } from 'vue';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'ShowSearch',
  components: {
    InputText,
    PDialog: Dialog,
    PButton: Button,
  },
  setup() {
    const router = useRouter();
    const showSearchBtn = ref(false);

    // Search button
    function checkScrollPosition() {
      showSearchBtn.value = window.pageYOffset > 0;
    }

    window.addEventListener('scroll', checkScrollPosition);

    onUnmounted(() => {
      window.removeEventListener('scroll', checkScrollPosition);
    });

    // Dialog
    const dialogVisible = ref(false);
    function openDialog() {
      dialogVisible.value = true;
    }

    function closeDialog() {
      dialogVisible.value = false;
    }

    // Search
    const searchQuery = ref('');
    const searchQueryError = ref<string | null>(null);
    const submitting = ref(false);
    const submitSearch = async ($e: Event) => {
      $e.preventDefault();

      submitting.value = true;

      searchQueryError.value = null;
      if (!searchQuery.value?.length)
        searchQueryError.value = 'Campo obrigatório';
      if (searchQuery.value.length < 3)
        searchQueryError.value = 'Mínimo 3 caracteres';

      if (searchQueryError.value) {
        // Stop execution if error
        submitting.value = false;
        return;
      }

      await router.push({
        path: '/products',
        query: { search: searchQuery.value },
      });

      closeDialog();
      submitting.value = false;
    };

    return {
      searchQueryError,
      submitting,
      searchQuery,
      submitSearch,
      showSearchBtn,
      openDialog,
      closeDialog,
      dialogVisible,
    };
  },
});
</script>
