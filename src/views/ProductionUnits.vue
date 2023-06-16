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

      <div>
        <b-button size="sm" @click="showModal" class="mr-1">
          Gerir Unidades de Produção<i class="bi bi-pencil-square"></i>
        </b-button>
        <b-modal v-model="showModalDialog" title="Gerenciamento de Veículos">
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
          </b-col>
        </b-modal>
      </div>
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

<style scoped>
.wrapper-mains {
  height: auto;
  background: white;
  text-align: center;
  margin: auto;
  padding: 20px;
}
</style>

<script lang="ts">
import {
  fetchProductionUnits,
  createProductionUnit,
  updateProductionUnit,
  deleteProductionUnit,
} from '@/api/producers';
import { Image } from '@types';
import { computed } from 'vue';

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
    this.getLoginInfo();
    await this.getPUnit(this.userLoggedId);
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
      const newName = this.userLoggedName + ' - ' + (this.input1 as string);
      updateProductionUnit(
        this.userLoggedId,
        this.listOfPUs[this.puToEditIndex]['ID'],
        newName,
        this.userProdUnit[i].address?.id
      );
    },

    async getPUnit(producerId: number) {
      try {
        this.userProdUnit = (await fetchProductionUnits(producerId)).data.items;
        console.log('UP', this.userProdUnit[1].address?.id);

        const opts: {
          id: number;
          nome: string;
          morada: string;
        }[] = [];

        for (let i = 0; i < Object.entries(this.userProdUnit).length; i++) {
          const build = {
            ID: this.userProdUnit[i].id,
            Nome: this.userProdUnit[i].name,
            Morada: `${this.userProdUnit[i].address?.county}, ${this.userProdUnit[i].address?.city},
					${this.userProdUnit[i].address?.district}, ${this.userProdUnit[i].address?.street}
					${this.userProdUnit[i].address?.number} ${this.userProdUnit[i].address?.zipCode}`,
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

    getLoginInfo() {
      const userLoggedId = computed(() => this.$store.state.user);
      if (userLoggedId.value) {
        this.userLoggedId = userLoggedId.value['user']['id'];
        this.userLoggedName = userLoggedId.value['user']['name'];
        this.userLoggedType = userLoggedId.value['user']['type'];
        if (userLoggedId.value['user']['image']) {
          this.userLoggedNImage = userLoggedId.value['user']['image'];
        }
      }
      console.log(this.userLoggedId);
    },
  },
};
</script>
