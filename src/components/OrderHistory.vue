<template>
    <div class="pagination-demo">
      <div class="table-container" style="overflow: auto">
        <p class="h5 mb-2" style="color:grey"><i class="bi bi-exclamation-circle"></i> Algumas encomendas podem se encontrar divididas devido a terem diferentes transportadores.</p>
      <table style="border: 2px " class="table" >
        <thead >
          <tr>
            <th><h4>Encomenda</h4></th>
            <th><h4>Total</h4></th>
            <th><h4>Status</h4></th>
            <th><h4>Código da encomenda</h4></th>
            <th id="coluna-data">
              <div class="data">
                <h4>Data</h4>
                <button @click="ordenarPorData" style=" background-color: transparent;">
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
                  <a href="#">
                  <MDBCarousel  showIndicators="false" v-model="carousels[index]" :items="items[index]" fade  />
                </a>
                </div>
              </div>
            </td>
            <td><h4> {{ encomenda.total }} </h4></td>
            <td>
              <div v-if="encomenda.estado === 'Entregue'" class="inline"><i class="bi bi-check-all"></i></div>
              <div v-if="encomenda.estado === 'Em andamento'" class="inline"><i class="bi bi-truck"></i></div>
              <div v-if="encomenda.estado === 'Em preparação'" class="inline"><i class="bi bi-box-seam"></i></div>
              <!--TODO mudar o link para detalhada-->
              <h4 class="inline">  <a class="numero" href="#">{{encomenda.estado}} </a> </h4>

              <div v-if=" encomenda.estado === 'Em andamento'">
                <BButton class="botao" variant="outline-primary" @click="cancelarEncomendaImpossivel()">Cancelar encomenda</BButton>
              </div>
              <div v-if=" encomenda.estado === 'Em preparação'">
                <BButton class="botao" variant="outline-primary" @click="cancelarEncomenda()">Cancelar encomenda</BButton>
            </div>

            </td>
            <td>
              <!--TODO mudar o if, exemplo de quando a encomenda foi dividida-->
              <!--TODO mudar para link de encomenda detalhada-->
                <h4 style="display: inline-block;"> <a class="numero" href="#">{{ encomenda.numero }}</a></h4>
                <div v-if="encomenda.estado === 'Em andamento'" class="inline" style="display: inline-block;">
              
                <i class="bi bi-exclamation-circle" style="font-size: 0.99em;" title="A encomenda foi dividia devido a ter diferentes transportadores"></i>
              </div>

            </td>
            <td>
              <h4>{{ encomenda.data }}</h4>
            </td>
            <td>
              <BButton class="botao" variant="outline-primary" href="/">Ver detalhes</BButton> <!--TODO mudar link-->
            </td>
          </tr>
        </tbody>
      </table>
      </div>
      <button id="checkout">checkout</button>
    </div>
