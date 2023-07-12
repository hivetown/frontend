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
        <div class="img-add">
          <div class="img-add-sign">+</div>
        </div>
      </div>
      <div class="consumer-main-info">
        <h1 class="dgreen-txt main-txt">{{ usernameValue }}</h1>
      </div>
      <div class="edit-consumer">
        <PrimeButton rounded severity="secondary" class="buy-btn"
          >Apagar conta</PrimeButton
        >
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
              :class="{ 'custom-cursor': !isEditing }"
              id="username"
              v-model="usernameValue"
              :readonly="!isEditing"
              aria-describedby="username-help"
            />
          </div>
        </div>
        <!-- Email -->
        <div class="card flex justify-content-center">
          <div class="flex flex-column gap-2">
            <label for="email">Email</label>
            <InputText
              :class="{ 'custom-cursor': !isEditing }"
              id="username"
              v-model="emailValue"
              :readonly="true"
              aria-describedby="username-help"
            />
            <label
              v-if="isEditing"
              for="email"
              style="color: red !important; font-size: 0.75em"
              >Não pode alterar o Email</label
            >
          </div>
        </div>
        <!-- Password -->
        <!-- <div class="card flex justify-content-center">
          <div class="flex flex-column gap-2">
            <label for="password">Password</label>
            <div>
              <Password v-model="passwordValue" :readonly="true" toggle-mask />
            </div>
          </div>
        </div> -->
      </div>
      <!-- Dados -->
      <div class="form-box-block">
        <!-- Phone -->
        <div class="card flex justify-content-center">
          <div class="flex flex-column gap-2">
            <label for="telefone">Telefone</label>
            <InputMask
              :class="{ 'custom-cursor': !isEditing }"
              id="basic"
              v-model="phoneValue"
              :readonly="!isEditing"
              mask="999 999 999"
              placeholder="999999999"
            />
          </div>
        </div>
        <!-- Vat -->
        <div class="card flex justify-content-center">
          <div class="flex flex-column gap-2">
            <label for="vat">VAT</label>
            <InputMask
              :class="{ 'custom-cursor': !isEditing }"
              id="basic"
              v-model="vatValue"
              :readonly="true"
              mask="999999999"
              placeholder="999999999"
            />
            <label
              v-if="isEditing"
              for="vat"
              style="color: red !important; font-size: 0.75em"
              >Não pode alterar o VAT</label
            >
          </div>
        </div>
      </div>
      <!-- Moradas -->
      <div class="form-box-block" style="max-height: 25vh; overflow-y: scroll">
        <!-- Moradas -->
        <div v-if="userType === 'CONSUMER'">
          <h4 class="mb-2 morada-tit">Moradas guardadas</h4>
          <div
            v-for="morada in moradas"
            :key="morada.id"
            class="d-flex align-items-center gap-3"
            style="border-bottom: 2px solid #f3f3f3; padding: 0.3vh"
          >
            <p class="mt-2">{{ morada.getFullAddress }}</p>
            <!-- <i
              class="bi bi-pencil icon-edit"
              style="font-size: 1.4em; margin-top: -1.2vh"
            ></i> -->
          </div>
        </div>
        <div v-else>
          <h4 class="mb-2 morada-tit">Unidades de Produção</h4>
          <div
            v-for="up in productionUnits.items"
            :key="up.id"
            style="border-bottom: 2px solid #f3f3f3; padding: 0.3vh"
          >
            <div>
              {{ up.name }}
            </div>

            <div class="d-flex align-items-center gap-3">
              {{ up.address.getFullAddress }}
              <!-- <i
                class="bi bi-pencil icon-edit"
                style="font-size: 1.4em; margin-top: -1.2vh"
              ></i> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="end-edit parent">
      <PrimeButton rounded class="edit-btn" @click="toggleEdit">
        {{ isEditing ? 'Guardar' : 'Editar' }}</PrimeButton
      >
      <PrimeButton
        rounded
        outlined
        class="edit-btn"
        @click="cancelEdit"
        :disabled="!isEditing"
        >Cancelar</PrimeButton
      >
    </div>
    <!-- {{ user?.user }} -->
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import {
  Address,
  Consumer,
  Producer,
  ProductionUnit,
  BaseItems,
} from '@/types';
import { getConsumerId, getProducerIdSimple, getAddressPU } from '@/api';
import InputText from 'primevue/inputtext';
import InputMask from 'primevue/inputmask';
import PrimeButton from 'primevue/button';

