a<template>
  <div class="table-container" style="overflow: auto">
    <!--
      obter o user logado
      <p>{{ user['id'] }}</p>
    -->
  <table class="table table-striped">
<thead>
  <tr>
    <th id="col" scope="col">Artigo</th>
    <th id="col" scope="col">Nome</th>
    <th id="col" scope="col">Fornecedor</th>
    <th id="col" scope="col">Preço</th>
    <th id="col" scope="col">Quantidade</th>
    <th id="col" scope="col">Estado</th>
    <th id="col" scope="col">Total</th>
  </tr>
</thead>
<tbody>
  <tr v-for="num in orderItem['totalItems']" :key="num">
<!--<p>{{orderItem?.items[num-1]?.producerProduct?.productSpec?.images[num-1]}}</p>-->
   <!-- <td><img src= "{{ orderItem?.items[num-1]?.producerProduct?.productSpec?.images[num-1]?.url }} "/></td>-->
   <td><a :href="'/products/' + orderItem?.items[num-1]?.producerProduct?.productSpec?.id"><img v-if="orderItem['items'][num-1]['producerProduct']['productSpec']['images'].length !== 0" :src="orderItem?.items[num-1]?.producerProduct?.productSpec?.images[0]?.url" style="width: 50px; height: 50px;" /><p id="texto" v-else>Produto <br> sem imagem</p></a></td>
    <!--TODO por marcas e produto como links-->
   <!-- <td><img src="https://i.imgur.com/o2fKskJ.jpg"></td> -->
    <td>   
      <a id="texto" :href="'/products/' + orderItem?.items[num-1]?.producerProduct?.productSpec?.id">{{orderItem['items'][num-1]['producerProduct']['productSpec']['name'] }}</a>
    </td>
    <td>
      <a id="texto" :href="'/producer/'"><p id="texto">{{orderItem['items'][num-1]['producerProduct']['producer']['name'] }}</p></a>
    </td>
    <td>
      <p id="texto">{{orderItem['items'][num-1]['price'] }}</p>
    </td>
    <td>
      <p id="texto">{{orderItem['items'][num-1]['quantity'] }}</p>
    </td>
    <td>
  
      <div v-if="orderItem['items'][num-1]['status'] === 'Delivered'"  style="display: inline-flex">
                  <i class="bi bi-check-all"></i>
               <p id="texto"> Entregue</p>
              </div>
              <div v-if="orderItem['items'][num-1]['status'] === 'Processing'"  style="display: inline-flex">
                <i  class="bi bi-arrow-repeat"></i>
                  <p id="texto">Em processamento</p>
              </div>
              <div v-if="orderItem['items'][num-1]['status'] === 'Paid'"  style="display: inline-flex">
                  <i class="bi bi-cash-coin"></i>  
                  <p id="texto"> Pago</p>             
              </div>
              <div v-if="orderItem['items'][num-1]['status'] === 'Canceled'" style="display: inline-flex">
                <i class="bi bi-x-lg"></i>    
                <p id="texto"> Cancelada</p>          
              </div>
              <div v-if="orderItem['items'][num-1]['status'] === 'Shipped'"  style="display: inline-flex">
                <i class="bi bi-truck"></i>
                <p id="texto"> Em andamento</p>
              </div>
    </td>

    <td>
     <p id="texto">{{orderItem['items'][num-1]['quantity'] * orderItem['items'][num-1]['price'] }} €</p> 
      <!--{{ totalSum += orderItem['items'][num-1]['quantity'] * orderItem['items'][num-1]['price']  }}-->
    </td>
  </tr>
</tbody>
</table>
</div>
<br>
<h5 class="resumo" id="data"></h5>
<h3 class="resumo" id="totalSum"></h3>
</template>

<script setup lang="ts">
import '@fortawesome/fontawesome-free/css/all.css';

