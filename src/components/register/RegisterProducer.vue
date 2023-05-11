<template>
  <form class="register" @submit.prevent="register">
    <div>
      <label for="name">Nome</label>
      <input type="text" placeholder="Nome" v-model="form.producer.user.name" />
      <p v-if="errors.name">{{ errors.name }}</p>
      <label for="Telemóvel">Número</label>
      <input
        type="text"
        placeholder="Telemóvel"
        v-model="form.producer.user.phone"
      />
      <p v-if="errors.phone">{{ errors.phone }}</p>
      <label for="NIF">NIF</label>
      <input type="text" placeholder="NIF" v-model="form.producer.user.vat" />
      <p v-if="errors.vat">{{ errors.vat }}</p>
      <label for="Email">Email</label>
      <input
        type="email"
        placeholder="Email"
        v-model="form.producer.user.email"
      />
      <p v-if="errors.email">{{ errors.email }}</p>
      <label for="Palavra passe">Palavra passe</label>
      <input
        type="password"
        placeholder="Palavra passe"
        v-model="form.password"
      />
      <p v-if="errors.password">{{ errors.password }}</p>
      <input type="submit" value="Registar" />
    </div>
  </form>
</template>

<script lang="ts">
import { useStore } from '@/store';
import { Producer } from '@/types';
import { ref } from 'vue';
import { reactive } from 'vue';

interface Errors {
  name?: string;
  phone?: string;
  vat?: string;
  email?: string;
  password?: string;
}

export default {
  setup() {
    const errors = ref<Errors>({});
    const form = reactive<{ producer: Producer; password: string }>({
      producer: {
        user: {
          id: 0,
          name: '',
          phone: '',
          vat: '',
          email: '',
          type: 'PRODUCER',
        },
        imageShowcase: [],
      },

      password: '',
    });

    const store = useStore();

    const validateForm = () => {
      errors.value = {};

      const regex = /^[a-zA-Z\s]+$/;
      const phoneRegex = /^[0-9]{9}$/;
      const vatRegex = /^[0-9]{9}$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

      if (!form.producer.user.name) {
        errors.value.name = 'Por favor, preencha o seu nome.';
      } else if (!regex.test(form.producer.user.name)) {
        errors.value.name = 'Por favor, preencha um nome válido.';
      }
      if (!form.producer.user.phone) {
        errors.value.phone = 'Por favor, preencha o seu número de telemóvel.';
      } else if (!phoneRegex.test(form.producer.user.phone)) {
        errors.value.phone =
          'Por favor, preencha um número de telemóvel válido.';
      }
      if (!form.producer.user.vat) {
        errors.value.vat = 'Por favor, preencha o seu NIF.';
      } else if (!vatRegex.test(form.producer.user.vat)) {
        errors.value.vat = 'Por favor, preencha um NIF válido.';
      }
      if (!form.producer.user.email) {
        errors.value.email = 'Por favor, preencha o seu email.';
      } else if (!emailRegex.test(form.producer.user.email)) {
        errors.value.email =
          'Por favor, preencha um email válido do tipo: nome@mail.com';
      }
      if (!form.password) {
        errors.value.password = 'Por favor, preencha a sua palavra-passe.';
      } else if (!passwordRegex.test(form.password)) {
        errors.value.password =
          'A palavra-passe deve conter pelo menos 8 caracteres, uma letra maiúscula, uma minúscula e um número.';
      }
      return Object.keys(errors.value).length === 0;
    };

    const register = async () => {
      if (validateForm()) {
        await store.dispatch('register', form.producer);
      }
    };

    return {
      form,
      register,
      errors,
    };
  },
};
</script>
