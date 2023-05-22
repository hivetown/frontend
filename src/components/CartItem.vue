<template>
  <div>
    <div class="d-flex gap-4">
      <router-link to="/produto">
        <b-card class="prod-card" ref="productCard">
          <span class="position-absolute top-0 end-0"></span>
          <!-- <img src="https://placehold.jp/150x150.png" class="square-image"> -->
          <img src="mac.png" class="square-image" ref="productImage" />
        </b-card>
      </router-link>
      <b-card-text class="w-100" style="background-color: yellow;">
        <div>
          <div class="d-flex gap-2">
            <h5 ref="productName">Apple MacBook</h5>
            <p class="grey-txt" ref="productDetails">
              16GB RAM | 1TB | Placa gráfica
            </p>
          </div>
          <div class="d-flex gap-2">
            <h4 class="mb-3" ref="productPrice">999€</h4>
            <!-- O <p> seguinte apenas é adicionado quando o item tem outro preço e está agor em promoção -->
            <p class="mt-1 grey-txt text-decoration-line-through">
              1025€
            </p>
            <div class="d-flex ms-auto justify-content-end">
              <button
                type="button"
                class="btn btn-outline-secondary circle-btn"
                v-b-tooltip.hover
                title="Remover do carrinho"
              >
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

  </div>
</template>

<script >

import { loadStripe } from '@stripe/stripe-js';
import { defineComponent } from 'vue';
import { Stripe } from 'stripe';



export default defineComponent({
  data() {
    return {
      value: 3, // Example value from your form
   
    };
  },
 
  methods: {

    async submitOrder() {
        try {
          // await postOrderPayment(this.userId, this.shippingAddress);
          await postOrderPayment(1, 1261);
          console.log('Pedido enviado com sucesso!');
        } catch (error) {
          console.error(error);
          console.log('Erro ao enviar o pedido. Por favor, tente novamente mais tarde.');
        }
      },





  },
});
</script>
