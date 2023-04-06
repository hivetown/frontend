<template>
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
  <table style="border: 2px " class="table" >
        <thead >
          <tr>
            <th></th>
            <th><h4>Encomenda</h4></th>
            <th><h4>Código da encomenda</h4></th>
            <th><h4>Status</h4></th>
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
                  <a href="#">
                    <p>por carousel</p>                
                </a>
                </div>
              </div>
            </td>
            
            <td>
           
           {{ orders['items'] && orders['items'][num-1] ? orders['items'][num-1]['id'] : '' }}

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

                <div v-if="orders.items && orders.items[num - 1] && orders.items[num - 1].generalStatus === 'Delivered' || orders.items && orders.items[num - 1] && orders.items[num - 1].generalStatus === 'Shipped'">
                    <BButton class="botao" variant="outline-primary" @click="cancelarEncomendaImpossivel()">Cancelar encomenda</BButton>
                </div>
                <div v-if="orders.items && orders.items[num - 1] && (orders.items[num - 1].generalStatus === 'Paid' || orders.items[num - 1].generalStatus === 'Processing')">
  <!-- Conteúdo a ser exibido caso a encomenda esteja paga ou em processamento -->
                    <BButton class="botao" variant="outline-primary" @click="cancelarEncomenda()">Cancelar encomenda</BButton>
                </div>
              
            </td>

            <td>
                {{ orders['items'] && orders['items'][num-1] ? orders['items'][num-1]['orderDate'].substring(0, 10) : '' }}
            </td>
            <td>{{ orders['items'] && orders['items'][num-1] ? orders['items'][num-1]['totalPrice'] : '' }}€</td>

            <td>
              <BButton class="botao" variant="outline-primary" href="/">Ver detalhes</BButton> <!--TODO mudar link-->
            </td>
          </tr>
        </tbody>
      </table>
      <BButton id="botao" class="botao" variant="outline-primary" v-if="isExportButtonVisible" @click="exportSelectedOrders">Exportar dados</BButton>
  <!--trocar o 0 pelo valor, ou seja fazer um for por cada encomenda-->
  
  
  
      <!--total items-->
      <!---<p> {{ orders['totalItems'] }} </p>-->
      <!--preco-->
      <!--
      <p>preco:</p>
    <p> {{ orders['items'][1]['price'] }} </p>
    <p>status:</p>
    <p> {{ orders['items'][0]['status'] }} </p>
    <p>codigo encomenda:</p>
    <p> {{ orders['items'][0] }} </p>-->
  
    </div>
  </template>
<script setup lang="ts">
  import Swal from 'sweetalert2';
  import { onMounted, ref, watch } from "vue";
   import { fetchAllOrders } from "../api";
   import { fetchAllItems } from "../api";
   import { Order } from "../types/interfaces";

   const orders = ref<Order[]>([]);
   const orderIds = ref<number[]>([]); //array com o id das encomendas
   const orderItem = ref<Order[]>([]); //array com os produtos

    const search = ref('');

    onMounted(async () => {
      //TODO trocar para o user logado
      const response = await fetchAllOrders();
      orders.value = response.data;
      orders.value.items.forEach((item) => {
        orderIds.value.push(item.id);
      });
   // });

   // const fetchOrders = async () => {
   //   const ordersData = await Promise.all(
    //    orderIds.value.map((id) => fetchAllItems(`${id}/items`))
   //   );

     // const responseItem = await fetchAllItems('');
    //  orderItem.value=responseItem.data;

      // do something with the orders
    });


   function cancelarEncomenda() {
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
      // caso o usuário confirme, cancela a encomenda
      // TODO: implemente a lógica de cancelamento da encomenda
      Swal.fire(
        'Encomenda cancelada!',
        'Sua encomenda foi cancelada com sucesso.',
        'success'
      );
    }
  });
}

function cancelarEncomendaImpossivel() {
  // exibe uma mensagem de alerta para o usuário
  Swal.fire({
    icon: 'error',
    title: 'Não é possível cancelar esta encomenda',
    text: 'Esta encomenda já está em processo de envio ou já foi entregue.',
    confirmButtonText: 'OK'
  });
}
</script>

<script lang="ts">

export default {

  data() {
    return {
      selectedOrders: [],

    };
  },
  computed: {
    isExportButtonVisible() {
    
      return this.selectedOrders.length > 0;
      

    },
  },
    methods: {
      exportSelectedOrders() {
        let arr = [];
        let checkboxes = document.querySelectorAll("input[type='checkbox']:checked");
        for (let i = 0 ; i < checkboxes.length; i++) {
          arr.push(checkboxes[i].value)
      }
      console.log(arr);
      return arr;
    }
   
  }
  
};

</script>



<style scoped>
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
   
</style>