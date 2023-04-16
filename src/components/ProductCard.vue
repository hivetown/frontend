<template>
    <div class="mb-5 product">
        <!-- Imagem do produto -->
        <b-card class="prod-card">
            <span class="position-absolute fav">
                <i v-bind:class="[isFavorite ? 'bi-heart-fill' : 'bi-heart']" 
                    v-on:click="isFavorite = !isFavorite">
                </i>
            </span>
            <router-link :to="'/products/' + productId">
                <img :src="productImage" class="square-image">
            </router-link>
        </b-card>

        <!-- Informação do produto -->
        <b-card-text>
            <div>
                <!-- Categoria -->
                <!-- <div class="rounded-pill text-center mt-3 mb-3 w-50 prod-category">{{ productCategory.name}}</div> -->
                <div v-if="productCategory && productCategory.name" class="rounded-pill text-center mt-3 mb-3 w-50 prod-category">{{ productCategory.name }}</div>

                <h5>{{ productTitle }}</h5>
                <p class="grey-txt mt-3">{{productDescription}}</p>
                <div class="d-flex gap-2">
                    <h4 class="mb-3">
                        {{ productPrice && productPrice.length > 1 ? 
                           productPrice[0] + '€ - ' + productPrice[1] + '€' : '' }}
                    </h4>
                    <!-- TODO, fazer com que seja  -->
                    <!-- <p class="mt-1 grey-txt text-decoration-line-through">1025€</p> -->
                </div>
                
                <!-- Botões -->
                <div class="d-flex gap-2"> 
                    <button type="button" class="btn btn-outline-secondary circle-btn" 
                            v-b-tooltip.hover title="Adicionar ao carrinho">
                            <i class="bi bi-cart"></i>
                    </button>
                    <router-link :to="'/products/' + productId">
                        <button type="button" class="btn btn-outline-secondary circle-btn" 
                                v-b-tooltip.hover title="Ver produto">
                                <i class="bi bi-eye"></i>
                        </button>
                    </router-link>
                    <button type="button" class="btn btn-outline-secondary circle-btn" 
                            v-b-tooltip.hover title="Comparar produto"
                            @click="addToCompare(productId)">
                            <i class="bi bi-arrow-left-right"></i>
                    </button>
                    <!-- <button @click="sendId">Enviar ID</button> -->
                </div>
            
            </div>
        </b-card-text>
    </div>

    <!-- <CompareBanner :product-id="selectedId"></CompareBanner>  -->

</template>

<style>
    .product{
        max-width: 18%; 
    }

    .prod-card{
        background-color:#f3f3f3 !important;
        border-radius: 1.3em !important;
        cursor: pointer;
    }

    .prod-card .card-body{
        padding: 0 !important;
    }

    .square-image {
        width: 100%;
        height: 100%;
        object-fit: cover;  /* Ajusta a imagem para preencher todo o espaço disponível */
        border-radius: 1.3em !important;
    }

    .fav {
        right: 4%;
        top:4%;
        width: 3vh;
        height: 3vh;
        background-color: #f3f3f3;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .fav i {
        color: #DC6942;
        cursor: pointer;
    }

    .prod-category{
        background-color:#9DC88D; /* A cor irá variar de acordo com a categoria */
        cursor: pointer;
    }
</style>

<script lang="ts">
import { fetchProductCategories } from "@/api";
import CompareBanner from "@/components/CompareBanner.vue";
// import { Product, Category } from "@/types";

    export default {
        data() {
            return {
                isFavorite: false, // Se o produto está nos favoritos
                productCategory: null, // Categoria do produto
                selectedId: null, // Id do produto selecionado
            };
        },
        props: {
            productId: {
                type: Number,
                required: true,
            },
            productTitle: {
                type: String,
                required: true,
            },
            productDescription: {
                type: String,
                required: true,
            }, 
            productImage: {
                type: String,
                required: true,
            },
            productPrice: {
                type: Array,
                required: true,
            },
        },
        methods: {
            addToCompare(id) {
                this.selectedId = id;
                console.log("id: " + id);
                // TODO corrigir o emit para mandar o id para o categorias produto
                this.$emit('send-id', id);
            },
            // sendId(){
            //     this.$emit('send-id', this.productId);
            // }
        },
        async beforeMount(){
            if(this.productId != undefined){
                const productCategory = await fetchProductCategories(this.productId);
                this.productCategory = productCategory.data.items[0];
            }
            // console.log("categoria" + JSON.stringify(this.productCategory) + "id: " + this.productId);

        }
    };
</script>