<template>
  <Navbar></Navbar>

  <RouterView />

  <Footer></Footer>
  <Search></Search>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import Search from '@/components/Search.vue';
import Footer from '@/components/Footer.vue';
import InputText from 'primevue/inputtext';
</script>

<style>
* {
  /* font-family: 'Roboto', sans-serif; */
  /* font-family: 'DM Serif Display', serif; */
  color: #232323;
  font-family: 'Inter', sans-serif;
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
</style>
