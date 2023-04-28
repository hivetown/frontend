<template>
  <form class="register" @submit.prevent="register">
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a
          :class="{
            'nav-link active': activeTab === 'personal',
            'inactive-tab': activeTab !== 'personal',
          }"
          @click="activeTab = 'personal'"
          href="#"
          >Dados pessoais</a
        >
      </li>
      <li class="nav-item">
        <a
          :class="{
            'nav-link active': activeTab === 'address',
            'inactive-tab': activeTab !== 'address',
          }"
          @click="activeTab = 'address'"
          href="#"
          >Morada</a
        >
      </li>
      <li class="nav-item">
        <a
          :class="{
            'nav-link active': activeTab === 'account',
            'inactive-tab': activeTab !== 'account',
          }"
          @click="activeTab = 'account'"
          href="#"
          >Conta</a
        >
      </li>
    </ul>
    <div v-show="activeTab === 'personal'">
      <label for="name">Nome</label>
      <input
        type="text"
        placeholder="Insira o seu nome"
        v-model="register_form.name"
      />
      <p v-if="errors.name">{{ errors.name }}</p>

      <label for="phone">Telemóvel</label>
      <input
        type="text"
        placeholder="Telemóvel"
        v-model="register_form.phone"
      />
      <p v-if="errors.phone">{{ errors.phone }}</p>

      <label for="vat">NIF</label>
      <input type="text" placeholder="NIF" v-model="register_form.vat" />
      <p v-if="errors.vat">{{ errors.vat }}</p>
    </div>
    <div v-show="activeTab === 'address'">
      <label for="number">Número</label>
      <input
        type="number"
        placeholder="Insira o seu número"
        v-model="register_form.number"
      />
      <p v-if="errors.number">{{ errors.number }}</p>

      <label for="door">Porta</label>
      <input
        type="text"
        placeholder="Insira o lado da porta (esq, dir, frente) se aplicável"
        v-model="register_form.door"
      />
      <p v-if="errors.door">{{ errors.door }}</p>

      <label for="floor">Andar</label>
      <input type="number" placeholder="Andar" v-model="register_form.floor" />
      <p v-if="errors.floor">{{ errors.floor }}</p>

      <label for="zip_code">Código Postal</label>
      <div style="display: flex">
        <input
          type="number"
          placeholder="1234"
          v-model="register_form.zip_code1"
          style="margin-right: 10px"
        />
        <p v-if="errors.zip_code1" style="margin-right: 10px">
          {{ errors.zip_code1 }}
        </p>
        <p>-</p>
        <input
          type="number"
          placeholder="567"
          v-model="register_form.zip_code2"
          style="margin-left: 10px"
        />
        <p v-if="errors.zip_code2" style="margin-left: 10px">
          {{ errors.zip_code2 }}
        </p>
      </div>

      <label for="street">Rua</label>
      <input type="text" placeholder="Rua" v-model="register_form.street" />
      <p v-if="errors.street">{{ errors.street }}</p>

      <label for="parish">Freguesia</label>
      <input
        type="text"
        placeholder="Freguesia"
        v-model="register_form.parish"
      />
      <p v-if="errors.parish">{{ errors.parish }}</p>

      <label for="county">Concelho</label>
      <input
        type="text"
        placeholder="Concelho"
        v-model="register_form.county"
      />
      <p v-if="errors.county">{{ errors.county }}</p>

      <label for="district">Distrito</label>
      <input
        type="text"
        placeholder="Distrito"
        v-model="register_form.district"
      />
      <p v-if="errors.district">{{ errors.district }}</p>

      <label for="city">Cidade</label>
      <input type="text" placeholder="Cidade" v-model="register_form.city" />
      <p v-if="errors.city">{{ errors.city }}</p>

      <label for="latitude">Latitude</label>
      <input
        type="text"
        placeholder="Latitude"
        v-model="register_form.latitude"
      />
      <p v-if="errors.latitude">{{ errors.latitude }}</p>

      <label for="longitude">Longitude</label>
      <input
        type="text"
        placeholder="Longitude"
        v-model="register_form.longitude"
      />
      <p v-if="errors.longitude">{{ errors.longitude }}</p>
    </div>
    <div v-show="activeTab === 'account'">
      <label for="email">Email</label>
      <input type="email" placeholder="Email" v-model="register_form.email" />
      <p v-if="errors.email">{{ errors.email }}</p>

      <label for="password">Palavra passe</label>
      <input
        type="password"
        placeholder="Palavra passe"
        v-model="register_form.password"
      />
    </div>
    <p v-if="errors.password">{{ errors.password }}</p>
    <input type="submit" value="Registar" />
  </form>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import { reactive } from 'vue';

