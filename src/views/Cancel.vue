<template>
  <body>
    <div id="ocupa"></div>
  </body>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { onMounted } from 'vue';
import Swal from 'sweetalert2';
import { cancelPayment } from '../api/consumers';
import { useStore } from '@/store';
import { useRouter } from 'vue-router';
const store = useStore();
const user2 = computed(() => store.state.user);
const router = useRouter();

onMounted(async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const sessionId = urlParams.get('session_id');
  if (user2.value && user2.value.user && user2.value.user.id && sessionId) {
    cancelPayment(user2.value.user.id, sessionId).then(() => {
      Swal.fire({
        icon: 'error',
        title: 'Pagamento cancelado',
        text: 'A encomenda não foi efetuada.',
        footer: '<a href="/carrinho">Voltar para o carrinho</a>',
      })
        .then((result) => {
          if (result.isConfirmed) {
            // Redirecionar para a página desejada
            router.push('/');
          }
        })
        .catch((error) => {
          // Lógica do clique fora do popup
          if (error === 'esc' || error === 'timer' || error === 'outside') {
            // Redirecionar para a página desejada
            router.push('/');
          }
        })
        .finally(() => {
          // Redirecionar para a página desejada
          router.push('/');
        });
    });
  }
});
</script>
<style scoped>
#ocupa {
  height: 650px;
}
</style>
