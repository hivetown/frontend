<template>
  <div class="parent" style="height: ; background-color: ">
    <div class="d-flex">
      <!-- Barra lateral -->
      <div style="width: 20%; border-right: 2px solid #f3f3f3; padding: 0.5vh">
        <div class="parent">
          <!-- Views -->
          <div class="mt-4 mb-4">
            <p>Escolha o que deseja visualizar:</p>
            <DropdownCustom @view="handleViewSelect" />
          </div>
          <div>
            <p>Escolha as datas a visualizar:</p>
            <!-- Datas -->
            <div class="d-flex gap-2 align-items-center">
              <DatePicker
                style="display: flex; justify-content: center"
                @date="handleDateSelect"
                :id="'datePicker1'"
              ></DatePicker>
              <i
                class="bi bi-arrow-right-short dgreen-txt"
                style="font-size: 1.5em"
              ></i>
              <DatePicker
                style="display: flex; justify-content: center"
                @date="handleDateSelect"
                :id="'datePicker2'"
              ></DatePicker>
            </div>
          </div>
          <p class="mt-4">Indique o raio a visualizar:</p>
          <!-- Slider do raio -->
          <div class="d-flex gap-3">
            <div
              style="
                border: 1px solid #ced4da;
                padding: 0.5vh;
                border-radius: 7%;
                width: 12vh;
                height: 4vh;
              "
            >
              <p class="text-center" style="color: #5a5a5a">{{ raio }} km</p>
            </div>
            <Slider
              v-model="raio"
              :max="100000"
              :pt="{
                root: { style: 'width:60%;' },
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
            <button v-if="allDataAvailable" @click="generateGraphs()">
              Gerar gráficos
            </button>
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
              :text-cancel="'Dinheiro devolvido:'"
              :cancel-value="reportCards.comprasTotaisCanceladas"
            ></ImpactDataCard>
            <ImpactDataCard
              icon="bi bi-box-seam"
              title="Encomendas"
              :value="reportCards.numeroEncomendas"
              color="#DC6942"
              :text-cancel="'Encomendas canceladas:'"
              :cancel-value="reportCards.numeroEncomendasCanceladas"
            ></ImpactDataCard>
            <!-- <ImpactDataCard
              icon="bi bi-bag"
              title="Tipos de produtoscomprados"
              :value="reportCards.numeroProdutosEncomendados"
              color="#F1B24A"
            ></ImpactDataCard> -->
            <ImpactDataCard
              icon="bi bi-bag"
              title="Total de produtos"
              :value="reportCards.totalProdutos"
              color="#F1B24A"
              :text-cancel="'Produtos devolvidos:'"
              :cancel-value="reportCards.totalProdutosCancelados"
            ></ImpactDataCard>
          </div>
        </div>

        <div class="parent mt-5 mb-2">
          <!-- TODO - por a alterar sozinho -->
          <InlineMessage v-if="!graficosGerados" severity="warn" class="mb-5"
            >Para visualizar os dados tem de escolher valores para os
            filtros</InlineMessage
          >

          <!-- Período temporal -->
          <p v-if="graficosGerados">
            A mostrar dados entre: "
            <span class="fw-bold">{{ startDate }}</span
            >" e " <span class="fw-bold">{{ endDate }}</span
            >"
          </p>
        </div>
        <!-- Dados alteráveis -->
        <div style="background-color: ">
          <!-- Evolução -->
          <div class="parent d-flex" style="background-color: ; gap: 4%">
            <div style="background-color: ; width: 43%">
              <!-- Muda a cada view -->
              <h4
                v-if="view == 'numeroEncomendas' && graficosGerados"
                class="py-4 dgreen-txt"
              >
                Histórico de encomendas
              </h4>

              <h4
                v-if="view == 'totalProdutos' && graficosGerados"
                class="py-4 dgreen-txt"
              >
                Quantidade de produtos diferentes encomendados
              </h4>
              <h4
                v-if="view == 'numeroProdutosEncomendados' && graficosGerados"
                class="py-4 dgreen-txt"
              >
                Quantidade de produtos encomendados
              </h4>
              <h4
                v-if="view == 'comprasTotais' && graficosGerados"
                class="py-4 dgreen-txt"
              >
                Histórico de gastos
              </h4>
              <!-- Gráfico de linhas -->
              <div class="graph-container">
                <!-- <LineChart></LineChart> -->
                <LineChart
                  v-if="graficosGerados"
                  :chart-data="lineChartData"
                  :chart-options="lineChartOptions"
                />
                <!-- <Skeleton v-else width="100%" height="30vh"></Skeleton> -->
              </div>
            </div>
            <div style="background-color: ; width: 53%">
              <div>
                <h4 v-if="graficosGerados" class="py-4 dgreen-txt">
                  Produtos encomendados
                </h4>
                <!-- Gráfico de barras -->
                <div class="graph-container">
                  <BarChart
                    v-if="graficosGerados"
                    :chart-data="barChartData"
                    :chart-options="barChartOptions"
                  ></BarChart>
                  <!-- <Skeleton v-else width="100%" height="30vh"></Skeleton> -->
                </div>
              </div>
            </div>
          </div>
          <!-- Mapa -->
          <!-- <div
            class="mt-5 parent"
            style="background-color: lightgray; height: 40vh"
          >
            TODO - Implementar categorias - Items canelados nos dados se der -
            Passar ao admin e fonecedor - Mostrar que o botão está lá mas deixar
            desabled -->
          <div class="mt-5 parent" style="height: 40vh"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import DatePicker from '@/components/DatePicker.vue';
