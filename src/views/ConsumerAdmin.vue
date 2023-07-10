<template>
  <!-- <router-link :to="{ path: '/admin', query: { page: 1 } }" class="back">
    <i class="bi bi-arrow-left-circle"></i> Voltar
  </router-link> -->

  <div class="parent" @click="goBack">
    <page-back></page-back>
  </div>

  <div id="container">
    <!-- <div id="titulo" v-if="user">
      <h2 class="dgreen-txt mb-4">{{ user['user']['name'] }}</h2>
    </div> -->

    <div class="cart mt-4">
      <!-- <b-card
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
          <strong v-if="user.deletedAt != null">Conta desativa</strong>
          <br />
          <strong>Id: </strong>{{ user['user']['id'] || 'Não definido' }}
          <br />
          <strong>Email: </strong>{{ user['user']['email'] || 'Não definido' }}
          <br />
          <strong>Telemóvel: </strong
          >{{ user['user']['phone'] || 'Não definido' }}
          <br />
          <strong>Morada: </strong>
          {{
            user['addresses'] && user['addresses'][0]
              ? user['addresses'][0]['street'] +
                ', nº' +
                user['addresses'][0]['number'] +
                ', porta ' +
                user['addresses'][0]['door'] +
                ' ' +
                user['addresses'][0]['zipCode'] +
                ', ' +
                user['addresses'][0]['city']
              : 'Não definido'
          }}

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
        </b-card-text>

        <div class="editarConta">
          <PrimeButton
            v-if="user.deletedAt === null"
            href="#"
            style="margin-right: 10px !important"
            @click="collapsed = !collapsed"
            :outlined="!collapsed"
            rounded
          >
            <span>{{ collapsed ? 'Editar conta' : 'Minimizar' }}</span>
          </PrimeButton>
          <div v-if="!collapsed">
            <br />
            <strong>Insira os dados que quer alterar</strong>
            <br />
            <div class="form-group mb-4">
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
            <PrimeButton type="submit" @click="saveChanges" rounded>
              Salvar alterações
            </PrimeButton>
          </div>
        </div>
        <div class="botaoCancel">
          <p></p>

          <PrimeButton
            rounded
            outlined
            v-if="user['deletedAt'] === null"
            href="#"
            @click="showCancelDialog"
            severity="secondary"
          >
            <span>Desativar conta</span>
          </PrimeButton>
          <PrimeButton
            v-else
            href="#"
            severity="secondary"
            @click="reativar"
            rounded
            ><span style="color: white">Reativar conta</span></PrimeButton
          >
        </div>
      </b-card> -->
      <div class="card flex align-items-center justify-content-center">
        <Card v-if="user">
          <template #header>
            <img
              style="
                object-fit: cover !important;
                object-position: top !important;
                width: 75vh;
                height: 40vh;
                border-radius: 0.375rem 0.375rem 0 0;
              "
              :src="
                user['user']['image'] && user['user']['image']['url']
                  ? user['user']['image']['url']
                  : '../../public/semimagem.png'
              "
              :alt="
                user['user']['image'] && user['user']['image']['alt']
                  ? user['user']['image']['alt']
                  : 'Default image'
              "
            />
          </template>
          <template #title>
            <span class="dgreen-txt">{{ user['user']['name'] }}</span></template
          >
          <template #subtitle> Consumidor </template>
          <template #content>
            <strong v-if="user.deletedAt != null" class="mb-5"
              >Conta desativa</strong
            >
            <strong>Id: </strong>{{ user['user']['id'] || 'Não definido' }}
            <br />
            <strong>Email: </strong
            >{{ user['user']['email'] || 'Não definido' }}
            <br />
            <strong>Telemóvel: </strong
            >{{ user['user']['phone'] || 'Não definido' }}

            <div style="height: 3vh"></div>
            <h5 class="fw-bold">Moradas:</h5>
            <div style="max-height: 15vh; overflow-y: auto">
              <strong>Morada principal: </strong>
              <div class="mb-3">
                {{
                  user['addresses'] && user['addresses'][0]
                    ? user['addresses'][0]['street'] +
                      ', nº' +
                      user['addresses'][0]['number'] +
                      ', porta ' +
                      user['addresses'][0]['door'] +
                      ' ' +
                      user['addresses'][0]['zipCode'] +
                      ', ' +
                      user['addresses'][0]['city']
                    : 'Não definido'
                }}
              </div>

              <div
                class="mb-3"
                v-for="num in Array.isArray(user['addresses']) &&
                user['addresses'].length > 0
                  ? user['addresses'].length - 1
                  : 0"
                :key="num"
              >
                <strong>Morada {{ num + 1 }}: </strong>
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
            </div>
          </template>
          <template #footer>
            <div class="editarConta">
              <PrimeButton
                v-if="user.deletedAt === null"
                href="#"
                style="margin-right: 10px !important"
                @click="collapsed = !collapsed"
                :outlined="!collapsed"
                rounded
              >
                <span>{{ collapsed ? 'Editar conta' : 'Minimizar' }}</span>
              </PrimeButton>
              <div v-if="!collapsed">
                <br />
                <strong>Insira os dados que quer alterar</strong>
                <br />
                <br />
                <div
                  class="form-group mb-4"
                  style="display: flex; flex-direction: column; gap: 1vh"
                >
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
                <PrimeButton type="submit" @click="saveChanges" rounded>
                  Salvar alterações
                </PrimeButton>
              </div>
            </div>
            <div class="botaoCancel">
              <p></p>

              <PrimeButton
                rounded
                outlined
                v-if="user['deletedAt'] === null"
                href="#"
                @click="showCancelDialog"
                severity="secondary"
              >
                <span>Desativar conta</span>
              </PrimeButton>
              <PrimeButton
                v-else
                href="#"
                severity="secondary"
                @click="reativar"
                rounded
                ><span style="color: white">Reativar conta</span></PrimeButton
              >
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Swal from 'sweetalert2';

