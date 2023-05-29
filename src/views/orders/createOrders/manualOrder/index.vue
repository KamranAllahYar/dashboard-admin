<template>
  <n-space :vertical="true" style="margin: 10px">
    <div>
      <manual-order-step-one @stepOneOrder="getStepOneFormData" :active-step="currentRef" />
      <manual-order-step-two
        @back="backStep"
        @stepTwoOrder="getStepTwoFormData"
        :active-step="currentRef"
      />
      <manual-order-step-three
        @stepThreeOrder="getStepThreeFormData"
        :stepOneData="stepOne"
        :stepTwoData="stepTwo"
        :proceed="orderProceed"
        :active-step="currentRef"
      />
      <manual-order-step-four
        @createNewOrder="newOrder"
        :stepOneData="stepOne"
        :stepTwoData="stepTwo"
        :stepThreeData="response"
        :active-step="currentRef"
      />
    </div>
  </n-space>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import ManualOrderStepOne from '@/components/CreateOrder/ManualOrderStepOne.vue';
  import ManualOrderStepTwo from '@/components/CreateOrder/ManualOrderStepTwo.vue';
  import ManualOrderStepThree from '@/components/CreateOrder/ManualOrderStepThree.vue';
  import { useManualOrder } from '@/hooks/order/useManualOrder';
  const response: any = ref({});
  const { stepOne, stepTwo } = useManualOrder();
  let currentRef = ref<Number | null>(1);
  let orderProceed = false;

  function backStep() {
    currentRef.value = 1;
  }

  function newOrder() {
    location.reload();
  }
  function getStepThreeFormData(value) {
    response.value = value;
    currentRef.value = 4;
  }
  function getStepOneFormData(value) {
    stepOne.value = value;
    currentRef.value = 2;
  }
  function getStepTwoFormData(value) {
    stepTwo.value = value;
    currentRef.value = 3;
  }
</script>
<style lang="less" scoped>
  .fontSize {
    font-size: 12px;
    color: rgb(38, 63, 151);
  }
</style>
