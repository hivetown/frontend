<template>
<div class="parent d-flex justify-content-center mt-5" style="gap:14vh;">
<div class="d-flex gap-4">
       <router-link to="/produto">
           <b-card class="prod-card" style="background-color: green;">
               <img src="mac.png" class="square-image" style="width: 175px; height: 175px;">
           </b-card>
       </router-link>
       <b-card-text class="w-100" style="background-color: white;">
           <div>
                <div class="d-flex gap-2"></div>
                    <p><b>Nome:</b> Apple MacBook</p>
                    <p><b>Detalhes:</b> 16GB RAM | 1TB | Placa gráfica</p>
					<p><b>Fornecedor:</b> Worten dos computadores fixes</p>
					<p><b>Quantidade:</b> 3</p>
					<p><b>Preço do(s) item(s):</b> 69.696€</p>
           </div>
       </b-card-text>
   </div>
</div>
</template>


<style>
   .product{
	   width: 15%; 
   }

   .prod-card{
	   background-color:#f3f3f3 !important;
	   border-radius: 1.3em !important;
	   cursor: pointer;
   }

   .square-image {
	   width: 100%;
	   height: 100%;
	   object-fit: cover; /* Ajusta a imagem para preencher todo o espaço disponível */
   }

   .prod-category{
	   background-color:#9DC88D; /* A cor irá variar de acordo com a categoria */
	   cursor: pointer;
   }
</style>