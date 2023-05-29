<template>
  <n-space :vertical="true">
    <n-card>
      <n-form
        ref="formRef"
        :model="createFormData"
        :rules="rules"
        size="medium"
        label-placement="top"
      >
        <n-form-item label="Channel Name" path="channel_name" :label-style="labelStyle">
          <n-input v-model:value="createFormData.channel_name" placeholder="Channel Name" />
        </n-form-item>
        <n-form-item label="Channel Base URL" path="channel_base_url" :label-style="labelStyle">
          <n-input v-model:value="createFormData.channel_base_url" placeholder="Channel Base URL" />
        </n-form-item>
        <n-form-item label="Channel Logo URL" path="channel_logo_url" :label-style="labelStyle">
          <n-input v-model:value="createFormData.channel_logo_url" placeholder="Channel Logo URL" />
        </n-form-item>
      </n-form>
      <div style="display: flex; justify-content: space-between">
        <span></span>
        <n-button
          :strong="true"
          :secondary="true"
          :round="true"
          type="success"
          @click="createChannel()"
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
          Create
        </n-button>
      </div>
    </n-card>
  </n-space>
</template>
<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { useCreateChannel } from '@/hooks/channel/useCreateChannel';
  import { createNewChannel } from '@/api/channels/channel';
  import { FormInst } from 'naive-ui';

  const emits = defineEmits(['created']);
  const { createFormData } = useCreateChannel();
  const formRef = ref<FormInst | null>(null);
  const labelStyle = reactive({
    color: 'rgb(38, 63, 151)',
    'font-weight': 'bold',
  });

  const rules = {
    channel_name: {
      required: true,
      trigger: ['blur', 'input'],
      message: 'Channel name is required',
    },
    channel_base_url: {
      required: true,
      trigger: ['blur', 'input'],
      message: 'Channel base url is required',
    },
    channel_logo_url: {
      required: true,
      trigger: ['blur', 'input'],
      message: 'Channel logo url is required',
    },
  };

  function createChannel() {
    formRef.value?.validate((errors) => {
      if (!errors) {
        const Loading = window['$loading'] || null;
        Loading.start();
        createNewChannel(createFormData.value)
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
