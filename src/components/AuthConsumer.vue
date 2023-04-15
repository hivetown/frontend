<template>
    <form class="register" @submit.prevent="register">
      <div>
        <label for="name">Nome</label>
        <input type="text" placeholder="Insira o seu nome" v-model="register_form.name" />
        <p v-if="errors.name">{{ errors.name }}</p>

        <label for="number">Número</label>
        <input type="number" placeholder="Insira o seu número" v-model="register_form.number" />
        <p v-if="errors.number">{{ errors.number }}</p>

        <label for="door">Porta</label>
        <input type="text" placeholder="Insira o lado da porta" v-model="register_form.door" />
        <p v-if="errors.door">{{ errors.door }}</p>

        <label for="floor">Andar</label>
        <input type="number" placeholder="Andar" v-model="register_form.floor" />
        <p v-if="errors.floor">{{ errors.floor }}</p>

        <label for="zip_code">Código Postal</label>
        <div style="display: flex">
          <input type="number" placeholder="1234" v-model="register_form.zip_code1" style="margin-right: 10px;" />
          <p v-if="errors.zip_code1" style="margin-right: 10px;">{{ errors.zip_code1 }}</p>
          <p>-</p>
          <input type="number" placeholder="567" v-model="register_form.zip_code2" style="margin-left: 10px;" />
          <p v-if="errors.zip_code2" style="margin-left: 10px;">{{ errors.zip_code2 }}</p>
        </div>

        <label for="street">Rua</label>
        <input type="text" placeholder="Rua" v-model="register_form.street" />
        <p v-if="errors.street">{{ errors.street }}</p>

        <label for="parish">Freguesia</label> 
        <input type="text" placeholder="Freguesia" v-model="register_form.parish" />
        <p v-if="errors.parish">{{ errors.parish }}</p>

        <label for="county">Concelho</label>
        <input type="text" placeholder="Concelho" v-model="register_form.county" />
        <p v-if="errors.county">{{ errors.county }}</p>

        <label for="district">Distrito</label>
        <input type="text" placeholder="Distrito" v-model="register_form.district" />
        <p v-if="errors.district">{{ errors.district }}</p>

        <label for="city">Cidade</label>
        <input type="text" placeholder="Cidade" v-model="register_form.city" />
        <p v-if="errors.city">{{ errors.city }}</p>

        <label for="latitude">Latitude</label>
        <input type="text" placeholder="Latitude" v-model="register_form.latitude" />
        <p v-if="errors.latitude">{{ errors.latitude }}</p>

        <label for="longitude">Longitude</label>
        <input type="text" placeholder="Longitude" v-model="register_form.longitude" />
        <p v-if="errors.longitude">{{ errors.longitude }}</p>

        <label for="phone">Telemóvel</label>
        <input type="text" placeholder="Telemóvel" v-model="register_form.phone" />
        <p v-if="errors.phone">{{ errors.phone }}</p>

        <label for="vat">NIF</label>
        <input type="text" placeholder="NIF" v-model="register_form.vat" />
        <p v-if="errors.vat">{{ errors.vat }}</p>

        <label for="email">Email</label>
        <input type="email" placeholder="Email" v-model="register_form.email" />
        <p v-if="errors.email">{{ errors.email }}</p>
        
        <label for="password">Palavra passe</label>
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
      // name: '',
      // number: '',
      // door: '',
      // floor: '',
      // zip_code: '',
      // street: '',
      // parish: '',
      // county: '',
      // district: '',
      // city: '',
      // latitude: '',
      // longitude: '',
      // phone: '',
      // vat: '',
      // email: '',
      // password: ''
      name: 'ss',
      number: '1',
      door: '1',
      floor: '1',
      zip_code1: '1111',
      zip_code2: '111',
      street: 's',
      parish: 's',
      county: 's',
      district: 's',
      city: 's',
      latitude: '11.11',
      longitude: '11.11',
      phone: '111222121',
      vat: '111222121',
      email: 'ss@gmail.com',
      password: 'ss1234'
    });
    const store = useStore();
    const errors = ref({});

    const validateForm = () => {
      errors.value = {};
      let isValid = true;
      const regex = /^[a-zA-Z\s]+$/;
      const numRegex = /^[0-9]+$/;
      const zip1Regex = /^[0-9]{4}$/;
      const zip2Regex = /^[0-9]{3}$/;
      const stringRegex = /^[a-zA-Z\s]+$/;
      const latitudeRegex = /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}$/;
      const longitudeRegex = /^-?((1[0-7]|[1-9])?\d(\.\d{1,6})?|180(\.0{1,6})?)$/;
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
      if (!register_form.zip_code1) {
        errors.value.zip_code1 = 'Por favor, preencha os 4 primeiros dígitos do seu código postal.';
        isValid = false;
      } else if (!zip1Regex.test(register_form.zip_code1)) {
        errors.value.zip_code1 = 'Por favor, preencha um código postal válido.';
        isValid = false;
      }
      console.log("zip_code1", isValid)
      if (!register_form.zip_code2) {
        errors.value.zip_code2 = 'Por favor, preencha os 3 últimos dígitos do seu código postal.';
        isValid = false;
      } else if (!zip2Regex.test(register_form.zip_code2)) {
        errors.value.zip_code2 = 'Por favor, preencha um código postal válido.';
        isValid = false;
      }
      console.log("zip_code2", isValid)

      if (!register_form.county) {
        errors.value.county = 'Por favor, preencha o seu concelho.';
        isValid = false;
      } else if (!stringRegex.test(register_form.county)) {
        errors.value.county = 'Por favor, preencha um concelho válido.';
        isValid = false;
      }
      
      console.log("county", isValid)
      if (!register_form.district) {
        errors.value.district = 'Por favor, preencha o seu distrito.';
        isValid = false;
      } else if (!stringRegex.test(register_form.district)) {
        errors.value.district = 'Por favor, preencha um distrito válido.';
        isValid = false;
      }
      console.log("district", isValid)
      if (!register_form.city) {
        errors.value.city = 'Por favor, preencha a sua cidade.';
        isValid = false;
      } else if (!stringRegex.test(register_form.city)) {
        errors.value.city = 'Por favor, preencha uma cidade válida.';
        isValid = false;
      }
      console.log("city", isValid)

      if (!register_form.phone) {
        errors.value.phone = 'Por favor, preencha o seu número de telemóvel.';
        isValid = false;
      } else if (!phoneRegex.test(register_form.phone)) {
        errors.value.phone = 'Por favor, preencha um número de telemóvel válido.';
        isValid = false;
      }
      console.log("phone", isValid)
      if (!register_form.latitude) {
        errors.value.latitude = 'Por favor, preencha a sua latitude.';
        isValid = false;
      } else if (!latitudeRegex.test(register_form.latitude)) {
        errors.value.latitude = 'Por favor, preencha uma latitude válida.';
        isValid = false;
      }
      console.log("latitude", isValid)
      if (!register_form.longitude) {
        errors.value.longitude = 'Por favor, preencha a sua longitude.';
        isValid = false;
      } else if (!longitudeRegex.test(register_form.longitude)) {
        errors.value.longitude = 'Por favor, preencha uma longitude válida.';
        isValid = false;
      }

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
        register_form.zip_code = `${register_form.zip_code1}-${register_form.zip_code2}`;
        register_form.type = "Consumer"
        console.log("register_form.type consumer", register_form.type)
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

