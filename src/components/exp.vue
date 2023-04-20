
<template>
 
  <h3 class="semencoemndas" v-if="orders['totalItems'] === 0"> <i id="icon" class="bi bi-emoji-frown"></i><br>Ainda não foram efetuadas encomendas.</h3>

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
  <div>
   
  </div>
  <table v-if="orders['totalItems'] !== 0" style="border: 2px" class="table">
        <thead >
          <tr>
            <th><h4>Exportar dados</h4></th>

            <th><h4>Artigos</h4></th>
            <th>
              <!--<input type="checkbox" id="reverse">-->
              <h4>Código</h4></th>
            <th><h4>Estado</h4></th>
            <th><h4>Morada de entrega</h4></th>

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
                <input id="name" type="checkbox"  style="transform: scale(1.2)" @change="onCheckboxChange()" :value="orders['items'][num-1]['id']" v-model="selectedOrders[num-1]">
                <span v-if="selectedOrders[num-1]"></span>
              </td>
            
            <td>

              <div class="carousel-container">
                <div class="carousel">
                  <div id="myCarousel" class="carousel slide" data-ride="carousel">
              <!-- Indicators -->
              

              <div>
    <div v-if="encomendasImage[num] === undefined || encomendasImage[num] === null || encomendasImage[num].length === 0">
      <p id="texto">Produto sem imagem</p>
    </div>
    <div v-else>
      <ol v-if="encomendasImage[num].length > 1" class="carousel-indicators">
        <li v-for="(image, index) in encomendasImage[num]" :key="index" :class="{'active': index === 0}"></li>
      </ol>

      <div class="carousel-inner" role="listbox">
        <div v-for="(image, index) in encomendasImage[num]" :key="index" :class="{'item': true, 'active': index === 0}">
          <a :href="'/encomenda/' + orders?.items[num-1]?.id" style="text-decoration: none; color:black"> 
            <img style="width: 75px;" :src="image" :alt="'Image ' + (index + 1)" v-if="image !== null"> 
            <p id="texto" v-else>Produto sem <br>imagem</p> 
          </a>
        </div>
      </div>
    </div>
  </div>
                  </div>



                 <a  :href="`/encomenda/id${orders['items'][num-1]['id']}`">
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
           
              <a id="texto" :href="'/encomenda/' + orders?.items[num-1]?.id" style="text-decoration: none; color:black">{{ orders['items'] && orders['items'][num-1] ? orders['items'][num-1]['id'] : '' }}</a>

         </td>
             
              <!--TODO mudar o link para detalhada-->
              <td>
                <div v-if="orders.items && orders.items[num - 1] && orders.items[num - 1].generalStatus === 'Delivered'"  style="display: inline-flex">
                    <i id="texto" class="bi bi-check-all"></i>
                    <a :href="'/encomenda/' + orders?.items[num-1]?.id" style="text-decoration: none; color:black"> <p id="texto">Entregue</p></a>
                </div>
                <div v-if="orders.items && orders.items[num - 1] && orders.items[num - 1].generalStatus === 'Processing'"  style="display: inline-flex">
                    <i id="texto" class="bi bi-box-seam"></i>
                    <a :href="'/encomenda/' + orders?.items[num-1]?.id" style="text-decoration: none; color:black"> <p id="texto">Em processamento</p></a>
                </div>
                <div v-if="orders.items && orders.items[num - 1] && orders.items[num - 1].generalStatus === 'Paid'"  style="display: inline-flex">
                    <i id="texto" class="bi bi-cash-coin"></i>  
                    <a :href="'/encomenda/' + orders?.items[num-1]?.id" style="text-decoration: none; color:black"><p id="texto">Pago</p>  </a>           
                </div>
                <div v-if="orders.items && orders.items[num - 1] && orders.items[num - 1].generalStatus === 'Canceled'" style="display: inline-flex">
                  <i id="texto" class="bi bi-x-lg"></i>    
                  <a :href="'/encomenda/' + orders?.items[num-1]?.id" style="text-decoration: none; color:black"><p id="texto">Cancelada</p></a>       
                </div>
                <div v-if="orders.items && orders.items[num - 1] && orders.items[num - 1].generalStatus === 'Shipped'"  style="display: inline-flex">
                  <i id="texto" class="bi bi-truck"></i>
                  <a :href="'/encomenda/' + orders?.items[num-1]?.id" style="text-decoration: none; color:black"><p id="texto">Em andamento</p></a>
                </div>
              <!--<div v-if="encomenda.estado === 'Em andamento'" class="inline"><i class="bi bi-truck"></i></div>
              <div v-if="encomenda.estado === 'Em preparação'" class="inline"><i class="bi bi-box-seam"></i></div>-->
              <!-- {{ orders['items'] && orders['items'][num-1] ? orders['items'][num-1]['generalStatus'] : '' }} -->

                <div v-if=" orders.items && orders.items[num - 1] && orders.items[num - 1].generalStatus === 'Shipped'">
                    <BButton class="botao2" variant="outline-primary" @click="cancelarEncomendaImpossivel()">Cancelar encomenda</BButton>
                </div>
                <div v-if="orders.items && orders.items[num - 1] && (orders.items[num - 1].generalStatus === 'Paid' || orders.items[num - 1].generalStatus === 'Processing')">
  <!-- Conteúdo a ser exibido caso a encomenda esteja paga ou em processamento -->
                    <BButton class="botao2" variant="outline-primary" @click="cancelarEncomenda(num)">Cancelar encomenda</BButton>
                </div>
              
            </td>
            <td>
              <a :href="'/encomenda/' + orders?.items[num-1]?.id" style="text-decoration: none; color:black"><p id="morada2">Rua{{orders['items'][num-1]['shippingAddress']['street']}}, nº{{ orders['items'][num-1]['shippingAddress']['number'] }}, andar {{orders['items'][num-1]['shippingAddress']['floor']}}</p></a>
                
                <a :href="'/encomenda/' + orders?.items[num-1]?.id" style="text-decoration: none; color:black"><p id="morada2">{{orders['items'][num-1]['shippingAddress']['zipCode']}}, {{orders['items'][num-1]['shippingAddress']['city']}}</p></a>
                
                <a :href="'/encomenda/' + orders?.items[num-1]?.id" style="text-decoration: none; color:black"><p id="morada2">{{orders['items'][num-1]['shippingAddress']['latitude']}}, {{orders['items'][num-1]['shippingAddress']['longitude']}}</p></a>
              </td>

            <td>
              <a :href="'/encomenda/' + orders?.items[num-1]?.id" style="text-decoration: none; color:black" id="texto">{{ orders['items'] && orders['items'][num-1] ? orders['items'][num-1]['orderDate'].substring(0, 10) : '' }}</a>
            </td>
            <td><a :href="'/encomenda/' + orders?.items[num-1]?.id" style="text-decoration: none; color:black" id="texto">{{ orders['items'] && orders['items'][num-1] ? orders['items'][num-1]['totalPrice'] : '' }}€</a></td>

            <td>
              <BButton class="botao2" variant="outline-primary" :href="'/encomenda/' + (orders.items[num-1]?.id )">Ver detalhes</BButton> <!--TODO mudar link-->
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
   const encomendasImage =  ref<Array>([]);
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
     // const response = await fetchAllItems(2, orderId);
      //const newEncomenda = {[orderId]: response.data}; // Cria um novo objeto com o id e o array
     // encomendas.push(newEncomenda); // Adiciona o novo objeto ao array "encomendas"
      //console.log(encomendas);
     // return response;
     // console.log(orderItem.value.items[0]['producerProduct']['productSpec']['images'][0]['url']);
    }

    onMounted(async () => {
      //const userItem = await fetchUser();
      //user.value=userItem.data;
      //utilizador logado para por em fetchAllOrders (user.value.id);
      const response = await fetchAllOrders(3);
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
      //console.log(encomendas);
      //console.log(i);
      const response1 = await fetchAllItems(3, encomendas[i]);
      const newEncomenda = {[encomendas[i]] : response1.data};
      encomendaId.value.push(newEncomenda);
      console.log(encomendas);
      const encomendaX = [];
      for (let j=0; j<encomendaId.value[i][encomendas[i]]['items'].length-1; j++){
         encomendaX.push(encomendaId.value[i][encomendas[i]] 
         && encomendaId.value[i][encomendas[i]]['items'] 
         && encomendaId.value[i][encomendas[i]]['items'][j] 
         && encomendaId.value[i][encomendas[i]]['items'][j]['producerProduct'] 
         && encomendaId.value[i][encomendas[i]]['items'][j]['producerProduct']['productSpec'] 
         && encomendaId.value[i][encomendas[i]]['items'][j]['producerProduct']['productSpec']['images'] 
         && encomendaId.value[i][encomendas[i]]['items'][j]['producerProduct']['productSpec']['images'][0] 
         && encomendaId.value[i][encomendas[i]]['items'][j]['producerProduct']['productSpec']['images'][0]['url'] ? encomendaId.value[i][encomendas[i]]['items'][j]['producerProduct']['productSpec']['images'][0]['url'] : null);
      }
      encomendasImage.value.push(encomendaX)

     
      //primeiro 0 fica
      //2 o id da encomenda 
      //o 0 item da encoemnda
      //0 o primerio item da encoemnda
      //console.log(encomendaId.value[0][2]['items'][0]['producerProduct']['productSpec']['images'][0]['url']);
      //console.log(encomendaId.value);
    }   // }); 
    //primeira encomenda
    //produto x, 1, 2 etc, n produtos na encomenda
    //imagem 0 -primeira imagem associada ao produto
    //obtem a primeira imagem da primeira encomenda do primeiro produto
  //  console.log(encomendaId.value[0]['67']['items'][0]['producerProduct']['productSpec']['images'][0]['url']);
    console.log(encomendaId.value[0]['67']['items'].length);
    //percorre todos os items da encomenda

    //for (let j=0; j<encomendaId.value[0]['67']['items'].length-1; j++){
    //  encomendasImage.push(encomendaId.value[0]['67'] && encomendaId.value[0]['67']['items'] && encomendaId.value[0]['67']['items'][j] && encomendaId.value[0]['67']['items'][j]['producerProduct'] && encomendaId.value[0]['67']['items'][j]['producerProduct']['productSpec'] && encomendaId.value[0]['67']['items'][j]['producerProduct']['productSpec']['images'] && encomendaId.value[0]['67']['items'][j]['producerProduct']['productSpec']['images'][0] && encomendaId.value[0]['67']['items'][j]['producerProduct']['productSpec']['images'][0]['url'] ? encomendaId.value[0]['67']['items'][j]['producerProduct']['productSpec']['images'][0]['url'] : null);
    //}
    console.log(encomendasImage);


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
    try {
      // TODO: implemente a lógica de cancelamento da encomenda
      //TODO trocar p user logado
      cancelOrder(3, orders.value['items'][num-1]['id'])
        .then((response) => {
          console.log('cancelou');
          // exibe o Swal2 para "Encomenda cancelada!" após o cancelamento da encomenda
          Swal.fire({
            title: 'Encomenda cancelada!',
            text: 'Sua encomenda foi cancelada com sucesso.',
            icon: 'success'
          }).then((result) => {
            if (result.isConfirmed) {
              // Redirecionar para a página desejada
              window.location.href = '/encomendas'; // Substitua com a URL da página desejada
            }
          });
        })
        .catch(error => {
          if (error.response && error.response.status === 400) {
            console.log('entrou');
            Swal.fire({
              icon: 'error',
              title: 'Não é possível cancelar esta encomenda',
              text: 'Esta encomenda já se encontra em andamento ou já foi entregue.',
              confirmButtonText: 'OK'
            });
          } else {
            console.log(error);
            console.log('erro ao cancelar encomenda');
          }
        });
    } catch (error: any) {
      console.log(error);
      console.log('erro ao cancelar encomenda');
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
import { MDBCarousel } from "mdb-vue-ui-kit";
import { Component, Vue } from 'vue-property-decorator';
import { Carousel, Slide } from 'vue-carousel';
const orders = ref<Order[]>([]);
const novo = ref<number[]>([]);

export default {
  components:{      MDBCarousel,Carousel,
    Slide,
},

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
      onCheckboxChange() {
        let checkboxes = document.querySelectorAll("input[type='checkbox']:checked");
        if(checkboxes.length == 0){
          var button = document.getElementById("botao");
          button.style.display = "none";
        } else {
          var button = document.getElementById("botao");
          button.style.display = "block";
        }
      
    },
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
      return await exportOrders(3, arr);
    }
   
  }
  
};

</script>



<style scoped>

#morada2{
  font-size: 11px;
}
#texto, #morada {
  font-size: 13px;
}
.carousel-container {
  display: flex;
  flex-wrap: wrap;
}
.semEncomendas, #icon{
  font-size: 110px !important;
}

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
  margin-top: 150px; 
margin-bottom:150px;
}
  
  .table-container {
    max-height: 450px; /* Altura máxima da tabela */
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
    width: 190px;
    margin-left: 80px;
    margin-top:20px
   }

   
   
</style>