<template>
	<b-list-group>
	  <b-list-group-item v-if="notificacoes"
		v-for=" (notificacoes, idx) in notificacoes.items"
		:key="notificacoes.id"
		:active="notificacoes?.readAt == null"
		class="flex-column align-items-start"
	  >
		<div class="d-flex w-100 justify-content-between">
		  <h5 class="mb-1">{{ notificacoes.title}}</h5>
		  <small>{{ notificacoes.createdAt.substring(0,10) }} {{ notificacoes.createdAt.substring(11,19) }}</small>
  
		</div>
		<p class="mb-1">{{ notificacoes.message}}</p>
		<small
		  v-if="notificacoes.readAt== null"
		  @click="marcarComoLida(notificacoes.id)"
		>
		  <u>Marcar como lida</u>
		</small>
  
		<small
		  v-else
		  @click="marcarComoNaoLida(notificacoes.id)"
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
 <script setup lang="ts">
 import Pagination from '../components/Pagination.vue';
 import { ref, onBeforeMount } from 'vue';
 import {
   postRead,
   postUnread,
   getAllNotifications,
   getUnreadNotifications
 } from '../api/notifications';
 import { BaseItems, Notification } from '@/types';
 const notificacoes = ref<BaseItems<Notification>>();
 const quantidade = ref<number>(0);
 let intervalId: any = 45000; // Variável para armazenar o ID do intervalo
 const pageSize = ref<number>(5);
 const totalItems = ref<number>(0);
 const page = ref<number>(1);
 //tentativa emit
//const app = {
 // emit(event: string, value: any) {
 // }
//};
 
 onBeforeMount(async () => {
   const responseItems = await getAllNotifications();
   page.value = responseItems.data.page;
   const response = await getUnreadNotifications();
quantidade.value=response.data.totalItems;
   const urlSearchParams = new URLSearchParams(window.location.search);
   page.value = parseInt(urlSearchParams.get('page') ?? '') || 1;
   pageSize.value = 5;
   totalItems.value = responseItems.data.totalItems;
   await loadNotifications();
   startAutoReload(); // Inicia o recarregamento automático
 })
 
 function onPageChanged(newPageNumber: number): void {
   page.value = newPageNumber;
   myFunction(); // chame sua função aqui
 }
 
 async function myFunction() {
   const response = await getAllNotifications(page.value, pageSize.value);
   notificacoes.value = response.data;
 }
 
 function handlePageChange(value: number) {
   page.value = value;
 }
 
 async function loadNotifications() {
   try {
	 const responseItem = await getAllNotifications(page.value, pageSize.value);
	 notificacoes.value = responseItem.data;
	
   } catch (error) {
	 console.error(error);
   }
 }
 
 async function marcarComoLida(id: number) {
   await postRead(id);
   quantidade.value = quantidade.value-1;
  // app.emit('qtdNotificacoes', quantidade.value);
   await reloadPage();
  
 }
 
 async function marcarComoNaoLida(id: number) {
   await postUnread(id);
   quantidade.value = quantidade.value+1;
  // app.emit('qtd-notificacoes', quantidade.value);
   await reloadPage();
 }
 
 async function reloadPage() {
   const scrollPosition = window.scrollY || window.pageYOffset;
   try {
	 await new Promise((resolve) => setTimeout(resolve, 500)); // Aguarda 500ms (opcional)
	 await loadNotifications();
	 window.scrollTo(0, scrollPosition);
   } catch (error) {
	 console.error(error);
   }
 }
 
 function startAutoReload() {
   intervalId = setInterval(() => {
	 loadNotifications();
   }, 45000);
 }
 
 function stopAutoReload() {
   clearInterval(intervalId);
 }
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