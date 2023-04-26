<template>
    <form class="register" @submit.prevent="register">
      <div>
        <label for="name">Nome</label>
        <input type="text" placeholder="Nome" v-model="register_form.name" />
        <p v-if="errors.name">{{ errors.name }}</p>
        <label for="Telemóvel">Número</label>
        <input type="text" placeholder="Telemóvel" v-model="register_form.phone" />
        <p v-if="errors.phone">{{ errors.phone }}</p>
        <label for="NIF">NIF</label>
        <input type="text" placeholder="NIF" v-model="register_form.vat" />
        <p v-if="errors.vat">{{ errors.vat }}</p>
        <label for="Email">Email</label>
        <input type="email" placeholder="Email" v-model="register_form.email" />
        <p v-if="errors.email">{{ errors.email }}</p>
        <label for="Palavra passe">Palavra passe</label>
        <input
          type="password"
          placeholder="Palavra passe"
          v-model="register_form.password"
        />
        <p v-if="errors.password">{{ errors.password }}</p>
        <input type="submit" value="Registar" />
      </div>
    </form>
  </template>

<script>



import { ref } from 'vue'
import { useStore } from 'vuex'
import { reactive } from 'vue';
import store from '../store';
export default {
  setup () {
    const register_form = reactive({
        name: '',
        phone: '',
        vat: '',
        email: '',
        password: ''
        });
    const store = useStore();
    const errors = ref({});

    const validateForm = () => {
        errors.value = {};
        let isValid = true;
        const regex = /^[a-zA-Z\s]+$/;
        const phoneRegex = /^[0-9]{9}$/;
        const vatRegex = /^[0-9]{9}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;




      if (!register_form.name) {
        errors.value.name = 'Por favor, preencha o seu nome.';
        isValid = false;
      } else if (!regex.test(register_form.name)) {
        errors.value.name = 'Por favor, preencha um nome válido.';
        isValid = false;
      }
      if (!register_form.phone) {
        errors.value.phone = 'Por favor, preencha o seu número de telemóvel.';
        isValid = false;
      } else if (!phoneRegex.test(register_form.phone)) {
        errors.value.phone = 'Por favor, preencha um número de telemóvel válido.';
        isValid = false;
      }
      if (!register_form.vat) {
        errors.value.vat = 'Por favor, preencha o seu NIF.';
        isValid = false;
      } else if (!vatRegex.test(register_form.vat)) {
        errors.value.vat = 'Por favor, preencha um NIF válido.';
        isValid = false;
      }
      if (!register_form.email) {
        errors.value.email = 'Por favor, preencha o seu email.';
        isValid = false;
      } else if (!emailRegex.test(register_form.email)) {
        errors.value.email = 'Por favor, preencha um email válido do tipo: nome@mail.com';
        isValid = false;
      }
      if (!register_form.password) {
        errors.value.password = 'Por favor, preencha a sua palavra-passe.';
        isValid = false;
      } else if (!passwordRegex.test(register_form.password)) {
        errors.value.password = 'A palavra-passe deve conter pelo menos 8 caracteres, uma letra maiúscula, uma minúscula e um número.';
        isValid = false;
      }
      return isValid;
    };

    const register = async () => {
      console.log('Register function called!');
      if (validateForm()) {
        console.log('Register form is valid!');
        register_form.type = 'Producer';
        console.log("register_form.type producer", register_form.type)
        store.dispatch('register', register_form, register_form.type);
      }
    };

    

    return {
      register_form,
      register,
      errors
    };
  }
};







</script>