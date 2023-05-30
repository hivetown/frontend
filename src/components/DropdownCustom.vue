<template>
  <div class="card flex justify-content-center">
    <Dropdown
      v-model="selectedView"
      editable
      :options="view"
      option-label="name"
      placeholder="Escolha o que deseja visualizar"
      class="w-full"
      @change="emitViewSelect"
    />
  </div>
  <!-- A usar para os pedidos -->
  <!-- {{ selectedView.code }} -->
</template>

<!-- <script setup lang="ts">
import { ref } from 'vue';
import Dropdown from 'primevue/dropdown';
const selectedView = ref();
const view = ref([
  { name: 'Número de encomendas', code: 'numeroEncomendas' },
  { name: 'Total de produtos comprados', code: 'totalProdutos' },
  { name: 'Total gasto em compras', code: 'comprasTotais' },
]);
</script>

<script lang="ts">
export default {
  emits: ['view'],
  methods: {
    emitViewSelect() {
      this.$emit('view', selectedView);
    },
  },
};
</script> -->

<script lang="ts">
import { ref } from 'vue';
import Dropdown from 'primevue/dropdown';

export default {
  components: {
    Dropdown,
  },
  emits: ['view'],
  setup(_, { emit }) {
    const selectedView = ref(null);
    const view = ref([
      { name: 'Número de encomendas', code: 'numeroEncomendas' },
      { name: 'Total de produtos comprados', code: 'totalProdutos' },
      { name: 'Total gasto em compras', code: 'comprasTotais' },
    ]);

    const emitViewSelect = () => {
      emit('view', selectedView.value);
    };

    return {
      selectedView,
      view,
      emitViewSelect,
    };
  },
};
</script>
