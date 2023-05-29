<template>
  <div class="parent" style="height: ; background-color: ">
    <div class="d-flex">
      <!-- Barra lateral -->
      <div style="width: 20%; border: 1px solid black">
        <div class="parent">
          <p>Escolha as datas a visualizar:</p>
          <!-- Datas -->
          <div class="d-flex gap-2 align-items-center">
            <DatePicker
              style="display: flex; justify-content: center"
            ></DatePicker>
            <i
              class="bi bi-arrow-right-short dgreen-txt"
              style="font-size: 1.5em"
            ></i>
            <DatePicker
              style="display: flex; justify-content: center"
            ></DatePicker>
          </div>
          <p class="mt-4">Indique o raio a visualizar:</p>
          <!-- Slider do raio -->
          <div class="d-flex gap-3">
            <div
              style="
                border: 1px solid #ced4da;
                padding: 0.5vh;
                border-radius: 10%;
                width: 8vh;
                height: 4vh;
              "
            >
              <p class="text-center" style="color: #5a5a5a">{{ raio }}</p>
            </div>
            <Slider
              v-model="raio"
              :max="100000"
              :pt="{
                root: { class: 'w-14rem' },
                handle: {
                  style:
                    'background-color: #F1B24A; border: 1px solid #F1B24A;',
                },
                range: { style: 'background-color: #F1B24A' },
              }"
              class="slider-raio"
            />
          </div>

          <div class="mt-4">
            <p>Escolha o que deseja visualizar:</p>
            <CascadeSelectCustom></CascadeSelectCustom>
          </div>
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
        <!-- Período temporal -->
        <div class="parent mt-4 mb-2">
          <!-- TODO - por a alterar sozinho -->
          <p>A mostrar dados entre: 2020-01-01 e 2023-12-31</p>
        </div>
        <!-- Dados alteráveis -->
        <div style="background-color: ">
          <!-- Evolução -->
          <div class="parent d-flex" style="background-color: ; gap: 4%">
            <div style="background-color: ; width: 43%">
              <!-- Muda a cada view -->
              <h4 class="py-4 dgreen-txt">Histórico de gastos</h4>
              <!-- Gráfico de linhas -->
              <div class="graph-container">
                <!-- <LineChart></LineChart> -->
                <LineChart
                  :chart-data="lineChartData"
                  :chart-options="lineChartOptions"
                />
              </div>
            </div>
            <div style="background-color: ; width: 53%">
              <div>
                <h4 class="py-4 dgreen-txt">Produtos encomendados</h4>
                <!-- Gráfico de barras -->
                <div class="graph-container">
                  <BarChart
                    :chart-data="barChartData"
                    :chart-options="barChartOptions"
                  ></BarChart>
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
            <div v-for="(totalProdutos, data) in reportBarChart" :key="data">
              <!-- TRANSFORMAR O ID EM MÊS E USAR APENAS O DATA.NUMEROENCOMENDAS -->
              <!-- {{ data }} - -->
              <!-- {{ totalProdutos }} -->
              <!-- {{ totalProdutos }} -->
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
import CascadeSelectCustom from '@/components/CascadeSelectCustom.vue';
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
  fetchConsumerReportProducts,
} from '@/api';

