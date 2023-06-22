<template>
  <div class="parent">
    <div class="consumer">
      <div class="consumer-image">
        <!-- Imagem do utilizador -->
        <img
          v-if="user?.user.image"
          class="producer-image mx-auto"
          :src="user.user.image.url"
          :alt="user.user.image.alt"
        />
      </div>
      <div class="consumer-main-info">
        <h1 class="dgreen-txt main-txt">{{ usernameValue }}</h1>
      </div>
      <div class="edit-consumer">
        <b-button class="buy-btn rounded-pill">Editar</b-button>
      </div>
    </div>
    <div class="form-box parent">
      <!-- Conta -->
      <div class="form-box-block">
        <!-- Username -->
        <div class="card flex justify-content-center">
          <div class="flex flex-column gap-2">
            <label for="username">Username</label>
            <InputText
              id="username"
              v-model="usernameValue"
              aria-describedby="username-help"
            />
          </div>
        </div>
        <!-- Email -->
        <div class="card flex justify-content-center">
          <div class="flex flex-column gap-2">
            <label for="username">Email</label>
            <InputText
              id="username"
              v-model="emailValue"
              aria-describedby="username-help"
            />
          </div>
        </div>
        <!-- Password -->
        <div class="card flex justify-content-center">
          <div class="flex flex-column gap-2">
            <label for="username">Password</label>
            <div>
              <Password v-model="passwordValue" toggle-mask />
            </div>
          </div>
        </div>
      </div>
      <!-- Dados -->
      <div class="form-box-block">
        <!-- Phone -->
        <div class="card flex justify-content-center">
          <div class="flex flex-column gap-2">
            <label for="username">Telefone</label>
            <InputMask
              id="basic"
              v-model="phoneValue"
              mask="999999999"
              placeholder="999999999"
            />
          </div>
        </div>
        <!-- Vat -->
        <div class="card flex justify-content-center">
          <div class="flex flex-column gap-2">
            <label for="username">VAT</label>
            <InputMask
              id="basic"
              v-model="vatValue"
              mask="999999999"
              placeholder="999999999"
            />
          </div>
        </div>
      </div>
      <!-- Moradas -->
      <div class="form-box-block" style="max-height: 25vh; overflow-y: scroll">
        <!-- Moradas -->
        <div>
          <h4 class="mb-2">Moradas guardadas</h4>
          <div
            v-for="morada in moradas"
            :key="morada.id"
            class="d-flex align-items-center gap-3"
            style="border-bottom: 2px solid #f3f3f3; padding: 0.3vh"
          >
            <p class="mt-2">{{ morada.getFullAddress }}</p>
            <i
              class="bi bi-pencil"
              style="font-size: 1.4em; margin-top: -1.2vh"
            ></i>
          </div>
        </div>
      </div>
    </div>
    <div class="end-edit parent">
      <b-button
        class="edit-btn rounded-pill"
        style="
          background-color: #f1b24a !important;
          border-color: #f1b24a !important;
        "
        >Guardar</b-button
      >
      <b-button
        class="edit-btn rounded-pill"
        style="
          background-color: white !important;
          border-color: #f1b24a !important;
          color: #5a5a5a !important;
        "
        >Cancelar</b-button
      >
    </div>
    <!-- {{ user?.user }} -->
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { Address, Consumer } from '@/types';
import { getConsumerId } from '@/api';
import InputText from 'primevue/inputtext';
import InputMask from 'primevue/inputmask';
import Password from 'primevue/password';

export default defineComponent({
  data() {
    return {
      userLoggedId: 0 as number,
      user: null as Consumer | null,
      usernameValue: '' as string,
      emailValue: '' as string,
      passwordValue: '' as string,
      phoneValue: '' as string,
      vatValue: '' as string,
      moradas: [] as Address[], //TODO - corrigir este tipo
    };
  },
  async beforeMount() {
    // Ir buscar o utilizador que está logado
    const store = this.$store;
    const userLoggedId = computed(() => store.state.user);
    if (userLoggedId.value) {
      this.userLoggedId = userLoggedId.value['user']['id'];
    }
    //   Ir buscar o resto dos dados do utilizador
    const response = await getConsumerId(Number(this.userLoggedId));
    this.user = response.data;

    this.usernameValue = this.user.user.name;
    this.emailValue = this.user.user.email;
    this.phoneValue = this.user.user.phone;
    this.vatValue = this.user.user.vat;
    this.moradas = this.user['addresses'];
  },
  components: { InputMask, InputText, Password },
});
</script>

<style scoped>
.consumer {
  /* background-color: green; */
  height: 20vh;
  display: flex;
}

.consumer-image {
  /* background-color: blue; */
  width: 20%;
}

.consumer-main-info {
  /* background-color: red; */
  width: 75%;
  display: flex;
  align-items: center;
}

.edit-consumer {
  /* background-color: yellow; */
  width: 15%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.buy-btn {
  width: 60% !important;
}

.form-box {
  /* background-color: red; */
  margin-top: 4vh;
  display: flex;
  justify-content: space-between;
}
.form-box-block {
  /* background-color: blue; */
  width: 33%;
  padding: 1.5vh;
  display: flex;
  flex-direction: column;
  gap: 2vh;
}

.end-edit {
  /* background-color: red; */
  display: flex;
  gap: 2vh;
  margin-top: 4vh;
  justify-content: center;
}

.edit-btn {
  padding: 0.8em !important;
  height: 5vh;
  width: 16vh;
}
</style>
