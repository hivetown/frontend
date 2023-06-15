<template>
	<b-list-group>
	  <b-list-group-item
		v-for="num in notificacoes['totalItems']"
		:key="num"
		:active="notificacoes?.items?.[num - 1]?.readAt == null"
		class="flex-column align-items-start"
	  >
		<div class="d-flex w-100 justify-content-between">
		  <h5 class="mb-1">{{ notificacoes['items'][num - 1]['title'] }}</h5>
		  <small>{{ notificacoes['items'][num - 1]['createdAt'].substring(0,10) }} {{ notificacoes['items'][num - 1]['createdAt'].substring(11,19) }}</small>
  
		</div>
		<p class="mb-1">{{ notificacoes['items'][num - 1]['message'] }}</p>
		<small
		  v-if="notificacoes['items'][num - 1]['readAt'] == null"
		  @click="marcarComoLida(notificacoes['items'][num - 1]['id'])"
		>
		  <u>Marcar como lida</u>
		</small>
  
		<small
		  v-else
		  @click="marcarComoNaoLida(notificacoes['items'][num - 1]['id'])"
		>
		  <u>Marcar como não lida</u></small
		>
	  </b-list-group-item>
	</b-list-group>
	<Pagination
	  :total-rows="totalItems"
	  :per-page="pageSize"
	  :current-page="page"
	  @page-changed="onPageChanged"
	>
	</Pagination>
  </template>
  <script lang="ts">
  import Pagination from '../components/Pagination.vue';
  import { ref } from 'vue';
  import {
	postRead,
	postUnread,
	getAllNotifications,
  } from '../api/notifications';
  import { useRoute } from 'vue-router';
  const notificacoes = ref<any>('');
  const quantidade = ref<any>('');
  let intervalId: any = 2000; // Variável para armazenar o ID do intervalo
  const pageSize = ref(5);
  const totalItems = ref(0);
  const page = ref(1);
  
  export default {
	components: { Pagination },
	data() {
	  return {
		notificacoes,
		page,
		pageSize,
		totalItems,
	  };
	},
  
	async mounted() {
	  const responseItems = await getAllNotifications();
	  page.value = responseItems.data.page;
	  //nao consegui usar o route, dava me sempre undefined
	  const urlSearchParams = new URLSearchParams(window.location.search);
	  page.value = parseInt(urlSearchParams.get('page') ?? '') || 1;
	  pageSize.value = 5;
	  totalItems.value = responseItems.data.totalItems;
	  await this.loadNotifications();
	  this.startAutoReload(); // Inicia o recarregamento automático
	},
  
	methods: {
	  onPageChanged(newPageNumber: number): void {
		this.page = newPageNumber;
		this.myFunction(); // chame sua função aqui
	  },
	  async myFunction() {
		const response = await getAllNotifications(this.page, this.pageSize);
		this.notificacoes = response.data;
	  },
	  handlePageChange(value: number) {
		this.page = value;
	  },
	  async loadNotifications() {
		try {
		  const responseItem = await getAllNotifications(
			page.value,
			pageSize.value
		  );
		  notificacoes.value = responseItem.data;
		  quantidade.value = responseItem.data.totalItems;
		} catch (error) {
		  console.error(error);
		}
	  },
	  async marcarComoLida(id:number) {
		await postRead(id);
		await this.reloadPage();
	  },
	  async marcarComoNaoLida(id:number) {
		await postUnread(id);
		await this.reloadPage();
	  },
	  async reloadPage() {
		const scrollPosition = window.scrollY || window.pageYOffset;
		try {
		  await new Promise((resolve) => setTimeout(resolve, 500)); // Aguarda 500ms (opcional)
		  await this.loadNotifications();
		  window.scrollTo(0, scrollPosition);
		} catch (error) {
		  console.error(error);
		}
	  },
	  startAutoReload() {
		intervalId = setInterval(() => {
		  this.loadNotifications();
		}, 45000);
	  },
	  stopAutoReload() {
		clearInterval(intervalId);
	  },
	},
  };
  </script>
  <style scoped>
  hr {
	color: black;
  }
  #popup {
	border-radius: 1%;
	position: absolute;
	top: 64%;
	right: 1%;
	width: 500px;
	background-color: #f3f3f3;
	border: 1px solid #ccc;
	padding: 10px;
	z-index: 9999;
	box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }
  
  #popup h5 {
	margin-top: 0;
  }
  
  .sticky-bar {
	position: sticky;
	top: 0;
	/* Prefixos do navegador */
	position: -webkit-sticky;
	position: -moz-sticky;
	position: -ms-sticky;
	z-index: 2;
	overflow-y: auto; /* Habilita a rolagem vertical */
	max-height: 500px; /* Define a altura máxima da barra */
  }
  
  .content {
	margin-top: 20px; /* Ajuste para a altura da barra sticky */
  }
  
  .active {
	background-color: #d3e3e6 !important; /* Define a cor de fundo para as notificações não lidas */
	border-color: #d3e3e6 !important;
  }
  </style>