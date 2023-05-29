<template>
  <n-space :vertical="true">
    <n-h6 style="font-weight: bold; color: rgb(38, 63, 151); margin-top: 20px"
      >Customer Details
    </n-h6>
    <n-form ref="formRef" :model="formValue" :rules="rules" size="medium" label-placement="top">
      <n-grid :span="24" :x-gap="24">
        <n-form-item-gi :span="10" label="Name" path="name" :label-style="labelStyle">
          <n-input v-model:value="formValue.name" placeholder="Name" />
        </n-form-item-gi>
        <n-form-item-gi
          :span="6"
          label="Country Code"
          path="country_code"
          :label-style="labelStyle"
        >
          <n-input v-model:value="formValue.country_code" placeholder="Country Code" />
        </n-form-item-gi>
        <n-form-item-gi :span="8" label="Phone Number" path="phone" :label-style="labelStyle">
          <n-input v-model:value="formValue.phone" placeholder="Phone Number" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="Customer Email ID" path="email" :label-style="labelStyle">
          <n-input v-model:value="formValue.email" placeholder="Customer Email ID" />
        </n-form-item-gi>
        <n-form-item-gi
          :span="12"
          label="Customer Zip Code"
          path="zip_code"
          :label-style="labelStyle"
        >
          <n-input v-model:value="formValue.zip_code" placeholder="Customer Zip Code" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="Country" path="country" :label-style="labelStyle">
          <n-input v-model:value="formValue.country" placeholder="Country" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="City" path="city" :label-style="labelStyle">
          <n-input v-model:value="formValue.city" placeholder="City" />
        </n-form-item-gi>
        <n-form-item-gi
          :span="24"
          label="Customer Address"
          path="address1"
          :label-style="labelStyle"
        >
          <n-input
            v-model:value="formValue.address1"
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

    <n-space style="display: flex; justify-content: space-between">
      <span></span>
      <n-button type="info" style="font-weight: bold; border-radius: 10px" @click="saveData"
        >Save
      </n-button>
    </n-space>
  </n-space>
</template>
<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { FormInst } from 'naive-ui';

  const emits = defineEmits(['edited']);
  const formRef = ref<FormInst | null>(null);
  const formValue: any = ref({});
  const labelStyle = reactive({
    color: 'rgb(38, 63, 151)',
    'font-weight': 'bold',
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
      message: 'Customer Phone is required',
    },
    email: {
      required: true,
      trigger: ['blur', 'input'],
      message: 'Customer email is required',
    },
    address1: {
      required: true,
      trigger: ['blur', 'input'],
      message: 'Customer address is required',
    },
    zip_code: {
      required: true,
      trigger: ['blur', 'input'],
      message: 'Customer zip code is required',
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
  };
  const props = defineProps({
    stepOne: {
      type: Object,
      default: function () {
        return {};
      },
    },
  });
  setTimeout(function () {
    formValue.value = props.stepOne;
  }, 100);

  async function saveData() {
    let bool = false;
    await formRef.value?.validate((error) => {
      if (error) {
        bool = true;
        window['$message'].error('Please fill out required fields');
        return;
      }
    });

    if (!bool) {
      emits('edited', formValue.value);
    }
  }
</script>
