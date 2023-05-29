<template>
  <n-card>
    <n-space :vertical="true">
      <n-space style="display: flex; justify-content: space-between">
        <n-h2
          style="
            font-weight: bold;
            color: rgb(38, 63, 151);
            margin-top: 10px;
            letter-spacing: 0.2px;
          "
          >General Information</n-h2
        >
        <img src="https://d10srchmli830n.cloudfront.net/1624876084978_shopify.svg" />
      </n-space>
      <n-grid v-if="isChannelConnected" :x-gap="6" cols="2 l:2" responsive="screen">
        <n-grid-item :span="2">
          <n-card style="border-radius: 12px; background: rgb(235, 237, 247); padding: 12px">
            <n-space :vertical="true">
              <p style="font-size: 18px; font-weight: 600; color: rgb(38, 63, 151)"
                >Shop name - {{ formValue.store_name }}</p
              >
              <p style="font-size: 18px; font-weight: 600; color: rgb(38, 63, 151)"
                >Shop token - {{ shopMetaDataParameters.shopifyToken.value }}
              </p>
            </n-space>
          </n-card>
        </n-grid-item>
      </n-grid>
      <n-grid v-else :x-gap="6" cols="2 l:2" responsive="screen">
        <n-grid-item :span="1">
          <n-steps :vertical="true" :current="currentRef" status="process">
            <n-step>
              <n-form
                label-width="auto"
                ref="formRef"
                style="margin-left: 20px"
                :model="formValue"
                :rules="rules"
                label-placement="top"
                size="medium"
              >
                <n-space :vertical="true">
                  <n-space style="margin-left: 10px">
                    <n-space :vertical="true">
                      <p
                        style="
                          font-weight: bold;
                          color: rgb(38, 63, 151);
                          letter-spacing: 0.2px;
                          margin-top: -11px;
                          font-size: 16px;
                        "
                      >
                        Shopify App Installation
                      </p>
                      <p style="color: rgb(75, 97, 173); letter-spacing: 0.2px; font-size: 13px">
                        Please follow the steps to integrate Shopify
                      </p>
                    </n-space>
                  </n-space>
                  <n-button
                    :round="true"
                    type="info"
                    :disabled="shopifyAppStoreButtonDisable"
                    @click="openShopifyWeShipAppBtn"
                    style="
                      font-weight: bold;
                      font-size: 14px;
                      text-align: center;
                      margin-top: 0px;
                      padding-top: 1px;
                      letter-spacing: 0.2px;
                    "
                  >
                    Proceed
                  </n-button>
                </n-space>
              </n-form>
            </n-step>
            <n-step>
              <n-space :vertical="true" style="margin-left: 30px">
                <n-space>
                  <p
                    style="
                      font-weight: bold;
                      color: rgb(38, 63, 151);
                      letter-spacing: 0.2px;
                      margin-top: -11px;
                      font-size: 16px;
                    "
                  >
                    Weship Auth Token:
                  </p>
                  <p
                    style="
                      font-weight: bold;
                      color: rgb(38, 63, 151);
                      letter-spacing: 0.2px;
                      margin-top: -6px;
                      font-size: 13px;
                    "
                  >
                    {{ tokenInfo?.token?.token }}
                  </p>
                  <input id="myInput" :value="tokenInfo?.token?.token" hidden />
                  <n-tooltip trigger="hover">
                    <template #trigger>
                      <n-icon
                        size="20"
                        color="#263F97FF"
                        style="margin-top: -21px; cursor: pointer"
                        @click="WeShipAuthTokenCopied"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M15 20H5V7c0-.55-.45-1-1-1s-1 .45-1 1v13c0 1.1.9 2 2 2h10c.55 0 1-.45 1-1s-.45-1-1-1zm5-4V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h9c1.1 0 2-.9 2-2zm-2 0H9V4h9v12z"
                            fill="currentColor"
                          />
                        </svg>
                      </n-icon>
                      <!--                      <n-button> Duck </n-button>-->
                    </template>
                    Copy
                  </n-tooltip>
                </n-space>
              </n-space>
            </n-step>
            <n-step>
              <n-space :vertical="true">
                <p
                  style="
                    margin-left: 30px;
                    font-weight: bold;
                    color: rgb(38, 63, 151);
                    letter-spacing: 0.2px;
                    margin-top: -11px;
                    font-size: 16px;
                  "
                >
                  Once Weship App is configured on Shopify account, click on connect with shopify
                  button below.
                </p>
                <n-button
                  :round="true"
                  type="info"
                  :disabled="currentRef === 2 || currentRef === 1 || currentRef === 4"
                  @click="connectWithShopify"
                  style="
                    margin-left: 20px;
                    font-weight: bold;
                    font-size: 14px;
                    text-align: center;
                    margin-top: 0px;
                    padding-top: 1px;
                    letter-spacing: 0.2px;
                  "
                >
                  CONNECT WITH SHOPIFY
                </n-button>
              </n-space>
            </n-step>
          </n-steps>
        </n-grid-item>
        <n-grid-item :span="1">
          <n-card style="background-color: rgb(235, 237, 247); border-radius: 12px; padding: 20px">
            <n-space :vertical="true">
              <n-space>
                <img src="https://d10srchmli830n.cloudfront.net/1619675129703_arrow.svg" />
                <p
                  style="
                    font-weight: bold;
                    color: rgb(38, 63, 151);
                    letter-spacing: 0.2px;
                    margin-top: 10px;
                    font-size: 18px;
                  "
                >
                  Steps to Integrate Shopify
                </p>
              </n-space>
              <div style="display: flex; flex-direction: row; margin-top: 10px">
                <p
                  style="
                    border-radius: 50%;
                    background-color: white;
                    font-weight: bold;
                    margin: 4px 20px 4px 40px;
                    padding: 6px 12px;
                    height: 30px;
                    color: rgb(38, 63, 151);
                  "
                  >1</p
                >
                <p
                  style="
                    font-size: 16px;
                    color: rgb(38, 63, 151);
                    padding-left: 8px;
                    padding-bottom: 8px;
                  "
                >
                  Open
                  <a href="https://apps.shopify.com/search?q=weship" target="_blank"
                    >Shopify App Store</a
                  >, Search for "Weship" and install the app.
                </p>
              </div>
              <div style="display: flex; flex-direction: row">
                <p
                  style="
                    border-radius: 50%;
                    background-color: white;
                    font-weight: bold;
                    margin: 4px 20px 4px 40px;
                    padding: 6px 12px;
                    color: rgb(38, 63, 151);
                    height: 30px;
                  "
                  >2</p
                >
                <p
                  style="
                    font-size: 16px;
                    color: rgb(38, 63, 151);
                    padding-left: 8px;
                    padding-bottom: 8px;
                  "
                >
                  After successful installation of Weship app, update Weship auth token from Weship
                  admin panel (step 2) into shopify app for necessary approval.
                </p>
              </div>
              <div style="display: flex; flex-direction: row">
                <p
                  style="
                    border-radius: 50%;
                    background-color: white;
                    font-weight: bold;
                    margin: 4px 20px 4px 40px;
                    padding: 6px 12px;
                    color: rgb(38, 63, 151);
                    height: 30px;
                  "
                  >3</p
                >
                <p
                  style="
                    font-size: 16px;
                    color: rgb(38, 63, 151);
                    padding-left: 8px;
                    padding-bottom: 8px;
                  "
                  >Once Weship app is configured on Shopify, come back to Weship and click on
                  Connect with Shopify button. System will automatically fetch authentication token
                  from Shopify.
                </p>
              </div>
              <div style="display: flex; flex-direction: row">
                <p
                  style="
                    border-radius: 50%;
                    background-color: white;
                    font-weight: bold;
                    margin: 4px 20px 4px 40px;
                    padding: 6px 12px;
                    color: rgb(38, 63, 151);
                    height: 30px;
                  "
                  >4</p
                >
                <p
                  style="
                    font-size: 16px;
                    color: rgb(38, 63, 151);
                    padding-left: 8px;
                    padding-bottom: 8px;
                  "
                  >Move further and configure the order status (s) below that you want to pull in
                  Weship.
                </p>
              </div>
            </n-space>
          </n-card>
        </n-grid-item>
      </n-grid>
      <n-divider />
      <n-grid :x-gap="6" cols="5 l:5" responsive="screen" style="margin-bottom: 25px">
        <n-grid-item :span="1" style="display: flex; justify-content: center">
          <n-space :vertical="true">
            <p
              style="
                font-weight: bold;
                color: rgb(38, 63, 151);
                letter-spacing: 0.2px;
                margin-bottom: 10px;
                font-size: 16px;
              "
            >
              Auto Order Place
            </p>
            <n-switch
              v-model:value="formValue.auto_place_order"
              size="large"
              :value="false"
              style="display: flex; justify-content: center"
            />
          </n-space>
        </n-grid-item>
        <n-grid-item :span="1" style="display: flex; justify-content: center">
          <n-space :vertical="true">
            <p
              style="
                font-weight: bold;
                color: rgb(38, 63, 151);
                letter-spacing: 0.2px;
                margin-bottom: 10px;
                font-size: 16px;
              "
            >
              COD Status Update
            </p>
            <n-switch
              v-model:value="formValue.cod_status_update_required"
              size="large"
              :value="false"
              style="display: flex; justify-content: center"
            />
          </n-space>
        </n-grid-item>
        <n-grid-item :span="1" style="display: flex; justify-content: center">
          <n-space :vertical="true">
            <p
              style="
                font-weight: bold;
                color: rgb(38, 63, 151);
                letter-spacing: 0.2px;
                margin-bottom: 10px;
                font-size: 16px;
              "
            >
              Comment Update
            </p>
            <n-switch
              v-model:value="formValue.comment_update_required"
              size="large"
              :value="false"
              style="display: flex; justify-content: center"
            />
          </n-space>
        </n-grid-item>
        <n-grid-item :span="1" style="display: flex; justify-content: center">
          <n-space :vertical="true">
            <p
              style="
                font-weight: bold;
                color: rgb(38, 63, 151);
                letter-spacing: 0.2px;
                margin-bottom: 10px;
                font-size: 16px;
              "
            >
              Multiple Location
            </p>
            <n-switch
              v-model:value="formValue.multi_location_enabled"
              size="large"
              :value="false"
              style="display: flex; justify-content: center"
            />
          </n-space>
        </n-grid-item>
        <n-grid-item :span="1" style="display: flex; justify-content: center">
          <n-space :vertical="true">
            <p
              style="
                font-weight: bold;
                color: rgb(38, 63, 151);
                letter-spacing: 0.2px;
                margin-bottom: 10px;
                font-size: 16px;
              "
            >
              Update Tracking
            </p>
            <n-switch
              v-model:value="formValue.update_tracking_id"
              size="large"
              :value="false"
              style="display: flex; justify-content: center"
            />
          </n-space>
        </n-grid-item>
      </n-grid>
      <n-grid :x-gap="6" cols="2 l:2" responsive="screen">
        <n-grid-item :span="1">
          <n-form
            label-width="auto"
            style="margin-left: 20px"
            :model="formValue"
            label-placement="top"
            size="medium"
          >
            <p
              style="
                font-weight: bold;
                color: rgb(38, 63, 151);
                letter-spacing: 0.2px;
                margin-bottom: 10px;
                font-size: 16px;
              "
            >
              {{ metaDataParameters.orderPullStatus.label }}
            </p>

            <n-form-item :show-label="false" style="margin-bottom: 0px">
              <n-input
                v-model:value="metaDataParameters.orderPullStatus.value"
                placeholder="Enter the initial status of shopify Orders on to sync in WeShip"
              />
            </n-form-item>

            <p
              style="
                font-weight: bold;
                color: rgb(38, 63, 151);
                letter-spacing: 0.2px;
                font-size: 16px;
                margin-top: 20px;
              "
            >
              Tracking Status Mapping
            </p>
            <p
              style="
                color: rgb(38, 63, 151);
                letter-spacing: 0.2px;
                margin-bottom: 10px;
                font-size: 14px;
              "
            >
              Update shopify status codes against provided WeShip Tracking Statuses
            </p>
            <p
              style="
                font-weight: bold;
                color: rgb(38, 63, 151);
                letter-spacing: 0.2px;
                margin-top: 20px;
                margin-bottom: 10px;
                font-size: 16px;
              "
            >
              {{ metaDataParameters.orderPlaced.label }}
            </p>
            <n-form-item path="order_placed" :show-label="false" style="margin-bottom: 0px">
              <n-input
                v-model:value="metaDataParameters.orderPlaced.value"
                placeholder="Enter the exact status on shopify when order is placed in Weship"
              />
            </n-form-item>
            <p
              style="
                font-weight: bold;
                color: rgb(38, 63, 151);
                letter-spacing: 0.2px;
                margin-top: 20px;
                margin-bottom: 10px;
                font-size: 16px;
              "
            >
              {{ metaDataParameters.inTransit.label }}
            </p>
            <n-form-item path="in_transit" :show-label="false" style="margin-bottom: 0px">
              <n-input
                v-model:value="metaDataParameters.inTransit.value"
                placeholder="Enter the exact status on shopify when order is in transit to customers"
              />
            </n-form-item>
            <p
              style="
                font-weight: bold;
                color: rgb(38, 63, 151);
                letter-spacing: 0.2px;
                margin-top: 20px;
                margin-bottom: 10px;
                font-size: 16px;
              "
            >
              {{ metaDataParameters.rtd.label }}
            </p>
            <n-form-item path="rtd" :show-label="false" style="margin-bottom: 0px">
              <n-input
                v-model:value="metaDataParameters.rtd.value"
                placeholder="Enter the exact status on shopify when order is RTD to end customer"
              />
            </n-form-item>
            <p
              style="
                font-weight: bold;
                color: rgb(38, 63, 151);
                letter-spacing: 0.2px;
                margin-top: 20px;
                margin-bottom: 10px;
                font-size: 16px;
              "
            >
              {{ metaDataParameters.rto.label }}
            </p>
            <n-form-item path="rto" :show-label="false" style="margin-bottom: 0px">
              <n-input
                v-model:value="metaDataParameters.rto.value"
                placeholder="Enter the exact status on shopify when order is RTO to end customer"
              />
            </n-form-item>
          </n-form>
        </n-grid-item>
        <n-grid-item :span="1">
          <n-form
            label-width="auto"
            style="margin-left: 20px"
            :model="formValue"
            label-placement="top"
            size="medium"
          >
            <p
              style="
                font-weight: bold;
                color: rgb(38, 63, 151);
                letter-spacing: 0.2px;
                margin-bottom: 10px;
                font-size: 16px;
              "
            >
              {{ metaDataParameters.pickedUp.label }}
            </p>
            <n-form-item path="picked_up" :show-label="false" style="margin-bottom: 0px">
              <n-input
                v-model:value="metaDataParameters.pickedUp.value"
                placeholder="Enter the exact status on shopify when order is picked to end customer"
              />
            </n-form-item>
            <p
              style="
                font-weight: bold;
                color: rgb(38, 63, 151);
                letter-spacing: 0.2px;
                margin-bottom: 4px;
                font-size: 16px;
              "
            >
              {{ metaDataParameters.delivered.label }}
            </p>
            <n-form-item path="delivered" :show-label="false" style="margin-bottom: 0px">
              <n-input
                v-model:value="metaDataParameters.delivered.value"
                placeholder="Enter the exact status on shopify when order is delivered to end customer"
              />
            </n-form-item>
            <p
              style="
                font-weight: bold;
                color: rgb(38, 63, 151);
                letter-spacing: 0.2px;
                margin-bottom: 10px;
                font-size: 16px;
              "
            >
              {{ metaDataParameters.cancelled.label }}
            </p>
            <n-form-item path="delivered" :show-label="false" style="margin-bottom: 0px">
              <n-input
                v-model:value="metaDataParameters.cancelled.value"
                placeholder="Enter the exact status on shopify when order is cancelled to end customer"
              />
            </n-form-item>
          </n-form>
        </n-grid-item>
      </n-grid>
      <n-space style="display: flex; justify-content: space-between">
        <span></span>
        <n-button
          :round="true"
          @click="saveData"
          type="info"
          style="
            font-weight: bold;
            font-size: 14px;
            text-align: center;
            margin-top: 0;
            padding-top: 1px;
            letter-spacing: 0.2px;
          "
        >
          SAVE
        </n-button>
      </n-space>
    </n-space>
  </n-card>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useUserStore } from '@/store/modules/user';
  import {
    createNewMerchantChannelMapping,
    updateMerchantChannelMappingDetailById,
  } from '@/api/channels/mapping';
  import { useRoute } from 'vue-router';
  import { FormInst, FormItemRule } from 'naive-ui';
  import {
    connectWithShopifyAPI,
    getShopifyLocations,
    getApiToken,
  } from '@/api/channels/shopify';
  import router from '@/router';

  const formRef = ref<FormInst | null>(null);
  const route = useRoute();
  const shopifyAppStoreButtonDisable = ref(false);
  const currentRef = ref(1);
  const formValue: any = ref({
    channel_id: route.query.id,
    store_name: null,
    auto_place_order: false,
    cod_status_update_required: false,
    comment_update_required: false,
    country_code: null,
    email_id: null,
    multi_location_enabled: false,
    order_pull_status: null,
    weship_account: null,
    weship_secret_id: null,
    update_tracking_id: false,
    website_url: null,
    is_active: true,
  });
  let domainOnly;
  const metaDataParameters: any = ref({
    orderPullStatus: { label: 'Order Pull Status', value: '' },
    orderPlaced: { label: 'Order Placed', value: '' },
    inTransit: { label: 'In Transit', value: '' },
    rtd: { label: 'RTD', value: '' },
    rto: { label: 'RTO', value: '' },
    pickedUp: { label: 'Picked Up', value: '' },
    cancelled: { label: 'Cancelled', value: '' },
    delivered: { label: 'Delivered', value: '' },
  });
  const shopMetaDataParameters: any = ref({
    authToken: { label: 'Auth Token', value: '' },
    shopDomain: { label: 'Shop Domain', value: '' },
    shopName: { label: 'Shop Name', value: '' },
    shopifyToken: { label: 'Shopify Token', value: '' },
    emailIds: { label: 'Email Ids', value: '' },
    SHOPIFY_API_KEY: { label: 'Shopify API Key', value: '' },
  });
  const userStore = useUserStore();
  const isChannelConnected = ref(false);
  const tokenInfo = ref({
    token_id: '',
    token: {
      token: '',
    },
  });

  getApiToken({name:'shopify'}).then(({ result }) => {
    tokenInfo.value = result;
  });

  const rules = {
    website_url: {
      required: true,
      trigger: ['blur', 'input'],
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('Shopify Website admin url is required');
        } else if (
          !/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(
            value
          )
        ) {
          return new Error('Invalid URL');
        }
        return true;
      },
    },
  };

  // function removeHttp(url) {
  //   var a = document.createElement('a');
  //   a.setAttribute('href', url);
  //   return a.hostname;
  // }

  function openShopifyWeShipAppBtn() {
    if (currentRef.value === 1) {
      currentRef.value = 2;
      shopifyAppStoreButtonDisable.value = true;
    }
  }
  function WeShipAuthTokenCopied() {
    if (currentRef.value === 2) {
      copyAuthToken();
      window['$message'].success('Copied!');
      currentRef.value = 3;
    }
  }
  function copyAuthToken() {
    // Get the text field
    let copyText: any = document.getElementById('myInput');
    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);
  }
  function connectWithShopify() {
    if (currentRef.value === 3) {
      const Data = {
        channel_id: route.query.id,
        store_name: domainOnly,
        auto_place_order: formValue.value.auto_place_order,
        cod_status_update_required: formValue.value.cod_status_update_required,
        comment_update_required: formValue.value.comment_update_required,
        country_code: null,
        email_id: null,
        multi_location_enabled: formValue.value.multi_location_enabled,
        order_pull_status: null,
        weship_account: null,
        weship_secret_id: userStore.getToken,
        update_tracking_id: formValue.value.update_tracking_id,
        website_url: formValue.value.website_url,
        is_active: true,
      };

      const Loading = window['$loading'] || null;
      Loading.start();
      createNewMerchantChannelMapping(Data)
        .then(({ result }) => {
          formValue.value = result.data;
          // connect shopify
          connectWithShopifyAPI({
            shop: tokenInfo.value.token.token,
            token_id: tokenInfo.value.token_id,
            merchantChannelMappingId: formValue.value.id,
          })
            .then(({ result }) => {
              getShopifyLocations(formValue.value.id)
                .then(({ result }) => {
                  currentRef.value = 4;
                  window['$message'].success(result.message);
                  // window['$message'].success(locationResult.message);
                  Loading.finish();
                  router.push({
                    name: 'UpdateChannel',
                    params: { channel: formValue.value.id },
                  });
                })
                .catch(() => {
                  currentRef.value = 3;
                  Loading.finish();
                });
              window['$message'].success(result.message);
            })
            .catch(() => {
              currentRef.value = 3;
              Loading.finish();
            });
        })
        .catch(() => {
          currentRef.value = 3;
          Loading.finish();
        });
    }
  }

  function saveData() {
    if (isChannelConnected.value) {
      let meta_data_parameters: any[] = [];
      for (const key in metaDataParameters.value) {
        meta_data_parameters.push({
          key,
          value: metaDataParameters.value[key].value,
          id: metaDataParameters.value[key].id,
          is_active: true,
        });
      }
      const Data = {
        channel_id: route.query.id,
        store_name: domainOnly,
        auto_place_order: formValue.value.auto_place_order,
        cod_status_update_required: formValue.value.cod_status_update_required,
        comment_update_required: formValue.value.comment_update_required,
        country_code: null,
        email_id: null,
        multi_location_enabled: formValue.value.multi_location_enabled,
        order_pull_status: null,
        weship_account: null,
        weship_secret_id: userStore.getToken,
        update_tracking_id: formValue.value.update_tracking_id,
        website_url: formValue.value.website_url,
        is_active: true,
        meta_data_parameters,
      };
      // console.log(Data);
      const Loading = window['$loading'] || null;
      Loading.start();
      updateMerchantChannelMappingDetailById(formValue.value.id, Data)
        .then(({ result }) => {
          window['$message'].success(result.message);
          Loading.finish();
          router.push({
            name: 'ChannelsList',
          });
        })
        .catch(({ result }) => {
          window['$message'].error(result.message);
          Loading.finish();
        });
    } else {
      window['$message'].error('Please Connect with Shopify first');
    }
  }
</script>
<style scoped></style>