</template>
  
  
  <script>
  var stripe = Stripe("pk_test_51MhZqeHDTqePW6LHc3kVGIHMC0vifWpxLpzyQtw2fpcjA2vfVSY45sPxR3MknV53X4NLXSsmXlzCSGdO8OgRY2kq002okkihO7");
  document.addEventListener("DOMContentLoaded", function(event) {
  var stripe = Stripe("pk_test_51MhZqeHDTqePW6LHc3kVGIHMC0vifWpxLpzyQtw2fpcjA2vfVSY45sPxR3MknV53X4NLXSsmXlzCSGdO8OgRY2kq002okkihO7");
  document.getElementById("checkout").addEventListener("click", function(){
    stripe.redirectToCheckout({
      lineItems: [
        {
          price: "price_1Mm2E5HDTqePW6LH0aQ2nFqF",
          quantity: 2,
        },
      ],
      mode: "subscription",
      //para onde vai depois de pago
      successUrl: "https://www.google.com/",
      //para onde vai se nao deu
      cancelUrl: "https://www.twitter.com/",
    }).then(function(result){
    });
  });
});

  import Swal from 'sweetalert2';
  import { MDBPagination, MDBPageNav, MDBPageItem } from 'mdb-vue-ui-kit';
  import { ref } from "vue";
  import { MDBCarousel } from "mdb-vue-ui-kit";
  const nEncomendas = 8; //TODO mudar para o numero de encomendas
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
          estado: "Entregue"
  
        },
        {
          numero: "anajdi",
          total: "456,8€",
          data: "07/01/2016",
          estado: "Em andamento"
  
        },
        {
          numero: "anajdi",
          total: "456,8€",
          data: "07/01/2016",
          estado: "Entregue"
  
        },
        {
          numero: "anajdi",
          total: "456,8€",
          data: "07/01/2016",
          estado: "Em andamento"
  
        },
        {
          numero: "anajdi",
          total: "456,8€",
          data: "07/01/2016",
          estado: "Em preparação"
  
        },
  
        
      ];
  
  export default {
    components: {
      MDBPagination,
      MDBPageNav,
      MDBPageItem,
      MDBCarousel,
      
    },
    setup() {
      const showModal = ref(false);
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
        [
          { src: "https://i.imgur.com/o2fKskJ.jpg" },
          { src: "https://i.imgur.com/GQnIUfs.jpg" },
          { src: "https://i.imgur.com/Tja5H1c.jpg" },
          { src: "https://i.imgur.com/Tja5H1c.jpg" },
        ],
      ];
  
      const carousels = ref(Array(nEncomendas).fill(0));  
     
  
  
      // fazemos um por cada encomenda que exista const items3 = [...];
      return {
        items,
        carousels,
        encomendas,
        ordenacaoCrescente,
        showPopup: false, // inicialmente, o pop-up não é exibido

      };
    },
    methods: {
      showAlert() {
          this.dismissCountDown = this.dismissSecs;
        },
     
        async cancelarEncomenda(encomenda) {
  Swal.fire({
    title: 'Tem a certeza?',
    text: "Esta ação não pode ser desfeita!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sim, cancelar!',
    cancelButtonText: 'Não, manter encomenda'
  }).then((result) => {
    if (result.isConfirmed) {
      encomenda.botaoVerde = false;
      const encomendaCancelada = true; // TODO implementar lógica para cancelar a encomenda
      if (encomendaCancelada) {
        Swal.fire(
          'Encomenda cancelada!',
          'A encomenda foi cancelada com sucesso.',
          'success'
        );
        encomendas.splice(encomendas.indexOf(encomenda), 1);
      } else {
        Swal.fire(
          'Erro!',
          'Não foi possível cancelar a encomenda.',
          'error'
        );
      }
    }
  });
},


    async cancelarEncomendaImpossivel() {
      const result = await Swal.fire({
        title: 'Não é possível cancelar a encomenda, já se encontra em dstribuição!',
        icon: 'warning',
        showCancelButton: false,
 
      });
    },
    showModal() {
        this.$refs['my-modal'].show()
      },
      hideModal() {
        this.$refs['my-modal'].hide()
      },
      toggleModal() {
        // We pass the ID of the button that we want to return focus to
        // when the modal has hidden
        this.$refs['my-modal'].toggle('#toggle-btn')
      }
    ,
  
    async ordenarPorData() {
  // Define uma função que retorna uma Promise que resolve após um certo tempo
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // Aguarda 100ms antes de começar a ordenação
  await sleep(100);

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
  
  
  .inline {
  display: inline-block;
  vertical-align: middle; /* opcional: alinha verticalmente os elementos */
}
  tr:nth-child(even) {
    background:#cfc9be25;
    z-index: 0;
  }
  
  button {
    margin-left: 10px;
    border: none;
  }
  .data {
    display: flex;
    align-items: center; /* Centralizar os itens verticalmente */
  }

  i{
    font-size: 30px;
  }
  
  .table-container {
    max-height: 700px; /* Altura máxima da tabela */
    max-width: 1600px;
    margin:auto;
    max-width: 92%;
    overflow-y: scroll; /* Adiciona uma barra de rolagem vertical */
    position: relative;
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
   
   span {
     color: black;
   }
   .numero {
    color: black;
    text-decoration: none;
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
    justify-content: center;
    position: relative;
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
    width: 90px; /* Set a fixed width for the carousel container */
    z-index: 1;
    max-width: 100%;
   }
   .carousel img {
    width: 100%; /* Set the width of the images to fill the container */
    height: 100%; /* Set the height of the images to fill the container */
    object-fit: contain; /* Scale the images proportionally to fit inside the container */
   }
   .swal2-confirm.btn-danger {
  background-color: red !important;
}

th {
         background-color: #e9e5de !important;
         font-size: 30px;
         color: rgb(0, 0, 0);
       }
       .carousel-indicators {
  display: none;
}

   @media (max-width: 768px) {
  /* regras de estilo para telas menores que 768px */
  .table-container {
    overflow-x: auto;
  }
  table {
    max-width: 100%;
    overflow-x: auto;
    font-size: 5px;
  }
  .table thead tr {
    background-color: #692424 !important; /* substitua pela cor desejada */
  }
  
}
@media only screen and (max-width: 660px) {
 
    /*em telemovel remove colunas ,4,5 */
  .table th:nth-child(4),
  .table td:nth-child(4) {
    display: none;
  }
  .table th:nth-child(5),
  .table td:nth-child(5) {
    display: none;
  }

  .carousel {
    width: 70%;
    font-size: 12px;
  }
  header {
    font-size: 8px;
  }


.carousel {
    width: 40px !important; /* Set a fixed width for the carousel container */
    z-index: 1;
    max-width: 100%;
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

   .botao{
    border: none;
    font-size: 11px;
   }
  }
  
   </style>