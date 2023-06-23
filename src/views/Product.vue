<template>
  <div>
    <!-- Caminho -->
    <PathComponent :path-list="path"></PathComponent>
  </div>
  <div class="parent">
    <!-- TODO Arranjar para voltar para onde o user estiver antes realmente -->
    <RouterLink to="/products" style="text-decoration: none">
      <PageBack style="margin-top: -2vh"></PageBack
    ></RouterLink>
  </div>

  <!-- detalhes do produto -->
  <div class="d-flex parent mobile-on">
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
            class="d-flex justify-content-between align-items-center mt-3 gap-3"
            style="overflow: auto"
          >
            <img
              class="square-image alternative-img rounded-3"
              style="background-color: #f3f3f3"
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
        class="w-75"
        style="min-height: 18vh"
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
          <h3>{{ defaultProduct.currentPrice }}€</h3>
          <p>{{ productDetails.minPrice }}€ - {{ productDetails.maxPrice }}€</p>
          <!-- <h5 class="grey-txt text-decoration-line-through">999€</h5> -->
        </div>
        <div>
          <a
            href="#"
            v-if="productDetails.producersCount > 1"
            @click="currentPage = 'vendedores'"
          >
            ver +{{ productDetails.producersCount }} vendedores
          </a>
          <!-- Não há mais vendedores para além do apresentado -->
          <a href="#" v-else-if="productDetails.producersCount === 1"></a>
        </div>

        <!-- Quantidade -->
        <div class="d-flex align-items-center gap-4" style="margin-top: 4%">
          <!-- Botão da quantidade -->
          <div class="quantity-div d-flex justify-content-between rounded-pill">
            <b-button class="mr-3 rounded-pill" @click="decrement"
              ><i class="bi bi-dash-lg"></i
            ></b-button>
            <b-button>{{ quantity }}</b-button>
            <b-button class="ml-3 rounded-pill" @click="increment"
              ><i class="bi bi-plus-lg"></i
            ></b-button>
          </div>

          <p class="mt-3 grey-txt">
            <span>{{ defaultProduct.stock }}</span> items disponíveis
          </p>
        </div>

        <!-- Botões compra -->
        <div class="d-flex gap-4 align-items-center" style="margin-top: 5vh">
          <b-button class="buy-btn rounded-pill">Comprar agora</b-button>

          <div class="aux-btns d-flex align-items-center gap-1">
            <button
              @click="addItemToCart(defaultProduct.id)"
              type="button"
              class="btn btn-outline-secondary circle-btn"
              v-b-tooltip.hover
              title="Adicionar ao carrinho"
            >
              <i class="bi bi-cart"></i>
            </button>
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
          <router-link :to="'/producer/' + defaultProduct.producer.user.id">
            <a href="#" class="grey-txt">Sobre o vendedor</a>
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
        class="d-flex justify-content-between align-items-center mt-3 gap-3 alternative-img-mobile"
        style="overflow: auto"
      >
        <img
          class="square-image alternative-img rounded-3"
          style="background-color: #f3f3f3"
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
      <div>
        <a
          href="#"
          v-if="productDetails.producersCount > 1"
          @click="currentPage = 'vendedores'"
        >
          ver +{{ productDetails.producersCount }} vendedores
        </a>
        <!-- Não há mais vendedores para além do apresentado -->
        <a href="#" v-else-if="productDetails.producersCount === 1"></a>
      </div>

      <!-- Quantidade -->
      <div class="d-flex align-items-center gap-4" style="margin-top: 4%">
        <!-- Botão da quantidade -->
        <div class="quantity-div d-flex justify-content-between rounded-pill">
          <b-button class="mr-3 rounded-pill" @click="decrement"
            ><i class="bi bi-dash-lg"></i
          ></b-button>
          <b-button>{{ quantity }}</b-button>
          <b-button class="ml-3 rounded-pill" @click="increment"
            ><i class="bi bi-plus-lg"></i
          ></b-button>
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
        <b-button class="buy-btn rounded-pill">Comprar agora</b-button>

        <div class="aux-btns d-flex align-items-center gap-1">
          <button
            @click="addItemToCart(defaultProduct.id)"
            type="button"
            class="btn btn-outline-secondary circle-btn"
            v-b-tooltip.hover
            title="Adicionar ao carrinho"
          >
            <i class="bi bi-cart"></i>
          </button>
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
          <router-link :to="'/producer/' + defaultProduct.producer.user.id">
            <a href="#" class="grey-txt">Sobre o vendedor</a>
          </router-link>
        </div>
      </div>
    </div>
  </div>

  <!-- Informação adicional -->
  <div class="parent px-5 more-info-normal">
    <div class="separator-top mt-4">
      <b-navbar class="mt-3">
        <b-nav v-model="currentPage">
          <b-nav-item
            @click="currentPage = 'detalhes'"
            :class="{ 'active-view': currentPage === 'detalhes' }"
          >
            <h5 class="grey-txt">Detalhes do produto</h5>
          </b-nav-item>
          <b-nav-item
            @click="currentPage = 'vendedores'"
            :class="{ 'active-view': currentPage === 'vendedores' }"
          >
            <h5 class="grey-txt">Vendedores</h5>
          </b-nav-item>
        </b-nav>
      </b-navbar>
      <!-- Página dos detalhes -->
      <div class="px-4" v-if="currentPage === 'detalhes'">
        <div class="mt-4">
          <h5 v-if="productCategories.items" class="mb-4">
            Categorias <span>({{ productCategories.items.length }})</span>
          </h5>

          <div style="background-color: ">
            <div
              v-for="categoria in productCategories.items"
              :key="categoria.id"
              class="d-inline-block mx-2 cat-select"
            >
              <router-link :to="'/products?categoryId=' + categoria.id">
                <a
                  href="#"
                  class="rounded-pill text-center mt-3 mb-3 px-3 py-1 prod-category"
                >
                  {{ categoria.name }}
                </a>
              </router-link>
            </div>
          </div>
        </div>
        <div class="mt-4">
          <div class="mt-3 mb-3 d-flex align-items-center spec-category-text">
            <h5 class="mt-4 mb-3">Características</h5>
          </div>
          <div style="background-color: ; height: " class="px-3">
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
                <div style="width: 25vh">
                  <!-- {{ field }} -->
                  <span style="font-weight: bold">{{ field.field.name }} </span>
                </div>
                <span :class="{ 'mb-3': index === categoryFields.length - 1 }">
                  {{ field.value }} {{ field.field.unit }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Página dos outros vendedores -->

      <div class="px-4" v-if="currentPage === 'vendedores'">
        <!-- Conteúdo que será exibido quando 'currentPage' for igual a 'vendedores' e a checkbox estiver marcada -->

        <h5 v-if="productCategories.items" class="mb-4 mt-3">Vendido por:</h5>
        <div v-if="$store.state.user">
          <div class="d-flex justify-content-start align-items-center">
            <input
              @change="onCheckboxChange()"
              type="checkbox"
              id="local-products-checkbox"
              style="float: left; width: auto; padding: 2px; margin: 2px"
            />
            <label
              style="margin-left: 2px"
              class="moradaTitulo"
              title="Com base na morada definida por si na criação do perfil"
              >Apenas vendedores locais</label
            >
          </div>
        </div>
        <!-- TODO - ver qual é o certo -->
        <!-- {{ producerProducts.items.length }} -->

        <div v-if="!checkboxValue">
          <div
            v-for="(producerProduct, index) in producerProducts.items"
            :key="index"
          >
            <div class="mt-4" style="background-color: ">
              <!-- Este if tira a mesma pessoa de aparecer 2 vezes, com o memso produto  -->
              <div
                class="mt-5 d-flex align-items-center gap-3"
                style="background-color: ; width: 70%"
                v-if="
                  producerProduct.producer &&
                  producerProduct.id != defaultProduct.id
                "
              >
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
                <div class="seller" v-if="producerProduct.producer">
                  <h5>{{ producerProduct.producer.user.name }}</h5>
                  <router-link
                    :to="'/producer/' + producerProduct.producer.user.id"
                  >
                    <a href="#" class="grey-txt">Sobre o vendedor</a>
                  </router-link>
                </div>
                <div style="margin-left: 30%; position: absolute">
                  <div class="d-flex gap-5 align-items-center">
                    <span>
                      <h5>{{ producerProduct.currentPrice }}€</h5>
                    </span>
                    <div>
                      <b-button class="buy-btn rounded-pill" style="scale: 0.85"
                        >Comprar agora</b-button
                      >
                      <b-button
                        v-if="
                          selectedUnit &&
                          selectedUnit === producerProduct.productionUnit?.id
                        "
                        class="buy-btn rounded-pill close-map-btn"
                        style="scale: 0.85"
                        @click="selectedUnit = null"
                      >
                        Fechar Mapa
                      </b-button>
                      <b-button
                        v-else
                        class="buy-btn rounded-pill map-btn"
                        style="scale: 0.85"
                        @click="selectProducer(producerProduct.productionUnit)"
                      >
                        {{
                          selectedUnit &&
                          selectedUnit === producerProduct.productionUnit
                            ? 'Fechar Mapa'
                            : 'Mapa'
                        }}
                      </b-button>
                      <button
                        @click="addItemToCart(producerProduct.id)"
                        type="button"
                        style="scale: 1.1"
                        class="btn btn-outline-secondary circle-btn"
                        v-b-tooltip.hover
                        title="Adicionar ao carrinho"
                      >
                        <i class="bi bi-cart"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                v-if="
                  selectedUnit &&
                  selectedUnit === producerProduct.productionUnit
                "
              >
                <Maps
                  :selected-unit="selectedUnit"
                  :producer-id="producerProduct.producer?.user.id || 0"
                />
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <p>
            O produto selecionado não se encontra disponível para venda num raio
            de 30km de si.
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- ALTERAR EM RELAÇÃO À VERSÃO MAIS RECENTE -->
  <div class="parent px-5 more-info-mobile">
    <div class="separator-top mt-4">
      <b-navbar class="mt-3">
        <b-nav v-model="currentPage">
          <b-nav-item
            @click="currentPage = 'detalhes'"
            :class="{ 'active-view': currentPage === 'detalhes' }"
          >
            <h5 class="grey-txt">Detalhes do produto</h5>
          </b-nav-item>
          <b-nav-item
            @click="currentPage = 'vendedores'"
            :class="{ 'active-view': currentPage === 'vendedores' }"
          >
            <h5 class="grey-txt">Outros vendedores</h5>
          </b-nav-item>
        </b-nav>
      </b-navbar>
      <!-- Página dos detalhes -->
      <div class="px-4" v-if="currentPage === 'detalhes'">
        <div class="mt-4">
          <h5 v-if="productCategories.items" class="mb-4">
            Categorias <span>({{ productCategories.items.length }})</span>
          </h5>

          <div style="display: flex; flex-direction: column; gap: 1.5vh">
            <div
              v-for="categoria in productCategories.items"
              :key="categoria.id"
              class="cat-select"
            >
              <router-link :to="'/products?categoryId=' + categoria.id">
                <a
                  href="#"
                  class="rounded-pill text-center mt-3 mb-3 px-3 py-1 prod-category"
                >
                  {{ categoria.name }}
                </a>
              </router-link>
            </div>
          </div>
        </div>
        <div class="mt-4">
          <div class="mt-3 mb-3 d-flex align-items-center spec-category-text">
            <h5 class="mt-4 mb-3">Características</h5>
          </div>
          <div style="background-color: ; height: " class="">
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
                  <!-- {{ field }} -->
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
      </div>

      <!-- Página dos outros vendedores -->
      <div class="px-4" v-if="currentPage === 'vendedores'">
        <!-- Conteúdo que será exibido quando 'currentPage' for igual a 'vendedores' e a checkbox estiver marcada -->

        <h5 v-if="productCategories.items" class="mb-4 mt-3">Vendido por:</h5>
        <div v-if="$store.state.user">
          <div class="d-flex justify-content-start align-items-center">
            <input
              @change="onCheckboxChange()"
              type="checkbox"
              id="local-products-checkbox"
              style="float: left; width: auto; padding: 2px; margin: 2px"
            />
            <label
              style="margin-left: 2px"
              class="moradaTitulo"
              title="Com base na morada definida por si na criação do perfil"
              >Apenas vendedores locais</label
            >
          </div>
        </div>
        <!-- TODO - ver qual é o certo -->
        <!-- {{ producerProducts.items.length }} -->

        <div v-if="!checkboxValue">
          <div
            style="background-color: "
            v-for="(producerProduct, index) in producerProducts.items"
            :key="index"
          >
            <div class="mt-4 producer-mobile-info">
              <!-- Este if tira a mesma pessoa de aparecer 2 vezes, com o memso produto  -->
              <div
                class="mt-5"
                style="background-color: ; width: 70%"
                v-if="
                  producerProduct.producer &&
                  producerProduct.id != defaultProduct.id
                "
              >
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
                <div class="seller" v-if="producerProduct.producer">
                  <h5 class="mt-3">{{ producerProduct.producer.user.name }}</h5>
                  <router-link
                    :to="'/producer/' + producerProduct.producer.user.id"
                  >
                    <a href="#" class="grey-txt">Sobre o vendedor</a>
                  </router-link>
                </div>
                <div style="position: absolute">
                  <div class="mt-3">
                    <span>
                      <h5>{{ producerProduct.currentPrice }}€</h5>
                    </span>
                    <div style="margin-left: -3vh">
                      <b-button class="buy-btn rounded-pill" style="scale: 0.85"
                        >Comprar agora</b-button
                      >
                      <b-button
                        v-if="
                          selectedUnit &&
                          selectedUnit === producerProduct.productionUnit?.id
                        "
                        class="buy-btn rounded-pill close-map-btn"
                        style="scale: 0.85"
                        @click="selectedUnit = null"
                      >
                        Fechar Mapa
                      </b-button>
                      <b-button
                        v-else
                        class="buy-btn rounded-pill map-btn"
                        style="scale: 0.85"
                        @click="selectProducer(producerProduct.productionUnit)"
                      >
                        {{
                          selectedUnit &&
                          selectedUnit === producerProduct.productionUnit
                            ? 'Fechar Mapa'
                            : 'Mapa'
                        }}
                      </b-button>
                      <button
                        @click="addItemToCart(producerProduct.id)"
                        type="button"
                        style="scale: 1.1"
                        class="btn btn-outline-secondary circle-btn"
                        v-b-tooltip.hover
                        title="Adicionar ao carrinho"
                      >
                        <i class="bi bi-cart"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                v-if="
                  selectedUnit &&
                  selectedUnit === producerProduct.productionUnit
                "
                style="margin-top: 12vh !important"
              >
                <Maps
                  style="z-index: 33232 !important"
                  :selected-unit="selectedUnit"
                  :producer-id="producerProduct.producer?.user.id || 0"
                />
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <p>
            O produto selecionado não se encontra disponível para venda num raio
            de 30km de si.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.alternative-img {
  width: 20% !important;
}

.product-title {
  letter-spacing: -0.04em;
}

.quantity-div {
  width: 14vh;
  background-color: #f7f7f7 !important;
  padding: 0.5em;
  box-shadow: rgba(27, 31, 35, 0.04) 0px 1px 0px,
    rgba(255, 255, 255, 0.25) 0px 1px 0px inset;
}

.quantity-div button {
  background-color: #f7f7f7 !important;
  border: none !important;
}

.quantity-div .btn-content {
  color: #5a5a5a !important;
}

.buy-btn {
  background-color: #4d774e !important;
  padding: 0.8em !important;
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
}

.buy-btn .btn-content {
  color: white !important;
}

.aux-btns {
  scale: 1.2;
}

.aux-btns button:hover i {
  color: white !important;
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
</style>

<style scoped>
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

.active-view {
  border-bottom: 3px solid #4d774e;
}

.active-view h5 {
  color: #4d774e !important;
}

.mobile-content,
.product-info-mobile,
.more-info-mobile {
  display: none;
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
// Componentes
import PathComponent from '@/components/PathComponent.vue';
import PageBack from '@/components/PageBack.vue';

import Maps from '../maps/maps.vue';
import {
  fetchProduct,
  fetchProducerProducts,
  fetchProductCategories,
  fetchProductCategoriesFields,
  fetchLocalProducts,
  getConsumerAddresses,
  addCartItem,
} from '@/api';
import {
  ProductSpec,
  ProducerProduct,
  BaseItems,
  Category,
  ProductSpecField,
  SelectedUnit,
} from '@/types';
import { computed, defineComponent, PropType } from 'vue';
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
      path: [
        ['Produtos', '/products'],
        ['Produto', ''],
      ] as string[][],
      producerLocalProducts: {} as BaseItems<ProducerProduct>,
      selectedImage: '', // Imagem selecionada
      selectedImageAlt: '', // Alt da imagem selecionada
      isFavorite: false, // Se o produto está nos favoritos
      quantity: 1, // Quantidade de produtos a comprar
      currentPage: 'detalhes', // Página atual das tabs do produto
      lowestPriceIndex: 0, // Índice do produtor com o preço mais baixo
      // Dados da BD
      producerProducts: {} as BaseItems<ProducerProduct>,

      defaultProduct: {} as ProducerProduct,
      //   defaultProduct: {} as ProductSpec,
      productDetails: {} as ProductSpec,
      lowestPrice: 0,
      highestPrice: 0,
      stock: 0,
      producers: 1 as Number,

      productCategories: {} as BaseItems<Category>,
      productCategoriesFields: [] as ProductSpecField[][],
      //   fields: {} as BaseItems<Category>,
      fields: [] as ProductSpecField[][],
      selectedUnit: null as object | null | undefined | Number,

      //VENDEDORES SE A CHECKBOX LOCAL ESTA OU NAO SELECIONADA
      checkboxValue: false,
    };
  },
  methods: {
    // /------------------------------------------------------------------------------------------------------------------------------

    async addItemToCart(idToAdd: number) {
      console.log('teste0');
      const userLoggedId = computed(() => this.$store.state.user);
      if (userLoggedId.value) {
        console.log('iffff');
        await addCartItem(
          userLoggedId.value['user']['id'],
          idToAdd,
          this.quantity
        );
      } else {
        console.log('affff');
        // nothing
      }
    },

    // /------------------------------------------------------------------------------------------------------------------------------

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
    const productDetails = await fetchProduct(specId);
    this.productDetails = productDetails.data;

    // Carregar a imagem principal do produto
    if (this.productDetails.images) {
      this.selectedImage = this.productDetails.images[0].url;
      this.selectedImageAlt = this.productDetails.images[0].alt;
    }

    // Carrega todos os produtos que têm a productSpec passada na route
    // Pedido /products/specId/products
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
    } catch (error) {
      console.log('Erro: ' + error);
    }
  },
  created() {
    console.log(this.fields);
    this.productCategoriesFields = this.fields;
  },
  components: { PathComponent, PageBack, Maps },
});
</script>
