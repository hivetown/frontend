<template>
  <body>
    <div id="ocupa"></div>
  </body>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { onMounted, ref } from 'vue';
import Swal from 'sweetalert2';
import { cancelPayment } from '../api/consumers';
import { useStore } from '@/store';
const store = useStore();
const user2 = computed(() => store.state.user);

onMounted(async () => {
  let currentUrl = window.location.href;
  const pathSegments = currentUrl.split('/');
  const sessionId = pathSegments[5];
  if (user2.value && user2.value.user && user2.value.user.id) {
  cancelPayment(user2.value.user.id, sessionId);
  Swal.fire({
    icon: 'error',
    title: 'Pagamento cancelado',
    text: 'A encomenda não foi efetuada.',
    footer: '<a href="/carrinho">Voltar para o carrinho</a>',
  })
    .then((result) => {
      if (result.isConfirmed) {
        // Redirecionar para a página desejada
        window.location.href = '/'; // Substitua com a URL da página desejada
      }
    })
    .catch((error) => {
      // Lógica do clique fora do popup
      if (error === 'esc' || error === 'timer' || error === 'outside') {
        // Redirecionar para a página desejada
        window.location.href = '/'; // Substitua com a URL da página desejada
      }
    })
    .finally(() => {
      // Redirecionar para a página desejada
      window.location.href = '/'; // Substitua com a URL da página desejada
    });
}
});
</script>
<style scoped>
#ocupa {
  height: 650px;
}
</style>
