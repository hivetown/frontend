<template>
    <div class="table-container" style="overflow: auto">
    <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">Item</th>
      <th scope="col">Nome</th>
      <th scope="col">Fornecedor</th>
      <th scope="col">Preço</th>
      <th scope="col">Quantidade</th>
      <th scope="col">Estado</th>
      <th scope="col">Total</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="num in orderItem['totalItems']" :key="num">

      <!--TODO por marcas e produto como links-->
      <td><img src="https://i.imgur.com/o2fKskJ.jpg"></td> <!--TODO por imagens-->
      <td>           
        {{orderItem['items'][num-1]['producerProduct']['productSpec']['name'] }}
      </td>
      <td>
        {{orderItem['items'][num-1]['producerProduct']['producer']['name'] }}
      </td>
      <td>
        {{orderItem['items'][num-1]['price'] }}
      </td>
      <td>
        {{orderItem['items'][num-1]['quantity'] }}
      </td>
      <td>
        {{orderItem['items'][num-1]['status'] }}
      </td>
      <td>
        {{orderItem['items'][num-1]['quantity'] * orderItem['items'][num-1]['price'] }} €
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
    onMounted(async () => {

      const userItem = await fetchUser();
      user.value=userItem.data;
      //utilizador logado para por em fetchAllOrders (user.value.id);
      const responseItem = await fetchAllItems('86','548');
      orderItem.value=responseItem.data;
      

      const response = await fetchAllOrders('86');
      orders.value = response.data;
        //totalSum+=(item.id);
     
        for (let i = 0; i < orderItem.value.items.length; i++) {
          totalSum += orderItem.value.items[i]['price'] * orderItem.value.items[i]['quantity'];
        }
        console.log(totalSum)
        document.querySelector('#totalSum').textContent = "Total: " + totalSum + "€";
        for (let i = 0; i < orders.value.items.length; i++) {
          if (orders.value.items[i].id === 548) {
            date = (orders.value.items[i].orderDate.substring(0, 10)  );
            document.querySelector('#data').textContent =  date;

          }
        }

    });
</script>
<style scoped>

  

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
    text-align: right;
    margin-right: 90px;
  }
  .table-container {
    max-height: 450px; /* Altura máxima da tabela */
    margin:auto;
    max-width: 90%;
    overflow-y: scroll; /* Adiciona uma barra de rolagem vertical */
    position: relative;
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
  font-size: 18px !important;
 }

}
   </style>
  
