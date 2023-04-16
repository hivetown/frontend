<template>
    <!-- Main div do comparador -->
    <div v-if="!showModal" class="compare-banner d-flex align-items-center">

        <!-- Conteúdo da div do comparador -->
        <div class="parent d-flex justify-content-center align-items-center gap-4">
            
            <div class="d-flex flex-column">
                <h5 class="dgreen-txt">Comparador <span>(2)</span></h5>
                <p class="grey-txt">Ainda podes adicionar <span>1</span> produto</p>
            </div>

            <div class="d-flex gap-4 ">
                <!-- {{ product1.images[0].url }} -->
                <div class="prod-container d-flex justify-content-center align-items-center">
                    <!-- <i class="bi bi-x-lg"></i> -->
                    <img class="square-image" :src="prod1Img.url" :alt="prod1Img.alt">
                </div>
                <!-- {{ product1.name }} -->
                <div class="prod-container d-flex justify-content-center align-items-center">
                    <!-- <i class="bi bi-x-lg"></i> -->
                    <img class="square-image" :src="prod2Img.url" :alt="prod2Img.alt">
                </div>
                <!-- {{ product2.name }} -->
            </div>

            <div class="d-flex flex-column justify-content-center align-items-center">
                <button type="button" 
                        class="btn btn-secondary rounded-pill" 
                        v-b-tooltip.hover title="Comparar produto"
                        @click="openModal">
                    <i class="bi bi-arrow-left-right"></i> Comparar
                </button>
                <a href="#">Limpar tudo</a>
            </div>
            
        </div>

    </div>

    <!-- Overlay com a comparação após clicar em comparar -->
    <div>
        <!-- TODO corrigir botões do modal -->
        <b-modal v-model="showModal" size="xl" id="modal-center" centered scrollable>
            <Compare/>
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
  
    .prod-container i {
        font-size: 1.5em;
        color: #eeeeee;
    }

    .modal-content {
        height: 80vh;
    }

</style>
  
<!-- <script setup lang="ts">

import { ref } from 'vue';
import Compare from "@/components/Compare.vue";

const showModal = ref(false);

const openModal = () => {
    showModal.value = true;
};
</script> -->
<script lang="ts">

import { ref } from 'vue';
import Compare from "@/components/Compare.vue";
import { Product } from "@/types";
import { fetchProduct } from "@/api";

const showModal = ref(false);

const openModal = () => {
    showModal.value = true;
};

export default {
    data() {
        return {
            product1: {} as Product[],
            product2: {} as Product[],
            prod1Img: "",
            prod2Img: "",
        };
    },
    // props: {
    //     productId: {
    //         type: Number,
    //         required: true,
    //     },
    // },
    components: {
        Compare,
    },
    setup() {
        return {
            showModal,
            openModal,
        };
    },
    async beforeMount() {
        // Primeiro produto
        const product1 = await fetchProduct(1);
        this.product1 = product1.data;
        this.prod1Img = this.product1.images[0];
        // console.log("Produto 1: " + JSON.stringify(this.product1))

        // Segundo produto
        const product2 = await fetchProduct(2);
        this.product2 = product2.data;
        this.prod2Img = this.product2.images[0];
        // console.log("Produto 2: " + JSON.stringify(this.product2))
    },
};
</script>
