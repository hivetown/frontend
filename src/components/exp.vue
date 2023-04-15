
<template>
  <h3 v-if="orders['totalItems'] === 0"> Ainda não existem encomendas efetuadas!</h3>
      <div class="table-container" style="overflow: auto">
  <!--
      <ul>
        <li v-for="num in orders['totalItems'] " :key="num">{{ num-1 }}</li>
        <p>Codigo da encomenda: {{ orders['items'] && orders['items'][0] ? orders['items'][0]['id'] : '' }}</p>
  
      </ul>
      <p>Codigo da encomenda: {{ orders['items'] && orders['items'][0] ? orders['items'][0]['id'] : '' }}</p>
    -->
 <!-- <p>{{ orderItem['items'] }}</p>
  <h4>{{ orders }}</h4> -->
  <!--<p>{{ orders }}</p>-->
  <!--id do utlizador logado-->
  <!--<p>{{ user['id'] }}</p>-->
  <!--<p>{{orders['totalItems']}}</p>-->
  <table v-if="orders['totalItems'] !== 0" style="border: 2px" class="table">
        <thead >
          <tr>
            <th><h4>Encomendas <br>para exportar</h4></th>
            <th><h4>Encomenda</h4></th>
            <th>
              <!--<input type="checkbox" id="reverse">-->
              <h4>Código da encomenda</h4></th>
            <th><h4>Estado</h4></th>
            <th id="coluna-data">
              <div class="data">
                <h4>Data</h4>
              </div>
              </th>
              <th><h4>Total</h4></th>

            <th></th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="num in orders['totalItems']" :key="num">
              <td>
                <input id="name" type="checkbox"  style="transform: scale(1.5)" :value="orders['items'][num-1]['id']" v-model="selectedOrders[num-1]">
                <span v-if="selectedOrders[num-1]"></span>
              </td>
            <td>
              <div class="carousel-container">
                <div class="carousel">
                  <p>por carosel fotos</p>
                 <a :href="`/encomenda/id${orders['items'][num-1]['id']}`">
                <!--  <p>encomendaId[num-1][orders['items'][num-1]['id']]['items'][0]['producerProduct']['productSpec']['images']</p>-->
                    <!--<p>{{encomendaId[0][2]['items'][0]['producerProduct']['productSpec']['images'][0]['url']}}</p>-->
                  <!-- <img v-if="encomendaId[num-1][orders['items'][num-1]['id']]['items'][0]['producerProduct']['productSpec']['images'].length > 0" 
                  :src="encomendaId[num-1][orders['items'][num-1]['id']]['items'][0]['producerProduct']['productSpec']['images'][0]['url']" 
                  alt="Imagem da encomenda"  style="max-width: 100px;">  -->             
                </a> 
                </div>
              </div>
            </td>
            
            <td >
           
              <a :href="'/encomenda/' + orders?.items[num-1]?.id" style="text-decoration: none; color:black">{{ orders['items'] && orders['items'][num-1] ? orders['items'][num-1]['id'] : '' }}</a>

         </td>
             
              <!--TODO mudar o link para detalhada-->
              <td>
                <div v-if="orders.items && orders.items[num - 1] && orders.items[num - 1].generalStatus === 'Delivered'" class="inline">
                    <i class="bi bi-check-all"></i>
                </div>
                <div v-if="orders.items && orders.items[num - 1] && orders.items[num - 1].generalStatus === 'Processing'" class="inline">
                    <i class="bi bi-box-seam"></i>
                </div>
                <div v-if="orders.items && orders.items[num - 1] && orders.items[num - 1].generalStatus === 'Paid'" class="inline">
                    <i class="bi bi-cash-coin"></i>               
                </div>
                <div v-if="orders.items && orders.items[num - 1] && orders.items[num - 1].generalStatus === 'Canceled'" class="inline">
                  <i class="bi bi-x-lg"></i>              
                </div>
                <div v-if="orders.items && orders.items[num - 1] && orders.items[num - 1].generalStatus === 'Shipped'" class="inline">
                  <i class="bi bi-truck"></i>
                </div>
              <!--<div v-if="encomenda.estado === 'Em andamento'" class="inline"><i class="bi bi-truck"></i></div>
              <div v-if="encomenda.estado === 'Em preparação'" class="inline"><i class="bi bi-box-seam"></i></div>-->
                {{ orders['items'] && orders['items'][num-1] ? orders['items'][num-1]['generalStatus'] : '' }}

                <div v-if=" orders.items && orders.items[num - 1] && orders.items[num - 1].generalStatus === 'Shipped'">
                    <BButton class="botao2" variant="outline-primary" @click="cancelarEncomendaImpossivel()">Cancelar encomenda</BButton>
                </div>
                <div v-if="orders.items && orders.items[num - 1] && (orders.items[num - 1].generalStatus === 'Paid' || orders.items[num - 1].generalStatus === 'Processing')">
  <!-- Conteúdo a ser exibido caso a encomenda esteja paga ou em processamento -->
                    <BButton class="botao2" variant="outline-primary" @click="cancelarEncomenda(num)">Cancelar encomenda</BButton>
                </div>
              
            </td>

            <td>
              <a :href="'/encomenda/' + orders?.items[num-1]?.id" style="text-decoration: none; color:black">{{ orders['items'] && orders['items'][num-1] ? orders['items'][num-1]['orderDate'].substring(0, 10) : '' }}</a>
            </td>
            <td><a :href="'/encomenda/' + orders?.items[num-1]?.id" style="text-decoration: none; color:black">{{ orders['items'] && orders['items'][num-1] ? orders['items'][num-1]['totalPrice'] : '' }}€</a></td>

            <td>
              <BButton class="botao" variant="outline-primary" :href="'/encomenda/' + (orders.items[num-1]?.id )">Ver detalhes</BButton> <!--TODO mudar link-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <BButton id="botao" class="botao" variant="outline-primary" v-if="isExportButtonVisible" @click="exportSelectedOrders">Exportar dados</BButton>

  </template>
