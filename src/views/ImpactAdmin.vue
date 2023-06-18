<!-- TODO - validar os campos -->
<!-- TODO - mostrar as encomendas canceladas de alguma forma -->
<template>
  <div class="parent" style="height: ; background-color: ">
    <div class="d-flex">
      <!-- Barra lateral -->
      <div
        class="reportSidebar"
        style="
          width: 20%;
          border-right: 2px solid #f3f3f3;
          padding: 0.5vh;
          background-color: ;
        "
      >
        <div class="">
          <div class="parent">
            <!-- Views -->
            <div class="mt-4 mb-4">
              <p>Escolha o que deseja visualizar:</p>
              <DropdownCustom class="required-field" @view="handleViewSelect" />
            </div>
            <div>
              <!-- Produtos ou clientes -->
              <div class="d-flex gap-4">
                <div class="mb-4">
                  <RadioButton
                    v-model="barChartView"
                    input-id="products"
                    name="produtos"
                    value="products"
                    class="custom-radio-button"
                    @click="updateBarChart()"
                  />
                  <label for="products" class="ml-2">Produtos</label>
                </div>
                <div>
                  <RadioButton
                    v-model="barChartView"
                    input-id="clients"
                    name="clientes"
                    value="clients"
                    class="custom-radio-button"
                    @click="updateBarChart()"
                  />
                  <label for="clients" class="ml-2">Clientes</label>
                </div>
              </div>
            </div>
            <div>
              <!-- Datas -->
              <p>Escolha as datas a visualizar:</p>
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
            <!-- Slider do raio -->
            <p class="mt-4">Indique o raio a visualizar:</p>
            <div class="d-flex gap-3">
              <div
                style="
                  border: 1px solid #ced4da;
                  padding: 0.5vh;
                  border-radius: 9%;
                  width: 12vh;
                  height: 4vh;
                "
                class="slider-before"
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
            <!-- Escolher categoria -->
            <!-- TODO - tornar funcional -->
            <div>
              <p class="mt-4">Escolha a categoria a visualizar:</p>
              <CategoryFilter :categories="allCategories"></CategoryFilter>
            </div>
            <div class="mt-4 btn-report-mobile">
              <!-- Botão gerar gráficos -->
              <ButtonPV
                :disabled="!allDataAvailable"
                @click="generateGraphs()"
                label="Gerar gráficos"
                :pt="{
                  root: {
                    style: 'background-color:#F1B24A; border:#F1B24A;',
                  },
                }"
                rounded
              />
            </div>
          </div>
        </div>
      </div>
      <!-- Lado esquerdo da barra -->
      <div
        style="width: 80%; background-color: "
        class="reportInfo d-none d-md-block"
      >
        <div class="d-flex">
          <!-- Cards coloridos -->
          <div class="data-cards">
            <ImpactDataCard
              icon="bi bi-currency-euro"
              title="Total gasto"
              :value="reportCards.comprasTotais"
              color="#7CA2C3"
              :text-cancel="'Dinheiro devolvido:'"
              :cancel-value="reportCards.comprasTotaisCanceladas"
            ></ImpactDataCard>
            <!-- <ImpactDataCard
              icon="bi bi-currency-euro"
              title="Total ganho"
              :value="0"
              color="#9DC88D"
            ></ImpactDataCard> -->
            <ImpactDataCard
              icon="bi bi-box-seam"
              title="Total de encomendas"
              :value="reportCards.numeroEncomendas"
              color="#DC6942"
              :text-cancel="'Enc. canceladas:'"
              :cancel-value="reportCards.numeroEncomendasCanceladas"
            ></ImpactDataCard>
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
          <InlineMessage v-if="!graficosGerados" severity="warn" class="mb-5"
            >Para visualizar os dados tem de escolher valores para todos os
            filtros obrigatórios</InlineMessage
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
          <!-- <div class="parent d-flex" style="background-color: ; gap: 4%"> -->
          <div class="parent">
            <div style="width: 100%">
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
                Quantidade de produtos encomendados
              </h4>
              <h4
                v-if="view == 'numeroProdutosEncomendados' && graficosGerados"
                class="py-4 dgreen-txt"
              >
                Quantidade de produtos diferentes encomendados
              </h4>
              <h4
                v-if="view == 'comprasTotais' && graficosGerados"
                class="py-4 dgreen-txt"
              >
                Histórico de faturação
              </h4>
              <!-- Gráfico de linhas -->
              <div class="graph-container">
                <LineChart
                  style="max-height: 400px !important"
                  v-if="graficosGerados"
                  :chart-data="lineChartData"
                  :chart-options="lineChartOptions"
                />
              </div>
            </div>
          </div>
          <div class="parent">
            <div style="width: 100%">
              <div>
                <!-- Muda a cada tipo: produtos ou clientes -->
                <h4
                  v-if="graficosGerados && barChartView == 'products'"
                  class="py-4 dgreen-txt"
                >
                  Produtos encomendados
                </h4>
                <h4
                  v-if="graficosGerados && barChartView == 'clients'"
                  class="py-4 dgreen-txt"
                >
                  Produtos encomendados por consumidor
                </h4>
                <!-- Gráfico de barras -->
                <div class="graph-container">
                  <div v-if="barChartView == 'products'">
                    <BarChart
                      style="max-height: 400px !important"
                      v-if="graficosGerados"
                      :chart-data="barChartData"
                      :chart-options="barChartOptions"
                    ></BarChart>
                  </div>
                  <div v-if="barChartView == 'clients'">
                    <BarChart
                      style="max-height: 400px !important"
                      v-if="graficosGerados"
                      :chart-data="barChartData"
                      :chart-options="barChartOptions"
                    ></BarChart>
                  </div>
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
           -->
          <!-- {{ reportProducerClients }} -->
          <div class="mt-5 parent" style="height: 10vh"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import DatePicker from '@/components/DatePicker.vue';
