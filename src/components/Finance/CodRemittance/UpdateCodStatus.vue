<template>
  <n-space justify="center">
    <n-space :vertical="true" justify="center">
      <n-space>
        <n-h5 style="font-weight: bold; margin-top: 5px; width: 130px">Remarks</n-h5>
        <n-input v-model:value="remarks" placeholder="Remarks" style="width: 300px" />
      </n-space>
      <n-space justify="center">
        <n-button round type="info" @click="updateStatus" :loading="isLoading">Update</n-button>
      </n-space>
    </n-space>
  </n-space>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { updateCodCycleStatus } from '@/api/finance/codcycle';

  const isLoading: any = ref(false);
  const remarks: any = ref();
  const emits = defineEmits(['updated']);
  const props = defineProps({
    id: {
      type: [Number, String],
    },
  });

  function updateStatus() {
    if (remarks.value) {
      const data = {
        ids: [props.id],
        remarks: remarks.value,
      };
      updateCodCycleStatus(data)
        .then(({ result }) => {
          window['$message'].success(result.message);
          isLoading.value = false;
          emits('updated');
        })
        .catch(({ result }) => {
          window['$message'].error(result.message);
          isLoading.value = false;
        });
    } else {
      window['$message'].error('Please enter remarks');
    }
  }
</script>
