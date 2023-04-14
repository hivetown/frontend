<template>
   <div class="d-flex gap-4">
       <router-link to="/produto">
           <b-card class="prod-card">
               <span class="position-absolute top-0 end-0">
               </span>
               <!-- <img src="https://placehold.jp/150x150.png" class="square-image"> -->
               <img src="mac.png" class="square-image">
           </b-card>
       </router-link>
       <b-card-text class="w-100" style="background-color: yellow;">
           <div>
                <div class="d-flex gap-2"></div>
                    <p>{{ productId }}</p>
                    <h5>{{ productTitle }}</h5>
                    <p class="grey-txt">{{ productDescription }}</p>
                    <div class="d-flex gap-2">
                        <h4 class="mb-3">999€</h4>
                    <!-- O <p> seguinte apenas é adicionado quando o item tem outro preço e está agor em promoção -->
                    <p class="mt-1 grey-txt text-decoration-line-through">1025€</p>
                    <div class="d-flex ms-auto justify-content-end">
                        <button type="button" class="btn btn-outline-secondary circle-btn" v-b-tooltip.hover title="Remover do carrinho">
                            <i class="bi bi-x-lg"></i>
                        </button>
                    </div>
               </div>
           </div>
       </b-card-text>
   </div>


  <div>
    <label for="demo-sb">Spin Button</label>
    <b-form-spinbutton id="demo-sb" v-model="value" min="1" max="100"></b-form-spinbutton>
    <p>Value: {{ value }}</p>
  </div>

</template>

<script>
export default {
    data() {
      return {
        value: 50
      }
    },

    props: {
      productId: {
        type: String,
        required: true,
      },
      productTitle: {
        type: String,
        required: true,
      },
      productDescription: {
        type: String,
        required: true//,
      }, 
      // productImage: {
      //   type: String,
      //   required: true,
      // },
      // productPrice: {
      //   type: Array,
      //   required: true,
      // },
    }
  }
</script>