<template>
  <a style="color: black" href="/admin?page=1" class="back"
    ><i class="bi bi-arrow-left-circle"></i> Voltar</a
  >
  <div id="container">
    <div id="titulo">
      <h1>Vendedor {{ $route.params.id }}</h1>
    </div>
    <div class="cart">
      <b-card
        v-if="user"
        id="b-card"
        :title="user['user']['name']"
        :img-src="
          user['user']['image'] && user['user']['image']['url']
            ? user['user']['image']['url']
            : '../../public/semimagem.png'
        "
        :img-alt="
          user['user']['image'] && user['user']['image']['alt']
            ? user['user']['image']['alt']
            : 'Default image'
        "
        img-top
        tag="article"
        style="max-width: 30rem"
        class="mb-2"
      >
        <b-card-text>
          <strong>Email: </strong>{{ user['user']['email'] || 'Não definido' }}
          <br />
          <strong>Telemóvel: </strong
          >{{ user['user']['phone'] || 'Não definido' }}

          <div
            v-for="num in Array.isArray(user['addresses']) &&
            user['addresses'].length > 0
              ? user['addresses'].length - 1
              : 0"
            :key="num"
          >
            <strong>Morada: </strong>
            {{
              user['addresses'] && user['addresses'][num]
                ? user['addresses'][num]['street'] +
                  ', nº' +
                  user['addresses'][num]['number'] +
                  ', porta ' +
                  user['addresses'][num]['door'] +
                  ' ' +
                  user['addresses'][num]['zipCode'] +
                  ', ' +
                  user['addresses'][num]['city']
                : 'Não definido'
            }}
          </div>
          <br />
          <br />
          <strong>Unidades de produção: </strong>
          <div>
            <div v-if="Number(qtd) > 0">
              <div v-for="idx in qtd" :key="idx">
                <p>
                  <strong v-if="productionUnitIds.items">ID: </strong
                  >{{ productionUnitIds.items[Number(idx) - 1]['id'] }} Nome:
                  {{ productionUnitIds.items[Number(idx) - 1]['name'] }}, <br />
                  Rua:
                  {{ productionUnitIds.items[Number(idx) - 1]['address']['street'] }},
                  nº
                  {{ productionUnitIds.items[Number(idx) - 1]['address']['number'] }},
                  {{ productionUnitIds.items[Number(idx) - 1]['address']['door'] }}
                  <br />
                  Cidade:
                  {{ productionUnitIds.items[Number(idx) - 1]['address']['city'] }}
                  <br />Latitude:
                  {{ productionUnitIds.items[Number(idx) - 1]['address']['latitude'] }}
                  , Longitude:
                  {{ productionUnitIds.items[Number(idx) - 1]['address']['longitude'] }}
                </p>
              </div>
            </div>
            <div v-else>
              <p>Não existem unidades de produção associadas.</p>
            </div>
          </div>
          <!-- {{ users['productionUnits'] }}-->
        </b-card-text>
        <div class="editarConta">
          <button
            href="#"
            style="margin-right: 10px !important"
            class="btn btn-outline-secondary btn-sm"
            @click="collapsed = !collapsed"
          >
            <span>{{ collapsed ? 'Editar conta' : 'Minimizar' }}</span>
          </button>
          <div v-if="!collapsed">
            <!-- Your content here -->
            <br />
            <strong>Insira os dados que quer alterar</strong>
            <br />
            <div class="form-group">
              <label for="name">Nome:</label>
              <input
                type="text"
                class="form-control"
                id="name"
                placeholder="Digite o nome"
                v-model="formData.name"
              />
              <label for="name">Email:</label>
              <input
                type="text"
                class="form-control"
                id="name"
                placeholder="Digite o email"
                v-model="formData.email"
              />
              <label for="name">Telemóvel:</label>
              <input
                type="text"
                class="form-control"
                id="name"
                placeholder="Digite o nº de telemóvel"
                v-model="formData.phone"
              />
            </div>
            <button
              type="submit"
              class="btn btn-outline-secondary btn-sm"
              @click="saveChanges"
            >
              Salvar alterações
            </button>
          </div>
        </div>
        <div class="botaoCancel">
          <p></p>

          <button
            v-if="user['deletedAt'] === null"
            href="#"
            class="btn btn-outline-secondary btn-sm"
            @click="showCancelDialog"
          >
            <span style="color: black">Desativar conta</span>
          </button>
          <b-button v-else href="#" variant="secondary" @click="reativar"
            ><span style="color: white">Reativar conta</span></b-button
          >
        </div>
      </b-card>
    </div>
  </div>
</template>

<script lang="ts">
import Swal from 'sweetalert2';

