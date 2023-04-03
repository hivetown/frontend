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
          <!-- Envia todas independemente se é pai ou não -->
          <CategoryFilter :categories="allCategories.slice(0, 10)"></CategoryFilter>
           <!-- <CategoryFilter :categories="allCategories"></CategoryFilter> -->
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
    <div class="" style="width: 100%; background-color:;">
      <!-- TODO trocar para a categoria escolhida -->
      <h3 class="parent dgreen-txt">Portáteis</h3>
      <!-- Diferentes vistas da página -->
      <CustomViews :items="allProductsData.data.totalItems" :amount="allProductsData.data.pageSize"></CustomViews>
      
      <!-- TODO por isto automático -->
     <div id="page-products">
        <div v-for="(linha, indice) in Math.ceil(allProductsData.data.pageSize / 4)" :key="indice">
          <div class="parent d-flex justify-content-center mt-5" style="gap:12vh;">
            <template v-for="product in allProducts.slice(indice * 4, indice * 4 + 4)">
              <ProductCard :productTitle="product.name" 
                           :productDescription="product.description"
                           :productImage="product.images[0]"
                           :productPrice="[product.minPrice, product.maxPrice]"/>
            </template>
          </div>
        </div>
      </div>
      <!-- <p>A mostrar {{ allProductsData.data.pageSize }} de {{ allProductsData.data.totalItems }} produtos</p>
      <p>Página: {{ allProductsData.data.page }} de {{ allProductsData.data.totalPages }}</p> -->
      <Pagination :totalRows="allProductsData.data.totalItems" :perPage="allProductsData.data.pageSize" :currentPage="allProductsData.data.page"></Pagination>
      <p>Total de páginas: {{ allProductsData.data.totalPages }}</p>
    </div>
  </div>
  
  <!-- TODO fazer o banner desaparecer e aparecer quando é suposto -->
  <!-- Banner da comparação que aparece quando se clica em comparar um produto -->
  <!-- <CompareBanner></CompareBanner> -->
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
import { fetchProduct, fetchAllProducts, fetchAllCategories} from "@/api";
import { Product, Category } from "@/types";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      // Dados da BD
      // Produtos
      allProducts : {} as Product[],
      productSpec: {} as Product,
      allProductsData: {} as any,
      // Filtros
      allCategories: {} as Category[],
      // APAGAR
      // categories: [
      //   {
      //     name: "Categoria 1",
      //     subCategories: [
      //       { name: "Subcategoria 1", link: "/subcategoria1" },
      //       { name: "Subcategoria 2", link: "/subcategoria2" },
      //     ],
      //     showSubCategories: false
      //   },
      //   {
      //     name: "Categoria 2",
      //     subCategories: [
      //       { name: "Subcategoria 3", link: "/subcategoria3" },
      //       { name: "Subcategoria 4", link: "/subcategoria4" },
      //     ],
      //     showSubCategories: false
      //   },
      //   {
      //     name: "Categoria 3",
      //     subCategories: [
      //       { name: "Subcategoria 5", link: "/subcategoria5" },
      //       { name: "Subcategoria 6", link: "/subcategoria6" },
      //     ],
      //     showSubCategories: false
      //   }]
    };
  },
  // A fazer antes de montar o componente
  async beforeMount() {
    // Carregar os dados do produto da BD
    // this.allProducts =   fetchAllProducts().data;
    // const searchTerm = "Recycled";
    // const allProductsData = await fetchAllProducts(searchTerm);
    const page = parseInt(this.$route.query.page) || 1;
    const pageSize = parseInt(this.$route.query.pageSize) || 24;
    // console.log("Página do route: " + page)
    // const allProductsData = await fetchAllProducts();
    const allProductsData = await fetchAllProducts(page, pageSize);
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
  },
  components: { ProductCard, Pagination, CustomViews}
});
</script>