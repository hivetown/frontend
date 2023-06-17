<template>
  <div class="d-flex parent">
    <!-- Produtos -->
    <div class="w-25 d-flex align-items-center">
      <p>
        <span>{{ items }}</span> produtos encontrados
      </p>
    </div>

    <!-- Faz de placeholder -->
    <div class="w-25" style=""></div>
    <div
      class="w-50 d-flex justify-content-end align-items-center"
      style="gap: 2vh; margin-top: -4vh"
    >
      <!-- Views -->
      <div
        class="custom-views d-flex justify-content-center align-items-center"
        style="width: 10%; background-color: red !important"
      >
        <!-- <i
          class="bi bi-grid selected"
          v-b-tooltip.hover
          title="Vista em grelha"
        ></i> -->
        <!-- <i class="bi bi-list-ul" v-b-tooltip.hover title="Vista em lista"></i> -->
      </div>

      <!-- Mostrar -->
      <div class="d-flex">
        <!-- Quantidade -->
        <div class="views-btn">
          <b-dropdown
            id="dropdown-1"
            :text="'Mostrar: ' + currentPageSize + ' items'"
            class="m-md-2"
          >
            <b-dropdown-item @click="setCurrentPageSize(12)"
              >12 items</b-dropdown-item
            >
            <b-dropdown-item @click="setCurrentPageSize(24)"
              >24 items</b-dropdown-item
            >
            <b-dropdown-item @click="setCurrentPageSize(48)"
              >48 items</b-dropdown-item
            >
          </b-dropdown>
        </div>
        <!-- Ordem -->
        <!-- <div class="views-btn">
          <b-dropdown
            id="dropdown-1"
            :text="'Mostrar: ' + order"
            class="m-md-2"
          >
            <b-dropdown-item @click="order = 'Avaliação'"
              >Avaliação</b-dropdown-item
            >
            <b-dropdown-item @click="order = 'Preço (ascendente)'"
              >Preço (ascendente)</b-dropdown-item
            >
            <b-dropdown-item @click="order = 'Preço (descendente)'"
              >Preço (descendente)</b-dropdown-item
            >
          </b-dropdown>
        </div> -->
      </div>
    </div>
  </div>
</template>

<style>
.custom-views {
  gap: 0.5em !important;
}

.custom-views i {
  color: #919191;
  font-size: 2.5vh;
  cursor: pointer;
}

.selected {
  color: #164a41 !important;
}

.views-btn .btn {
  background-color: #fff !important;
  border: 2px solid #dfdfdf;
}

.views-btn .btn.show,
.views-btn .btn:hover {
  border: 2px solid #dfdfdf !important;
}

.views-btn .dropdown-toggle::after {
  color: #164a41;
}
</style>

<script lang="ts">
export default {
  props: {
    amount: {
      type: Number,
      required: true,
    },
    items: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      order: 'Avaliação',
      currentPageSize: this.amount,
    };
  },
  methods: {
    setCurrentPageSize(size: number) {
      this.currentPageSize = size;
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set('pageSize', size.toString());
      window.location.replace(currentUrl.toString());
    },
  },
};
</script>
