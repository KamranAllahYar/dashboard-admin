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
      </n-space>
      <n-grid :x-gap="6" cols="2 l:2" responsive="screen">
        <n-grid-item :span="2">
          <n-card style="border-radius: 12px; background: rgb(235, 237, 247); padding: 12px">
            <n-space justify="space-between">
              <n-space :vertical="true">
                <p style="font-size: 18px; font-weight: 600; color: rgb(38, 63, 151)"
                  >Shop name - {{ formValue.store_name }}</p
                >

                <p
                  v-if="formValue.channel.channel_name === 'shopify'"
                  style="font-size: 18px; font-weight: 600; color: rgb(38, 63, 151)"
                  >Shop token - {{ metaDataParameters.shopifyToken.value }}</p
                >
                <p
                  v-else
                  style="font-size: 18px; font-weight: 600; color: rgb(38, 63, 151)"
                  >Shop token - {{ formValue.weship_secret_id }}</p
                >
              </n-space>
              <img :src="formValue.channel.channel_logo_url" style="width: 80px" />
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
              :checked-value="1"
              :unchecked-value="0"
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
              :checked-value="1"
              :unchecked-value="0"
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
              :checked-value="1"
              :unchecked-value="0"
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
              :checked-value="1"
              :unchecked-value="0"
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
              :checked-value="1"
              :unchecked-value="0"
              size="large"
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
    getMerchantChannelMappingDetailsById,
    updateMerchantChannelMappingDetailById,
  } from '@/api/channels/mapping';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const formValue: any = ref({
    channel: {
      channel_logo_url: '',
    },
  });
  const metaDataParameters: any = ref({
    orderPullStatus: { label: 'Order Pull Status', value: '' },
    orderPlaced: { label: 'Order Placed', value: '' },
    inTransit: { label: 'In Transit', value: '' },
    rtd: { label: 'RTD', value: '' },
    rto: { label: 'RTO', value: '' },
    pickedUp: { label: 'Picked Up', value: '' },
    cancelled: { label: 'Cancelled', value: '' },
    delivered: { label: 'Delivered', value: '' },
    authToken: { label: 'Auth Token', value: '' },
    shopDomain: { label: 'Shop Domain', value: '' },
    shopifyToken: { label: 'Shopify Token', value: '' },
    emailIds: { label: 'Email Ids', value: '' },
    SHOPIFY_API_KEY: { label: 'Shopify API Key', value: '' },
  });
  const userStore = useUserStore();

  getMerchantChannelMappingDetailsById(route.params.channel).then(({ result }) => {
    formValue.value = result.data;
    for (const param of result.data.meta_data_parameters) {
      if (metaDataParameters.value[param.key]) {
        metaDataParameters.value[param.key].value = param.value;
        metaDataParameters.value[param.key].id = param.id;
      }
    }
  });

  // const rules = {
  //   website_url: {
  //     required: true,
  //     trigger: ['blur', 'input'],
  //     validator(rule: FormItemRule, value: string) {
  //       if (!value) {
  //         return new Error('Weship admin url is required');
  //       } else if (
  //         !/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(
  //           value
  //         )
  //       ) {
  //         return new Error('Invalid URL');
  //       }
  //       return true;
  //     },
  //   },
  // };

  function saveData() {
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
      store_name: formValue.value.store_name,
      auto_place_order: formValue.value.auto_place_order,
      cod_status_update_required: formValue.value.cod_status_update_required,
      comment_update_required: formValue.value.comment_update_required,
      country_code: '0000',
      email_id: 'sdfdf',
      multi_location_enabled: formValue.value.multi_location_enabled,
      order_pull_status: 'true',
      weship_account: null,
      weship_secret_id: userStore.getToken,
      update_tracking_id: formValue.value.update_tracking_id,
      website_url: formValue.value.website_url,
      is_active: true,
      meta_data_parameters,
    };
    const Loading = window['$loading'] || null;
    Loading.start();
    updateMerchantChannelMappingDetailById(formValue.value.id, Data)
      .then(({ result }) => {
        window['$message'].success(result.message);
        Loading.finish();
        window.location.reload();
      })
      .catch(({ result }) => {
        window['$message'].error(result.message);
        Loading.finish();
      });
  }
</script>
<style scoped></style>
