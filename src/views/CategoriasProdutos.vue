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
        <div class="parent d-flex justify-content-center mt-5" style="gap:14vh;">
          <ProductCard :productTitle="productSpec.name" 
                       :productDescription="productSpec.description"
                        productImage="mac.png"/>
          <ProductCard :productTitle="productSpec.name" 
                       :productDescription="productSpec.description"
                        productImage="mac.png"/>
          <ProductCard :productTitle="productSpec.name" 
                       :productDescription="productSpec.description"
                        productImage="mac.png"/>
          <ProductCard :productTitle="productSpec.name" 
                       :productDescription="productSpec.description"
                        productImage="mac.png"/>
        </div>

        <div class="parent d-flex justify-content-center mt-5" style="gap:14vh;">
          <ProductCard :productTitle="productSpec.name" 
                       :productDescription="productSpec.description"
                        productImage="mac.png"/>
          <ProductCard :productTitle="productSpec.name" 
                       :productDescription="productSpec.description"
                        productImage="mac.png"/>
          <ProductCard :productTitle="productSpec.name" 
                       :productDescription="productSpec.description"
                        productImage="mac.png"/>
          <ProductCard :productTitle="productSpec.name" 
                       :productDescription="productSpec.description"
                        productImage="mac.png"/>
        </div>
      </div>

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

<script lang="ts">
// Componentes
// import ProductCard from "@/components/ProductCard.vue";

// API
import { fetchProduct } from "@/api";
import { Product } from "@/types";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      // Dados da BD
      productSpec: {} as Product,
    };
  },
  // A fazer antes de montar o componente
  async beforeMount() {
    // Carregar os dados do produto da BD
    this.productSpec = await (await fetchProduct(1)).data.productSpec;
  },
  components: { ProductCard }
});
</script>