import Swal from 'sweetalert2';
import { onMounted, ref} from "vue";
 import { fetchAllItems } from "../api";
 import { fetchAllOrders } from "../api";
 import { fetchUser } from "../api";
 import { Order, Consumer } from "../types/interfaces";
 
  const orderItem = ref<Order[]>([]); //array com os produtos
  var totalSum = 0;
  var date = '';
  const orders = ref<Order[]>([]);

  const user = ref<Consumer[]>([]);
  const search = ref('');
  //obtem o id do link
  const idO = window.location.pathname.split('/id').pop()?.toString();
  onMounted(async () => {

    //const userItem = await fetchUser();
    //user.value=userItem.data;
    //user logado
    //console.log("user logado" + user.value['id']);

    //utilizador logado para por em fetchAllOrders (user.value.id);
    const responseItem = await fetchAllItems('1', idO);
    orderItem.value=responseItem.data;

    //trocar o 1 por (user.value['id']) que e o user logado
    const response = await fetchAllOrders('1');
    orders.value = response.data;
    //totalSum+=(item.id);
    for (let i = 0; i < orderItem.value.items.length; i++) {
        totalSum += orderItem.value.items[i]['price'] * orderItem.value.items[i]['quantity'];
      }
      console.log(totalSum)
      document.querySelector('#totalSum').textContent = "Total: " + totalSum + "€";
      for (let i = 0; i < orders.value.items.length; i++) {
        if (orders.value.items[i].id == idO) {
          date = (orders.value.items[i].orderDate.substring(0, 10)  );
          document.querySelector('#data').textContent = "Encomenda efetuada em: " + date;
        }
      }
   
    

  });
  
</script>
<style scoped>
.bi-truck {
animation: fade 2s ease-in-out infinite alternate;
}

@keyframes fade {
0% { opacity: 0; }
100% { opacity: 1; }
}
/*
.bi-arrow-repeat {
animation: spin 2s linear infinite;
transform-origin: center !important;

}

@keyframes spin {
from { transform: rotate(0deg); }
to { transform: rotate(360deg); }
}
*/
.bi-box-seam {
animation: spin 2s linear infinite;
}

@keyframes spin {
from { transform: rotate(0deg); }
to { transform: rotate(360deg); }
}
#texto {
  font-size: 13px;
}

.table thead th {
  position: sticky;
  top: 0;
  /* Prefixos do navegador */
  position: -webkit-sticky;
  position: -moz-sticky;
  position: -ms-sticky;
  z-index: 2 ;
}



 .table th,
 .table td {
   padding: 10px;
   font-size: 20px;
   text-align: left;
   border-bottom: 1px solid #ddd;
   
 }
 
 tr:hover {
       background-color: #f5f5f5;
      z-index: -2;
 }
 
 span {
   color: black;
 }
 .numero {
  color: black;
  text-decoration: none;
 }
 
 th {
  background-color: #e9e5de !important;
       font-size: 30px;
       color: rgb(0, 0, 0);
     }

  .table  {
  max-height: 80%; /* Altura máxima da tabela */
  margin:auto;
  overflow-y: scroll; /* Adiciona uma barra de rolagem vertical */
  position: relative;
}
.resumo {
  margin-top: 20px;
  font-size: 15px;
  text-align: right;
  margin-right: 90px;
}
.table-container {
  max-height: 450px; /* Altura máxima da tabela */
  margin:auto;
  margin-top: 0px;
  max-width: 90%;
  overflow-y: scroll; /* Adiciona uma barra de rolagem vertical */
  position: relative;
}
#col{
font-size: 15px !important;
}

@media (max-width: 768px) {
/* regras de estilo para telas menores que 768px */
.table-container {
  overflow-x: auto;
  width: 100%;
}
table {
  width: 100%;
  font-size: 5px;
}
}
@media only screen and (max-width: 660px) {
  /*em telemovel remove colunas,5 */


.table th:nth-child(5),
.table td:nth-child(5) {
  display: none;
}
.table th:nth-child(1),
.table td:nth-child(1) {
  display: none;
}

.table th:nth-child(2),
.table td:nth-child(2) {
  display: none;
}

header {
  font-size: 8px;
}



header {
font-size: 8px;
}


img {
width: 40px;
}
.table {
text-align: center;
 border-collapse: collapse;
 margin-bottom: 10px;
 font-size: 11px;
 border: 2px;
}

.table th,
.table td {
 padding: 5px;
 font-size: 10px;
 text-align: left;
 border-bottom: 1px solid #ddd;
 
}
h4, a, p{
font-size: 12px !important;
}
i {
font-size: 13px !important;
}
.resumo {
  margin-top: 10px;
  font-size: 15px;
  text-align: right;
  margin-right: 30px;
}
}
 </style>
