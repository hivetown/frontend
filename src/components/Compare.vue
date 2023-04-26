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

        <!-- Características dos produtos a ser comparados -->
        <!-- TODO fazer com que alinhem as categorias e os fields e por o resto dos dados -->
        <div class="spec-to-compare">
            <div class="mt-3 d-flex align-items-center spec-category-text">
                <h5 class="p-3">Características</h5>
            </div>
        
            <div class="d-flex gap-5">
                <!-- <div>
                    <div v-for="(category, index) in product1Categories.items" :key="index">
                        <h6 class="p-3">{{ category.name }}</h6>                          
                        <tr v-for="(categoryFields, index) in fields1" :key="index" style="border-bottom: 2px solid #f3f3f3;">
                            <p v-for="field in categoryFields">
                                Nome: {{ field.field.name }}
                            </p>
                        </tr>
                    </div>
                </div> -->

            </div>
         
            <!-- Dados do produto 1 -->
            <div class="d-flex p-2" style="gap:30vh;">
                <!-- <CompareSpec></CompareSpec>
                <CompareSpec></CompareSpec> -->
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
import { fetchProduct, fetchProductCategories, fetchProductCategoriesFields } from "@/api";
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
            product1Categories: {},
            product2Categories: {},
            fields1: [],
            fields2: [],
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
        console.log("foi recarregado")
        const productSpec1 = await fetchProduct(this.product1Id);
        this.productSpec1 = productSpec1.data;
        this.product1Img = productSpec1.data.images[0];
        const productSpec2 = await fetchProduct(this.product2Id);
        this.productSpec2 = productSpec2.data;
        this.product2Img = productSpec2.data.images[0];


        // Carregar as categorias do produto
        // TODO - filtrar iguais e diferenças em destaque
        const product1Categories = await fetchProductCategories(this.product1Id);
        this.product1Categories = product1Categories.data;

        const product2Categories = await fetchProductCategories(this.product2Id);
        this.product2Categories = product2Categories.data;

        try {
            for (const categoria of this.product1Categories.items) {
                const response = await fetchProductCategoriesFields(this.product1Id, categoria.id);
                this.fields1.push(response.data.items);
            }
            for (const categoria of this.product2Categories.items) {
                const response = await fetchProductCategoriesFields(this.product2Id, categoria.id);
                this.fields2.push(response.data.items);
            }
        } catch (error) {
            console.log("Erro: " + error);
        }
    },
    components: { ProductCard }
});
</script>