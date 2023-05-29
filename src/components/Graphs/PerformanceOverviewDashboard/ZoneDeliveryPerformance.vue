<template>
  <canvas ref="chart"></canvas>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import Chart from 'chart.js/auto';
  import { getZoneDeliveryPerformance } from '@/api/reports';

  const chart = ref();

  function createZoneDeliveryPerformanceChart() {
    let orders: any = [];
    let returned: any = [];
    let delivered: any = [];
    let zone: any = [];
    let chartData: any = [];
    getZoneDeliveryPerformance()
      .then(({ result }) => {
        let number = 50;
        for (const item of result) {
          orders.push(+item.orders);
          returned.push(+item.rto_orders);
          delivered.push(+item.delivered_orders);
          zone.push(item.title);
        }
        chartData = [
          {
            label: 'Total Orders',
            data: orders,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
          {
            label: 'Returned',
            data: returned,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
          {
            label: 'Delivered',
            data: delivered,
            backgroundColor: 'rgba(81,217,60,0.24)',
            borderColor: 'rgb(81,217,60)',
            borderWidth: 1,
          },
        ];
        console.log(chartData);
        const ctx = chart.value.getContext('2d');
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: zone,
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
    createZoneDeliveryPerformanceChart();
  });
</script>
