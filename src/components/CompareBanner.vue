<template>
    <!-- Main div do comparador -->
    <div v-if="!showModal" class="compare-banner d-flex align-items-center">

        <!-- Conteúdo da div do comparador -->
        <div class="parent d-flex justify-content-center align-items-center gap-4">
            
            <div class="d-flex flex-column">
                <h5 class="dgreen-txt">Comparador
                    <span v-show="productsLoadedAmount === 1" class="badge bg-secondary" style="border-radius: 100%;">1</span>
                    <span v-show="productsLoadedAmount === 2" class="badge bg-secondary" >2</span>
                </h5>
                <p v-show="productsLoadedAmount < 2" class="grey-txt">Ainda pode adicionar 
                    <span v-show="productsLoadedAmount === 0">2 produtos</span> 
                    <span v-show="productsLoadedAmount === 1">1 produto</span> 
                </p>
                <p v-show="productsLoadedAmount === 2">
                    Selecionou o máximo de produtos
                </p>

            </div>

            <div class="d-flex gap-4 ">
                <!-- Produto 1 -->
                <div>
                    <div style="position: relative;" class="prod-container d-flex justify-content-center align-items-center">
                        <i id="img1" class="bi bi-x-lg" style="position: absolute; color:red;" @click="removeItem($event.target.id)"></i>
                        <img v-if="product1Loaded" class="square-image" :src="prod1Img.url" :alt="prod1Img.alt">
                    </div>
                </div>
                <!-- Produto 2 -->
                <div>
                    <div class="prod-container d-flex justify-content-center align-items-center">
                        <i id="img2" class="bi bi-x-lg" style="position: absolute; color:red;" @click="removeItem($event.target.id)"></i>
                        <img v-if="product2Loaded" class="square-image" :src="prod2Img.url" :alt="prod2Img.alt">
                    </div>
                </div>
            </div>

            <div class="d-flex flex-column justify-content-center align-items-center">
                <!-- Botão de comparar -->
                <button v-if="productsLoadedAmount === 2" type="button" 
                        class="btn btn-secondary rounded-pill" 
                        v-b-tooltip.hover title="Comparar produto"
                        @click="openModal(product1.id, product2.id)">
                    <i style="color:#eeeeee;" class="bi bi-arrow-left-right"></i> Comparar
                </button>
                <a href="#" id="limpar" @click="removeItem($event.target.id)">Limpar tudo</a>
            </div>
            
        </div>

    </div>

    <!-- Overlay com a comparação após clicar em comparar -->
    <div>
        <b-modal v-model="showModal" size="xl" id="modal-center" centered scrollable hide-footer>
            <Compare :product1Id="product1.id" :product2Id="product2.id"  :key="showModal"/> 
        </b-modal>
    </div>

</template>
  
<style>
    .compare-banner {
        background-color: #f3f3f3;
        height: 15vh;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 10000;
    }
  
    .prod-container {
        background-color: #c0c0c0;
        height: 10vh;
        width: 10vh;
        border: 1px dashed #f3f3f3;
        border-radius: 0.5em;
    }
  
    .prod-container i{
        font-size: 1.5em;
        color: #eeeeee;
    }

    .modal-content {
        height: 80vh;
    }

    .square-image {
        border-radius: 0.5em !important;
    }

</style>
  
<script lang="ts">

    import { ref } from 'vue';
    import Compare from "@/components/Compare.vue";
    import { Product } from "@/types";
    import { fetchProduct } from "@/api";

    const showModal = ref(false);
    const openModal = (id1: number, id2: number) => {
        showModal.value = true;
    };

    export default {
        data() {
            return {
                productsLoadedAmount: 0,
                product1Loaded: false,
                product2Loaded: false,
                product1: {} as Product[],
                product2: {} as Product[],
                prod1Img: "",
                prod2Img: "",

                id1: null,
                id2: null,  
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
        components: {
            Compare,
        },
        setup() {
            return {
                showModal,
                openModal,
            };
        },
        methods: {
            removeItem(elemento) {
                if (elemento === "img1") {
                    this.product1Loaded = false;
                    localStorage.setItem("compareItem1Id", null);
                    document.getElementById(elemento).style.display = "none";
                } 
                else if(elemento === "img2"){
                    this.product2Loaded = false;
                    localStorage.setItem("compareItem2Id", null);
                    document.getElementById(elemento).style.display = "none";
                }
                else if (elemento === "limpar") {
                    this.product1Loaded = false;
                    this.product2Loaded = false;
                    localStorage.setItem("compareItem1Id", null);
                    localStorage.setItem("compareItem2Id", null);
                    document.getElementById("img1").style.display = "none";
                    document.getElementById("img2").style.display = "none";
                }
                this.productsLoadedAmount--;
            },
            async loadProduct(newId: number, imgId: string, product: any, prodImg: string) {
                if (newId) {
                    const imgElem = document.getElementById(imgId);
                    if (imgElem.style.display === "none") {
                        imgElem.style.display = "block";
                        const productData = await fetchProduct(newId);
                        product = productData.data;
                        if (imgId === "img1") {
                            this.product1 = product;
                            this.prod1Img = product.images[0];
                            this.product1Loaded = true;
                        } else {
                            this.product2 = product;
                            this.prod2Img = product.images[0];
                            this.product2Loaded = true;
                        }
                        if (this.productsLoadedAmount <= 2) {
                            this.productsLoadedAmount++;
                        }
                    }
                }
            }
        },
        watch: {
            product1Id: async function (newId: number) {
                await this.loadProduct(newId, "img1", this.product1, this.prod1Img);
            },
            product2Id: async function (newId: number) {
                await this.loadProduct(newId, "img2", this.product2, this.prod2Img);
            },
        },

        async beforeMount() {
            this.product1.id = 1;
            this.product2.id = 2;

            // Primeiro produto
            const prod1Id = localStorage.getItem("compareItem1Id");
            const product1 = await fetchProduct(this.product1Id);
            this.product1 = product1.data;
            this.prod1Img = this.product1.images[0];
            if (this.productsLoadedAmount <= 2) {
                this.productsLoadedAmount++;
            }
            this.product1Loaded = true;	
            document.getElementById("img2").style.display = "none";
        },
    };
</script>
