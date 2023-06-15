<template>
  <div class="parent">
    <b-navbar toggleable="lg" type="dark">
      <div id="logo" class="d-block d-sm mx-auto text-center">
        <img src="/logo.svg" />
        <b-navbar-brand class="p-2 logo-txt" to="/">hiveTown</b-navbar-brand>
      </div>

      <!-- <b-navbar-toggle target="nav-collapse"></b-navbar-toggle> -->

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ms-auto mt-4 mb-3">
          <div class="d-flex nav-items-left">
            <div
              @click="showModalFunction"
              v-if="$store.state.user"
              class="d-flex"
            >
              <!--todo por se user logado-->
              <b-avatar
                @click="showModalFunction"
                class="nav-item position-relative"
                style="
                  background-color: #f3f3f3 !important;
                  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
                "
              >
                <i
                  class="bi bi-bell"
                  style="color: #164a41"
                  font-scale="1.5"
                ></i>
              </b-avatar>
              <!--numero de notificacoes-->
              <b-badge
                v-if="notificacoes.totalItems != 0"
                @click="showModalFunction"
                variant="danger"
                class="rounded-circle position-absolute"
                style="
                  top: 30px;
                  right: 535px;
                  width: 20px;
                  height: 20px;
                  border-radius: 50%;
                "
                >{{ notificacoes['totalItems'] }}</b-badge
              >
              <Modal v-if="showModal" />
              <p
                class="p-2 grey-txt text-decoration-none"
                style="font-weight: 500"
              >
                Notificações
              </p>
              <!-- <p class="p-2 grey-txt" style="font-weight: 500;" to="/favoritos">Favoritos</p> -->
            </div>
            <div class="d-flex">
              <b-avatar
                class="nav-item"
                style="
                  background-color: #f3f3f3 !important;
                  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
                "
              >
                <i
                  class="bi bi-heart mx-auto"
                  style="color: #164a41"
                  font-scale="1.5"
                ></i>
              </b-avatar>
              <router-link
                to="/favoritos"
                class="p-2 grey-txt text-decoration-none"
                style="font-weight: 500"
                >Favoritos</router-link
              >
              <!-- <p class="p-2 grey-txt" style="font-weight: 500;" to="/favoritos">Favoritos</p> -->
            </div>
            <div class="d-flex">
              <b-avatar
                class="nav-item"
                style="
                  background-color: #f3f3f3 !important;
                  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
                "
              >
                <i
                  class="bi bi-cart"
                  style="color: #164a41"
                  font-scale="1.5"
                ></i>
              </b-avatar>
              <router-link
                to="/carrinho"
                class="p-2 grey-txt text-decoration-none"
                style="font-weight: 500"
                >Carrinho</router-link
              >
              <!-- <p class="p-2 grey-txt" style="font-weight: 500;" to="/carrinho">Carrinho</p> -->
            </div>

            <div class="d-flex" v-if="!$store.state.user">
              <b-avatar
                class="nav-item"
                style="
                  background-color: #f3f3f3 !important;
                  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
                "
              >
                <i
                  class="bi bi-cart"
                  style="color: #164a41"
                  font-scale="1.5"
                ></i>
              </b-avatar>
              <router-link
                to="/login"
                class="p-2 grey-txt text-decoration-none"
                style="font-weight: 500"
                >Login</router-link
              >
              <!-- <p class="p-2 grey-txt" style="font-weight: 500;" to="/carrinho">Carrinho</p> -->
            </div>
          </div>

          <div class="d-flex nav-items-right" v-if="$store.state.user">
            <router-link to="/conta">
              <b-avatar
                class="nav-item"
                src="https://placekitten.com/320/320"
                style="box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px"
              >
                <!-- TODO badges das notificações  -->
              </b-avatar>
            </router-link>
            <b-nav-item-dropdown right>
              <b-dropdown-item href="#">Definições</b-dropdown-item>
              <b-dropdown-item @click="$store.dispatch('logout')" href="#"
                >Terminar Sessão</b-dropdown-item
              >
            </b-nav-item-dropdown>
          </div>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>

  <!-- Nav inferior no modo telemovel -->
  <!-- TODO melhorar isto e o modo telemóvel no geral
		 evitar repetir código como está aqui -->
  <div>
    <!-- <b-nav is-nav class="d-lg-none fixed-bottom" style="background-color: #f3f3f3;"> -->
    <b-nav is-nav class="d-lg-none fixed-bottom bg-white mb-nav">
      <b-nav-item class="deu">
        <button
          type="button"
          class="btn circle-btn mb-nav-item"
          v-b-tooltip.hover
          title="Adicionar ao carrinho"
        >
          <i
            class="bi bi-heart mx-auto dgreen-txt"
            style="font-size: large"
          ></i>
        </button>
      </b-nav-item>
      <b-nav-item class="deu">
        <button
          type="button"
          class="btn circle-btn mb-nav-item"
          v-b-tooltip.hover
          title="Adicionar ao carrinho"
        >
          <i class="bi bi-cart mx-auto dgreen-txt" style="font-size: large"></i>
        </button>
      </b-nav-item>
      <b-nav-item class="deu">
        <button
          type="button"
          class="btn circle-btn mb-nav-item"
          v-b-tooltip.hover
          title="Adicionar ao carrinho"
        >
          <i class="bi bi-house dgreen-txt" style="font-size: large"></i>
        </button>
      </b-nav-item>
      <b-nav-item class="deu">
        <button
          type="button"
          class="btn circle-btn mb-nav-item"
          v-b-tooltip.hover
          title="Adicionar ao carrinho"
        >
          <i class="bi bi-search dgreen-txt" style="font-size: large"></i>
        </button>
      </b-nav-item>
      <b-nav-item class="deu">
        <button
          type="button"
          class="btn circle-btn mb-nav-item"
          v-b-tooltip.hover
          title="Adicionar ao carrinho"
        >
          <i class="bi bi-person dgreen-txt" style="font-size: large"></i>
        </button>
      </b-nav-item>
    </b-nav>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useStore } from '@/store';
import { computed } from 'vue';
import Modal from '../components/ModalNotifications.vue';
import { getUnreadNotifications } from '../api/notifications';
const notificacoes = ref<any>('');
export default {
  components: {
    Modal,
  },
  setup() {
    const store = useStore();

    // computed user
    const user = computed(() => store.state.user);

    const logout = async () => {
      await store.dispatch('logout');
    };
  },
  methods: {
    showModalFunction() {
      this.showModal = !this.showModal;
    },
  },
  data() {
    return {
      showModal: false,
      notificacoes,
    };
  },
  mounted() {
    // Função para buscar as notificações não lidas
    const fetchNotifications = async () => {
      try {
        const responseItem = await getUnreadNotifications();
        this.notificacoes = responseItem.data;
      } catch (error) {
        console.error(error);
      }
    };

    // Atualiza as notificações a cada 45 segundos
    setInterval(fetchNotifications, 45000);
  },
};
</script>
<style>
#logo img {
  width: 2.6em;
  margin-top: -0.5em;
}

.logo-txt {
  font-family: 'DM Serif Display', serif;
  font-size: 30px !important;
  color: #164a41 !important;
  letter-spacing: -0.03em;
}

.nav-items-left {
  gap: 0.8em;
  margin-right: 2em;
}

.nav-item {
  cursor: pointer;
}

/* Hamburguer menu */
.navbar-toggler {
  border: none !important;
}

.mb-nav-item {
  /* background-color: #e8e8e8 !important; */
}

.mb-nav {
  border-top: 1px solid #f3f3f3 !important;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
}

.deu {
  /* background-color: green; */
  width: 20%;
}
</style>
