<template>
  <n-card>
    <div>
      <n-space>
        <n-progress
          style="width: 90px"
          type="dashboard"
          gap-position="bottom"
          :percentage="percentage"
        />
        <div style="height: 90px; display: flex; justify-content: center">
          <n-h3
            style="
              font-weight: bold;
              align-self: center;
              margin-left: 10px;
              margin-top: 20px;
              text-align: center;
            "
          >
            Start shipping today with 3 simple steps!
          </n-h3>
        </div>
      </n-space>

      <n-divider />
      <n-grid x-gap="12" :cols="3">
        <n-gi>
          <div>
            <n-space vertical>
              <n-h4 style="font-weight: bold; margin-left: 30px">KYC Verification</n-h4>
              <n-card
                style="background-color: rgb(237, 240, 249); border-radius: 10px"
                size="medium"
              >
                <n-space justify="space-between">
                  <n-space vertical>
                    <n-image
                      width="100"
                      height="100"
                      src="https://d10srchmli830n.cloudfront.net/1638367919432_kyc_card.svg"
                    />
                    <div> It only takes 30 secs to complete</div>
                    <span class="fzXWJx" @click="router.push({ name: 'CompanyDetails' })"
                      >Complete KYC</span
                    >
                  </n-space>
                  <img
                    v-if="kyc"
                    src="https://d10srchmli830n.cloudfront.net/1638367864209_completed_check.svg"
                  />
                  <img
                    v-else
                    src="https://d10srchmli830n.cloudfront.net/1638369105307_incomplete_profile.svg"
                  />
                </n-space>
              </n-card>
            </n-space>
          </div>
        </n-gi>
        <n-gi>
          <div>
            <n-space vertical>
              <n-h4 style="font-weight: bold; margin-left: 30px">Recharge your wallet</n-h4>
              <n-card
                style="background-color: rgb(237, 240, 249); border-radius: 10px"
                size="medium"
              >
                <n-space justify="space-between">
                  <n-space vertical>
                    <n-image
                      width="100"
                      height="100"
                      src="https://d10srchmli830n.cloudfront.net/1638367938465_recharge_card.svg"
                    />
                    <div> Add credits & start shipping today</div>
                    <span class="fzXWJx" @click="router.push({ name: 'Wallet' })"
                      >Recharge Now</span
                    >
                  </n-space>
                  <img
                    v-if="wallet"
                    src="https://d10srchmli830n.cloudfront.net/1638367864209_completed_check.svg"
                  />
                  <img
                    v-else
                    src="https://d10srchmli830n.cloudfront.net/1638369105307_incomplete_profile.svg"
                  />
                </n-space>
              </n-card>
            </n-space>
          </div>
        </n-gi>
        <n-gi>
          <div>
            <n-space vertical>
              <n-h4 style="font-weight: bold; margin-left: 30px">Place your first order</n-h4>
              <n-card
                style="background-color: rgb(237, 240, 249); border-radius: 10px"
                size="medium"
              >
                <n-space justify="space-between">
                  <n-space vertical>
                    <n-image
                      width="100"
                      height="100"
                      src="https://d10srchmli830n.cloudfront.net/1638368754226_place_order.svg"
                    />
                    <div> Create order with just 3 steps</div>
                    <span class="fzXWJx" @click="router.push({ name: 'ManualOrder' })"
                      >Create Manual Order</span
                    >
                  </n-space>
                  <img
                    v-if="ordersCount"
                    src="https://d10srchmli830n.cloudfront.net/1638367864209_completed_check.svg"
                  />
                  <img
                    v-else
                    src="https://d10srchmli830n.cloudfront.net/1638369105307_incomplete_profile.svg"
                  />
                </n-space>
              </n-card>
            </n-space>
          </div>
        </n-gi>
      </n-grid>
    </div>
  </n-card>
</template>

<script lang="ts" setup>
  import { getDashboardHome } from '@/api/dashboard';
  import { onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';
  // const message = useMessage();
  const loading = ref(false);
  const kyc = ref(false);
  const ordersCount = ref(false);
  const wallet = ref(false);
  const router = useRouter();
  const percentage = ref(0);
  onMounted(() => {
    loading.value = true;
    // message.loading('Please wait...');
    getDashboardHome().then(({ result }) => {
      if (result.kyc && result.kyc.value === '1') {
        kyc.value = true;
        percentage.value = percentage.value + 30;
      } else {
        kyc.value = false;
      }
      if (result.ordersCount > 0) {
        ordersCount.value = true;
        percentage.value = percentage.value + 30;
      } else {
        ordersCount.value = false;
      }
      if (+result.walletAmount > 0) {
        wallet.value = true;
        percentage.value = percentage.value + 40;
      } else {
        wallet.value = false;
      }
      loading.value = false;
      // getList();
    });
  });
</script>

<style lang="less" scoped>
  .fzXWJx {
    font-weight: bold;
    font-size: 17px;
    line-height: 152.25%;
    text-decoration-line: underline;
    margin-top: 50px;
    padding-top: 50px;
    color: #2b85e4;
    cursor: pointer;
  }
</style>
