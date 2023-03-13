<template>
    
    <!-- TODO fazer com que os dados sejam automáticos -->
    <div class="mb-5 product">
        <router-link to="/produto">
            <b-card class="prod-card">
                <span class="position-absolute top-0 end-0 p-3 fav">
                    <i class="bi bi-heart" style="color: #DC6942; cursor:pointer;"></i>
                </span>
                <img :src="productImage" class="square-image">
            </b-card>
        </router-link>

        <b-card-text>
            <div>
                <!-- Dados do produto -->
                <div class="rounded-pill text-center mt-3 mb-3 w-50 prod-category">Tecnologia</div>
                <h5>{{ productTitle }}</h5>
                <p class="grey-txt mt-3">{{productDescription}}</p>
                <div class="d-flex gap-2">
                    <h4 class="mb-3">999€</h4>
                    <!-- O <p> seguinte apenas é adicionado quando o item tem outro preço e está agor em promoção -->
                    <p class="mt-1 grey-txt text-decoration-line-through">1025€</p>
                </div>
                
                <!-- Botões -->
                <div class="d-flex gap-2"> 
                    <button type="button" class="btn btn-outline-secondary circle-btn" 
                            v-b-tooltip.hover title="Adicionar ao carrinho">
                            <i class="bi bi-cart"></i>
                    </button>
                    <router-link to="/produto">
                        <button type="button" class="btn btn-outline-secondary circle-btn" 
                                v-b-tooltip.hover title="Ver produto">
                                <i class="bi bi-eye"></i>
                        </button>
                    </router-link>
                    <button type="button" class="btn btn-outline-secondary circle-btn" 
                            v-b-tooltip.hover title="Comparar produto">
                            <i class="bi bi-arrow-left-right"></i>
                    </button>
                </div>
            
            </div>
        </b-card-text>
    </div>

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

    .square-image {
        width: 100%;
        height: 100%;
        object-fit: cover; /* Ajusta a imagem para preencher todo o espaço disponível */
    }

    .prod-category{
        background-color:#9DC88D; /* A cor irá variar de acordo com a categoria */
        cursor: pointer;
    }
</style>

<script>
export default {
    props: {
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
    },
};
</script>