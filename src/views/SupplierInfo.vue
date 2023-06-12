<template>
  <div class="d-flex parent p-4" style="background-color: ">
    <div class="w-25 mt-4" style="background-color: ; height: ">
      <div class="">
        <!-- Imagem do produtor -->
        <img
          v-if="dadosProdutor.user.image"
          class="producer-image d-block mx-auto"
          :src="dadosProdutor.user.image.url"
          :alt="dadosProdutor.user.image.alt"
        />
      </div>
    </div>
    <!-- Sobre -->
    <div
      class="w-75 p-4 px-5"
      style="background-color: ; height: ; flex-direction: column"
    >
      <!-- <div id="info" class="mb-4" style="border-bottom: solid 1px #e4e4e4"> -->
      <div id="info" class="mb-4">
        <h3 class="mb-4 dgreen-txt">{{ dadosProdutor.user.name }}</h3>
        <!-- <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, quam
          veniam reprehenderit quasi numquam ratione fuga vel, eum soluta
          reiciendis placeat corrupti odio consequatur alias nisi deserunt
          laudantium a doloremque!
        </p> -->
        <div class="">
          <div class="d-flex gap-2 grey-txt">
            <i class="bi bi-telephone-fill yellow-txt"></i>
            <p class="fw-bold">Telefone:</p>
            <span>{{ dadosProdutor.user.phone }}</span>
          </div>
          <div class="d-flex gap-2 grey-txt">
            <i class="bi bi-envelope-fill yellow-txt"></i>
            <p class="fw-bold">Email:</p>
            <span>{{ dadosProdutor.user.email }}</span>
          </div>
          <div class="d-flex gap-2 grey-txt">
            <i class="bi bi-receipt yellow-txt"></i>
            <p class="fw-bold">VAT:</p>
            <span>{{ dadosProdutor.user.vat }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="parent px-5">
    <h5 class="mb-4">
      Unidades de produção: <span>({{ unidadesProd.totalItems }})</span>
    </h5>
    <div class="d-flex production-unit-container">
      <div class="units-container" style="width: 20%">
        <div v-for="(unidade, idU) in unidadesProd.items" :key="idU" class="">
          <div
            :id="String(idU)"
            @click="updateImage(idU + 1)"
            class="production-unit"
          >
            <p class="text-center fw-bold">{{ unidade.name }}</p>
            <div class="d-flex gap-2 justify-content-center">
              <p class="text-center mb-1">nº{{ unidade.address.number }},</p>
              <p class="text-center mb-1">
                {{ unidade.address.floor }} {{ unidade.address.door }}
              </p>
              <p class="text-center">{{ unidade.address.zipCode }}</p>
            </div>
            <!-- TODO - por automatico -->
            <p class="text-center mb-1">A 5km de si</p>
          </div>
        </div>
      </div>
      <div class="" style="background-color: lightgrey; width: 80%">
        <!-- TODO - trocar src das imagens por sources do mapa (ver como) -->
        <img
          class=""
          :src="'map' + mapImage + '.png'"
          :alt="'Map ' + mapImage"
          style="object-fit: cover; height: 100%; width: 100%"
        />
      </div>
    </div>
  </div>
  <!-- TODO - ajeitar -->
  <div>
    <!-- <Pagination
      v-if="unidadesProd"
      :total-rows="unidadesProd.totalItems"
      :per-page="unidadesProd.pageSize"
      :current-page="unidadesProd.page"
    ></Pagination> -->
  </div>
</template>

<script lang="ts">
import { BaseItems, Producer, productionUnit } from '@/types';
import { fetchProducer, fetchProducerProductionUnits } from '@/api';
import Pagination from '@/components/Pagination.vue';
export default {
  data() {
    return {
      mapImage: 1,
      dadosProdutor: {} as Producer,
      unidadesProd: {} as BaseItems<productionUnit>,
      elementoSelecionado: 0 as number,
    };
  },
  props: {
    // producerId: {
    //   type: Number,
    //   required: true,
    // },
  },
  methods: {
    updateImage(number: number) {
      const idElemento = number - 1;
      const upSelecionada = this.$refs[idElemento + 1] as HTMLElement[];
      this.mapImage = number;
      const elemento = document.getElementById(String(idElemento));
      const atual = document.getElementById(String(this.elementoSelecionado));
      if (elemento && idElemento != this.elementoSelecionado) {
        elemento.classList.add('selected-unit');
        atual?.classList.remove('selected-unit');
        this.elementoSelecionado = idElemento;
      }
    },
  },
  async beforeMount() {
    // Dados do produtor
    const producerId = Number(this.$route.params.id);
    const dadosProdutor = await fetchProducer(producerId);
    this.dadosProdutor = dadosProdutor.data;
    // Unidades de produção do produtor
    const unidadesProd = await fetchProducerProductionUnits(producerId);
    this.unidadesProd = unidadesProd.data;
    console.log(this.unidadesProd);

    // Define a UP selecionada por default
    let atualSelecionado = document.getElementById(
      String(this.elementoSelecionado)
    );
    if (atualSelecionado) {
      atualSelecionado.classList.add('selected-unit');
    }
  },
  components: { Pagination },
};
</script>

<style>
.content {
  margin-left: 10px;
  padding: 10px;
  background-color: #eee;
}

#info h3 {
  font-family: 'DM Serif Display', serif;
  font-size: 3.5vh;
}

.producer-image {
  width: 20vh;
  height: 20vh;
  border-radius: 50%;
  border: 5px solid #164a41;
  object-fit: cover;
}

.production-unit-container {
  max-height: 45vh;
  border-radius: 0.8vh;
}
.units-container {
  overflow-y: scroll;
}
.production-unit {
  box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
  border-radius: 0.8vh;
  width: 95%;
  display: block;
  margin: auto;
  margin-top: 4%;
  margin-bottom: 4%;
  padding: 5%;
}

.production-unit:hover {
  border: 2px solid #f3f3f3;
}

.selected-unit {
  border: 2px solid #f1b24a;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
  cursor: pointer;
}

.selected-unit:hover {
  border: 2px solid #f1b24a;
}
</style>
