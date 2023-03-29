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
    <button @click="handleFunction">Checkout</button>

  </div>
</template>

<script>

import { loadStripe } from '@stripe/stripe-js';
import { defineComponent } from 'vue';
import { Stripe } from 'stripe';


export default defineComponent({
  data() {
    return {
      value: 3, // Example value from your form
    };
  },
  created() {
    // Load the Stripe script
    this.stripePromise = loadStripe('pk_test_51MhZqeHDTqePW6LHc3kVGIHMC0vifWpxLpzyQtw2fpcjA2vfVSY45sPxR3MknV53X4NLXSsmXlzCSGdO8OgRY2kq002okkihO7');
  },
  methods: {
async handleFunction() {
  const { product, price } = await this.handleButtonClick();
  await this.handleButtonClick2(price);
},
//adiciona os elementos do carrinho ao stripe
async handleButtonClick() {
  const stripe = Stripe('sk_test_51MhZqeHDTqePW6LHlfCQVPTdj9maImhHRDGXhbDuk6r9CCHdHQkh9Spb2t3hbQinmnvSDArC7j4h6aYktxyXZaT200u2amKFwo');
  const product = await stripe.products.create({
    name: this.$refs.productName.innerText,
    description: this.$refs.productDetails.innerText,
    images: [this.$refs.productImage.src],
    metadata: {
      maker: 'mediamarkt',
      url: 'https://google.com',
      id: '1313',
    },
  });
  const price = await stripe.prices.create({
    unit_amount: (parseInt(this.$refs.productPrice.innerText) * 100),
    currency: 'eur',
    product: product.id,
  });
  console.log(product, price);
  return { product, price }; // return both product and price values
},
//paga a encomenda anterior
async handleButtonClick2(price) {
  const stripe = await loadStripe('pk_test_51MhZqeHDTqePW6LHc3kVGIHMC0vifWpxLpzyQtw2fpcjA2vfVSY45sPxR3MknV53X4NLXSsmXlzCSGdO8OgRY2kq002okkihO7');
  const { error } = await stripe.redirectToCheckout({
    mode: "payment",
    lineItems: [
      {
        price: price.id, // use the price id from handleButtonClick() function
        quantity: parseInt(this.value),
      },
    ],
    customerEmail: "customer@example.com",
    shippingAddressCollection: {
      allowedCountries: ["US", "CA", "PT", "FR"],
    },
    billingAddressCollection: "required",
    successUrl: "https://your-website.com/success",
    cancelUrl: "https://your-website.com/cancel",
  });
  if (error) {
    console.error(error.message);
  }
},






  },
});
</script>