interface Errors {
  name?: string;
  number?: string;
  door?: string;
  floor?: string;
  zip_code?: string;
  zip_code1?: string;
  zip_code2?: string;
  street?: string;
  parish?: string;
  county?: string;
  district?: string;
  city?: string;
  latitude?: string;
  longitude?: string;
  phone?: string;
  vat?: string;
  email?: string;
  password?: string;
}

export default {
  setup() {
    const activeTab = ref('personal');
    const errors = ref<Errors>({});
    const register_form = reactive({
      name: '',
      number: '',
      door: '',
      floor: '',
      zip_code: '',
      zip_code1: '',
      zip_code2: '',
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
      password: '',
      type: '',
    });
    const store = useStore();
    const validateForm = () => {
      errors.value = {};

      const numRegex = /^[0-9]+$/;
      const zip1Regex = /^[0-9]{4}$/;
      const zip2Regex = /^[0-9]{3}$/;
      const stringRegex = /^[a-zA-Z\s]+$/;
      // String regex has to be a not empty string starting with an uppercase letter
      const latitudeRegex = /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}$/;
      const longitudeRegex =
        /^-?((1[0-7]|[1-9])?\d(\.\d{1,6})?|180(\.0{1,6})?)$/;
      const phoneRegex = /^[0-9]{9}$/;
      const vatRegex = /^[0-9]{9}$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      //the password must have at least 8 characters, 1 uppercase, 1 lowercase and 1 number

      if (!register_form.name) {
        errors.value.name = 'Por favor, preencha o seu nome.';
      } else if (!stringRegex.test(register_form.name)) {
        errors.value.name = 'O nome tem de começar com uma letra maiúscula.';
      }
      if (!register_form.number) {
        errors.value.number = 'Por favor, preencha o número da sua morada.';
      } else if (!numRegex.test(register_form.number)) {
        errors.value.number =
          'Por favor, preencha um número válido do tipo: 123';
      }
      // validate floor
      if (!register_form.floor) {
        errors.value.floor = 'Por favor, preencha o andar da sua morada.';
      } else if (!numRegex.test(register_form.floor)) {
        errors.value.floor = 'Por favor, preencha um andar válido do tipo: 3';
      }

      if (!register_form.zip_code1) {
        errors.value.zip_code1 =
          'Por favor, preencha os 4 primeiros dígitos do seu código postal.';
      } else if (!zip1Regex.test(register_form.zip_code1)) {
        errors.value.zip_code1 =
          'Por favor, preencha um código postal válido do tipo: 1234';
      }
      if (!register_form.zip_code2) {
        errors.value.zip_code2 =
          'Por favor, preencha os 3 últimos dígitos do seu código postal.';
      } else if (!zip2Regex.test(register_form.zip_code2)) {
        errors.value.zip_code2 =
          'Por favor, preencha um código postal válido do tipo: 123';
      }
      // validate street
      if (!register_form.street) {
        errors.value.street = 'Por favor, preencha a sua rua.';
      } else if (!stringRegex.test(register_form.street)) {
        errors.value.street = 'A rua deve ser uma palavra válida.';
      }

      if (!register_form.parish) {
        errors.value.parish = 'Por favor, preencha a sua freguesia.';
      } else if (!stringRegex.test(register_form.parish)) {
        errors.value.parish = 'A freguesia deve ser uma palavra válida.';
      }

      if (!register_form.county) {
        errors.value.county = 'Por favor, preencha o seu concelho.';
      } else if (!stringRegex.test(register_form.county)) {
        errors.value.county = 'O concelho deve ser uma palavra válida.';
      }

      if (!register_form.district) {
        errors.value.district = 'Por favor, preencha o seu distrito.';
      } else if (!stringRegex.test(register_form.district)) {
        errors.value.district = 'O distrito deve ser uma palavra válida.';
      }
      if (!register_form.city) {
        errors.value.city = 'Por favor, preencha a sua cidade.';
      } else if (!stringRegex.test(register_form.city)) {
        errors.value.city = 'A cidade deve ser uma palavra válida.';
      }

      if (!register_form.phone) {
        errors.value.phone = 'Por favor, preencha o seu número de telemóvel.';
      } else if (!phoneRegex.test(register_form.phone)) {
        errors.value.phone =
          'Por favor, preencha um número de telemóvel válido do tipo: 912345678';
      }
      if (!register_form.latitude) {
        errors.value.latitude = 'Por favor, preencha a sua latitude.';
      } else if (!latitudeRegex.test(register_form.latitude)) {
        errors.value.latitude =
          'Por favor, preencha uma latitude válida do tipo: 38.123456';
      }
      if (!register_form.longitude) {
        errors.value.longitude = 'Por favor, preencha a sua longitude.';
      } else if (!longitudeRegex.test(register_form.longitude)) {
        errors.value.longitude =
          'Por favor, preencha uma longitude válida do tipo: -9.123456';
      }

      if (!register_form.vat) {
        errors.value.vat = 'Por favor, preencha o seu NIF.';
      } else if (!vatRegex.test(register_form.vat)) {
        errors.value.vat =
          'Por favor, preencha um NIF válido do tipo: 123456789';
      }
      if (!register_form.email) {
        errors.value.email = 'Por favor, preencha o seu email.';
      } else if (!emailRegex.test(register_form.email)) {
        errors.value.email =
          'Por favor, preencha um email válido do tipo: nome@mail.com';
      }
      if (!register_form.password) {
        errors.value.password = 'Por favor, preencha a sua palavra-passe.';
      } else if (!passwordRegex.test(register_form.password)) {
        errors.value.password =
          'A palavra-passe deve conter pelo menos 8 caracteres, uma letra maiúscula, uma minúscula e um número.';
      }
      return Object.keys(errors.value).length === 0;
    };

    // console.log("is valid?", validateForm());
    const register = async () => {
      if (validateForm()) {
        register_form.zip_code = `${register_form.zip_code1}-${register_form.zip_code2}`;
        register_form.type = 'Consumer';
        // store.dispatch('register', register_form, register_form.type);
        store.dispatch('register', {
          name: register_form.name,
          password: register_form.password,
          email: register_form.email,
          phone: register_form.phone,
          vat: register_form.vat,
          number: register_form.number,
          door: register_form.door,
          floor: register_form.floor,
          zip_code: `${register_form.zip_code1}-${register_form.zip_code2}`,
          street: register_form.street,
          parish: register_form.parish,
          county: register_form.county,
          city: register_form.city,
          district: register_form.district,
          latitude: register_form.latitude,
          longitude: register_form.longitude,
          type: register_form.type,
        });
      }
    };

    return {
      register_form,
      register,
      errors,
      activeTab,
    };
  },
};
</script>
<style>
.nav-link {
  border: 1px solid transparent;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
}

.nav-link.active {
  border-color: #dee2e6 #dee2e6 #fff;
  background-color: #fff;
}

.inactive-tab {
  color: grey;
  background-color: white;
  border: none;
}

.inactive-tab:hover {
  color: black;
  background-color: #f5f5f5;
  border: none;
}

.inactive-tab:focus {
  color: black;
  background-color: #f5f5f5;
  border: none;
  box-shadow: none;
}

.nav-tabs .nav-item .nav-link {
  border: 1px solid #ddd;
  border-bottom-color: transparent;
}
</style>
