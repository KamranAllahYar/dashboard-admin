<template>
  <n-space :vertical="true">
    <n-h1>Order Status Masking</n-h1>
    <n-form ref="formRef" :label-width="80" size="small">
      <n-grid cols="2 s:1 m:2 l:2 xl:2" responsive="screen">
        <n-grid-item v-for="(item, index) in statusOptions" :key="index">
          <n-form-item
            style="margin-left: 5px; margin-right: 5px; padding-top: 24px"
            :label="item.status"
          >
            <!--            <n-space>-->
            <n-input
              v-model:value="masking[index]"
              round
              :placeholder="item.masking"
              @update:value="updateStatusMaskingArray(item, index)"
            />
            <!--              <n-button-->
            <!--                round-->
            <!--                icon-placement="left"-->
            <!--                type="success"-->
            <!--                :on-click="updateStatusMasking(item)"-->
            <!--              >-->
            <!--                <template #icon>-->
            <!--                  <n-icon>-->
            <!--                    <save-outlined />-->
            <!--                  </n-icon>-->
            <!--                </template>-->
            <!--                Save-->
            <!--              </n-button>-->
            <!--            </n-space>-->
          </n-form-item>
        </n-grid-item>
      </n-grid>
    </n-form>
    <n-space justify="space-between">
      <n-button
        round
        type="success"
        @click="updateStatus"
        :disabled="disableSaveBtn"
        style="font-weight: bold"
      >
        Save
      </n-button>
      <n-button round type="info" @click="resetDefaultStatuses" style="font-weight: bold">
        Reset to default
      </n-button>
    </n-space>
  </n-space>
</template>
<script lang="ts" setup>
  import { useAdminSettingStore } from '@/store/modules/adminSetting';
  import { ref } from 'vue';
  import { updateOrderStatusMasking } from '@/api/order';

  const adminStatusStore = useAdminSettingStore();
  const statusOptions = ref(adminStatusStore.getOrderStatuses);
  const updatedMasking: any = ref([]);
  const masking: any = ref([]);
  const disableSaveBtn = ref(true);
  let timer: any = null;

  function updateStatusMaskingArray(item, index) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      if (masking.value[index] === '') {
        for (let i = updatedMasking.value.length - 1; i >= 0; --i) {
          if (updatedMasking.value[i].status == item.status) {
            updatedMasking.value.splice(i, 1);
          }
        }
      } else {
        for (let i = updatedMasking.value.length - 1; i >= 0; --i) {
          if (updatedMasking.value[i].status == item.status) {
            updatedMasking.value.splice(i, 1);
          }
        }
        updatedMasking.value.push({ status: item.status, masking: masking.value[index] });
      }

      if (updatedMasking.value.length > 0) {
        disableSaveBtn.value = false;
      } else {
        disableSaveBtn.value = true;
      }
      console.log(updatedMasking.value);
    }, 500);
  }
  function updateStatus() {
    const Loading = window['$loading'] || null;

    for (const item of updatedMasking.value) {
      Loading.start();
      const data = {
        masking: item.masking,
      };
      updateOrderStatusMasking(item.status, data).then(({ result }) => {
        Loading.finish();
        window['$message'].success(result.message);
      });
    }
  }
  function resetDefaultStatuses() {
    const Loading = window['$loading'] || null;
    Loading.start();
    const data = {
      masking: 'reset',
    };
    updateOrderStatusMasking('reset', data).then(({ result }) => {
      Loading.finish();
      window['$message'].success(result.message);
    });
  }
</script>
