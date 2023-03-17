<template>
    <!-- Div principal -->
    <div class="parent mt-3">

        <div class="px-3">
            <h3 class="dgreen-txt">Comparador</h3>
            <p class="grey-txt">A comparar <span>2</span> produtos</p>
        </div>

        <!-- TODO por automático -->
        <!-- Produtos a comparar -->
        <div class="d-flex mt-5 px-3" style="gap:20vh; border-bottom: 2px solid #eeeeee;">
            <ProductCard :productTitle="productSpec1.name" :productDescription="productSpec1.description"
               productImage="mac.png" />
            <ProductCard :productTitle="productSpec2.name" :productDescription="productSpec2.description"
                productImage="mac.png" />
        </div>

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
import { defineComponent } from "vue";

export default defineComponent({
    data() {
        return {
            // Dados da BD
            productSpec1: {} as Product,
            productSpec2: {} as Product,
        };
    },
    // A fazer antes de montar o componente
    async beforeMount() {
        // Carregar os dados do produto da BD
        this.productSpec1 = await (await fetchProduct(1)).data;
        this.productSpec2 = await (await fetchProduct(2)).data;
    },
    components: { ProductCard }
});
</script>