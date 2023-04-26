<template>
  <!-- Caminho seguido até esta página -->
  <div class="parent mb-4">
    <!-- TODO por isto automático -->
    <b-breadcrumb>
      <b-breadcrumb-item href="#home"><i class="bi bi-house-fill"></i>Home</b-breadcrumb-item>
      <b-breadcrumb-item href="#foo">Foo</b-breadcrumb-item>
      <b-breadcrumb-item href="#bar">Bar</b-breadcrumb-item>
      <b-breadcrumb-item active>Baz</b-breadcrumb-item>
    </b-breadcrumb>
  </div>

  <!-- Conteúdo da página -->
  <div class="d-flex parent">
    <!-- Barra lateral com os filtros -->
    <div class="lat-bar" style="width: 20%;">
      <div id="filters">
        <div id="category-filter">
          <h5 class="grey-txt">Categorias</h5>
          <!-- Por enquanto limitado a apenas 10 -->
          <!-- <CategoryFilter :categories="allCategories.slice(0, 10)"></CategoryFilter> -->
           <CategoryFilter :categories="allCategories"></CategoryFilter>
        </div>

        <div id="price-filter">
          <h5 class="grey-txt mt-3">Preço</h5>
          <PriceFilter :maxPrice="mostExpensiveProduct"></PriceFilter>
        </div>

        <div id="supplier-filter">
          <h5 class="grey-txt mt-3">Fornecedor</h5>
          <SupplierFilter></SupplierFilter>
        </div>

        <div id="reting-filter" class="mt-4" style="border-top: 1px solid #f3f3f3">
          <h5 class="grey-txt mt-3">Avaliação</h5>
          <RatingFilter></RatingFilter>
        </div>  
      </div>
    </div>

    <!-- Espeaço à direita -->
    <div class="" style="width: 100%; background-color:;">
      <!-- TODO trocar para a categoria escolhida -->
      <h3 class="parent dgreen-txt">Portáteis</h3>
      <!-- Diferentes vistas da página -->
      <!-- <CustomViews :items="allProductsData.data.totalItems" :amount="allProductsData.data.pageSize"></CustomViews> -->
      <CustomViews
        v-if="allProductsData && allProductsData.data"
        :items="allProductsData.data.totalItems"
        :amount="allProductsData.data.pageSize"
      />

      <div v-if="allProductsData?.data?.totalItems === 0" class="parent">
        <p>Não foram encontrados produtos para a categoria especificada</p>
      </div>
    
      <div v-else id="page-products">
        <!-- <div v-for="(linha, indice) in Math.ceil(allProductsData.data.pageSize / 4)" :key="indice"> -->
          <div v-for="(linha, indice) in Math.ceil((allProductsData?.data?.pageSize ?? 0) / 4)" :key="indice">

          <div class="parent d-flex justify-content-center mt-5" style="gap:12vh;">
            <template v-for="product in allProducts.slice(indice * 4, indice * 4 + 4)">
              <!-- {{ product.id}} -->
              <ProductCard :productId="product.id"
                           :productTitle="product.name" 
                           :productDescription="product.description"
                           :productImage="product.images[0]?.url"
                           :productPrice="[product.minPrice, product.maxPrice]"
                            @send-id="handleId"             
              />
            </template>
          </div>
        </div>
      </div>
      <div class="" style="display: flex; flex-direction: row-reverse; justify-content: center;">
          <!-- <Pagination :totalRows="allProductsData.data.totalItems" 
                      :perPage="allProductsData.data.pageSize" 
                      :currentPage="allProductsData.data.page">
          </Pagination> -->
          <Pagination v-if="allProductsData && allProductsData.data"
              :totalRows="allProductsData.data.totalItems"
              :perPage="allProductsData.data.pageSize"
              :currentPage="allProductsData.data.page">
          </Pagination>

          <!-- <p>Total de páginas: {{ allProductsData.data.totalPages }}</p> -->
      </div>
    </div>
  </div>
  
  <!-- TODO fazer o banner desaparecer e aparecer quando é suposto -->
  <!-- Banner da comparação que aparece quando se clica em comparar um produto -->
  <!-- <CompareBanner v-if="compareBannerState === 'open'"></CompareBanner> -->
  <CompareBanner v-if="selectedProductId" :product1Id="prod1Id" :product2Id="prod2Id"></CompareBanner>

</template>

<script setup lang="ts">
  // Filtros
  import CategoryFilter from "@/components/CategoryFilter.vue";
  import PriceFilter from "@/components/PriceFilter.vue";
  import SupplierFilter from "@/components/SupplierFilter.vue";
  import RatingFilter from "@/components/RatingFilter.vue";
  import Pagination from "@/components/Pagination.vue";

  // Componentes auxiliares
  import CustomViews from "@/components/CustomViews.vue";
  import ProductCard from "@/components/ProductCard.vue";
  import CompareBanner from "@/components/CompareBanner.vue";
</script>

<!-- TODO atualizar tipagens -->
<script lang="ts">
// Componentes
// import ProductCard from "@/components/ProductCard.vue";

