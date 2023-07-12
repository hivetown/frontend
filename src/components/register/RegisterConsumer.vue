<template>
  <VeeForm id="formConsumer" @submit="register" class="flex flex-column gap-3">
    <TabView v-model:active-index="activeIndex">
      <TabPanel>
        <template #header>
          <i class="pi pi-user mx-2 green-txt"></i>
          <span>Dados Pessoais</span>
        </template>

        <div class="grid">
          <div class="col-12 flex flex-column gap-2">
            <label for="formName"
              >Nome <span class="text-red-500">*</span></label
            >
            <InputText
              autocomplete="name"
              input-id="formName"
              v-model="formValues.consumer.user.name"
              :class="{
                'p-invalid': formErrors['consumer.user.name'],
              }"
              aria-describedby="nameError"
              placeholder="Nome"
            />

            <small
              v-if="formErrors['consumer.user.name']"
              class="p-error"
              id="nameError"
              >{{ formErrors['consumer.user.name'] }}</small
            >
          </div>

          <div class="col-12 md:col-6 flex flex-column gap-2">
            <label for="formPhone"
              >Telemóvel <span class="text-red-500">*</span></label
            >
            <InputMask
              autocomplete="tel-local"
              input-id="formPhone"
              v-model="formValues.consumer.user.phone"
              :class="{
                'p-invalid': formErrors['consumer.user.phone'],
              }"
              aria-describedby="phoneError"
              placeholder="Telemóvel"
              mask="999 999 999"
            />

            <small
              v-if="formErrors['consumer.user.phone']"
              class="p-error"
              id="phoneError"
              >{{ formErrors['consumer.user.phone'] }}</small
            >
          </div>

          <div class="col-12 md:col-6 flex flex-column gap-2">
            <label for="formvat">NIF <span class="text-red-500">*</span></label>
            <InputMask
              autocomplete="off"
              input-id="formvat"
              v-model="formValues.consumer.user.vat"
              :class="{
                'p-invalid': formErrors['consumer.user.vat'],
              }"
              aria-describedby="vatError"
              placeholder="NIF"
              mask="999999999"
            />

            <small
              v-if="formErrors['consumer.user.vat']"
              class="p-error"
              id="vatError"
              >{{ formErrors['consumer.user.vat'] }}</small
            >
          </div>
        </div>
      </TabPanel>

      <TabPanel>
        <template #header>
          <i class="pi pi-map mx-2 green-txt"></i>
          <span>Morada</span>
        </template>

        <div class="grid">
          <div class="col-6 md:col-4 lg:col-3 flex flex-column gap-2">
            <label for="formNumber"
              >Número <span class="text-red-500">*</span></label
            >
            <InputNumber
              autocomplete="off"
              input-id="formNumber"
              v-model="formValues.address.number"
              :class="{
                'p-invalid': formErrors['address.number'],
              }"
              aria-describedby="numberError"
              placeholder="Número"
              :min="0"
            />

            <small
              v-if="formErrors['address.number']"
              class="p-error"
              id="numberError"
              >{{ formErrors['address.number'] }}</small
            >
          </div>

          <div class="col-6 md:col-4 lg:col-3 flex flex-column gap-2">
            <label for="formDoor"
              >Porta <span class="text-red-500">*</span></label
            >
            <InputText
              autocomplete="off"
              input-id="formDoor"
              v-model="formValues.address.door"
              :class="{
                'p-invalid': formErrors['address.number'],
              }"
              aria-describedby="doorError"
              placeholder="Porta"
            />

            <small
              v-if="formErrors['address.door']"
              class="p-error"
              id="doorError"
              >{{ formErrors['address.door'] }}</small
            >
          </div>

          <div class="col-6 md:col-4 lg:col-3 flex flex-column gap-2">
            <label for="formFloor"
              >Andar <span class="text-red-500">*</span></label
            >
            <InputNumber
              autocomplete="off"
              input-id="formFloor"
              v-model="formValues.address.floor"
              :class="{
                'p-invalid': formErrors['address.floor'],
              }"
              aria-describedby="floorError"
              placeholder="Andar"
              :min="0"
            />

            <small
              v-if="formErrors['address.floor']"
              class="p-error"
              id="floorError"
              >{{ formErrors['address.floor'] }}</small
            >
          </div>

          <div class="col-6 md:col-4 lg:col-3 flex flex-column gap-2">
            <label for="formZipCode"
              >Código Postal <span class="text-red-500">*</span></label
            >
            <InputMask
              autocomplete="postal-code"
              input-id="formZipCode"
              v-model="formValues.address.zipCode"
              :class="{
                'p-invalid': formErrors['address.zipCode'],
              }"
              aria-describedby="zipCodeError"
              placeholder="Código Postal"
              mask="9999-999"
            />

            <small
              v-if="formErrors['address.zipCode']"
              class="p-error"
              id="zipCodeError"
              >{{ formErrors['address.zipCode'] }}</small
            >
          </div>

          <div class="col-12 md:col-8 flex flex-column gap-2">
            <label for="formStreet"
              >Rua <span class="text-red-500">*</span></label
            >
            <InputText
              autocomplete="address-line3\"
              input-id="formStreet"
              v-model="formValues.address.street"
              :class="{
                'p-invalid': formErrors['address.street'],
              }"
              aria-describedby="streetError"
              placeholder="Rua"
            />

            <small
              v-if="formErrors['address.street']"
              class="p-error"
              id="streetError"
              >{{ formErrors['address.street'] }}</small
            >
          </div>

          <div class="col-12 md:col-6 lg:col-4 flex flex-column gap-2">
            <label for="formParish"
              >Freguesia <span class="text-red-500">*</span></label
            >
            <InputText
              autocomplete="address-level4"
              input-id="formParish"
              v-model="formValues.address.parish"
              :class="{
                'p-invalid': formErrors['address.parish'],
              }"
              aria-describedby="parishError"
              placeholder="Freguesia"
            />

            <small
              v-if="formErrors['address.parish']"
              class="p-error"
              id="parishError"
              >{{ formErrors['address.parish'] }}</small
            >
          </div>

          <div class="col-12 md:col-6 lg:col-4 flex flex-column gap-2">
            <label for="formCounty"
              >Concelho <span class="text-red-500">*</span></label
            >
            <InputText
              autocomplete="address-level3"
              input-id="formCounty"
              v-model="formValues.address.county"
              :class="{
                'p-invalid': formErrors['address.county'],
              }"
              aria-describedby="countyError"
              placeholder="Concelho"
            />

            <small
              v-if="formErrors['address.county']"
              class="p-error"
              id="countyError"
              >{{ formErrors['address.county'] }}</small
            >
          </div>

          <div class="col-12 md:col-6 lg:col-4 flex flex-column gap-2">
            <label for="formCity"
              >Cidade <span class="text-red-500">*</span></label
            >
            <InputText
              autocomplete="address-level2"
              input-id="formCity"
              v-model="formValues.address.city"
              :class="{
                'p-invalid': formErrors['address.city'],
              }"
              aria-describedby="cityError"
              placeholder="Cidade"
            />

            <small
              v-if="formErrors['address.city']"
              class="p-error"
              id="cityError"
              >{{ formErrors['address.city'] }}</small
            >
          </div>

          <div class="col-12 md:col-6 lg:col-4 flex flex-column gap-2">
            <label for="formDistrict"
              >Distrito <span class="text-red-500">*</span></label
            >
            <InputText
              autocomplete="address-level1"
              input-id="formDistrict"
              v-model="formValues.address.district"
              :class="{
                'p-invalid': formErrors['address.district'],
              }"
              aria-describedby="districtError"
              placeholder="Distrito"
            />

            <small
              v-if="formErrors['address.district']"
              class="p-error"
              id="districtError"
              >{{ formErrors['address.district'] }}</small
            >
          </div>

          <div class="col-12 md:col-6 flex flex-column gap-2">
            <label for="formLatitude"
              >Latitude <span class="text-red-500">*</span></label
            >
            <InputNumber
              input-id="formLatitude"
              v-model="formValues.address.latitude"
              :class="{
                'p-invalid': formErrors['address.latitude'],
              }"
              aria-describedby="latitudeError"
              placeholder="Latitude"
              :min="-90"
              :max="90"
            />

            <small
              v-if="formErrors['address.latitude']"
              class="p-error"
              id="latitudeError"
              >{{ formErrors['address.latitude'] }}</small
            >
          </div>

          <div class="col-12 md:col-6 flex flex-column gap-2">
            <label for="formLongitude"
              >Longitude <span class="text-red-500">*</span></label
            >
            <InputNumber
              input-id="formLongitude"
              v-model="formValues.address.longitude"
              :class="{
                'p-invalid': formErrors['address.longitude'],
              }"
              aria-describedby="longitudeError"
              placeholder="Longitude"
              :min="-180"
              :max="180"
            />

            <small
              v-if="formErrors['address.longitude']"
              class="p-error"
              id="longitudeError"
              >{{ formErrors['address.longitude'] }}</small
            >
          </div>
        </div>
      </TabPanel>

      <TabPanel>
        <template #header>
          <i class="pi pi-envelope mx-2 green-txt"></i>
          <span>Autenticação</span>
        </template>

        <div class="grid">
          <div class="col-12 flex flex-column gap-2">
            <label for="formEmail"
              >Email <span class="text-red-500">*</span></label
            >
            <InputText
              autocomplete="on"
              type="email"
              input-id="formEmail"
              v-model="formValues.consumer.user.email"
              :class="{
                'p-invalid': formErrors['consumer.user.email'],
              }"
              aria-describedby="emailError"
              placeholder="Email"
            />

            <small
              v-if="formErrors['consumer.user.email']"
              class="p-error"
              id="emailError"
              >{{ formErrors['consumer.user.email'] }}</small
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

            <small
              v-if="formErrors['password']"
              class="p-error"
              id="passwordError"
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
      </TabPanel>
    </TabView>

    <div
      :class="{
        flex: true,
        'mt-4': true,
        'justify-content-end': activeIndex === 0,
        'justify-content-between': activeIndex !== 0,
      }"
    >
      <PrimeButton
        rounded
        outlined
        v-if="activeIndex !== 0"
        label="Anterior"
        @click="prevPage"
      />

      <PrimeButton
        rounded
        :label="activeIndex !== 2 ? 'Seguinte' : 'Registar'"
        :severity="activeIndex !== 2 ? 'primary' : 'secondary'"
        @click="activeIndex !== 2 ? nextPage() : register()"
        :loading="loading"
      />
    </div>
  </VeeForm>