export default defineComponent({
  data() {
    return {
      userLoggedId: 0 as number,
      userType: '' as string,
      user: null as Consumer | Producer | null,
      usernameValue: '' as string,
      emailValue: '' as string,
      passwordValue: '' as string,
      phoneValue: '' as string,
      vatValue: '' as string,
      moradas: [] as Address[] | undefined, //TODO - corrigir este tipo
      productionUnits: {} as BaseItems<ProductionUnit>,
      isEditing: false,
    };
  },
  async beforeMount() {
    // Ir buscar o utilizador que está logado
    const store = this.$store;
    const userLoggedId = computed(() => store.state.user);
    if (userLoggedId.value) {
      this.userLoggedId = userLoggedId.value['user']['id'];
      this.userType = userLoggedId.value['user']['type'];
    }
    //   Ir buscar o resto dos dados do utilizador
    // Se for consumidor
    if (this.userType === 'CONSUMER') {
      const response = await getConsumerId(Number(this.userLoggedId));
      this.user = response.data;

      this.usernameValue = this.user.user.name;
      this.emailValue = this.user.user.email;
      this.phoneValue = this.user.user.phone;
      this.vatValue = this.user.user.vat;
      this.moradas = this.user['addresses'];
    }
    // Se for fornecedor
    else if (this.userType === 'PRODUCER') {
      const response = await getProducerIdSimple(Number(this.userLoggedId));
      this.user = response.data;

      this.usernameValue = this.user.user.name;
      this.emailValue = this.user.user.email;
      this.phoneValue = this.user.user.phone;
      this.vatValue = this.user.user.vat;

      const responseAddressesPU = await getAddressPU(Number(this.userLoggedId));
      this.productionUnits = responseAddressesPU.data;
    }
  },
  methods: {
    toggleEdit() {
      this.isEditing = !this.isEditing;
    },
    cancelEdit() {
      this.isEditing = false;
      if (this.usernameValue && this.phoneValue && this.user) {
        this.usernameValue = this.user.user.name;
        this.phoneValue = this.user.user.phone;
      }
    },
  },
  components: { InputMask, InputText, PrimeButton },
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
.img-add {
  /* background-color: red; */
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 65%;
  margin-top: -3vh;
}
.img-add-sign {
  background-color: #5a5a5a;
  border-radius: 50%;
  padding: 0.3em;
  width: 4vh;
  height: 4vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

.consumer-main-info {
  /* background-color: red; */
  width: 75%;
  display: flex;
  align-items: center;
}

.edit-consumer {
  /* background-color: yellow; */
  width: 25%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

/* .buy-btn {
  width: 60% !important;
} */

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
  justify-content: center;
  align-items: center;
  display: flex;
}

label,
.morada-tit {
  color: #164a41 !important;
}
.custom-cursor {
  cursor: default;
}
.icon-edit:hover {
  cursor: pointer !important;
}

@media (max-width: 767px) {
  .consumer-main-info {
    margin-left: 2vh;
    margin-bottom: 1vh;
  }
  .consumer-image img {
    display: block !important;
  }
  .consumer {
    display: block;
  }
  .form-box {
    display: block;
    margin-top: 14vh;
  }
  .form-box-block {
    margin-top: 4vh;
    width: 100%;
  }
  .end-edit {
    margin-top: 6vh;
    margin-bottom: 4vh;
  }
  .edit-consumer {
    width: 100% !important;
    margin-bottom: 3vh !important;
    scale: 0.9;
  }
}
</style>
