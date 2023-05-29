<template>
  <n-space vertical>
    <n-radio-group
      v-model:value="selectedPickupLocation"
      name="address"
      style="width: 100%; padding-right: 20px"
    >
      <n-card
        v-for="item in formValue"
        :key="item.id"
        style="padding: 1px; margin: 10px; border-radius: 10px; border-width: 2px"
      >
        <n-space style="display: flex">
          <n-radio
            :value="item.id"
            style="display: flex; justify-content: space-between; flex-direction: row"
          >
            <n-space style="display: flex; justify-content: space-between; flex-direction: row">
              <n-space :vertical="true">
                <div style="font-weight: bold; font-size: 13px; color: rgb(38, 63, 151)"
                  >{{ item.contact_name }} - {{ item.store_name }}
                </div>
                <div class="fontSize" style="color: rgb(38, 63, 151); line-height: 10px"
                  >ID - {{ item.id }}</div
                >
                <div class="fontSize" style="color: rgb(38, 63, 151); line-height: 10px">{{
                  item.address_line_1
                }}</div>
                <div class="fontSize" style="color: rgb(38, 63, 151); line-height: 10px"
                  >{{ item.city }} {{ item.state }}</div
                >
                <div class="fontSize" style="color: rgb(38, 63, 151); line-height: 10px">{{
                  item.phone
                }}</div>
              </n-space>
            </n-space>
          </n-radio>
        </n-space>
      </n-card>
    </n-radio-group>
    <n-space justify="center">
      <n-button @click="assignBulkShipments" type="success" round>Create Shipments</n-button>
    </n-space>
  </n-space>
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { getAddresses } from '@/api/settings/addresses';
  import { useMessage } from 'naive-ui';
  import { createBulkOrderShipments } from '@/api/order';

  const message = useMessage();
  const selectedPickupLocation: any = ref();
  const formValue: any = ref({});
  const orders: any = ref({});
  const emits = defineEmits(['created']);
  const props = defineProps({
    // eslint-disable-next-line vue/prop-name-casing
    orders: {
      type: Array,
    },
  });
  const createShipments = ref({
    billing_address_id: null,
    shipping_address_id: null,
  });
  onMounted(() => {
    getAddresses({}).then(({ result }) => (formValue.value = result.data));
  });
  function assignBulkShipments() {
    if (selectedPickupLocation.value) {
      createShipments.value.shipping_address_id = selectedPickupLocation.value;
      createShipments.value.billing_address_id = selectedPickupLocation.value;
      orders.value.order_ids = props.orders;
      createBulkOrderShipments(createShipments.value, orders.value).then(({ result }) => {
        message.success(result.message);
        emits('created');
      });
    } else {
      message.error('Please select pickup location');
    }
  }
</script>
