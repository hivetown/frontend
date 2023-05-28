<template>
  <LineChart :data="chartData" :options="chartOptions" />
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
  name: 'App',
  components: {
    LineChart,
  },
  data() {
    return {
      chartData: {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
        ],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#9DC88D',
            data: [40, 39, 10, 40, 39, 80, 40],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
      props: {
        chartData: {
          type: Object,
          required: true,
        },
        chartOptions: {
          type: Object,
          required: true,
        },
      },
      async beforeMount() {
        console.log(this.chartData);
      },
      //   data() {
      //     return {
      //       chartData: this.data,
      //       chartOptions: this.options,
      //     };
      //   },
    };
  },
};
</script>
