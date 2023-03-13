<template>
    <div class="root">
      <div class="wrapper-mains">
        <div class="left-align">
            <!-- TODO adicionar o numero da encomenda -->
          <h2 class="bold center" style="color:#3aac5d;">Progresso da encomenda X</h2>
          <Progresso :length="4"></Progresso>
        </div>
      </div>
    </div>
    <div class="tabela">
        <OrderDetails />
        <h2>Valor total: 600€</h2>
        <h4>2023/02/12</h4>
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
    width: 561px;
      height: auto;
      background: white;
      text-align: center;
      margin: auto;
      padding: 100px 47px 20px 61px;
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
  h2, h4 {
    margin-top: 20px;
    text-align: right;
    margin-right: 70px;
  }

  </style>
  