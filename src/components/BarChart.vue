<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>

<script lang="ts">
import { Bar } from 'vue-chartjs';
import { ChartData } from 'chart.js';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: 'BarChart',
  props: {
    chartData: {
      type: Object as () => ChartData<
        'bar',
        (number | [number, number] | null)[],
        unknown
      >,
      required: true,
    },
    chartOptions: {
      type: Object,
      required: true,
    },
  },
  components: { Bar },
};
</script>
