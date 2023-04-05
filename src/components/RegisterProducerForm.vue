<!-- This is the component that will be rendered when the user selects the consumer option in the registration form -->
<template>
    <form class="register" @submit.prevent="register">
    <div>
        <input
            type="text"
            placeholder="Empresa"
            v-model="register_form.business" />
        <input
            type="text"
            placeholder="Phone number"
            v-model="register_form.phone_number" />
        <input
            type="text"
            placeholder="NIF"
            v-model="register_form.nif" />
        <input
            type="email"
            placeholder="Email address"
            v-model="register_form.email" />
        <input
            type="password"
            placeholder="Password"
            v-model="register_form.password" />
        <input
            type="submit"
            value="Register"
            method="post"
            action="../api/producers.ts" />
    </div>  
    </form>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'


export default {
setup () {
    const register_form = ref({});
    const store = useStore();
    const register = async () => {
        // const { email, password } = login_form.value
        // try {
        //     await createUserWithEmailAndPassword(auth, email, password)
        //     } catch (error) {
        //         console.log("" + error.code)
        //         switch (error.code) {
        //             case 'auth/email-already-in-use':
        //                 alert('Email já em uso')
        //                 break
        //             case 'auth/invalid-email':
        //                 alert('Email inválido')
        //                 break
        //             case 'auth/weak-password':
        //                 alert('Palavra-passe fraca')
        //                 break
        //             default:
        //                 alert('Erro ao registar')
        //         }
        //         return 
        //     }
            
        store.dispatch('register', register_form.value);
    }
    return {
        register_form,
        register
    }
}
}

</script>