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
        <!-- <div class="d-flex mt-5 px-3" style="gap:20vh; border-bottom: 2px solid #eeeeee; background-color:;"> -->
        <div class="d-flex mt-5 px-3" style="gap:20vh;">
            <ProductCard style="margin-left: 25vh;" :productTitle="productSpec1.name" 
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
        <div class="spec-to-compare">
            <div class="mt-3 mb-3 d-flex align-items-center spec-category-text">
                <h5 class="p-3">Características</h5>
            </div>
            <div>
                <div class="">
                    <!-- Field name -->
                    <div v-for="(field, index) in fieldsTotais" :key="index" class="mb-3 parent" style="border-bottom: 1px solid #eeeeee;">
                        <div>
                            <div class="d-flex" style="gap:12vh;" >
                                <div v-for="(fs, fsIndex) in field[1]" :key="fsIndex" class="mb-4 d-flex gap-4">
                                    <div v-if="fsIndex === 0">
                                        <div v-for="f in fs" style="background-color: ; width: 25vh;">
                                            <span style="font-weight: bold">{{ f.field.name }}:</span>
                                        </div>
                                    </div>
                                    <div class="" style="background-color: ; width: 25vh;">
                                        <div v-for="f in fs" :key="f.field.id" class="d-flex">
                                            <div style="background-color: ; min-width: 25vh;">
                                                {{ f.value }}
                                                {{ f.field.unit }}
                                            </div>
                                            <div v-if="field[0].length < 2">
                                                <div style="background-color: ; width: 25vh; display: flex; justify-content: center;">
                                                    <span>-</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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

            categoriasTotais: {},
            fieldsTotais: {}
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
        // console.log("Dados do 1: " + JSON.stringify(this.productSpec1))
        this.product1Img = productSpec1.data.images[0];
        const productSpec2 = await fetchProduct(this.product2Id);
        this.productSpec2 = productSpec2.data;
        this.product2Img = productSpec2.data.images[0];


        // Carregar as categorias do produto
        // TODO - filtrar iguais e diferenças em destaque
        const product1Categories = await fetchProductCategories(this.product1Id);
        this.product1Categories = product1Categories.data;
        // console.log("Categorias do 1: " + JSON.stringify(this.product1Categories))

        const product2Categories = await fetchProductCategories(this.product2Id);
        this.product2Categories = product2Categories.data;
        // console.log("Categorias do 2: " + JSON.stringify(this.product2Categories))

        try {
            for (const categoria of this.product1Categories.items) {
                if (!(categoria.id in this.categoriasTotais)) {
                    this.categoriasTotais[categoria.id] = [1];
                }else{
                    this.categoriasTotais[categoria.id].push([1]);
                }
                const response = await fetchProductCategoriesFields(this.product1Id, categoria.id);
                this.fields1.push([categoria.id,response.data.items]);
            }
            // console.log("Fields do 1: " + JSON.stringify(this.fields1))
            for (const categoria of this.product2Categories.items) {
                // Junta as categorias dos dois produtos que são iguais
                if (!(categoria.id in this.categoriasTotais)) {
                    this.categoriasTotais[categoria.id] = [2];
                } else {
                    this.categoriasTotais[categoria.id].push([2]);
                }
                const response = await fetchProductCategoriesFields(this.product2Id, categoria.id);
                this.fields2.push([categoria.id, response.data.items]);
            }
            console.log("Fields do 2: " + JSON.stringify(this.fields2))
        } catch (error) {
            console.log("Erro: " + error);
        }
        // console.log("categoriasTotais: " + JSON.stringify(this.categoriasTotais))
        // Para cada categoria das categorias totais, ver os fields dela por produto
        for (const [cat, prod] of Object.entries(this.categoriasTotais)) {
            // console.log(`cat: ${cat}, prod: ${prod}`);
            for (const field of this.fields1) {
                if (field[0] == cat) {
                     if (!(cat in this.fieldsTotais)) {
                        this.fieldsTotais[cat] = [[1], [field[1]]];
                    } else {
                        this.fieldsTotais[cat][0].push(1)
                        this.fieldsTotais[cat][1].push(field[1])
                    }
                    // console.log(field[0], JSON.stringify(field[1]));
                }
                // console.log(field[0], JSON.stringify(field[1]));
            }
            for (const field of this.fields2) {
                if (field[0] == cat) {
                    if (!(cat in this.fieldsTotais)) {
                        this.fieldsTotais[cat] = [[2], [field[1]]];
                    } else {
                        this.fieldsTotais[cat][0].push(2)
                        // for(const f of this.fieldsTotais[cat][1]){
                        //     console.log("f: "+JSON.stringify(f))
                        //     if(!(this.fieldsTotais[cat][1].includes(f.id))){
                        //         this.fieldsTotais[cat][1].push([field[1]])
                        //     }
                        // }
                        this.fieldsTotais[cat][1].push(field[1])
                        // console.log("meh "+this.fieldsTotais[cat])
                        // this.fieldsTotais[cat][0].unshift(2);
                    }
                    // console.log(field[0], JSON.stringify(field[1]));
                }
                // console.log(field[0], JSON.stringify(field[1]));
            }
        }
        for (const [cat, prod] of Object.entries(this.fieldsTotais)) {
            // console.log(`cat: ${cat}, prod: ${prod[0]}` + ` fields: ${JSON.stringify(prod[1])}`);
            // console.log(`cat: ${cat}, prod: ${JSON.stringify(prod)}`);
        }
        // console.log("fieldsTotais: " + JSON.stringify(this.fieldsTotais))
    },
    components: { ProductCard }
});
</script>