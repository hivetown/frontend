<template>
  <div class="d-flex parent">
    <!-- Produtos -->
    <div class="d-flex align-items-center prods-found">
      <p>
        <span>{{ items }}</span> produtos encontrados
      </p>
    </div>

    <!-- Faz de placeholder -->
    <div class="w-25 mobile-place" style=""></div>
    <div
      class="w-50 d-flex justify-content-end align-items-center"
      style="gap: 2vh; margin-top: -4vh"
    >
      <!-- Views -->
      <div
        class="custom-views d-flex justify-content-center align-items-center"
        style="width: 10%"
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
            <b-dropdown-item
              @click="setCurrentPageSize(size)"
              v-for="size in pageSizes"
              :key="size"
              >{{ size }} items</b-dropdown-item
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
  /* background-color: #fff !important;
  border: 2px solid #dfdfdf; */
}

.views-btn .btn.show,
.views-btn .btn:hover {
  border: 2px solid #dfdfdf !important;
}

.views-btn .dropdown-toggle::after {
  /* color: #164a41; */
  color: white;
}

.prods-found {
  width: 25%;
}

@media (max-width: 768px) {
  .prods-found {
    width: 200vh !important;
    padding: 0.3em;
    /* background-color: blue; */
    margin-top: 2vh;
  }
  .prods-found p,
  .prods-found span {
    font-size: 0.8em;
  }

  .prods-found span {
    font-weight: bold;
  }

  .views-btn {
    /* background-color: red; */
    margin-top: 4vh;
    scale: 0.9;
  }

  .mobile-place {
    display: none;
  }
}
</style>
<style scoped></style>

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
    preventRedirect: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      order: 'Avaliação',
      currentPageSize: this.amount,
      pageSizes: [12, 24, 48, 72, 96],
    };
  },
  emits: {
    // eslint-disable-next-line no-unused-vars
    'update:pageSize': (size: number) => true,
  },
  methods: {
    setCurrentPageSize(size: number) {
      this.currentPageSize = size;
      this.$emit('update:pageSize', size);

      if (this.preventRedirect) return;
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set('pageSize', size.toString());
      window.location.replace(currentUrl.toString());
    },
  },
};
</script>
