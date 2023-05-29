<template>
  <n-space :vertical="true">
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
          <n-space style="margin: 10px">
            <n-space :vertical="true">
              <div style="display: flex; justify-content: center">
                <p
                  style="
                    font-weight: bold;
                    font-size: 16px;
                    line-height: 16px;
                    letter-spacing: 0.4px;
                    color: rgb(159, 162, 180);
                  "
                >
                  Total Orders
                </p>
              </div>
              <div style="display: flex; justify-content: center">
                <n-statistic tabular-nums>
                  <n-number-animation show-separator :from="0" :to="totalOrders" :active="true" />
                </n-statistic>
              </div>
              <div style="display: flex; justify-content: center">
                <n-tag
                  :bordered="false"
                  :round="true"
                  style="width: 50px; justify-content: center; font-weight: bold"
                >
                  100%
                </n-tag>
              </div>
            </n-space>
            <n-divider :vertical="true" style="height: 100px" />
            <n-space
              v-for="(item, index) in orderStatusAggregation"
              :key="index"
              style="margin: 5px"
            >
              <n-space :vertical="true">
                <div style="display: flex; justify-content: center">
                  <p
                    v-if="isSuperAdmin"
                    style="
                      font-weight: bold;
                      font-size: 16px;
                      line-height: 16px;
                      letter-spacing: 0.4px;
                      color: rgb(159, 162, 180);
                    "
                  >
                    {{ item.masking }}
                  </p>
                  <p
                    v-else
                    style="
                      font-weight: bold;
                      font-size: 16px;
                      line-height: 16px;
                      letter-spacing: 0.4px;
                      color: rgb(159, 162, 180);
                    "
                  >
                    {{ item.status.masking }}
                  </p>
                </div>
                <div style="display: flex; justify-content: center">
                  <n-statistic tabular-nums>
                    <n-number-animation show-separator :from="0" :to="+item.value" :active="true" />
                  </n-statistic>
                </div>
                <div style="display: flex; justify-content: center">
                  <n-tag
                    :bordered="false"
                    :round="true"
                    :type="getType(item)"
                    style="width: 55px; justify-content: center; font-weight: bold"
                  >
                    {{ ((item.value / totalOrders) * 100).toFixed(1) }}%
                  </n-tag>
                </div>
              </n-space>
              <n-divider
                v-if="index !== orderStatusAggregation.length - 1"
                :vertical="true"
                style="height: 100px"
              />
            </n-space>
          </n-space>
        </n-card>
      </n-grid-item>
    </n-grid>
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
                Order Dispatch Pending
              </p>
              <order-status-pending />
              <!--              <n-space :vertical="true" style="height: 260px" justify="center">-->
              <!--                <div style="display: flex; justify-content: center; margin-top: 20px">-->
              <!--                  <img src="https://d10srchmli830n.cloudfront.net/1645785006887_rafiki.svg" />-->
              <!--                </div>-->
              <!--                <div style="display: flex; justify-content: center">-->
              <!--                  <p-->
              <!--                    style="-->
              <!--                      font-weight: bold;-->
              <!--                      font-size: 20px;-->
              <!--                      line-height: 28px;-->
              <!--                      letter-spacing: -0.03em;-->
              <!--                      color: rgb(38, 63, 151);-->
              <!--                      margin: 0px;-->
              <!--                    "-->
              <!--                  >-->
              <!--                    Order Dispatch Pending-->
              <!--                  </p>-->
              <!--                </div>-->
              <!--                <div>-->
              <!--                  <p-->
              <!--                    style="-->
              <!--                      font-size: 16px;-->
              <!--                      line-height: 140%;-->
              <!--                      color: rgb(38, 63, 151);-->
              <!--                      text-align: center;-->
              <!--                      opacity: 0.8;-->
              <!--                    "-->
              <!--                  >-->
              <!--                    Here you can see the daily total vs pending orders-->
              <!--                  </p>-->
              <!--                </div>-->
              <!--                <div style="display: flex; justify-content: center; margin-top: 10px">-->
              <!--                  <n-button type="primary" block secondary strong style="width: 200px">-->
              <!--                    See how it works-->
              <!--                  </n-button>-->
              <!--                </div>-->
              <!--                <p-->
              <!--                  style="-->
              <!--                    font-weight: bold;-->
              <!--                    font-size: 26px;-->
              <!--                    line-height: 28px;-->
              <!--                    letter-spacing: -0.03em;-->
              <!--                    color: rgb(38, 63, 151);-->
              <!--                    text-align: center;-->
              <!--                  "-->
              <!--                >-->
              <!--                  Coming Soon-->
              <!--                </p>-->
              <!--              </n-space>-->
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
            <n-space :vertical="true">
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
                  High RTO Areas
                </p>
              </n-space>
              <n-grid :x-gap="12" :y-gap="8" cols="4 xs:1 s:1 m:1 l:4" responsive="screen">
                <n-grid-item span="2 xs:4 s:4 m:4 l:2">
                  <n-space :vertical="true" style="gap: 0 0; margin-top: 40px">
                    <n-table :striped="true">
                      <thead>
                        <tr>
                          <th
                            style="
                              font-style: normal;
                              font-weight: bold;
                              font-size: 14px;
                              line-height: 17px;
                              letter-spacing: -0.01em;
                              color: rgb(126, 143, 204);
                              margin-top: 15px;
                            "
                            >AREA</th
                          >
                          <th
                            style="
                              font-style: normal;
                              font-weight: bold;
                              font-size: 14px;
                              line-height: 17px;
                              letter-spacing: -0.01em;
                              color: rgb(126, 143, 204);
                              margin-top: 15px;
                            "
                            >RTO / TOTAL ORDERS</th
                          >
                          <th
                            style="
                              font-style: normal;
                              font-weight: bold;
                              font-size: 14px;
                              line-height: 17px;
                              letter-spacing: -0.01em;
                              color: rgb(126, 143, 204);
                              margin-top: 15px;
                            "
                            >RTO%</th
                          >
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in highRtoCities" :key="item.id">
                          <td style="font-weight: bold">{{ item.city }}</td>
                          <td style="font-weight: bold">{{
                            +item.rto_orders + ' / ' + item.orders
                          }}</td>
                          <td style="font-weight: bold">
                            {{ ((+item.rto_orders / item.orders) * 100).toFixed(2) }}%
                          </td>
                        </tr>
                      </tbody>
                    </n-table>
                    <!--                    <n-card style="background-color: rgb(237, 240, 249); border-radius: 10px">-->
                    <!--                      <n-space :vertical="true" style="display: flex; justify-content: center">-->
                    <!--                        <div style="display: flex; justify-content: center; margin-top: 20px">-->
                    <!--                          <img-->
                    <!--                            src="https://d10srchmli830n.cloudfront.net/1645785752970_Responsive.svg"-->
                    <!--                          />-->
                    <!--                        </div>-->
                    <!--                        <div style="display: flex; justify-content: center">-->
                    <!--                          <p-->
                    <!--                            style="-->
                    <!--                              font-weight: bold;-->
                    <!--                              font-size: 20px;-->
                    <!--                              line-height: 28px;-->
                    <!--                              letter-spacing: -0.03em;-->
                    <!--                              color: rgb(38, 63, 151);-->
                    <!--                              margin: 0px;-->
                    <!--                            "-->
                    <!--                          >-->
                    <!--                            RTO Performance Report-->
                    <!--                          </p>-->
                    <!--                        </div>-->
                    <!--                        <div>-->
                    <!--                          <p-->
                    <!--                            style="-->
                    <!--                              font-size: 16px;-->
                    <!--                              line-height: 140%;-->
                    <!--                              color: rgb(38, 63, 151);-->
                    <!--                              text-align: center;-->
                    <!--                              opacity: 0.8;-->
                    <!--                            "-->
                    <!--                          >-->
                    <!--                            Here you will see the cities which have high RTO to take corrective-->
                    <!--                            measures-->
                    <!--                          </p>-->
                    <!--                        </div>-->
                    <!--                        <div style="display: flex; justify-content: center; margin-top: 20px">-->
                    <!--                          <n-button type="primary" block secondary strong style="width: 200px">-->
                    <!--                            See how it works-->
                    <!--                          </n-button>-->
                    <!--                        </div>-->
                    <!--                      </n-space>-->
                    <!--                    </n-card>-->
                  </n-space>
                </n-grid-item>
              </n-grid>
            </n-space>
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
                High RTO Products
              </p>
            </n-space>
            <n-table :striped="true" style="margin: 5px">
              <thead>
                <tr>
                  <th
                    style="
                      font-style: normal;
                      font-weight: bold;
                      font-size: 14px;
                      line-height: 17px;
                      letter-spacing: -0.01em;
                      color: rgb(126, 143, 204);
                      margin-top: 15px;
                    "
                    >SKU</th
                  >
                  <th
                    style="
                      font-style: normal;
                      font-weight: bold;
                      font-size: 14px;
                      line-height: 17px;
                      letter-spacing: -0.01em;
                      color: rgb(126, 143, 204);
                      margin-top: 15px;
                    "
                    >RTO/Orders</th
                  >
                  <th
                    style="
                      font-style: normal;
                      font-weight: bold;
                      font-size: 14px;
                      line-height: 17px;
                      letter-spacing: -0.01em;
                      color: rgb(126, 143, 204);
                      margin-top: 15px;
                    "
                    >RTO %</th
                  >
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in rtoProducts" :key="index">
                  <td style="font-weight: bold">{{ item.sku }}</td>
                  <td style="font-weight: bold">{{ item.rto_orders }} / {{ item.total_orders }}</td>
                  <td style="font-weight: bold">
                    {{ ((item.rto_orders / item.total_orders) * 100).toFixed(2) }}%
                  </td>
                </tr>
              </tbody>
            </n-table>
            <!--            <n-space :vertical="true" style="height: 790px" justify="center">-->
            <!--              <div style="display: flex; justify-content: center; margin-top: 20px">-->
            <!--                <img src="https://d10srchmli830n.cloudfront.net/1645786709016_Group-26922.svg" />-->
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
            <!--                  Product RTO Report-->
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
            <!--                  Here you will see SKUs with highest number of RTOs to help you take further-->
            <!--                  actions-->
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
          </n-space>
        </n-card>
      </n-grid-item>
    </n-grid>
  </n-space>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import {
    getOrderStatusesAggregation,
    getSuperAdminOrderStatusesAggregation,
  } from '@/api/aggregation';
  import { useUserStore } from '@/store/modules/user';
  import { getHighRtoCities, getHighRtoProducts } from '@/api/reports';

  const userStore = useUserStore();
  const orderStatusAggregation: any = ref({});
  const isSuperAdmin = ref(false);
  const totalOrders: any = ref(0);
  const rtoProducts: any = ref();
  const highRtoCities: any = ref();
  onMounted(() => {
    checkUserRole();
    if (isSuperAdmin.value) {
      getSuperAdminOrderStatusesAggregation()
        .then(({ result }) => {
          totalOrders.value = 0;
          orderStatusAggregation.value = result.data;
          for (const item of orderStatusAggregation.value) {
            totalOrders.value += +item.value;
          }
        })
        .catch((response) => {
          window['$message'].error(response.message);
        });
    } else {
      getHighRtoProducts()
        .then(({ result }) => {
          rtoProducts.value = result;
        })
        .catch((response) => {
          window['$message'].error(response.message);
        });
      getHighRtoCities()
        .then(({ result }) => {
          highRtoCities.value = result;
        })
        .catch((response) => {
          window['$message'].error(response.message);
        });
      getOrderStatusesAggregation()
        .then(({ result }) => {
          totalOrders.value = 0;
          orderStatusAggregation.value = result.data;
          for (const item of orderStatusAggregation.value) {
            totalOrders.value += item.value;
          }
        })
        .catch((response) => {
          window['$message'].error(response.message);
        });
    }
  });
  function getType(item: any) {
    let type;
    if (isSuperAdmin.value) {
      type = item.status;
    } else {
      type = item.status.status;
    }
    switch (type) {
      case 'placed':
        return 'warning';
        break;
      case 'manifested':
        return 'warning';
        break;
      case 'picked_up':
        return 'info';
        break;
      case 'in_transit':
        return 'info';
        break;
      case 'out_for_delivery':
        return 'info';
        break;
      case 'non_delivery_report':
        return 'error';
        break;
      case 'reattempt':
        return 'error';
        break;
      case 'return_to_origin':
        return 'error';
        break;
      case 'delivered':
        return 'success';
        break;
      case 'lost':
        return 'error';
        break;
      case 'damaged':
        return 'error';
        break;
      default:
        return 'default';
    }
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
</script>
