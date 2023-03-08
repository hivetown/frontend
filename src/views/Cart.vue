<template>
    <div>  
      <a href="/">
        <i class="bi bi-arrow-left"></i>      
        <h4 style="display: inline-block; color: black; font: DM Serif Display;">Continuar a comprar</h4>
      </a>  
      <div class="historico">
        <OrderHistory/>  
      </div>
    </div>
  </template>
  
  <script>
  import OrderHistory from "../components/OrderHistory.vue";
  
  
  export default ({
    components: {
      OrderHistory
    },
  })
  </script>
  
  <style scoped>
  .historico {
    margin-top: 50px;
  }
  
  i {
    color: #000;
    font-size: 25px;
    margin-left: 20px ;
    margin-right: 10px;
  }
  </style>
  