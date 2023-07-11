<!-- TODO - validar os campos -->
<template>
  <div class="parent" style="height: ; background-color: ">
    <div class="d-flex">
      <!-- Barra lateral -->
      <div
        style="width: 20%; border-right: 2px solid #f3f3f3; padding: 0.5vh"
        class="normal-view"
      >
        <div class="parent">
          <!-- Views -->
          <div class="mt-4 mb-4">
            <p>Escolha o que deseja visualizar:</p>
            <DropdownCustom class="required-field" @view="handleViewSelect" />
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
            <div v-if="!categoriesTreeNodes.length">
              Sem categorias disponíveis
            </div>
            <div v-else>
              <Tree
                class="cats-container"
                scroll-height="600px"
                :value="categoriesTreeNodes"
                @node-expand="expandCategory"
                :loading="loadingCategories"
                selection-mode="single"
                @node-select="nodeSelect"
              >
                <template #default="slotProps">
                  <div class="d-flex">
                    <b-form-checkbox
                      :checked="
                        selectedCategoryTreeNode?.key === slotProps.node.key
                      "
                      :disabled="
                        selectedCategoryTreeNode?.key === slotProps.node.key
                      "
                    />
                    {{ slotProps.node.label }}
                  </div>
                </template>
              </Tree>
            </div>
          </div>
          <div class="mt-4">
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

      <!-- Barra mobile -->
      <div class="reportSidebar mobile-view">
        <Accordion class="">
          <AccordionTab header="Filtros"
            ><div class="">
              <div class="parent">
                <!-- Views -->
                <div class="mt-4 mb-4">
                  <p>Escolha o que deseja visualizar:</p>
                  <DropdownCustom
                    class="required-field"
                    @view="handleViewSelect"
                  />
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
                    <p class="text-center" style="color: #5a5a5a">
                      {{ raio }} km
                    </p>
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
                  <div v-if="!categoriesTreeNodes.length">
                    Sem categorias disponíveis
                  </div>
                  <div v-else>
                    <Tree
                      class="cats-container"
                      scroll-height="600px"
                      :value="categoriesTreeNodes"
                      @node-expand="expandCategory"
                      :loading="loadingCategories"
                      selection-mode="single"
                      @node-select="nodeSelect"
                    >
                      <template #default="slotProps">
                        <div class="d-flex">
                          <b-form-checkbox
                            :checked="
                              selectedCategoryTreeNode?.key ===
                              slotProps.node.key
                            "
                            :disabled="
                              selectedCategoryTreeNode?.key ===
                              slotProps.node.key
                            "
                          />
                          {{ slotProps.node.label }}
                        </div>
                      </template>
                    </Tree>
                  </div>
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
          </AccordionTab>
        </Accordion>
      </div>

      <div style="width: 80%; background-color: " class="hide">
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
                <LineChart
                  v-if="graficosGerados"
                  :chart-data="lineChartData"
                  :chart-options="lineChartOptions"
                />
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
          <div class="mt-5 parent" style="height: 40vh"></div>
        </div>
      </div>
    </div>
    <!-- lado esquerdo da barra mobile -->
    <div class="report-info-mobile">
      <InlineMessage v-if="!graficosGerados" severity="warn" class="mt-5"
        >Para visualizar os dados tem de escolher valores para todos os filtros
        obrigatórios</InlineMessage
      >

      <div class="d-flex cards-container-mobile">
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
      <!-- Período temporal -->
      <div v-if="graficosGerados" class="time-period">
        <p>
          A mostrar dados entre: "
          <span class="fw-bold">{{ startDate }}</span
          >" e " <span class="fw-bold">{{ endDate }}</span
          >"
        </p>
      </div>
      <!-- TODO - Isto mas para quando os gráficos estiverem efetivamente a carregar
		   Depois da pessoa ter escolhido os filtros -->
      <div v-if="!graficosGerados" class="mt-5">
        <Skeleton
          class="d-block mx-auto"
          style="width: 95%; height: 20vh"
        ></Skeleton>
        <Skeleton
          class="d-block mx-auto mt-4"
          style="width: 95%; height: 20vh"
        ></Skeleton>
      </div>

      <div class="evolution-line-graph">
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
      </div>

      <div class="bar-graph">
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
    </div>
  </div>
</template>

<script lang="ts">
import DatePicker from '@/components/DatePicker.vue';
import Slider from 'primevue/slider';
import { ChartData, Point } from 'chart.js';
import DropdownCustom from '@/components/DropdownCustom.vue';
import ImpactDataCard from '@/components/ImpactDataCard.vue';
import InlineMessage from 'primevue/inlinemessage';
import LineChart from '@/components/LineChart.vue';
import BarChart from '@/components/BarChart.vue';
import ButtonPV from 'primevue/button';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Skeleton from 'primevue/skeleton';
import Tree, { TreeNode } from 'primevue/tree';
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
  fetchConsumerReportCards,
  fetchConsumerReportEvolution,
  fetchConsumerReportProducts,
} from '@/api';

