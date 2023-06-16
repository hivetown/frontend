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
          <Tree
            :value="categoriesTreeNodes"
            @node-expand="expandCategory"
            :loading="loadingCategories"
            selection-mode="checkbox"
          ></Tree>
        </div>

        <div id="price-filter">
          <div v-if="productSpecs">
            <h5 class="grey-txt mt-3">Preço</h5>
            <span>{{ priceFilter[0] }}€</span>
            <Slider
              v-model="priceFilter"
              range
              :min="productSpecs.minPrice"
              :max="productSpecs.maxPrice"
            />
            <span>{{ priceFilter[1] }}€</span>
          </div>
          <div v-else>
            <!-- TODO skeleton -->
          </div>
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
      <h3 class="parent dgreen-txt">
        <span v-if="!selectedCategory">Nenhuma categoria selecionada</span>
        <span v-else>{{ selectedCategory.name }}</span>
      </h3>
      <!-- Diferentes vistas da página -->
      <!-- <CustomViews :items="allProductsData.data.totalItems" :amount="allProductsData.data.pageSize"></CustomViews> -->

      <div v-if="productSpecs">
        <!-- <CustomViews :product-specs="productSpecs" /> -->

        <div v-if="productSpecs.totalItems === 0" class="parent">
          <p>Não foram encontrados produtos para a categoria especificada</p>
        </div>

        <div v-else id="page-products">
          <!-- <div v-for="(linha, indice) in Math.ceil(allProductsData.data.pageSize / 4)" :key="indice"> -->
          <div class="parent d-flex justify-content-center mt-5">
            <!-- <ProductCard
              v-for="product in productSpecs.items"
              :key="product.id"
              :product-spec="product"
              :can-compare="canCompareMoreProducts"
              @compare="addProductToCompare"
            /> -->
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
          <!-- <Pagination
            v-if="allProducts"
            :total-rows="allProducts.totalItems"
            :per-page="allProducts.pageSize"
            :current-page="allProducts.page"
          >
          </Pagination> -->

          <!-- <p>Total de páginas: {{ allProductsData.data.totalPages }}</p> -->
        </div>
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
import { BaseItems, Category, ProductSpec, ProductSpecs } from '@/types';
import { fetchAllCategories, fetchAllProducts, fetchCategory } from '@/api';
import { computed, onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import Tree, { TreeNode } from 'primevue/tree';
import Slider from 'primevue/slider';

const route = useRoute();

onBeforeMount(async () => {
  // Query strings for pagination and searching
  const categoryId = Number(route.query.categoryId) || undefined;
  const minPrice = Number(route.query.minPrice) || undefined;
  const maxPrice = Number(route.query.maxPrice) || undefined;
  const search = route.query.search?.toString() || undefined;

  // Set loadings
  loadingCategories.value = true;

  try {
    [productSpecs.value, categories.value, selectedCategory.value] =
      await Promise.all([
        loadProducts().then((prods) => {
          // Set default price filter
          priceFilter.value = [prods.minPrice, prods.maxPrice];
          return prods;
        }),
        fetchAllCategories({
          productMinPrice: minPrice,
          productMaxPrice: maxPrice,
          productSearch: search,
        })
          .then((r) => r.data)
          .finally(() => {
            // Set as loaded
            loadingCategories.value = false;
          }),
        categoryId ? getCategory(categoryId) : null,
      ]);
  } finally {
    // Force set as loaded
    loadingCategories.value = false;
  }
});

/**
 * ------------------------------------------------------------------------
 * Categories
 */
const categories = ref<BaseItems<Category>>();
const loadingCategories = ref(false);
const selectedCategory = ref<Category | null>(null);
const getCategory = async (id: number) => {
  return (
    categories.value?.items.find((c) => c.id === id) ||
    fetchCategory(id).then((r) => r.data)
  );
};

/**
 * The tree nodes for the categories
 */
// Map categories to tree nodes
const categoriesTreeNodes = computed(() => {
  if (!categories.value?.items) return [] as TreeNode[];

  return categories.value.items.map((c) => ({
    key: c.id.toString(),
    label: c.name,
    leaf: false,
  })) as TreeNode[];
});

const expandCategory = (a: TreeNode) => {
  console.log(a);
};

/**
 * ------------------------------------------------------------------------
 * Product Specs
 */
const productSpecs = ref<ProductSpecs>();

const loadProducts = async () => {
  // TODO replace this
  const page = Number(route.query.page) || 1;
  const pageSize = Number(route.query.pageSize) || 24;
  const categoryId = Number(route.query.categoryId) || undefined;
  const search = route.query.search?.toString() || undefined;

  const [minPrice, maxPrice] = priceFilter.value;
  return (
    await fetchAllProducts({
      page,
      pageSize,
      categoryId,
      minPrice: minPrice === -1 ? undefined : minPrice,
      maxPrice: maxPrice === -1 ? undefined : maxPrice,
      search,
    })
  ).data;
};

/**
 * ---------------------------
 * Compare product specs
 */
const productsToCompare = ref<ProductSpec[]>([]);
const canCompareMoreProducts = computed(
  // compare up to 2 products
  () => productsToCompare.value.length < 2
);
const isCompareBannerVisible = computed(
  () => productsToCompare.value.length > 0
);

const addProductToCompare = (product: ProductSpec) => {
  if (canCompareMoreProducts.value) productsToCompare.value.push(product);
};

const removeProductFromCompare = (product: ProductSpec) => {
  const index = productsToCompare.value.indexOf(product);
  if (index > -1) productsToCompare.value.splice(index, 1);
};

const removeAllProductsFromCompare = () => {
  productsToCompare.value = [];
};

/**
 * Filters ---------------------------------------------------------------
 */
const minPrice = Number(route.query.minPrice) || -1;
const maxPrice = Number(route.query.maxPrice) || -1;
const priceFilter = ref<[number, number]>([minPrice, maxPrice]);
</script>

<style scoped>
.p-tree-container,
.p-tree {
  max-height: 360px;
  overflow: scroll;
}
</style>
