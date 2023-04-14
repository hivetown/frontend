<template>
   <!-- Caminho -->
   <PathComponent></PathComponent>

   <!-- Detalhes do produto -->
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
                     v-for="(image, index) in defaultProduct && defaultProduct.productSpec ? 
                                                                defaultProduct.productSpec.images : []"
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
			<div v-if="defaultProduct" class="w-75" style="min-height: 20vh;">

            <!-- Informação do produto -->
            <h1 class="product-title">{{ defaultProduct.productSpec.name }}</h1>
				<p class="grey-txt">{{ defaultProduct.productSpec.description }}</p>

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
               <h3>{{lowestPrice}}€ - {{ highestPrice }}€</h3>
               <!-- <h5 class="grey-txt text-decoration-line-through">999€</h5> -->
            </div>
            <div>
               <a href="#" v-if="producers > 1">
                  <!-- TODO ver se é mais fácil trazer do /products/id (producerCount) -->
                  ver +{{ producers -1 }} vendedores
               </a>
               <!-- Não há mais vendedores para além do apresentado -->
               <a href="#" v-else-if="producers === 1"></a>
            </div>

            <!-- Quantidade -->
            <div class="d-flex align-items-center gap-4" style="margin-top: 4%;">

               <!-- Botão da quantidade -->
               <div class="quantity-div d-flex justify-content-between rounded-pill">
                  <b-button class="mr-3 rounded-pill" @click="decrement"><i class="bi bi-dash-lg"></i></b-button>
                  <b-button>{{ quantity }}</b-button>
                  <b-button class="ml-3 rounded-pill" @click="increment"><i class="bi bi-plus-lg"></i></b-button>
               </div>

               <p class="mt-3 grey-txt"><span>{{ stock }}</span> items disponíveis</p>
            </div>

            <!-- Botões compra -->
            <div class="d-flex gap-4 align-items-center" style="margin-top:10vh;">
               <b-button class="buy-btn rounded-pill">Comprar agora</b-button>
            
               <div class="aux-btns d-flex align-items-center gap-1"> 
                  <button type="button" class="btn btn-outline-secondary circle-btn" 
                          v-b-tooltip.hover title="Adicionar ao carrinho">
                          <i class="bi bi-cart"></i>
                  </button>
                  <!-- <button type="button" class="btn btn-outline-secondary circle-btn" 
                          v-b-tooltip.hover title="Ver produto" >
                          <i class="bi bi-eye"></i>
                  </button> -->
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
               <h5 v-if="defaultProduct">{{ defaultProduct.producer.name }}</h5>
               <a href="#" class="grey-txt">Sobre o vendedor</a>
            </div>
         </div>
		</div>
	</div>

   <!-- TODO - outros vendedores -->
   <!-- <div style="background-color: pink; height:">
      <div v-for="(producerProduct, index) in producerProducts.items">
         <div class="d-flex gap-3">
            <p>Vendido por: <a href="#">{{ producerProduct.producer.name }}</a></p>
            <p>{{ producerProduct.currentPrice }}€</p>
         </div>
      </div>
   </div> -->
  

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
               <h5 v-if="productCategories.items">
                  Categorias do produto <span>({{ productCategories.items.length }})</span>
               </h5>
               
               <div v-for="categoria in productCategories.items">
                  <!-- <li>{{ categoria.id }} - {{ categoria.name }}</li> -->
                  <li class="px-3">{{ categoria.name }}</li>
               </div>
            </div>
            <div class="mt-4">
               <h5 class="mb-4">Especificações</h5>
               <div style="background-color: ; height: ;">
                     <table style="background-color: ; width: 100%;">
                        <!-- <thead>
                           <tr>
                              <th>Características</th>
                           </tr>
                        </thead> -->
                        <tbody>
                           <tr v-for="(category, index) in productCategoriesFields" :key="index" style="border-bottom: 2px solid #f3f3f3;">
                              <tr v-for="field in category">
                                 <div class="d-flex justify-content-arround px-3" style="background-color: ; height: 5vh;">
                                    <span style="font-weight:bold ; width: 45vh; background-color: ">{{ field.field.name }}</span> 
                                    <span style="font-weight: ;">{{ field.value }} {{ field.field.unit }}</span>
                                 </div>
                              </tr>
                           </tr>
                        </tbody>
                     </table>
               </div>




               <div>
                  <!-- <ul> -->
                     <!-- Para cada categoria (bola preenchida) mostra os fields (bolas vazias)-->
                     <!-- <li v-for="(category, index) in productCategoriesFields" :key="index">
                        <div v-for="field in category">
                           <ul>
                              <li>Nome:{{ field.field.name }}</li>
                              <li>Valor:{{ field.value }}</li>
                              <li>Unidade:{{ field.field.unit }}</li>
                           </ul>
                           <p>----</p>
                        </div>
                     </li> -->
                  <!-- </ul> -->
               </div>
               <!-- {{ productCategoriesFields }} -->
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
   import PathComponent from "@/components/PathComponent.vue";

   import { fetchProducerProducts, fetchProductCategories, fetchProductCategoriesFields } from "@/api";
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
            lowestPriceIndex: 0, // Índice do produtor com o preço mais baixo
            
            // Dados da BD
            producerProducts: [] as Product[],
            defaultProduct: null,
            lowestPrice: null,
            highestPrice: null,
            stock: null,
            producers: 1,

            productCategories: [] as Product[],
            productCategoriesFields: [],
            fields: []
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
            this.selectedImage = this.defaultProduct.productSpec.images[index].url;
            this.selectedImageAlt = this.defaultProduct.productSpec.images[index].alt;
         },

         // Carrega a lista de campos de categorias de produtos
         // async loadProductCategoriesFields() {
         //    const productCategories = await fetchProductCategories(this.$route.params.specid);
         //    this.productCategories = Object.values(productCategories.data); // Transforma o objeto em um array
         //    for (const categoria of this.productCategories[0]) {
         //       const response = await fetchProductCategoriesFields(this.$route.params.specid, categoria.id);
         //       this.productCategoriesFields.push([categoria.id, response.data.items]);
         //    }
         //    // console.log("productCategoriesFields: " + JSON.stringify(this.productCategoriesFields))
         //    this.$forceUpdate(); // Atualiza o componente
         // },

      },

      // A fazer antes de montar o componente
      async beforeMount() {
         // Carregar os dados do produto da BD
         const producerProducts = await fetchProducerProducts(this.$route.params.specid);
         this.producerProducts = producerProducts.data;

         // Produto com o preço mais baixo a ser apresentado quando a página é carregada
         this.defaultProduct =  this.producerProducts.items[this.lowestPriceIndex].productSpec

         // Carregar a imagem principal do produto
         if (this.defaultProduct.images[this.lowestPriceIndex]) {
            this.selectedImage = this.defaultProduct.images[this.lowestPriceIndex].url;
            this.selectedImageAlt = this.defaultProduct.images[this.lowestPriceIndex].alt;
         }

         // Inicializa o menor preço, o maior e o stock
         if (this.producerProducts.items.length > 0) {
            this.lowestPrice = this.producerProducts.items[0].currentPrice;
            this.highestPrice = this.producerProducts.items[0].currentPrice;
            this.stock = this.producerProducts.items[0].stock;
         }
         // Percorre a lista de produtores contando-os, encontra o preço mais alto e o preço 
         // mais baixo. Determina ainda o stock total
         for (let i = 1; i < this.producerProducts.items.length; i++) {
            this.producers += 1;
            this.stock += this.producerProducts.items[i].stock;
            
            const currentPrice = this.producerProducts.items[i].currentPrice;
            if (currentPrice < this.lowestPrice) {
               this.lowestPrice = currentPrice;
               this.lowestPriceIndex = i;
            }
            if (currentPrice > this.highestPrice) {
               this.highestPrice = currentPrice;
            }
         }
         this.defaultProduct = this.producerProducts.items[this.lowestPriceIndex];

         // Carregar as categorias do produto
         const productCategories = await fetchProductCategories(this.$route.params.specid);
         this.productCategories = productCategories.data;
         
         try{
            for (const categoria of this.productCategories.items) {
               const response = await fetchProductCategoriesFields(this.$route.params.specid, categoria.id);
               this.fields.push( response.data.items);
            }
         }catch(error){
            console.log("Erro: " + error);
         }

         // // Guarda os campos de cada categoria
         // // console.log("Antes do for: "+ this.productCategoriesFields);
         // for (const categoria of this.productCategories.items) {
         //    const fields = await fetchProductCategoriesFields(this.$route.params.specid, categoria.id);
         //    for (const items of fields.data.items){
         //       // console.log("items: " + JSON.stringify(items.field));
         //       this.productCategoriesFields.push(items.field);
         //    }
         //    // console.log("Dentro do for: "+ JSON.stringify(this.productCategoriesFields));
         //    // console.log("//////////////");
         // }
         // // this.productCategoriesFields = productCategoriesFieldsAtual;
         // // console.log("Depois do for: " + JSON.stringify(this.productCategoriesFields));
      }, 
      created() {
      //    this.loadProductCategoriesFields();
         this.productCategoriesFields = this.fields;
      },
         components: { ProductCard, PathComponent }
      
   });
</script>
