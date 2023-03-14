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
      <th scope="col">Total</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><img src="https://i.imgur.com/o2fKskJ.jpg"></td>
      <td>Iphone X</td>
      <td>MediaMarkt</td>
      <td>550€</td>
      <td>2</td>
      <td>1100€</td>
    </tr>
    <tr>
        <!--TODO trocar fotos-->
      <td><img src="https://i.imgur.com/GQnIUfs.jpg"></td>
      <td>Capa Iphone x</td>
      <td>Capas e companhia</td>
      <td>10€</td>
      <td>1</td>
      <td>10€</td>
    </tr>
    <tr>
      <td><img src="https://i.imgur.com/GQnIUfs.jpg"></td>
      <td>Água</td>
      <td>Lidl</td>
      <td>1€</td>
      <td>3</td>
      <td>3€</td>
    </tr>
    <tr>
      <td><img src="https://i.imgur.com/GQnIUfs.jpg"></td>
      <td>Água</td>
      <td>MediaMarkt</td>
      <td>1€</td>
      <td>3</td>
      <td>3€</td>
    </tr>
    <tr>
      <td><img src="https://i.imgur.com/GQnIUfs.jpg"></td>
      <td>Água</td>
      <td>MediaMarkt</td>
      <td>1€</td>
      <td>3</td>
      <td>3€</td>
    </tr>
    <tr>
      <td><img src="https://i.imgur.com/GQnIUfs.jpg"></td>
      <td>Água</td>
      <td>MediaMarkt</td>
      <td>1€</td>
      <td>3</td>
      <td>3€</td>
    </tr>
  </tbody>
</table>
</div>
</template>
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
  .table-container {
    max-height: 390px; /* Altura máxima da tabela */
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
    /*em telemovel remove colunas 3,4,5 */

  .table th:nth-child(4),
  .table td:nth-child(4) {
    display: none;
  }
  .table th:nth-child(5),
  .table td:nth-child(5) {
    display: none;
  }
  .table th:nth-child(2),
  .table td:nth-child(2) {
    display: none;
  }

  header {
    font-size: 8px;
  }

}
   </style>
  
