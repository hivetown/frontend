<template>
	<main class="login">
		<section class="forms">

			
                <div class="p-field-radiobutton">
                    <p>É um Consumidor ou um Fornecedor?</p>
                      <input type="radio" id="consumer" name="consumer_supplier" checked @click="saveValue('Consumer')">
                      <label for="consumer">Consumidor</label>
                      <input type="radio" id="supplier" name="consumer_supplier" @click="saveValue('Producer')">
                      <label for="supplier">Fornecedor</label>                    
                   

				
				
				<div v-if="userType == 'Consumer'">
					
					
			
					<AuthConsumer></AuthConsumer>
				</div>
				<div v-else-if="userType == 'Producer'" >
					<RegisterProducerForm></RegisterProducerForm>
				</div>
					<!-- <input
						type="text"
						placeholder="Name"
						v-model="register_form.name" />
					<input
						type="text"
						placeholder="Address"
						v-model="register_form.address" />
					<input
						type="text"
						placeholder="Phone number"
						v-model="register_form.phone_number" />
					<input
						type="date"
						placeholder="Date of birth"
						v-model="register_form.date_of_birth" />
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
					value="Register" method="post" action="../api/producers.ts" />	 -->
				
				<!-- <div v-else-if="register_form.consumer_supplier == 'supplier'">
					<input
						type="text"
						placeholder="Name"
						v-model="register_form.name" />
					<input
						type="text"
						placeholder="Address"
						v-model="register_form.address" />
					<input
						type="text"
						placeholder="Phone number"
						v-model="register_form.phone_number" />
					<input
						type="text"
						placeholder="NIF"
						v-model="register_form.nif" />
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
					value="Register" method="post" action="../api/consumers.ts"/>

				</div> -->
				<p id="loginLink">Já tem uma conta? <router-link to="/login">Login</router-link></p>
                </div>
				
				
					<!-- Create a link to the login page -->
				

			<!-- </form> -->
			<!-- Create buthon to redirect to step 2 of registration -->
			


		</section>
	</main>
</template>

<script lang="ts">
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import router from '../router';
import AuthConsumer from '../components/AuthConsumer.vue';
import RegisterProducerForm from '../components/RegisterProducerForm.vue';
import state from '../store/index';
export default {
	components: {
		AuthConsumer, RegisterProducerForm
	},
	setup () {
		const register_form = ref({});
		const store = useStore();
		const register = () => {
			store.dispatch('register', register_form.value);
		}
		//////////////////////////////////////
		const tipo = computed(() => state.tipo);
		//////////////////////////////////////
		// create ref to save the value of the radio button
		const userType = ref('Consumer');
		// create function to save the value of the radio button
		function saveValue(radioValue) {
			// Get the value of the input field with id="supplier"
			// userType.value = radioValue;
			//////////////////////////////////////
			state.tipo = radioValue;
			//////////////////////////////////////
			userType.value = radioValue;
			// let type = userType.value;
			// save the value of the radioValue in the store
			// store.dispatch('userType', userType.value);
			console.log("userType_registo1: ", userType.value);
		}
		function getUserType() {
			console.log("userType_registo2: ", userType.value);
      		// return userType.value;
			return tipo.value;
   		}
		return {
			register_form,
			register,
			userType,
			saveValue,
			getUserType
		}
	}
}



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