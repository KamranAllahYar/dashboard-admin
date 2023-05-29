<template>
  <n-space :vertical="true">
    <n-card style="border-radius: 10px">
      <n-space :vertical="true">
        <n-grid x-gap="24" :cols="4">
          <n-gi :span="1">
            <n-card
              v-if="checkedValue === 'cheapest_courier'"
              @click="handleChange('cheapest_courier')"
              style="
                cursor: pointer;
                border-width: 2px;
                border-color: rgb(255, 117, 108);
                border-radius: 10px;
              "
            >
              <n-space>
                <span
                  style="
                    height: 16px;
                    width: 16px;
                    border-width: 2px;
                    margin-top: 3px;
                    border-color: rgb(255, 117, 108);
                    border-radius: 50%;
                    display: inline-block;
                  "
                >
                  <span
                    style="
                      height: 6px;
                      width: 6px;
                      background-color: rgb(255, 117, 108);
                      border-radius: 50%;
                      display: flex;
                      margin-top: 3px;
                      margin-left: 3px;
                      justify-content: center;
                    "
                  ></span>
                </span>
                <img
                  src="https://d10srchmli830n.cloudfront.net/1622023389926_save-money.svg"
                  style="height: 22px"
                />
                <p style="color: rgb(255, 117, 108); font-weight: bold">Cheapest Courier</p>
              </n-space>
            </n-card>
            <n-card
              v-else
              @click="handleChange('cheapest_courier')"
              style="
                cursor: pointer;
                border-width: 2px;
                border-color: rgb(144, 157, 202);
                border-radius: 10px;
              "
            >
              <n-space>
                <span
                  style="
                    height: 16px;
                    width: 16px;
                    border-width: 2px;
                    margin-top: 3px;
                    border-color: rgb(144, 157, 202);
                    border-radius: 50%;
                    display: inline-block;
                  "
                >
                </span>
                <img
                  src="https://d10srchmli830n.cloudfront.net/1622024627244_blue-save-money.svg"
                  style="height: 22px"
                />
                <p style="color: rgb(144, 157, 202); font-weight: bold">Cheapest Courier</p>
              </n-space>
            </n-card>
          </n-gi>
          <n-gi :span="1">
            <n-card
              v-if="checkedValue === 'fastest_courier'"
              @click="handleChange('fastest_courier')"
              style="
                cursor: pointer;
                border-width: 2px;
                border-color: rgb(255, 117, 108);
                border-radius: 10px;
              "
            >
              <n-space>
                <span
                  style="
                    height: 16px;
                    width: 16px;
                    margin-top: 3px;
                    border-width: 2px;
                    border-color: rgb(255, 117, 108);
                    border-radius: 50%;
                    display: inline-block;
                  "
                >
                  <span
                    style="
                      height: 6px;
                      width: 6px;
                      background-color: rgb(255, 117, 108);
                      border-radius: 50%;
                      display: flex;
                      margin-top: 3px;
                      margin-left: 3px;
                      justify-content: center;
                    "
                  ></span>
                </span>
                <img
                  src="https://d10srchmli830n.cloudfront.net/1622025028853_peach-fastest.svg"
                  style="height: 22px"
                />
                <p style="color: rgb(255, 117, 108); font-weight: bold">Fastest Courier</p>
              </n-space>
            </n-card>
            <n-card
              v-else
              @click="handleChange('fastest_courier')"
              style="
                cursor: pointer;
                border-width: 2px;
                border-color: rgb(144, 157, 202);
                border-radius: 10px;
              "
            >
              <n-space>
                <span
                  style="
                    height: 16px;
                    width: 16px;
                    border-width: 2px;
                    margin-top: 3px;
                    border-color: rgb(144, 157, 202);
                    border-radius: 50%;
                    display: inline-block;
                  "
                >
                </span>
                <img
                  src="https://d10srchmli830n.cloudfront.net/1622023484151_Group.svg"
                  style="height: 22px"
                />
                <p style="color: rgb(144, 157, 202); font-weight: bold">Fastest Courier</p>
              </n-space>
            </n-card>
          </n-gi>
          <n-gi :span="1">
            <n-card
              v-if="checkedValue === 'weship_recommended'"
              @click="handleChange('weship_recommended')"
              style="
                cursor: pointer;
                border-width: 2px;
                border-color: rgb(255, 117, 108);
                border-radius: 10px;
              "
            >
              <n-space>
                <span
                  style="
                    height: 16px;
                    width: 16px;
                    margin-top: 3px;
                    border-width: 2px;
                    border-color: rgb(255, 117, 108);
                    border-radius: 50%;
                    display: inline-block;
                  "
                >
                  <span
                    style="
                      height: 6px;
                      width: 6px;
                      background-color: rgb(255, 117, 108);
                      border-radius: 50%;
                      display: flex;
                      margin-top: 3px;
                      margin-left: 3px;
                      justify-content: center;
                    "
                  ></span>
                </span>
                <img
                  src="https://d10srchmli830n.cloudfront.net/1622025084925_peach-browser.svg"
                  style="height: 22px"
                />
                <p style="color: rgb(255, 117, 108); font-weight: bold">WeShip Recommended</p>
              </n-space>
            </n-card>
            <n-card
              v-else
              @click="handleChange('weship_recommended')"
              style="
                cursor: pointer;
                border-width: 2px;
                border-color: rgb(144, 157, 202);
                border-radius: 10px;
              "
            >
              <n-space>
                <span
                  style="
                    height: 16px;
                    width: 16px;
                    border-width: 2px;
                    margin-top: 3px;
                    border-color: rgb(144, 157, 202);
                    border-radius: 50%;
                    display: inline-block;
                  "
                >
                </span>
                <img
                  src="https://d10srchmli830n.cloudfront.net/1622023515794_browser.svg"
                  style="height: 22px"
                />
                <p style="color: rgb(144, 157, 202); font-weight: bold"> WeShip Recommended</p>
              </n-space>
            </n-card>
          </n-gi>
          <!--          <n-gi :span="1">-->
          <!--            <n-card-->
          <!--              v-if="checkedValue === 'custom_rule'"-->
          <!--              @click="handleChange('custom_rule')"-->
          <!--              style="-->
          <!--                cursor: pointer;-->
          <!--                border-width: 2px;-->
          <!--                border-color: rgb(255, 117, 108);-->
          <!--                border-radius: 10px;-->
          <!--              "-->
          <!--            >-->
          <!--              <n-space>-->
          <!--                <span-->
          <!--                  style="-->
          <!--                    height: 16px;-->
          <!--                    width: 16px;-->
          <!--                    margin-top: 3px;-->
          <!--                    border-width: 2px;-->
          <!--                    border-color: rgb(255, 117, 108);-->
          <!--                    border-radius: 50%;-->
          <!--                    display: inline-block;-->
          <!--                  "-->
          <!--                >-->
          <!--                  <span-->
          <!--                    style="-->
          <!--                      height: 6px;-->
          <!--                      width: 6px;-->
          <!--                      background-color: rgb(255, 117, 108);-->
          <!--                      border-radius: 50%;-->
          <!--                      display: flex;-->
          <!--                      margin-top: 3px;-->
          <!--                      margin-left: 3px;-->
          <!--                      justify-content: center;-->
          <!--                    "-->
          <!--                  ></span>-->
          <!--                </span>-->
          <!--                <img-->
          <!--                  src="https://d10srchmli830n.cloudfront.net/1622025084925_peach-browser.svg"-->
          <!--                  style="height: 22px"-->
          <!--                />-->
          <!--                <p style="color: rgb(255, 117, 108); font-weight: bold">Custom Role</p>-->
          <!--              </n-space>-->
          <!--            </n-card>-->
          <!--            <n-card-->
          <!--              v-else-->
          <!--              @click="handleChange('custom_rule')"-->
          <!--              style="-->
          <!--                cursor: pointer;-->
          <!--                border-width: 2px;-->
          <!--                border-color: rgb(144, 157, 202);-->
          <!--                border-radius: 10px;-->
          <!--              "-->
          <!--            >-->
          <!--              <n-space>-->
          <!--                <span-->
          <!--                  style="-->
          <!--                    height: 16px;-->
          <!--                    width: 16px;-->
          <!--                    border-width: 2px;-->
          <!--                    margin-top: 3px;-->
          <!--                    border-color: rgb(144, 157, 202);-->
          <!--                    border-radius: 50%;-->
          <!--                    display: inline-block;-->
          <!--                  "-->
          <!--                >-->
          <!--                </span>-->
          <!--                <img-->
          <!--                  src="https://d10srchmli830n.cloudfront.net/1622023515794_browser.svg"-->
          <!--                  style="height: 22px"-->
          <!--                />-->
          <!--                <p style="color: rgb(144, 157, 202); font-weight: bold"> Custom Rule</p>-->
          <!--              </n-space>-->
          <!--            </n-card>-->
          <!--          </n-gi>-->
        </n-grid>
        <p
          style="
            font-weight: 600;
            margin-top: 10px;
            font-size: 14px;
            line-height: 140%;
            color: rgb(38, 63, 151);
          "
          >{{ textWords }}</p
        >
        <n-button
          type="info"
          style="border-radius: 12px; font-weight: bold; letter-spacing: 0.2px"
          @click="setPriority"
        >
          <template #icon>
            <n-icon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 24 24"
              >
                <path
                  d="M17 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm2 16H5V5h11.17L19 7.83V19zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3s3-1.34 3-3s-1.34-3-3-3zM6 6h9v4H6z"
                  fill="currentColor"
                />
              </svg>
            </n-icon>
          </template>
          SELECT
        </n-button>
      </n-space>
    </n-card>

    <n-card
      v-if="checkedValue === 'cheapest_courier'"
      style="border-radius: 10px; min-height: 350px"
    >
      <div style="display: flex; justify-content: center; flex-direction: column">
        <img
          style="height: 220px"
          src="https://d10srchmli830n.cloudfront.net/1622027532750_Investment%20data-rafiki%201.svg"
        />
        <p
          style="
            font-weight: 600;
            font-size: 14px;
            line-height: 140%;
            color: rgb(38, 63, 151);
            text-align: center;
          "
          >Cheapest courier selected. We will automatically select the cheapest courier to service
          the order.</p
        >
      </div>
    </n-card>
    <n-card
      v-else-if="checkedValue === 'fastest_courier'"
      style="border-radius: 10px; min-height: 350px"
    >
      <div style="display: flex; justify-content: center; flex-direction: column">
        <img
          style="height: 220px"
          src="https://d10srchmli830n.cloudfront.net/1622031735135_Frame.svg"
        />
        <p
          style="
            font-weight: 600;
            font-size: 14px;
            line-height: 140%;
            color: rgb(38, 63, 151);
            text-align: center;
          "
          >Fastest courier selected. For your pin codes, we will automatically select the courier
          with the fastest delivery.</p
        >
      </div>
    </n-card>
  </n-space>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import {
    createUserCompanyProfileMetaData,
    getUserCompanyProfileMetaData,
  } from '@/api/settings/companyprofile';
  import { useMessage } from 'naive-ui';
  const checkedValue = ref('cheapest_courier');
  const textWords = ref(
    'Select the cheapest courier for your selected service type for all orders'
  );
  const formValue: any = ref({
    priority: {
      value: null,
      is_active: true,
    },
  });
  const message = useMessage();
  const Loading = window['$loading'] || null;
  getUserCompanyProfileMetaData('courier_priority')
    .then(({ result }) => {
      for (const key in result) {
        checkedValue.value = result[key].value;
        formValue.value[key].value = result[key].value ? result[key].value : null;
        formValue.value[key].is_active = result[key].is_active == 1;
        formValue.value[key].id = result[key].id;
      }
      Loading.finish();
    })
    .catch(({ result }) => {
      message.error(result.message);
      Loading.finish();
    });

  function handleChange(e) {
    if (e === 'cheapest_courier') {
      textWords.value = 'Select the cheapest courier for your selected service type for all orders';
    } else if (e === 'fastest_courier') {
      textWords.value = 'Select the courier with fastest delivery for your order.';
    } else if (e === 'weship_recommended') {
      textWords.value = 'Weship will automatically assign top rated courier';
    } else if (e === 'custom_rule') {
      textWords.value = 'Create your own rules for courier selection';
    }
    checkedValue.value = e;
  }
  function setPriority() {
    let data: any = [];
    for (const key in formValue.value) {
      data.push({
        key,
        value: checkedValue.value,
        id: formValue.value[key].id,
        is_active: formValue.value[key].is_active,
      });
    }
    createUserCompanyProfileMetaData('courier_priority', data).then(({ result }) => {
      window['$message'].success(result.message);
    });
  }
</script>