</template>

<script lang="ts">
import { ref } from 'vue';
import { Address, Consumer } from '@/types';
import { useStore } from '@/store';
import { useField, useForm } from 'vee-validate';
import PrimeButton from 'primevue/button';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import InputText from 'primevue/inputtext';
import InputMask from 'primevue/inputmask';
import InputNumber from 'primevue/inputnumber';
import InputPassword from 'primevue/password';

export default {
  components: {
    TabView,
    TabPanel,
    InputText,
    InputMask,
    InputNumber,
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
        consumer: {
          user: {},
        } as Consumer,
        password: '',
        confirmPassword: '',
        address: {} as Address,
      },
    });

    // Default value for latitude and longitude form GeoLocation API
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        formValues.address.latitude = position.coords.latitude;
        formValues.address.longitude = position.coords.longitude;
      });
    }

    useField('consumer.user.name', (value: string) => {
      if (!value) {
        return 'O nome é obrigatório';
      }

      if (value.length < 3) {
        return 'O nome tem de ter pelo menos 3 caracteres';
      }

      return true;
    });

    useField('consumer.user.phone', (value: string) => {
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

    useField('consumer.user.vat', (value: string) => {
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

    useField('consumer.user.email', (value: string) => {
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

    useField('address.number', (value: string) => {
      if (!value || Number(value) === 0) {
        return 'O número é obrigatório';
      }

      if (Number.isNaN(value)) {
        return 'O número tem de ser um número';
      }

      if (value.length < 1) {
        return 'O número tem de ter pelo menos 1 caracter';
      }

      return true;
    });

    useField('address.door', (value: string) => {
      if (!value) {
        return 'A porta é obrigatória';
      }

      if (value.length < 1) {
        return 'A porta tem de ter pelo menos 1 caracter';
      }

      return true;
    });

    useField('address.floor', (value: string) => {
      if (!value || Number(value) === 0) {
        return 'O andar é obrigatório';
      }

      if (Number.isNaN(value)) {
        return 'O andar tem de ser um número';
      }

      if (value.length < 1) {
        return 'O andar tem de ter pelo menos 1 caracter';
      }

      return true;
    });

    useField('address.zipCode', (value: string) => {
      if (!value) {
        return 'O código postal é obrigatório';
      }

      if (value.length < 8) {
        return 'O código postal tem de ter pelo menos 8 caracteres';
      }

      // Validate portuguese zip code with regex
      const zipRegex = /^[0-9]{4}-[0-9]{3}$/;
      if (!zipRegex.test(value)) {
        return 'O código postal tem de ser um código postal português';
      }

      return true;
    });

    useField('address.street', (value: string) => {
      if (!value) {
        return 'A rua é obrigatória';
      }

      if (value.length < 3) {
        return 'A rua tem de ter pelo menos 3 caracteres';
      }

      return true;
    });

    useField('address.parish', (value: string) => {
      if (!value) {
        return 'A freguesia é obrigatória';
      }

      if (value.length < 3) {
        return 'A freguesia tem de ter pelo menos 3 caracteres';
      }

      return true;
    });

    useField('address.county', (value: string) => {
      if (!value) {
        return 'O concelho é obrigatório';
      }

      if (value.length < 3) {
        return 'O concelho tem de ter pelo menos 3 caracteres';
      }

      return true;
    });

    useField('address.city', (value: string) => {
      if (!value) {
        return 'A cidade é obrigatória';
      }

      if (value.length < 3) {
        return 'A cidade tem de ter pelo menos 3 caracteres';
      }

      return true;
    });

    useField('address.district', (value: string) => {
      if (!value) {
        return 'O distrito é obrigatório';
      }

      if (value.length < 3) {
        return 'O distrito tem de ter pelo menos 3 caracteres';
      }

      return true;
    });

    useField('address.latitude', (value: string) => {
      if (!value && Number(value) !== 0) {
        return 'A latitude é obrigatória';
      }

      if (Number.isNaN(Number(value))) {
        return 'A latitude tem de ser um número';
      }

      if (value.length < -90 || value.length > 90) {
        return 'A latitude tem de ser um número entre -90 e 90';
      }

      return true;
    });

    useField('address.longitude', (value: string) => {
      if (!value && Number(value) !== 0) {
        return 'A longitude é obrigatória';
      }

      if (Number.isNaN(Number(value))) {
        return 'A longitude tem de ser um número';
      }

      if (value.length < -180 || value.length > 180) {
        return 'A longitude tem de ser um número entre -180 e 180';
      }

      return true;
    });

    const store = useStore();

    const activeIndex = ref(0);
    const prevPage = () => {
      activeIndex.value--;
    };
    const nextPage = () => {
      activeIndex.value++;
    };

    const loading = ref(false);
    const register = handleSubmit(async () => {
      loading.value = true;
      await store.dispatch('registerConsumer', formValues);
      loading.value = false;
    });

    return {
      loading,
      formValues,
      formErrors,
      register,
      prevPage,
      nextPage,
      activeIndex,
    };
  },
};
</script>

<style scoped>
#formConsumer {
  max-width: 50vw;
}
</style>
