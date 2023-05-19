<template>
  <div class="d-flex gap-3">
    <b-table :items="items" :fields="fields" striped responsive="sm">
      <template #row-details="row">
        <b-table>
          <b-col col="3">
            <b-card class="prod-card"> Icon </b-card>
          </b-col>
          <b-col col="5">
            <p>
              Marca: {{ pu.name }}
              <button
                @click="editPUName"
                variant="danger"
                type="button"
                class="btn btn-outline-secondary circle-btn"
                title="Remover Unidade de Produção"
              >
                <i class="bi bi-pencil-square"></i>
              </button>
            </p>
          </b-col>
          <b-col col="10">
            <p>
              Morada: {{ pu.address?.county }}, {{ pu.address?.city }},
              {{ pu.address?.district }}, {{ pu.address?.street }}
              {{ pu.address?.number }} {{ pu.address?.zipCode }}
              <button
                @click="editAddress"
                variant="danger"
                type="button"
                class="btn btn-outline-secondary circle-btn"
                title="Remover Unidade de Produção"
              >
                <i class="bi bi-pencil-square"></i>
              </button>
            </p>
          </b-col>
          <b-col>
            <p>ID: {{ pu.id }}</p>
          </b-col>
          <b-col col="1">
            <button
              @click="removePU"
              variant="danger"
              type="button"
              class="btn btn-outline-secondary circle-btn"
              title="Remover Unidade de Produção"
            >
              <i class="bi bi-x-lg"></i>
            </button>
          </b-col>
        </b-table>
      </template>
    </b-table>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { getUnit } from '../api/producers';
import { Address, ProdUnit, ProductionUnit } from '@types';

export default {
  data() {
    return {};
  },

  props: {
    // Isto são coisas que se recebe do componente pai
    pu: {
      type: Object as PropType<ProductionUnit>,
      required: true,
    },
  },

  methods: {
    getProdUnit(producerId: number, unitId: number) {
      getUnit(producerId, unitId);
    },
  },
};
</script>
