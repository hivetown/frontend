<template>
  

    <div class="pagination-demo">
      <!--    alerta de nao ser possivel cancelar
      <b-alert v-model="showDismissibleAlert" variant="warning" dismissible>
        <h3>Nao é possivel cancelar a encomenda.</h3>
        <br>
        O prazo de cancelamento é de x dias após a compra.
      </b-alert>
      <b-button @click="showDismissibleAlert=true" variant="info" class="m-1">
        Cancelar encomenda
      </b-button> 
      -->
      <div class="table-container">
  
      <table style="border: 2px " class="table" >
        <thead>
          <tr>
            <th><h4>Encomenda</h4></th>
            <th><h4>Total</h4></th>
            <th><h4>Status</h4></th>
            <th><h4>Código da encomenda</h4></th>
            <th id="coluna-data">
              <div class="data">
                <h4>Data</h4>
                <button @click="ordenarPorData">
                  <i class="bi bi-arrow-down-up"></i>
                </button>
              </div>
              </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(encomenda, index) in encomendas" :key="index">
            <td>
              <div class="carousel-container">
                <div class="carousel">
                  <MDBCarousel v-model="carousels[index]" :items="items[index]" fade />
                </div>
              </div>
            </td>
            <td><h4>{{ encomenda.total }} </h4></td>
            <td>
  
              <h4>{{encomenda.estado}}</h4>
              <div v-if=" encomenda.estado === 'Em preparação'"> <a href="#">Cancelar encomenda </a></div>
  
            </td>
            <td>
              <h4>{{ encomenda.numero }}</h4>
            </td>
            <td>
              <h4>{{ encomenda.data }}</h4>
            </td>
            <td>
              <h4><a href="/">Ver detalhes</a></h4>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  </template>
  
  
  <script>
  import { MDBPagination, MDBPageNav, MDBPageItem } from 'mdb-vue-ui-kit';
  import { ref } from "vue";
  import { MDBCarousel } from "mdb-vue-ui-kit";
  const nEncomendas = 8; //TODO ver a situacao dos carousels
  const ordenacaoCrescente = ref(true);
   // definir os dados de encomenda
   const encomendas = [
        {
          numero: "sahwdqeod",
          total: "1234,43€",
          data: "07/03/2023",
          estado: "Entregue"
        },
        {
          numero: "ahdua8",
          total: "456,8€",
          data: "02/03/2016",
          estado: "Em preparação"
        },
        {
          numero: "anajdi",
          total: "456,8€",
          data: "07/06/2016",
          estado: "Em andamento"
  
        },
        {
          numero: "atyyyua8",
          total: "1456,8€",
          data: "05/10/2018",
          estado: "Em preparação"
  
        },
        {
          numero: "anajdi",
          total: "456,8€",
          data: "07/01/2016",
          estado: "Em andamento"
  
        },
  
        
      ];
  
  export default {
    components: {
      MDBPagination,
      MDBPageNav,
      MDBPageItem,
      MDBCarousel
    },
    setup() {
      const items = [ //as fotos dos artigos
      //encomenda 1
        [
          { src:"mac.png" },
          { src: "https://i.imgur.com/o2fKskJ.jpg" },
        ],
        //encomenda 2
        [
          { src: "https://i.imgur.com/o2fKskJ.jpg" },
          { src: "https://i.imgur.com/GQnIUfs.jpg" },
        ],
        //encomenda 3 ..
        [
          { src: "https://i.imgur.com/GQnIUfs.jpg" },
          { src: "https://i.imgur.com/Tja5H1c.jpg" },
          { src: "https://i.imgur.com/o2fKskJ.jpg" },
        ],
        [
          { src: "https://i.imgur.com/o2fKskJ.jpg" },
          { src: "https://i.imgur.com/GQnIUfs.jpg" },
          { src: "https://i.imgur.com/Tja5H1c.jpg" },
          { src: "https://i.imgur.com/Tja5H1c.jpg" },
        ],
        [
          { src: "https://i.imgur.com/o2fKskJ.jpg" },
          { src: "https://i.imgur.com/GQnIUfs.jpg" },
          { src: "https://i.imgur.com/Tja5H1c.jpg" },
          { src: "https://i.imgur.com/Tja5H1c.jpg" },
        ],
      ];
  
      const carousels = ref([0, 0, 0, 0, 0]);
  
     
  
  
      // fazemos um por cada encomenda que exista const items3 = [...];
      return {
        items,
        carousels,
        encomendas,
        ordenacaoCrescente,
      };
    },
    methods: {
      showAlert() {
          this.dismissCountDown = this.dismissSecs
        },
  
  
        ordenarPorData() {
    if (this.ordenacaoCrescente) {
      this.encomendas.sort((a, b) => new Date(a.data) - new Date(b.data));
    } else {
      this.encomendas.sort((a, b) => new Date(b.data) - new Date(a.data));
    }
    this.ordenacaoCrescente = !this.ordenacaoCrescente;
  },
  
  
  
    }
  };
  </script>
  
  <style scoped>
  tr:nth-child(even) {
    background:#f1b02380;
  }
  
  button {
    margin-left: 10px;
    border: none;
  }
  .data {
    display: flex;
    align-items: center; /* Centralizar os itens verticalmente */
  }
  
  .table-container {
    max-height: 700px; /* Altura máxima da tabela */
    max-width: 1600px;
    margin:auto;
    overflow-y: scroll; /* Adiciona uma barra de rolagem vertical */
  }
  .table thead th {
    position: sticky;
    top: 0;
    background-color: #F1B123 !important;
    /* Prefixos do navegador */
    position: -webkit-sticky;
    position: -moz-sticky;
    position: -ms-sticky;
  }
   .table {
    border: 1px solid rgb(216, 176, 33) !important;
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
   }
   
   span {
     color: black;
   }
   
   th {
         background-color: #e9e5de !important;
         font-size: 30px;
         color: rgb(0, 0, 0);
       }
   .product-details {
    padding: 20px;
   }
   
   .link{
    float: right;
    margin-left: 980px;
   }
   
   h2 {
    margin-top: 25px;
    margin-bottom: 20px;
   }
   
   .mdb-carousel {
    overflow: hidden;
    position: relative;
   }
   .mdb-carousel .mdb-carousel-item {
    position: absolute;
    top: 0;
   }
   .carousel-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
   }
   .carousel-text {
    margin-left: 290px;
   }
   .carousel-text1 {
    margin-left: 350px;
   }
   .carousel-info {
    text-align: right;
   }
 
   .bar {
    display: inline-block;
    background-color: rgba(255, 255, 255, .5);
    border-radius: 10px;
    animation: scale-up4 1s linear infinite;
   }
   .bar:nth-child(2) {
    margin: 0 5px;
    animation-delay: .25s;
   }
   .bar:nth-child(3) {
    animation-delay: .5s;
   }
   .carousel {
    width: 140px; /* Set a fixed width for the carousel container */
   }
   .carousel img {
    width: 100%; /* Set the width of the images to fill the container */
    height: 100%; /* Set the height of the images to fill the container */
    object-fit: contain; /* Scale the images proportionally to fit inside the container */
   }
  </style>
    