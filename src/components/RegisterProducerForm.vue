<!-- This is the component that will be rendered when the user selects the consumer option in the registration form -->
<!-- <template>
    <form class="register" @submit.prevent="register">
    <div>
        <input
            type="text"
            placeholder="Empresa"
            v-model="register_form.name" />
        <input
            type="text"
            placeholder="Telemóvel"
            v-model="register_form.phone" />
        <input
            type="text"
            placeholder="NIF"
            v-model="register_form.vat" />
        <input
            type="email"
            placeholder="Email"
            v-model="register_form.email" />
        <input
            type="password"
            placeholder="Palavra passe"
            v-model="register_form.password" />
        <input
            type="submit"
            value="Registar" />
    </div>  
    </form>
</template> -->

<template>
    <form class="register" @submit.prevent="register">
      <div>
        <label for="name">Nome</label>
        <input type="text" placeholder="Nome" v-model="register_form.name" />
        <p v-if="errors.name">{{ errors.name }}</p>
        <label for="Telemóvel">Número</label>
        <input type="text" placeholder="Telemóvel" v-model="register_form.phone" />
        <p v-if="errors.phone">{{ errors.phone }}</p>
        <label for="NIF">Porta</label>
        <input type="text" placeholder="NIF" v-model="register_form.vat" />
        <p v-if="errors.vat">{{ errors.vat }}</p>
        <label for="Email">Andar</label>
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
// import { ref } from 'vue'
// import { useStore } from 'vuex'


// export default {
// setup () {
//     const register_form = ref({});
//     const store = useStore();
//     const register = async () => {
//         // const { email, password } = login_form.value
//         // try {
//         //     await createUserWithEmailAndPassword(auth, email, password)
//         //     } catch (error) {
//         //         console.log("" + error.code)
//         //         switch (error.code) {
//         //             case 'auth/email-already-in-use':
//         //                 alert('Email já em uso')
//         //                 break
//         //             case 'auth/invalid-email':
//         //                 alert('Email inválido')
//         //                 break
//         //             case 'auth/weak-password':
//         //                 alert('Palavra-passe fraca')
//         //                 break
//         //             default:
//         //                 alert('Erro ao registar')
//         //         }
//         //         return 
//         //     }
            
//         store.dispatch('register', register_form.value);
//     }
//     return {
//         register_form,
//         register
//     }
// }
// }


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





      if (!register_form.name) {
        errors.value.name = 'Por favor, preencha o seu nome.';
        isValid = false;
      } else if (!regex.test(register_form.name)) {
        errors.value.name = 'Por favor, preencha um nome válido.';
        isValid = false;
      }
      console.log("name", isValid)
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