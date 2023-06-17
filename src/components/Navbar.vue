<template>
  <div class="parent">
    <b-navbar toggleable="lg" type="dark" class="nav-home">
      <div id="logo" class="d-block d-sm mx-auto text-center">
        <img src="/logo.svg" />
        <b-navbar-brand class="p-2 logo-txt" to="/">hiveTown</b-navbar-brand>
      </div>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ms-auto mt-4 mb-3 nav-home-items">
          <div class="d-flex nav-items-left">
            <div class="d-flex">
              <router-link
                to="/favoritos"
                class="p-2 grey-txt text-decoration-none"
                style="font-weight: 500"
              >
                <b-avatar
                  class="nav-item"
                  style="
                    background-color: #f3f3f3 !important;
                    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
                  "
                >
                  <i
                    class="bi bi-heart"
                    style="color: #164a41"
                    font-scale="1.5"
                  ></i>
                </b-avatar>
                Favoritos
              </router-link>
            </div>
            <div class="d-flex">
              <router-link
                to="/carrinho"
                class="p-2 grey-txt text-decoration-none"
                style="font-weight: 500"
              >
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
                Carrinho
              </router-link>
            </div>

            <div class="d-flex" v-if="!user">
              <router-link
                to="/login"
                class="p-2 grey-txt text-decoration-none"
                style="font-weight: 500"
              >
                <b-avatar
                  class="nav-item"
                  style="
                    background-color: #f3f3f3 !important;
                    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
                  "
                >
                  <i
                    class="bi bi-person"
                    style="color: #164a41"
                    font-scale="1.5"
                  ></i>
                </b-avatar>
                Login
              </router-link>
            </div>
          </div>

          <div class="d-flex nav-items-right" v-if="user">
            <router-link to="/conta" class="p-2 grey-txt text-decoration-none">
              <b-avatar
                class="nav-item"
                :src="user.user.image?.url"
                style="box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px"
              >
              </b-avatar>
              <span>{{ user.user.name }}</span>
            </router-link>
            <b-nav-item-dropdown
              right
              class="p-2 grey-txt text-decoration-none dropdown-nav-item"
            >
              <b-dropdown-item
                v-if="user.user.role?.id === 1"
                href="/admin?page=1"
                >Admin area</b-dropdown-item
              >
             
              <b-dropdown-item>Definições</b-dropdown-item>
              <b-dropdown-item>
                <router-link to="/encomendas" class="linkcolor"
                  >Encomendas</router-link
                >
              </b-dropdown-item>
              <b-dropdown-item @click="logout">Terminar Sessão</b-dropdown-item>
            </b-nav-item-dropdown>
          </div>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>

  <!-- Nav inferior no modo telemovel -->
  <div>
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
import { useStore } from '@/store';
import { computed } from 'vue';

export default {
  setup() {
    const store = useStore();

    // computed user
    const user = computed(() => store.state.user);

    const logout = async () => {
      await store.dispatch('logout');
    };

    return {
      user,
      logout,
    };
  },
  methods: {
    isMobile() {
      return window.innerWidth < 768;
    },
  },
};
</script>
<style>
.linkcolor {
  color: var(--bs-dropdown-link-color);
}

.linkcolor:hover {
  color: var(--bs-dropdown-link-color);
  background: none;
}

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

@media (max-width: 767px) {
  .nav-home {
    /* background-color: red; */
    justify-content: space-evenly;
    margin-top: 3vh;
    margin-bottom: 3vh;
    width: 100%;
  }

  .nav-home-items .nav-items-left {
    /* background-color: red; */
    display: flex;
    flex-direction: column;
  }
}
</style>
