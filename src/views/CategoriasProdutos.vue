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
        <div>
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText
              v-model="productSpecSearchQuery"
              @update:model-value="changeSearchQuery"
              placeholder="Search"
            />
          </span>
        </div>

        <div id="category-filter">
          <h5 class="grey-txt">Categorias</h5>
          <Tree
            scroll-height="600px"
            :value="categoriesTreeNodes"
            @node-expand="expandCategory"
            :loading="loadingCategories"
            selection-mode="single"
            @node-select="nodeSelect"
          >
            <template #default="slotProps">
              <b-form-checkbox
                :checked="selectedCategoryTreeNode?.key === slotProps.node.key"
                :disabled="selectedCategoryTreeNode?.key === slotProps.node.key"
              />
              {{ slotProps.node.label }}
            </template>
          </Tree>
        </div>

        <div id="price-filter">
          <div v-if="productSpecs">
            <h5 class="grey-txt mt-3">Preço</h5>
            <Slider
              v-model="priceFilter"
              @slideend="changePriceFilter"
              range
              :min="productsPricing.min"
              :max="productsPricing.max"
            />
            <span>{{ priceFilter[0] }}€</span>~<span
              >{{ priceFilter[1] }}€</span
            >
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
        <span v-if="!selectedCategoryTreeNode"
          >Nenhuma categoria selecionada</span
        >
        <span v-else>{{ selectedCategoryTreeNode.label }}</span>
      </h3>
      <!-- Diferentes vistas da página -->
      <!-- <CustomViews :items="allProductsData.data.totalItems" :amount="allProductsData.data.pageSize"></CustomViews> -->

      <div v-if="productSpecs">
        <!-- <CustomViews :product-specs="productSpecs" /> -->

        <div v-if="productSpecs.totalItems === 0" class="parent">
          <p>Não foram encontrados produtos para a categoria especificada</p>
        </div>

        <div v-else id="page-products">
          <p v-if="!loadingProductSpecs">
            {{ productSpecs.totalItems }} produtos
          </p>

          <!-- <div v-for="(linha, indice) in Math.ceil(allProductsData.data.pageSize / 4)" :key="indice"> -->
          <div class="grid m-3">
            <template v-if="loadingProductSpecs">
              <ProgressSpinner
                style="width: 50px; height: 50px"
                stroke-width="8"
                fill="var(--surface-ground)"
                animation-duration=".5s"
                aria-label="Loading Product specifications"
              />
            </template>
            <template v-else>
              <ProductCard
                v-for="product in productSpecs.items"
                :key="product.id"
                :product-spec="product"
                :can-compare="canCompareMoreProducts"
                @compare="addProductToCompare"
                class="col-12 md:col-6 lg:col-3 xl:col-2"
              />
            </template>
          </div>
        </div>
        <div
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
          "
        >
          <Paginator
            :template="{
              '640px': 'PrevPageLink CurrentPageReport NextPageLink',
              '960px':
                'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
              '1300px':
                'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
              default:
                'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageDropdown JumpToPageInput',
            }"
            :rows="productSpecs.pageSize"
            :total-records="productSpecs.totalItems"
            @page="productSpecPageChange"
          >
          </Paginator>

          <p>Total de páginas: {{ productSpecs.totalPages }}</p>
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
import { Category, ProductSpec, ProductSpecs } from '@/types';
import { fetchAllCategories, fetchAllProducts } from '@/api';
import { computed, onBeforeMount, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Tree, { TreeNode } from 'primevue/tree';
import Slider from 'primevue/slider';
import { debounce } from 'lodash';
import ProductCard from '@/components/ProductCard.vue';
import InputText from 'primevue/inputtext';
import ProgressSpinner from 'primevue/progressspinner';
import Paginator, { PageState } from 'primevue/paginator';

const checkboxTest = ref();
watch(checkboxTest, (val) => {
  console.log(val);
});

const route = useRoute();
const router = useRouter();

onBeforeMount(async () => {
  // Query strings for pagination and searching
  // const categoryId = Number(route.query.categoryId) || undefined;

  // Set loadings
  // Load "every" product so we know the min and max price of the whole dataset
  let overallProducts = {} as ProductSpecs;

  // Load products first because categories depends on it
  [, overallProducts] = await Promise.all([
    loadProducts().then((prods) => {
      // Set default price filter
      priceFilter.value = [prods.minPrice, prods.maxPrice];
      return prods;
    }),
    fetchAllProducts({
      page: 1,
      pageSize: 1,
    }).then((r) => r.data),
  ]);

  // Set min and max price of the whole dataset
  productsPricing.value = {
    min: overallProducts.minPrice,
    max: overallProducts.maxPrice,
  };

  // Categories
  await loadCategories();
});

/**
 * ------------------------------------------------------------------------
 * Categories
 * Improvements: lazy load on scroll to load remaining
 */
interface CategoryTreeNode extends TreeNode {
  parent?: CategoryTreeNode;
}
const loadingCategories = ref(true);
const selectedCategoryTreeNode = ref<CategoryTreeNode | null>(null);
const categoriesTreeNodes = ref<CategoryTreeNode[]>([]);

const loadCategories = async () => {
  const categoriesPromise = fetchCategories();

  const tempCategoriesTree: CategoryTreeNode[] = [];
  if (selectedCategoryTreeNode.value) {
    // TODO: see comment below
    /**
     * This does not completely work:
     * because we pre-set some categories, and since they will be expanded,
     * there will be no children fetching of those categories - they will be incomplete
     *
     * Because of this, I decided to fetch the children of each category in the tree (that is a parent of the selected one)
     */

    // Create a queue of all the parents of the selected category
    // [current, ...parents, rootParent]
    let currentNodeRef: CategoryTreeNode = {
      ...selectedCategoryTreeNode.value,
    };
    const queue: CategoryTreeNode[] = [];
    while (currentNodeRef.parent) {
      queue.push(currentNodeRef.parent);
      currentNodeRef = currentNodeRef.parent;
    }

    // Add the parents to the tree
    if (queue.length) {
      // TODO perf: don't fetch if already fetched
      const queueCategoriesData = await Promise.all(
        queue.map((category, idx) =>
          fetchCategories({
            parentId: Number(category.key),
            loadings: false,
          }).then((r) =>
            r.items.filter(
              (c) => idx === 0 || c.id !== Number(queue[idx - 1].key)
            )
          )
        )
      );

      // Add the root parent
      tempCategoriesTree.push(queue[queue.length - 1]);
      let treeNodeRef = tempCategoriesTree[0];
      // From the last (root) to the second (parent of selected)
      for (let i = queueCategoriesData.length - 2; i >= 0; i--) {
        const currentNode = queue[i];
        const parentNodeData = queueCategoriesData[i + 1].map((c) =>
          mapCategoryToTreeNode(c, treeNodeRef)
        );

        // Fetch the children of the parent except the current node, but add it from memory
        treeNodeRef.children = [currentNode, ...parentNodeData];

        treeNodeRef = currentNode;
      }
    }
  }

  let categories = (await categoriesPromise).items.map((c) =>
    mapCategoryToTreeNode(c)
  );
  if (tempCategoriesTree.length) {
    // != is on purpose
    categories = categories.filter((c) => c.id != tempCategoriesTree[0].key);
  }

  categoriesTreeNodes.value = [...tempCategoriesTree, ...categories];
};

const fetchCategories = async ({
  parentId,
  loadings,
}: { parentId?: number; loadings?: boolean } = {}) => {
  const [minPrice, maxPrice] = priceFilter.value;

  if (loadings === undefined) loadings = true;
  if (loadings) loadingCategories.value = true;

  const categories = (
    await fetchAllCategories({
      pageSize: 100,
      productMinPrice: minPrice,
      productMaxPrice: maxPrice,
      productSearch: productSpecSearchQuery.value || undefined,
      parentId: parentId,
    })
  ).data;

  if (loadings) loadingCategories.value = false;
  return categories;
};

const mapCategoryToTreeNode = (
  category: Category,
  parent?: CategoryTreeNode
): CategoryTreeNode => ({
  key: category.id.toString(),
  label: category.name,
  leaf: false,
  parent,
});

const expandCategory = async (node: CategoryTreeNode) => {
  if (!node.children) {
    loadingCategories.value = true;

    // Fetch category
    const categories = await fetchCategories({ parentId: Number(node.key) });

    // TODO pagination/lazyloading
    node.children = categories.items.map((category) =>
      mapCategoryToTreeNode(category, node)
    );

    loadingCategories.value = false;
  }
};

const nodeSelect = async (node: CategoryTreeNode) => {
  selectedCategoryTreeNode.value = node;
  await loadProducts();
};

/**
 * ------------------------------------------------------------------------
 * Product Specs
 */
const productSpecs = ref<ProductSpecs>();
const loadingProductSpecs = ref(true);
const productsPricing = ref<{ min: number; max: number }>({ min: 0, max: 0 });
const productSpecSearchQuery = ref(route.query.search?.toString() || '');

const loadProducts = async ({
  page: _page,
  pageSize: _pageSize,
}: { page?: number; pageSize?: number } = {}) => {
  const page = _page || Number(route.query.page) || 1;
  const pageSize = _pageSize || Number(route.query.pageSize) || 24;

  const category =
    Number(selectedCategoryTreeNode.value?.key) ||
    Number(route.query.categoryId) ||
    undefined;

  const [minPrice, maxPrice] = priceFilter.value;

  loadingProductSpecs.value = true;

  const res = (
    await fetchAllProducts({
      page,
      pageSize,
      categoryId: category,
      minPrice: minPrice === -1 ? undefined : minPrice,
      maxPrice: maxPrice === -1 ? undefined : maxPrice,
      search: productSpecSearchQuery.value || undefined,
    })
  ).data;

  loadingProductSpecs.value = false;
  productSpecs.value = res;
  return res;
};

// Debounce price filter to make less requests
const changePriceFilter = debounce(async () => {
  await Promise.all([loadCategories(), loadProducts()]);
}, 1500);

// Debounce search query to make less requests
const changeSearchQuery = debounce(async () => {
  await Promise.all([loadCategories(), loadProducts()]);
}, 1500);

const productSpecPageChange = async (page: PageState) => {
  await loadProducts({ page: page.page + 1, pageSize: page.rows });

  // page is 0-indexed
  router.push({
    query: {
      ...route.query,
      page: page.page + 1,
      pageSize: page.rows,
    },
  });
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
const routeMinPrice = Number(route.query.minPrice) || -1;
const routeMaxPrice = Number(route.query.maxPrice) || -1;
const priceFilter = ref<[number, number]>([routeMinPrice, routeMaxPrice]);
</script>
