<!-- eslint-disable vue/valid-v-for -->
<template>
  <div class="root">
    <div class="wrapper-mains">
      <h1>Unidades de Produção</h1>
      <hr />
      <h3 class="parent dgreen-txt">Adicionar Unidades de Produção</h3>
      <!--Faltam os v-model="form.name" dentro dos b-form-input-->
      <div>
        <b-form inline>
          <!--@submit="onSubmit" @reset="onReset" v-if="show">-->
          <b-row>
            <b-col>
              <b-form-group
                id="input-group-1"
                label="Marca:"
                label-for="input-2"
                label-cols="3"
              >
                <b-form-input
                  id="input-1"
                  placeholder="Insira a Marca do transporte"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                id="input-group-2"
                label="Capacidade:"
                label-for="input-2"
                label-cols="3"
                label-cols-sm="3"
              >
                <b-form-input
                  id="input-3"
                  placeholder="Insira uma Morada válida"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <div class="d-flex justify-content-center pd-2">
                <b-button type="submit">Adicionar</b-button>
                <b-button type="reset" variant="danger">Recomeçar</b-button>
              </div>
            </b-col>
          </b-row>
        </b-form>
      </div>

      <br />
      <hr />

      <h3 class="parent dgreen-txt">Gestão de Unidades de Produção</h3>

      <div>
        <b-table
          :items="items"
          :fields="fields"
          v-model:sort-by="sortBy"
          v-model:sort-desc="sortDesc"
          responsive="sm"
        ></b-table>

        <div>
          Sorting By: <b>{{ sortBy }}</b
          >, Sort Direction:
          <b>{{ sortDesc ? 'Descending' : 'Ascending' }}</b>
        </div>
      </div>

      <br />
      <hr />

      <h3 class="parent dgreen-txt">Zona de Teste</h3>

      <hr />
    </div>
  </div>

  <hr />
  <div>
    <b-form inline>
      <label class="sr-only" for="inline-form-input-name">Name</label>
      <b-form-input
        id="inline-form-input-name"
        class="mb-2 mr-sm-2 mb-sm-0"
        placeholder="Jane Doe"
      ></b-form-input>

      <label class="sr-only" for="inline-form-input-username">Username</label>
      <b-input-group prepend="@" class="mb-2 mr-sm-2 mb-sm-0">
        <b-form-input
          id="inline-form-input-username"
          placeholder="Username"
        ></b-form-input>
      </b-input-group>

      <b-form-checkbox class="mb-2 mr-sm-2 mb-sm-0"
        >Remember me</b-form-checkbox
      >

      <b-button variant="primary">Save</b-button>
    </b-form>
  </div>
</template>

<style>
.container {
  display: flex;
  align-items: center;
}

table {
  border: 1px solid #aaa;
  width: 100%;
  border-collapse: collapse;
}

@media (max-width: 800px) {
  tr {
    display: block;
  }

  td {
    border: 1px solid black;
    padding-left: 10px;
    padding-right: 10px;
    display: inline-block;
    word-break: break-all;
  }
}

.left-column {
  width: 55%;
}

.right-column {
  width: 25%;
}

.checkout {
  float: right;
  text-align: center;
}
</style>

<style scoped>
.wrapper-mains {
  height: auto;
  background: white;
  text-align: center;
  margin: auto;
  padding: 20px;
}
.textarea {
  display: block;
  width: 100%;
  height: 70px;
  border-radius: 5px;
}
.tabela {
  margin-top: 180px;
}
.titulo {
  font-size: 20px;
}
@media (max-width: 660px) {
  .titulo {
    font-size: 25px;
    text-align: center !important;
  }
  .resumo {
    margin-top: 10px;
    text-align: right;
    margin-right: 40px;
  }
}
</style>

<script setup lang="ts">
import ProductionUnitsComp from '@/components/ProductionUnitsComp.vue';
</script>

<script lang="ts">
import {
  getUnits,
  getUnit,
  fetchProductionUnits,
  createProductionUnit,
  updateProductionUnit,
  deleteProductionUnit,
} from '../api/producers';
import { Address, ProdUnit, ProductionUnit } from '@types';

export default {
  data() {
    return {
      userProdUnit: {} as Array<Object>,
      teste: this.getPUs(),

      sortBy: 'ID',
      sortDesc: false,
      fields: [
        { key: 'ID', sortable: true },
        { key: 'Marca', sortable: true },
        { key: 'Morada', sortable: true },
      ],

      items: {},
    };
  },

  async beforeMount() {
    await this.getPUnit(1);
  },

  methods: {
    getPUs() {
      this.getPUnit(1);
      return this.userProdUnit;
    },

    async getPUnit(producerId: number) {
      try {
        this.userProdUnit = (await fetchProductionUnits(producerId)).data.items;

        const opts: { id: number; marca: string; morada: string }[] = [];

        for (let i = 0; i < Object.entries(this.userProdUnit).length; i++) {
          const build = {
            ID: this.userProdUnit[i].id,
            Marca: this.userProdUnit[i].name,
            Morada: `${this.userProdUnit[i].address?.county}, ${this.userProdUnit[i].address?.city},
				${this.userProdUnit[i].address?.district}, ${this.userProdUnit[i].address?.street}
				${this.userProdUnit[i].address?.number} ${this.userProdUnit[i].address?.zipCode}`,
          };
          opts.push(build);
        }
        console.log(opts);
        this.items = opts;
      } catch (error) {
        console.error(error);
      }
    },

    getOneUnit(producerId: number, unitId: number) {
      getUnit(producerId, unitId);
    },

    addProdUnit(id: number, name: string, address: Address) {
      createProductionUnit(id, name, address);
    },

    updateProdUnit(id: number, unitId: number, name: string, address: Address) {
      updateProductionUnit(id, unitId, name, address);
    },

    deleteProdUnit(producerId: number, unitId: number) {
      deleteProductionUnit(producerId, unitId);
    },
  },
};
</script>
