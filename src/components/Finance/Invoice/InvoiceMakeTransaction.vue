<template>
  <n-space justify="center">
    <n-space :vertical="true" justify="center">
      <n-space>
        <n-h5 style="font-weight: bold; margin-top: 5px; width: 200px"
          >Select Transaction Type*</n-h5
        >
        <n-select style="width: 300px" v-model:value="selectTransactionType" :options="options" />
      </n-space>
      <n-space>
        <n-h5 style="font-weight: bold; margin-top: 5px; width: 200px">Description</n-h5>
        <n-input
          v-model:value="transactionData.description"
          placeholder="Description"
          style="width: 300px"
        />
      </n-space>
      <n-space>
        <n-h5 style="font-weight: bold; margin-top: 5px; width: 200px">Amount</n-h5>
        <n-input v-model:value="transactionData.amount" placeholder="Amount" style="width: 300px" />
      </n-space>
      <n-space>
        <n-h5 style="font-weight: bold; margin-top: 5px; width: 200px">Transaction ID</n-h5>
        <n-input
          v-model:value="transactionData.transaction_id"
          placeholder="Transaction ID"
          style="width: 300px"
        />
      </n-space>
      <n-space justify="center">
        <n-button round type="info" @click="makeTransaction" :loading="isLoading">Save</n-button>
      </n-space>
    </n-space>
  </n-space>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { makeInvoiceTransactionStatus } from '@/api/finance/invoicecycle';

  const selectTransactionType: any = ref();
  const isLoading: any = ref(false);
  const transactionData: any = ref({});
  const emits = defineEmits(['success']);
  const props = defineProps({
    id: {
      type: [Number, String],
    },
  });
  const options = [
    {
      value: 'credit',
      label: 'Credit',
    },
    {
      value: 'debit',
      label: 'Debit',
    },
  ];
  function makeTransaction() {
    if (selectTransactionType.value) {
      const data = {
        invoice_cycle_id: props.id,
        description: transactionData.value.description,
        transaction_id: transactionData.value.transaction_id,
        credit: null,
        debit: null,
      };
      if (selectTransactionType.value === 'credit') {
        data.credit = transactionData.value.amount;
      } else if (selectTransactionType.value === 'debit') {
        data.debit = transactionData.value.amount;
      }
      makeInvoiceTransactionStatus(data)
        .then(({ result }) => {
          window['$message'].success(result.message);
          isLoading.value = false;
          emits('success');
        })
        .catch(({ result }) => {
          window['$message'].error(result.message);
          isLoading.value = false;
        });
    } else {
      window['$message'].error('Please select transaction type');
    }
  }
</script>
