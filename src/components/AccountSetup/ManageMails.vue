<template>
  <n-space :vertical="true" style="gap: 0px 0px">
    <n-h1>Manage Mails</n-h1>
    <n-form ref="formRef" :label-width="80" :model="formValue" size="small">
      <n-grid cols="2 s:1 m:2 l:2 xl:2" responsive="screen">
        <n-grid-item>
          <n-form-item
            style="margin-left: 5px; margin-right: 5px; padding-top: 24px"
            label="Finance Mails"
          >
            <n-input v-model:value="formValue.finance_mails.value" placeholder="" />
          </n-form-item>
        </n-grid-item>

        <n-grid-item>
          <n-form-item
            style="margin-left: 5px; margin-right: 5px; padding-top: 24px"
            label="NDR Mails"
          >
            <n-input v-model:value="formValue.ndr_mails.value" placeholder="" />
          </n-form-item>
        </n-grid-item>

        <n-grid-item>
          <n-form-item
            style="margin-left: 5px; margin-right: 5px; padding-top: 24px"
            label="Wallet Mails"
          >
            <n-input v-model:value="formValue.wallet_mails.value" placeholder="" />
          </n-form-item>
        </n-grid-item>

        <n-grid-item>
          <n-form-item
            style="margin-left: 5px; margin-right: 5px; padding-top: 24px"
            label="Weight Mails"
          >
            <n-input v-model:value="formValue.weight_mails.value" placeholder="" />
          </n-form-item>
        </n-grid-item>

        <n-grid-item>
          <n-form-item
            style="margin-left: 5px; margin-right: 5px; padding-top: 24px"
            label="Feedback Mails"
          >
            <n-input v-model:value="formValue.feedback_mails.value" placeholder="" />
          </n-form-item>
        </n-grid-item>
      </n-grid>
    </n-form>
    <n-button round type="success" @click="saveMetaData"> Save </n-button>
  </n-space>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { useMessage } from 'naive-ui';
  import {
    createUserCompanyProfileMetaData,
    getUserCompanyProfileMetaData,
  } from '@/api/settings/companyprofile';

  const formValue: any = ref({
    finance_mails: {
      value: null,
      is_active: true,
    },
    ndr_mails: {
      value: null,
      is_active: true,
    },
    wallet_mails: {
      value: null,
      is_active: true,
    },
    weight_mails: {
      value: null,
      is_active: true,
    },
    feedback_mails: {
      value: null,
      is_active: true,
    },
  });
  const message = useMessage();
  const Loading = window['$loading'] || null;
  getUserCompanyProfileMetaData('manage_mails')
    .then(({ result }) => {
      for (const key in result) {
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
  function saveMetaData() {
    Loading.start();
    let data: any = [];
    for (const key in formValue.value) {
      data.push({
        key,
        value: formValue.value[key].value,
        id: formValue.value[key].id,
        is_active: formValue.value[key].is_active,
      });
    }
    createUserCompanyProfileMetaData('manage_mails', data)
      .then(({ result }) => {
        window['$message'].success(result.message);
        Loading.finish();
      })
      .catch(({ result }) => {
        message.error(result.message);
        Loading.finish();
      });
  }
</script>
