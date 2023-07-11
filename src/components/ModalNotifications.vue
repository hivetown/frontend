<template>
  <div id="notificacoes">
    <!-- <div id="popup" @click.stop class="sticky-bar" v-if="showPopup">
      <h5>Notificações</h5>
      <div class="content">
        <b-tabs v-model="activeTab">
          <b-tab title="Notificações não lidas" @click="activateFirstTab">
            <p v-if="notificacoesNovas.totalItems == 0">
              <br />
              Não existem notificações não lidas.
              <br />
            </p>
            <b-list-group
              v-else
              :key="
                notificacoesNovas.items && notificacoesNovas.items.length
                  ? notificacoesNovas.items.length
                  : 0
              "
            >
              <template v-if="notificacoes">
                <b-list-group-item
                  v-for="notificacao in notificacoesNovas.items"
                  :key="notificacao.id"
                  :active="notificacao?.readAt == null"
                  class="flex-column align-items-start"
                >
                  <div
                    class="d-flex w-100 justify-content-between"
                    @click="marcarComoLida(notificacao)"
                  >
                    <h5 class="mb-1">{{ notificacao.title }}</h5>
                    <small
                      >{{ notificacao.createdAt.substring(0, 10) }}
                      {{ notificacao.createdAt.substring(11, 19) }}</small
                    >
                  </div>
                  <p class="mb-1">{{ notificacao.message }}</p>
                  <small
                    v-if="notificacao.readAt == null"
                    @click="marcarComoLida(notificacao)"
                  >
                    <u style="cursor: pointer; margin-right: 156px"
                      >Marcar como lida</u
                    >
                  </small>

                  <small v-else @click="marcarComoNaoLida(notificacao)">
                    <u style="cursor: pointer; margin-right: 130px"
                      >Marcar como não lida</u
                    >
                  </small>
                  <small
                    @click="eliminarNotificacao(notificacao)"
                    style="text-align: 'right'"
                  >
                    <u style="cursor: pointer">Eliminar notificação </u></small
                  >

                  <hr />
                </b-list-group-item>
              </template>
              <hr />
            </b-list-group>
          </b-tab>
          <b-tab title="Todas as notificações" @click="activateSecondTab">
            <p v-if="notificacoes?.totalItems == 0">
              Não existem notificações.
            </p>
            <b-list-group
              v-else
              :key="
                notificacoes.items && notificacoes.items.length
                  ? notificacoes.items.length
                  : 0
              "
            >
              <template v-if="notificacoes">
                <b-list-group-item
                  v-for="notificacao in notificacoes.items"
                  :key="notificacao.id"
                  :active="notificacao?.readAt == null"
                  class="flex-column align-items-start"
                >
                  <div
                    class="d-flex w-100 justify-content-between"
                    @click="marcarComoLida(notificacao)"
                  >
                    <h5 class="mb-1">{{ notificacao.title }}</h5>
                    <small
                      >{{ notificacao.createdAt.substring(0, 10) }}
                      {{ notificacao.createdAt.substring(11, 19) }}</small
                    >
                  </div>
                  <p class="mb-1">{{ notificacao.message }}</p>
                  <small
                    v-if="notificacao.readAt == null"
                    @click="marcarComoLida(notificacao)"
                  >
                    <u style="cursor: pointer; margin-right: 157px"
                      >Marcar como lida</u
                    >
                  </small>

                  <small v-else @click="marcarComoNaoLida(notificacao)">
                    <u style="cursor: pointer; margin-right: 130px"
                      >Marcar como não lida</u
                    >
                  </small>
                  <small
                    @click="eliminarNotificacao(notificacao)"
                    style="text-align: 'right'"
                  >
                    <u style="cursor: pointer">Eliminar notificação </u></small
                  >
                  <hr />
                </b-list-group-item>
              </template>
              <hr />
            </b-list-group>

            <button
              class="btn btn-primary"
              v-if="
                notificacoes.totalItems > 24 &&
                notificacoes.page != notificacoes.totalPages
              "
              @click="carregaMais"
            >
              Carregar mais
            </button>
          </b-tab>
        </b-tabs>
      </div>
    </div> -->
    <div id="popup" @click.stop class="sticky-bar" v-if="showPopup">
      <TabView class="tabview-custom">
        <TabPanel>
          <template #header>
            <div class="d-flex gap-2 align-items-center">
              <i class="bi bi-envelope-exclamation-fill yellow-txt"></i>
              <span>Por ler</span>
            </div>
          </template>
          <p v-if="notificacoesNovas.totalItems == 0">
            <br />
            Não existem notificações não lidas.
            <br />
          </p>
          <b-list-group
            v-else
            :key="
              notificacoesNovas.items && notificacoesNovas.items.length
                ? notificacoesNovas.items.length
                : 0
            "
          >
            <template v-if="notificacoes">
              <b-list-group-item
                v-for="notificacao in notificacoesNovas.items"
                :key="notificacao.id"
                :active="notificacao?.readAt == null"
                class="notification-body read-notification"
              >
                <div
                  @click="marcarComoLida(notificacao)"
                  style="display: flex; flex-direction: column; gap: 0.7em"
                >
                  <small style="color: #5a5a5a; font-size: 0.75em"
                    >{{ notificacao.createdAt.substring(0, 10) }}
                    {{ notificacao.createdAt.substring(11, 19) }}</small
                  >
                  <h5 class="mb-1">{{ notificacao.title }}</h5>
                </div>
                <p class="mb-1" style="font-size: 0.9em">
                  {{ notificacao.message }}
                </p>
                <div
                  style="
                    display: flex;
                    justify-content: space-between;
                    margin-top: 2vh;
                  "
                >
                  <Button
                    style="font-size: 0.8em"
                    rounded
                    severity="secondary"
                    v-if="notificacao.readAt == null"
                    @click="marcarComoLida(notificacao)"
                  >
                    Marcar como lida
                  </Button>

                  <Button
                    style="font-size: 0.8em"
                    v-else
                    @click="marcarComoNaoLida(notificacao)"
                    rounded
                    outlined
                    severity="secondary"
                  >
                    Marcar como não lida
                  </Button>
                  <Button
                    style="font-size: 0.8em"
                    @click="eliminarNotificacao(notificacao)"
                    rounded
                    severity="danger"
                  >
                    Eliminar
                  </Button>
                </div>

                <hr />
              </b-list-group-item>
            </template>
            <hr />
          </b-list-group>
        </TabPanel>
        <TabPanel>
          <template #header>
            <div class="d-flex gap-2 align-items-center">
              <i class="bi bi-envelope-fill yellow-txt"></i>
              <span>Todas</span>
            </div>
          </template>
          <p v-if="notificacoes?.totalItems == 0">Não existem notificações.</p>
          <b-list-group
            v-else
            :key="
              notificacoes.items && notificacoes.items.length
                ? notificacoes.items.length
                : 0
            "
          >
            <template v-if="notificacoes">
              <b-list-group-item
                v-for="notificacao in notificacoes.items"
                :key="notificacao.id"
                :active="notificacao?.readAt == null"
                class="notification-body read-notification"
              >
                <div
                  @click="marcarComoLida(notificacao)"
                  style="display: flex; flex-direction: column; gap: 0.7em"
                >
                  <small style="color: #5a5a5a; font-size: 0.75em"
                    >{{ notificacao.createdAt.substring(0, 10) }}
                    {{ notificacao.createdAt.substring(11, 19) }}</small
                  >
                  <h5 class="mb-1">{{ notificacao.title }}</h5>
                </div>
                <p class="mb-1">{{ notificacao.message }}</p>
                <div
                  style="
                    display: flex;
                    justify-content: space-between;
                    margin-top: 2vh;
                  "
                >
                  <Button
                    style="font-size: 0.8em"
                    rounded
                    severity="secondary"
                    v-if="notificacao.readAt == null"
                    @click="marcarComoLida(notificacao)"
                  >
                    Marcar como lida
                  </Button>

                  <Button
                    style="font-size: 0.8em"
                    rounded
                    outlined
                    severity="secondary"
                    v-else
                    @click="marcarComoNaoLida(notificacao)"
                  >
                    Marcar como não lida
                  </Button>
                  <Button
                    style="font-size: 0.8em"
                    rounded
                    @click="eliminarNotificacao(notificacao)"
                    severity="danger"
                  >
                    Eliminar
                  </Button>
                </div>
                <hr />
              </b-list-group-item>
            </template>
            <hr />
          </b-list-group>

          <Button
            outlined
            class="btn btn-primary"
            severity="help"
            v-if="
              notificacoes.totalItems > 24 &&
              notificacoes.page != notificacoes.totalPages
            "
            @click="carregaMais"
          >
            Carregar mais
          </Button>
        </TabPanel>
      </TabView>
    </div>
  </div>
