<template>
  <n-card style="border-radius: 10px; margin-top: 20px; border-width: 1px">
    <n-h2 style="font-weight: bold; color: rgb(38, 63, 151)">Select Courier Partner</n-h2>

    <n-radio-group v-model:value="courier" name="merchant" style="width: 100%; padding-right: 20px">
      <n-card
        v-for="item in list"
        :key="item.merchant_courier_id"
        style="padding: 1px; margin: 10px; border-radius: 10px; border-width: 2px"
      >
        <n-space>
          <div>
            <n-icon v-if="isRegistered(item)" size="20" color="#0e7a0d">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 24 24"
              >
                <path
                  d="M23 11.99L20.56 9.2l.34-3.69l-3.61-.82L15.4 1.5L12 2.96L8.6 1.5L6.71 4.69L3.1 5.5l.34 3.7L1 11.99l2.44 2.79l-.34 3.7l3.61.82l1.89 3.2l3.4-1.47l3.4 1.46l1.89-3.19l3.61-.82l-.34-3.69l2.44-2.8zm-3.95 1.48l-.56.65l.08.85l.18 1.95l-1.9.43l-.84.19l-.44.74l-.99 1.68l-1.78-.77l-.8-.34l-.79.34l-1.78.77l-.99-1.67l-.44-.74l-.84-.19l-1.9-.43l.18-1.96l.08-.85l-.56-.65L3.67 12l1.29-1.48l.56-.65l-.09-.86l-.18-1.94l1.9-.43l.84-.19l.44-.74l.99-1.68l1.78.77l.8.34l.79-.34l1.78-.77l.99 1.68l.44.74l.84.19l1.9.43l-.18 1.95l-.08.85l.56.65l1.29 1.47l-1.28 1.48z"
                  fill="currentColor"
                />
                <path
                  d="M10.09 13.75l-2.32-2.33l-1.48 1.49l3.8 3.81l7.34-7.36l-1.48-1.49z"
                  fill="currentColor"
                />
              </svg>
            </n-icon>
            <n-radio v-else :key="item.merchant_courier_id" :value="item" />
          </div>
          <n-space :vertical="true">
            <div style="font-weight: bold; font-size: 13px; color: rgb(38, 63, 151)"
              >{{ item.name }}
            </div>
            <div class="fontSize" style="color: rgb(38, 63, 151); line-height: 10px"
              >Model Type - {{ item.type }}</div
            >
          </n-space>
        </n-space>
      </n-card>
    </n-radio-group>
    <div style="display: flex; justify-content: center">
      <n-button @click="register">Register</n-button>
    </div>
    <n-modal style="width: 30%" v-model:show="showCallCourierAreas" preset="dialog">
      <template #header>
        <div>Select Area</div>
      </template>
      <n-space :vertical="true">
        <call-courier-areas
          :city="props.city"
          :merchantCourierId="courier.merchant_courier_id"
          :addressId="props.addressId"
          @selected="
            getList();
            showCallCourierAreas = false;
          "
        />
      </n-space>
    </n-modal>
  </n-card>
</template>
<script lang="ts" setup>
  import { userPagination } from '@/hooks/userPagination';
  import { courierList, registerPickupLocationWithCourier } from '@/api/courier';
  import { ref } from 'vue';
  import CallCourierAreas from '@/components/Courier/CallCourierAreas.vue';
  const emits = defineEmits(['registered']);

  const formValue: any = ref({});
  const showCallCourierAreas: any = ref(false);
  const props = defineProps({
    addressId: {
      type: [Number, String],
    },
    city: {
      type: String,
    },
    registeredWith: {
      type: [Array],
    },
  });
  const { list, page, itemCount, pageSize, params }: any = userPagination(courierList);
  params.value.is_active = 1;
  const courier: any = ref(null);
  const data: any = ref({
    merchant_courier_id: null,
    pickup_location_id: null,
  });
  const getList = () => {
    courierList({ ...params.value, page: page.value, pageSize: pageSize.value }).then(
      ({ result }) => {
        list.value = result.data;
        itemCount.value = result.meta.total;
      }
    );
  };
  getList();

  function register() {
    if (courier.value !== null) {
      if (courier.value.name === 'CallCourier') {
        showCallCourierAreas.value = true;
      } else {
        data.value.merchant_courier_id = courier.value.merchant_courier_id;
        data.value.pickup_location_id = props.addressId;
        registerPickupLocationWithCourier(data.value).then(({ result }) => {
          window['$message'].success(result.message);
          emits('registered');
        });
      }
    } else {
      window['$message'].error('Please select courier');
    }
  }
  function isRegistered(item) {
    return (props.registeredWith || []).some(
      (value: any) => value.merchant_courier_id === item.merchant_courier_id
    );
  }
</script>
