<template>
  <!-- Caminho seguido até esta página -->
  <!-- TODO por isto automático -->
  <PathComponent :path-list="path"></PathComponent>

  <!-- Conteúdo da página -->
  <div class="d-flex parent">
    <!-- Barra lateral com os filtros -->
    <div class="lat-bar mobile-off-lat-bar" style="width: 20%">
      <div id="filters">
        <div>
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText
              style="border-radius: 3em !important"
              :class="{ 'p-invalid': productSearchQueryError }"
              v-model="productSpecSearchQuery"
              @update:model-value="changeSearchQuery"
              placeholder="Search"
            />
          </span>

          <small class="p-error" v-if="productSearchQueryError">{{
            productSearchQueryError
          }}</small>
        </div>

        <div id="category-filter" class="mt-4">
          <h5 class="grey-txt">Categorias</h5>
          <div v-if="!categoriesTreeNodes.length">
            Sem categorias disponíveis
          </div>
          <div v-else>
            <Tree
              class="cats-container"
              scroll-height="600px"
              :value="categoriesTreeNodes"
              @node-expand="expandCategory"
              :loading="loadingCategories"
              selection-mode="single"
              @node-select="nodeSelect"
            >
              <template #default="slotProps">
                <div class="d-flex">
                  <b-form-checkbox
                    :checked="
                      selectedCategoryTreeNode?.key === slotProps.node.key
                    "
                    :disabled="
                      selectedCategoryTreeNode?.key === slotProps.node.key
                    "
                  />
                  {{ slotProps.node.label }}
                </div>
              </template>
            </Tree>
          </div>
        </div>

        <div id="price-filter">
          <h5 class="grey-txt mt-3">Preço</h5>
          <div
            v-if="
              !productSpecs || !productSpecs.maxPrice || !productSpecs.minPrice
            "
          >
            Sem preços disponíveis
          </div>
          <div v-else>
            <Slider
              class="price-slider"
              v-model="priceFilter"
              @slideend="changePriceFilter"
              range
              :min="productsPricing.min"
              :max="productsPricing.max"
              :pt="{
                root: { style: 'width:60%;' },
                range: { style: 'background-color: #ddd' },
              }"
            />
            <span>{{ priceFilter[0] }}€</span>~<span
              >{{ priceFilter[1] }}€</span
            >
          </div>
        </div>

        <div id="supplier-filter">
          <h5 class="grey-txt mt-3">Fornecedor</h5>
          <SupplierFilter></SupplierFilter>
        </div>

        <!-- <div
          id="reting-filter"
          class="mt-4"
          style="border-top: 1px solid #f3f3f3"
        >
          <h5 class="grey-txt mt-3">Avaliação</h5>
          <RatingFilter></RatingFilter>
        </div> -->
      </div>
    </div>

    <!-- Espeaço à direita -->
    <div class="right-content" style="width: 100%">
      <h3 class="parent dgreen-txt main-txt">
        <template v-if="!selectedCategoryTreeNode">Todos os produtos</template>
        <template v-else>{{ selectedCategoryTreeNode.label }}</template>
      </h3>
      <!-- Diferentes vistas da página -->
      <CustomViews
        v-if="productSpecs && currentFilters.pageSize"
        :items="productSpecs.totalItems"
        :amount="currentFilters.pageSize"
        :prevent-redirect="true"
        @update:page-size="
          (pageSize) => productSpecPageChange({ rows: pageSize })
        "
      />

      <div>
        <div v-if="productSpecs?.totalItems === 0" class="parent">
          <p>Não foram encontrados produtos para a categoria especificada</p>
        </div>

        <div v-else id="page-products">
          <div class="grid m-3">
            <Loader v-if="loadingProductSpecs || !productSpecs" />
            <template v-else>
              <ProductCard
                v-for="product in productSpecs.items"
                :key="product.id"
                :product-spec="product"
                :can-compare="canCompareMoreProducts"
                @compare="addProductToCompare"
                class="col-6 md:col-6 lg:col-3 xl:col-2"
              />
            </template>
          </div>
        </div>
        <Pagination
          v-if="productSpecs"
          :items="productSpecs"
          :page="currentFilters.page"
          :page-size="currentFilters.pageSize"
          @page-change="productSpecPageChange"
        ></Pagination>
      </div>
    </div>
  </div>

  <!-- Filtros no movo telemovel -->
  <div class="card mobile-on-lat-bar" style="display: none">
    <Accordion class="">
      <AccordionTab header="Filtros">
        <div id="filters">
          <div id="category-filter">
            <h5 class="grey-txt">Categorias</h5>
            <div v-if="!categoriesTreeNodes.length">
              Sem categorias disponíveis
            </div>
            <div v-else>
              <Tree
                class="cats-container"
                scroll-height="600px"
                :value="categoriesTreeNodes"
                @node-expand="expandCategory"
                :loading="loadingCategories"
                selection-mode="single"
                @node-select="nodeSelect"
              >
                <template #default="slotProps">
                  <div class="d-flex">
                    <b-form-checkbox
                      :checked="
                        selectedCategoryTreeNode?.key === slotProps.node.key
                      "
                      :disabled="
                        selectedCategoryTreeNode?.key === slotProps.node.key
                      "
                    />
                    {{ slotProps.node.label }}
                  </div>
                </template>
              </Tree>
            </div>
          </div>

          <div id="price-filter">
            <h5 class="grey-txt mt-3">Preço</h5>
            <div
              v-if="
                !productSpecs ||
                !productSpecs.maxPrice ||
                !productSpecs.minPrice
              "
            >
              Sem preços disponíveis
            </div>
            <div v-else>
              <Slider
                class="price-slider"
                v-model="priceFilter"
                @slideend="changePriceFilter"
                range
                :min="productsPricing.min"
                :max="productsPricing.max"
                :pt="{
                  root: { style: 'width:60%;' },
                  range: { style: 'background-color: #ddd' },
                }"
              />
              <span>{{ priceFilter[0] }}€</span>~<span
                >{{ priceFilter[1] }}€</span
              >
            </div>
          </div>

          <div id="supplier-filter">
            <h5 class="grey-txt mt-3">Fornecedor</h5>
            <SupplierFilter></SupplierFilter>
          </div>
        </div>
      </AccordionTab>
    </Accordion>
  </div>
  <div class="right-content-mobile-on">
    <CustomViews
      v-if="productSpecs && productSpecs.pageSize"
      :items="productSpecs.totalItems"
      :amount="productSpecs.pageSize"
      :prevent-redirect="true"
      @update:page-size="
        (pageSize) => productSpecPageChange({ rows: pageSize })
      "
    />
    <div>
      <div v-if="productSpecs?.totalItems === 0" class="parent">
        <p>Não foram encontrados produtos para a categoria especificada</p>
      </div>

      <div v-else id="page-products">
        <div class="grid m-3">
          <Loader v-if="loadingProductSpecs || !productSpecs" />
          <template v-else>
            <ProductCard
              v-for="product in productSpecs.items"
              :key="product.id"
              :product-spec="product"
              :can-compare="canCompareMoreProducts"
              @compare="addProductToCompare"
              class="col-6 md:col-6 lg:col-3 xl:col-2"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
  <!-- </div> -->

  <div v-if="productSpecs" class="pagination-mobile-on">
    <Pagination
      v-if="productSpecs"
      class="parent"
      :items="productSpecs"
      :page="currentFilters.page"
      :page-size="currentFilters.pageSize"
      @page-change="productSpecPageChange"
    ></Pagination>
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
import Loader from '@/components/Loader.vue';
import PathComponent from '@/components/PathComponent.vue';
import CustomViews from '@/components/CustomViews.vue';
import CompareBanner from '@/components/CompareBanner.vue';
import SupplierFilter from '@/components/SupplierFilter.vue';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Pagination from '@/components/Pagination.vue';
import { PageState } from 'primevue/paginator';

