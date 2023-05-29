<template>
  <n-space vertical>
    <n-space
      v-if="list.length"
      style="
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        margin-left: 10px;
        margin-right: 10px;
      "
    >
      <n-space>
        <n-h6 style="font-weight: bold; color: rgb(38, 63, 151)">Select Courier Partner</n-h6>
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-icon size="20" color="#0e7a0d">
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
          </template>
          Courier is registered with pick up location
        </n-tooltip>
      </n-space>
    </n-space>
    <n-radio-group
      v-model:value="selectedCourier"
      name="merchant_courier_id"
      :onchange="updateValue(selectedCourier)"
      style="width: 100%; padding-right: 20px"
    >
      <n-card
        class="courier-card"
        v-for="(item, index) in list"
        :key="index"
        style="margin: 10px; border-radius: 10px; border-width: 2px; padding: 0px !important"
      >
        <n-space style="margin: 20px">
          <div v-if="isRegistered(item)">
            <n-icon size="20" color="#0e7a0d">
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
            <div v-if="item.type === 'self'">
              <n-radio
                :key="item.merchant_courier_id"
                :value="item"
                style="margin-left: 2px"
                :disabled="!item.platform_service_charges"
              />
            </div>
            <div v-else-if="item.type === 'marketplace'">
              <n-radio
                :key="item.merchant_courier_id"
                :value="item"
                style="margin-left: 10px"
                :disabled="!item.shipping_charge || item.courierMessage"
              />
            </div>
          </div>
          <div v-else>
            <n-radio :disabled="true" style="margin-left: 28px" />
          </div>
          <n-space :vertical="true">
            <div style="font-weight: bold; font-size: 13px; color: rgb(38, 63, 151)">
              {{ item.name }}
            </div>
            <div class="fontSize" style="color: rgb(38, 63, 151); line-height: 10px">
              <n-space>
                <n-icon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M8 8h8v8H8z" />
                      <rect x="4" y="4" width="16" height="16" rx="2" />
                    </g>
                  </svg>
                </n-icon>
                Model Type - {{ item.type }}
              </n-space>
            </div>
            <div class="fontSize" style="color: rgb(38, 63, 151); line-height: 10px">
              <n-space>
                <n-icon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 32 32"
                  >
                    <path d="M4 16h12v2H4z" fill="currentColor" />
                    <path d="M2 11h10v2H2z" fill="currentColor" />
                    <path
                      d="M29.919 16.606l-3-7A.999.999 0 0 0 26 9h-3V7a1 1 0 0 0-1-1H6v2h15v12.556A3.992 3.992 0 0 0 19.142 23h-6.284a4 4 0 1 0 0 2h6.284a3.98 3.98 0 0 0 7.716 0H29a1 1 0 0 0 1-1v-7a.997.997 0 0 0-.081-.394zM9 26a2 2 0 1 1 2-2a2.002 2.002 0 0 1-2 2zm14-15h2.34l2.144 5H23zm0 15a2 2 0 1 1 2-2a2.002 2.002 0 0 1-2 2zm5-3h-1.142A3.995 3.995 0 0 0 23 20v-2h5z"
                      fill="currentColor"
                    />
                  </svg>
                </n-icon>
                <p style="margin-top: 2px"> Average Delivery Time - {{ item.average_time }} </p>
              </n-space>
            </div>
            <div class="fontSize" style="color: rgb(38, 63, 151); line-height: 10px">
              <n-space>
                <n-icon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 16 16"
                  >
                    <g fill="none">
                      <path
                        d="M11.691 1.038A.5.5 0 0 1 12 1.5V4h2.5a.5.5 0 0 1 .354.854l-2 2A.5.5 0 0 1 12.5 7H9.707l-.74.741A1.001 1.001 0 0 1 8 9a1 1 0 0 1-1-1l.001-.046a1 1 0 0 1 1.258-.92L9 6.293V3.5a.5.5 0 0 1 .146-.354l2-2a.5.5 0 0 1 .545-.108zM12.293 6l1-1H11.5a.5.5 0 0 1-.5-.5V2.707l-1 1V6h2.293zm1.652 1.176a6 6 0 1 1-5.122-5.12l-.383.383a1.5 1.5 0 0 0-.354.562L8 3a5 5 0 1 0 5 4.914a1.5 1.5 0 0 0 .56-.353l.384-.385zM8 4.5A3.5 3.5 0 1 0 11.5 8h-1A2.5 2.5 0 1 1 8 5.5v-1z"
                        fill="currentColor"
                      />
                    </g>
                  </svg>
                </n-icon>
                <p style="margin-top: 2px"> Success Rate - {{ item.success_rate }} </p>
              </n-space>
            </div>
            <div
              v-if="item.shipping_charge === undefined && !item.platform_service_charges"
              class="fontSize"
              style="color: rgb(38, 63, 151); line-height: 10px"
            >
              <n-space>
                <n-icon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M11 17h2v-1h1c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1h-3v-1h4V8h-2V7h-2v1h-1c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h3v1H9v2h2v1zm9-13H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4V6h16v12z"
                      fill="currentColor"
                    />
                  </svg>
                </n-icon>
                <p style="margin-top: 2px">
                  Shipment Charges -
                  {{
                    item.shipping_charge?.message
                      ? item.shipping_charge?.message
                      : 'something went wrong '
                  }}
                </p>
              </n-space>
            </div>
            <div
              v-else-if="item.type === 'self'"
              class="fontSize"
              style="color: rgb(38, 63, 151); line-height: 10px"
            >
              <!--              Platform Service Charges - Rs.{{ item.platform_service_charges }}-->
            </div>
            <div v-else class="fontSize" style="color: rgb(38, 63, 151); line-height: 10px">
              <span v-if="item.courierMessage" style="color: red">
                {{ item.courierMessage }}
              </span>
              <span v-else>
                <n-space>
                  <n-icon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M11 17h2v-1h1c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1h-3v-1h4V8h-2V7h-2v1h-1c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h3v1H9v2h2v1zm9-13H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4V6h16v12z"
                        fill="currentColor"
                      />
                    </svg>
                  </n-icon>
                  <p style="margin-top: 2px"> Shipment Charges - Rs.{{ item.shipping_charge }} </p>
                </n-space>
              </span>
            </div>
          </n-space>
        </n-space>

        <div
          v-if="!isRegistered(item)"
          style="
            background-color: #ff3939;
            padding: 10px;
            border-bottom-right-radius: 10px;
            border-bottom-left-radius: 10px;
          "
        >
          <div
            class="fontSize"
            style="color: rgb(255, 255, 255); line-height: 12px; font-size: 12px"
          >
            Selected Pickup Location is not associated with {{ item.name }}.
          </div>
          <n-popconfirm @positive-click="handlePositiveClick(item)" trigger="click">
            <template #trigger>
              <p
                style="color: rgb(252, 242, 242); margin-top: 1px; font-size: 12px; cursor: pointer"
                >Please click here to register</p
              >
            </template>
            Are you sure to register&nbsp;<b>{{ item.name }}</b
            >&nbsp;with selected pickup location?
          </n-popconfirm>
        </div>
      </n-card>
    </n-radio-group>
    <n-modal style="width: 30%" v-model:show="showCallCourierAreas" preset="dialog">
      <template #header>
        <div>Select Area</div>
      </template>
      <n-space :vertical="true">
        <call-courier-areas
          :city="props.city"
          :merchantCourierId="selectedMerchantCourier"
          :addressId="props.shippingAddressId"
          @selected="
            getList();
            showCallCourierAreas = false;
          "
        />
      </n-space>
    </n-modal>
  </n-space>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { registerPickupLocationWithCourier } from '@/api/courier';
  import { getAddressById } from '@/api/settings/addresses';

  const showCallCourierAreas: any = ref(false);
  const selectedMerchantCourier: any = ref();
  const emits = defineEmits(['selectedCourier', 'locationRegistered']);
  const selectedCourier: any = ref(null);
  const props = defineProps({
    list: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: [],
    },
    city: {
      type: String,
    },
    shippingAddressId: String,
    selectedAddressDetails: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {},
    },
  });

  function handlePositiveClick(courier) {
    if (courier.name === 'CallCourier') {
      selectedMerchantCourier.value = courier.merchant_courier_id;
      showCallCourierAreas.value = true;
    } else {
      const data: any = ref({
        merchant_courier_id: null,
        pickup_location_id: null,
      });
      data.value.merchant_courier_id = courier.merchant_courier_id;
      data.value.pickup_location_id = props.shippingAddressId;
      registerPickupLocationWithCourier(data.value).then(({ result }) => {
        window['$message'].success(result.message);
        emits('locationRegistered');
        // stepThree.value.merchant_courier_id = null;
        // stepThree.value.courier_name = null;
        getAddressById(props.shippingAddressId).then(
          // eslint-disable-next-line vue/no-mutating-props
          ({ result }) => (props.selectedAddressDetails.value = result.data)
        );
      });
    }
  }
  function isRegistered(item) {
    return (props.selectedAddressDetails.registered_with || []).some(
      (value: any) => value.merchant_courier_id === item.merchant_courier_id
    );
  }
  function updateValue(item) {
    emits('selectedCourier', item);
  }
</script>
<style>
  .courier-card > .n-card__content {
    padding: 0 !important;
  }
</style>