import {
  getConsumerId,
  desativarConsumer,
  ativarConsumer,
  updateConsumer,
} from '../api/consumers';
import { auth } from '@/utils/firebase';
import { Consumer } from '@/types';
import { signInWithEmailAndPassword } from 'firebase/auth';
import PageBack from '@/components/PageBack.vue';
import PrimeButton from 'primevue/button';
import Card from 'primevue/card';
export default {
  data() {
    return {
      formData: { email: '', name: '', phone: '' },
      collapsed: true,
      user: null as Consumer | null,
    };
  },
  async mounted() {
    try {
      const response = await getConsumerId(Number(this.$route.params.id));
      this.user = response.data;
      this.formData.email = this.user.user.email;
      this.formData.name = this.user.user.name;
      this.formData.phone = this.user.user.phone;
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1); // Navega para a página anterior
    },
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
            autocapitalize: 'off',
          },
          showCancelButton: true,
          confirmButtonText: 'Confirmar',
          showLoaderOnConfirm: false,
          preConfirm: async (password) => {
            try {
              await signInWithEmailAndPassword(auth, email!, password);
              return true;
            } catch (error) {
              //pass errada
              Swal.showValidationMessage('Password incorreta');
              return false;
            }
          },
          allowOutsideClick: false,
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
                updateConsumer(Number(this.$route.params.id), data)
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
          autocapitalize: 'off',
        },
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        showLoaderOnConfirm: false,
        preConfirm: async (password) => {
          try {
            await signInWithEmailAndPassword(
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
            title: 'Desativar conta?',
            text: 'A conta pode voltar a ser ativada.',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sim, desativar!',
          }).then(async (result) => {
            if (result.isConfirmed) {
              desativarConsumer(Number(this.$route.params.id))
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
          autocapitalize: 'off',
        },
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        showLoaderOnConfirm: false,
        preConfirm: async (password) => {
          try {
            await signInWithEmailAndPassword(
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
            confirmButtonText: 'Sim, reativar!',
          }).then((result) => {
            if (result.isConfirmed) {
              ativarConsumer(Number(this.$route.params.id))
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
    },
  },
  components: { PageBack, PrimeButton, Card },
};
</script>
<style scoped>
h2 {
  text-align: center;
  font-family: 'DM Serif Display';
}

.p-card {
  width: 75vh !important;
}

.back {
  font-size: 20px;
  margin-left: 40px;
}

@media (max-width: 600px) {
  .p-card {
    width: 100% !important;
  }
  .p-card-header img {
    width: 85% !important;
    display: block;
    margin: auto;
    border-radius: 0.375em !important;
  }
}
</style>
