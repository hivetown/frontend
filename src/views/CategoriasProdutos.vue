<template>
  <!-- Caminho seguido até esta página -->
  <div class="parent mb-4">
    <!-- TODO por isto automático -->
    <b-breadcrumb>
      <b-breadcrumb-item href="#home"
        ><i class="bi bi-house-fill"></i>Home</b-breadcrumb-item
      >
      <b-breadcrumb-item href="#foo">Foo</b-breadcrumb-item>
      <b-breadcrumb-item href="#bar">Bar</b-breadcrumb-item>
      <b-breadcrumb-item active>Baz</b-breadcrumb-item>
    </b-breadcrumb>
  </div>

  <!-- Conteúdo da página -->
  <div class="d-flex parent">
    <!-- Barra lateral com os filtros -->
    <div class="lat-bar" style="width: 20%">
      <div id="filters">
        <div id="category-filter">
          <h5 class="grey-txt">Categorias</h5>
          <CategoryFilter :categories="allCategories"></CategoryFilter>
        </div>

        <div id="price-filter">
          <h5 class="grey-txt mt-3">Preço</h5>
          <PriceFilter
            v-if="mostExpensiveProduct"
            :max-price="mostExpensiveProduct"
          ></PriceFilter>
        </div>

        <div id="supplier-filter">
          <h5 class="grey-txt mt-3">Fornecedor</h5>
          <SupplierFilter></SupplierFilter>
        </div>

        <div
          id="reting-filter"
          class="mt-4"
          style="border-top: 1px solid #f3f3f3"
        >
          <h5 class="grey-txt mt-3">Avaliação</h5>
          <RatingFilter></RatingFilter>
        </div>
      </div>
    </div>

    <!-- Espeaço à direita -->
    <div class="" style="width: 100%; background-color: ">
      <!-- TODO trocar para a categoria escolhida -->
      <h3 class="parent dgreen-txt">{{ currentCategory }}</h3>
      <!-- Diferentes vistas da página -->
      <!-- <CustomViews :items="allProductsData.data.totalItems" :amount="allProductsData.data.pageSize"></CustomViews> -->
      <CustomViews
        v-if="allProducts && allProducts.pageSize"
        :items="allProducts.totalItems"
        :amount="allProducts.pageSize"
      />

      <div v-if="allProducts?.totalItems === 0" class="parent">
        <p>Não foram encontrados produtos para a categoria especificada</p>
      </div>

      <div v-else id="page-products">
        <!-- <div v-for="(linha, indice) in Math.ceil(allProductsData.data.pageSize / 4)" :key="indice"> -->
        <div
          v-for="(linha, indice) in Math.ceil((allProducts?.pageSize ?? 0) / 4)"
          :key="indice"
        >
          <div
            class="parent d-flex justify-content-center mt-5"
            style="gap: 12vh"
          >
            <template
              v-for="product in allProducts.items.slice(
                indice * 4,
                indice * 4 + 4
              )"
              :key="product.id"
            >
              <!-- {{ product}} -->
              <ProductCard
                :product-spec="product"
                :can-compare="canCompareMoreProducts"
                @compare="addProductToCompare"
              />
            </template>
          </div>
        </div>
      </div>
      <div
        class=""
        style="
          display: flex;
          flex-direction: row-reverse;
          justify-content: center;
        "
      >
        <Pagination
          v-if="allProducts"
          :total-rows="allProducts.totalItems"
          :per-page="allProducts.pageSize"
          :current-page="allProducts.page"
        >
        </Pagination>

        <!-- <p>Total de páginas: {{ allProductsData.data.totalPages }}</p> -->
      </div>
    </div>
  </div>
  <!-- Banner da comparação que aparece quando se clica em comparar um produto -->
  <CompareBanner
    v-if="isCompareBannerVisible"
    :products="productsToCompare"
    @remove-item="removeProductFromCompare"
    @remove-all-items="removeAllProductsFromCompare"
  ></CompareBanner>
</template>

<script setup lang="ts">
// Filtros
import CategoryFilter from '@/components/CategoryFilter.vue';
import PriceFilter from '@/components/PriceFilter.vue';
import SupplierFilter from '@/components/SupplierFilter.vue';
import RatingFilter from '@/components/RatingFilter.vue';
import Pagination from '@/components/Pagination.vue';

// Componentes auxiliares
import CustomViews from '@/components/CustomViews.vue';
import ProductCard from '@/components/ProductCard.vue';
import CompareBanner from '@/components/CompareBanner.vue';
</script>

<!-- TODO atualizar tipagens -->
<script lang="ts">
// API
import { fetchAllProducts, fetchCategory, fetchAllCategories } from '@/api';
import { ProductSpec, Category, BaseItems } from '@/types';
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      // Dados da BD
      // Produtos
      allProducts: {} as BaseItems<ProductSpec>,
      productSpec: {} as ProductSpec,
      //   allProductsData: {} as any,
      // Filtros
      allCategories: [] as Category[],
      currentCategory: '' as string,
      mostExpensiveProduct: null as ProductSpec | null,
      productsToCompare: [] as ProductSpec[],
    };
  },
  methods: {
    addProductToCompare(productSpec: ProductSpec) {
      if (!this.productsToCompare.find((spec) => spec.id === productSpec.id))
        this.productsToCompare.push(productSpec);
    },
    removeProductFromCompare(productSpec: ProductSpec) {
      const index = this.productsToCompare.findIndex(
        (spec) => spec.id === productSpec.id
      );
      this.productsToCompare.splice(index, 1);
      console.log(index);
    },
    removeAllProductsFromCompare() {
      this.productsToCompare = [];
    },
  },
  computed: {
    isCompareBannerVisible() {
      return this.productsToCompare.length > 0;
    },
    canCompareMoreProducts() {
      return this.productsToCompare.length < 2;
    },
  },
  // A fazer antes de montar o componente
  async beforeMount() {
    // Carregar os dados do produto da BD
    const page = parseInt(String(this.$route.query.page)) || 1;
    const pageSize = parseInt(String(this.$route.query.pageSize)) || 24;
    const categoryId =
      parseInt(String(this.$route.query.categoryId)) || undefined;
    const allProducts = await fetchAllProducts(
      page,
      pageSize,
      undefined,
      categoryId
    );
    this.allProducts = allProducts.data;
    // const allProducts = allProductsData.data.items;
    const allCategoriesData = await fetchAllCategories();
    const allCategories = allCategoriesData.data.items;
    // this.allProducts = allProducts;
    // this.allProductsData = allProductsData;
    this.allCategories = allCategories;

    // Carregar a categoria atualmente selecionada
    if (this.$route.query.categoryId) {
      const currentCategory = await fetchCategory(
        Number(this.$route.query.categoryId)
      );
      this.currentCategory = currentCategory.data.name;
    } else {
      // Se não houver uma
      this.currentCategory = 'Todas as categorias';
    }
    // console.log(this.allCategories);

    // Dá o preço mais alto mas pode ser pesado para o programa - TODO rever
    const maxPriceProduct =
      //   this.allProducts.items.length > 0
      this.allProducts.totalItems > 0
        ? this.allProducts.items.reduce((prevProduct, currentProduct) => {
            return prevProduct.maxPrice > currentProduct.maxPrice
              ? prevProduct
              : currentProduct;
          })
        : null;

    this.mostExpensiveProduct = maxPriceProduct;
  },
  components: {
    ProductCard,
    Pagination,
    CustomViews,
    CompareBanner,
    CategoryFilter,
    PriceFilter,
    SupplierFilter,
    RatingFilter,
  },
});
</script>
