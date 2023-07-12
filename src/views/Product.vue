<template>
  <div>
    <!-- Caminho -->
    <PathComponent :path-list="path"></PathComponent>
  </div>
  <div class="parent">
    <!-- TODO Arranjar para voltar para onde o user estiver antes realmente -->
    <!-- <RouterLink to="/products" style="text-decoration: none"> -->
    <div class="parent" @click="goBack">
      <PageBack style="margin-top: -2vh"></PageBack>
    </div>
    <!--</RouterLink> -->
  </div>

  <!-- detalhes do produto -->
  <Loader v-if="loadingProduct" style="display: block; align-items: center" />
  <div class="d-flex parent mobile-on" v-if="!loadingProduct">
    <!-- Imagens -->
    <div class="d-flex flex-row justify-content-center w-50">
      <div class="d-flex flex-column align-items-center w-75 h-75 rounded-3">
        <!-- TODO ver se é preciso um fundo por causa das imagens -->
        <!-- Coração dos favoritos -->
        <div
          class="d-flex justify-content-end w-100 px-4 py-2"
          style="z-index: 1212"
        >
          <span class="" style="font-size: 2.5vh">
            <i
              :class="[isFavorite ? 'bi-heart-fill' : 'bi-heart']"
              style="color: #dc6942; cursor: pointer"
              @click="isFavorite = !isFavorite"
            ></i>
          </span>
        </div>

        <!-- Imagem grande -->
        <img
          class="square-image rounded-3"
          :src="selectedImage"
          :alt="selectedImageAlt"
          style="margin-top: -10%"
        />

        <!-- Imagens alternativas -->
        <div>
          <div
            class="d-flex align-items-center mt-3 gap-3"
            style="overflow: auto"
          >
            <img
              class="square-image alternative-img rounded-3"
              style="background-color: #f3f3f3; cursor: pointer"
              v-for="(image, index) in productDetails.images"
              :key="index"
              :src="image.url"
              :alt="image.alt"
              @click="selectImage(index)"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Lado direito da página -->
    <div class="w-50">
      <div
        v-if="
          productDetails && productDetails.name && productDetails.description
        "
        style="min-height: 15vh; width: 85%"
      >
        <!-- Informação do produto -->
        <h1 class="product-title">{{ productDetails.name }}</h1>
        <p class="grey-txt">{{ productDetails.description }}</p>

        <!-- TODO rating automático -->
        <!-- Rating -->
        <!-- <div>
               <div class="rating d-flex gap-1 separator-bottom">
                  <i v-for="star in 5" :key="star" class="mr-1 bi bi-star-fill yellow-txt mb-3" :class="{ 'bx bxs-star': star <= value, 'bx bx-star': star > value }"></i>
                  <span class="">(10)</span>
               </div>
            </div> -->
      </div>

      <div class="separator-bottom" style="min-height: 30vh">
        <!-- Preço -->
        <div class="d-flex align-items-center gap-3">
          <h2>{{ defaultProduct.currentPrice }}€</h2>
          <p>{{ productDetails.minPrice }}€ - {{ productDetails.maxPrice }}€</p>
          <!-- <h5 class="grey-txt text-decoration-line-through">999€</h5> -->
        </div>
        <div v-if="productDetails.producersCount > 1">
          <PrimeButton
            text
            severity="secondary"
            @click="changeDetailsView(DetailsView.PRODUCERS)"
          >
            ver +{{ productDetails.producersCount }} vendedores
          </PrimeButton>
        </div>

        <!-- Quantidade -->
        <div class="mt-4">
          <!-- Botão da quantidade -->
          <div class="p-inputgroup" style="max-width: 10em">
            <PrimeButton
              outlined
              severity="info"
              icon="pi pi-minus"
              @click="decrement"
            ></PrimeButton>
            <InputText class="text-center" :value="quantity" readonly />
            <PrimeButton
              outlined
              severity="info"
              icon="pi pi-plus"
              @click="increment"
            ></PrimeButton>
          </div>

          <p class="mt-3 grey-txt">
            <span>{{ defaultProduct.stock }}</span> items disponíveis
          </p>
        </div>

        <!-- Botões compra -->
        <div
          class="d-flex gap-2 align-items-center mb-5"
          style="margin-top: 5vh"
        >
          <PrimeButton rounded severity="secondary">Comprar agora</PrimeButton>

          <PrimeButton
            rounded
            outlined
            severity="info"
            v-b-tooltip.hover
            title="Adicionar ao carrinho"
            icon="pi pi-shopping-cart"
            style="color: #5a5a5a"
          >
          </PrimeButton>
          <!-- <button type="button" class="btn btn-outline-secondary circle-btn" 
                          v-b-tooltip.hover title="Ver produto" >
                          <i class="bi bi-eye"></i>
                  </button> -->
          <!-- <button type="button" class="btn btn-outline-secondary circle-btn" 
                          v-b-tooltip.hover title="Comparar produto">
                          <i class="bi bi-arrow-left-right"></i>
                  </button> -->
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
        <b-avatar
          v-if="defaultProduct.producer && defaultProduct.producer.user.image"
          class="nav-item"
          :src="defaultProduct.producer.user.image.url"
          :alt="defaultProduct.producer.user.image.alt"
          style="box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px; scale: 1.2"
        >
        </b-avatar>
        <div class="seller" v-if="defaultProduct && defaultProduct.producer">
          <h5>{{ defaultProduct.producer.user.name }}</h5>
          <router-link
            :to="'/producer/' + defaultProduct.producer.user.id"
            class="grey-txt"
          >
            Sobre o vendedor
          </router-link>
        </div>
      </div>
    </div>
  </div>

  <div class="mobile-content parent">
    <!-- Imagens -->
    <div
      class="d-flex justify-content-end w-100 px-4 py-2 heart-mobile"
      style="z-index: 1212 !important"
    >
      <span class="" style="font-size: 2.5vh">
        <i
          :class="[isFavorite ? 'bi-heart-fill' : 'bi-heart']"
          style="color: #dc6942; cursor: pointer"
          @click="isFavorite = !isFavorite"
        ></i>
      </span>
    </div>

    <!-- Imagem grande -->
    <div class="img-grande">
      <img
        class="square-image rounded-3"
        :src="selectedImage"
        :alt="selectedImageAlt"
        style="margin-top: -10%"
      />
    </div>

    <!-- Imagens alternativas -->
    <div>
      <div
        class="d-flex align-items-center mt-3 gap-3 alternative-img-mobile"
        style="overflow: auto"
      >
        <img
          class="square-image alternative-img rounded-3"
          style="background-color: #f3f3f3; cursor: pointer"
          v-for="(image, index) in productDetails.images"
          :key="index"
          :src="image.url"
          :alt="image.alt"
          @click="selectImage(index)"
        />
      </div>
    </div>

    <div
      v-if="productDetails && productDetails.name && productDetails.description"
      class="product-info-mobile parent"
      style="min-height: 18vh"
    >
      <!-- Informação do produto -->
      <h1 class="product-title">{{ productDetails.name }}</h1>
      <p class="grey-txt">{{ productDetails.description }}</p>
    </div>

    <div class="separator-bottom" style="min-height: 30vh">
      <!-- Preço -->
      <div class="d-flex align-items-center gap-3 price-mobile">
        <h3>{{ productDetails.minPrice }}€ - {{ productDetails.maxPrice }}€</h3>
        <!-- <h5 class="grey-txt text-decoration-line-through">999€</h5> -->
      </div>
      <div v-if="productDetails.producersCount > 1">
        <PrimeButton
          text
          severity="secondary"
          @click="changeDetailsView(DetailsView.PRODUCERS)"
        >
          ver +{{ productDetails.producersCount }} vendedores
        </PrimeButton>
      </div>

      <!-- Quantidade -->
      <div class="d-flex align-items-center gap-4" style="margin-top: 4%">
        <!-- Botão da quantidade -->
        <div class="p-inputgroup" style="max-width: 10em">
          <PrimeButton
            outlined
            severity="info"
            icon="pi pi-minus"
            @click="decrement"
          ></PrimeButton>
          <InputText class="text-center" :value="quantity" readonly />
          <PrimeButton
            outlined
            severity="info"
            icon="pi pi-plus"
            @click="increment"
          ></PrimeButton>
        </div>

        <p class="mt-3 grey-txt">
          <span>{{ defaultProduct.stock }}</span> items disponíveis
        </p>
      </div>

      <!-- Botões compra -->
      <div
        class="d-flex gap-4 align-items-center buttons-mobile"
        style="margin-top: 5vh"
      >
        <PrimeButton rounded severity="secondary">Comprar agora</PrimeButton>

        <div class="aux-btns d-flex align-items-center gap-1">
          <PrimeButton
            rounded
            outlined
            severity="info"
            v-b-tooltip.hover
            title="Adicionar ao carrinho"
            icon="pi pi-shopping-cart"
            style="color: #5a5a5a"
          >
          </PrimeButton>
        </div>
      </div>

      <!-- Vendedor -->
      <div class="mt-5 d-flex align-items-center gap-3 seller-mobile">
        <b-avatar
          v-if="defaultProduct.producer && defaultProduct.producer.user.image"
          class="nav-item"
          :src="defaultProduct.producer.user.image.url"
          :alt="defaultProduct.producer.user.image.alt"
          style="box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px; scale: 1.2"
        >
        </b-avatar>
        <div class="seller" v-if="defaultProduct && defaultProduct.producer">
          <h5>{{ defaultProduct.producer.user.name }}</h5>
          <router-link
            :to="'/producer/' + defaultProduct.producer.user.id"
            class="grey-txt"
          >
            Sobre o vendedor
          </router-link>
        </div>
      </div>
    </div>
  </div>

  <!-- Informação adicional -->
  <div class="parent px-5" ref="detailsView">
    <TabView v-model:active-index="detailsTabIndex" class="mt-4">
      <TabPanel>
        <template #header>
          <i class="pi pi-book mr-2"></i>
          <span>Detalhes do Produto</span>
        </template>

        <Loader v-if="loadingCategories" />
        <div class="mt-4" v-if="!loadingCategories">
          <h5 v-if="productCategories.items" class="mb-4">
            Categorias <span>({{ productCategories.items.length }})</span>
          </h5>

          <div
            style="
              display: flex;
              flex-direction: row;
              flex-wrap: wrap;
              gap: 1.5vh;
            "
          >
            <div
              v-for="categoria in productCategories.items"
              :key="categoria.id"
              class="cat-select"
            >
              <router-link
                :to="'/products?categoryId=' + categoria.id"
                class="rounded-pill text-center mt-3 mb-3 px-3 py-1 prod-category"
              >
                {{ categoria.name }}
              </router-link>
            </div>
          </div>
        </div>
        <div class="mt-4" v-if="!loadingCategories">
          <div class="mt-3 mb-3 d-flex align-items-center spec-category-text">
            <h5 class="mt-4 mb-3">Características</h5>
          </div>
          <div>
            <div
              v-for="(categoryFields, index) in productCategoriesFields"
              :key="index"
              class="mt-3"
              :style="{
                'border-bottom':
                  index !== productCategoriesFields.length - 1
                    ? '1px solid #eeeeee'
                    : 'none',
              }"
            >
              <div
                class="d-flex gap-5"
                v-for="field in categoryFields"
                :key="field.field.id"
              >
                <div style="width: 10vh !important">
                  <span style="font-weight: bold; font-size: 0.9em"
                    >{{ field.field.name }}
                  </span>
                </div>
                <span
                  style="font-size: 0.9em"
                  :class="{ 'mb-3': index === categoryFields.length - 1 }"
                >
                  {{ field.value }} {{ field.field.unit }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </TabPanel>

      <TabPanel>
        <template #header>
          <i class="pi pi-shopping-cart mr-2"></i>
          <span>Vendedores</span>
        </template>

        <h5 v-if="productCategories.items" class="mb-4 mt-3">Vendido por:</h5>

        <Loader v-if="loadingProducers" />
        <div v-if="$store.state.user && !loadingProducers">
          <div class="d-flex justify-content-start align-items-center">
            <input
              @change="onCheckboxChange()"
              type="checkbox"
              id="local-products-checkbox"
              class="mb-5"
              style="float: left; width: auto; padding: 2px; margin: 2px"
            />
            <label
              style="margin-left: 2px"
              class="moradaTitulo mb-5"
              title="Com base na morada definida por si na criação do perfil"
              >Apenas vendedores locais</label
            >
          </div>
        </div>

        <div v-if="!checkboxValue && !loadingProducers">
          <div class="grid" style="display: flex; justify-content: center">
            <template
              v-for="(producerProduct, index) in producerProducts.items"
              :key="index"
            >
              <Card
                style="box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px; !important"
                class="col-12 md:col-5 lg:col-4"
                v-if="
                  producerProduct.producer &&
                  producerProduct.id != defaultProduct.id
                "
              >
                <template #content>
                  <!-- Este if tira a mesma pessoa de aparecer 2 vezes, com o memso produto  -->
                  <div class="d-flex align-items-center gap-3">
                    <router-link
                      v-if="producerProduct.producer"
                      :to="'/producer/' + producerProduct.producer.user.id"
                    >
                      <b-avatar
                        v-if="producerProduct.producer.user.image"
                        class="nav-item"
                        :src="producerProduct.producer.user.image.url"
                        :alt="producerProduct.producer.user.image.alt"
                        style="
                          box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
                          scale: 1.2;
                        "
                      >
                      </b-avatar>
                    </router-link>

                    <router-link
                      :to="'/producer/' + producerProduct.producer.user.id"
                      class="seller text-decoration-none text-dark"
                      v-if="producerProduct.producer"
                    >
                      <h5>{{ producerProduct.producer.user.name }}</h5>
                      <router-link
                        :to="'/producer/' + producerProduct.producer.user.id"
                        class="grey-txt"
                        >Sobre o vendedor
                      </router-link>
                    </router-link>
                  </div>

                  <div class="flex flex-column mt-2 gap-1">
                    <div class="flex flex-row align-items-center gap-1">
                      <i
                        class="pi pi-truck p-button p-component p-button-info p-button-icon-only cursor-auto rounded-pill"
                      ></i>
                      <span>{{ producerProduct.productionUnit!.name }}</span>
                    </div>

                    <div class="flex flex-row align-items-center gap-1">
                      <i
                        class="pi pi-euro p-button p-component p-button-info p-button-icon-only cursor-auto rounded-pill"
                      ></i>
                      <span>{{ producerProduct.currentPrice }}€</span>
                    </div>
                  </div>

                  <div
                    v-if="
                      selectedUnit &&
                      selectedUnit === producerProduct.productionUnit
                    "
                    class="mt-2"
                  >
                    <Maps
                      :selected-unit="selectedUnit"
                      :producer-id="producerProduct.producer?.user.id || 0"
                    />
                  </div>
                </template>

                <template #footer>
                  <div class="flex gap-1">
                    <PrimeButton severity="secondary" rounded
                      >Comprar agora</PrimeButton
                    >

                    <PrimeButton
                      rounded
                      outlined
                      v-if="
                        selectedUnit &&
                        selectedUnit === producerProduct.productionUnit?.id
                      "
                      severity="secondary"
                      class="close-map-btn"
                      @click="selectedUnit = null"
                    >
                      Fechar Mapa
                    </PrimeButton>
                    <PrimeButton
                      outlined
                      rounded
                      v-else
                      class="map-btn"
                      severity="secondary"
                      @click="selectProducer(producerProduct.productionUnit)"
                    >
                      {{
                        selectedUnit &&
                        selectedUnit === producerProduct.productionUnit
                          ? 'Fechar Mapa'
                          : 'Mapa'
                      }}
                    </PrimeButton>

                    <PrimeButton
                      rounded
                      outlined
                      severity="info"
                      v-b-tooltip.hover
                      title="Adicionar ao carrinho"
                      icon="pi pi-shopping-cart"
                      style="color: #5a5a5a"
                    >
                    </PrimeButton>
                  </div>
                </template>
              </Card>
            </template>
          </div>
        </div>

        <div v-else>
          <p v-if="!loadingProducers">
            O produto selecionado não se encontra disponível para venda num raio
            de 30km de si.
          </p>
        </div>
      </TabPanel>
    </TabView>
  </div>
</template>

<style scoped>
.alternative-img {
  width: 20% !important;
}

.product-title {
  letter-spacing: -0.04em;
}

.seller {
  margin-top: -0.5em;
  line-height: 0.2em;
}

.prod-category {
  color: white !important;
}

.cat-select a {
  text-decoration: none !important;
}

.moradaTitulo {
  position: relative;
}

.moradaTitulo:hover::after {
  content: attr(title);
  position: absolute;
  top: -35px;
  left: 50%;
  transform: translateX(-50%);
  padding: 5px 10px;
  background-color: #ccc;
  color: #333;
  border-radius: 10px;
  font-size: 14px;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  white-space: nowrap;
}

.moradaTitulo:hover::before {
  content: '';
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent #ccc transparent;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.moradaTitulo:hover::after,
.moradaTitulo:hover::before {
  opacity: 1;
}

.mobile-content,
.product-info-mobile,
.more-info-mobile {
  display: none;
}

.back-component {
  color: black;
}

@media (max-width: 767px) {
  .heart-mobile {
    position: relative !important;
    z-index: 1221 !important;
    top: 0.5em !important;
    right: 1em !important;
  }
  .mobile-on {
    display: none !important;
  }

  .mobile-content {
    display: block !important;
    z-index: -3 !important;
  }

  .img-grande {
    width: 90%;
    z-index: -12;
  }

  .img-grande img {
    margin-top: -5vh !important ;
    display: block !important;
    margin-left: 4%;
  }

  .alternative-img-mobile {
    width: 90%;
    margin-left: 4%;
  }

  .product-info-mobile {
    display: block !important;
    padding: 1em;
  }

  .separator-bottom {
    /* background-color: red; */
    padding-left: 1.5em;
    margin-top: -1em;
    border-bottom: none !important;
  }

  .quantity-div {
    width: 60% !important;
  }

  .buttons-mobile {
    margin-bottom: 6vh;
  }

  .seller-mobile {
    margin-bottom: 4vh;
  }

  .more-info-normal {
    display: none !important;
  }
  .more-info-mobile {
    display: block !important;
  }

  .producer-mobile-info {
    /* background-color: pink !important; */
    height: 22vh;
  }
}
</style>

<script lang="ts">
export enum DetailsView {
  /* eslint-disable no-unused-vars */
  DETAILS = 0,
  PRODUCERS = 1,
  /* eslint-enable no-unused-vars */
}

// Componentes
import PathComponent from '@/components/PathComponent.vue';
import PageBack from '@/components/PageBack.vue';
import PrimeButton from 'primevue/button';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import InputText from 'primevue/inputtext';
import Card from 'primevue/card';
import Loader from '@/components/Loader.vue';

import Maps from '../maps/maps.vue';
import {
  fetchProduct,
  fetchProducerProducts,
  fetchProductCategories,
  fetchProductCategoriesFields,
  fetchLocalProducts,
  getConsumerAddresses,
} from '@/api';
import {
  ProductSpec,
  ProducerProduct,
  BaseItems,
  Category,
  ProductSpecField,
  SelectedUnit,
} from '@/types';
import { defineComponent, PropType } from 'vue';
export default defineComponent({
  // TODO substituir o rating para ser automático e ver se isto ainda é necessário
  name: 'Rating',
  props: {
    value: {
      type: Number as PropType<number>,
      required: true,
      validator: (v: number) => v >= 0 && v <= 5,
    },
    initialSelectedUnit: {
      type: Object as PropType<SelectedUnit | null>,
      default: null,
    },
    producerId: {
      type: Number as PropType<number | undefined>,
      default: undefined,
    },
  },

  data() {
    return {
      DetailsView,
      path: [
        ['Produtos', '/products'],
        ['Produto', ''],
      ] as string[][],
      producerLocalProducts: {} as BaseItems<ProducerProduct>,
      selectedImage: '', // Imagem selecionada
      selectedImageAlt: '', // Alt da imagem selecionada
      isFavorite: false, // Se o produto está nos favoritos
      quantity: 1, // Quantidade de produtos a comprar
      detailsTabIndex: DetailsView.DETAILS, // Tab selecionada
      lowestPriceIndex: 0, // Índice do produtor com o preço mais baixo
      // Dados da BD
      producerProducts: {} as BaseItems<ProducerProduct>,

      defaultProduct: {} as ProducerProduct,
      //   defaultProduct: {} as ProductSpec,
      productDetails: {} as ProductSpec,
      lowestPrice: 0,
      highestPrice: 0,
      producers: 1 as Number,

      productCategories: {} as BaseItems<Category>,
      productCategoriesFields: [] as ProductSpecField[][],
      //   fields: {} as BaseItems<Category>,
      fields: [] as ProductSpecField[][],
      selectedUnit: null as object | null | undefined | Number,

      loadingCategories: true,
      loadingProducers: true,
      loadingProduct: true,

      //VENDEDORES SE A CHECKBOX LOCAL ESTA OU NAO SELECIONADA
      checkboxValue: false,
    };
  },
  computed: {
    isMobile() {
      return window.innerWidth < 768;
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1); // Navega para a página anterior
    },
    changeDetailsView(index: DetailsView) {
      this.detailsTabIndex = index;

      // If we don't put a timeout, scroll will not work. We have to wait for the tab to be changed
      setTimeout(() => {
        (this.$refs.detailsView as HTMLDivElement).scrollIntoView({
          behavior: 'smooth',
        });
      }, 200);
    },
    // Aumentar e diminuir a quantidade de produtos
    increment() {
      if (this.quantity < this.defaultProduct.stock) this.quantity++;
    },
    decrement() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    // Selecionar a imagem do produto a visualizar
    selectImage(index: number) {
      this.selectedImage = this.productDetails.images[index].url;
      this.selectedImageAlt = this.productDetails.images[index].alt;
    },

    selectProducer(productionUnitId: object | null | undefined) {
      if (this.selectedUnit === productionUnitId) {
        this.selectedUnit = null; // Close the map div if already selected
      } else {
        this.selectedUnit = productionUnitId; // Set the selected production unit
      }
    },
    async onCheckboxChange() {
      this.checkboxValue = !this.checkboxValue;
      const checkbox = document.getElementById(
        'local-products-checkbox'
      ) as HTMLInputElement;
      const consumerId = this.$store.state.user?.user.id;
      if (consumerId) {
        const address = await getConsumerAddresses(consumerId);
        const addressId = address.data.items[0].id;

        if (checkbox.checked) {
          this.producerLocalProducts = (
            await fetchLocalProducts(
              Number(this.$route.params.specid), //specid
              addressId, //ADDRESSID
              30, //raio
              parseInt(String(this.$route.query.page)) || 1,
              parseInt(String(this.$route.query.pageSize)) || 24
            )
          ).data;
        }
      }
    },
  },

  // A fazer antes de montar o componente
  async beforeMount() {
    // SpecId escolhida
    const specId = Number(this.$route.params.specid);

    // Vai buscar os dados da spec para ter acesso aos dados específicos dela
    // Pedido do tipo: /products/specId
    try {
      const productDetails = await fetchProduct(specId);
      this.productDetails = productDetails.data;

      // Carregar a imagem principal do produto
      if (this.productDetails.images) {
        this.selectedImage = this.productDetails.images[0].url;
        this.selectedImageAlt = this.productDetails.images[0].alt;
      }
    } finally {
      this.loadingProduct = false;
    }

    // Carrega todos os produtos que têm a productSpec passada na route
    // Pedido /products/specId/products
    try {
      const producerProducts = await fetchProducerProducts(specId);
      this.producerProducts = producerProducts.data;

      // Percorre a lista de produtos para encontrar qual deles é que tem o minPrice
      if (this.producerProducts.items.length > 0) {
        for (let i = 0; i < this.producerProducts.items.length; i++) {
          const currentPrice = this.producerProducts.items[i].currentPrice;
          if (currentPrice <= this.productDetails.minPrice) {
            this.lowestPriceIndex = i;
          }
        }
      }

      // Define o produto default que será aquele com o preço mais baixo e este
      // será o que vai ter as infos apresentadas quando a página é carregada
      this.defaultProduct = this.producerProducts.items[this.lowestPriceIndex];
    } finally {
      this.loadingProducers = false;
    }

    // Carregar as categorias do produto
    const productCategories = await fetchProductCategories(specId);
    this.productCategories = productCategories.data;

    try {
      for (const categoria of this.productCategories.items) {
        const response = await fetchProductCategoriesFields(
          specId,
          categoria.id
        );
        this.fields.push(response.data.items);
      }
    } finally {
      this.loadingCategories = false;
    }
  },
  created() {
    this.productCategoriesFields = this.fields;
  },
  components: {
    PathComponent,
    PageBack,
    Maps,
    PrimeButton,
    TabView,
    TabPanel,
    InputText,
    Card,
    Loader,
  },
});
</script>
