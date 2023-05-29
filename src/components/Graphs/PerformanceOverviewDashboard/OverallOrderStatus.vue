<template>
  <n-space  vertical>
    <n-card style="width:400px !important;height: 350px!important;border: none !important;">
      <canvas style="padding: 0 !important;margin-left: -4em!important;" ref="chart"></canvas>
    </n-card>
  <n-card style="border-radius: 10px; background-color: rgb(237, 240, 249);">
      <n-space justify="space-between">
        <div>
          <p
            style="
              font-style: normal;
              font-weight: bold;
              font-size: 10px;
              line-height: 10px;
              letter-spacing: -0.01em;
              color: rgb(38, 63, 151);
            "
            >Live</p
          >
        </div>
        <div
          style="font-style: normal; font-weight: normal; font-size: 12px; color: rgb(38, 63, 151)"
        >
          {{ live }} orders
        </div>
      </n-space>
      <n-space justify="space-between">
        <div>
          <p
            style="
              font-style: normal;
              font-weight: bold;
              font-size: 10px;
              line-height: 10px;
              letter-spacing: -0.01em;
              color: rgb(38, 63, 151);
            "
          >
            Delivered
          </p>
        </div>
        <div
          style="font-style: normal; font-weight: normal; font-size: 12px; color: rgb(38, 63, 151)"
        >
          {{ delivered }} orders
        </div>
      </n-space>
      <n-space justify="space-between">
        <div>
          <p
            style="
              font-style: normal;
              font-weight: bold;
              font-size: 10px;
              line-height: 10px;
              letter-spacing: -0.01em;
              color: rgb(38, 63, 151);
            "
            >Returns</p
          >
        </div>
        <div
          style="font-style: normal; font-weight: normal; font-size: 12px; color: rgb(38, 63, 151)"
        >
          {{ returns }} orders
        </div>
      </n-space>
      <n-space justify="space-between">
        <div>
          <p
            style="
              font-style: normal;
              font-weight: bold;
              font-size: 10px;
              line-height: 10px;
              letter-spacing: -0.01em;
              color: rgb(38, 63, 151);
            "
            >Total</p
          >
        </div>
        <div
          style="font-style: normal; font-weight: normal; font-size: 12px; color: rgb(38, 63, 151)"
        >
          {{ live + delivered + returns }} orders
        </div>
      </n-space>
    </n-card>
  </n-space>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import Chart from 'chart.js/auto';
  import { getOrderStatusesAggregation } from '@/api/aggregation';

  const chart = ref();
  let live = ref(0);
  let delivered = ref(0);
  let returns = ref(0);
  function createOverAllOrderStatus() {
    let chartData: any = [];
    getOrderStatusesAggregation()
      .then(({ result }) => {
        for (const item of result.data) {
          if (
            item.status.status === 'manifested' ||
            item.status.status === 'placed' ||
            item.status.status === 'picked_up' ||
            item.status.status === 'in_transit' ||
            item.status.status === 'out_for_delivery'
          ) {
            live.value = live.value + item.value;
          }
          if (item.status.status === 'delivered') {
            delivered.value = delivered.value + item.value;
          }
          if (item.status.status === 'return_to_origin') {
            returns.value = returns.value + item.value;
          }
        }
        chartData = {
          labels: ['Live', 'Delivered', 'Returns'],
          datasets: [
            {
              data: [live, delivered, returns],
              backgroundColor: ['rgb(54, 162, 235)', 'rgb(51,166,43)', 'rgb(220,1,1)'],
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
                left: 140,
                right: 140,
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
    createOverAllOrderStatus();
  });
</script>
