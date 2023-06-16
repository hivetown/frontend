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
                label="Nome:"
                label-for="input-2"
                label-cols="3"
              >
                <b-form-input
                  id="input-1"
                  placeholder="Insira o Nome do transporte"
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
          placeholder="Escrever Nome"
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
          :items="listOfPUs"
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
              <b-col col lg="15">
                <b-form-select
                  v-model="selectedValue"
                  :options="listOfPUsIDs"
                  size="sm"
                  class="mt-3"
                  @input="updateQnt"
                  @change="changePUtoEdit"
                ></b-form-select>
              </b-col>
              <b-col>
                <p>Edite os detalhes de: {{ puToEditIndex }}</p>
                <p>Deixe em branco o que não pretende alterar</p>
                <b-form @submit="submitNewBrand">
                  <b-form-group label="Nome">
                    <b-form-input v-model="input1" type="text"></b-form-input>
                  </b-form-group>
                  <b-button type="submit" variant="primary"
                    >Submeter novo Nome</b-button
                  >
                </b-form>
                <b-form @submit="submitNewAddress">
                  <b-form-group label="Número">
                    <b-form-input v-model="input1" type="number"></b-form-input>
                  </b-form-group>
                  <b-form-group label="Porta">
                    <b-form-input v-model="input2" type="text"></b-form-input>
                  </b-form-group>
                  <b-form-group label="Andar">
                    <b-form-input v-model="input3" type="number"></b-form-input>
                  </b-form-group>
                  <b-form-group label="Código Postal">
                    <b-form-input v-model="input4" type="text"></b-form-input>
                  </b-form-group>
                  <b-form-group label="Rua">
                    <b-form-input v-model="input5" type="text"></b-form-input>
                  </b-form-group>
                  <b-form-group label="Freguesia">
                    <b-form-input v-model="input6" type="text"></b-form-input>
                  </b-form-group>
                  <b-form-group label="País">
                    <b-form-input v-model="input7" type="text"></b-form-input>
                  </b-form-group>
                  <b-form-group label="Cidade">
                    <b-form-input v-model="input8" type="text"></b-form-input>
                  </b-form-group>
                  <b-form-group label="Distrito">
                    <b-form-input v-model="input9" type="text"></b-form-input>
                  </b-form-group>
                  <b-form-group label="Latitude">
                    <b-form-input
                      v-model="input10"
                      type="number"
                    ></b-form-input>
                  </b-form-group>
                  <b-form-group label="Longitude">
                    <b-form-input
                      v-model="input11"
                      type="number"
                    ></b-form-input>
                  </b-form-group>
                  <b-button type="submit" variant="primary"
                    >Submeter nova Morada</b-button
                  >
                </b-form>
              </b-col>
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
} from '@/api/producers';
import { Address, ProdUnit, ProductionUnit, Image } from '@types';

export default {
  data() {
    return {
      userProdUnit: {} as Array<Object>,

      sortBy: 'ID',
      sortDesc: false,
      fields: [
        { key: 'ID', sortable: true },
        { key: 'Nome', sortable: true },
        { key: 'Morada', sortable: true },
        { key: 'Acoes', label: 'Ações', sortable: false },
      ],

      listOfPUs: [] as string[],
      listOfPUsIDs: [] as string[],

      showModalDialog: false,
      inputValue: '',

      puToEditIndex: -1 as number,

      userLoggedId: 1 as number,
      userLoggedName: '' as string,
      userLoggedNImage: {} as Image,
      userLoggedType: '' as string,
    };
  },

  async beforeMount() {
    await this.getPUnit(15);
  },

  methods: {
    showModal() {
      this.showModalDialog = true;
    },

    changePUtoEdit(selectedPU: string) {
      const wantedIndex = this.listOfPUsIDs.indexOf(selectedPU as string);
      this.puToEditIndex = wantedIndex;
      //this.listOfPUs[wantedIndex]['ID'];
    },

    submitNewBrand() {
      const newName = this.input1 as string;
      updateProductionUnit(
        15,
        this.listOfPUs[this.puToEditIndex]['ID'],
        newName,
        15
      );
    },

    submitNewAddress() {
      console.log(this.input1);
      const newAddres: Address = {
        id: this.listOfPUs[this.puToEditIndex]['ID'],
        number: this.input1 as number,
        door: this.input2,
        floor: this.input3 as number,
        zipCode: this.input4,
        street: this.input5,
        parish: this.input6,
        country: this.input7,
        city: this.input8,
        district: this.input9,
        latitude: this.input10 as number,
        longitude: this.input11 as number,
      };
      if (this.puToEditIndex !== -1) {
        console.log(
          15,
          this.listOfPUs[this.puToEditIndex]['ID'],
          this.listOfPUs[this.puToEditIndex]['Nome'],
          newAddres
        );
        updateProductionUnit(
          15,
          this.listOfPUs[this.puToEditIndex]['ID'],
          this.listOfPUs[this.puToEditIndex]['Nome']
        );
      }
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

    async getPUnit(producerId: number) {
      try {
        this.userProdUnit = (await fetchProductionUnits(producerId)).data.items;
        console.log('UP', this.userProdUnit[1].address?.id);

        const opts: {
          id: number;
          nome: string;
          morada: string;
          acoes: number;
        }[] = [];

        for (let i = 0; i < Object.entries(this.userProdUnit).length; i++) {
          const build = {
            ID: this.userProdUnit[i].id,
            Nome: this.userProdUnit[i].name,
            Morada: `${this.userProdUnit[i].address?.county}, ${this.userProdUnit[i].address?.city},
				  ${this.userProdUnit[i].address?.district}, ${this.userProdUnit[i].address?.street}
				  ${this.userProdUnit[i].address?.number} ${this.userProdUnit[i].address?.zipCode}`,
            Acoes: this.userProdUnit[i].address?.id,
          };
          opts.push(build);
        }

        console.log('options', opts);
        this.listOfPUs = opts;
        for (let i = 0; i < this.listOfPUs.length; i++) {
          this.listOfPUsIDs.push(
            `ID: ${this.listOfPUs[i]['ID']} - Nome: ${this.listOfPUs[i]['Nome']}`
          );
        }
        console.log('itemIDs', this.listOfPUsIDs);
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
