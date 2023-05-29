<template>
  <n-space :vertical="true" :style="{ display: props.activeStep === 1 ? 'initial' : 'none' }">
    <n-card
      style="
        border-radius: 10px;
        margin-top: 10px;
        border-width: 1px;
        display: flex;
        justify-items: center;
      "
    >
      <div style="display: flex; justify-content: center">
        <n-steps :current="1" size="small">
          <n-step title="Order Details" />
          <n-step title="Add items & Quality check" />
          <n-step title="Review & Courier Partner" />
          <n-step title="Submit Order" />
        </n-steps>
      </div>
    </n-card>
    <n-grid :x-gap="12" :y-gap="8" cols="5 xs:2 s:2 m:2 l:5" responsive="screen">
      <n-grid-item span="3 xs:2 s:2 m:2 l:3">
        <n-card style="border-radius: 10px; margin-top: 20px; border-width: 1px">
          <div>
            <n-space :vertical="true">
              <n-h6 style="font-weight: bold; color: rgb(38, 63, 151)">Single Shipment</n-h6>
              <n-radio-group
                style="display: flex; justify-content: center"
                v-model:value="stepOne.order_place_type"
                :default-value="stepOne.order_place_type"
                name="shipment_type"
              >
                <n-radio-button
                  v-for="radioOption in radioOptions"
                  :key="radioOption.value"
                  :value="radioOption.value"
                  :label="radioOption.label"
                  >{{ radioOption.label }}
                </n-radio-button>
              </n-radio-group>
              <n-divider />
              <n-h6 style="font-weight: bold; color: rgb(38, 63, 151)">Enter Customer Details</n-h6>
              <n-form
                ref="formRef"
                :model="stepOne"
                :rules="rules"
                size="medium"
                label-placement="top"
              >
                <n-grid :span="24" :x-gap="24">
                  <n-form-item-gi :span="8" label="Name" path="name" :label-style="labelStyle">
                    <n-input v-model:value="stepOne.name" placeholder="Name" />
                  </n-form-item-gi>
                  <n-form-item-gi :span="8" label="Country Code" :label-style="labelStyle">
                    <n-select
                      v-model:value="stepOne.country_code"
                      :options="options"
                      :render-label="renderLabel"
                      label-field="dial_code"
                      value-field="dial_code"
                      :render-tag="renderTagLabel"
                    />
                    <!--                    <n-input v-model:value="stepOne.country_code" placeholder="Country Code" />-->
                  </n-form-item-gi>
                  <n-form-item-gi
                    :span="8"
                    label="Phone Number"
                    path="phone"
                    :label-style="labelStyle"
                  >
                    <n-input v-model:value="stepOne.phone" placeholder="eg. 3123456789" />
                  </n-form-item-gi>
                  <n-form-item-gi
                    :span="12"
                    label="Customer Email ID"
                    path="email"
                    :label-style="labelStyle"
                  >
                    <n-input v-model:value="stepOne.email" placeholder="eg. xxx@xxx.xxx" />
                  </n-form-item-gi>
                  <n-form-item-gi
                    :span="12"
                    label="Customer Zip Code"
                    path="zip_code"
                    :label-style="labelStyle"
                  >
                    <n-input v-model:value="stepOne.zip_code" placeholder="Customer Zip Code" />
                  </n-form-item-gi>
                  <n-form-item-gi :span="8" label="City" path="city" :label-style="labelStyle">
                    <weship-cities @citySelected="getCitySelected" />
                  </n-form-item-gi>

                  <n-form-item-gi :span="8" label="State" path="state" :label-style="labelStyle">
                    <n-input v-model:value="stepOne.state" placeholder="State" />
                  </n-form-item-gi>
                  <n-form-item-gi
                    :span="8"
                    label="Country"
                    path="country"
                    :label-style="labelStyle"
                  >
                    <n-input v-model:value="stepOne.country" placeholder="Country" />
                  </n-form-item-gi>
                  <n-form-item-gi
                    :span="24"
                    label="Customer Address"
                    path="address1"
                    :label-style="labelStyle"
                  >
                    <n-input
                      v-model:value="stepOne.address1"
                      placeholder="Customer Address"
                      type="textarea"
                      :autosize="{
                        minRows: 2,
                        maxRows: 3,
                      }"
                    />
                  </n-form-item-gi>
                </n-grid>
              </n-form>
              <n-divider />
              <n-h6 style="font-weight: bold; color: rgb(38, 63, 151)">Payment Method</n-h6>
              <n-radio-group
                :default-value="stepOne.payment_method"
                v-model:value="stepOne.payment_method"
                name="payment_method"
              >
                <n-space>
                  <n-radio
                    v-for="paymentMethodOption in paymentMethodOptions"
                    :key="paymentMethodOption.value"
                    :value="paymentMethodOption.value"
                    style="color: rgb(38, 63, 151)"
                    :label="paymentMethodOption.label"
                  />
                </n-space>
              </n-radio-group>
              <n-divider />
              <n-h6 style="font-weight: bold; color: rgb(38, 63, 151)">Shipment Type</n-h6>
              <n-radio-group
                :default-value="stepOne.order_type"
                v-model:value="stepOne.order_type"
                name="order_type"
              >
                <n-space>
                  <n-radio
                    v-for="shipmentTypeOption in shipmentTypeOptions"
                    :key="shipmentTypeOption.value"
                    :value="shipmentTypeOption.value"
                    style="color: rgb(38, 63, 151)"
                    :label="shipmentTypeOption.label"
                  />
                </n-space>
              </n-radio-group>
              <n-space :vertical="true" style="margin-top: 10px">
                <n-space>
                  <n-h6 style="font-weight: bold; color: rgb(38, 63, 151)"
                    >Is Multi package service?</n-h6
                  >
                  <n-radio-group
                    name="multi_package_service"
                    :on-update:value="checkMultiPackage"
                    :default-value="false"
                  >
                    <n-space>
                      <n-radio
                        v-for="multiServiceOption in multiServiceOptions"
                        :key="multiServiceOption.value"
                        :value="multiServiceOption.value"
                        :label="multiServiceOption.label"
                      />
                    </n-space>
                  </n-radio-group>
                </n-space>
                <div v-show="isMultiPackage">
                  <n-space style="display: flex; align-items: center">
                    <n-h6 style="font-weight: bold; color: rgb(38, 63, 151); margin-top: 5px">
                      Total Boxes in your order
                    </n-h6>
                    <n-input-number v-model:value="stepOne.total_boxes" style="width: 100px" />
                  </n-space>
                </div>
              </n-space>
            </n-space>
          </div>
        </n-card>
      </n-grid-item>
      <n-grid-item span="2 xs:2 s:2 m:2 l:2">
        <n-card style="border-radius: 10px; margin-top: 20px; border-width: 1px">
          <n-space style="width: 100%; display: flex; justify-content: space-between">
            <n-h6 style="font-weight: bold; color: rgb(38, 63, 151)">Pickup Location</n-h6>
            <n-button :round="true" type="info" @click="showModal = true">
              <template #icon>
                <n-icon>
                  <plus-outlined />
                </n-icon>
              </template>
              Add
            </n-button>
          </n-space>
          <n-input placeholder="Search">
            <template #suffix>
              <n-icon :component="SearchOutlined" />
            </template>
          </n-input>
          <n-h6 style="font-weight: bold; color: rgb(38, 63, 151)"
            >Default and recent locations</n-h6
          >
          <n-radio-group
            v-model:value="stepOne.shipping_address_id"
            name="address"
            style="width: 100%; padding-right: 20px"
          >
            <n-card
              v-for="item in formValue"
              :key="item.id"
              style="padding: 1px; margin: 10px; border-radius: 10px; border-width: 2px"
            >
              <n-space style="display: flex">
                <n-radio
                  :value="item.id"
                  style="display: flex; justify-content: space-between; flex-direction: row"
                >
                  <n-space
                    style="display: flex; justify-content: space-between; flex-direction: row"
                  >
                    <n-space :vertical="true">
                      <div style="font-weight: bold; font-size: 13px; color: rgb(38, 63, 151)"
                        >{{ item.contact_name }} - {{ item.store_name }}
                      </div>
                      <div class="fontSize" style="color: rgb(38, 63, 151); line-height: 10px"
                        >ID - {{ item.id }}</div
                      >
                      <div class="fontSize" style="color: rgb(38, 63, 151); line-height: 10px">{{
                        item.address_line_1
                      }}</div>
                      <div class="fontSize" style="color: rgb(38, 63, 151); line-height: 10px"
                        >{{ item.city }} {{ item.state }}</div
                      >
                      <div class="fontSize" style="color: rgb(38, 63, 151); line-height: 10px">{{
                        item.phone
                      }}</div>
                    </n-space>
                  </n-space>
                </n-radio>
              </n-space>
            </n-card>
          </n-radio-group>
        </n-card>
      </n-grid-item>
    </n-grid>
    <n-modal style="width: 70%" v-model:show="showModal" preset="dialog">
      <template #header>
        <div>Create New Address</div>
      </template>
      <n-space :vertical="true">
        <add-address
          @created="
            getAddressList();
            showModal = false;
          "
        />
      </n-space>
    </n-modal>
    <n-card style="border-radius: 10px; margin-bottom: 40px; margin-top: 10px; border-width: 1px">
      <n-space style="display: flex; justify-content: space-between">
        <n-button
          v-if="currentRef !== 3"
          type="info"
          style="font-weight: bold; border-radius: 10px"
          @click="resetData"
          >Reset</n-button
        >

        <div>
          <n-button
            icon-placement="right"
            @click="next"
            type="info"
            style="font-weight: bold; border-radius: 10px"
          >
            Next
          </n-button>
        </div>
      </n-space>
    </n-card>
  </n-space>
