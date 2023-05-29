<template>
  <n-space :vertical="true">
    <n-divider />
    <n-h6 style="font-weight: bold; color: rgb(38, 63, 151)">Payment Method</n-h6>
    <n-radio-group
      :default-value="formValue.payment_method"
      v-model:value="formValue.payment_method"
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
    <n-h6 style="font-weight: bold; color: rgb(38, 63, 151); margin-top: 20px"
      >Single Shipment</n-h6
    >
    <n-radio-group
      style="display: flex; justify-content: center"
      v-model:value="formValue.order_place_type"
      :default-value="formValue.order_place_type"
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

    <n-h6 style="font-weight: bold; color: rgb(38, 63, 151)">Shipment Type</n-h6>
    <n-radio-group
      :default-value="formValue.order_type"
      v-model:value="formValue.order_type"
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
        <n-h6 style="font-weight: bold; color: rgb(38, 63, 151)">Is Multi package service?</n-h6>
        <n-radio-group
          name="multi_package_service"
          :on-update:value="checkMultiPackage"
          :default-value="multiServiceOptions"
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
          <n-form
            ref="formRef"
            :model="formValue"
            :rules="rules"
            size="medium"
            label-placement="left"
          >
            <n-form-item
              :span="8"
              path="total_boxes"
              label="Total Boxes in your order"
              :label-style="labelStyle"
            >
              <n-input-number v-model:value="formValue.total_boxes" style="width: 100px" />
            </n-form-item>
          </n-form>
        </n-space>
      </div>
    </n-space>

    <n-space style="display: flex; justify-content: space-between">
      <span></span>
      <n-button type="info" style="font-weight: bold; border-radius: 10px" @click="saveData"
        >Save</n-button
      >
    </n-space>
  </n-space>
</template>
<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { FormItemRule } from 'naive-ui';

  const isMultiPackage = ref();
  const formValue: any = ref({});
  const emits = defineEmits(['edited']);
  const props = defineProps({
    stepOne: {
      type: Object,
      default: function () {
        return {};
      },
    },
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
  const labelStyle = reactive({
    color: 'rgb(38, 63, 151)',
    'font-weight': 'bold',
  });
  const rules = {
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
  ];

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

  setTimeout(function () {
    formValue.value = props.stepOne;
    isMultiPackage.value = formValue.value.multi_package_service === true;
  }, 100);

  function checkMultiPackage(value) {
    if (value) {
      formValue.value.multi_package_service = true;
      isMultiPackage.value = true;
    } else {
      formValue.value.multi_package_service = false;
      formValue.value.total_boxes = '1';
      isMultiPackage.value = false;
    }
  }

  function saveData() {
    emits('edited', formValue.value);
  }
</script>
