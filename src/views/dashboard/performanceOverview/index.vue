<template>
  <n-space :vertical="true">
    <n-grid :x-gap="12" :y-gap="8" cols="7 xs:2 s:2 m:2 l:7" responsive="screen">
      <n-grid-item span="5 xs:2 s:2 m:2 l:5">
        <n-space vertical>
          <n-card
            style="
              border-radius: 10px;
              margin-top: 10px;
              border-width: 1px;
              display: flex;
              justify-items: center;
            "
          >
            <n-tabs
              class="card-tabs"
              default-value="tab1"
              size="large"
              animated
              style="margin: 0 -4px"
              pane-style="
                padding-left: 4px;
                padding-right: 4px;
                box-sizing: border-box;
               "
              tab-style=" font-weight: bold;
                color: rgb(38, 63, 151);
                opacity: 1;
                letter-spacing: -0.01em;
                font-size: 14px;
                line-height: 12px;"
            >
              <n-tab-pane name="tab1" tab="ZONE WISE DELIVERY PERFORMANCE">
                <div>
                  <zone-delivery-performance />
                  <!--                  <n-space :vertical="true" style="display: flex; justify-content: center">-->
                  <!--                    <div style="display: flex; justify-content: center; margin-top: 20px">-->
                  <!--                      <img src="https://d10srchmli830n.cloudfront.net/1645705080595_rafiki.svg" />-->
                  <!--                    </div>-->
                  <!--                    <div style="display: flex; justify-content: center">-->
                  <!--                      <p-->
                  <!--                        style="-->
                  <!--                          font-weight: bold;-->
                  <!--                          font-size: 28px;-->
                  <!--                          line-height: 28px;-->
                  <!--                          letter-spacing: -0.03em;-->
                  <!--                          color: rgb(38, 63, 151);-->
                  <!--                          margin: 0px;-->
                  <!--                        "-->
                  <!--                      >-->
                  <!--                        Check Delivery Performance Of Each Zone-->
                  <!--                      </p>-->
                  <!--                    </div>-->
                  <!--                    <div>-->
                  <!--                      <p-->
                  <!--                        style="-->
                  <!--                          font-size: 16px;-->
                  <!--                          line-height: 140%;-->
                  <!--                          color: rgb(38, 63, 151);-->
                  <!--                          text-align: center;-->
                  <!--                          opacity: 0.8;-->
                  <!--                        "-->
                  <!--                      >-->
                  <!--                        Here you will be able to see total number of orders which are Live,-->
                  <!--                        Delivered and Return across each zone-->
                  <!--                      </p>-->
                  <!--                    </div>-->
                  <!--                    <div style="display: flex; justify-content: center; margin-top: 20px">-->
                  <!--                      <n-button type="primary" block secondary strong style="width: 200px">-->
                  <!--                        See how it works-->
                  <!--                      </n-button>-->
                  <!--                    </div>-->
                  <!--                  </n-space>-->
                </div>
              </n-tab-pane>
              <n-tab-pane name="tab2" tab="ZONE WISE TAT PERFORMANCE">
                <div>
                  <n-space :vertical="true" style="display: flex; justify-content: center">
                    <div style="display: flex; justify-content: center; margin-top: 20px">
                      <img src="https://d10srchmli830n.cloudfront.net/1645705080595_rafiki.svg" />
                    </div>
                    <div style="display: flex; justify-content: center">
                      <p
                        style="
                          font-weight: bold;
                          font-size: 28px;
                          line-height: 28px;
                          letter-spacing: -0.03em;
                          color: rgb(38, 63, 151);
                          margin: 0px;
                        "
                      >
                        Check TAT Performance Of Each Zone
                      </p>
                    </div>
                    <div>
                      <p
                        style="
                          font-size: 16px;
                          line-height: 140%;
                          color: rgb(38, 63, 151);
                          text-align: center;
                          opacity: 0.8;
                        "
                      >
                        Here you will be able to see total number of orders which are Live,
                        Delivered and Return across each zone
                      </p>
                    </div>
                    <div style="display: flex; justify-content: center; margin-top: 20px">
                      <n-button type="primary" block secondary strong style="width: 200px">
                        See how it works
                      </n-button>
                    </div>
                  </n-space>
                </div>
              </n-tab-pane>
            </n-tabs>
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
              Past 7 Days Performance Summary
            </p>
            <daily-performance-summary />
            <!--          <n-space :vertical="true" style="display: flex; justify-content: center; margin: 20px">-->
            <!--            <div style="display: flex; justify-content: center; margin-top: 20px">-->
            <!--              <img src="https://d10srchmli830n.cloudfront.net/1645772803551_rafiki.svg" />-->
            <!--            </div>-->
            <!--            <div style="display: flex; justify-content: center">-->
            <!--              <p-->
            <!--                style="-->
            <!--                  font-weight: bold;-->
            <!--                  font-size: 28px;-->
            <!--                  line-height: 28px;-->
            <!--                  letter-spacing: -0.03em;-->
            <!--                  color: rgb(38, 63, 151);-->
            <!--                  margin: 0px;-->
            <!--                "-->
            <!--              >-->
            <!--                Check Daily Performance-->
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
            <!--                Here you will see the number of orders that are getting Delivered or Picked up on-->
            <!--                each day.-->
            <!--              </p>-->
            <!--            </div>-->
            <!--            <div style="display: flex; justify-content: center; margin-top: 20px">-->
            <!--              <n-button type="primary" block secondary strong style="width: 200px">-->
            <!--                See how it works-->
            <!--              </n-button>-->
            <!--            </div>-->
            <!--          </n-space>-->
          </n-card>
        </n-space>
      </n-grid-item>
      <n-grid-item span="2 xs:2 s:2 m:2 l:2">
        <n-space vertical>
          <n-card
            style="
              border-radius: 10px;
              margin-top: 10px;
              border-width: 1px;
              height: 650px;
              display: flex;
              justify-items: center;
            "
          >
            <n-space
              :vertical="true"
              style="display: flex; justify-content: space-between; height: 310px"
            >
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
                  Overall Order Status
                </p>
              </n-space>
              <n-space
                style="
                  width: 100%;
                  display: flex !important;
                  justify-content: center !important;
                  align-items: center;
                "
              >
                <overall-order-status />
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
                High Order Volume Cities
              </p>
              <n-grid :x-gap="12" :y-gap="8" cols="4 xs:1 s:1 m:1 l:4" responsive="screen">
                <n-grid-item span="4 xs:4 s:4 m:4 l:4">
                  <n-space :vertical="true" justify="center" style="gap: 0 0; height: 350px">
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
                            "
                            >CITIES</th
                          >
                          <th
                            style="
                              font-style: normal;
                              font-weight: bold;
                              font-size: 14px;
                              line-height: 17px;
                              letter-spacing: -0.01em;
                              color: rgb(126, 143, 204);
                            "
                            >ORDER COUNT</th
                          >
                          <th
                            style="
                              font-style: normal;
                              font-weight: bold;
                              font-size: 14px;
                              line-height: 17px;
                              letter-spacing: -0.01em;
                              color: rgb(126, 143, 204);
                            "
                            >PROPORTION</th
                          >
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in highOrderCities" :key="index">
                          <td>{{ item.city }}</td>
                          <td>{{ item.orders }}</td>
                          <td>{{ ((item.orders / item.total_orders) * 100).toFixed(2) }} %</td>
                        </tr>
                      </tbody>
                    </n-table>
                  </n-space>
                </n-grid-item>
              </n-grid>
            </n-space>
          </n-card>
        </n-space>
      </n-grid-item>
    </n-grid>

    <n-grid :x-gap="12" :y-gap="8" cols="7 xs:2 s:2 m:2 l:7" responsive="screen">
      <n-grid-item span="5 xs:2 s:2 m:2 l:5" />
      <n-grid-item span="2 xs:2 s:2 m:2 l:2">
        <!--        <n-card-->
        <!--          style="-->
        <!--            border-radius: 10px;-->
        <!--            margin-top: 10px;-->
        <!--            border-width: 1px;-->
        <!--            display: flex;-->
        <!--            justify-items: center;-->
        <!--          "-->
        <!--        >-->
        <!--          <n-space-->
        <!--            :vertical="true"-->
        <!--            style="display: flex; justify-content: space-between; height: 477px"-->
        <!--          >-->
        <!--            <n-space>-->
        <!--              <img src="https://d10srchmli830n.cloudfront.net/1619694263185_location-order.svg" />-->
        <!--              <p-->
        <!--                style="-->
        <!--                  font-weight: bold;-->
        <!--                  font-size: 20px;-->
        <!--                  line-height: 20px;-->
        <!--                  letter-spacing: -0.01em;-->
        <!--                  color: rgb(38, 63, 151);-->
        <!--                  margin: 0px;-->
        <!--                "-->
        <!--              >-->
        <!--                Delivery Attempts-->
        <!--              </p>-->
        <!--            </n-space>-->
        <!--            <n-card style="border-radius: 10px; background-color: rgb(237, 240, 249)">-->
        <!--              <n-space justify="space-between">-->
        <!--                <div>-->
        <!--                  <p-->
        <!--                    style="-->
        <!--                      font-style: normal;-->
        <!--                      font-weight: bold;-->
        <!--                      font-size: 10px;-->
        <!--                      line-height: 10px;-->
        <!--                      letter-spacing: -0.01em;-->
        <!--                      color: rgb(38, 63, 151);-->
        <!--                    "-->
        <!--                    >1st Attempt</p-->
        <!--                  >-->
        <!--                </div>-->
        <!--                <div-->
        <!--                  style="-->
        <!--                    font-style: normal;-->
        <!--                    font-weight: normal;-->
        <!--                    font-size: 12px;-->
        <!--                    color: rgb(38, 63, 151);-->
        <!--                  "-->
        <!--                >-->
        <!--                  0 orders-->
        <!--                </div>-->
        <!--              </n-space>-->
        <!--              <n-space justify="space-between">-->
        <!--                <div>-->
        <!--                  <p-->
        <!--                    style="-->
        <!--                      font-style: normal;-->
        <!--                      font-weight: bold;-->
        <!--                      font-size: 10px;-->
        <!--                      line-height: 10px;-->
        <!--                      letter-spacing: -0.01em;-->
        <!--                      color: rgb(38, 63, 151);-->
        <!--                    "-->
        <!--                  >-->
        <!--                    2nd Attempt-->
        <!--                  </p>-->
        <!--                </div>-->
        <!--                <div-->
        <!--                  style="-->
        <!--                    font-style: normal;-->
        <!--                    font-weight: normal;-->
        <!--                    font-size: 12px;-->
        <!--                    color: rgb(38, 63, 151);-->
        <!--                  "-->
        <!--                >-->
        <!--                  0 orders-->
        <!--                </div>-->
        <!--              </n-space>-->
        <!--              <n-space justify="space-between">-->
        <!--                <div>-->
        <!--                  <p-->
        <!--                    style="-->
        <!--                      font-style: normal;-->
        <!--                      font-weight: bold;-->
        <!--                      font-size: 10px;-->
        <!--                      line-height: 10px;-->
        <!--                      letter-spacing: -0.01em;-->
        <!--                      color: rgb(38, 63, 151);-->
        <!--                    "-->
        <!--                    >3rd Attempt</p-->
        <!--                  >-->
        <!--                </div>-->
        <!--                <div-->
        <!--                  style="-->
        <!--                    font-style: normal;-->
        <!--                    font-weight: normal;-->
        <!--                    font-size: 12px;-->
        <!--                    color: rgb(38, 63, 151);-->
        <!--                  "-->
        <!--                >-->
        <!--                  0 orders-->
        <!--                </div>-->
        <!--              </n-space>-->
        <!--              <n-space justify="space-between">-->
        <!--                <div>-->
        <!--                  <p-->
        <!--                    style="-->
        <!--                      font-style: normal;-->
        <!--                      font-weight: bold;-->
        <!--                      font-size: 10px;-->
        <!--                      line-height: 10px;-->
        <!--                      letter-spacing: -0.01em;-->
        <!--                      color: rgb(38, 63, 151);-->
        <!--                    "-->
        <!--                    >4+ Attempt</p-->
        <!--                  >-->
        <!--                </div>-->
        <!--                <div-->
        <!--                  style="-->
        <!--                    font-style: normal;-->
        <!--                    font-weight: normal;-->
        <!--                    font-size: 12px;-->
        <!--                    color: rgb(38, 63, 151);-->
        <!--                  "-->
        <!--                >-->
        <!--                  0 orders-->
        <!--                </div>-->
        <!--              </n-space>-->
        <!--            </n-card>-->
        <!--          </n-space>-->
        <!--        </n-card>-->
      </n-grid-item>
    </n-grid>
    <n-grid :x-gap="12" :y-gap="8" cols="1 xs:1 s:1 m:1 l:1" responsive="screen">
      <n-grid-item span="1" />
    </n-grid>
  </n-space>
</template>
<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { getHighOrderVolumeCities } from '@/api/reports';
  import DailyPerformanceSummary from '@/components/Graphs/PerformanceOverviewDashboard/DailyPerformanceSummary.vue';

  const highOrderCities = ref();

  onMounted(() => {
    getHighOrderVolumeCities()
      .then(({ result }) => {
        if (result) {
          highOrderCities.value = result;
        }
      })
      .catch((response) => {
        window['$message'].error(response.message);
      });
  });
</script>
