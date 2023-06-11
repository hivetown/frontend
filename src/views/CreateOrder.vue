<template>
  <div class="form-address">
    <h4 class="titulo">Selecione o endereço de envio</h4>
    <div class="form-check form-check-inline">
      <br />
      <h5>Endereços guardados</h5>
      <div class="row" v-if="address2.totalItems > 0">
        <div
          class="col-sm-6"
          v-for="(num, index) in address2.totalItems"
          :key="index"
        >
          <!-- Utilize classes do Bootstrap para criar uma grade de duas colunas -->
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              :value="address2['items'][num - 1]['id']"
              v-model="selectedItems"
              @change="checkButtonDisabled"
            />
            <label class="form-check-label" for="radio{{ index + 1 }}">
              <div class="border p-3" id="caixa">
                <!-- Adicione a classe "border" para criar a borda e "p-3" para adicionar espaçamento interno -->
                <p>
                  {{ address2['items'][num - 1]['street'] }}, numero
                  {{ address2['items'][num - 1]['number'] }}, andar
                  {{ address2['items'][num - 1]['floor'] }}
                </p>
                <p>
                  {{ address2['items'][num - 1]['zipCode'] }},
                  {{ address2['items'][num - 1]['parish'] }}
                </p>
                <p>Distrito de {{ address2['items'][num - 1]['district'] }}</p>
                <p>
                  {{ address2['items'][num - 1]['latitude'] }},
                  {{ address2['items'][num - 1]['longitude'] }}
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
          <AddAddress />
        </div>
      </div>
      <br />
    </div>
    <div>
      <h4 class="titulo">Resumo do carrinho</h4>
      <div class="border p-3" id="caixa2">
        <div
          v-for="(num, index) in cart.totalItems"
          :key="index"
          style="white-space: nowrap"
        >
          <a href="/carrinho">
            <div style="display: inline-block">
              <span v-if="cart.totalItems > 0"
                >{{ cart['items'][num - 1]['quantity'] }}X
                {{
                  cart['items'][num - 1]['producerProduct']['productSpec'][
                    'name'
                  ]
                }};
              </span>
              <span v-else> O carrinho está vazio</span>
            </div>
          </a>
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
import {
  getAddresses,
  postOrderPayment,
  getCart,
} from '../api/cart';
import { useStore } from '@/store';
var idU = 0;
const store = useStore();
const user2 = computed(() => store.state.user);
if (user2.value && user2.value.user && user2.value.user.id) {
  idU = user2.value.user.id;
}
const address2 =  ref<any>('');
const collapsed = ref(true);
const cart = ref<any>('');

onMounted(async () => {
  const addresses = await getAddresses(idU);
  address2.value = addresses.data;
  const gCart = await getCart(idU);
  cart.value = gCart.data;
  //item.value.push()
});
</script>

<script lang="ts">
import AddAddress from '../components/AddAddress.vue';
import { fetchAuth } from '../api/auth';

var idU2 = 0;

onMounted(async () => {
  idU2 = (await fetchAuth()).data.user.id;
});
export default {
  components: { AddAddress },
  data() {
    return {
      selectedItems: [], // Variável de dados para armazenar os checkboxes selecionados
      isButtonDisabled: true, // Variável de dados para controlar o estado do botão
    };
  },

  methods: {
    checkButtonDisabled() {
      // Verifica se algum checkbox está selecionado e atualiza o estado do botão
      this.isButtonDisabled = this.selectedItems.length === 0;
    },
    async submitOrder() {
      idU2 = (await fetchAuth()).data.user.id;

      if (this.isButtonDisabled) {
        // Emitir um alerta
        alert('O botão está desabilitado!');
      }
      var id = this.selectedItems;
      try {
		if (typeof id === 'number') {

        const response = await postOrderPayment(idU2, {
          shippingAddressId: id,
        });
        console.log(response);
        window.location.href = response.data['checkout_url'];
        console.log('Pedido enviado com sucesso!');
	}
      } catch (error) {
        if (error){//} error.response.status === 400) {
          Swal.fire({
            title: 'Oops... Falta de stock!',
            text: 'A encomenda não foi efetuada devido a falta de stock. Pedimos desculpa pelo incómodo.',
            icon: 'error',
            confirmButtonColor: '#797dc3',
            confirmButtonText: 'Ok',
          });
        }

       
	
      }
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