import Slider from 'primevue/slider';
import DropdownCustom from '@/components/DropdownCustom.vue';
import ImpactDataCard from '@/components/ImpactDataCard.vue';
import InlineMessage from 'primevue/inlinemessage';
import Skeleton from 'primevue/skeleton';
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
      graficosGerados: false as boolean,

      view: '' as string,
      raio: 0 as Ref<number>,

      // Informações do user
      userLoggedId: 0 as number,
      userLoggedName: '' as string,
      userLoggedNImage: {} as Image,

      // Datas
      startDate: 'Indefinido' as string,
      endDate: 'Indefinido' as string,

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
  computed: {
    allDataAvailable() {
      // Verifica se todos os dados são diferentes de undefined
      return (
        this.userLoggedId !== 0 &&
        this.startDate !== 'Indefinido' &&
        this.endDate !== 'Indefinido' &&
        this.raio !== 0 &&
        this.view !== ''
      );
    },
  },

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
  },
  methods: {
    generateGraphs() {
      this.graficosGerados = true;
      // Ir buscar os dados dos gráficos
      // TODO - alerar o id
      this.loadGraphs(1, this.startDate, this.endDate, this.raio, this.view);
    },
    handleDateSelect(selectedDate: string) {
      if (selectedDate[1] == 'datePicker1') {
        this.startDate = selectedDate[0];
      } else if (selectedDate[1] == 'datePicker2') {
        this.endDate = selectedDate[0];
      }
    },
    handleViewSelect(selectedView: Ref<null>) {
      // TODO -fazer debug da view atualizada para alterar a legendas dos gráficos~
      this.view = selectedView.code;
    },

    async loadGraphs(
      id: number,
      dataInicio: string,
      dataFim: string,
      raio: number,
      view: string
    ) {
      // Ir buscar os dados dos cards
      const reportCards = await fetchConsumerReportCards(
        1,
        dataInicio,
        dataFim,
        raio
      );
      this.reportCards = reportCards.data;
      //   console.log('Dados dos cards: ' + JSON.stringify(this.reportCards));

      // Ir buscar os dados do mapa
      const reportMap = await fetchConsumerReportMap(
        1,
        dataInicio,
        dataFim,
        raio
      );
      this.reportMap = reportMap.data;
      //   console.log('Dados do mapa: ' + JSON.stringify(this.reportMap));

      // Ir buscar os dados da evolução (gráfico de linhas)
      // TODO mudar para ser o id do user logado e o raio do slider + o valor certo da view e as datas
      const reportEvolution = await fetchConsumerReportEvolution(
        1,
        dataInicio,
        dataFim,
        raio,
        view
      );
      this.reportEvolution = reportEvolution.data;
      this.updateGraphData(view, 'line');

      // Ir buscar os dados do gráfico de barras
      const reportBarChart = await fetchConsumerReportProducts(
        1,
        dataInicio,
        dataFim,
        raio,
        'totalProdutos'
      );
      this.reportBarChart = reportBarChart.data;
      this.updateGraphData('totalProdutos', 'bar');
    },

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
          if (view == 'numeroEncomendas') {
            this.lineGraphData.push(Object(string).numeroEncomendas);
          } else if (view == 'totalProdutos') {
            this.lineGraphData.push(Object(string).totalProdutos); // Só as que não foram canceladas
          } else if (view == 'numeroProdutosEncomendados') {
            this.lineGraphData.push(Object(string).numeroProdutosEncomendados); // Só as que não foram canceladas
          } else if (view == 'comprasTotais') {
            this.lineGraphData.push(Object(string).comprasTotais); // Só as que não foram canceladas
          }
        }
        this.lineChartData = {
          labels: this.lineGraphLabels,
          datasets: [
            {
              // TODO - alterar para ser mais user friendly a label
              label: view,
              backgroundColor: '#9DC88D',
              data: this.lineGraphData,
            },
          ],
        };
        console.log(this.lineChartData);
        console.log(this.lineGraphLabels);
        console.log(this.view);
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
    DropdownCustom,
    Skeleton,
    InlineMessage,
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
