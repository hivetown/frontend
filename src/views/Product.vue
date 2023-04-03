<template>

   <!-- Caminho -->
   <div class="parent mb-5 px-3">
      <b-breadcrumb>
         <b-breadcrumb-item href="#home">
         <i class="bi bi-house-fill"></i>Home</b-breadcrumb-item>
         <b-breadcrumb-item href="#foo">Foo</b-breadcrumb-item>
         <b-breadcrumb-item href="#bar">Bar</b-breadcrumb-item>
         <b-breadcrumb-item active>Baz</b-breadcrumb-item>
      </b-breadcrumb>
   </div>

   <!-- Detaçhes do produto -->
   <div class="d-flex parent">

      <!-- Imagens -->
      <div class="d-flex flex-row justify-content-center w-50">
         <div class="d-flex flex-column align-items-center w-75 h-75 rounded-3">
            <!-- TODO ver se é preciso um fundo por causa das imagens -->
            <!-- Coração dos favoritos -->
            <div class="d-flex justify-content-end w-100 px-4 py-2"  style="z-index:1212;">
               <span class="" style="font-size: 2.5vh;">
                  <i v-bind:class="[isFavorite ? 'bi-heart-fill' : 'bi-heart']" 
                     style="color: #DC6942; cursor: pointer;" 
                     v-on:click="isFavorite = !isFavorite"></i>
               </span>
            </div>
			
            <!-- Imagem grande -->
            <img class="square-image rounded-3" :src="selectedImage" :alt="selectedImageAlt" style="margin-top:-10%;" >

            <!-- Imagens alternativas -->
				<div>
               <div class="d-flex justify-content-between align-items-center mt-3 gap-3" style="overflow: auto;">
                  <img class="square-image alternative-img rounded-3"
                     style="background-color: #f3f3f3;"
                     v-for="(image, index) in productSpec.images"
                     :key="index"
                     :src="image.url"
                     :alt="image.alt"
                     @click="selectImage(index)" />
               </div>
            </div>
			</div>
		</div>
		
      <!-- Lado direito da página -->
		<div class="w-50">
			<div class="w-75" style="min-height: 20vh;">

            <!-- Informação do produto -->
            <!-- {{  productSpec }} -->
            <h1 class="product-title">{{ productSpec.name }}</h1>
				<p class="grey-txt">{{ productSpec.description }}</p>

            <!-- TODO rating automático -->
            <!-- Rating -->
            <div>
               <div class="rating d-flex gap-1 separator-bottom">
                  <i v-for="star in 5" :key="star" class="mr-1 bi bi-star-fill yellow-txt mb-3" :class="{ 'bx bxs-star': star <= value, 'bx bx-star': star > value }"></i>
                  <span class="">(10)</span>
               </div>
            </div>

			</div>

         <div class="separator-bottom" style="min-height: 30vh;">
            <!-- TODO preço automático -->
            <!-- Preço -->
            <div class="d-flex align-items-center gap-3">
               <!-- {{ productSpec }} -->
               <h3 class="">{{ productSpec[0] }}€ - {{ productSpec[1] }}</h3>
               <h5 class="grey-txt text-decoration-line-through">999€</h5>
            </div>

            <!-- Quantidade -->
            <div class="d-flex align-items-center gap-4" style="margin-top: 2%;">

               <!-- Botão da quantidade -->
               <div class="quantity-div d-flex justify-content-between rounded-pill">
                  <b-button class="mr-3 rounded-pill" @click="decrement"><i class="bi bi-dash-lg"></i></b-button>
                  <b-button>{{ quantity }}</b-button>
                  <b-button class="ml-3 rounded-pill" @click="increment"><i class="bi bi-plus-lg"></i></b-button>
               </div>

               <!-- TODO disponibilidade automático -->
               <p class="mt-3 grey-txt">Disponibilidade: <span>3</span></p>

            </div>

            <!-- Botões compra -->
            <div class="d-flex gap-4 align-items-center" style="margin-top:10vh;">
               <b-button class="buy-btn rounded-pill">Comprar agora</b-button>
            
               <div class="aux-btns d-flex align-items-center gap-1"> 
                  <button type="button" class="btn btn-outline-secondary circle-btn" 
                          v-b-tooltip.hover title="Adicionar ao carrinho">
                          <i class="bi bi-cart"></i>
                  </button>
                  <button type="button" class="btn btn-outline-secondary circle-btn" 
                          v-b-tooltip.hover title="Ver produto" >
                          <i class="bi bi-eye"></i>
                  </button>
                  <button type="button" class="btn btn-outline-secondary circle-btn" 
                          v-b-tooltip.hover title="Comparar produto">
                          <i class="bi bi-arrow-left-right"></i>
                  </button>
               </div>
            </div>
         </div>
         
         <!-- Detalhes do produto -->
         <!-- <div class="" style="margin-top: -2vh;">
            <div class="d-flex gap-3 grey-txt mt-5" >
               <p class="fw-bold">Código do produto:</p>
               <p>Código do produto</p>
            </div>
            <div class="d-flex gap-3 grey-txt" >
               <p class="fw-bold">Categoria:</p>
               <p>Tecnologia</p>
            </div>
         </div> -->
         
         <!-- Vendedor -->
         <div class="mt-5 d-flex align-items-center gap-3">
            <b-avatar class="nav-item" src="https://placekitten.com/320/320" 
                      style="box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;  scale:1.2;">
            </b-avatar> 
            <div class="seller">
               <h5>Maria Fernandes</h5>
               <a href="#" class="grey-txt">Sobre o vendedor</a>
            </div>
         </div>
		</div>
	</div>

   <!-- Informação adicional -->
   <div class="parent px-5">
      <div class="separator-top mt-4">
         <b-navbar class="mt-3">
            <b-nav v-model="currentPage">
               <b-nav-item @click="currentPage = 'detalhes'" 
                           v-bind:class="{ 'active-view': currentPage === 'detalhes' }">
                  <h5 class="grey-txt">Detalhes do produto</h5>
               </b-nav-item>
               <b-nav-item @click="currentPage = 'avaliacoes'" 
                           v-bind:class="{ 'active-view': currentPage === 'avaliacoes' }">
                  <h5 class="grey-txt">Avaliações</h5>
               </b-nav-item>
            </b-nav>
         </b-navbar>
         <!-- Página dos detalhes -->
         <div class="px-4" v-if="currentPage === 'detalhes'" >
            <div class="mt-4">
               <p>Aqui vão estar os <b>detalhes</b> do produto</p>
            </div>
         </div>
         <!-- Página das avaliações -->
         <div class="px-4" v-if="currentPage === 'avaliacoes'">
            <div class="mt-4">
               <p>Aqui vão estar as <b>avaliações</b> do produto</p>
            </div>
         </div>
      </div>

      <!-- Produtos semelhantes -->
      <div class="separator-top mt-5">
         <div class="title d-flex justify-content-between align-items-center mb-5">
            <h4 class="grey-txt mt-4">Produtos semelhantes</h4>
            <button type="button" class="btn btn-outline-secondary btn-sm"> Ver todos </button>
         </div>

         <!-- TODO pôr automático -->
         <div class="d-flex justify-content-center" style="background-color:; gap: 12vh">
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
      background-color: #f7f7f7 !important;
      padding: 0.5em;
      box-shadow: rgba(27, 31, 35, 0.04) 0px 1px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px inset;
   }

   .quantity-div button{
      background-color: #f7f7f7 !important;
      border: none !important;
   }

   .quantity-div .btn-content{
      color:#5A5A5A !important;
   }

   .buy-btn{
      background-color: #4D774E !important;
      padding: 0.8em !important;
      box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
   }

   .buy-btn .btn-content{
      color: white !important;
   }

   .aux-btns{
      scale: 1.2;
   }

   .aux-btns button:hover i{
      color: white !important;
   }

   .seller{
      margin-top: -0.5em;
      line-height: 0.2em;
   }

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

   // Componentes
   import ProductCard from "@/components/ProductCard.vue";

   import { fetchProduct } from "@/api";
   import { Product } from "@/types";
   import { defineComponent, PropType } from 'vue';

   export default defineComponent({
      // TODO substituir o rating para ser automático e ver se isto ainda é necessário
      name: 'Rating',
      props: {
         value: {
            type: Number as PropType<number>,
            required: true,
            validator: (v: number) => v >= 0 && v <= 5
         },
      },
      data() {
         return {
            selectedImage: '', // Imagem selecionada
            selectedImageAlt: '', // Alt da imagem selecionada
            isFavorite: false, // Se o produto está nos favoritos
            quantity: 0, // Quantidade de produtos a comprar
            currentPage: "detalhes", // Página atual das tabs do produto
            
            // Dados da BD
            productSpec: {} as Product,
         }; 
      },
      methods: {
         // Aumentar e diminuir a quantidade de produtos
         increment() {
            this.quantity++;
         },
         decrement() {
            if (this.quantity > 0) {
               this.quantity--;
            }
         },
         
         // Selecionar a imagem do produto a visualizar
         selectImage(index: number) {
            this.selectedImage = this.productSpec.images[index].url;
            this.selectedImageAlt = this.productSpec.images[index].alt;
         },
      },

      // A fazer antes de montar o componente
      async beforeMount() {
         // Carregar os dados do produto da BD
         const productSpec = await fetchProduct(this.$route.params.specid);
         this.productSpec = productSpec.data;
         // console.log("dados: "+ JSON.stringify(productSpec));

         // Carregar a imagem principal do produto
         this.selectedImage = this.productSpec.images[0].url;
         this.selectedImageAlt = this.productSpec.images[0].alt;
      },
      components: { ProductCard }
   });
</script>
