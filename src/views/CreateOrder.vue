<template>
  <div class="parent" @click="goBack">
    <PageBack style="margin-top: -2vh"></PageBack>
  </div>
  <div class="container">
    <div class="form-address parent">
      <h4 class="titulo dgreen-txt main-txt mb-4">Endereço de envio</h4>
      <div class="form-check form-check-inline enderecos">
        <br />
        <h5 class="mb-4">Endereços guardados</h5>
        <div v-if="addresses && addresses.items">
          <div
            v-for="(address, index) in addresses.items"
            :key="index"
            class="adresses-box"
          >
            <!-- Utilize classes do Bootstrap para criar uma grade de duas colunas -->
            <div class="form-check-content">
              <div class="morada-info">
                <!-- Adicione a classe "border" para criar a borda e "p-3" para adicionar espaçamento interno -->
                <p>
                  {{ address['street'] }}, número {{ address['number'] }}, andar
                  {{ address['floor'] }}
                </p>
                <p>
                  {{ address['zipCode'] }},
                  {{ address['parish'] }}
                </p>
                <p>Distrito de {{ address['district'] }}</p>
                <p>
                  Coordenadas:
                  {{ address['latitude'] }},
                  {{ address['longitude'] }}
                </p>
              </div>
              <div class="form-input-square">
                <!-- MELHORAR INPUT  -->
                <input
                  type="radio"
                  :value="address.id"
                  v-model="selectedItems"
                  @change="checkButtonDisabled"
                />
                <label
                  class="form-check-label"
                  for="radio{{ index + 1 }}"
                ></label>
              </div>
            </div>
          </div>
        </div>
        <p v-else>Ainda não existem endereços salvos!</p>
      </div>
      <div>
        <div class="div-botao">
          <PrimeButton
            id="btnExtende"
            rounded
            outlined
            @click="collapsed = !collapsed"
          >
            {{ collapsed ? 'Adicionar novo endereco ' : 'Minimizar' }}
          </PrimeButton>
        </div>
        <br />
      </div>
    </div>
    <div class="resumo">
      <h4 class="titulo dgreen-txt main-txt text-center">Resumo do carrinho</h4>

      <div class="caixa">
        <span v-if="!cart?.items">O carrinho está vazio</span>
        <div
          v-else
          v-for="(cartItem, index) in cart.items"
          :key="index"
          style="white-space: nowrap"
        >
          <div
            style="display: flex; justify-content: space-between"
            class="mobile-items"
          >
            <router-link to="/carrinho" style="text-decoration: none !important"
              ><span style="font-size: 1.1em; color: black !important">
                {{ cartItem.producerProduct.productSpec!.name }}
              </span>
            </router-link>
            <span style="font-size: 1.1em; color: black !important">
              Qnt: {{ cartItem['quantity'] }}</span
            >
          </div>
        </div>
      </div>
      <div id="finalizar">
        <PrimeButton
          id="btn"
          @click="submitOrder"
          rounded
          severity="secondary"
          :disabled="isButtonDisabled"
        >
          Finalizar a compra
        </PrimeButton>
        <div id="aviso" v-if="isButtonDisabled">
          *Selecione pelo menos um endereço para finalizar a encomenda
        </div>
      </div>
    </div>
    <br />
  </div>
  <div>
    <div v-if="!collapsed">
      <!-- Your content here -->
      <AddAddress></AddAddress>
    </div>
  </div>
</template>

<script setup lang="ts">
import PageBack from '@/components/PageBack.vue';
import Swal from 'sweetalert2';
import { onMounted, ref, computed } from 'vue';
import { getAddresses, postOrderPayment, getCart } from '../api/cart';
import { useStore } from '@/store';
import AddAddress from '../components/AddAddress.vue';
import { Address, BaseItems, CartItem } from '@/types';
import PrimeButton from 'primevue/button';

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

<script lang="ts">
export default {
  components: {
    PrimeButton,
    PageBack,
  },
  methods: {
    goBack() {
      this.$router.go(-1); // Navega para a página anterior
    },
  },
};
</script>

<style scoped>
#adc {
  font-size: 20px;
  color: black;
}
#aviso {
  color: rgb(110, 102, 102);
}

.titulo {
  /* text-align: center; */
  font-size: 2em;
}
.titulo2 {
  font-size: 25px;
  margin-top: 20px;
  margin-left: 10px;
  font-family: 'DM Serif Display';
}
#adiciona {
  text-align: center;
}

.container {
  /* background-color: red; */
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.8em;
  margin-top: 3vh;
  border: 2px solid #f3f3f3;
}
.form-address {
  padding: 2em;
  width: 50%;
}

.enderecos {
  /* background-color: green; */
  border-radius: 0.8em;
  border: 2px solid #f3f3f3;
  width: 100%;
  max-height: 40vh;
  overflow-y: auto;
}
.adresses-box {
  /* background-color: blue; */
  width: 100%;
  padding: 1em;
}
.form-check-content {
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: pink; */
  border-bottom: 1px solid #f3f3f3;
}
.form-input-square {
  display: flex;
  justify-content: center;
  /* background-color: aqua; */
  width: 25%;
}

.morada-info {
  /* background-color: purple; */
  width: 75%;
}

#btnExtende {
  border: 2px solid #f1b24a;
  padding: 0.8em !important;
}
#btnExtende:hover {
  background-color: #fcfcfc;
  border: 2px solid #e19e32;
}
.div-botao {
  margin-top: 2vh;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.resumo {
  /* background-color: aqua;s */
  width: 50%;
  padding: 2em;
  height: 50vh;
}

.caixa {
  /* background-color: red; */
  margin-top: 5vh !important;
  width: 80%;
  display: block;
  margin: auto;
  height: 25vh;
  max-height: 25vh;
  overflow-y: auto;
  padding: 1em;
}

#finalizar {
  /* background-color: green; */
  display: block;
  margin: auto;
  margin-top: 2vh;
  width: 80%;
  text-align: right;
}

.finalizar-btn {
  background-color: #4d774e !important;
  padding: 0.6em !important;
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  color: white;
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
  .container {
    display: flex;
    flex-direction: column-reverse;
    border: none;
  }
  .form-address {
    width: 100%;
    /* background-color: blue; */
  }

  .resumo {
    /* background-color: red; */
    width: 100%;
    margin-bottom: 4vh;
  }

  .morada-info p {
    font-size: 0.8em;
  }

  .caixa {
    /* background-color: green; */
    width: 100% !important;
  }

  .mobile-items {
    /* background-color: purple; */
    font-size: 0.75em;
  }
  #finalizar {
    scale: 0.8;
    width: 100%;
    /* background-color: red; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .finalizar-btn {
    max-width: 70%;
  }

  #aviso {
    /* background-color: green; */
    margin-top: 1vh;
  }
}
</style>