interface CategoryTreeNode extends TreeNode {
  parent?: CategoryTreeNode;
}

const mapCategoryToTreeNode = (
  category: Category,
  parent?: CategoryTreeNode
): CategoryTreeNode => ({
  key: category.id.toString(),
  label: category.name,
  leaf: false,
  parent,
});

export default defineComponent({
  data() {
    return {
      graficosGerados: false as boolean,

      view: '' as string,
      raio: 0 as any,
      barChartView: 'products' as string,

      // Informações do user
      userLoggedId: 0 as number,
      userLoggedName: '' as string,
      userLoggedNImage: {} as Image,

      // Categorias
      loadingCategories: true,
      selectedCategoryTreeNode: null as CategoryTreeNode | null,
      categoriesTreeNodes: [] as CategoryTreeNode[],

      // Datas
      startDate: 'Indefinido' as string,
      endDate: 'Indefinido' as string,

      // Reports
      reportCards: {} as ReportCard,
      reportMap: {} as ReportMap[],
      reportEvolution: {} as Record<string, ReportEvolution>, // TODO - ver se é preciso alterar esta interface
      reportBarChart: {} as ReportBarChartProduct[], // TODO - ver se é preciso alterar esta interface
      reportProducerClients: [] as reportProducerClients[],

      // Gráfico de linhas
      lineGraphLabels: [] as string[],
      lineGraphData: [] as number[],
      lineChartData: {
        labels: ['no data'] as string[],
        datasets: [
          {
            label: 'Gráfico de linha',
            data: [] as (number | [number, number] | null)[],
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      } as ChartData<'line', (number | Point | null)[], unknown>,
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
    // Ir buscar o utilizador que está logado
    const store = this.$store;
    const userLoggedId = computed(() => store.state.user);
    if (userLoggedId.value) {
      this.userLoggedId = userLoggedId.value['user']['id'];
      this.userLoggedName = userLoggedId.value['user']['name'];
      if (userLoggedId.value['user']['image']) {
        this.userLoggedNImage = userLoggedId.value['user']['image'];
      }
    }

    await this.loadCategories();
  },
  methods: {
    generateGraphs() {
      this.graficosGerados = true;
      // Ir buscar os dados dos gráficos
      if (this.selectedCategoryTreeNode) {
        console.log(this.selectedCategoryTreeNode);
        // nada ainda
        // TODO - meter o fetch de todos os pedidos com a opção da categoria como opcional
        this.loadGraphs(
          this.userLoggedId,
          this.startDate,
          this.endDate,
          this.raio,
          this.view,
          Number(this.selectedCategoryTreeNode.key)
        );
      } else {
        this.loadGraphs(
          this.userLoggedId,
          this.startDate,
          this.endDate,
          this.raio,
          this.view,
          undefined
        );
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
      view: string,
      category?: number
    ) {
      if (this.selectedCategoryTreeNode != null) {
        const [reportCards, reportEvolution] = await Promise.all([
          // Ir buscar os dados dos cards
          fetchConsumerReportCards(id, dataInicio, dataFim, raio, category),
          // Ir buscar os dados do mapa
          //   fetchAdminReportMap(dataInicio, dataFim, raio),
          // Ir buscar os dados da evolução (gráfico de linhas)
          fetchConsumerReportEvolution(
            id,
            dataInicio,
            dataFim,
            raio,
            category,
            view
          ),
        ]);
        this.reportCards = reportCards.data;
        // this.reportMap = reportMap.data;
        this.reportEvolution = reportEvolution.data;
        console.log(reportEvolution.data);
        this.updateGraphData(view, 'line');
      } else {
        const [reportCards, reportEvolution] = await Promise.all([
          // Ir buscar os dados dos cards
          fetchConsumerReportCards(id, dataInicio, dataFim, raio),
          // Ir buscar os dados do mapa
          //   fetchAdminReportMap(dataInicio, dataFim, raio),
          // Ir buscar os dados da evolução (gráfico de linhas)
          fetchConsumerReportEvolution(
            id,
            dataInicio,
            dataFim,
            raio,
            undefined,
            view
          ),
        ]);
        this.reportCards = reportCards.data;
        // this.reportMap = reportMap.data;
        this.reportEvolution = reportEvolution.data;
        this.updateGraphData(view, 'line');
      }
      // Ir buscar os dados do gráfico de barras
      // Produtos
      if (this.selectedCategoryTreeNode != null) {
        const reportBarChart = await fetchConsumerReportProducts(
          id,
          dataInicio,
          dataFim,
          raio,
          category,
          view
        );
        this.reportBarChart = reportBarChart.data;
        this.updateGraphData(view, 'bar');
      } else {
        const reportBarChart = await fetchConsumerReportProducts(
          id,
          dataInicio,
          dataFim,
          raio,
          undefined,
          view
        );
        this.reportBarChart = reportBarChart.data;
        this.updateGraphData(view, 'bar');
      }
    },

    // Atualizar os dados do gráfico de linhas
    // TODO - adaptar a função de modo a que possa receber qualquer view para o gráfico (acrescentar argumento da view)
    updateGraphData(view: string, grapthType: string) {
      // Limpar os arrays de dados
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
    async fetchCategories({
      parentId,
      loadings,
    }: {
      parentId?: number;
      loadings?: boolean;
    } = {}) {
      if (loadings === undefined) loadings = true;
      if (loadings) this.loadingCategories = true;

      const categories = (
        await fetchAllCategories({
          pageSize: 100,
          parentId: parentId,
        })
      ).data;

      if (loadings) this.loadingCategories = false;
      return categories;
    },
    async loadCategories() {
      const categoriesPromise = this.fetchCategories();

      const tempCategoriesTree: CategoryTreeNode[] = [];
      if (this.selectedCategoryTreeNode) {
        // TODO: see comment below
        /**
         * This does not completely work:
         * because we pre-set some categories, and since they will be expanded,
         * there will be no children fetching of those categories - they will be incomplete
         *
         * Because of this, I decided to fetch the children of each category in the tree (that is a parent of the selected one)
         */

        // Create a queue of all the parents of the selected category
        // [current, ...parents, rootParent]
        let currentNodeRef: CategoryTreeNode = {
          ...this.selectedCategoryTreeNode,
        };
        const queue: CategoryTreeNode[] = [];
        while (currentNodeRef.parent) {
          queue.push(currentNodeRef.parent);
          currentNodeRef = currentNodeRef.parent;
        }

        // Add the parents to the tree
        if (queue.length) {
          // TODO perf: don't fetch if already fetched
          const queueCategoriesData = await Promise.all(
            queue.map((category, idx) =>
              this.fetchCategories({
                parentId: Number(category.key),
                loadings: false,
              }).then((r) =>
                r.items.filter(
                  (c) => idx === 0 || c.id !== Number(queue[idx - 1].key)
                )
              )
            )
          );

          // Add the root parent
          tempCategoriesTree.push(queue[queue.length - 1]);
          let treeNodeRef = tempCategoriesTree[0];
          // From the last (root) to the second (parent of selected)
          for (let i = queueCategoriesData.length - 2; i >= 0; i--) {
            const currentNode = queue[i];
            const parentNodeData = queueCategoriesData[i + 1].map((c) =>
              mapCategoryToTreeNode(c, treeNodeRef)
            );

            // Fetch the children of the parent except the current node, but add it from memory
            treeNodeRef.children = [currentNode, ...parentNodeData];

            treeNodeRef = currentNode;
          }
        }
      }

      let categories = (await categoriesPromise).items.map((c) =>
        mapCategoryToTreeNode(c)
      );
      if (tempCategoriesTree.length) {
        // != is on purpose
        categories = categories.filter(
          (c) => c.id != tempCategoriesTree[0].key
        );
      }

      this.categoriesTreeNodes = [...tempCategoriesTree, ...categories];
    },
    async expandCategory(node: CategoryTreeNode) {
      if (!node.children) {
        this.loadingCategories = true;

        // Fetch category
        const categories = await this.fetchCategories({
          parentId: Number(node.key),
        });

        // TODO pagination/lazyloading
        node.children = categories.items.map((category) =>
          mapCategoryToTreeNode(category, node)
        );

        this.loadingCategories = false;
      }
    },
    async nodeSelect(node: CategoryTreeNode) {
      this.selectedCategoryTreeNode = node;
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
    Accordion,
    AccordionTab,
    Skeleton,
    Tree,
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
</style>
<style>
.mobile-view,
.report-info-mobile {
  display: none !important;
}

/* Mobile */
@media (max-width: 767px) {
  .normal-view,
  .hide {
    display: none !important;
  }

  .mobile-view,
  .report-info-mobile {
    display: block !important;
  }

  .cards-container-mobile {
    align-items: center;
    justify-content: center !important;
  }

  .data-cards {
    margin-top: 3vh;
    width: 100% !important;
    /* background-color: red; */
    gap: 1vh !important;
    padding: 1vh !important;
  }

  .impact-data-card {
    min-width: 30%;
  }

  .time-period {
    /* background-color: red; */
    margin-top: 10vh;
    text-align: center;
  }

  .time-period p {
    font-size: 0.8em;
  }

  .evolution-line-graph h4,
  .bar-graph h4 {
    font-size: 1.2em;
    margin-bottom: -2vh;
  }
}
</style>
