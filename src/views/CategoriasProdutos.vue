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
          <CategoryFilter></CategoryFilter>
        </div>

        <div id="price-filter">
          <h5 class="grey-txt mt-3">Preço</h5>
          <PriceFilter></PriceFilter>
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
    <div class="" style="width: 100%">
      <!-- TODO trocar para a categoria escolhida -->
      <h3 class="parent dgreen-txt">Portáteis</h3>
      <!-- Diferentes vistas da página -->
      <CustomViews></CustomViews>
      
      <!-- TODO por isto automático -->
     <div id="page-products">
        <div v-for="(linha, indice) in 6" :key="indice">
          <div class="parent d-flex justify-content-center mt-5" style="gap:12vh;">
            <template v-for="product in allProducts.slice(indice * 4, indice * 4 + 4)">
              <ProductCard :productTitle="product.name" 
                           :productDescription="product.description"
                           :productImage="product.images[0]"/>
            </template>
          </div>
        </div>
      </div>
      <!-- <p>A mostrar {{ allProductsData.data.pageSize }} de {{ allProductsData.data.totalItems }} produtos</p>
      <p>Página: {{ allProductsData.data.page }} de {{ allProductsData.data.totalPages }}</p> -->
      <Pagination :totalRows="allProductsData.data.totalItems" :perPage="allProductsData.data.pageSize" :currentPage="allProductsData.data.page"></Pagination>
    </div>
  </div>
  
  <!-- TODO fazer o banner desaparecer e aparecer quando é suposto -->
  <!-- Banner da comparação que aparece quando se clica em comparar um produto -->
  <CompareBanner></CompareBanner>
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

  /////////////////////////////////////////////////////////////////////////////////////

  // Código escrito pelo Lucas que provavelmente vai ser removido depois

  // import { defineComponent } from "vue";

  // import { onMounted, ref, watch } from "vue";
  // import { fetchAllProducts } from "@/api";
  // import { Product } from "@/types/interfaces";

  // const products = ref<Product[]>([]);

  // const fetchProducts = async (search?: string) => {
  //   products.value = await fetchAllProducts(search).then((ps) => ps.data);
  // };

  // onMounted(fetchProducts);

  // const search = ref("");
  // watch(search, fetchProducts);
  
  /////////////////////////////////////////////////////////////////////////////////////
</script>

<!-- TODO atualizar tipagens -->
<script lang="ts">
// Componentes
// import ProductCard from "@/components/ProductCard.vue";

// API
import { fetchProduct, fetchAllProducts } from "@/api";
import { Product } from "@/types";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      // Dados da BD
      allProducts : {} as Product[],
      productSpec: {} as Product,
      allProductsData: {} as any,
    };
  },
  // A fazer antes de montar o componente
  async beforeMount() {
    // Carregar os dados do produto da BD
    // this.allProducts =   fetchAllProducts().data;
    const allProductsData = await fetchAllProducts();
    const allProducts = allProductsData.data.items;

    this.allProducts = allProducts;
    this.allProductsData = allProductsData;

    // for (let i = 0; i < allProducts.length; i++) {
    //   const productId = allProducts[i].id;
    //   const productData = await fetchProduct(productId);
    //   const product = productData.data;

    //   console.log(`Produto ${productId}: `, product);
      
    // }

  //  console.log("Este é o log: " + allProductsData.data.page);
    this.productSpec = await (await fetchProduct(1)).data;
  },
  components: { ProductCard }
});
</script>