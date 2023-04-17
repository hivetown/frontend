<template>
    <!-- Div principal -->
    <div class="parent mt-3">

        <div class="px-3">
            <h3 class="dgreen-txt">Comparador</h3>
            <p class="grey-txt">A comparar <span>2</span> produtos</p>
        </div>
        <!-- {{ product1Id }}
        {{ product2Id }}
        {{ productSpec1 }}
        {{ productSpec2 }} -->

        <!-- TODO por automático -->
        <!-- Produtos a comparar -->
        <div class="d-flex mt-5 px-3" style="gap:20vh; border-bottom: 2px solid #eeeeee;">
            <ProductCard :productTitle="productSpec1.name" 
                         :productDescription="productSpec1.description"
                         :productImage="product1Img.url"
                         :productId="product1Id" 
                         :productPrice="[productSpec1.minPrice, productSpec1.maxPrice]" />
            <ProductCard :productTitle="productSpec2.name" 
                         :productDescription="productSpec2.description"
                         :productImage="product2Img.url"
                         :productId="product2Id" 
                         :productPrice="[productSpec2.minPrice, productSpec2.maxPrice]" />
        </div>

        <!-- TODO mudar para ser automático (como já está feito no produto) -->
        <!-- Características dos produtos a ser comparados -->
        <div class="spec-to-compare">
            <!-- TODO trocar estes valores automáticamente -->
            <div class="mt-3 d-flex align-items-center spec-category-text">
                <h5 class="p-3">Características</h5>
            </div>
            <!-- Dados do produto 1 -->
            <div class="d-flex p-2" style="gap:30vh;">
                <CompareSpec></CompareSpec>
                <CompareSpec></CompareSpec>
            </div>
        </div>
        <div class="spec-to-compare">
            <!-- TODO trocar estes valores automáticamente -->
            <div class="mt-3 d-flex align-items-center spec-category-text">
                <h5 class="p-3">Características</h5>
            </div>
            <!-- Dados do produto 2 -->
            <div class="d-flex p-2" style="gap:30vh;">
                <CompareSpec></CompareSpec>
                <CompareSpec></CompareSpec>
            </div>
        </div>
    </div>
</template>

<style>
.spec-category-text {
    height: 5vh;
    background-color: #f3f3f3;
}
</style>


<script setup lang="ts">
import CompareSpec from "@/components/CompareSpec.vue";
</script>


<script lang="ts">
// Componentes
import ProductCard from "@/components/ProductCard.vue";

// API
import { fetchProduct } from "@/api";
import { Product } from "@/types";
import { defineComponent, onMounted } from "vue";
import PriceFilter from "./PriceFilter.vue";

export default defineComponent({
    data() {
        return {
            // Dados da BD
            productSpec1: {} as Product,
            productSpec2: {} as Product,
            product1Img: "",
            product2Img: "",
        };
    },
    props: {
        product1Id: {
            type: Number,
            required: true,
        },
         product2Id: {
            type: Number,
            required: true,
        },
    },
    // TODO ver porque é que os dados não estão a ser carregados como deve ser (só quando há uma mudança)
    // A fazer antes de montar o componente
    async beforeMount() {

        // const productSpec1 = await fetchProduct(this.product1Id);
        // this.productSpec1 = productSpec1.data;
        // this.product1Img = productSpec1.data.images[0];
        // const productSpec2 = await fetchProduct(this.product2Id);
        // this.productSpec2 = productSpec2.data;
        // this.product2Img = productSpec2.data.images[0];
    },
    components: { ProductCard }
});
</script>