<script setup lang="ts">
  import Swal from 'sweetalert2';
  import { onMounted, ref, watch, computed } from "vue";
   import { fetchAllOrders, cancelOrder } from "../api";
   import { fetchAllItems } from "../api";
   import { fetchUser } from "../api";


   import { Consumer, Order } from "../types/interfaces";

   const orders = ref<Order[]>([]);
    const arr = ref([]); // Use a função ref para criar uma referência reativa do array

   const encomendas = [];
   const encomendaId = ref([]);
   const orderIds = ref<number[]>([]); //array com o id das encomendas
   const orderItem = ref<Order[]>([]); //array com os produtos
   //para ir buscar o que tem loggin
   const user = ref<Consumer[]>([]);
   const search = ref('');

   //para ir buscar imagens apra o carousel
  
   async function fetchAndSetOrders(num: number): Promise<void> {
    //console.log(orders.value.items[num-1]['id'] );
      const orderId = orders.value.items[num-1]['id'];
      const response = await fetchAllItems(1, orderId);
      const newEncomenda = {[orderId]: response.data}; // Cria um novo objeto com o id e o array
     // encomendas.push(newEncomenda); // Adiciona o novo objeto ao array "encomendas"
      //console.log(encomendas);
      return response;
     // console.log(orderItem.value.items[0]['producerProduct']['productSpec']['images'][0]['url']);
    }

    onMounted(async () => {
      const userItem = await fetchUser();
      user.value=userItem.data;
      //utilizador logado para por em fetchAllOrders (user.value.id);
      const response = await fetchAllOrders(1);
      orders.value = response.data;
      orders.value.items.forEach((item) => {
      orderIds.value.push(item.id);
      });
      for (let i = 0; i < orders.value.totalItems ; i++) { // Corrigido para "let" e "number"
        encomendas.push(orders.value.items[i].id);
        arr.value.push(i);
    }
    arr.value.reverse();

    for (let i = 0; i< encomendas.length; i++){
      //id da encomenda encomendas[i]
      const response1 = await fetchAllItems('1', encomendas[i]);
      const newEncomenda = {[encomendas[i]] : response1.data};
      encomendaId.value.push(newEncomenda);
      //primeiro 0 fica
      //2 o id da encomenda 
      //o 0 item da encoemnda
      //0 o primerio item da encoemnda
      console.log(encomendaId.value[0][2]['items'][0]['producerProduct']['productSpec']['images'][0]['url']);
      //console.log(encomendaId.value);
    }   // });

   // const fetchOrders = async () => {
   //   const ordersData = await Promise.all(
    //    orderIds.value.map((id) => fetchAllItems(`${id}/items`))
   //   );

     // const responseItem = await fetchAllItems('');
    //  orderItem.value=responseItem.data;

      // do something with the orders
    });

   function cancelarEncomenda(num) {
  // exibe uma mensagem de confirmação para o usuário
  Swal.fire({
    title: 'Deseja cancelar a encomenda?',
    text: 'Esta ação não poderá ser desfeita',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim, cancelar',
    cancelButtonText: 'Não, voltar'
  }).then((result) => {
    if (result.isConfirmed) {
      try{
        //console.log(valorAssociado);
       // var encomendaCancelar = (orders.value['items'][num-1]['id']);
        //TODO trocar para o user logado
        console.log(orders.value['items'][num-1]['id']);
        cancelOrder(1, orders.value['items'][num-1]['id'])
        .then((response) => {console.log('cancelou')}).catch(error => {
  if (error.response && error.response.status === 400) {
    console.log('entrou');
    Swal.fire({
    icon: 'error',
    title: 'Não é possível cancelar esta encomenda',
    text: 'Esta encomenda já se encontra em andamento ou já foi entregue.',
    confirmButtonText: 'OK'
  });




  } else {
     
        //const encomendaCancelada = true; // TODO implementar lógica para cancelar a encomenda
      
      // caso o usuário confirme, cancela a encomenda
      // TODO: implemente a lógica de cancelamento da encomenda
      Swal.fire(
        'Encomenda cancelada!',
        'Sua encomenda foi cancelada com sucesso.',
        'success'
      );  }});
      }  catch (error: any) {
       
        console.log(error);
        console.log('erro ao cancelar encomenda')
      }
    }
  });
}

