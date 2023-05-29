<template>
  <canvas ref="chart"></canvas>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import Chart from 'chart.js/auto';
  import { getOrderDispatchPending } from '@/api/reports';

  const chart = ref();

  function createOrderStatusPendingChart() {
    let total: any = [];
    let pending: any = [];
    const dates: any = [];
    let chartData: any = [];
    getOrderDispatchPending()
      .then(({ result }) => {
        for (const item of result.total) {
          total.push(+item.total);
          dates.push(item.dated);
        }
        for (const item of result.pending) {
          pending.push(+item.total_pending);
        }
        chartData = [
          {
            label: 'Total',
            data: total,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
          {
            label: 'Pending',
            data: pending,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
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
    createOrderStatusPendingChart();
  });
</script>
