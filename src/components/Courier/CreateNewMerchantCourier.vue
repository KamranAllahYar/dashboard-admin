<template>
  <n-space :vertical="true">
    <n-grid x-gap="12" :cols="2">
      <n-gi style="display: flex; justify-content: center">
        <n-space :vertical="true">
          <div
            style="
              font-weight: bold;
              color: rgb(38, 63, 151);
              font-size: 16px;
              justify-content: center;
              display: flex;
            "
            >Courier</div
          >
          <div
            style="
              font-weight: bold;
              color: rgb(0, 0, 0);
              justify-content: center;
              margin-top: 20px;
              display: flex;
            "
            >{{ props.name.toString().toUpperCase() }}</div
          >
        </n-space>
      </n-gi>
      <n-gi style="display: flex; justify-content: center">
        <n-space :vertical="true">
          <n-h5
            style="
              font-weight: bold;
              color: rgb(38, 63, 151);
              display: flex;
              justify-content: center;
            "
            >Model type</n-h5
          >
          <n-radio-group
            default-value="marketplace"
            v-model:value="courierDetails.type"
            name="radiogroup"
          >
            <n-space>
              <n-radio
                style="font-weight: bold; color: rgb(125, 140, 193)"
                v-for="item in radioOptions"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              />
            </n-space>
          </n-radio-group>
        </n-space>
      </n-gi>
    </n-grid>
    <n-divider />

    <n-space style="display: flex; justify-content: center" />
    <n-space style="display: flex; justify-content: center" />
    <div v-if="courierDetails.type === 'self'">
      <div v-for="(item, index) in courierDetails.meta_data_parameters" :key="index">
        <n-form
          :ref="
            (el) => {
              itemsRef[index] = el;
            }
          "
          :rules="rules"
          :model="item"
          size="medium"
          label-placement="top"
        >
          <n-grid :span="24" :x-gap="24">
            <n-form-item-gi :span="10" label="Key" path="key" :label-style="labelStyle">
              <n-input v-model:value="item.key" placeholder="Key" />
            </n-form-item-gi>
            <n-form-item-gi :span="10" label="Value" path="value" :label-style="labelStyle">
              <n-input v-model:value="item.value" placeholder="Value" />
            </n-form-item-gi>
            <n-form-item-gi :span="4" style="display: flex; justify-content: center">
              <n-button
                :quaternary="true"
                :circle="true"
                type="error"
                v-if="courierDetails.meta_data_parameters.length > 1"
                @click="deleteItem(index)"
              >
                <template #icon>
                  <n-icon><delete-outlined /></n-icon>
                </template>
              </n-button>
            </n-form-item-gi>
          </n-grid>
        </n-form>
      </div>
    </div>

    <div style="display: flex; justify-content: center">
      <n-button
        v-show="courierDetails.type === 'self'"
        :strong="true"
        :secondary="true"
        :round="true"
        type="info"
        @click="addNewItem()"
      >
        <template #icon>
          <n-icon
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 32 32"
            >
              <path d="M17 15V8h-2v7H8v2h7v7h2v-7h7v-2z" fill="currentColor" /></svg
          ></n-icon>
        </template>
        Add New Element
      </n-button>
      <n-button
        :strong="true"
        :secondary="true"
        style="margin-left: 15px"
        :round="true"
        type="success"
        @click="createCourierDetails()"
      >
        <template #icon>
          <n-icon
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 32 32"
            >
              <path
                d="M27.71 9.29l-5-5A1 1 0 0 0 22 4H6a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V10a1 1 0 0 0-.29-.71zM12 6h8v4h-8zm8 20h-8v-8h8zm2 0v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8H6V6h4v4a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6.41l4 4V26z"
                fill="currentColor"
              /></svg
          ></n-icon>
        </template>
        Save
      </n-button>
    </div>
  </n-space>
</template>
<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { FormInst } from 'naive-ui';
  import { DeleteOutlined } from '@vicons/antd';
  import { updateMerchantCourier } from '@/api/courier';
  import { websiteConfig } from '@/config/website.config';

  const itemsRef = ref<FormInst[] | []>([]);
  const emits = defineEmits(['created']);
  const courierDetails: any = ref({
    type: 'marketplace',
    is_active: true,
    meta_data_parameters: [{ key: '', value: '' }],
  });

  const labelStyle = reactive({
    color: 'rgb(38, 63, 151)',
    'font-weight': 'bold',
  });
  const props = defineProps({
    id: {
      type: [Number, String],
    },
    name: {
      type: [Number, String],
    },
  });
  const newObject = {
    key: '',
    value: '',
  };
  const itemArray = reactive([{ ...newObject }]);
  const radioOptions = [
    {
      value: 'marketplace',
      label: websiteConfig.title,
      color: 'rgb(125, 140, 193)',
    },
    {
      value: 'self',
      label: 'Self',
      color: 'rgb(125, 140, 193)',
    },
  ].map((s) => {
    s.value = s.value.toLowerCase();
    return s;
  });
  const rules = {
    key: {
      required: true,
      trigger: ['blur', 'input'],
      message: 'Key is required',
    },
    value: {
      required: true,
      trigger: ['blur', 'input'],
      message: 'Value is required',
    },
  };
  function deleteItem(index) {
    courierDetails.value.meta_data_parameters.splice(index, 1);
  }
  function addNewItem() {
    courierDetails.value.meta_data_parameters.push({ ...newObject });
    console.log(itemArray);
  }
  async function createCourierDetails() {
    if (courierDetails.value.type === 'marketplace') {
      const data = courierDetails.value;
      delete data.meta_data_parameters;
      updateMerchantCourier(props.id, courierDetails.value).then(({ result }) => {
        window['$message'].success(result.message);
        emits('created', result.data);
        courierDetails.value.meta_data_parameters = [{ key: '', value: '' }];
      });
    } else if (courierDetails.value.type === 'self') {
      let hasErrors = false;
      for (const itemRef of itemsRef.value) {
        await itemRef?.validate((error) => {
          if (error) {
            hasErrors = true;
            return;
          }
        });
      }
      if (!hasErrors) {
        updateMerchantCourier(props.id, courierDetails.value).then(({ result }) => {
          window['$message'].success(result.message);
          emits('created', result.data);
        });
      }
    }
  }
</script>
