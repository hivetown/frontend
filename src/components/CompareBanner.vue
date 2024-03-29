<template>
  <!-- Main div do comparador -->
  <div v-if="!showModal" class="compare-banner d-flex align-items-center">
    <!-- Conteúdo da div do comparador -->
    <div class="parent d-flex compare-banner-info">
      <div class="d-flex flex-column banner-text">
        <h5 class="dgreen-txt">
          Comparador
          <span
            class="badge bg-secondary"
            :style="products.length === 1 ? 'border-radius: 100%' : ''"
          >
            {{ products.length }}
          </span>
        </h5>

        <p v-if="products.length < 2" class="grey-txt">
          Ainda pode adicionar
          <span>{{ 2 - products.length }} produtos</span>
        </p>
        <p v-else>Selecionou o máximo de produtos</p>
      </div>

      <div class="d-flex gap-4 banner-products">
        <!-- Mostrar os Produtos -->
        <div v-for="product in products" :key="product.id">
          <div
            style="position: relative"
            class="prod-container d-flex justify-content-center align-items-center"
          >
            <!-- <i
              class="bi bi-x-lg"
              style="position: absolute; color: red"
              @click="removeItem(product)"
            ></i> -->
            <i
              class="bi bi-x-lg"
              style="position: absolute; color: red"
              @click="removeItem(product)"
            ></i>
            <img
              class="square-image"
              :src="product.images[0].url"
              :alt="product.images[0].alt"
            />
          </div>
        </div>
      </div>

      <div class="d-flex flex-column justify-content-center align-items-center">
        <!-- Botão de comparar -->
        <button
          type="button"
          class="btn btn-secondary rounded-pill compare-btn"
          v-b-tooltip.hover
          title="Comparar produto"
          :disabled="!canCompare"
          @click="openModal"
        >
          <i style="color: #eeeeee" class="bi bi-arrow-left-right"></i> Comparar
        </button>
        <!-- <a href="#" id="limpar" @click="removeAllItems">Limpar tudo</a> -->
        <button id="limpar" @click="removeAll">Limpar tudo</button>
      </div>
    </div>
  </div>

  <!-- Overlay com a comparação após clicar em comparar -->
  <div>
    <b-modal
      v-model="showModal"
      size="xl"
      id="modal-center"
      centered
      scrollable
      hide-footer
    >
      <Compare v-if="showModal" :products="products" />
    </b-modal>
  </div>
</template>

<style scoped>
.compare-banner {
  background-color: #f3f3f3;
  height: 15vh;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10000;
}

.compare-banner-info {
  justify-content: center;
  align-items: center;
  gap: 4vh;
}
.prod-container {
  background-color: #c0c0c0;
  height: 10vh;
  width: 10vh;
  border: 1px dashed #f3f3f3;
  border-radius: 0.5em;
}

.prod-container i {
  font-size: 1.5em;
  color: #eeeeee;
}

.square-image {
  border-radius: 0.5em !important;
}

#limpar {
  border: none;
  text-decoration: underline;
  color: blue;
  background-color: none;
}

@media (max-width: 768px) {
  .compare-banner-info {
    gap: 1vh !important;
  }

  .banner-text {
    padding: 0.6em;
  }
  .banner-text h5 {
    font-size: 0.9em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .banner-text p {
    font-size: 0.8em;
    text-align: center;
  }
  .prod-container {
    height: 7vh;
    width: 7vh;
  }
  .banner-products {
    gap: 1vh !important;
  }
  .compare-btn {
    scale: 0.7 !important;
    width: 15vh !important;
  }

  #limpar {
    font-size: 0.8em;
  }

  .badge {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 3.5vh;
    min-height: 3vh;
    border-radius: 0.5em !important;
    scale: 0.9;
  }
}
</style>

<script lang="ts">
import { PropType } from 'vue';
import Compare from '@/components/Compare.vue';
import { ProductSpec } from '@/types';

export default {
  emits: {
    // eslint-disable-next-line no-unused-vars
    removeItem: (productSpec: ProductSpec) => true,
    removeAllItems: () => true,
  },
  data() {
    return {
      showModal: false,
    };
  },
  computed: {
    canCompare() {
      return this.products.length >= 2;
    },
  },
  props: {
    products: {
      type: Object as PropType<ProductSpec[]>,
      required: true,
    },
  },
  components: {
    Compare,
  },
  methods: {
    removeItem(produto: ProductSpec) {
      this.$emit('removeItem', produto);
    },
    removeAll() {
      this.$emit('removeAllItems');
    },
    openModal() {
      this.showModal = true;
    },
  },
  watch: {
    products: {
      immediate: true,
      handler() {
        console.log('products changed');
      },
    },
  },
};
</script>
