<template>
  <canvas ref="chart"></canvas>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import Chart from 'chart.js/auto';
  import { getDailyPerformanceSummary } from '@/api/reports';

  const chart = ref();

  function createDailyPerformanceChart() {
    let manifested: any = [];
    let delivered: any = [];
    let ndr: any = [];
    let rto: any = [];
    const dates: any = [];
    let chartData: any = [];
    getDailyPerformanceSummary()
      .then(({ result }) => {
        for (const item of result.manifested) {
          manifested.push(+item.orders);
          dates.push(item.dated);
        }
        for (const item of result.delivered) {
          delivered.push(+item.orders);
        }
        for (const item of result.ndr) {
          ndr.push(+item.orders);
        }
        for (const item of result.rto) {
          rto.push(+item.orders);
        }
        chartData = [
          {
            label: 'Manifested',
            data: manifested,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',

            borderWidth: 1,
          },
          {
            label: 'Delivered',
            data: delivered,
            backgroundColor: 'rgba(81,217,60,0.24)',
            borderColor: 'rgb(81,217,60)',
            borderWidth: 1,
          },
          {
            label: 'NDR',
            data: ndr,
            backgroundColor: 'rgba(235,102,54,0.2)',
            borderColor: 'rgb(235,102,54)',
            borderWidth: 1,
          },
          {
            label: 'RTO',
            data: rto,
            backgroundColor: 'rgba(235,54,54,0.2)',
            borderColor: 'rgb(235,54,54)',
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
    createDailyPerformanceChart();
  });
</script>
