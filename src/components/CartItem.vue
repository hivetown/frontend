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
  //this.payment();
 // this.check();
 const products = await this.handleButtonClick();
 await this.handleButtonClick2(products);
},

//adiciona os elementos do carrinho ao stripe
async handleButtonClick() {
  const stripe = Stripe('sk_test_51MhZqeHDTqePW6LHlfCQVPTdj9maImhHRDGXhbDuk6r9CCHdHQkh9Spb2t3hbQinmnvSDArC7j4h6aYktxyXZaT200u2amKFwo');
  const products = [];
//TODO por aqui um for que corre todos os produtos do carrinho a adicionar
  // Adiciona o primeiro produto
  const product1 = await stripe.products.create({
    name: "IPHONE 3342",
    description: "girinho",
    images: ["https://i.imgur.com/o2fKskJ.jpg"],
    metadata: {
      maker: 'mediamarkt',
      url: 'https://google.com',
      id: '1313',
    },
  });
  const price1 = await stripe.prices.create({
    unit_amount: (100 * 100),
    currency: 'eur',
    product: product1.id,
    price: product1.price,
  });
 // console.log(product1, price1);
  
  // Adiciona o segundo produto
  const product2 = await stripe.products.create({
    name: "Iphone x",
    description: "iphone preto muito giro",
    images: ["https://i.imgur.com/GQnIUfs.jpg"],
    metadata: {
      maker: 'mediamarkt',
      url: 'https://google.com',
      id: '1314',
    },
  });
  const price2 = await stripe.prices.create({
    unit_amount: (145 * 100),
    currency: 'eur',
    product: product2.id,
    price: product2.price,
  });
   // Adiciona o terceiro produto
   const product3 = await stripe.products.create({
    name: "Iphone x",
    description: "iphone preto muito giro",
    images: ["https://i.imgur.com/GQnIUfs.jpg"],
    metadata: {
      maker: 'mediamarkt',
      url: 'https://google.com',
      id: '1314',
    },
  });
  const price3 = await stripe.prices.create({
    unit_amount: (145 * 100),
    currency: 'eur',
    product: product2.id,
    price: product2.price,
  });
 // console.log(product2, price2);

  // Adiciona os produtos ao array
  products.push({ product: product1, price: price1 });
  products.push({ product: product2, price: price2 });
  products.push({ product: product3, price: price3 });



  console.log(products);

  return products;
},



//paga a encomenda anterior
async handleButtonClick2(products) {
  const stripe = await loadStripe('pk_test_51MhZqeHDTqePW6LHc3kVGIHMC0vifWpxLpzyQtw2fpcjA2vfVSY45sPxR3MknV53X4NLXSsmXlzCSGdO8OgRY2kq002okkihO7');
  
  const lineItems = products.map(product => {
    return {
      price: product.price.id,
      quantity: 1,
    };
  });

  const { error } = await stripe.redirectToCheckout({
    mode: "payment",
    lineItems: lineItems,
    customerEmail: "customer@example.com",
    shippingAddressCollection: {
      allowedCountries: ["US", "CA", "PT", "FR", "ES"], //TODO ver mais que paises
    },
    billingAddressCollection: "required",
    successUrl: "http://localhost:5173/success",
    cancelUrl: "http://localhost:5173/carrinho",
  });
  
  if (error) {
    console.error(error.message);
  }
},


  },
});
</script>
