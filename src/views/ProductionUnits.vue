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
                label="Morada:"
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

      <hr />

      <h3 class="parent dgreen-txt">Gestão de Unidades de Produção</h3>

      <br />

      <b-input-group size="sm">
        Filtros:
        <b-form-input
          id="filter-input"
          v-model="filter"
          type="search"
          placeholder="Escrever ID"
        ></b-form-input>

        <b-input-group-append>
          <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
        </b-input-group-append>
        <b-form-input
          id="filter-input"
          v-model="filter"
          type="search"
          placeholder="Escrever Marca"
        ></b-form-input>

        <b-input-group-append>
          <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
        </b-input-group-append>
        <b-form-input
          id="filter-input"
          v-model="filter"
          type="search"
          placeholder="Escrever Morada"
        ></b-form-input>

        <b-input-group-append>
          <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
        </b-input-group-append>
      </b-input-group>

      <div>
        <b-table
          :items="items"
          :fields="fields"
          v-model:sort-by="sortBy"
          v-model:sort-desc="sortDesc"
          responsive="sm"
        >
          <template #cell(name)="row">
            {{ row.value.first }} {{ row.value }}
          </template>

          <template #cell(Acoes)="row">
            <b-button size="sm" @click="showModal" class="mr-1">
              Gerir<i class="bi bi-pencil-square"></i>
            </b-button>
            <b-modal
              v-model="showModalDialog"
              title="Gerenciamento de Veículos"
            >
              <b-dropdown text="Button text via Prop">
                <b-dropdown-item href="#">An item</b-dropdown-item>
                <b-dropdown-item href="#">Another item</b-dropdown-item>
              </b-dropdown>
            </b-modal>
          </template>
        </b-table>

        <div>
          Sorting By: <b>{{ sortBy }}</b
          >, Sort Direction:
          <b>{{ sortDesc ? 'Descending' : 'Ascending' }}</b>
        </div>
      </div>
    </div>
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
        { key: 'Acoes', label: 'Ações', sortable: false },
      ],

      items: {},

      showModalDialog: false,
      inputValue: '',
    };
  },

  async beforeMount() {
    await this.getPUnit(15);
  },

  methods: {
    showModal() {
      this.showModalDialog = true;
    },

    submitForm() {
      console.log('Insira novo nome:', this.inputValue);
      this.showModalDialog = false;
    },
    changeBrand(brand: string, unitid: number, address: Address) {
      console.log('Nova marca:', brand);
      console.log('Unit id:', unitid);
      console.log('Morada:', address);
      updateProductionUnit(15, unitid, brand, address);
    },
    changeAddress() {
      console.log('Insira a nova morada:', this.inputValue);
      this.showModalDialog = false;
    },
    changeID() {
      console.log('Insira o novo ID:', this.inputValue);
      this.showModalDialog = false;
    },

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
            Acoes: this.userProdUnit[i].id,
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