</template>

<script lang="ts">
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Button from 'primevue/button';
import Swal from 'sweetalert2';
import {
  postRead,
  getAllNotifications,
  postUnread,
  getUnreadNotifications,
  deleteNotification,
} from '../api/notifications';
import { BaseItems, Notification } from '@/types';
export default {
  emits: {
    // eslint-disable-next-line no-unused-vars
    qtdNotificacoes: (quantidade: number) => true,
  },
  data() {
    return {
      activeTab: 0, // Índice da aba ativa
      notificacoes: { page: 1, pageSize: 24 } as BaseItems<Notification>,
      showPopup: true,
      quantidade: 0 as number,
      notificacoesNovas: { page: 1, pageSize: 24 } as BaseItems<Notification>,
      visible: true,
    };
  },
  async beforeMount() {
    this.notificacoes = (
      await getAllNotifications(
        this.notificacoes.page,
        this.notificacoes.pageSize
      )
    ).data;
    this.notificacoesNovas = (await getUnreadNotifications()).data; //para ter p depois enviar no emit
    this.quantidade = this.notificacoesNovas.totalItems;
  },
  methods: {
    activateFirstTab() {
      this.activeTab = 0;
      localStorage.setItem('lastActiveTab', this.activeTab.toString());
    },
    activateSecondTab() {
      this.activeTab = 1;
      localStorage.setItem('lastActiveTab', this.activeTab.toString());
    },
    async carregaMais() {
      if (this.notificacoes.page === this.notificacoes.totalPages) return;

      const notificacoes = (
        await getAllNotifications(
          this.notificacoes.page + 1,
          this.notificacoes.pageSize
        )
      ).data;
      this.notificacoes.items.push(...notificacoes.items);
      this.notificacoes.page = this.notificacoes.page + 1;
      this.notificacoes.pageSize = notificacoes.pageSize;
      this.notificacoes.totalItems = notificacoes.totalItems;
      this.notificacoes.totalPages = notificacoes.totalPages;
    },
    openPopup() {
      this.showPopup = true;
    },
    closePopup() {
      this.showPopup = false;
    },
    async marcarComoLida(notification: Notification) {
      await postRead(notification.id);
      this.quantidade = this.quantidade - 1;
      notification.readAt = new Date().toISOString();
      this.$emit('qtdNotificacoes', this.quantidade);
    },
    async eliminarNotificacao(notification: Notification) {
      // Exibir SweetAlert para confirmar a eliminação
      const resultado = await Swal.fire({
        title: 'Eliminar notificação?',
        text: 'Deseja eliminar a notificação? Esta ação não pode ser desfeita.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não',
        confirmButtonColor: '#FF0000', // Definir a cor vermelha (código hexadecimal)
      });

      // Se o usuário confirmar a eliminação, chamar deleteNotification
      if (resultado.isConfirmed) {
        await deleteNotification(notification.id);
        Swal.fire('Notificação eliminada!', '', 'success');
        this.showPopup = true;
        this.quantidade = this.quantidade - 1;
        this.$emit('qtdNotificacoes', this.quantidade);
        // Atualizar a lista de notificações após eliminar a notificação
        //para apagar a notificaco apos o popup
        if (this.activeTab === 0) {
          //apaga das nao lidas
          const index = this.notificacoesNovas.items.findIndex(
            (item) => item.id === notification.id
          );
          if (index !== -1) {
            this.notificacoesNovas.items.splice(index, 1);
          }
        } else {
          //apaga so de todas
          const index = this.notificacoes.items.findIndex(
            (item) => item.id === notification.id
          );
          if (index !== -1) {
            this.notificacoes.items.splice(index, 1);
          }
        }
      } else {
        Swal.fire('Cancelado', 'A notificação não foi eliminada.', 'info');
      }
    },
    async loadNotifications() {
      try {
        const responseItem = await getAllNotifications(
          this.notificacoes.page,
          this.notificacoes.pageSize
        );
        this.notificacoes = responseItem.data;
      } catch (error) {
        console.error(error);
      }
    },
    async getUnreadNotifications() {
      try {
        const responseItem = await getUnreadNotifications();
        this.notificacoesNovas = responseItem.data;
      } catch (error) {
        console.error(error);
      }
    },

    async marcarComoNaoLida(notification: Notification) {
      await postUnread(notification.id);
      this.quantidade = this.quantidade + 1;
      notification.readAt = null;
      this.$emit('qtdNotificacoes', this.quantidade);
    },
    onPageChanged(newPageNumber: number): void {
      this.notificacoes.page = newPageNumber;
      this.myFunction(); // chame sua função aqui
    },

    async myFunction() {
      const response = await getAllNotifications(
        this.notificacoes.page,
        this.notificacoes.pageSize
      );
      this.notificacoes = response.data;
    },
  },
  components: {
    TabView,
    TabPanel,
    Button,
  },
};
</script>

