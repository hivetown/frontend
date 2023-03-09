<template>
	<main class="login">
		<section class="forms">

			<form class="register" @submit.prevent="register">
                <!-- create a radio button to choose if you are a consumer or supplier -->
                <div class="p-field-radiobutton">
                    <p>Are you a consumer or a supplier?</p>
                      <input type="radio" id="consumer" name="consumer_supplier" value="consumer">
                      <label for="consumer">Consumer</label><br>
                      <input type="radio" id="supplier" name="consumer_supplier" value="supplier">
                      <label for="supplier">Supplier</label><br>                    
                    <br>

                    
                </div>
				<h2>Register</h2>
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
					value="Register" />
			</form>


		</section>
	</main>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'



export default {
	setup () {
		const register_form = ref({});
		const store = useStore();
		const register = () => {
			store.dispatch('register', register_form.value);
		}
		return {
			register_form,
			register
		}
	}
}
</script>
