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
          <AuthConsumer></AuthConsumer>
        </div>
        <div v-else-if="userType == 'Producer'">
          <RegisterProducerForm></RegisterProducerForm>
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
import { useStore } from 'vuex';
import AuthConsumer from '../components/AuthConsumer.vue';
import RegisterProducerForm from '../components/RegisterProducerForm.vue';
export default {
  components: {
    AuthConsumer,
    RegisterProducerForm,
  },
  setup() {
    const register_form = ref({});
    const store = useStore();
    const register = () => {
      store.dispatch('register', register_form.value);
    };

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
      register_form,
      register,
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
