<template>
  <div id="full" class="grid align-items-center justify-content-center">
    <Card class="3">
      <template #title> Entrar </template>

      <template #content>
        <VeeForm @submit="login" class="flex flex-column gap-3">
          <div class="flex flex-column gap-2">
            <label for="formEmail"
              >Email <span class="text-red-500">*</span></label
            >
            <span class="p-input-icon-left">
              <i class="pi pi-envelope" />
              <InputText
                input-id="formEmail"
                v-model="formValues.email"
                :input-class="{ 'p-invalid': formErrors.email }"
                aria-describedby="emailError"
                placeholder="Email"
              />
            </span>

            <small v-if="formErrors.email" class="p-error" id="emailError">{{
              formErrors.email
            }}</small>
          </div>

          <div class="flex flex-column gap-2">
            <label for="formPassword"
              >Password <span class="text-red-500">*</span></label
            >
            <span class="p-input-icon-left">
              <i class="pi pi-lock" />
              <InputText
                input-id="formPassword"
                type="password"
                v-model="formValues.password"
                :input-class="{ 'p-invalid': formErrors.password }"
                aria-describedby="passwordError"
                placeholder="Password"
              />
            </span>

            <small v-if="formErrors.password" class="p-error" id="passwordError"
              ><span v-html="formErrors.password"
            /></small>
          </div>

          <PrimeButton type="submit" label="Entrar" :loading="loading" />

          <small
            >Não tenho conta ainda!
            <RouterLink to="/register">Registar</RouterLink></small
          >
        </VeeForm>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import Card from 'primevue/card';
import { Form as VeeForm, useField, useForm } from 'vee-validate';
import { useStore } from '@/store';
import InputText from 'primevue/inputtext';
import PrimeButton from 'primevue/button';
import { ref } from 'vue';
export default {
  components: {
    Card,
    VeeForm,
    InputText,
    PrimeButton,
  },
  setup() {
    const {
      values: formValues,
      errors: formErrors,
      handleSubmit,
    } = useForm({
      initialValues: {
        email: '',
        password: '',
      },
    });

    useField('email', (value: string) => {
      if (!value) {
        return 'O email é obrigatório';
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return 'O email deve ser válido';
      }

      return true;
    });

    useField('password', (value: string) => {
      if (!value) {
        return 'A password é obrigatória';
      }

      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value)) {
        return 'A password deve conter pelo menos<br/><ul><li>8 caracteres</li><li>uma letra maiúscula</li><li>uma letra minúscula</li><li>um número</li></ul>';
      }

      return true;
    });

    const store = useStore();
    const loading = ref(false);
    const login = handleSubmit(async () => {
      loading.value = true;
      await store.dispatch('login', formValues);
      loading.value = false;
    });

    return {
      loading,
      formValues,
      login,
      formErrors,
    };
  },
};
</script>

<style scoped>
#full {
  height: 80vh;
  width: 99vw;
  background-image: url('/c1.svg');
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
