<template>
    <form class="register" @submit.prevent="register">
      <div>
        <input type="text" placeholder="Nome" v-model="register_form.name" />
        <p v-if="errors.name">{{ errors.name }}</p>
        <input type="text" placeholder="Número" v-model="register_form.number" />
        <p v-if="errors.number">{{ errors.number }}</p>
        <input type="number" placeholder="Porta" v-model="register_form.door" />
        <p v-if="errors.door">{{ errors.door }}</p>
        <input type="text" placeholder="Andar" v-model="register_form.floor" />
        <p v-if="errors.floor">{{ errors.floor }}</p>
        <input type="text" placeholder="Código Postal" v-model="register_form.zip_code" />
        <p v-if="errors.zip_code">{{ errors.zip_code }}</p>
        <input type="text" placeholder="Rua" v-model="register_form.street" />
        <p v-if="errors.street">{{ errors.street }}</p>
        <input type="text" placeholder="Freguesia" v-model="register_form.parish" />
        <p v-if="errors.parish">{{ errors.parish }}</p>
        <input type="text" placeholder="Concelho" v-model="register_form.county" />
        <p v-if="errors.county">{{ errors.county }}</p>
        <input type="text" placeholder="Distrito" v-model="register_form.district" />
        <p v-if="errors.district">{{ errors.district }}</p>
        <input type="text" placeholder="Cidade" v-model="register_form.city" />
        <p v-if="errors.city">{{ errors.city }}</p>
        <input type="text" placeholder="Latitude" v-model="register_form.latitude" />
        <p v-if="errors.latitude">{{ errors.latitude }}</p>
        <input type="text" placeholder="Longitude" v-model="register_form.longitude" />
        <p v-if="errors.longitude">{{ errors.longitude }}</p>
        <input type="text" placeholder="Telemóvel" v-model="register_form.phone" />
        <p v-if="errors.phone">{{ errors.phone }}</p>
        <input type="text" placeholder="NIF" v-model="register_form.vat" />
        <p v-if="errors.vat">{{ errors.vat }}</p>
        <input type="email" placeholder="Email" v-model="register_form.email" />
        <p v-if="errors.email">{{ errors.email }}</p>
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


export default {
  setup () {
    const register_form = reactive({
      name: '',
      number: '',
      door: '',
      floor: '',
      zip_code: '',
      street: '',
      parish: '',
      county: '',
      district: '',
      city: '',
      latitude: '',
      longitude: '',
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
      const numRegex = /^[0-9]+$/;
      const zipRegex = /^[0-9]{4}-[0-9]{3}$/;
      const phoneRegex = /^[0-9]{9}$/;
      const vatRegex = /^[0-9]{9}$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!register_form.name) {
        errors.value.name = 'Por favor, preencha o seu nome.';
        isValid = false;
      } else if (!regex.test(register_form.name)) {
        errors.value.name = 'Por favor, preencha um nome válido.';
        isValid = false;
      }
      console.log("name", isValid)
      if (!register_form.number) {
        errors.value.number = 'Por favor, preencha o número da sua morada.';
        isValid = false;
      } else if (!numRegex.test(register_form.number)) {
        errors.value.number = 'Por favor, preencha um número válido.';
        isValid = false;
      }
      console.log("number", isValid)
      if (!register_form.zip_code) {
        errors.value.zip_code = 'Por favor, preencha o seu código postal.';
        isValid = false;
      } else if (!zipRegex.test(register_form.zip_code)) {
        errors.value.zip_code = 'Por favor, preencha um código postal válido (XXXX-XXX).';
        isValid = false;
      }
      console.log("zip_code", isValid)
      if (!register_form.phone) {
        errors.value.phone = 'Por favor, preencha o seu número de telemóvel.';
        isValid = false;
      } else if (!phoneRegex.test(register_form.phone)) {
        errors.value.phone = 'Por favor, preencha um número de telemóvel válido.';
        isValid = false;
      }
      console.log("phone", isValid)
      if (!register_form.vat) {
        errors.value.vat = 'Por favor, preencha o seu NIF.';
        isValid = false;
      } else if (!vatRegex.test(register_form.vat)) {
        errors.value.vat = 'Por favor, preencha um NIF válido.';
        isValid = false;
      }
      console.log("vat", isValid)
      if (!register_form.email) {
        errors.value.email = 'Por favor, preencha o seu email.';
        isValid = false;
      } else if (!emailRegex.test(register_form.email)) {
        errors.value.email = 'Por favor, preencha um email válido.';
        isValid = false;
      }
      console.log("email", isValid)
      if (!register_form.password) {
        errors.value.password = 'Por favor, preencha a sua palavra-passe.';
        isValid = false;
      } else if (register_form.password.length < 6) {
        errors.value.password = 'A sua palavra-passe deve ter pelo menos 6 caracteres.';
        isValid = false;
      }
      console.log("password", isValid)
      return isValid;
    };

    // console.log("is valid?", validateForm());
    const register = async () => {
      console.log('Register function called!');
      if (validateForm()) {
        console.log('Register form is valid!');
        store.dispatch('register', register_form);
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

