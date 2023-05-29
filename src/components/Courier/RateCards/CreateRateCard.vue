<template>
  <n-space vertical>
    <n-divider />
    <n-space>
      <p style="width: 100px"> Select Courier </p>
      <n-select
        v-model:value="newRateCard.courier_id"
        :options="courierListData"
        placeholder="Please Select Courier"
        label-field="name"
        value-field="id"
        style="width: 250px"
      />
    </n-space>
    <n-space>
      <p style="width: 100px"> Select Type </p>
      <n-select
        v-model:value="newRateCard.type"
        :options="typeOptions"
        placeholder="Please Select Type"
        label-field="label"
        value-field="value"
        style="width: 250px"
      />
    </n-space>
    <n-space>
      <p style="width: 100px"> Select Status </p>
      <n-switch v-model:value="newRateCard.status" :checked-value="1" :unchecked-value="0" />
    </n-space>
    <n-divider />
    <n-space justify="center">
      <n-button type="success" @click="saveRateCard">Save</n-button>
    </n-space>
  </n-space>
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { courierList, createCourierRateCard, updateCourierRateCard } from '@/api/courier';
  import { ResultEnum } from '@/enums/httpEnum';
  import { useMessage } from 'naive-ui';

  const emits = defineEmits(['saved']);
  const message = useMessage();
  const courierListData: any = ref();
  const isUpdate = ref(false);
  const props = defineProps({
    rateCardItem: {
      type: Object,
    },
  });
  const newRateCard: any = ref({
    courier_id: null,
    type: 'weight',
    status: 1,
  });
  const typeOptions = [
    {
      label: 'Weight',
      value: 'weight',
    },
    {
      label: 'Standard',
      value: 'standard',
    },
    {
      label: 'Volume',
      value: 'volume',
    },
    {
      label: 'Amount',
      value: 'amount',
    },
  ];

  onMounted(() => {
    if (props.rateCardItem) {
      isUpdate.value = true;
      newRateCard.value = props.rateCardItem;
    }
    courierList({ is_active: 1, page: 1, pageSize: 1000 }).then(({ result }) => {
      courierListData.value = result.data;
    });
  });
  function saveRateCard() {
    const Loading = window['$loading'] || null;
    Loading.start();
    if (isUpdate.value) {
      updateCourierRateCard(newRateCard.value, newRateCard.value.id)
        .then(({ result, code }) => {
          if (code === ResultEnum.SUCCESS) {
            message.success(result.message);
            emits('saved');
            Loading.finish();
          } else {
            message.error(result.message);
            Loading.finish();
          }
        })
        .catch(({ result }) => {
          message.error(result.message);
          Loading.finish();
        });
    } else {
      createCourierRateCard(newRateCard.value)
        .then(({ result, code }) => {
          if (code === ResultEnum.SUCCESS) {
            message.success(result.message);
            emits('saved');
            Loading.finish();
          } else {
            message.error(result.message);
            Loading.finish();
          }
        })
        .catch(({ result }) => {
          message.error(result.message);
          Loading.finish();
        });
    }
  }
</script>
