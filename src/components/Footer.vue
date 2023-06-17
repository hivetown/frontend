<template>
  <!-- TIRAR -->
  <div style="height: 10vh"></div>

  <div class="custom-footer parent">
    <b-footer :fluid="true">
      <b-container class="mt-5">
        <b-row class="d-flex justify-content-center">
          <b-col md="3" lg="4" xl="3" class="mb-4">
            <div id="logo">
              <img src="/logo.svg" />
              <b-navbar-brand class="p-2 logo-txt" to="/"
                >hiveTown</b-navbar-brand
              >
            </div>
            <p class="mt-3 grey-txt">Campo Grande 016, 1749-016 Lisboa</p>
            <b-col
              cols="12"
              md="auto"
              class="d-flex justify-content-center justify-content-md-start"
            >
              <a href="" class="me-2 text-reset">
                <b-icon-facebook class="footer-icon"></b-icon-facebook>
              </a>
              <a href="" class="me-2 text-reset">
                <b-icon-twitter class="footer-icon"></b-icon-twitter>
              </a>
              <a href="" class="me-2 text-reset">
                <b-icon-instagram class="footer-icon"></b-icon-instagram>
              </a>
            </b-col>
          </b-col>
          <b-col md="2" lg="2" xl="2" class="mb-4">
            <h6 class="text-uppercase fw-bold mb-4 dgreen-txt">
              Precisa de ajuda?
            </h6>
            <div>
              <div class="d-flex">
                <i
                  class="bi bi-telephone yellow-txt"
                  style="font-size: 1.5em"
                ></i>
                <a
                  href="tel:919236147"
                  target="_blank"
                  class="text-decoration-none"
                  ><h4 class="p-1 grey-txt text-lg">919 236 147</h4></a
                >
              </div>
              <a
                href="mailto:info@hivetown.pt"
                target="_blank"
                class="text-decoration-none"
                ><span class="grey-txt">info@hivetown.pt</span></a
              >
            </div>
          </b-col>
          <b-col md="3" lg="2" xl="2" class="mb-4">
            <!-- Links -->
            <h6 class="text-uppercase fw-bold mb-4 dgreen-txt">Informação</h6>
            <b-list-group>
              <b-list-group-item href="#" class="text-reset footer-links"
                ><span class="grey-txt">Sobre nós</span></b-list-group-item
              >
              <b-list-group-item href="#" class="text-reset footer-links"
                ><span class="grey-txt"
                  >Informação sobre entregas</span
                ></b-list-group-item
              >
              <b-list-group-item class="text-reset footer-links"
                ><router-link
                  to="/consent"
                  class="grey-txt text-decoration-none"
                  >Privacidade</router-link
                ></b-list-group-item
              >
              <b-list-group-item href="#" class="text-reset footer-links"
                ><span class="grey-txt">FAQ</span></b-list-group-item
              >
            </b-list-group>
          </b-col>
          <b-col md="3" lg="2" xl="2" class="mb-4">
            <!-- Links -->

            <h6 class="text-uppercase fw-bold mb-4 dgreen-txt">Conta</h6>

            <b-list-group>
              <router-link class="text-decoration-none" to="/conta">
                <b-list-group-item href="#" class="text-reset footer-links"
                  ><span class="grey-txt"
                    >A minha conta</span
                  ></b-list-group-item
                >
              </router-link>
              <router-link class="text-decoration-none" to="/encomendas">
                <b-list-group-item href="#" class="text-reset footer-links"
                  ><span class="grey-txt">Encomendas</span></b-list-group-item
                >
              </router-link>
              <b-list-group-item href="#" class="text-reset footer-links"
                ><span class="grey-txt">Devoluções</span></b-list-group-item
              >
              <b-list-group-item href="#" class="text-reset footer-links"
                ><span class="grey-txt">Envio</span></b-list-group-item
              >
            </b-list-group>
          </b-col>
        </b-row>
      </b-container>
      <div class="p-4 text-center mb-3" style="color: #c2c2c2">
        Copyright © 2023 HiveTown. All Rights Reserved
      </div>
    </b-footer>
  </div>
</template>

<style>
.custom-footer {
  /* background-color: green; */
  border-top: 1px solid #f3f3f3;
}

.footer-icon {
  color: #5a5a5a;
  font-size: 1.5em;
}

.footer-links {
  border: none !important;
  border-radius: 0% !important;
}

@media (max-width: 767px) {
  .custom-footer {
    display: none !important;
  }
}
</style>
