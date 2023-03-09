<template>
    <!-- Div principal -->
    <div class="parent mt-3" >

        <div class="px-3">
            <h3 class="dgreen-txt">Comparador</h3>
            <p class="grey-txt">A comparar <span>2</span> produtos</p>
        </div>

        <!-- TODO por automático -->
        <!-- Produtos a comparar -->
        <div class="d-flex mt-5 px-3" style="gap:20vh; border-bottom: 2px solid #eeeeee;">
          <ProductCard></ProductCard>
          <ProductCard></ProductCard>
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
    .spec-category-text{
        height: 5vh;
        background-color: #f3f3f3;
    }
</style>


<script setup lang="ts">
    import ProductCard from "@/components/ProductCard.vue";
    import CompareSpec from "@/components/CompareSpec.vue";
</script>
