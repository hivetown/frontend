<template>
  <title>Thanks for your order!</title>
  <body>
    <section>
      <h1>Pagamento efetuado</h1>
      <i class="bi bi-cart-check"></i>
      <br />
      <p>
        A encomenda
        <router-link :to="`${endereco}`">{{ orderId }} </router-link>
        encontra-se paga.
      </p>
      <p>
        Acompanhe o
        <router-link to="/encomendas">
          progresso das suas encomendas</router-link
        >.
      </p>
      <p>Obrigado pela sua compra.</p>
    </section>
  </body>
</template>

<script lang="ts" setup>
import Swal from 'sweetalert2';
let currentUrl = window.location.href;
const pathSegments = currentUrl.split('/');
const orderId = pathSegments[4];

var endereco = '/encomenda/id' + orderId;
Swal.fire({
  icon: 'success',
  showConfirmButton: false,
  timer: 1500,
});
</script>

<style scoped>
h1 {
  font-family: 'DM Serif Display';
}
body {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
    'Helvetica Neue', 'Ubuntu', sans-serif;
  height: 80vh;
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
section {
  background: beige;
  display: flex;
  flex-direction: column;
  width: 800px;
  height: 512px;
  border: 2px solid #e5b455;
  border-radius: 6px;
  justify-content: space-between;
}
.product {
  display: flex;
}
.description {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
p {
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 20px;
  letter-spacing: -0.154px;
  color: #242d60;
  height: 100%;
  width: 100%;
  text-align: center;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}
img {
  border-radius: 6px;
  margin: 10px;
  width: 54px;
  height: 57px;
}
h3,
h5 {
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.154px;
  color: #242d60;
  margin: 0;
}
h5 {
  opacity: 0.5;
}
h1 {
  text-align: center;
  margin-top: 20px;
}
i {
  text-align: center;
  margin-top: 20px;
  font-size: 80px;
}
button {
  height: 36px;
  background: #818aaf;
  color: white;
  width: 100%;
  font-size: 14px;
  border: 0;
  font-weight: 500;
  cursor: pointer;
  letter-spacing: 0.6;
  border-radius: 0 0 6px 6px;
  transition: all 0.2s ease;
  box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
}
button:hover {
  opacity: 0.8;
}
</style>
