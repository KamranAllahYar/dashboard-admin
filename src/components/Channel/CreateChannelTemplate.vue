<template>
  <n-space :vertical="true">
    <n-card>
      <n-form ref="formRef" :model="formValue" :rules="rules" size="medium" label-placement="top">
        <n-space :vertical="true">
          <n-form-item :span="8" label="Source" path="source" :label-style="labelStyle">
            <n-input v-model:value="formValue.source" placeholder="Source" />
          </n-form-item>
          <n-form-item :span="8" label="Destination" path="destination" :label-style="labelStyle">
            <n-input v-model:value="formValue.destination" placeholder="Destination" />
          </n-form-item>
          <n-form-item :span="8" label="Type" path="type" :label-style="labelStyle">
            <n-input v-model:value="formValue.type" placeholder="Type" />
          </n-form-item>
          <n-form-item :span="8" label="Group" path="group" :label-style="labelStyle">
            <n-input v-model:value="formValue.group" placeholder="Group" />
          </n-form-item>
          <n-form-item :span="8" label="Status" path="is_active" :label-style="labelStyle">
            <n-input v-model:value="formValue.is_active" placeholder="Status" />
          </n-form-item>
        </n-space>
      </n-form>
      <div style="display: flex; justify-content: space-between">
        <span></span>
        <n-button :strong="true" :secondary="true" :round="true" type="success" @click="create()">
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
          Create
        </n-button>
      </div>
    </n-card>
  </n-space>
</template>
<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { createNewChannelTemplate } from '@/api/channels/template';
  import { FormInst } from 'naive-ui';

  const emits = defineEmits(['created']);
  const formValue: any = ref({});
  const formRef = ref<FormInst | null>(null);
  const labelStyle = reactive({
    color: 'rgb(38, 63, 151)',
    'font-weight': 'bold',
  });
  const props = defineProps({
    id: {
      type: String,
    },
  });

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
    source: {
      required: true,
      trigger: ['blur', 'input'],
      message: 'Source is required',
    },
    destination: {
      required: true,
      trigger: ['blur', 'input'],
      message: 'Destination is required',
    },
    is_active: {
      required: true,
      trigger: ['blur', 'input'],
      message: 'Status is required',
    },
  };

  function create() {
    formRef.value?.validate((errors) => {
      if (!errors) {
        const Loading = window['$loading'] || null;
        Loading.start();
        formValue.value.channel_id = props.id;
        createNewChannelTemplate(formValue.value)
          .then(({ result }) => {
            window['$message'].success(result.message);
            emits('created', result.data);
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
