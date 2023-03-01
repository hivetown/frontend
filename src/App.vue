<template>

	<!-- Home - página -->

  	<!-- <Navbar></Navbar>
	<Banner></Banner>

	<div id="categories" class="parent mt-6">
		<div class="title d-flex justify-content-between align-items-center mb-5">
			<h3 class="grey-txt">Categorias Populares</h3>
			<button type="button" class="btn btn-outline-secondary btn-sm">Ver todas</button>   
		</div>
		<div class="d-flex gap-4 justify-content-center">
			<CategoryCard
				title="Tecnologia"
				image="categories/tech.png"
			/>
			<CategoryCard
				title="Arte"
				image="categories/art.png"
			/>
			<CategoryCard
				title="Moda"
				image="categories/clothes.png"
			/>
			<CategoryCard
				title="Desporto"
				image="categories/sport.png"
			/>
			<CategoryCard
				title="Animais"
				image="categories/pets.png"
			/>
			<CategoryCard
				title="Tecnologia"
				image="categories/tech.png"
			/>
			<CategoryCard
				title="Arte"
				image="categories/art.png"
			/>
			<CategoryCard
				title="Moda"
				image="categories/clothes.png"
			/>
			<CategoryCard
				title="Desporto"
				image="categories/sport.png"
			/>
			<CategoryCard
				title="Animais"
				image="categories/pets.png"
			/>
					
		</div>
	</div>
	
	<div id="products" class="parent mt-6">
		<div class="title d-flex justify-content-between align-items-center mb-5">
			<h3 class="grey-txt">Produtos Populares</h3>
			<button type="button" class="btn btn-outline-secondary btn-sm">Ver todas</button>   
		</div>
		<div class="d-flex justify-content-center" style="gap:12vh;">
			<ProductCard></ProductCard>
			<ProductCard></ProductCard>
			<ProductCard></ProductCard>
			<ProductCard></ProductCard>
		</div>
	</div>

	<Footer></Footer>
	<Search></Search> -->

	<!-- Categorias/Produtos - página -->
	<Navbar></Navbar>

	<div class="parent mb-4">
		<b-breadcrumb>
			<b-breadcrumb-item href="#home">
				<b-icon icon="house-fill" scale="1.25" shift-v="1.25" aria-hidden="true"></b-icon>
				Home
			</b-breadcrumb-item>
			<b-breadcrumb-item href="#foo">Foo</b-breadcrumb-item>
			<b-breadcrumb-item href="#bar">Bar</b-breadcrumb-item>
			<b-breadcrumb-item active>Baz</b-breadcrumb-item>
		</b-breadcrumb>
	</div>

	<div class="d-flex parent">
		<div class="lat-bar" style="width:20%;">
			<div id="filters">
				<div>
					<h5 class="grey-txt">Categorias</h5>
					<CategoryFilter></CategoryFilter>
				</div>
				<div>
					<h5 class="grey-txt mt-3" >Preço</h5>
					<PriceFilter></PriceFilter>
				</div>
				<div>
					<h5 class="grey-txt mt-3">Fornecedor</h5>
					<SupplierFilter></SupplierFilter>
				</div>
				<div class="mt-4" style="border-top: 1px solid #f3f3f3;">
					<h5 class="grey-txt mt-3">Avaliação</h5>
					<RatingFilter></RatingFilter>
				</div>
			</div>
		</div>

		<div class="" style="width:100%;">
			<!-- TODO trocar para a categoria escolhida -->
			<h3 class="parent dgreen-txt">Portáteis</h3>
			<CustomViews></CustomViews>
			<div>
				<!-- TODO por isto automático -->
				<div class="parent d-flex justify-content-center gap-8 mt-5">
					<ProductCard></ProductCard>
					<ProductCard></ProductCard>
					<ProductCard></ProductCard>
					<ProductCard></ProductCard>
				</div>
				<div class="parent d-flex justify-content-center gap-8 mt-5">
					<ProductCard></ProductCard>
					<ProductCard></ProductCard>
					<ProductCard></ProductCard>
					<ProductCard></ProductCard>
				</div>
			</div>
		</div>
	</div>

</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import InputText from "primevue/inputtext";
import { fetchAllProducts } from "./api";
import ProductListVue from "./components/ProductList.vue";
import { Product } from "./types/interfaces";

// Main page components
import Navbar from "./components/Navbar.vue";
import Banner from "./components/Banner.vue";
import Search from './components/Search.vue';
import Footer from './components/Footer.vue';

// Products/Category components
import CategoryFilter from './components/CategoryFilter.vue';
import PriceFilter from './components/PriceFilter.vue';
import SupplierFilter from './components/SupplierFilter.vue';
import RatingFilter from './components/RatingFilter.vue';
import CustomViews from './components/CustomViews.vue';


import ProductCard from './components/ProductCard.vue';
import CategoryCard from './components/CategoryCard.vue';

const products = ref<Product[]>([]);

const fetchProducts = async (search?: string) => {
  products.value = await fetchAllProducts(search).then((ps) => ps.data);
};

onMounted(fetchProducts);

const search = ref("");
watch(search, fetchProducts);

</script>

<style>
	*{
		/* font-family: 'Roboto', sans-serif; */
		/* font-family: 'DM Serif Display', serif; */
		font-family: 'Inter', sans-serif;
	}

	.grey-txt{
		color: #5A5A5A;
	}

	.dgreen-txt{
		color: #164A41;
	}

	.yellow-txt{
		color: #F1B24A;
	}

	.parent{
		display: block;
		margin: auto;
		width: 95%;
	}

	.card{
		border: none !important;
	}

	.circle-btn{
		border-radius: 100% !important;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 2.5rem;
		height: 2.5rem;
	}


	.light-search{
		border: solid 1px #e9e9e9 !important;
	}

	.light-search::placeholder{
		color:#a9a9a9 !important;
	}
	
</style>


