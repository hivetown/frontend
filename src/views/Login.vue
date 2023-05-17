<template>
  <main class="login">
    <section class="forms">
      <form class="login" @submit.prevent="login">
        <h2>Login</h2>
        <div class="grid-item">
          <input type="email" placeholder="Email" v-model="loginForm.email" />
        </div>
        <div class="grid-item">
          <input
            type="password"
            placeholder="Palavra passe"
            v-model="loginForm.password"
          />
        </div>

        <div class="grid-item">
          <input type="submit" value="Login" />
        </div>

        <p>
          Não tem uma conta?
          <router-link to="/registration">Registar</router-link>
        </p>
      </form>
    </section>
  </main>
</template>

<script lang="ts">
import { useStore } from '@/store';
import { ref } from 'vue';
export default {
  setup() {
    const loginForm = ref({
      email: '',
      password: '',
    });
    const store = useStore();
    const login = () => {
      return store.dispatch('login', loginForm.value);
    };
    return {
      loginForm,
      login,
    };
  },
};
</script>

<style>
.forms {
  display: flex;
  min-height: 100vh;
}
form {
  flex: 1 1 0%;
  padding: 3rem 1rem 1rem;
}
form.register {
  color: rgb(0, 0, 0);
}
h2 {
  font-size: 2rem;
  text-transform: uppercase;
  margin-bottom: 2rem;
}
input {
  border: none;
  outline: none;
  background: none;
  display: block;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  font-size: 1.5rem;
  margin-bottom: 2rem;
  padding: 0.5rem 0rem;
}
input:not([type='submit']) {
  opacity: 0.8;
  transition: 0.4s;
}
input:focus:not([type='submit']) {
  opacity: 1;
}
input::placeholder {
  color: inherit;
}
form.register input:not([type='submit']) {
  color: #2c3e50;
  border-bottom: 2px solid #2c3e50;
  margin-bottom: 10%;
}
form.login input:not([type='submit']) {
  color: #2c3e50;
  border-bottom: 2px solid #2c3e50;
}
input[type='submit'] {
  background: #2c3e50;
  color: #fff;
  border: 2px solid #2c3e50;
  cursor: pointer;
  transition: 0.4s;
  font-weight: 700;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  text-transform: uppercase;
  margin-bottom: 1rem;
}
input[type='submit']:hover {
  background: #fff;
  color: #2c3e50;
}
</style>
