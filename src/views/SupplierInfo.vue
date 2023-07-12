<template>
  <div class="parent" @click="goBack">
    <PageBack style="margin-top: -2vh"></PageBack>
  </div>
  <Loader v-if="loadingProducer" style="display: block; align-items: center" />
  <div class="d-flex parent p-4" v-if="!loadingProducer">
    <div class="w-25 mt-4" style="background-color: ; height: ">
      <div class="">
        <!-- Imagem do produtor -->
        <img
          v-if="dadosProdutor && dadosProdutor.user && dadosProdutor.user.image"
          class="producer-image mx-auto"
          :src="dadosProdutor.user.image.url"
          :alt="dadosProdutor.user.image.alt"
        />
      </div>
    </div>
    <!-- Sobre -->
    <div
      class="p-4 px-5 producer-mobile"
      style="background-color: ; height: ; flex-direction: column"
    >
      <!-- <div id="info" class="mb-4" style="border-bottom: solid 1px #e4e4e4"> -->
      <div id="info" class="mb-4">
        <h3 class="mb-4 dgreen-txt">{{ dadosProdutor.user?.name }}</h3>
        <!-- <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, quam
            veniam reprehenderit quasi numquam ratione fuga vel, eum soluta
            reiciendis placeat corrupti odio consequatur alias nisi deserunt
            laudantium a doloremque!
          </p> -->
        <div>
          <div class="d-flex gap-2 grey-txt">
            <i class="bi bi-telephone-fill yellow-txt"></i>
            <p class="fw-bold">Telefone:</p>
            <span>{{ dadosProdutor.user?.phone }}</span>
          </div>
          <div class="d-flex gap-2 grey-txt">
            <i class="bi bi-envelope-fill yellow-txt"></i>
            <p class="fw-bold">Email:</p>
            <span style="word-break: break-all">{{
              dadosProdutor.user?.email
            }}</span>
          </div>
          <div class="d-flex gap-2 grey-txt">
            <i class="bi bi-receipt yellow-txt"></i>
            <p class="fw-bold">VAT:</p>
            <span>{{ dadosProdutor.user?.vat }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="parent px-5">
    <h5 class="mb-4">
      Unidades de produção: <span>({{ unidadesProd.totalItems }})</span>
    </h5>
    <Loader v-if="loadingUP" />
    <div class="production-unit-container" v-if="!loadingUP">
      <div class="units-container" style="width: 20%; max-height: 400px">
        <div v-for="(unidade, idU) in unidadesProd.items" :key="idU" class="">
          <div
            :id="String(idU + 1)"
            @click="updateImage(idU)"
            :class="['production-unit', { 'selected-unit': mapImage === idU }]"
          >
            <p class="text-center fw-bold">{{ unidade.name }}</p>
            <div class="d-flex gap-2 justify-content-center">
              <p class="text-center mb-1">nº{{ unidade.address.number }},</p>
              <p class="text-center mb-1">{{ unidade.address.city }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="units-container-mobile" style="max-height: 400px">
        <div v-for="(unidade, idU) in unidadesProd.items" :key="idU" class="">
          <div
            :id="String(idU + 1)"
            @click="updateImage(idU)"
            :class="['production-unit', { 'selected-unit': mapImage === idU }]"
          >
            <p class="text-center fw-bold">{{ unidade.name }}</p>
            <div class="d-flex gap-2 justify-content-center">
              <p class="text-center mb-1">nº{{ unidade.address.number }},</p>
              <p class="text-center mb-1">{{ unidade.address.city }}</p>
            </div>
          </div>
        </div>
      </div>
      <Loader v-if="loadingMap" style="display: block; align-items: center" />
      <div class="map-container" v-if="!loadingMap">
        <div class="map-image" v-if="mapImage !== null && unidadesProd.items">
          <Maps
            class="map"
            v-if="unidadesProd.items[mapImage]"
            :selected-unit="unidadesProd.items[mapImage]"
            :map-data="
              mapData.find(
                (data) =>
                  data.unitId === (unidadesProd.items[mapImage]?.id || null)
              )?.mapData
            "
          />
        </div>
      </div>
      <div style="height: 60vh"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { BaseItems, Producer, ProductionUnit } from '@/types';
import { fetchProducer, fetchProducerProductionUnits } from '@/api';
import { fetchMapForUnit } from '@/maps/maps';
import Maps from '../maps/maps.vue';
import PageBack from '@/components/PageBack.vue';
import Loader from '@/components/Loader.vue';

export default {
  data() {
    return {
      mapImage: 0,
      dadosProdutor: {} as Producer,
      unidadesProd: {} as BaseItems<ProductionUnit>,
      indiceUpSelecionada: 0 as number,

      ultimaUp: [] as HTMLElement[],
      ultimaUpId: 1 as number,
      idUpDefault: 0 as number,
      mapData: [] as { unitId: number; mapData: any }[],

      loadingProducer: true,
      loadingUP: true,
      loadingMap: true,
    };
  },
  props: {
    // producerId: {
    //   type: Number,
    //   required: true,
    // },
  },
  methods: {
    goBack() {
      this.$router.go(-1); // Navega para a página anterior
    },
    updateImage(number: number) {
      const idElemento = number - 1;
      const upSelecionada = this.$refs[idElemento + 1] as HTMLElement[];
      this.mapImage = number;
      // Compara o id da ultima UP selecionada com o id da UP
      // selecionada atualmente
      if (upSelecionada && upSelecionada.length > 0) {
        if (this.ultimaUpId !== Number(upSelecionada[0].id)) {
          this.ultimaUpId = Number(upSelecionada[0].id);
          if (this.ultimaUp[0]) {
            this.ultimaUp[0].classList.remove('selected-unit');
          }
          upSelecionada[0].classList.add('selected-unit');
          this.ultimaUp = upSelecionada;
        }
      }
    },
  },
  async beforeMount() {
    // Dados do produtor
    const producerId = Number(this.$route.params.id);

    try {
      const dadosProdutor = await fetchProducer(producerId);
      this.dadosProdutor = dadosProdutor.data;
    } finally {
      this.loadingProducer = false;
    }
    // Unidades de produção do produtor
    try {
      const unidadesProd = await fetchProducerProductionUnits(producerId);
      this.unidadesProd = unidadesProd.data;
    } finally {
      this.loadingUP = false;
    }
    this.$nextTick(() => {
      const ultimaUpRef = this.$refs[1] as HTMLElement | HTMLElement[];
      if (ultimaUpRef instanceof HTMLElement) {
        this.ultimaUp = [ultimaUpRef];
        this.ultimaUp[0].classList.add('selected-unit');
      }
    });

    // Fetch maps for each production unit
    try {
      const fetchMapPromises = this.unidadesProd.items.map(
        async (unit: ProductionUnit) => {
          const mapData = await fetchMapForUnit(
            unit.address.latitude,
            unit.address.longitude
          );
          return {
            unitId: unit.id,
            mapData,
          };
        }
      );
      // Wait for all map requests to finish
      const maps = await Promise.all(fetchMapPromises);

      // Store the map data in the component's data
      this.mapData = maps;
    } finally {
      this.loadingMap = false;
    }
  },
  components: { Maps, PageBack, Loader },
  //components: { Pagination },
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
  display: block;
  width: 20vh;
  height: 20vh;
  border-radius: 50%;
  border: 5px solid #164a41;
  object-fit: cover;
}

.production-unit-container {
  max-height: 45vh;
  border-radius: 0.8vh;
  display: flex;
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

.producer-mobile {
  width: 75%;
}

.units-container-mobile {
  display: none !important;
}
@media (max-width: 768px) {
  .producer-image {
    display: none !important;
  }

  .producer-mobile {
    width: 100% !important;
    margin-left: -10vh;
  }

  .units-container {
    background-color: green;
    display: none !important;
  }
  .units-container-mobile {
    display: flex !important;
    overflow-x: auto;
    max-width: 100% !important;
    gap: 1.5vh;
    margin-bottom: 3vh;
    height: 22vh !important;
  }
  .production-unit-container {
    display: block !important;
  }
  .production-unit {
    /* background-color: red; */
    min-width: 20vh;
    height: 15vh;
  }
}
</style>

<style scoped>
.map-container {
  background-color: #f3f3f3;
  position: relative;
  height: 100% !important;
  width: 100% !important;
}

.map-image {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
</style>
