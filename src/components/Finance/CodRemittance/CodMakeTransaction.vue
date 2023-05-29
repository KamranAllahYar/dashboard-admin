<template>
  <n-space :vertical="true" justify="center">
    <n-grid :x-gap="12" :y-gap="8" cols="2 xs:1 s:2 m:2 l:4" responsive="screen">
      <n-grid-item span="1 xs:1 s:2 m:2 l:2">
        <n-card
          style="
            background-color: rgb(237, 240, 249);
            border-radius: 10px;
            margin-top: 10px;
            margin-bottom: 10px;
          "
        >
          <n-space :vertical="true" style="display: flex">
            <n-space justify="space-between">
              <p>Company</p>
              <p>{{ props.selectedItem.merchant.companyProfile.name }}</p>
            </n-space>
            <n-space justify="space-between">
              <p>Account No.</p>
              <p>{{ kycForm.account_number.value }}</p>
            </n-space>
            <n-space justify="space-between">
              <p>Account Holder Name</p>
              <p>{{ kycForm.account_holder_name.value }}</p>
            </n-space>
            <n-space justify="space-between">
              <p>Bank Name</p>
              <p>{{ kycForm.bank_name.value }}</p>
            </n-space>
            <n-space justify="space-between">
              <p>IFSC Code</p>
              <p>{{ kycForm.ifsc_code.value }}</p>
            </n-space>
          </n-space>
        </n-card>
      </n-grid-item>
      <n-grid-item span="1 xs:1 s:2 m:2 l:2">
        <n-card
          style="
            background-color: rgb(237, 240, 249);
            border-radius: 10px;
            margin-top: 10px;
            margin-bottom: 10px;
          "
        >
          <n-space :vertical="true">
            <n-space justify="space-between">
              <p>Reference No.</p>
              <p>{{ props.selectedItem.reference_no }}</p>
            </n-space>
            <n-space justify="space-between">
              <p>Paid Amount</p>
              <p>{{ props.selectedItem.paid_amount }}</p>
            </n-space>
            <n-space justify="space-between">
              <p>COD Amount</p>
              <p>{{ props.selectedItem.cycle_amount }}</p>
            </n-space>
            <n-space justify="space-between">
              <p>Pending Invoice Amount</p>
              <p>{{ props.selectedItem.pending_invoice_amount }}</p>
            </n-space>
            <div style="height: 1px; background-color: #736f6f; display: flex"></div>
            <n-space justify="space-between">
              <p>Payable Amount</p>
              <p>{{ payable_amount }}</p>
            </n-space>
          </n-space>
        </n-card>
      </n-grid-item>
    </n-grid>

    <n-space justify="center">
      <div style="display: flex; flex-direction: column">
        <n-space>
          <n-h6 style="font-weight: bold; margin-top: 5px; width: 200px"
            >Select Transaction Type*</n-h6
          >
          <n-select
            style="width: 300px"
            v-model:value="selectTransactionType"
            :options="options"
            default-value="credit"
          />
        </n-space>
        <n-space>
          <n-h6 style="font-weight: bold; margin-top: 5px; width: 200px">Description</n-h6>
          <n-input
            v-model:value="transactionData.description"
            placeholder="Description"
            style="width: 300px"
          />
        </n-space>
        <n-space>
          <n-h6 style="font-weight: bold; margin-top: 5px; width: 200px">Amount</n-h6>
          <n-input
            v-model:value="transactionData.amount"
            placeholder="Amount"
            style="width: 300px"
          />
        </n-space>
        <n-space>
          <n-h6 style="font-weight: bold; margin-top: 5px; width: 200px">Transaction ID</n-h6>
          <n-input
            v-model:value="transactionData.transaction_id"
            placeholder="Transaction ID"
            style="width: 300px"
          />
        </n-space>
      </div>
    </n-space>
    <n-space justify="center">
      <n-button round type="info" @click="makeTransaction" :loading="isLoading" style="width: 150px"
        >Save</n-button
      >
    </n-space>
  </n-space>
</template>
<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { makeCodTransactionStatus } from '@/api/finance/codcycle';
  import { getUserCompanyProfileKycMetaDataBySuperAdmin } from '@/api/settings/companyprofile';
  import { useMessage } from 'naive-ui';

  const selectTransactionType: any = ref('credit');
  const isLoading: any = ref(false);
  const kycForm: any = ref({
    company_type: {
      value: null,
      is_active: true,
    },
    cnic_name: {
      value: null,
      is_active: true,
    },
    cnic_number: {
      value: null,
      is_active: true,
    },
    cnic_front: {
      value: null,
      is_active: true,
    },
    cnic_back: {
      value: null,
      is_active: true,
    },
    ntn_legal_name: {
      value: null,
      is_active: true,
    },
    ntn_number: {
      value: null,
      is_active: true,
    },
    ntn_file: {
      value: null,
      is_active: true,
    },
    account_holder_name: {
      value: null,
      is_active: true,
    },
    bank_name: {
      value: null,
      is_active: true,
    },
    bank_document_file: {
      value: null,
      is_active: true,
    },
    account_number: {
      value: null,
      is_active: true,
    },
    ifsc_code: {
      value: null,
      is_active: true,
    },
    kyc_verified: {
      value: 'false',
      is_active: true,
    },
  });
  const Loading = window['$loading'] || null;
  const message = useMessage();
  const emits = defineEmits(['success']);
  const props = defineProps({
    selectedItem: {
      type: Object,
      default: function () {
        return {};
      },
    },
  });

  getUserCompanyProfileKycMetaDataBySuperAdmin(props.selectedItem.merchant_id)
    .then(({ result }) => {
      for (const key in result) {
        kycForm.value[key].value = result[key].value ? result[key].value : null;
        kycForm.value[key].is_active = result[key].is_active == 1;
        kycForm.value[key].id = result[key].id;
      }
      Loading.finish();
    })
    .catch((result) => {
      message.error(result);
      Loading.finish();
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
  const payable_amount = computed(
    () => props.selectedItem.payable_amount - props.selectedItem.pending_invoice_amount
  );
  const transactionData: any = ref({
    amount: payable_amount.value,
  });
  function makeTransaction() {
    if (selectTransactionType.value) {
      if (transactionData.value.amount <= props.selectedItem.cycle_amount) {
        const data = {
          cod_cycle_id: props.selectedItem.id,
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
        makeCodTransactionStatus(data)
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
        window['$message'].error(`Amount must be greater or equal to ${payable_amount.value}`);
      }
    } else {
      window['$message'].error('Please select transaction type');
    }
  }
</script>
