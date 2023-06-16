<template>
  <div class="form-address">
    <h4 class="titulo">Selecione o endereço de envio</h4>
    <div class="form-check form-check-inline">
      <br />
      <h5>Endereços guardados</h5>
      <div class="row" v-if="addresses && addresses.items">
        <div
          class="col-sm-6"
          v-for="(address, index) in addresses.items"
          :key="index"
        >
          <!-- Utilize classes do Bootstrap para criar uma grade de duas colunas -->
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              :value="address.id"
              v-model="selectedItems"
              @change="checkButtonDisabled"
            />
            <label class="form-check-label" for="radio{{ index + 1 }}">
              <div class="border p-3" id="caixa">
                <!-- Adicione a classe "border" para criar a borda e "p-3" para adicionar espaçamento interno -->
                <p>
                  {{ address['street'] }}, numero {{ address['number'] }}, andar
                  {{ address['floor'] }}
                </p>
                <p>
                  {{ address['zipCode'] }},
                  {{ address['parish'] }}
                </p>
                <p>Distrito de {{ address['district'] }}</p>
                <p>
                  {{ address['latitude'] }},
                  {{ address['longitude'] }}
                </p>
              </div>
            </label>
          </div>
        </div>
      </div>
      <p v-else>Ainda não existem endereços salvos!</p>
    </div>
    <div>
      <div>
        <button
          id="btnExtende"
          class="btn btn-outline-secondary btn-sm"
          @click="collapsed = !collapsed"
        >
          {{ collapsed ? 'Adicionar novo endereco ' : 'Minimizar' }}
        </button>
        <div v-if="!collapsed">
          <!-- Your content here -->
          <AddAddress></AddAddress>
        </div>
      </div>
      <br />
    </div>
    <div>
      <h4 class="titulo">Resumo do carrinho</h4>
      <div class="border p-3" id="caixa2">
        <span v-if="!cart?.items">O carrinho está vazio</span>
        <div
          v-else
          v-for="(cartItem, index) in cart.items"
          :key="index"
          style="white-space: nowrap"
        >
          <router-link to="/carrinho">
            <div style="display: inline-block">
              >{{ cartItem['quantity'] }}X
              {{ cartItem.producerProduct.productSpec!.name }};
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div id="finalizar">
      <button
        id="btn"
        @click="submitOrder"
        type="button"
        class="btn btn-outline-secondary btn-sm"
        style="text-align: center"
        :disabled="isButtonDisabled"
      >
        Finalizar a compra
      </button>
      <div id="aviso" v-if="isButtonDisabled">
        *Selecione pelo menos um endereço para finalizar a encomenda
      </div>
    </div>
    <br />
  </div>
</template>

<script setup lang="ts">
import Swal from 'sweetalert2';
import { onMounted, ref, computed } from 'vue';
import { getAddresses, postOrderPayment, getCart } from '../api/cart';
import { useStore } from '@/store';
import AddAddress from '../components/AddAddress.vue';
import { Address, BaseItems, CartItem } from '@/types';
const selectedItems = ref([]); // Variável de dados para armazenar os checkboxes selecionados
const isButtonDisabled = ref(true); // Variável de dados para controlar o estado do botão
const store = useStore();
const user2 = computed(() => store.state.user);
const addresses = ref<BaseItems<Address>>();
const collapsed = ref(true);
const cart = ref<BaseItems<CartItem>>();

onMounted(async () => {
  if (user2.value && user2.value.user && user2.value.user.id) {
    addresses.value = (await getAddresses(user2.value.user.id)).data;
    const gCart = await getCart(user2.value.user.id);
    cart.value = gCart.data;
  }
  //item.value.push()
});
function checkButtonDisabled() {
  // Verifica se algum checkbox está selecionado e atualiza o estado do botão
  isButtonDisabled.value = selectedItems.value.length === 0;
}

async function submitOrder() {
  const id = selectedItems.value;
  try {
    if (typeof id === 'number') {
      if (user2.value && user2.value.user && user2.value.user.id) {
        const response = await postOrderPayment(user2.value.user.id, {
          shippingAddressId: id,
        });

        console.log(response);
        window.location.href = response.data['checkout_url'];
        console.log('Pedido enviado com sucesso!');
      }
    }
  } catch (error) {
    if (error) {
      Swal.fire({
        title: 'Oops... Falta de stock!',
        text: 'A encomenda não foi efetuada devido a falta de stock. Pedimos desculpa pelo incómodo.',
        icon: 'error',
        confirmButtonColor: '#797dc3',
        confirmButtonText: 'Ok',
      });
    }
  }
}
</script>

<style scoped>
#adc {
  font-size: 20px;
  color: black;
}
#aviso {
  color: rgb(110, 102, 102);
}

#btnExtende {
  margin-left: 50px;
}
.titulo {
  text-align: center;
  font-size: 35px;
  margin-top: 20px;
  font-family: 'DM Serif Display';
}
.titulo2 {
  font-size: 25px;
  margin-top: 20px;
  margin-left: 10px;
  font-family: 'DM Serif Display';
}
#caixa {
  width: 500px !important;
}
#caixa2 {
  margin-left: 40px;
  width: 400px !important;
}
#adiciona {
  text-align: center;
}
.form-address {
  margin-left: 100px;
  margin-right: 100px;
  background-color: beige;
  border-radius: 10px;
}
#finalizar {
  margin-top: 20px;
  text-align: right;
}
#voltar {
  font-size: 20px;
  font-style: bold;
}
#btn {
  font-size: 20px;
  margin-right: 5px;
}
input[type='radio'] {
  width: 20px;
  margin-right: 5px;
  height: 20px;
}
@media (max-width: 768px) {
  /* Substitua 768px pelo valor desejado para a largura de tela */
  .form-address {
    margin-left: 10px; /* Ajuste a margem esquerda para telas menores */
    margin-right: 10px; /* Ajuste a margem direita para telas menores */
    height: auto; /* Ajuste a altura para telas menores */
  }
  #caixa {
    width: 310px !important;
  }
  #caixa2 {
    margin-left: 10px;
    width: 310px !important;
  }
  .form-address {
    margin-left: 10px;
    margin-right: 10px;
    background-color: beige;
    border-radius: 10px;
  }
}
</style>
