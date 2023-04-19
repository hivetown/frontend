<template>
	<div class="root">
	  <div class="wrapper-mains">
		<h1>Gestão de Encomenda de Fornecedor</h1>
		<p><em>As informações abaixo são exatamente que o utilizador verá se desejar ver o estado da sua encomenda</em></p>
		<hr>
		<div id = "principal">
		  <!-- TODO adicionar o numero da encomenda 
		  <p>{{ orders }}</p>
		  <p>{{ orderItem }}</p> -->
		  <p class="titulo" v-if="orders['totalItems'] === 0">Ainda nao foi realizada nenhuma encomenda</p> 
		  <p class="titulo" v-if="orders['totalItems'] !== 0">Estado da encomenda {{ $route.params.id }}</p>
		  <Progresso :length="4" v-if="orders['totalItems'] !== 0 && orderItem['status'] !== 'Canceled'"></Progresso>
		  <i v-if="orderItem['status'] === 'Canceled'" class="bi bi-x-circle">Encomenda cancelada</i>
		</div>
		<div class="tabela" v-if="orders['totalItems'] !== 0">
		  <OrderDetails />
		</div>
	  </div>
	</div>
  </template>
  
	<script lang="ts">
	import Progresso from '../components/Progress.vue';
	import OrderDetails from '../components/OrderDetails.vue';
	export default {
	  components:{
		Progresso,
		OrderDetails,
	  }
	}
	</script>
	<script setup lang="ts">
	import { onMounted, ref} from "vue";
	 import { fetchAllItems, fetchAllOrders, fetchOrder } from "../api";
	 import { fetchUser } from "../api";
	 import { Order, Consumer} from "../types/interfaces";
  
  
	 const user = ref<Consumer[]>([]);
	 const orderItem = ref<Order[]>([]); //array com os produtos
	 const orders = ref<Order[]>([]);
	  const search = ref('');
	  onMounted(async () => {
		const userItem = await fetchUser();
		user.value=userItem.data;
		const responseOrder = await fetchAllOrders('1');
		//TODO trocar para este quando o user tiver encomendas
		//const responseOrder = await fetchAllOrders(user.value['id']);
		orders.value=responseOrder.data
		const id = window.location.pathname.split('/id').pop()?.toString();
		//obtem o id da encomenda
		console.log(id);
		//trocar o um pelo do user logado
		//const orderId = await fetchAllItems('1', id);
		//orderItem.value=orderId.data;
		//trocar o 1 para o user logado (user.value['id'])
		const responseItem = await fetchOrder('1', id);
		orderItem.value=responseItem.data;
	 })
  </script>
	<style scoped>
	.wrapper-mains{
		height: auto;
		background: white;
		text-align: center;
		margin: auto;
		padding: 20px  ;
	}
	.textarea{
		display: block;
		width: 100%;
		height: 70px;
		border-radius: 5px;
	}
	.tabela{
	  margin-top: 180px;
	}
	.titulo {
	  font-size: 20px;
	}
	@media (max-width: 660px) {
	  .titulo {
	  font-size: 25px;
	  text-align: center !important;
	}
	.resumo {
	  margin-top: 10px;
	  text-align: right;
	  margin-right: 40px;
	}
	}
	
	</style>
	