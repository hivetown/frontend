<template>
  <div class="d-flex parent p-4" style="background-color: ">
    <!-- <div class="w-25" style="background-color:; height:; border-right: solid 2px #eeeeee;"> -->
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
      <!-- <h3 class="text-center mt-4 mb-3">Nome</h3> -->
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
    <!-- {{ unidadesProd }} -->
    <h5 class="">
      Unidades de produção: <span>({{ unidadesProd.totalItems }})</span>
    </h5>
    <!-- TODO - meter mais pequeno -->
    <div class="d-flex" style="border: solid 2px #f1b24a; border-radius: 0.5vh">
      <div class="" style="width: 35%">
        <div
          v-for="(unidade, idU) in unidadesProd.items"
          :key="idU"
          style="border-bottom: solid 2px #f1b24a"
          class="p-3"
        >
          <!-- {{ unidade }} -->
          <div @click="updateImage(idU)">
            <p class="text-center fw-bold">{{ unidade.name }}</p>
            <div class="">
              <p class="text-center mb-1">nº{{ unidade.address.number }}</p>
              <p class="text-center">{{ unidade.address.zipCode }}</p>
            </div>
            <!-- TODO - por automatico -->
            <p class="text-center">A 5km de si</p>
          </div>
        </div>
      </div>
      <div class="w-75" style="background-color: pink; height: ">
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
    <Pagination
      v-if="unidadesProd"
      :total-rows="unidadesProd.totalItems"
      :per-page="unidadesProd.pageSize"
      :current-page="unidadesProd.page"
    ></Pagination>
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
      this.mapImage = number;
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
</style>