import Slider from 'primevue/slider';
import { ChartData } from 'chart.js';
import DropdownCustom from '@/components/DropdownCustom.vue';
import ImpactDataCard from '@/components/ImpactDataCard.vue';
import InlineMessage from 'primevue/inlinemessage';
import LineChart from '@/components/LineChart.vue';
import BarChart from '@/components/BarChart.vue';
import ButtonPV from 'primevue/button';
import CategoryFilter from '@/components/CategoryFilter.vue';
import RadioButton from 'primevue/radiobutton';
import { computed, defineComponent } from 'vue';
import {
  ReportCard,
  Image,
  ReportMap,
  ReportEvolution,
  ReportBarChartProduct,
  Category,
  reportProducerClients,
} from '@/types';
import {
  fetchAllCategories,
  fetchAdminReportCards,
  fetchAdminReportMap,
  fetchAdminReportEvolution,
  fetchAdminReportProducts,
  fetchAdminReportClients,
} from '@/api';

export default defineComponent({
  data() {
    return {
      nuncaGerados: true as boolean,
      graficosGerados: false as boolean,

      view: '' as string,
      raio: 0 as any,
      barChartView: '' as string,

      // Informações do user
      userLoggedId: 0 as number,
      userLoggedName: '' as string,
      userLoggedNImage: {} as Image,
      userLoggedType: '' as string,

      // Categorias
      allCategories: [] as Category[],

      // Datas
      startDate: 'Indefinido' as string,
      endDate: 'Indefinido' as string,

      // Reports
      reportCards: {} as ReportCard,
      reportMap: [] as ReportMap[],
      reportEvolution: {} as Record<string, ReportEvolution>,
      reportBarChart: [] as ReportBarChartProduct[],
      selectedCategory: 0 as number,
      reportProducerClients: [] as reportProducerClients[],

      // Gráfico de linhas
      lineGraphLabels: [] as string[],
      lineGraphData: [] as number[],
      lineChartData: {
        labels: ['no data'] as string[],
        datasets: [
          {
            data: [] as (number | null)[],
            borderColor: 'rgba(255, 0, 0, 1)',
            fill: false,
          },
        ],
      } as ChartData<'line', (number | null)[], unknown>,
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
        labels: ['no data'],
        datasets: [
          {
            label: 'Gráfico barras',
            data: [] as number[],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      } as ChartData<'bar', (number | [number, number] | null)[], unknown>,
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
      // Verifica se os dados obrigatórios já foram preenchidos
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
    // Ir buscar os dados do utilizador que está logado
    const store = this.$store;
    const userLoggedId = computed(() => store.state.user);
    if (userLoggedId.value) {
      this.userLoggedId = userLoggedId.value['user']['id'];
      this.userLoggedName = userLoggedId.value['user']['name'];
      this.userLoggedType = userLoggedId.value['user']['type'];
      if (userLoggedId.value['user']['image']) {
        this.userLoggedNImage = userLoggedId.value['user']['image'];
      }
    }

    // TODO - alterar a forma como as categorias são buscadas
    // Ir buscar as categorias (só traz as 24 de uma página)
    const allCategoriesData = await fetchAllCategories();
    const allCategories = allCategoriesData.data.items;
    this.allCategories = allCategories;
  },
  methods: {
    // Gerar os gráficos
    generateGraphs() {
      this.nuncaGerados = false;
      this.graficosGerados = true;
      // Ir buscar os dados dos gráficos
      if (this.selectedCategory != 0) {
        // nada ainda
        // TODO - meter o fetch de todos os pedidos com a opção da categoria como opcional
      } else {
        this.loadGraphs(this.startDate, this.endDate, this.raio, this.view);
      }
    },
    updateBarChart() {
      // Se nunca foi gerado nenhuma vez, gera o gráfico de barras
      if (!this.nuncaGerados) {
        this.generateGraphs();
      }
    },
    // Define as datas de início e fim (usa um emit)
    handleDateSelect(selectedDate: string) {
      if (selectedDate[1] == 'datePicker1') {
        this.startDate = selectedDate[0];
      } else if (selectedDate[1] == 'datePicker2') {
        this.endDate = selectedDate[0];
      }
    },
    // Define a view selecionana no dropdown (usa um emit)
    handleViewSelect(selectedView: any) {
      this.view = selectedView.code;
    },

    // Carrega os dados usados nos gráficos
    async loadGraphs(
      dataInicio: string,
      dataFim: string,
      raio: number,
      view: string
    ) {
      // Ir buscar os dados dos cards
      const reportCards = await fetchAdminReportCards(
        dataInicio,
        dataFim,
        raio
      );
      this.reportCards = reportCards.data;
      console.log('Dados dos cards: ' + JSON.stringify(this.reportCards));

      // Ir buscar os dados do mapa
      const reportMap = await fetchAdminReportMap(dataInicio, dataFim, raio);
      this.reportMap = reportMap.data;
      //   console.log('Dados do mapa: ' + JSON.stringify(this.reportMap));

      // Ir buscar os dados da evolução (gráfico de linhas)
      const reportEvolution = await fetchAdminReportEvolution(
        dataInicio,
        dataFim,
        raio,
        view
      );
      this.reportEvolution = reportEvolution.data;
      this.updateGraphData(view, 'line');

      // Ir buscar os dados do gráfico de barras
      // Produtos
      const reportBarChart = await fetchAdminReportProducts(
        dataInicio,
        dataFim,
        raio,
        view
      );
      this.reportBarChart = reportBarChart.data;
      this.updateGraphData(view, 'bar');
      console.log(
        'Dados do gráfico de barras: ' + JSON.stringify(this.reportBarChart)
      );

      // Clientes
      const producerClients = await fetchAdminReportClients(
        dataInicio,
        dataFim,
        raio,
        view
      );
      this.reportProducerClients = producerClients.data;
      this.updateGraphData(view, 'bar');
    },

    // Atualizar os dados dos gráficos
    updateGraphData(view: string, grapthType: string) {
      // Gráfico de linhas
      if (grapthType == 'line') {
        this.lineGraphLabels = [];
        this.lineGraphData = [];

        // Preparar os dados para o gráfico de linhas (Evolução)
        for (const [data, valor] of Object.entries(this.reportEvolution)) {
          this.lineGraphLabels.push(data);
          if (view == 'numeroEncomendas') {
            this.lineGraphData.push(valor.numeroEncomendas!);
          } else if (view == 'totalProdutos') {
            this.lineGraphData.push(valor.totalProdutos!); // Só as que não foram canceladas
          } else if (view == 'numeroProdutosEncomendados') {
            this.lineGraphData.push(valor.numeroProdutosEncomendados!); // Só as que não foram canceladas
          } else if (view == 'comprasTotais') {
            this.lineGraphData.push(valor.comprasTotais!); // Só as que não foram canceladas
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
      } // Gráfico de barras
      else if (grapthType == 'bar') {
        this.barGraphLabels = [];
        this.barGraphData = [];

        // Preparar os dados para o gráfico de barras
        if (this.barChartView == 'products') {
          for (const string of this.reportBarChart) {
            // Reduzir o nome para caber no gráfico
            const nomeOriginal = string.nome.split(' ');
            let nomeReduzido = nomeOriginal[0];
            for (let i = 1; i < nomeOriginal.length; i++) {
              nomeReduzido += ` ${nomeOriginal[i].charAt(0)}.`;
            }
            this.barGraphLabels.push(nomeReduzido);

            if (view == 'numeroEncomendas') {
              this.barGraphData.push(string.numeroEncomendas!);
            } else if (view == 'totalProdutos') {
              this.barGraphData.push(string.totalProdutos!); // Só as que não foram canceladas
            } else if (view == 'numeroProdutosEncomendados') {
              this.barGraphData.push(string.numeroProdutosEncomendados!); // Só as que não foram canceladas
            } else if (view == 'comprasTotais') {
              this.barGraphData.push(string.comprasTotais!); // Só as que não foram canceladas
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
        } else if (this.barChartView == 'clients') {
          for (const string of this.reportProducerClients) {
            this.barGraphLabels.push(string.nome);

            if (view == 'numeroEncomendas') {
              console.log('numeroEncomendas');
              this.barGraphData.push(string.numeroEncomendas!);
            } else if (view == 'totalProdutos') {
              console.log('totalProdutos');
              this.barGraphData.push(string.totalProdutos!); // Só as que não foram canceladas
            } else if (view == 'numeroProdutosEncomendados') {
              console.log('numeroProdutosEncomendados');
              this.barGraphData.push(string.numeroProdutosEncomendados!); // Só as que não foram canceladas
            } else if (view == 'comprasTotais') {
              console.log('comprasTotais');
              this.barGraphData.push(string.comprasTotais!); // Só as que não foram canceladas
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
    InlineMessage,
    ButtonPV,
    CategoryFilter,
    RadioButton,
  },
});
</script>

<style>
.user-info {
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
  display: flex;
  padding: 3vh;
  gap: 4vh;
  width: 65%;
}

.slider-before::before {
  content: '*';
  color: red;
  position: absolute;
  margin-left: -1rem;
  margin-top: -0.3rem;
}

.slider-raio {
  width: 70%;
  margin-top: 2vh;
  margin-left: 1vh;
}

.required-field::before {
  content: '*';
  color: red;
  position: absolute;
  top: 0;
  left: -0.7rem;
}

/* Mobile */
@media (max-width: 767px) {
  .reportSidebar {
    /* background-color: red; */
    width: 100% !important;
  }

  .reportInfo {
    display: none;
  }

  .btn-report-mobile {
    display: flex;
    justify-content: center;
  }
}
</style>
