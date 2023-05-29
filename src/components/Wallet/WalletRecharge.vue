<template>
  <n-space :vertical="true" style="margin: 30px">
    <n-grid cols="2 s:1 m:2 l:3 xl:3" responsive="screen">
      <n-grid-item style="margin: 10px; cursor: pointer" @click="handleChange('creditdebit')">
        <n-space :vertical="true" class="zoom">
          <n-card style="height: 150px; position: relative; justify-content: center">
            <img
              v-if="creditdebitRef"
              src="https://d10srchmli830n.cloudfront.net/1638367864209_completed_check.svg"
              style="position: absolute; right: 0; top: 0; width: 40px; margin: 10px"
            />
            <img src="/src/assets/icons/credtidebit.png" style="padding: 30px" />
          </n-card>
          <n-space justify="center">
            <p>Pay with Credit/Debit Card</p>
          </n-space>
        </n-space>
      </n-grid-item>
      <n-grid-item style="margin: 10px; cursor: pointer" @click="handleChange('easypaisa')">
        <n-space :vertical="true" class="zoom">
          <n-card style="height: 150px; position: relative; display: flex; justify-content: center">
            <img
              v-if="easypaisaRef"
              src="https://d10srchmli830n.cloudfront.net/1638367864209_completed_check.svg"
              style="position: absolute; right: 0; top: 0; width: 40px; margin: 10px"
            />
            <n-space :vertical="true" style="display: flex; justify-content: center; height: 150px">
              <img
                src="/src/assets/icons/easypaisa.png"
                style="height: 60px; justify-content: center"
              />
            </n-space>
          </n-card>
          <n-space justify="center">
            <p>Pay with EasyPaisa</p>
          </n-space>
        </n-space>
      </n-grid-item>
      <n-grid-item style="margin: 10px; cursor: pointer" @click="handleChange('jazzcash')">
        <n-space :vertical="true" class="zoom">
          <n-card style="height: 150px; position: relative">
            <img
              v-if="jazzcashRef"
              src="https://d10srchmli830n.cloudfront.net/1638367864209_completed_check.svg"
              style="position: absolute; right: 0; top: 0; width: 40px; margin: 10px"
            />
            <n-space justify="center" style="gap: 0px 0px">
              <n-space style="gap: 0px 0px; height: 100px" :vertical="true" justify="center">
                <img
                  src="/src/assets/icons/logo_jazzcash.png"
                  style="height: 60px; display: flex; justify-content: center"
                />
              </n-space>
            </n-space>
          </n-card>
          <n-space justify="center">
            <p>Pay with Jazz Cash</p>
          </n-space>
        </n-space>
      </n-grid-item>
    </n-grid>
    <n-divider />
    <n-space justify="center">
      <n-button type="info" style="width: 200px" :loading="loading" @click="confirmationDialog"
        >Continue
      </n-button>
    </n-space>
  </n-space>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { useDialog } from 'naive-ui';
  import { useWalletStore } from '@/store/modules/wallet';

  const props = defineProps({
    amount: {
      type: String,
    },
  });
  const emits = defineEmits(['created']);
  const dialog = useDialog();
  const loading: any = ref(false);
  const creditdebitRef = ref(false);
  const easypaisaRef = ref(false);
  const jazzcashRef = ref(false);
  const paymentMethodSelected = ref('');
  const walletStore = useWalletStore();
  function handleChange(paymentMethod) {
    if (paymentMethod === 'creditdebit') {
      creditdebitRef.value = true;
      easypaisaRef.value = false;
      jazzcashRef.value = false;
      paymentMethodSelected.value = 'creditdebit';
    } else if (paymentMethod === 'easypaisa') {
      creditdebitRef.value = false;
      easypaisaRef.value = true;
      jazzcashRef.value = false;
      paymentMethodSelected.value = 'easypaisa';
    } else if (paymentMethod === 'jazzcash') {
      creditdebitRef.value = false;
      easypaisaRef.value = false;
      jazzcashRef.value = true;
      paymentMethodSelected.value = 'jazzcash';
    }
    // alert(paymentMethod);
    // checkedValueRef.value = (e.target as HTMLInputElement).value;
  }

  function continueRecharge() {
    loading.value = true;
    const data = {
      deposit_transaction_id: '1234567',
      deposit_service: paymentMethodSelected.value,
      amount: props.amount,
      service_status: 'Paid',
      deposit_status: 1,
    };
    walletStore.RechargeWallet(data).then((result) => {
      window['$message'].success(result.message);
      loading.value = false;
      emits('created');
    });
  }

  function confirmationDialog() {
    dialog.warning({
      title: 'Confirmation',
      content: () => 'Are you sure you want to continue?',
      positiveText: 'Yes',
      negativeText: 'No',
      onPositiveClick: continueRecharge,
    });
  }
</script>
<style scoped>
  .zoom {
    transition: transform 0.2s;
    margin: 0 auto; /* Animation */
  }

  .zoom:hover {
    transform: scale(
      1.1
    ); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
  }
</style>
