<template>
   <div class="parent mb-4 px-3">
      <b-breadcrumb>
         <b-breadcrumb-item href="#home">
         <b-icon
            icon="house-fill"
            scale="1.25"
            shift-v="1.25"
            aria-hidden="true"
         ></b-icon>
         Home
         </b-breadcrumb-item>
         <b-breadcrumb-item href="#foo">Foo</b-breadcrumb-item>
         <b-breadcrumb-item href="#bar">Bar</b-breadcrumb-item>
         <b-breadcrumb-item active>Baz</b-breadcrumb-item>
      </b-breadcrumb>
   </div>
   <!-- <div class="d-flex parent" style="background-color: red; height: 80vh;"> -->
   <div class="d-flex parent" style="height: 80vh;">
		<!-- <div class="d-flex flex-row justify-content-center w-50" style="background-color: green;"> -->
      <div class="d-flex flex-row justify-content-center w-50" style="">
			<!-- <div class="d-flex flex-column align-items-center w-75 h-75"  style="background-color: aqua;"> -->
         <div class="d-flex flex-column align-items-center w-75 h-75 rounded-3" style="background-color: #f3f3f3;">
            <div class="d-flex justify-content-end w-100 p-4">
               <!-- <span class="position-absolute top-0 end-0 p-3 fav"> -->
               <span class="" style="font-size: 2vh;">
                  <i class="bi bi-heart" style="color: #DC6942; cursor:pointer;"></i>
               </span>
            </div>
				<!-- <img class="square-image rounded-3" src="https://placehold.jp/500x500.png"> -->
            <img class="square-image rounded-3" src="mac.png" style="margin-top:-10%;">
				<div>
               <!-- TODO ver se vale a pena meter umas setas para ver mais imagens ou não -->
					<!-- <i class="bi bi-chevron-left grey-txt"></i> -->
					<div class="d-flex justify-content-between align-items-center mt-3" style="">	
						<img class="square-image alternative-img rounded-3" style="background-color: #f3f3f3;" src="mac.png">
						<img class="square-image alternative-img rounded-3" style="background-color: #f3f3f3;" src="mac.png">
						<img class="square-image alternative-img rounded-3" style="background-color: #f3f3f3;" src="mac.png">
						<img class="square-image alternative-img rounded-3" style="background-color: #f3f3f3;" src="mac.png">
					</div>
					<!-- <i class="bi bi-chevron-right grey-txt"></i> -->
				</div>
			</div>
		</div>
		
		<div class="w-50 py-5" style="background-color: ;">
			<div class="w-75">
				<h1 class="product-title">Apple MacBook</h1>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
					Sunt obcaecati repellendus soluta modi commodi earum 
				</p>

            <div>
              
            </div>
			</div>

         <div class="d-flex align-items-center gap-3" style="border-top: 1px solid #f3f3f3;">
            <h3 class="mt-4">999€</h3>
            <h5 class="mt-4 grey-txt text-decoration-line-through">999€</h5>
         </div>

         <div class="d-flex align-items-center gap-4" style="margin-top: 2%;">
            <div class="quantity-div d-flex justify-content-between rounded-pill">
               <b-button class="mr-3 rounded-pill" @click="decrement">-</b-button>
               <b-button>{{ quantity }}</b-button>
               <!-- <div>{{ quantity }}</div> -->
               <b-button class="ml-3 rounded-pill" @click="increment">+</b-button>
            </div>
            <p class="mt-3 grey-txt">Disponibilidade: <span>3</span></p>
         </div>

         <div class="d-flex gap-4 align-items-center mt-5">
            <b-button class="buy-btn rounded-pill">Comprar agora</b-button>
            
            <div class="aux-btns d-flex align-items-center gap-1"> 
               <button type="button" class="btn btn-outline-secondary circle-btn" v-b-tooltip.hover title="Adicionar ao carrinho">
                  <i class="bi bi-cart"></i>
               </button>
               <button type="button" class="btn btn-outline-secondary circle-btn" v-b-tooltip.hover title="Ver produto" >
                  <i class="bi bi-eye"></i>
               </button>
               <button type="button" class="btn btn-outline-secondary circle-btn" v-b-tooltip.hover title="Comparar produto">
                  <i class="bi bi-arrow-left-right"></i>
               </button>
            </div>
         </div>

         <div class="mt-5 separator-top">
            <div class="d-flex gap-3 grey-txt mt-5" >
               <p class="fw-bold">Código do produto:</p>
               <p>Código do produto</p>
            </div>
            <div class="d-flex gap-3 grey-txt" >
               <p class="fw-bold">Categoria:</p>
               <p>Tecnologia</p>
            </div>
         </div>
         
         <div class="mt-5 d-flex align-items-center gap-3" style="background-color: ;">
            <b-avatar class="nav-item" src="https://placekitten.com/320/320" style="box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;  scale:1.2;">
                  <!-- TODO badges das notificações  -->
            </b-avatar> 
            <div class="" style="line-height: 0.2em; margin-top: -0.2em;">
               <h5>Maria Fernandes</h5>
               <a href="#" class="grey-txt">Sobre o vendedor</a>
            </div>
            
         </div>
		</div>
	</div>

   <div class="parent px-5" style="height: 80vh; background-color: ;">
      <!-- <div class="mt-4 d-flex gap-4">
         <h5 class="py-2 line-active">Detalhes do Produto</h5>   
         <h5 class="py-2">Avaliações</h5>
         <hr style=" border: none !important; border-top: 5px solid green !important;">   
      </div> -->
      
      <div class="separator-top mt-4">
         <b-navbar class="mt-3">
            <b-nav v-model="currentPage">
               <b-nav-item @click="currentPage = 'detalhes'" v-bind:class="{ 'active-view': currentPage === 'detalhes' }">
                  <h5 class="grey-txt">Detalhes do produto</h5>
               </b-nav-item>
               <b-nav-item @click="currentPage = 'avaliacoes'" v-bind:class="{ 'active-view': currentPage === 'avaliacoes' }">
                  <h5 class="grey-txt">Avaliações</h5>
               </b-nav-item>
            </b-nav>
         </b-navbar>
         <div class="px-4" v-if="currentPage === 'detalhes'" >
            <div class="mt-4">
               <p>Aqui vão estar os <b>detalhes</b> do produto</p>
            </div>
         </div>
         <div class="px-4" v-if="currentPage === 'avaliacoes'">
            <div class="mt-4">
               <p>Aqui vão estar as <b>avaliações</b> do produto</p>
            </div>
         </div>
      </div>

      <div class="separator-top mt-5" style="background-color:;">
         <div class="title d-flex justify-content-between align-items-center mb-5">
            <h4 class="grey-txt mt-4">Produtos semelhantes</h4>
            <button type="button" class="btn btn-outline-secondary btn-sm">
            Ver todos
            </button>
         </div>

         <div class="d-flex justify-content-center" style="gap: 12vh">
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>
            <ProductCard></ProductCard>
         </div>
      </div>

   </div>

