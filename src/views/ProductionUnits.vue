<template>
  <div class="root">
    <div class="wrapper-mains">
      <h1>Unidades de Produção</h1>
      <br />
      <h3 class="parent dgreen-txt">Adicionar Novo Transporte</h3>
      <!--Faltam os v-model="form.name" dentro dos b-form-input-->
      <div>
        <b-form inline>
          <!--@submit="onSubmit" @reset="onReset" v-if="show">-->
          <b-row>
            <b-col>
              <b-form-group id="input-group-1" label="ID:" label-for="input-1">
                <b-form-input
                  id="input-1"
                  placeholder="ID do transporte"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                id="input-group-2"
                label="Marca:"
                label-for="input-2"
              >
                <b-form-input
                  id="input-2"
                  placeholder="Marca do transporte"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                id="input-group-3"
                label="Capacidade:"
                label-for="input-3"
              >
                <b-form-input
                  id="input-3"
                  placeholder="Capacidade do transporte"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <div class="d-flex justify-content-center pd-2">
            <b-button type="submit">Adicionar</b-button>
            <b-button type="reset" variant="danger">Recomeçar</b-button>
          </div>
        </b-form>
      </div>

      <div>
        <!--<PUCOmp v-for="puComp" in ProductionUnit.> </PUCOmp>-->
        {{ Address }}
      </div>
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
import PUComp from '@/components/ProductionUnitsComp.vue';
</script>

<script lang="ts">
import {
  createProdutionUnit,
  updateProductionUnit,
  deleteProductionUnit,
} from '../api/producers';
import { Address, ProductionUnit } from '@types';

export default {
  data() {
    return {
      pucomps: {} as ProdUnit,
    };
  },

  methods: {
    addProdUnit(id: number, name: string, address: Address) {
      createProdutionUnit(id, name, address);
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
