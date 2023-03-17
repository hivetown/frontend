<template>
    <div class="root">
      <div class="wrapper-mains">
        <div >
            <!-- TODO adicionar o numero da encomenda -->
          <p class="titulo" >Progresso da encomenda X</p>
          <Progresso :length="4"></Progresso>
        </div>
      </div>
      <div class="tabela">
        <OrderDetails />
        <h2 class="resumo">Valor total: 600€</h2>
        <h4 class="resumo">2023/02/12</h4>
    </div>
    </div>
    
  </template>
  <script>
  import Progresso from '../components/Progress.vue';
  import OrderDetails from '../components/OrderDetails.vue';
  export default {
    components:{
      Progresso,
      OrderDetails,
    }
  }
  </script>
  <style scoped>
  .wrapper-mains{
      height: auto;
      background: white;
      text-align: center;
      margin: auto;
      padding: 20px  ;
  }
  .textarea{
      display: block;
      width: 100%;
      height: 70px;
      border-radius: 5px;
  }
  .tabela{
    margin-top: 120px;
  }
  .resumo {
    margin-top: 20px;
    text-align: right;
    margin-right: 90px;
  }
  .titulo {
    font-size: 30px;
  }
  @media (max-width: 660px) {
    .titulo {
    font-size: 25px;
    text-align: center !important;
  }
  .resumo {
    margin-top: 10px;
    text-align: right;
    margin-right: 40px;
  }
  }
  
  </style>
  