const route = useRoute();
const router = useRouter();

const path = [['Produtos', '/products']];

const currentFilters = ref({
  categoryId: Number(route.query.categoryId) || undefined,
  page: Number(route.query.page) || 1,
  pageSize: Number(route.query.pageSize) || 12,
  search: route.query.searchQuery || undefined,
  minPrice: Number(route.query.minPrice) || undefined,
  maxPrice: Number(route.query.maxPrice) || undefined,
});

watch(currentFilters.value, (newFilters) => {
  router.push({
    query: {
      ...newFilters,
    },
  });
});

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
  currentFilters.value.categoryId = Number(node.key);
  await productSpecPageChange({ page: 0 });
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
  await Promise.all([loadCategories(), productSpecPageChange({ page: 0 })]);

  currentFilters.value.minPrice = priceFilter.value[0];
  currentFilters.value.maxPrice = priceFilter.value[1];
}, 1500);

// Debounce search query to make less requests
const productSearchQueryError = ref<string | null>();
const changeSearchQuery = debounce(async () => {
  productSearchQueryError.value = null;
  if (
    productSpecSearchQuery.value !== '' &&
    productSpecSearchQuery.value.length < 3
  ) {
    productSearchQueryError.value = 'Mínimo 3 caracteres';
    return;
  }

  await Promise.all([loadCategories(), productSpecPageChange({ page: 0 })]);
  currentFilters.value.search = productSpecSearchQuery.value;
}, 1500);

const productSpecPageChange = async (page: Partial<PageState>) => {
  const filter: { page?: number; pageSize?: number } = {};
  if (page.page) {
    filter.page = page.page + 1;
    currentFilters.value.page = page.page + 1;
  }

  if (page.rows) {
    filter.pageSize = page.rows;
    currentFilters.value.pageSize = page.rows;
  }

  await loadProducts(filter);
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

<style scoped>
.cats-container {
  /* background-color: red; */
  border: 2px solid #f3f3f3;
  border-radius: 0.5em;
}

.price-slider {
  margin-top: 2vh;
  width: 95%;
  margin-bottom: 1vh;
  margin-left: 1vh;
}

#supplier-filter {
  margin-top: 4vh;
}
.right-content-mobile-on {
  display: none;
}

.pagination-mobile-on {
  display: none;
}
@media (max-width: 1111px) {
  .mobile-off-lat-bar {
    display: none;
  }

  .mobile-on-lat-bar {
    display: block !important;
    /* background-color: red; */
  }

  .right-content {
    display: none;
  }

  .p-accordion {
    padding-left: 0.8em;
    padding-right: 0.8em;
  }

  .right-content-mobile-on {
    display: block;
  }

  .pagination-mobile-on {
    display: block;
  }

  .mobile-product-card {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .product {
    max-width: 90% !important;
  }
  .price-slider {
    margin-left: 1vh;
  }
}
</style>
