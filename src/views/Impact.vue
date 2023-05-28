<template>
  <div class="parent" style="height: ; background-color: ">
    <div class="d-flex">
      <div style="width: 20%; border: 1px solid black">
        <div>
          <DatePicker></DatePicker>
          <InputText v-model.number="raio" />
          <Slider
            v-model="raio"
            :pt="{
              root: { class: 'w-14rem' },
              handle: { class: 'bg-orange-400 border-900' },
              range: { class: 'bg-orange-400' },
            }"
          />
        </div>
      </div>
      <div style="width: 80%; background-color: ">
        <div class="d-flex">
          <div class="user-info">
            <!-- Imagem do user -->
            <img
              class="producer-image d-block mx-auto"
              :src="userLoggedNImage.url"
              :alt="userLoggedNImage.alt"
            />
            <h3 class="main-txt dgreen-txt">{{ userLoggedName }}</h3>
          </div>
          <div class="data-cards">
            <ImpactDataCard
              icon="bi bi-currency-euro"
              title="Total gasto"
              :value="reportCards.comprasTotais"
              color="#7CA2C3"
            ></ImpactDataCard>
            <ImpactDataCard
              icon="bi bi-box-seam"
              title="Encomendas"
              :value="reportCards.numeroEncomendas"
              color="#DC6942"
            ></ImpactDataCard>
            <ImpactDataCard
              icon="bi bi-bag"
              title="Produtos comprados"
              :value="reportCards.numeroProdutosEncomendados"
              color="#F1B24A"
            ></ImpactDataCard>
          </div>
        </div>
        <!-- Dados alteráveis -->
        <div style="background-color: ">
          <!-- Evolução -->
          <div class="parent d-flex" style="background-color: ; gap: 4%">
            <div style="background-color: ; width: 48%">
              <!-- Muda a cada view -->
              <h4 class="py-4 dgreen-txt">Histórico de gastos</h4>
              <!-- Gráfico de linhas -->
              <div class="graph-container">
                <LineChart></LineChart>
              </div>
            </div>
            <div style="background-color: ; width: 48%">
              <div>
                <h4 class="py-4 dgreen-txt">Produtos encomendados</h4>
                <!-- Gráfico de barras -->
                <div class="graph-container">
                  <BarChart></BarChart>
                </div>
              </div>
            </div>
          </div>
          <!-- Mapa -->
          <div
            class="mt-5 parent"
            style="background-color: lightgray; height: 40vh"
          >
            <!-- Reports -->
            <!-- {{ reportCards }} -->
            <!-- {{ reportMap }} -->
            <!-- {{ reportEvolution }} -->
            <!-- MUDAR O TIPO PARA OBJETO DE OBJETOS EM TODO O LADO -->
            <div v-for="(numEncomendas, data) in reportEvolution" :key="data">
              <!-- TRANSFORMAR O ID EM MÊS E USAR APENAS O DATA.NUMEROENCOMENDAS -->
              {{ data }} -
              {{ numEncomendas.numeroEncomendas }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import DatePicker from '@/components/DatePicker.vue';
import Slider from 'primevue/slider';
import ImpactDataCard from '@/components/ImpactDataCard.vue';
import LineChart from '@/components/LineChart.vue';
import BarChart from '@/components/BarChart.vue';
import { ref, computed, defineComponent } from 'vue';
import { useStore } from '@/store';
import { ReportCard, Image, ReportMap, ReportEvolution } from '@/types';
import {
  fetchConsumerReportCards,
  fetchConsumerReportMap,
  fetchConsumerReportEvolution,
} from '@/api';

export default defineComponent({
  data() {
    return {
      raio: 0 as Ref<number>,

      userLoggedId: 0 as number,
      userLoggedName: '' as string,
      userLoggedNImage: {} as Image,

      reportCards: {} as ReportCard,
      reportMap: {} as ReportMap[],
      reportEvolution: {} as ReportEvolution,

      graphLabels: [] as string[],
      graphData: [] as number[],
    };
  },
  // A fazer antes de montar o componente
  async beforeMount() {
    // Valor do slider - Raio
    const raio = ref(0);
    this.raio = raio;

    // Ir buscar o utilizador que está logado
    const store = useStore();
    const userLoggedId = computed(() => store.state.user);
    if (userLoggedId.value) {
      this.userLoggedId = userLoggedId.value['user']['id'];
      this.userLoggedName = userLoggedId.value['user']['name'];
      if (userLoggedId.value['user']['image']) {
        this.userLoggedNImage = userLoggedId.value['user']['image'];
      }
    }
    // console.log('id: ' + this.userLoggedId);

    // Ir buscar os dados dos cards
    // TODO mudar para ser o id do user logado e o raio do slider
    const reportCards = await fetchConsumerReportCards(
      1,
      '2020-01-01',
      '2023-12-31',
      700
    );
    this.reportCards = reportCards.data;

    // Ir buscar os dados do mapa
    // TODO mudar para ser o id do user logado e o raio do slider
    const reportMap = await fetchConsumerReportMap(
      1,
      '2020-01-01',
      '2023-12-31',
      700
    );
    this.reportMap = reportMap.data;

    // Ir buscar os dados da evolução
    // TODO mudar para ser o id do user logado e o raio do slider + o valor certo da view
    const reportEvolution = await fetchConsumerReportEvolution(
      1,
      '2020-01-01',
      '2023-12-31',
      700,
      'numeroEncomendas'
    );
    this.reportEvolution = reportEvolution.data;

    // Preparar os dados para o gráfico de linhas (Evolução)
    for (const [data, numEncomendas] of Object.entries(this.reportEvolution)) {
      this.graphLabels.push(data);
      this.graphData.push(numEncomendas.numeroEncomendas); // Só as que não foram canceladas
    }
  },
  components: { DatePicker, Slider, ImpactDataCard, LineChart, BarChart },
});
</script>

<style>
.user-info {
  /* background-color: pink; */
  width: 35%;
  padding: 3vh;
  gap: 2vh;
  display: flex;
  align-items: center;
}

.producer-image {
  width: 14vh;
  height: 14vh;
  border-radius: 50%;
  border: 5px solid #164a41;
  object-fit: cover;
}

.data-cards {
  /* background-color: red; */
  /* margin-left: 5vh; */
  display: flex;
  justify-content: flex-end;
  padding: 3vh;
  gap: 4vh;
  width: 65%;
}

.graph-container {
  /* width: 40%;
  max-height: 35vh; */
  /* background-color: red; */
}
</style>
