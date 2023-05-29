<template>
  <n-space :vertical="true">
    <n-grid :x-gap="12" :y-gap="8" cols="8 xs:2 s:2 m:2 l:8" responsive="screen">
      <n-grid-item span="5 xs:2 s:2 m:2 l:5">
        <n-space :vertical="true">
          <n-card
            style="
              border-radius: 10px;
              margin-top: 10px;
              border-width: 1px;
              display: flex;
              justify-items: center;
            "
          >
            <n-space :vertical="true">
              <n-space justify="space-between">
                <n-space>
                  <p
                    style="
                      font-weight: bold;
                      font-size: 20px;
                      line-height: 20px;
                      letter-spacing: -0.01em;
                      color: rgb(38, 63, 151);
                      margin: 0px;
                    "
                  >
                    Revenue Report
                  </p>
                  <n-button
                    v-if="isSuperAdmin"
                    text
                    style="
                      font-weight: bold;
                      font-size: 16px;
                      line-height: 20px;
                      letter-spacing: -0.01em;
                      color: rgb(54, 138, 224);
                      margin: 0px;
                    "
                    @click="updateRevenueStats"
                  >
                    (Update stats)
                  </n-button>
                </n-space>

                <n-select
                  placeholder="select a filter"
                  :options="options"
                  size="small"
                  default-value="today"
                  @update:value="handleUpdateValue"
                  style="width: 150px"
                />
              </n-space>

              <n-space style="margin: 10px" justify="space-evenly">
                <n-space
                  v-for="(item, index) in revenueAggregation"
                  :key="index"
                  justify="space-between"
                  style="margin: 5px"
                >
                  <n-space :vertical="true">
                    <p
                      style="
                        font-weight: bold;
                        font-size: 16px;
                        line-height: 16px;
                        letter-spacing: 0.4px;
                        color: rgb(159, 162, 180);
                      "
                    >
                      {{ keys[item.key] }}
                    </p>
                    <n-space style="gap: 0px">
                      <p style="font-size: 24px; color: #333639; margin-top: 4px"> Rs. </p>
                      <n-statistic tabular-nums>
                        <n-number-animation
                          show-separator
                          :from="0.0"
                          :to="item.value"
                          :active="true"
                        />
                      </n-statistic>
                    </n-space>
                  </n-space>
                  <n-divider
                    v-if="index !== revenueAggregation.length - 1"
                    :vertical="true"
                    style="height: 60px"
                  />
                </n-space>
              </n-space>
            </n-space>
          </n-card>
          <n-card
            style="
              border-radius: 10px;
              margin-top: 10px;
              border-width: 1px;
              display: flex;
              justify-items: center;
            "
          >
            <p
              style="
                font-weight: bold;
                font-size: 20px;
                line-height: 20px;
                letter-spacing: -0.01em;
                color: rgb(38, 63, 151);
                margin: 0px;
              "
            >
              COD vs Prepaid Revenue
            </p>
            <!--            <n-space-->
            <!--              :vertical="true"-->
            <!--              style="display: flex; justify-content: center; margin: 20px"-->
            <!--            >-->
            <!--              <div style="display: flex; justify-content: center; margin-top: 20px">-->
            <!--                <img src="https://d10srchmli830n.cloudfront.net/1645772377800_Responsive.svg" />-->
            <!--              </div>-->
            <!--              <div style="display: flex; justify-content: center">-->
            <!--                <p-->
            <!--                  style="-->
            <!--                    font-weight: bold;-->
            <!--                    font-size: 20px;-->
            <!--                    line-height: 28px;-->
            <!--                    letter-spacing: -0.03em;-->
            <!--                    color: rgb(38, 63, 151);-->
            <!--                    margin: 0px;-->
            <!--                  "-->
            <!--                >-->
            <!--                  Revenue Report-->
            <!--                </p>-->
            <!--              </div>-->
            <!--              <div>-->
            <!--                <p-->
            <!--                  style="-->
            <!--                    font-size: 16px;-->
            <!--                    line-height: 140%;-->
            <!--                    color: rgb(38, 63, 151);-->
            <!--                    text-align: center;-->
            <!--                    opacity: 0.8;-->
            <!--                  "-->
            <!--                >-->
            <!--                  Here you will see total revenue of the delivered orders in last 7 days and split-->
            <!--                  by cod vs Prepaid-->
            <!--                </p>-->
            <!--              </div>-->
            <!--              <div style="display: flex; justify-content: center; margin-top: 20px">-->
            <!--                <n-button type="primary" block secondary strong style="width: 200px">-->
            <!--                  See how it works-->
            <!--                </n-button>-->
            <!--              </div>-->
            <!--              <p-->
            <!--                style="-->
            <!--                  font-weight: bold;-->
            <!--                  font-size: 26px;-->
            <!--                  line-height: 28px;-->
            <!--                  letter-spacing: -0.03em;-->
            <!--                  color: rgb(38, 63, 151);-->
            <!--                  text-align: center;-->
            <!--                  margin-top: 20px;-->
            <!--                "-->
            <!--              >-->
            <!--                Coming Soon-->
            <!--              </p>-->
            <!--            </n-space>-->
            <cod-vs-prepaid />
          </n-card>
        </n-space>
      </n-grid-item>
      <n-grid-item span="3 xs:2 s:2 m:2 l:3">
        <n-card
          style="
            border-radius: 10px;
            margin-top: 10px;
            border-width: 1px;
            display: flex;
            justify-items: center;
          "
        >
          <n-space :vertical="true" style="display: flex; justify-content: space-between">
            <n-space>
              <img src="https://d10srchmli830n.cloudfront.net/1619694263185_location-order.svg" />
              <p
                style="
                  font-weight: bold;
                  font-size: 20px;
                  line-height: 20px;
                  letter-spacing: -0.01em;
                  color: rgb(38, 63, 151);
                  margin: 0px;
                "
              >
                Top 5 Location's Revenue
              </p>
            </n-space>
            <!--            <n-space :vertical="true" style="height: 463px" justify="center">-->
            <!--              <div style="display: flex; justify-content: center; margin-top: 20px">-->
            <!--                <img-->
            <!--                  src="https://d10srchmli830n.cloudfront.net/1645774804890_Current-location-pana-2.svg"-->
            <!--                />-->
            <!--              </div>-->
            <!--              <div style="display: flex; justify-content: center">-->
            <!--                <p-->
            <!--                  style="-->
            <!--                    font-weight: bold;-->
            <!--                    font-size: 20px;-->
            <!--                    line-height: 28px;-->
            <!--                    letter-spacing: -0.03em;-->
            <!--                    color: rgb(38, 63, 151);-->
            <!--                    margin: 0px;-->
            <!--                  "-->
            <!--                >-->
            <!--                  Top 5 High Revenue Generating Cities-->
            <!--                </p>-->
            <!--              </div>-->
            <!--              <div>-->
            <!--                <p-->
            <!--                  style="-->
            <!--                    font-size: 16px;-->
            <!--                    line-height: 140%;-->
            <!--                    color: rgb(38, 63, 151);-->
            <!--                    text-align: center;-->
            <!--                    opacity: 0.8;-->
            <!--                  "-->
            <!--                >-->
            <!--                  Here you will be able to see Top Cities which generate highest revenues-->
            <!--                </p>-->
            <!--              </div>-->
            <!--              <div style="display: flex; justify-content: center; margin-top: 20px">-->
            <!--                <n-button type="primary" block secondary strong style="width: 200px">-->
            <!--                  See how it works-->
            <!--                </n-button>-->
            <!--              </div>-->
            <!--              <p-->
            <!--                style="-->
            <!--                  font-weight: bold;-->
            <!--                  font-size: 26px;-->
            <!--                  line-height: 28px;-->
            <!--                  letter-spacing: -0.03em;-->
            <!--                  color: rgb(38, 63, 151);-->
            <!--                  text-align: center;-->
            <!--                  margin-top: 20px;-->
            <!--                "-->
            <!--              >-->
            <!--                Coming Soon-->
            <!--              </p>-->
            <!--            </n-space>-->
            <top-five-cities />
          </n-space>
        </n-card>
      </n-grid-item>
    </n-grid>
    <n-grid :x-gap="12" :y-gap="8" cols="1 xs:1 s:1 m:1 l:1" responsive="screen">
      <n-grid-item span="1">
        <n-card
          style="
            border-radius: 10px;
            margin-top: 10px;
            border-width: 1px;
            display: flex;
            justify-items: center;
          "
        >
          <p
            style="
              font-weight: bold;
              font-size: 20px;
              line-height: 20px;
              letter-spacing: -0.01em;
              color: rgb(38, 63, 151);
              margin: 0px;
            "
          >
            SKU Revenue
          </p>
          <n-table :bordered="false" :single-line="false">
            <thead>
              <tr>
                <th style="font-weight: bold">SKU</th>
                <th style="font-weight: bold">Quantity</th>
                <th style="font-weight: bold">Revenue</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in skus" :key="index">
                <td>{{ item.sku }}</td>
                <td>{{ item.quantity_sold }}</td>
                <td>{{ item.revenue }}</td>
              </tr>
            </tbody>
          </n-table>
          <!--          <n-space :vertical="true" style="display: flex; justify-content: center; margin: 20px">-->
          <!--            <div style="display: flex; justify-content: center; margin-top: 20px">-->
          <!--              <img src="https://d10srchmli830n.cloudfront.net/1645775926283_Responsive-(1).svg" />-->
          <!--            </div>-->
          <!--            <div style="display: flex; justify-content: center">-->
          <!--              <p-->
          <!--                style="-->
          <!--                  font-weight: bold;-->
          <!--                  font-size: 20px;-->
          <!--                  line-height: 28px;-->
          <!--                  letter-spacing: -0.03em;-->
          <!--                  color: rgb(38, 63, 151);-->
          <!--                  margin: 0px;-->
          <!--                "-->
          <!--              >-->
          <!--                Best Selling SKUs-->
          <!--              </p>-->
          <!--            </div>-->
          <!--            <div>-->
          <!--              <p-->
          <!--                style="-->
          <!--                  font-size: 16px;-->
          <!--                  line-height: 140%;-->
          <!--                  color: rgb(38, 63, 151);-->
          <!--                  text-align: center;-->
          <!--                  opacity: 0.8;-->
          <!--                "-->
          <!--              >-->
          <!--                Here you will see revenue from top SKUs and their ordered quantities.-->
          <!--              </p>-->
          <!--            </div>-->
          <!--            <div style="display: flex; justify-content: center; margin-top: 20px">-->
          <!--              <n-button type="primary" block secondary strong style="width: 200px">-->
          <!--                See how it works-->
          <!--              </n-button>-->
          <!--            </div>-->
          <!--            <p-->
          <!--              style="-->
          <!--                font-weight: bold;-->
          <!--                font-size: 26px;-->
          <!--                line-height: 28px;-->
          <!--                letter-spacing: -0.03em;-->
          <!--                color: rgb(38, 63, 151);-->
          <!--                text-align: center;-->
          <!--                margin-top: 20px;-->
          <!--              "-->
          <!--            >-->
          <!--              Coming Soon-->
          <!--            </p>-->
          <!--          </n-space>-->
        </n-card>
      </n-grid-item>
    </n-grid>
  </n-space>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import {
    getRevenueAggregation,
    getSuperAdminOrdersRevenueAggregation,
    updateRevenueAggregation,
  } from '@/api/aggregation';
  import { useUserStore } from '@/store/modules/user';
  import CodVsPrepaid from '@/components/Graphs/RevenueDashboard/CodVsPrepaid.vue';
  import { getTopSellingSkuRevenue } from '@/api/reports';

  const userStore = useUserStore();
  const isSuperAdmin = ref(false);
  const skus: any = ref();
  const dateFilter = ref('today');
  const revenueAggregation: any = ref([
    {
      key: 'total_revenue',
      value: 0,
    },
    {
      key: 'cod_revenue',
      value: 0,
    },
    {
      key: 'prepaid_revenue',
      value: 0,
    },
  ]);

  onMounted(() => {
    checkUserRole();
    callRevenueAggregationApi('today');
    getTopSellingSkuRevenue()
      .then(({ result }) => {
        if (result) {
          skus.value = result;
        }
      })
      .catch((response) => {
        window['$message'].error(response.message);
      });
  });
  const keys = {
    total_revenue: 'Total Revenue',
    cod_revenue: 'COD Revenue',
    prepaid_revenue: 'Prepaid Revenue',
  };

  const options = [
    {
      label: 'Today',
      value: 'today',
    },
    {
      label: 'Yesterday',
      value: 'yesterday',
    },
    {
      label: 'Past 7 Days',
      value: 'pastOneWeek',
    },
    {
      label: 'Past 30 Days',
      value: 'pastThirtyDays',
    },
  ];
  function handleUpdateValue(value: string) {
    dateFilter.value = value;
    revenueAggregation.value = [
      {
        key: 'total_revenue',
        value: 0,
      },
      {
        key: 'cod_revenue',
        value: 0,
      },
      {
        key: 'prepaid_revenue',
        value: 0,
      },
    ];
    callRevenueAggregationApi(value);
  }
  function checkUserRole() {
    let i = 0;
    let roles = userStore.getRoles;
    while (i < roles.length) {
      if (roles[i] === 'super admin') {
        isSuperAdmin.value = true;
      }
      i++;
    }
  }
  function callRevenueAggregationApi(dateFilter: string) {
    if (isSuperAdmin.value) {
      getSuperAdminOrdersRevenueAggregation(dateFilter)
        .then(({ result }) => {
          if (result && result.data.length) {
            revenueAggregation.value = result.data;
          }
        })
        .catch((response) => {
          window['$message'].error(response.message);
        });
    } else {
      getRevenueAggregation(dateFilter)
        .then(({ result }) => {
          if (result && result.data.length) {
            revenueAggregation.value = result.data;
          }
        })
        .catch((response) => {
          window['$message'].error(response.message);
        });
    }
  }
  function updateRevenueStats() {
    updateRevenueAggregation(dateFilter.value)
      .then(({ result }) => {
        getSuperAdminOrdersRevenueAggregation(dateFilter.value)
          .then(({ result }) => {
            if (result && result.data.length) {
              revenueAggregation.value = result.data;
            }
          })
          .catch((response) => {
            window['$message'].error(response.message);
          });
      })
      .catch((response) => {
        window['$message'].error(response.message);
      });
  }
</script>
