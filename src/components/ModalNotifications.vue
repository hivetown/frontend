<template>
  <div id="notificacoes">
    <div id="popup" @click.stop class="sticky-bar" v-if="showPopup">
      <h5>Notificações</h5>
      <div class="content">
        <p v-if="notificacoes?.totalItems == 0">
          Não existem notificações novas.
        </p>
        <b-list-group v-else>
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
                <u style="cursor: pointer">Marcar como lida</u>
              </small>

              <small v-else @click="marcarComoNaoLida(notificacao)">
                <u style="cursor: pointer">Marcar como não lida</u></small
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
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  postRead,
  getAllNotifications,
  postUnread,
  getUnreadNotifications,
} from '../api/notifications';
import { BaseItems, Notification } from '@/types';
export default {
  emits: {
    // eslint-disable-next-line no-unused-vars
    qtdNotificacoes: (quantidade: number) => true,
  },
  data() {
    return {
      notificacoes: { page: 1, pageSize: 24 } as BaseItems<Notification>,
      showPopup: true,
      quantidade: 0 as number,
    };
  },
  async beforeMount() {
    this.notificacoes = (
      await getAllNotifications(
        this.notificacoes.page,
        this.notificacoes.pageSize
      )
    ).data;
    this.quantidade = (await getUnreadNotifications()).data.totalItems; //para ter p depois enviar no emit
  },
  methods: {
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
};
</script>

<style scoped>
hr {
  color: black;
}
#popup {
  border-radius: 1%;
  position: absolute;
  top: 68%;
  right: 16%;
  width: 500px;
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
  color: #000 !important;
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