</template>
<script lang="ts" setup>
  import { PlusOutlined, SearchOutlined } from '@vicons/antd';
  import AddAddress from '@/components/AccountSetup/AddAddress.vue';
  import { useManualOrder } from '@/hooks/order/useManualOrder';
  import { onMounted, ref, h, reactive } from 'vue';
  import {
    FormInst,
    FormItemRule,
    SelectRenderTag,
    SelectRenderLabel,
    NAvatar,
    NText,
  } from 'naive-ui';
  import { getAddresses } from '@/api/settings/addresses';
  import countries from '@/config/countries_with_flag_code.json';

  const { stepOne } = useManualOrder();
  const showModal = ref(false);
  const formRef = ref<FormInst | null>(null);
  let currentRef = ref<Number | null>(1);
  const formValue: any = ref({});
  const isMultiPackage = ref(false);
  const labelStyle = reactive({
    color: 'rgb(38, 63, 151)',
    'font-weight': 'bold',
  });
  const options = countries;
  const defaultAddress: any = ref({});
  const renderTagLabel: SelectRenderTag = ({ option }) => {
    return h(
      'div',
      {
        style: {
          display: 'flex',
          alignItems: 'center',
        },
      },
      [
        h(NAvatar, {
          src: option.flag as string,
          size: 24,
          style: {
            background: 'transparent',
            marginRight: '12px',
          },
        }),
        option.dial_code as string,
      ]
    );
  };
  const renderLabel: SelectRenderLabel = (option) => {
    return h(
      'div',
      {
        style: {
          display: 'flex',
          alignItems: 'center',
        },
      },
      [
        h(NAvatar, {
          src: option.flag as string,
          size: 'small',
          style: {
            background: 'transparent',
          },
        }),
        h(
          'div',
          {
            style: {
              marginLeft: '12px',
              padding: '4px 0',
            },
          },
          [
            h('div', null, [option.name as string]),
            h(
              NText,
              { depth: 3, tag: 'div' },
              {
                default: () => option.dial_code,
              }
            ),
          ]
        ),
      ]
    );
  };

  const emits = defineEmits(['stepOneOrder', 'activeStep']);
  const props = defineProps({
    activeStep: {
      type: Number,
      default: 0,
    },
  });
  const rules = {
    name: {
      required: true,
      trigger: ['blur', 'input'],
      message: 'Customer name is required',
    },
    phone: {
      required: true,
      trigger: ['blur', 'input'],
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('Customer Phone is required');
        } else if (!/^\d*$/.test(value)) {
          return new Error('Customer Phone should be an integer');
        } else if (!/^\d{10}$/.test(value)) {
          return new Error('Number must be 10 digits');
        }
        return true;
      },
    },
    email: {
      required: true,
      trigger: ['blur', 'input'],
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('Customer email is required');
        } else if (
          !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value
          )
        ) {
          return new Error('Customer email is not valid');
        }
        return true;
      },
    },
    address1: {
      required: true,
      trigger: ['blur', 'input'],
      message: 'Customer address is required',
    },
    zip_code: {
      required: true,
      trigger: ['blur', 'input'],
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('Customer zip code is required');
        } else if (!/^\d*$/.test(value)) {
          return new Error('Customer zip code should be an integer');
        }
        return true;
      },
    },
    country: {
      required: true,
      trigger: ['blur', 'input'],
      message: 'Country is required',
    },
    country_code: {
      required: true,
      trigger: ['blur', 'input'],
      message: 'Country code is required',
    },
    city: {
      required: true,
      trigger: ['blur', 'input'],
      message: 'City is required',
    },
    state: {
      required: true,
      trigger: ['blur', 'input'],
      message: 'State is required',
    },
    total_boxes: {
      required: true,
      trigger: ['blur', 'input'],
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('Please enter input');
        } else if (Number(value) < 0) {
          return new Error('Total boxes should be above 0');
        }
        return true;
      },
    },
  };
  const radioOptions = [
    {
      value: 'forward',
      label: 'Forward Shipment',
    },
    {
      value: 'reverse',
      label: 'Reverse Shipment',
    },
  ].map((s) => {
    s.value = s.value.toLowerCase();
    return s;
  });
  const multiServiceOptions = [
    {
      value: true,
      label: 'Yes',
    },
    {
      value: false,
      label: 'No',
    },
  ];

  const shipmentTypeOptions = [
    {
      value: 'express',
      label: 'Express',
    },
    {
      value: 'heavy_surface',
      label: 'Heavy Surface',
    },
    {
      value: 'dangerous_goods',
      label: 'Dangerous Goods',
    },
    {
      value: 'document',
      label: 'Document',
    },
  ].map((s) => {
    s.value = s.value.toLowerCase();
    return s;
  });

  const paymentMethodOptions = [
    {
      value: 'cod',
      label: 'COD',
    },
    {
      value: 'prepaid',
      label: 'PREPAID',
    },
  ];
  function resetData() {
    stepOne.value = {
      order_place_type: 'forward',
      order_type: 'express',
      country_code: '+92',
      name: 'rashid',
      phone: '3037761164',
      email: 'rashid@gmail.com',
      zip_code: '123123',
      address1: 'phase 8',
      payment_method: 'cod',
      city: 'Lahore',
      country: 'Pakistan',
      state: 'Punjab',
      multi_package_service: false,
      total_boxes: '1',
      shipping_address_id: null,
      placed_on_weship: true,
    };
  }

  function checkMultiPackage(value) {
    if (value) {
      stepOne.value.multi_package_service = true;
      isMultiPackage.value = true;
    } else {
      stepOne.value.multi_package_service = false;
      stepOne.value.total_boxes = '1';
      isMultiPackage.value = false;
    }
  }

  async function next() {
    let bool = false;
    await formRef.value?.validate((error) => {
      if (error) {
        bool = true;
        window['$message'].error('Please fill out required fields');
        return;
      }
    });
    if (stepOne.value.shipping_address_id === null) {
      bool = true;
      window['$message'].error('Please select pickup location');
      return;
    }

    if (!bool) {
      emits('stepOneOrder', stepOne.value);
    }
  }

  function getAddressList() {
    getAddresses({}).then(({ result }) => {
      defaultAddress.value = result.data.filter((item) => item.default_address === 1);
      stepOne.value.shipping_address_id = defaultAddress.value[0].id;
      formValue.value = result.data;
    });
  }

  onMounted(() => {
    getAddresses({}).then(({ result }) => {
      defaultAddress.value = result.data.filter((item) => item.default_address === 1);
      stepOne.value.shipping_address_id = defaultAddress.value[0].id;
      formValue.value = result.data;
    });
  });
  function getCitySelected(value) {
    stepOne.value.city = value;
  }
</script>
<style lang="less" scoped>
  .label-style {
    color: rgb(38, 63, 151);
    font-weight: bold;
  }
</style>
