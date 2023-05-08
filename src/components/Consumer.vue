<template>
    <h3>Consumidores</h3>
    <div class="card-container">
    <div v-for="idx in qtd" :key="idx">
<!--TODO trocar para users.image-->
<b-card id="b-card"
        :title="users['items'][idx-1]['name']"
        :img-src="users['items'][idx-1]['image'] ? (users['items'][idx-1]['image']['url'] ? users['items'][idx-1]['image']['url'] : '../../public/semimagem.png') : '../../public/semimagem.png'" 
        :img-alt="users['items'][idx-1]['image'] ? (users['items'][idx-1]['image']['alt'] ? users['items'][idx-1]['image']['alt'] : 'sem imagem') : 'sem imagem'" 

        img-top
        tag="article"
        style="max-width: 17rem;"
        class="mb-2"
    > <b-card-text>
        {{users['items'][idx-1]['email']}} <br> {{users['items'][idx-1]['type']}}
        </b-card-text>
        <b-button :href="'admin/consumer/' + users['items'][idx-1]['id']" variant="primary">Ver perfil</b-button>
       
    </b-card>
    </div>
    </div>
    <Pagination
  :totalRows="totalItems"
            :perPage="pageSize"
            :currentPage="page"
            @page-changed="onPageChanged"
           >
    </Pagination></template>

<script lang="ts">
import Pagination from '../components/Pagination.vue';
import {getConsumers, getConsumersValues} from '../api/consumers'
import { onMounted, ref} from "vue";
import { Consumer } from "../types/interfaces";
export default {
  components: {Pagination},
  setup() {
    const users = ref<Consumer[]>([]);
    const qtd = ref(0);
    const page= ref(1);
    const pageSize = ref(24);
    const totalItems = ref(0);
    onMounted(async () => {
      try {
        const responseItems = await getConsumersValues();
        page.value=(responseItems.data.page);
        const urlSearchParams = new URLSearchParams(window.location.search);
        page.value = parseInt(urlSearchParams.get('page'));
       // page.value = 1;
        pageSize.value=(responseItems.data.pageSize);
        totalItems.value=(responseItems.data.totalItems);
        const response = await getConsumers(page.value, pageSize.value); 
        users.value = response.data;
        qtd.value = users.value.items.length;
      } catch (error) {
        console.error(error);
      }
    });
console.log(page.value);
    return { users, qtd, page, pageSize, totalItems};
  },
  methods: {
    onPageChanged(newPageNumber: number): void {
    this.page = newPageNumber;
    this.myFunction(); // chame sua função aqui
  },
  myFunction(): void {
    // sua função aqui
    const response = getConsumers(this.page, this.pageSize); 
    this.users = response.data;
    console.log(response);
    console.log(this.page);
  },
    handlePageChange(value: number) {
      this.page = value;
      console.log(value);
    },
  }
};
</script>
<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
  margin: -10px;
}

.card-container > div {
  margin: 25px;
  
}
#b-card{
  background-color: rgb(239, 243, 247);

}
</style>