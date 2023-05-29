<template>
  <n-space vertical>
    <n-divider />
    <n-space vertical>
      <p style="width: 150px">Courier Rate Card *</p>
      <n-select
        v-model:value="newRateCardSlab.id"
        placeholder="Select Courier Rate Card"
        :options="rateCardOptions"
        style="width: 250px"
        label-field="courier_name"
        value-field="id"
        @update:value="handleRateCardUpdateValue"
      />
    </n-space>
    <n-space vertical>
      <p style="width: 150px">Select Zone *</p>
      <n-select
        v-model:value="newRateCardSlab.zone_id"
        placeholder="Please Select Zone"
        label-field="title"
        value-field="zone_id"
        :options="zonesOptions"
        :disabled="isZoneDisabled"
        style="width: 250px"
      />
    </n-space>
    <n-form
      ref="formRef"
      :model="newRateCardSlab"
      :rules="rules"
      label-placement="top"
      require-mark-placement="right-hanging"
      size="medium"
      label-width="auto"
      :style="{ maxWidth: '640px' }"
    >
      <n-form-item label="Description" path="description">
        <n-input v-model:value="newRateCardSlab.description" placeholder="Description" />
      </n-form-item>
      <n-form-item label="From" path="from">
        <n-input-number v-model:value="newRateCardSlab.from" placeholder="From" />
      </n-form-item>
      <n-form-item label="To" path="to">
        <n-input-number v-model:value="newRateCardSlab.to" placeholder="To" />
      </n-form-item>
      <n-form-item label="Rate" path="rate">
        <n-input-number v-model:value="newRateCardSlab.rate" placeholder="Rate" />
      </n-form-item>
      <div style="display: flex; align-items: center; justify-content: center">
        <n-button type="success" @click="postRateSlab"> Save </n-button>
      </div>
    </n-form>
  </n-space>
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import {
    createCourierRateCardSlab,
    getCourierRateCards,
    getCourierZoneMaskingListByCourierId,
  } from '@/api/courier';
  import { FormInst, SelectOption, useMessage } from 'naive-ui';
  import { ResultEnum } from '@/enums/httpEnum';

  const emits = defineEmits(['saved']);
  const formRef = ref<FormInst | null>(null);
  const message = useMessage();
  const isZoneDisabled = ref(true);
  const rateCardOptions: any = ref({});
  const zonesOptions: any = ref({});
  const newRateCardSlab: any = ref({
    id: null,
    zone_id: null,
  });
  const rules = {
    description: {
      required: true,
      trigger: ['blur', 'input'],
      message: 'Please input description',
    },
    from: {
      type: 'number',
      required: true,
      trigger: ['blur', 'input'],
      message: 'Input is required',
    },
    to: {
      type: 'number',
      required: true,
      trigger: ['blur', 'input'],
      message: 'Input is required',
    },
    rate: {
      type: 'number',
      required: true,
      trigger: ['blur', 'input'],
      message: 'Input is required',
    },
  };
  onMounted(() => {
    getCourierRateCards({ is_active: 1, page: 1, pageSize: 1000 }).then(({ result }) => {
      rateCardOptions.value = result.data.map((item) => {
        item.courier_name = item.courier.name;
        return item;
      });
    });
  });
  function postRateSlab() {
    if (!newRateCardSlab.value.id) {
      message.error('Please select rate card');
    } else if (!newRateCardSlab.value.zone_id) {
      message.error('Please select zone');
    } else {
      formRef.value?.validate((errors) => {
        if (!errors) {
          const data = {
            rate_card_id: newRateCardSlab.value.id,
            zone_id: newRateCardSlab.value.zone_id,
            description: newRateCardSlab.value.description,
            from: newRateCardSlab.value.from,
            to: newRateCardSlab.value.to,
            rate: newRateCardSlab.value.rate,
          };
          createCourierRateCardSlab(data)
            .then(({ result, code }) => {
              if (code === ResultEnum.SUCCESS) {
                zonesOptions.value = result.data;
                message.success(result.message);
                emits('saved');
              }
            })
            .catch(({ result }) => {
              message.error(result.message);
            });
        } else {
          window['$message'].error('Please fill out required fields');
        }
      });
    }
  }
  function handleRateCardUpdateValue(value: string, option: SelectOption) {
    newRateCardSlab.value.zone_id = null;
    isZoneDisabled.value = false;
    getCourierZoneMaskingListByCourierId(option.courier_id)
      .then(({ result, code }) => {
        if (code === ResultEnum.SUCCESS) {
          zonesOptions.value = result.data;
        }
      })
      .catch(({ result }) => {
        message.error(result.message);
      });
  }
</script>
