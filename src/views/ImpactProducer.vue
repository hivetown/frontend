<!-- TODO - validar os campos -->
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
            <!-- {{ barChartView }} -->
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
            <div>
              <p class="mt-4">Escolha a categoria a visualizar:</p>
              <CategoryFilter :categories="allCategories"></CategoryFilter>
            </div>
            <div class="mt-4 btn-report-mobile">
              <!-- Botão -->
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
      <div
        style="width: 80%; background-color: "
        class="reportInfo d-none d-md-block"
      >
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
              title="Total ganho"
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
                Histórico de faturação
              </h4>
              <!-- Gráfico de linhas -->
              <div class="graph-container">
                <LineChart
                  v-if="graficosGerados"
                  :chart-data="lineChartData"
                  :chart-options="lineChartOptions"
                />
              </div>
            </div>
            <div style="background-color: ; width: 53%">
              <div>
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
                      v-if="graficosGerados"
                      :chart-data="barChartData"
                      :chart-options="barChartOptions"
                    ></BarChart>
                  </div>
                  <div v-if="barChartView == 'clients'">
                    <BarChart
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
          {{ reportProducerClients }}
          <div class="mt-5 parent" style="height: 40vh"></div>
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
import { ref, computed, defineComponent } from 'vue';
import { useStore } from '@/store';
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
  fetchReportCards,
  fetchReportMap,
  fetchReportEvolution,
  fetchReportProducts,
  fetchProducerReportClients,
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
      reportMap: {} as ReportMap[],
      reportEvolution: {} as ReportEvolution, // TODO - ver se é preciso alterar esta interface
      reportBarChart: {} as ReportBarChartProduct[], // TODO - ver se é preciso alterar esta interface
      selectedCategory: 0 as number,
      reportProducerClients: [] as reportProducerClients[],

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
      //   barChartData: {
      //     labels: ['no data'] as string[],
      //     datasets: [] as string[],
      //   } as Object,
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
        // && this.barChartView !== ''
      );
    },
  },

  async beforeMount() {
    // Valor do slider - Raio
    const raio = ref(0);
    this.raio = raio;
    const barChartView = ref('products');
    this.barChartView = barChartView.value;

    // Ir buscar o utilizador que está logado
    const store = useStore();
    const userLoggedId = computed(() => store.state.user);
    if (userLoggedId.value) {
      this.userLoggedId = userLoggedId.value['user']['id'];
      this.userLoggedName = userLoggedId.value['user']['name'];
      this.userLoggedType = userLoggedId.value['user']['type'];
      if (userLoggedId.value['user']['image']) {
        this.userLoggedNImage = userLoggedId.value['user']['image'];
      }
    }

    // console.log('user: ' + this.userLoggedId);
    // console.log(this.userLoggedType);

    // TODO - alterar a forma como as categorias são buscadas
    // Ir buscar as categorias (só traz as 24 de uma página)
    const allCategoriesData = await fetchAllCategories();
    const allCategories = allCategoriesData.data.items;
    this.allCategories = allCategories;
  },
  methods: {
    generateGraphs() {
      this.nuncaGerados = false;
      this.graficosGerados = true;
      // Ir buscar os dados dos gráficos
      if (this.selectedCategory != 0) {
        // nada ainda
        // TODO - meter o fetch de todos os pedidos com a opção da categoria como opcional
      } else {
        this.loadGraphs(
          this.userLoggedId,
          this.startDate,
          this.endDate,
          this.raio,
          this.view
        );
      }
    },
    updateBarChart() {
      if (!this.nuncaGerados) {
        this.generateGraphs();
      }
    },
    handleDateSelect(selectedDate: string) {
      if (selectedDate[1] == 'datePicker1') {
        this.startDate = selectedDate[0];
      } else if (selectedDate[1] == 'datePicker2') {
        this.endDate = selectedDate[0];
      }
    },
    handleViewSelect(selectedView: any) {
      // TODO - fazer debug da view atualizada para alterar a legendas dos gráficos
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
      const reportCards = await fetchReportCards(
        this.userLoggedId,
        dataInicio,
        dataFim,
        raio
      );
      this.reportCards = reportCards.data;
      //   console.log('Dados dos cards: ' + JSON.stringify(this.reportCards));

      // Ir buscar os dados do mapa
      const reportMap = await fetchReportMap(
        this.userLoggedId,
        dataInicio,
        dataFim,
        raio
      );
      this.reportMap = reportMap.data;
      //   console.log('Dados do mapa: ' + JSON.stringify(this.reportMap));

      // Ir buscar os dados da evolução (gráfico de linhas)
      // TODO mudar para ser o id do user logado e o raio do slider + o valor certo da view e as datas
      const reportEvolution = await fetchReportEvolution(
        this.userLoggedId,
        dataInicio,
        dataFim,
        raio,
        view
      );
      this.reportEvolution = reportEvolution.data;
      this.updateGraphData(view, 'line');

      // Ir buscar os dados do gráfico de barras
      const reportBarChart = await fetchReportProducts(
        this.userLoggedId,
        dataInicio,
        dataFim,
        raio,
        'totalProdutos'
      );
      this.reportBarChart = reportBarChart.data;
      this.updateGraphData(view, 'bar');
      //   console.log(this.reportBarChart);

      const producerClients = await fetchProducerReportClients(
        this.userLoggedId,
        dataInicio,
        dataFim,
        raio,
        view
      );
      this.reportProducerClients = producerClients.data;
      //   console.log(this.reportProducerClients);
    },

    // Atualizar os dados do gráfico de linhas
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
        // console.log(this.lineChartData);
        // console.log(this.lineGraphLabels);
        // console.log(this.view);
      } else if (grapthType == 'bar') {
        // Limpar os arrays de dados
        this.barGraphLabels = [];
        this.barGraphData = [];

        // Preparar os dados para o gráfico de barras
        if (this.barChartView == 'products') {
          for (const string of this.reportBarChart) {
            console.log(string);
            // Reduzir o nome para caber no gráfico
            const nomeOriginal = string.nome.split(' ');
            let nomeReduzido = nomeOriginal[0];
            for (let i = 1; i < nomeOriginal.length; i++) {
              nomeReduzido += ` ${nomeOriginal[i].charAt(0)}.`;
            }

            this.barGraphLabels.push(nomeReduzido);
            // if (view == 'totalProdutos') {
            if (string.totalProdutos) {
              this.barGraphData.push(string.totalProdutos); // Só as que não foram canceladas
              //   }
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
          //   for (const string of this.reportProducerClients) {
          //     this.barGraphLabels.push(string.nome);
          //     if (string.totalProdutos) {
          //       this.barGraphData.push(string.totalProdutos); // Só as que não foram canceladas
          //     }
          //   }

          //   TODO - fazer com que não seja preciso carregar no gerar gráficos 2
          // vezes para aparecerem os dados como aparece no gráfico da esquerda
          for (const string of this.reportProducerClients) {
            // console.log('string');
            // console.log(view);
            this.barGraphLabels.push(Object(string).nome);
            if (view == 'numeroEncomendas') {
              this.barGraphData.push(Object(string).numeroEncomendas);
            } else if (view == 'totalProdutos') {
              this.barGraphData.push(Object(string).totalProdutos); // Só as que não foram canceladas
            } else if (view == 'numeroProdutosEncomendados') {
              this.barGraphData.push(Object(string).numeroProdutosEncomendados); // Só as que não foram canceladas
            } else if (view == 'comprasTotais') {
              this.barGraphData.push(Object(string).comprasTotais); // Só as que não foram canceladas
            }
          }
          console.log('data: ' + JSON.stringify(this.barGraphData));
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
          //   console.log('labels');
          //   console.log('labels: ' + JSON.stringify(this.barGraphLabels));
          // console.log('data');
          //   console.log('data: ' + JSON.stringify(this.barChartData));
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
  justify-content: flex-end;
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
