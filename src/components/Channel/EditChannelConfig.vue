<template>
  <n-space :vertical="true">
    <n-card>
      <n-form ref="formRef" :model="formValue" :rules="rules" size="medium" label-placement="top">
        <n-space :vertical="true">
          <n-form-item :span="8" label="Group" path="group" :label-style="labelStyle">
            <n-input v-model:value="formValue.group" placeholder="Group" />
          </n-form-item>
          <n-form-item :span="8" label="Type" path="type" :label-style="labelStyle">
            <n-input v-model:value="formValue.type" placeholder="Type" />
          </n-form-item>
          <n-form-item :span="8" label="Key" path="key" :label-style="labelStyle">
            <n-input v-model:value="formValue.key" placeholder="Key" />
          </n-form-item>
          <n-form-item :span="8" label="Value" path="value" :label-style="labelStyle">
            <n-input v-model:value="formValue.value" placeholder="Value" />
          </n-form-item>
          <n-form-item :span="8" label="Priority" path="priority" :label-style="labelStyle">
            <n-input v-model:value="formValue.priority" placeholder="Priority" />
          </n-form-item>
          <n-form-item :span="8" label="Status" path="is_active" :label-style="labelStyle">
            <n-input v-model:value="formValue.is_active" placeholder="Status" />
          </n-form-item>
        </n-space>
      </n-form>
      <div style="display: flex; justify-content: space-between">
        <span></span>
        <n-button :strong="true" :secondary="true" :round="true" type="success" @click="update()">
          <template #icon>
            <n-icon
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 1024 1024"
              >
                <path
                  d="M893.3 293.3L730.7 130.7c-7.5-7.5-16.7-13-26.7-16V112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V338.5c0-17-6.7-33.2-18.7-45.2zM384 184h256v104H384V184zm456 656H184V184h136v136c0 17.7 14.3 32 32 32h320c17.7 0 32-14.3 32-32V205.8l136 136V840zM512 442c-79.5 0-144 64.5-144 144s64.5 144 144 144s144-64.5 144-144s-64.5-144-144-144zm0 224c-44.2 0-80-35.8-80-80s35.8-80 80-80s80 35.8 80 80s-35.8 80-80 80z"
                  fill="currentColor"
                /></svg
            ></n-icon>
          </template>
          Update
        </n-button>
      </div>
    </n-card>
  </n-space>
</template>
<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { getChannelConfigDetailsById, updateChannelConfig } from '@/api/channels/config';
  import { FormInst } from 'naive-ui';

  const emits = defineEmits(['updated']);
  const formValue: any = ref({});
  const formRef = ref<FormInst | null>(null);
  const labelStyle = reactive({
    color: 'rgb(38, 63, 151)',
    'font-weight': 'bold',
  });
  const props = defineProps({
    id: {
      type: Number,
    },
  });

  getChannelConfigDetailsById(props.id).then(({ result }) => (formValue.value = result.data));

  const rules = {
    group: {
      required: true,
      trigger: ['blur', 'input'],
      message: 'Group is required',
    },
    type: {
      required: true,
      trigger: ['blur', 'input'],
      message: 'Type is required',
    },
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
    priority: {
      required: true,

      trigger: ['blur', 'input'],
      message: 'Priority is required',
    },
    is_active: {
      required: true,
      trigger: ['blur', 'input'],
      message: 'Status is required',
    },
  };

  function update() {
    formRef.value?.validate((errors) => {
      if (!errors) {
        const Loading = window['$loading'] || null;
        Loading.start();
        updateChannelConfig(props.id, formValue.value)
          .then(({ result }) => {
            window['$message'].success(result.message);
            emits('updated', result.data);
            Loading.finish();
          })
          .catch(({ result }) => {
            window['$message'].error(result.message);
            Loading.finish();
          });
      } else {
        window['$message'].error('Please fill out required fields');
      }
    });
  }
</script>

<style lang="less" scoped></style>
