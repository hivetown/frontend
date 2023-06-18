<template>
  <main class="login">
    <section class="forms">
      <div class="p-field-radiobutton">
        <p>É um Consumidor ou um Fornecedor?</p>
        <input
          type="radio"
          id="consumer"
          name="consumer_supplier"
          checked
          @click="saveValue('Consumer')"
        />
        <label for="consumer">Consumidor</label>
        <input
          type="radio"
          id="supplier"
          name="consumer_supplier"
          @click="saveValue('Producer')"
        />
        <label for="supplier">Fornecedor</label>
        <div v-if="userType == 'Consumer'">
          <RegisterConsumer></RegisterConsumer>
        </div>
        <div v-else-if="userType == 'Producer'">
          <RegisterProducer></RegisterProducer>
        </div>
        <p id="loginLink">
          Já tem uma conta? <router-link to="/login">Login</router-link>
        </p>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { ref } from 'vue';
import RegisterConsumer from '@/components/register/RegisterConsumer.vue';
import RegisterProducer from '@/components/register/RegisterProducer.vue';

export default {
  components: {
    RegisterConsumer,
    RegisterProducer,
  },
  setup() {
    // create ref to save the value of the radio button
    const userType = ref('Consumer');

    // create function to save the value of the radio button
    function saveValue(radioValue: string) {
      userType.value = radioValue;
    }

    function getUserType() {
      return userType.value;
    }

    return {
      userType,
      saveValue,
      getUserType,
    };
  },
};
</script>

<style>
/* align loginLink with Register button */
#loginLink {
  margin-left: 17px;
}

.p-field-radiobutton {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

/* create border around the form */
.forms {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
}
</style>
