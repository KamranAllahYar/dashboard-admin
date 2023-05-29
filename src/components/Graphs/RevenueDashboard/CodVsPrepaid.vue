<template>
  <canvas ref="chart"></canvas>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import Chart from 'chart.js/auto';
  import { getRevenueCodVsPrepaid } from '@/api/reports';

  const chart = ref();

  function createCodVsPrepaidChart() {
    let cod: any = [];
    let prepaid: any = [];
    const dates: any = [];
    let chartData: any = [];
    getRevenueCodVsPrepaid()
      .then(({ result }) => {
        for (const item of result.cod) {
          cod.push(+item.revenue);
          dates.push(item.dated);
        }
        for (const item of result.prepaid) {
          prepaid.push(+item.revenue);
        }
        chartData = [
          {
            label: 'COD',
            data: cod,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
          {
            label: 'Prepaid',
            data: prepaid,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ];
        const ctx = chart.value.getContext('2d');
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: dates,
            datasets: chartData,
          },
          options: {
            indexAxis: 'y',
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