import {
  getProducerId,
  desativarProducer,
  getAddressPU,
  updateProducer,
  ativarProducer,
} from '../api/producers';
import { onMounted, ref } from 'vue';
import { auth } from '@/utils/firebase';
import {Producer, ProductionUnit, BaseItems } from '@/types';
import { signInWithEmailAndPassword } from 'firebase/auth';
export default {
  data() {
 
	return {
		formData: {email: "", name: "", phone: ""} ,
    	collapsed : true,
		qtd : 0,
    	user : null as Producer | null,
		productionUnitIds : {} as BaseItems<ProductionUnit>,
	}
  },
 async mounted() {
	  
      try {
        const response = await getProducerId(Number(this.$route.params.id));
        this.user = response.data;
		this.formData.email= this.user!.user.email;
		this.formData.name=this.user!.user.name;
		this.formData.phone=this.user!.user.phone;
		const responseAddressesPU = await getAddressPU(Number(this.$route.params.id));
        this.productionUnitIds = responseAddressesPU.data;
		console.log(responseAddressesPU.data);
        this.qtd = Number(this.productionUnitIds.items.length);
      } catch (error) {
        console.error(error);
      }
  },

  methods: {
    saveChanges() {
		const email = this.$store.state.user?.user.email;
  // Define valores padrão para campos não preenchidos
  const defaults = {
    name: this.user!.user.name,
    email: this.user!.user.email,
    phone: this.user!.user.phone,
  };

  // Mescla valores padrão com valores do formulário
  const data = { ...defaults, ...this.formData };
  if (Object.keys(this.formData).length === 0) {
    Swal.fire({
      icon: 'error',
      title: 'Sem alterações a efetuar',
      text: 'Precisa preencher pelo menos um campo para efetuar alterações',
      showConfirmButton: false,
      timer: 3500,
    });
  } else {
    Swal.fire({
      title: 'Digite a sua password:',
      input: 'password',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      showLoaderOnConfirm: false,
      preConfirm: async (password) => {

		try {
                const userCredential = await signInWithEmailAndPassword(
                    auth,
                    email!, 
                    password 
                );
				return true;
            } catch (error) {
                //pass errada
				Swal.showValidationMessage('Password incorreta');
				return false;
				
            }
      
      },
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
       
            Swal.fire({
              title: 'Tem certeza que deseja salvar as alterações?',
              text: 'Você poderá voltar a editar a conta caso se arrependa.',
              icon: 'question',
              showCancelButton: true,
              confirmButtonText: 'Sim',
              cancelButtonText: 'Não',
            }).then((result) => {
              if (result.isConfirmed) {
                updateProducer(Number(this.$route.params.id), data)
                  .then((response) => {
                    console.log(response);
                    Swal.fire({
                      icon: 'success',
                      title: 'Alterações salvas!',
                      showConfirmButton: false,
                      timer: 1500,
                    }).then(() => {
                      location.reload();
                    });
                  })
                  .catch((error) => {
                    console.log(error);
                    Swal.fire({
                      icon: 'error',
                      title: 'Erro ao efetuar alterações',
                      text: 'Tente novamente mais tarde',
                      showConfirmButton: false,
                      timer: 1500,
                    });
                  });
              }
            });
          
          
      }
    });
  }
},

    showCancelDialog(): void {
		Swal.fire({
    title: 'Digite a sua password',
    input: 'password',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'Confirmar',
    showLoaderOnConfirm: false,
    preConfirm: async (password) => {

try {
		const userCredential = await signInWithEmailAndPassword(
			auth,
			this.$store.state.user?.user.email!, 
			password 
		);
		return true;
	} catch (error) {
		//pass errada
		Swal.showValidationMessage('Password incorreta');
		return false;
		
	}

},
  })
  .then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: 'Desativar conta?',
        text: 'A conta pode voltar a ser ativada.',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sim, desativar!',
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          desativarProducer(Number(this.$route.params.id))
            .then(() => {
              Swal.fire(
                'Desativado!',
                'A conta encontra-se desativada.',
                'success'
              ).then(() => {
                location.reload();
              });
            })
            .catch((error) => {
              console.error(error);

              if (error.response && error.response.status === 400) {
                Swal.fire(
                  'Erro ao desativar conta',
                  'Ocorreu um erro na requisição, não foi possível concluir a requisição de desativar conta.',
                  'error'
                );
              } else {
                Swal.fire(
                  'Erro!',
                  'Não foi possível desativar a conta.',
                  'error'
                );
              }
            });
        }
      });
    }
  });
    },
	reativar(): void {
  Swal.fire({
    title: 'Digite a password:',
    input: 'password',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'Confirmar',
    showLoaderOnConfirm: false,
    preConfirm: async (password) => {

try {
		const userCredential = await signInWithEmailAndPassword(
			auth,
			this.$store.state.user?.user.email!, 
			password 
		);
		return true;
	} catch (error) {
		//pass errada
		Swal.showValidationMessage('Password incorreta');
		return false;
		
	}

},
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: 'Reativar conta?',
        text: 'A conta pode voltar a ser desativada.',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sim, reativar!'
      }).then((result) => {
        if (result.isConfirmed) {
          ativarProducer(Number(this.$route.params.id))
            .then(() => {
              Swal.fire(
                'Reativado!',
                'A conta foi reativada com sucesso.',
                'success'
              ).then(() => {
                location.reload();
              });
            })
            .catch((error) => {
              console.error(error);
              if (error.response && error.response.status === 400) {
                Swal.fire(
                  'Erro ao reativar a conta',
                  'Ocorreu um erro na requisição. Não foi possível concluir a solicitação de reativação da conta.',
                  'error'
                );
              } else {
                Swal.fire(
                  'Erro!',
                  'Não foi possível reativar a conta.',
                  'error'
                );
              }
            });
        }
      });
    }
  });
}

  },
};
</script>


<style scoped>
h1 {
  text-align: center;
  font-family: 'DM Serif Display';
}

.back {
  font-size: 20px;
  margin-left: 40px;
}

.cart {
  margin: 0 auto;
  display: flex;
  width: 800px !important;
  align-items: center;
  justify-content: center;
}

#b-card {
  background-color: rgb(239, 243, 247) !important;
}

/* estilos para telas com largura menor ou igual a 600px */
@media (max-width: 600px) {
  .cart {
    margin: 0 auto;
    display: flex;
    width: 400px !important;
    align-items: center;
    justify-content: center;
  }
}
</style>