</template>

<style>
   .alternative-img{
      width: 20% !important;
   }

   .product-title{
      letter-spacing: -0.04em;
   }

   .quantity-div{
      width: 14vh;
      background-color: #f3f3f3 !important;
      border:solid 2px #f3f3f3;
      padding: 0.2em;
   }

   .quantity-div button{
      background-color: #f3f3f3 !important;
      color:#5A5A5A;
      border: none !important;
   }

   .quantity-div button:hover{
      background-color: #f3f3f3 !important;
      color:#5A5A5A;
      border: none !important;
   }

   .buy-btn{
      background-color: #4D774E !important;
      padding: 0.8em !important;
   }

   .aux-btns{
      scale: 1.2;
   }

   /* .about-prod-active{
      border-bottom: solid 2px green;
   } */
   
</style>

<style scoped>
.active-view {
  border-bottom: 3px solid #4D774E;
}

.active-view h5 {
  color:#4D774E !important;
}
</style>

<script lang="ts">
import ProductCard from "@/components/ProductCard.vue";

import { defineComponent } from "vue";

export default defineComponent({
    data() {
        return {
            quantity: 0,
            currentPage: "detalhes",
        };
    },
    methods: {
        increment() {
            this.quantity++;
        },
        decrement() {
            if (this.quantity > 0) {
                this.quantity--;
            }
        },
    },
    components: { ProductCard }
});
</script>