<template>
  <!-- <router-link :to="{ path: '/admin', query: { page: 1 } }" class="back">
    <i class="bi bi-arrow-left-circle"></i> Voltar
  </router-link> -->

  <div class="parent" @click="goBack">
    <page-back></page-back>
  </div>

  <!-- TODO - Adaptar para ser igual ao Account (mas preciso que vá para o main) -->
  <div id="container">
    <div id="titulo">
      <h1>Consumidor {{ $route.params.id }}</h1>
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
          <strong v-if="user.deletedAt != null">Conta desativa</strong>
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
          <button
            v-if="user.deletedAt === null"
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
  getConsumerId,
  desativarConsumer,
  ativarConsumer,
  updateConsumer,
} from '../api/consumers';
import { auth } from '@/utils/firebase';
import { Consumer } from '@/types';
import { signInWithEmailAndPassword } from 'firebase/auth';
import PageBack from '@/components/PageBack.vue';
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
  components: { PageBack },
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
