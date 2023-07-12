<template>
  <Toast>
    <template #message="slotProps">
      <div class="p-toast-message-text">
        <span class="p-toast-summary">{{ slotProps.message.summary }}</span>
        <div class="p-toast-detail" v-html="slotProps.message.detail" />
      </div>
    </template>
  </Toast>
  <Navbar></Navbar>

  <RouterView />

  <Footer></Footer>
  <Search></Search>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import Search from '@/components/Search.vue';
import Footer from '@/components/Footer.vue';
import Toast from 'primevue/toast';
</script>

<style>
* {
  /* font-family: 'Roboto', sans-serif; */
  /* font-family: 'DM Serif Display', serif; */
  /* color: #232323; */
  font-family: 'Inter', sans-serif;
}
.main-txt {
  font-family: 'DM Serif Display', serif;
}
.grey-txt {
  color: #5a5a5a;
}

.dgreen-txt {
  color: #164a41;
}

.yellow-txt {
  color: #f1b24a;
}

.main-txt {
  font-family: 'DM Serif Display', serif;
}

.parent {
  display: block;
  margin: auto;
  width: 95%;
}

.card {
  border: none !important;
}

.circle-btn {
  border-radius: 100% !important;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 2.5rem;
}

.light-search {
  border: solid 1px #e9e9e9 !important;
}

.light-search::placeholder {
  color: #a9a9a9 !important;
}

button a {
  color: #5a5a5a;
  text-decoration: none !important;
}

button a:hover {
  color: white;
  text-decoration: none !important;
}

.separator-top {
  border-top: 1px solid #f3f3f3;
}

.separator-bottom {
  border-bottom: 1px solid #f3f3f3;
}

/* TODO - ver se não interfere com ninguém */
/* Scrollbar //////////////////////////////////////////// */

/* Google chrome */
::-webkit-scrollbar {
  width: 0.8em; /* Largura da barra */
  background-color: #f3f3f3;
}
::-webkit-scrollbar-thumb {
  background-color: #d3d3d3; /* Cor do thumb da barra */
  border-radius: 20px;
  border: none;
}
::-webkit-scrollbar-thumb:hover {
  background-color: #b1b1b1;
}

/* Firefox */
::-moz-scrollbar {
  width: 8px; /* Largura da barra */
  background-color: #f3f3f3;
}
::-moz-scrollbar-thumb {
  background-color: #d3d3d3; /* Cor do thumb da barra */
  border-radius: 20px;
  border: none;
}
::-moz-scrollbar-thumb:hover {
  background-color: #b1b1b1;
}
/* ////////////////////////////////////////////////////// */
</style>
