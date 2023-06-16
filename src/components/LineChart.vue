<template>
  <div>
    <LineChart :data="chartData" :options="chartOptions" />
  </div>
</template>

<script lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line as LineChart } from 'vue-chartjs';
import { ChartData, Point } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default {
  name: 'LineChartComponent',
  props: {
    chartData: {
      type: Object as () => ChartData<
        'line',
        (number | Point | null)[],
        unknown
      >,
      required: true,
    },
    chartOptions: {
      type: Object,
      required: true,
    },
  },
  components: {
    LineChart,
  },
};
</script>
