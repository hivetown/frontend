<template>
  <VeeForm @submit="register" class="flex flex-column gap-3">
    <div class="grid">
      <div class="col-12 flex flex-column gap-2">
        <label for="formName">Nome <span class="text-red-500">*</span></label>
        <InputText
          autocomplete="name"
          input-id="formName"
          v-model="formValues.producer.user.name"
          :class="{
            'p-invalid': formErrors['producer.user.name'],
          }"
          aria-describedby="nameError"
          placeholder="Nome"
        />

        <small
          v-if="formErrors['producer.user.name']"
          class="p-error"
          id="nameError"
          >{{ formErrors['producer.user.name'] }}</small
        >
      </div>

      <div class="col-12 md:col-6 flex flex-column gap-2">
        <label for="formPhone"
          >Telemóvel <span class="text-red-500">*</span></label
        >
        <InputMask
          autocomplete="tel-local"
          input-id="formPhone"
          v-model="formValues.producer.user.phone"
          :class="{
            'p-invalid': formErrors['producer.user.phone'],
          }"
          aria-describedby="phoneError"
          placeholder="Telemóvel"
          mask="999 999 999"
        />

        <small
          v-if="formErrors['producer.user.phone']"
          class="p-error"
          id="phoneError"
          >{{ formErrors['producer.user.phone'] }}</small
        >
      </div>

      <div class="col-12 md:col-6 flex flex-column gap-2">
        <label for="formvat">NIF <span class="text-red-500">*</span></label>
        <InputMask
          autocomplete="off"
          input-id="formvat"
          v-model="formValues.producer.user.vat"
          :class="{
            'p-invalid': formErrors['producer.user.vat'],
          }"
          aria-describedby="vatError"
          placeholder="NIF"
          mask="999999999"
        />

        <small
          v-if="formErrors['producer.user.vat']"
          class="p-error"
          id="vatError"
          >{{ formErrors['producer.user.vat'] }}</small
        >
      </div>

      <div class="col-12 flex flex-column gap-2">
        <label for="formEmail">Email <span class="text-red-500">*</span></label>
        <InputText
          autocomplete="on"
          type="email"
          input-id="formEmail"
          v-model="formValues.producer.user.email"
          :class="{
            'p-invalid': formErrors['producer.user.email'],
          }"
          aria-describedby="emailError"
          placeholder="Email"
        />

        <small
          v-if="formErrors['producer.user.email']"
          class="p-error"
          id="emailError"
          >{{ formErrors['producer.user.email'] }}</small
        >
      </div>

      <div class="col-12 flex flex-column gap-2">
        <label for="formPassword"
          >Password <span class="text-red-500">*</span></label
        >
        <InputPassword
          autocomplete="on"
          input-id="formPassword"
          v-model="formValues.password"
          :class="{
            'p-invalid': formErrors['password'],
          }"
          input-class="w-full"
          aria-describedby="passwordError"
          placeholder="Password"
          toggle-mask
          :feedback="false"
        />

        <small v-if="formErrors['password']" class="p-error" id="passwordError"
          ><span v-html="formErrors['password']"
        /></small>
      </div>

      <div class="col-12 flex flex-column gap-2">
        <label for="formConfirmPassword"
          >Confirmar Password <span class="text-red-500">*</span></label
        >
        <InputPassword
          autocomplete="off"
          input-id="formConfirmPassword"
          v-model="formValues.confirmPassword"
          :class="{
            'p-invalid': formErrors['confirmPassword'],
          }"
          input-class="w-full"
          aria-describedby="confirmPasswordError"
          placeholder="Confirmar Password"
          toggle-mask
          :feedback="false"
        />

        <small
          v-if="formErrors['confirmPassword']"
          class="p-error"
          id="confirmPasswordError"
          ><span v-html="formErrors['confirmPassword']"
        /></small>
      </div>
    </div>

    <div class="flex justify-content-end">
      <PrimeButton
        label="Registar"
        severity="success"
        @click="register"
        :loading="loading"
      />
    </div>
  </VeeForm>
</template>

<script lang="ts">
import { useStore } from '@/store';
import { Producer } from '@/types';
import { Form as VeeForm, useField, useForm } from 'vee-validate';
import { ref } from 'vue';
import InputText from 'primevue/inputtext';
import InputMask from 'primevue/inputmask';
import InputPassword from 'primevue/password';
import PrimeButton from 'primevue/button';

export default {
  components: {
    VeeForm,
    InputText,
    InputMask,
    InputPassword,
    PrimeButton,
  },
  setup() {
    const {
      values: formValues,
      errors: formErrors,
      handleSubmit,
    } = useForm({
      initialValues: {
        producer: {
          user: {},
        } as Producer,
        password: '',
        confirmPassword: '',
      },
    });

    useField('producer.user.name', (value: string) => {
      if (!value) {
        return 'O nome é obrigatório';
      }

      if (value.length < 3) {
        return 'O nome tem de ter pelo menos 3 caracteres';
      }

      return true;
    });

    useField('producer.user.phone', (value: string) => {
      if (!value) {
        return 'O telemóvel é obrigatório';
      }

      if (value.length < 9) {
        return 'O telemóvel tem de ter pelo menos 9 caracteres';
      }

      if (Number.isNaN(value)) {
        return 'O telemóvel tem de ser um número';
      }

      // Validate portuguese phone number with regex
      const phoneRegex = /^[9][1236]\d\s*\d{3}\s*\d{3}$/;
      if (!phoneRegex.test(value)) {
        return 'O telemóvel tem de ser um número português';
      }

      return true;
    });

    useField('producer.user.vat', (value: string) => {
      if (!value) {
        return 'O NIF é obrigatório';
      }

      if (value.length < 9) {
        return 'O NIF tem de ter pelo menos 9 caracteres';
      }

      if (Number.isNaN(value)) {
        return 'O NIF tem de ser um número';
      }

      return true;
    });

    useField('producer.user.email', (value: string) => {
      if (!value) {
        return 'O email é obrigatório';
      }

      if (value.length < 3) {
        return 'O email tem de ter pelo menos 3 caracteres';
      }

      // Validate email with regex
      const emailRegex =
        // eslint-disable-next-line no-useless-escape
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'O email tem de ser válido';
      }

      return true;
    });

    useField('password', (value: string) => {
      if (!value) {
        return 'A password é obrigatória';
      }

      if (value.length < 8) {
        return 'A password tem de ter pelo menos 8 caracteres';
      }

      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value)) {
        return 'A password deve conter pelo menos<br/><ul><li>8 caracteres</li><li>uma letra maiúscula</li><li>uma letra minúscula</li><li>um número</li></ul>';
      }

      return true;
    });

    useField('confirmPassword', (value: string) => {
      if (!value) {
        return 'A password é obrigatória';
      }

      if (value.length < 8) {
        return 'A password tem de ter pelo menos 8 caracteres';
      }

      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value)) {
        return 'A password deve conter pelo menos<br/><ul><li>8 caracteres</li><li>uma letra maiúscula</li><li>uma letra minúscula</li><li>um número</li></ul>';
      }

      if (value !== formValues.password) {
        return 'As passwords têm de ser iguais';
      }

      return true;
    });

    const store = useStore();

    const loading = ref(false);
    const register = handleSubmit(async () => {
      loading.value = true;
      await store.dispatch('registerProducer', formValues);
      loading.value = false;
    });

    return {
      formValues,
      formErrors,
      register,
      loading,
    };
  },
};
</script>