function cancelarEncomendaImpossivel() {
  // exibe uma mensagem de alerta para o usuário
  Swal.fire({
    icon: 'error',
    title: 'Não é possível cancelar esta encomenda',
    text: 'Esta encomenda já se encontra em andamento ou já foi entregue.',
    confirmButtonText: 'OK'
  });
}
</script>

<script lang="ts">
import {exportOrders} from '../api';
const orders = ref<Order[]>([]);

export default {
  

  data() {
    return {
      selectedOrders: [],

    };
  },
  computed: {
    isExportButtonVisible() {
    
      return this.selectedOrders.length > 0;
      

    }
   
  },
    methods: {
      async rs(totalItems){
        let arr=[];
        var a = 0;
        for (let i=0; i<totalItems; i++){
          arr.push(i);
          a=a+1;
        }
        arr.reverse();
        console.log(arr);
      },
      async exportSelectedOrders() {
        let arr = [];
        let checkboxes = document.querySelectorAll("input[type='checkbox']:checked");
        for (let i = 0 ; i < checkboxes.length; i++) {
          arr.push(checkboxes[i].value)
      }
      console.log(arr);
      //TODO trocar para user logado
      return await exportOrders('2', arr);
    }
   
  }
  
};

</script>



<style scoped>
[v-cloak] {
  display: none;
}
.table thead th {
    position: sticky;
    top: 0;
    background-color:  #e9e5de  !important;
    /* Prefixos do navegador */
    position: -webkit-sticky;
    position: -moz-sticky;
    position: -ms-sticky;
    z-index: 2 ;
  }

  h3 {
    text-align: center;
  margin-top: 250px; 
margin-bottom:150px;
}
  
  .table-container {
    max-height: 700px; /* Altura máxima da tabela */
    max-width: 1600px;
    margin:auto;
    max-width: 92%;
    overflow-y: scroll; /* Adiciona uma barra de rolagem vertical */
    position: relative;
  }
   .table {
    text-align: center;
     border-collapse: collapse;
     margin-bottom: 20px;
     font-size: 16px;
     border: 2px;
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

   .botao{
    margin-left: 80px;
    margin-top:20px
   }
   
</style>