<style scoped>
hr {
  color: black;
}
.my-swal-container {
  z-index: 9999; /* Garante que o SweetAlert esteja na parte superior */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#popup {
  border-radius: 0.3em;
  position: absolute;
  top: 70%;
  right: 25%;
  width: 500px;
  padding: 1.5vh;
  z-index: 990;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px,
    rgba(0, 0, 0, 0.1) 0px 2px 4px 0px,
    rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
  background-color: white;
}

#popup h5 {
  margin-top: 0;
}

.sticky-bar {
  position: sticky;
  top: 0;
  /* Prefixos do navegador */
  position: -webkit-sticky;
  position: -moz-sticky;
  position: -ms-sticky;
  z-index: 2;
  overflow-y: auto; /* Habilita a rolagem vertical */
  max-height: 500px; /* Define a altura máxima da barra */
}

.content {
  margin-top: 20px; /* Ajuste para a altura da barra sticky */
}
.read-notification {
  background-color: #f3f3f3 !important;
  border-color: #ddd !important;
  color: #878787 !important;
}
.active {
  background-color: white !important;
  border-color: #ddd !important;
  color: black !important;
}

.notification-body {
  /* background-color: red !important; */
  padding: 2vh !important;
}

@media (max-width: 767px) {
  #popup {
    border-radius: 1%;
    position: absolute;
    top: 37%;
    right: 1px;
    width: 400px;
    background-color: #f3f3f3;
    border: 1px solid #ccc;
    padding: 10px;
    z-index: 9999;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }

  #popup h5 {
    margin-top: 0;
  }

  .sticky-bar {
    position: sticky;
    top: 0;
    /* Prefixos do navegador */
    position: -webkit-sticky;
    position: -moz-sticky;
    position: -ms-sticky;
    z-index: 2;
    overflow-y: auto; /* Habilita a rolagem vertical */
    max-height: 500px; /* Define a altura máxima da barra */
  }

  .content {
    margin-top: 20px; /* Ajuste para a altura da barra sticky */
  }

  .active {
    background-color: #d3e3e6 !important; /* Define a cor de fundo para as notificações não lidas */
    border-color: #d3e3e6 !important;
  }
}
</style>
