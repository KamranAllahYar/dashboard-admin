<template>
  <div :style="{ display: props.activeStep === 4 ? 'initial' : 'none' }">
    <n-card
      style="
        border-radius: 10px;
        margin-top: 10px;
        border-width: 1px;
        display: flex;
        justify-items: center;
      "
    >
      <div style="display: flex; justify-content: center">
        <n-steps :current="4" size="small">
          <n-step title="Order Details" />
          <n-step title="Add items & Quality check" />
          <n-step title="Review & Courier Partner" />
          <n-step title="Submit Order" />
        </n-steps>
      </div>
    </n-card>

    <n-card style="border-radius: 10px; margin-top: 20px; border-width: 1px; height: 400px">
      <n-space :vertical="true">
        <div style="display: flex; justify-content: center">
          <vue3-lottie :animationData="successTruck" :height="200" :width="200" />
        </div>

        <div style="display: flex; justify-content: center; flex-direction: column">
          <n-space :vertical="true">
            <div style="display: flex; justify-content: center; flex-direction: column">
              <div style="display: flex; justify-content: center">
                <p>Order is submitted successfully </p>
              </div>
              <div style="display: flex; justify-content: center; margin-bottom: 20px">
                <p>Tracking ID is: {{ stepThreeData?.data?.shipments[0].tracking_id }}</p>
              </div>
              <div style="display: flex; justify-content: center">
                <n-button
                  type="info"
                  style="
                    font-weight: bold;
                    border-radius: 10px;
                    margin-left: 10px;
                    justify-self: center;
                    width: 300px;
                  "
                  @click="createNewOrder"
                  >Create new order</n-button
                >
              </div>
              <div style="display: flex; justify-content: center; margin-top: 20px">
                <n-button
                  @click="$router.push('/orders/list')"
                  type="info"
                  style="
                    font-weight: bold;
                    border-radius: 10px;
                    margin-left: 10px;
                    justify-self: center;
                    width: 300px;
                  "
                  >Show Orders List</n-button
                >
              </div>
            </div>
          </n-space>
        </div>
      </n-space>
    </n-card>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { Vue3Lottie } from 'vue3-lottie';
  import successTruckJson from '@/lottie/success-truck.json';
  const emits = defineEmits(['createNewOrder']);
  // const truck = ref(truckJson);
  const successTruck = ref(successTruckJson);
  const props = defineProps({
    stepOneData: {
      type: Object,
      default: function () {
        return {};
      },
    },
    activeStep: {
      type: Number,
      default: 0,
    },
    stepTwoData: {
      type: Object,
      default: function () {
        return {};
      },
    },
    stepThreeData: {
      type: Object,
      default: function () {
        return {};
      },
    },
  });

  function createNewOrder() {
    emits('createNewOrder', true);
  }
</script>
