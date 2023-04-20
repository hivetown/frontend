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
       <b-card-text class="w-100" style="background-color:;">
           <div>
                <div class="d-flex gap-2"></div>
                    <!--<p>{{ productId }}</p>-->
                    <h5>{{ C }}</h5>
                    <p class="grey-txt">{{ productDescription }}</p>
                    <div class="d-flex gap-2">
                        <h4 class="mb-3">999€</h4>
                    <!-- O <p> seguinte apenas é adicionado quando o item tem outro preço e está agor em promoção -->
                    <p class="mt-1 grey-txt text-decoration-line-through">1025€</p>

                    <div class="d-flex ms-auto justify-content-center">
                      <div class="mt-3">Quantidade: </div>
                      <b-col col lg="5">
                        <b-form-select v-model="selected" :options="options" size="sm" class="mt-3" @change=""></b-form-select>
                      </b-col>
                    </div>

                    <div class="d-flex ms-auto justify-content-end">
                        <button type="button" class="btn btn-outline-secondary circle-btn" v-b-tooltip.hover title="Remover do carrinho">
                            <i class="bi bi-x-lg"></i>
                        </button>
                    </div>
               </div>
           </div>
       </b-card-text>
   </div>

</template>

<script lang="ts">
import { CartItem } from '@types/interfaces';

export default {
    data() {
        return {
          selected: 1,
          options: [
            { value: 1, text: '1' },
            { value: 2, text: '2' },
            { value: 3, text: '3' },
            { value: 4, text: '4' },
            { value: 5, text: '5' },
            { value: 6, text: '6' },
            { value: 7, text: '7' },
            { value: 8, text: '8' },
            { value: 9, text: '9' },
            { value: 10, text: '10' },
          ],
        }
      },


//      props: {
//        cartItem: {
//          type: CartItem,
//          required: true
//        }
//      }

  }
</script>