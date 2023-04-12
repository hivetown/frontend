<template >
  
  <div class="parent">
    <div style="text-align: center;">
        <button @click="goBack" type="button" class="btn btn-outline-secondary btn-sm" style="float:">
          Voltar
        </button>
    </div>
    
    <table class="table table-responsive-md">
        <tr>
            <td class="left-column">
            <div>
                X items no carrinho

                <div style="height:2vh"></div>

                <CartItem></CartItem>
                <CartItem></CartItem>
            </div>
            </td>

            <td class="right-column">
            <div>
              
              <h3>Rever a comprar</h3>
                <div style="height:2vh"></div>

                <p style="text-align: justify;">
                  Sub-total: <span class="checkout">0,00€</span><br>
                  Entrega: <span class="checkout">0,00€</span><br>
                </p>

                <div style="height:5vh;"></div>

                <button type="button" class="btn btn-outline-secondary btn-sm checkout" >
                  Aplicar
                </button>

                <div style="height:10vh;"></div>
                <p>
                  Total: <span class="checkout">0,00€</span><br>
                </p>
                <div style="text-align: center;">

                  <!--
                  <button  @click="apagar" type="button" class="btn btn-outline-secondary btn-sm" style="text-align: center;">
                    apagar carrinho
                  </button>-->
                </div>
            </div>
        </td>
        </tr>
       
  <h3>Selecione o endereço de envio</h3>
<div class="form-check form-check-inline">
 
   <h5> Endereços definidos </h5>
   <div class="row">
    <div class="col-sm-6" v-for="(num, index) in address2.totalItems" :key="index">
      <!-- Utilize classes do Bootstrap para criar uma grade de duas colunas -->
      <div class="form-check">
  <input class="form-check-input" type="checkbox" :value="address2['items'][num-1]['id']" v-model="selectedItems" @change="checkButtonDisabled"  />
  <label class="form-check-label" for="checkbox{{ index + 1 }}">
    <div class="border p-3" style="width: 500px;">
 <!-- Adicione a classe "border" para criar a borda e "p-3" para adicionar espaçamento interno -->
      <p>{{ address2['items'][num-1]['street'] }}, numero {{ address2['items'][num-1]['door']}}, andar {{ address2['items'][num-1]['floor']}}</p>
      <p>{{ address2['items'][num-1]['zipCode'] }}, {{ address2['items'][num-1]['parish'] }}</p>
      <p>Distrito de {{ address2['items'][num-1]['district'] }}</p>
      <p>{{ address2['items'][num-1]['latitude'] }}, {{ address2['items'][num-1]['longitude'] }}</p>
    </div>
  </label>
</div>

    </div>
  </div>
 
</div>
<br>
<div class="form-check form-check-inline">
  <input type="checkbox" class="form-check-input" v-model="showEnderecos2" @change="desmarcarCheckbox1">
  <label class="form-check-label">
   <h5> Adicionar novo endereço </h5>
  </label>
</div>
<br>
<Enderecos v-if="showEnderecos2" @salvarEndereco="onAddressSaved" :address="address"/>
<button  @click="submitOrder" type="button" class="btn btn-outline-secondary btn-sm" style="text-align: center;" :disabled="isButtonDisabled">
                    Finalizar a compra
</button>

    </table>

  </div>
  
</template>


<style>

.container {
  display: flex;
align-items: center;
}


table {
border: 1px solid #aaa;
width: 100%;
border-collapse: collapse;
}

@media (max-width: 800px) {
tr {
  display: block;
}

td {
  border: 1px solid black;
  padding-left: 10px;
  padding-right: 10px;
  display: inline-block;
  word-break: break-all;
}
}

.left-column {
width: 55%;
}

.right-column {
width: 25%;
}

.checkout {
float: right;
text-align: center;
}



</style>

<script setup lang="ts"> 
import CartItem from "@/components/CartItem.vue";
import Enderecos from "@/components/Enderecos.vue";
import { onMounted, ref} from "vue";
const address2 = ref<Order[]>([]); //array com os produtos

onMounted(async () => {
const addresses = await getAddresses('1');
console.log(addresses.data.items);
address2.value=addresses.data;
});

</script>

<script lang="ts">
import { postOrderPayment, getAddresses } from '../api/cart';
import { deleteCart } from '../api/cart';
import { postNewAdress } from '../api/consumers';
 var id = 0;

  export default {
    data() {
      return {
        showEnderecos: false,
        showEnderecos2: false,
        Enderecos,
        isLoading: false,
        selectedItems: [], // Variável de dados para armazenar os checkboxes selecionados
        isButtonDisabled: true, // Variável de dados para controlar o estado do botão
        address2: {
        items: '' // Valor inicial vazio
      }

      }
    },
    
    
  methods: {
    checkButtonDisabled() {
      // Verifica se algum checkbox está selecionado e atualiza o estado do botão
      this.isButtonDisabled = this.selectedItems.length === 0;
    },
    async obtemEnderecos(){
     // const addresses = await getAddresses('4');
      //console.log(addresses.data.items);
      console.log('oi');
    },
    //vai buscar os dados do enderco novo e adicionar ao user
    async onAddressSaved(address) {

      this.address = address;
      console.log(address);
      try {
        //adiciona o novo endereco
        const responseAddAddress = await postNewAdress(1, address);
  
        const addresses = await getAddresses('1');
       // console.log(addresses.data.items);
        
        const found = addresses.data.items.find(addressX => 
      addressX.city === address.city 
      && addressX.door === address.door 
      && addressX.zipCode === address.zipCode 
      && addressX.county === address.county
      && addressX.district === address.district
   //   && addressX.floor === address.floor
      && addressX.latitude === address.latitude
      && addressX.parish === address.parish
      && addressX.street === address.street
      && addressX.longitude === address.longitude);
      if (found) {
      id = found.id;
      //console.log(address);
      console.log(`O id do item encontrado é ${id}.`)

      //este e o shipping address
      onMounted(() => {
        // Coloque o código que você deseja executar no onMounted() aqui
        console.log('Função onMounted() foi chamada na função onAddressSaved()');
        const addresses = getAddresses('1');
        console.log(addresses.data.items);
        address2.value=addresses.data;
      });
      
    } else {
      console.log("Nenhum item foi encontrado.");
    }
      } catch (error) {
        console.error(error);
        console.log('erro ao ir buscar os enderecos do consumer')
      }
      
    },
    desmarcarCheckbox1() {
        this.showEnderecos = false;
      },
      desmarcarCheckbox2() {
        this.showEnderecos2 = false;
      },
      goBack() {
        window.history.back();
      },
      
    async submitOrder() {
      try {
        //const responseAdress = await postNewAdress()
    
        // await postOrderPayment(this.userId, this.shippingAddress);
          //TODO trocar o 1 para o id do usar logado
        const response = await postOrderPayment('82', { shippingAddressId: id});
        window.location.href = (response.data['checkout_url']);
        console.log('Pedido enviado com sucesso!');
          
        } catch (error) {
          console.error(error);
          console.log('Erro ao enviar o pedido. Por favor, tente novamente mais tarde.');
        }
      },
      async apagar() {
        try {
    
    // await postOrderPayment(this.userId, this.shippingAddress);
    //TODO trocar o 11 para o id do usar logado
  await deleteCart('25');
    console.log('Carrinho apagado com sucesso!');
    
  } catch (error) {
    console.error(error);
    console.log('Erro ao apagar carrinho.');
  }
        
      }
      
  }
  
  };
</script>