// API
import { fetchProduct, fetchAllProducts, fetchAllCategories} from "@/api";
import { Product, Category } from "@/types";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      compareBannerState: localStorage.getItem('compareBannerState'),
      // Dados da BD
      // Produtos
      allProducts : {} as Product[],
      productSpec: {} as Product,
      allProductsData: {} as any,
      // Filtros
      allCategories: {} as Category[],

      selectedProductId: null,
      prod1Id: null,
      prod2Id: null,
    };
  },
  methods: {
    // handleId(id) {
    //   this.selectedProductId = id;
    //   // Se não houver produto 1 selecionado
    //   if(this.prod1Id === null) {
    //     this.prod1Id = id;
    //     console.log("Prod1Id é " + this.prod1Id);
    //   } else {
    //     if(this.prod2Id === null) {
    //       if(id != this.prod1Id){
    //         // console.log("Os produtos são diferentes");
    //         this.prod2Id = id;
    //       }else{
    //         console.log("Os produtos são iguais");
    //       }
    //       console.log("Prod2Id é " + this.prod2Id);
    //     }
    //   }
    handleId(id) {
      this.selectedProductId = id;
      if (this.prod1Id === null) {
        this.prod1Id = id;
        // console.log("Prod1Id é " + this.prod1Id);
      } else if (this.prod2Id === null || this.prod1Id === null) {
        if (id != this.prod1Id) {
          // console.log("Os produtos são diferentes");
          this.prod2Id = id;
          // console.log("Prod2Id é " + this.prod2Id);
        } else {
          // console.log("Os produtos são iguais");
          // alert("O produto já está selecionado");
        }
      } else {
        this.prod1Id = id;
        this.prod2Id = null;
        // console.log("Prod1Id é " + this.prod1Id);
      }

      // if(this.prod1Id === null) {
      //   // console.log("Prod1Id é null");
      //   this.prod1Id = id;
      //   console.log("Prod1Id é " + this.prod1Id);
      // } else {
      //   if(!this.prod2Id === id) {
      //     console.log("prod2: "+ this.prod2Id + "id: " + id);
      //     console.log("Prod2Id é " + this.prod2Id);
      //     this.prod2Id = id;
      //   }
      //   else{
      //     console.error("O produto já está selecionado");
      //   }
      //   console.log("Prod2Id é " + this.prod2Id);
      // }
      // console.log("Selecionado: " + this.selectedProductId);
    },
  },
  // A fazer antes de montar o componente
  async beforeMount() {
    // localStorage.setItem('compareOpen', null);
     localStorage.setItem("compareItem1Id", null);
     localStorage.setItem("compareItem2Id", null);

     if(localStorage.getItem('compareItem1Id') === "null" || localStorage.getItem('compareItem2Id') === "null") {
      // console.log("O banner está fechado")  
      localStorage.setItem("compareBannerState", "closed");
     }

    // Carregar os dados do produto da BD
    // this.allProducts =   fetchAllProducts().data;
    // const searchTerm = "Recycled";
    // const allProductsData = await fetchAllProducts(searchTerm);
    const page = parseInt(this.$route.query.page) || 1;
    const pageSize = parseInt(this.$route.query.pageSize) || 24;
    const categoryId = parseInt(this.$route.query.categoryId) || undefined;
    // console.log("categoria escolhida: "+category)
    // console.log("Página do route: " + page)
    // const allProductsData = await fetchAllProducts();
    // const allProductsData = await fetchAllProducts(page, pageSize, category);
    const allProductsData = await fetchAllProducts(page, pageSize, undefined, categoryId);
    const allProducts = allProductsData.data.items;
    const allCategoriesData =  await fetchAllCategories();
    const allCategories = allCategoriesData.data.items;
    // console.log("Este é o log: " + JSON.stringify(allCategories));
    // console.log("Quantidade de cats: " + allCategories.length);
    //  console.log("Quantidade de cats: " + allCategories.type);
    this.allProducts = allProducts;
    this.allProductsData = allProductsData;
    this.allCategories = allCategories;
   

    // for (let i = 0; i < allProducts.length; i++) {
    //   const productId = allProducts[i].id;
    //   const productData = await fetchProduct(productId);
    //   const product = productData.data;

    //   console.log(`Produto ${productId}: `, product);
      
    // }

  //  console.log("Este é o log: " + allProductsData.data.pageSize);
    // this.productSpec = await (await fetchProduct(1)).data;


    // Dá o preço mais alto mas pode ser pesado para o programa - TODO rever
    // const maxPriceProduct = this.allProducts.reduce((prevProduct, currentProduct) => {
    //   return prevProduct.maxPrice > currentProduct.maxPrice ? prevProduct : currentProduct;
    // });
    const maxPriceProduct = this.allProducts.length > 0 ? this.allProducts.reduce((prevProduct, currentProduct) => {
      return prevProduct.maxPrice > currentProduct.maxPrice ? prevProduct : currentProduct;
    }) : null;

    this.mostExpensiveProduct = maxPriceProduct;
  },
  components: { ProductCard, Pagination, CustomViews, CompareBanner, CategoryFilter, PriceFilter, SupplierFilter, RatingFilter },
});
</script>