export default defineComponent({
  data() {
    return {
      raio: 0 as Ref<number>,

      // Informações do user
      userLoggedId: 0 as number,
      userLoggedName: '' as string,
      userLoggedNImage: {} as Image,

      // Reports
      reportCards: {} as ReportCard,
      reportMap: {} as ReportMap[],
      reportEvolution: {} as ReportEvolution, // TODO - ver se é preciso alterar esta interface
      reportBarChart: {} as ReportEvolution, // TODO - ver se é preciso alterar esta interface

      // Gráfico de linhas
      lineGraphLabels: [] as string[],
      lineGraphData: [] as number[],
      lineChartData: {
        labels: ['no data'] as string[],
        datasets: [] as string[],
      } as any,
      lineChartOptions: {
        plugins: {
          legend: {
            display: false,
          },
        },
      },

      // Gráfico de barras
      barGraphLabels: [] as string[],
      barGraphData: [] as number[],
      barChartData: {
        labels: ['no data'] as string[],
        datasets: [] as string[],
      } as any,
      barChartOptions: {
        plugins: {
          legend: {
            display: false,
          },
        },
      },
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

    // Ir buscar os dados dos cards
    // TODO mudar para ser o id do user logado e o raio do slider e as datas
    const reportCards = await fetchConsumerReportCards(
      1,
      '2020-01-01',
      '2023-12-31',
      700
    );
    this.reportCards = reportCards.data;

    // Ir buscar os dados do mapa
    // TODO mudar para ser o id do user logado e o raio do slider e as datas
    const reportMap = await fetchConsumerReportMap(
      1,
      '2020-01-01',
      '2023-12-31',
      700
    );
    this.reportMap = reportMap.data;

    // Ir buscar os dados da evolução (gráfico de linhas)
    // TODO mudar para ser o id do user logado e o raio do slider + o valor certo da view e as datas
    const reportEvolution = await fetchConsumerReportEvolution(
      1,
      '2020-01-01',
      '2023-12-31',
      700,
      'comprasTotais'
    );
    this.reportEvolution = reportEvolution.data;
    this.updateGraphData('comprasTotais', 'line');

    // Ir buscar os dados do gráfico de barras
    // TODO mudar para ser o id do user logado e o raio do slider + o valor certo da view e as datas
    const reportBarChart = await fetchConsumerReportProducts(
      1,
      '2020-01-01',
      '2023-12-31',
      700,
      'totalProdutos'
    );
    this.reportBarChart = reportBarChart.data;
    this.updateGraphData('totalProdutos', 'bar');
  },
  methods: {
    // Atualizar os dados do gráfico de linhas
    // TODO - adaptar a função de modo a que possa receber qualquer view para o gráfico (acrescentar argumento da view)
    updateGraphData(view: string, grapthType: string) {
      // Limpar os arrays de dados
      if (grapthType == 'line') {
        this.lineGraphLabels = [];
        this.lineGraphData = [];

        // Preparar os dados para o gráfico de linhas (Evolução)
        for (const [data, string] of Object.entries(this.reportEvolution)) {
          this.lineGraphLabels.push(String(data));
          if (view == 'comprasTotais') {
            this.lineGraphData.push(string.comprasTotais); // Só as que não foram canceladas
          }
        }
        this.lineChartData = {
          labels: this.lineGraphLabels,
          datasets: [
            {
              label: 'Produtos comprados',
              backgroundColor: '#9DC88D',
              data: this.lineGraphData,
            },
          ],
        };
      } else if (grapthType == 'bar') {
        // Limpar os arrays de dados
        this.barGraphLabels = [];
        this.barGraphData = [];

        // Preparar os dados para o gráfico de barras
        for (const string of this.reportBarChart) {
          // Reduzir o nome para caber no gráfico
          const nomeOriginal = string.nome.split(' ');
          let nomeReduzido = nomeOriginal[0];
          for (let i = 1; i < nomeOriginal.length; i++) {
            nomeReduzido += ` ${nomeOriginal[i].charAt(0)}.`;
          }

          this.barGraphLabels.push(nomeReduzido);
          if (view == 'totalProdutos') {
            this.barGraphData.push(string.totalProdutos); // Só as que não foram canceladas
          }
        }
        this.barChartData = {
          labels: this.barGraphLabels,
          datasets: [
            {
              label: 'Quantidade',
              backgroundColor: '#9DC88D',
              data: this.barGraphData,
            },
          ],
        };
      }
    },
  },
  components: {
    DatePicker,
    Slider,
    ImpactDataCard,
    LineChart,
    BarChart,
    CascadeSelectCustom,
  },
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

.slider-raio {
  width: 70%;
  margin-top: 2vh;
  margin-left: 1vh;
}
</style>
