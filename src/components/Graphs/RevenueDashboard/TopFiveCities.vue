<template>
  <canvas ref="chart"></canvas>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import Chart from 'chart.js/auto';
  import { getTopFiveCitiesRevenue } from '@/api/reports';

  const chart = ref();

  function createCodVsPrepaidChart() {
    let revenue: any = [];
    const cities: any = [];
    let chartData: any = [];
    getTopFiveCitiesRevenue()
      .then(({ result }) => {
        for (const item of result) {
          revenue.push(+item.revenue);
          cities.push(item.city);
        }
        chartData = {
          labels: cities,
          datasets: [
            {
              label: 'Revenue',
              data: revenue,
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(152,56,122)',
                'rgb(234,103,11)',
              ],
              hoverOffset: 4,
            },
          ],
        };
        const ctx = chart.value.getContext('2d');
        new Chart(ctx, {
          type: 'doughnut',
          data: chartData,
          options: {
            layout: {
              padding: {
                left: 100,
                right: 100,
                bottom: 100,
              },
            },
          },
        });
      })
      .catch((response) => {
        window['$message'].error(response.message);
      });
  }
  onMounted(() => {
    createCodVsPrepaidChart();
  });
</script>
