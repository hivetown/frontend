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
        v-if="users['user']"
        id="b-card"
        :title="users['user']['name']"
        :img-src="
          users['user']['image'] && users['user']['image']['url']
            ? users['user']['image']['url']
            : '../../public/semimagem.png'
        "
        :img-alt="
          users['user']['image'] && users['user']['image']['alt']
            ? users['user']['image']['alt']
            : 'Default image'
        "
        img-top
        tag="article"
        style="max-width: 30rem"
        class="mb-2"
      >
        <b-card-text>
          <strong>Email: </strong>{{ users['user']['email'] || 'Não definido' }}
          <br />
          <strong>Telemóvel: </strong
          >{{ users['user']['phone'] || 'Não definido' }}

          <div
            v-for="num in Array.isArray(users['addresses']) &&
            users['addresses'].length > 0
              ? users['addresses'].length - 1
              : 0"
          >
            <strong>Morada: </strong>
            {{
              users['addresses'] && users['addresses'][num]
                ? users['addresses'][num]['street'] +
                  ', nº' +
                  users['addresses'][num]['number'] +
                  ', porta ' +
                  users['addresses'][num]['door'] +
                  ' ' +
                  users['addresses'][num]['zipCode'] +
                  ', ' +
                  users['addresses'][num]['city']
                : 'Não definido'
            }}
          </div>
          <br />
          <br />
          <strong>Unidades de produção: </strong>
          <div v-if="qtd > 0" v-for="idx in qtd" :key="idx">
            <p>
              <strong v-if="productionUnitIds.items">ID: </strong
              >{{ productionUnitIds.items[idx - 1]['id'] }} Nome:
              {{ productionUnitIds.items[idx - 1]['name'] }}, <br />
              Rua: {{ productionUnitIds.items[idx - 1]['address']['street'] }},
              nº {{ productionUnitIds.items[idx - 1]['address']['number'] }},
              {{ productionUnitIds.items[idx - 1]['address']['door'] }}
              <br />
              Cidade: {{ productionUnitIds.items[idx - 1]['address']['city'] }}
              <br />Latitude:
              {{ productionUnitIds.items[idx - 1]['address']['latitude'] }} ,
              Longitude:
              {{ productionUnitIds.items[idx - 1]['address']['longitude'] }}
            </p>
          </div>
          <div v-else>
            <p>Não existem unidades de produção associadas.</p>
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
            v-if="users['deletedAt'] === null"
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
  ativarProducer,
  updateProducer,
  getAddressPU,
} from '../api/producers';
import { onMounted, ref } from 'vue';
import { Consumer } from '../types/interfaces';
import { useRoute } from 'vue-router';
export default {
  setup() {
    const route = useRoute();
    let formData = {};
    const id = ref(0);
    const qtd = ref(0);
    const prod = ref(0);
    const collapsed = ref(true);
    const users = ref<Consumer>({});
    const productionUnitIds = ref();
    const responseList = ref<Consumer>([]);

    onMounted(async () => {
      id.value = route.params.id;
      try {
        const response = await getProducerId(id.value);
        users.value = response.data;

        const responseAddressesPU = await getAddressPU(id.value);
        productionUnitIds.value = responseAddressesPU.data;
        qtd.value = productionUnitIds.value.totalItems;
      } catch (error) {
        console.error(error);
      }
    });

    return {
      users,
      id,
      collapsed,
      formData,
      qtd,
      responseList,
      productionUnitIds,
    };
  },

  methods: {
    saveChanges() {
      // Define valores padrão para campos não preenchidos
      const defaults = {
        name: this.users.user.name,
        email: this.users.user.email,
        phone: this.users.user.phone,
      };

      // Mescla valores padrão com valores do formulário
      const data = { ...defaults, ...this.formData };
      if ((Object.keys(this.formData).length === 0) === true) {
        Swal.fire({
          icon: 'error',
          title: 'Sem alterações a efetuar',
          text: 'Precisa preenhcer pelo menos um campo para efetuar alterações',
          showConfirmButton: false,
          timer: 3500,
        });
      } else {
        // Chama a função de atualização com o objeto mesclado
        updateProducer(this.id, data)
          .then((response) => {
            Swal.fire({
              title: 'Tem certeza que deseja salvar as alterações?',
              text: 'Poderá voltar a editar a conta caso se arrependa.',
              icon: 'question',
              showCancelButton: true,
              confirmButtonText: 'Sim',
              cancelButtonText: 'Não',
            }).then((result) => {
              if (result.isConfirmed) {
                updateProducer(this.id, data)
                  .then((response) => {
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
                    Swal.fire({
                      icon: 'error',
                      title: 'Erro ao efetuar alterações',
                      text: 'Tente mais tarde',
                      showConfirmButton: false,
                      timer: 1500,
                    });
                  });
              }
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    showCancelDialog(): void {
      Swal.fire({
        title: 'Dasativar conta?',
        text: 'A conta pode voltar a ser ativada.',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sim, desativar!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          desativarProducer(this.id)
            .then(() => {
              Swal.fire(
                'Desativa!',
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
    },
    reativar(): void {
      Swal.fire({
        title: 'Reativar conta?',
        text: 'A conta pode voltar a ser desativada.',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sim, reativar!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          ativarProducer(this.id)
            .then(() => {
              Swal.fire(
                'Reativa!',
                'A conta encontra-se ativa novamente.',
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
                  'Ocorreu um erro na requisição, não foi possível concluir a requisição de ativar a conta.',
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
    },
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
