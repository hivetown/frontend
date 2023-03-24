<template>
  <div>
  <!--TODO por este botao na conta do bruno-->
  <p>Este botao e apenas de teste, foi apenas para testar para pagamentos e endereços, vai ser o que estiver no carrinho do bruno e nao esta pagina em si</p>
  <button @click="handleButtonClick">Checkout</button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { loadStripe } from '@stripe/stripe-js';

export default defineComponent({
  methods: {
    async handleButtonClick() {
      const stripe = await loadStripe('pk_test_51MhZqeHDTqePW6LHc3kVGIHMC0vifWpxLpzyQtw2fpcjA2vfVSY45sPxR3MknV53X4NLXSsmXlzCSGdO8OgRY2kq002okkihO7');

      // Collect shipping and address information
      const { error } = await stripe.redirectToCheckout({
        mode: 'payment',
        lineItems: [
          //TODO adicionar aqui os itens das encomendas
            { price: 'price_1Mm1UTHDTqePW6LH0Fvr1LMb', quantity: 1 },
          ],
          //TODO por aqui o mail da conta de quel fez a encomenda
        customerEmail: 'customer@example.com',
        shippingAddressCollection: {
          allowedCountries: ['US', 'CA', 'PT', 'FR'],
        },
        billingAddressCollection: 'required',
        //TODO mudar os links
        successUrl: 'https://your-website.com/success',
        cancelUrl: 'https://your-website.com/cancel',
      });

      if (error) {
        console.error(error.message);
      }
    },
  },
});
</script>
