<template>
  <div :style="{ display: props.activeStep === 3 ? 'initial' : 'none' }">
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
        <n-steps :current="3" size="small">
          <n-step title="Order Details" />
          <n-step title="Add items & Quality check" />
          <n-step title="Review & Courier Partner" />
          <n-step title="Submit Order" /> </n-steps
      ></div>
    </n-card>
    <n-grid :x-gap="12" :y-gap="8" cols="5 xs:2 s:2 m:2 l:5" responsive="screen">
      <n-grid-item span="3 xs:2 s:2 m:2 l:3">
        <n-card style="border-radius: 10px; margin-top: 20px; border-width: 1px">
          <n-h1 style="font-weight: bold; color: rgb(38, 63, 151)">Review</n-h1>
          <div style="font-size: 13px; color: #808bb2"
            >Please verify the orders and customer details and click on Place orders to proceed with
            order placement.</div
          >
          <div v-if="!showOrderDetailEdit">
            <n-space style="display: flex; justify-content: space-between; margin-top: 20px">
              <n-h6 style="font-weight: bold; color: rgb(38, 63, 151)">Order Details</n-h6>
              <n-button style="font-weight: bold; border-radius: 10px" @click="order_detail_edit">
                <template #icon>
                  <n-icon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M3 10h11v2H3v-2zm0-2h11V6H3v2zm0 8h7v-2H3v2zm15.01-3.13l.71-.71a.996.996 0 0 1 1.41 0l.71.71c.39.39.39 1.02 0 1.41l-.71.71l-2.12-2.12zm-.71.71l-5.3 5.3V21h2.12l5.3-5.3l-2.12-2.12z"
                        fill="currentColor"
                      />
                    </svg>
                  </n-icon>
                </template>
                Edit
              </n-button>
            </n-space>
            <n-space style="overflow-x: auto">
              <n-table
                :single-line="true"
                :bordered="true"
                style="width: 800px; word-wrap: break-word; table-layout: fixed"
              >
                <thead>
                  <tr>
                    <th class="table-header-custom-style auto-width">
                      <n-tooltip trigger="hover" placement="top">
                        <template #trigger>
                          <div class="auto-width">SHIPMENT</div>
                        </template>
                        <div>SHIPMENT</div>
                      </n-tooltip>
                    </th>
                    <th class="table-header-custom-style auto-width">
                      <n-tooltip trigger="hover" placement="top">
                        <template #trigger>
                          <div class="auto-width">ORDER TYPE</div>
                        </template>
                        <div>ORDER TYPE</div>
                      </n-tooltip>
                    </th>
                    <th class="table-header-custom-style auto-width">
                      <n-tooltip trigger="hover" placement="top">
                        <template #trigger>
                          <div class="auto-width">MULTI PACKAGE SERVICE</div>
                        </template>
                        <div>MULTI PACKAGE SERVICE</div>
                      </n-tooltip>
                    </th>

                    <th class="table-header-custom-style auto-width">
                      <n-tooltip trigger="hover" placement="top">
                        <template #trigger>
                          <div class="auto-width">TOTAL QUANTITY</div>
                        </template>
                        <div>TOTAL QUANTITY</div>
                      </n-tooltip>
                    </th>
                    <th class="table-header-custom-style auto-width">
                      <n-tooltip trigger="hover" placement="top">
                        <template #trigger>
                          <div class="auto-width">PAYMENT METHOD</div>
                        </template>
                        <div>PAYMENT METHOD</div>
                      </n-tooltip>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="table-row-custom-style">{{ formValueStepOne.order_place_type }}</td>
                    <td class="table-row-custom-style">{{ formValueStepOne.order_type }}</td>
                    <td class="table-row-custom-style">{{
                      formValueStepOne.multi_package_service
                    }}</td>

                    <td class="table-row-custom-style">{{ formValueStepOne.total_boxes }}</td>
                    <td class="table-row-custom-style">{{ formValueStepOne.payment_method }}</td>
                  </tr></tbody
                ></n-table
              >
            </n-space>

            <n-divider />
          </div>
          <div>
            <n-space style="display: flex; justify-content: space-between; margin-top: 20px">
              <n-h6 style="font-weight: bold; color: rgb(38, 63, 151)">Customer Details</n-h6>
              <n-button
                style="font-weight: bold; border-radius: 10px"
                @click="customer_detail_edit"
              >
                <template #icon>
                  <n-icon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M3 10h11v2H3v-2zm0-2h11V6H3v2zm0 8h7v-2H3v2zm15.01-3.13l.71-.71a.996.996 0 0 1 1.41 0l.71.71c.39.39.39 1.02 0 1.41l-.71.71l-2.12-2.12zm-.71.71l-5.3 5.3V21h2.12l5.3-5.3l-2.12-2.12z"
                        fill="currentColor"
                      />
                    </svg>
                  </n-icon>
                </template>
                Edit
              </n-button>
            </n-space>
            <n-space style="overflow-x: auto">
              <n-table
                :single-line="true"
                :bordered="true"
                style="width: 1300px; word-wrap: break-word; table-layout: fixed"
              >
                <thead>
                  <tr>
                    <th class="table-header-custom-style auto-width">
                      <n-tooltip trigger="hover" placement="top">
                        <template #trigger>
                          <div class="auto-width">NAME</div>
                        </template>
                        <div>NAME</div>
                      </n-tooltip>
                    </th>

                    <th class="table-header-custom-style auto-width">
                      <n-tooltip trigger="hover" placement="top">
                        <template #trigger>
                          <div class="auto-width">ADDRESS</div>
                        </template>
                        <div>ADDRESS</div>
                      </n-tooltip>
                    </th>

                    <th class="table-header-custom-style auto-width">
                      <n-tooltip trigger="hover" placement="top">
                        <template #trigger>
                          <div class="auto-width">COUNTRY CODE</div>
                        </template>
                        <div>COUNTRY CODE</div>
                      </n-tooltip>
                    </th>

                    <th class="table-header-custom-style auto-width">
                      <n-tooltip trigger="hover" placement="top">
                        <template #trigger>
                          <div class="auto-width">PHONE NUMBER</div>
                        </template>
                        <div>PHONE NUMBER</div>
                      </n-tooltip>
                    </th>

                    <th class="table-header-custom-style auto-width">
                      <n-tooltip trigger="hover" placement="top">
                        <template #trigger>
                          <div class="auto-width">ZIP CODE</div>
                        </template>
                        <div>ZIP CODE</div>
                      </n-tooltip>
                    </th>

                    <th class="table-header-custom-style auto-width">
                      <n-tooltip trigger="hover" placement="top">
                        <template #trigger>
                          <div class="auto-width">EMAIL</div>
                        </template>
                        <div>EMAIL</div>
                      </n-tooltip>
                    </th>
                    <th class="table-header-custom-style auto-width">
                      <n-tooltip trigger="hover" placement="top">
                        <template #trigger>
                          <div class="auto-width">CITY</div>
                        </template>
                        <div>CITY</div>
                      </n-tooltip>
                    </th>

                    <th class="table-header-custom-style auto-width">
                      <n-tooltip trigger="hover" placement="top">
                        <template #trigger>
                          <div class="auto-width">COUNTRY</div>
                        </template>
                        <div>COUNTRY</div>
                      </n-tooltip>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="table-row-custom-style">{{ formValueStepOne.name }}</td>
                    <td class="table-row-custom-style">{{ formValueStepOne.address1 }}</td>
                    <td class="table-row-custom-style">{{ formValueStepOne.country_code }}</td>
                    <td class="table-row-custom-style">{{ formValueStepOne.phone }}</td>
                    <td class="table-row-custom-style">{{ formValueStepOne.zip_code }}</td>
                    <td class="table-row-custom-style">{{ formValueStepOne.email }}</td>
                    <td class="table-row-custom-style">{{ formValueStepOne.city }}</td>
                    <td class="table-row-custom-style">{{ formValueStepOne.country }}</td>
                  </tr></tbody
                ></n-table
              >
            </n-space>
            <n-divider />
          </div>
          <n-space style="display: flex; justify-content: space-between; margin-top: 20px">
            <n-h6 style="font-weight: bold; color: rgb(38, 63, 151)">Item Details</n-h6>
            <n-button style="font-weight: bold; border-radius: 10px" @click="item_detail_edit">
              <template #icon>
                <n-icon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M3 10h11v2H3v-2zm0-2h11V6H3v2zm0 8h7v-2H3v2zm15.01-3.13l.71-.71a.996.996 0 0 1 1.41 0l.71.71c.39.39.39 1.02 0 1.41l-.71.71l-2.12-2.12zm-.71.71l-5.3 5.3V21h2.12l5.3-5.3l-2.12-2.12z"
                      fill="currentColor"
                    />
                  </svg>
                </n-icon>
              </template>
              Edit
            </n-button>
          </n-space>
          <n-space style="overflow-x: auto">
            <n-table
              :single-line="true"
              :bordered="true"
              style="width: 1450px; word-wrap: break-word; table-layout: fixed"
            >
              <thead>
                <tr>
                  <th class="table-header-custom-style auto-width">
                    <n-tooltip trigger="hover" placement="top">
                      <template #trigger>
                        <div class="auto-width">ITEM NAME / SKU</div>
                      </template>
                      <div>ITEM NAME / SKU</div>
                    </n-tooltip>
                  </th>
                  <th class="table-header-custom-style auto-width">
                    <n-tooltip trigger="hover" placement="top">
                      <template #trigger>
                        <div class="auto-width">VARIANT TITLE</div>
                      </template>
                      <div>VARIANT TITLE</div>
                    </n-tooltip>
                  </th>
                  <th class="table-header-custom-style auto-width">
                    <n-tooltip trigger="hover" placement="top">
                      <template #trigger>
                        <div class="auto-width">QUANTITY</div>
                      </template>
                      <div>QUANTITY</div>
                    </n-tooltip>
                  </th>
                  <th class="table-header-custom-style auto-width">
                    <n-tooltip trigger="hover" placement="top">
                      <template #trigger>
                        <div class="auto-width">ITEM PRICE</div>
                      </template>
                      <div>ITEM PRICE</div>
                    </n-tooltip>
                  </th>
                  <th class="table-header-custom-style auto-width">
                    <n-tooltip trigger="hover" placement="top">
                      <template #trigger>
                        <div class="auto-width">ITEM TAX</div>
                      </template>
                      <div>ITEM TAX</div>
                    </n-tooltip>
                  </th>
                  <th class="table-header-custom-style auto-width">
                    <n-tooltip trigger="hover" placement="top">
                      <template #trigger>
                        <div class="auto-width">PRICE WITH TAX</div>
                      </template>
                      <div>PRICE WITH TAX</div>
                    </n-tooltip>
                  </th>
                  <th class="table-header-custom-style auto-width">
                    <n-tooltip trigger="hover" placement="top">
                      <template #trigger>
                        <div class="auto-width">ITEM SUBTOTAL</div>
                      </template>
                      <div>ITEM SUBTOTAL</div>
                    </n-tooltip>
                  </th>
                  <th class="table-header-custom-style auto-width">
                    <n-tooltip trigger="hover" placement="top">
                      <template #trigger>
                        <div class="auto-width">ITEM HEIGHT</div>
                      </template>
                      <div>ITEM HEIGHT</div>
                    </n-tooltip>
                  </th>
                  <th class="table-header-custom-style auto-width">
                    <n-tooltip trigger="hover" placement="top">
                      <template #trigger>
                        <div class="auto-width">ITEM LENGTH</div>
                      </template>
                      <div>ITEM LENGTH</div>
                    </n-tooltip>
                  </th>
                  <th class="table-header-custom-style auto-width">
                    <n-tooltip trigger="hover" placement="top">
                      <template #trigger>
                        <div class="auto-width">ITEM BREADTH</div>
                      </template>
                      <div>ITEM BREADTH</div>
                    </n-tooltip>
                  </th>
                  <th class="table-header-custom-style auto-width">
                    <n-tooltip trigger="hover" placement="top">
                      <template #trigger>
                        <div class="auto-width">ITEM WEIGHT</div>
                      </template>
                      <div>ITEM WEIGHT</div>
                    </n-tooltip>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in formValueStepTwo.order_items" :key="index">
                  <td class="table-row-custom-style">{{ item.item_name }} / {{ item.sku }}</td>
                  <td class="table-row-custom-style">{{ item.variant_title }}</td>
                  <td class="table-row-custom-style">{{ item.quantity }}</td>
                  <td class="table-row-custom-style">{{ item.unit_price }}</td>
                  <td class="table-row-custom-style">{{ item.total_tax_percentage }}</td>
                  <td class="table-row-custom-style">{{ item.unit_price_with_taxes }}</td>
                  <td class="table-row-custom-style">{{ item.item_subtotal }}</td>
                  <td class="table-row-custom-style">{{ item.item_height }}</td>
                  <td class="table-row-custom-style">{{ item.item_length }}</td>
                  <td class="table-row-custom-style">{{ item.item_breadth }}</td>
                  <td class="table-row-custom-style">{{ item.item_weight }}</td>
                </tr></tbody
              ></n-table
            >
          </n-space>
          <n-divider />
          <div v-if="!showItemsDetailEdit">
            <n-space style="display: flex; justify-content: space-between; margin-top: 20px">
              <n-h6 style="font-weight: bold; color: rgb(38, 63, 151)">Shipment Details</n-h6>
            </n-space>
            <n-space style="overflow-x: auto">
              <n-table
                :single-line="true"
                :bordered="true"
                style="width: 500px; word-wrap: break-word; table-layout: fixed"
              >
                <thead>
                  <tr>
                    <th class="table-header-custom-style auto-width">
                      <n-tooltip trigger="hover" placement="top">
                        <template #trigger>
                          <div class="auto-width">WEIGHT (KG)</div>
                        </template>
                        <div>WEIGHT (KG)</div>
                      </n-tooltip>
                    </th>
                    <th class="table-header-custom-style auto-width">
                      <n-tooltip trigger="hover" placement="top">
                        <template #trigger>
                          <div class="auto-width">DIMENSIONS</div>
                        </template>
                        <div>DIMENSIONS</div>
                      </n-tooltip>
                    </th>
                    <th class="table-header-custom-style auto-width">
                      <n-tooltip trigger="hover" placement="top">
                        <template #trigger>
                          <div class="auto-width">INVOICE VALUE</div>
                        </template>
                        <div>INVOICE VALUE</div>
                      </n-tooltip>
                    </th>
                    <th class="table-header-custom-style auto-width">
                      <n-tooltip trigger="hover" placement="top">
                        <template #trigger>
                          <div class="auto-width">CLIENT ORDER ID</div>
                        </template>
                        <div>CLIENT ORDER ID</div>
                      </n-tooltip>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="table-row-custom-style">{{ formValueStepTwo.shipment_weight }}</td>
                    <td class="table-row-custom-style"
                      >{{ formValueStepTwo.shipment_length }}*{{
                        formValueStepTwo.shipment_breadth
                      }}*{{ formValueStepTwo.shipment_height }}</td
                    >
                    <td class="table-row-custom-style">{{ formValueStepTwo.shipment_amount }}</td>
                    <td class="table-row-custom-style">{{ formValueStepTwo.client_order_id }}</td>
                  </tr></tbody
                ></n-table
              >
            </n-space>
          </div>
          <n-h2
            style="
              color: rgb(38, 63, 151);
              display: flex;
              align-self: end;
              font-weight: 600;
              text-align: center;
              letter-spacing: 0.2px;
            "
          >
            Invoice Value: {{ formValueStepTwo.shipment_amount }}</n-h2
          >
        </n-card>
      </n-grid-item>
      <n-grid-item span="2 xs:2 s:2 m:2 l:2">
        <n-card style="border-radius: 10px; margin-top: 20px; border-width: 1px">
          <div>
            <n-space style="display: flex; justify-content: space-between">
              <n-h6 style="font-weight: bold; color: rgb(38, 63, 151)">Pickup Location</n-h6>
              <n-button style="font-weight: bold; border-radius: 10px" @click="pickupLocationEdit">
                <template #icon>
                  <n-icon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M3 10h11v2H3v-2zm0-2h11V6H3v2zm0 8h7v-2H3v2zm15.01-3.13l.71-.71a.996.996 0 0 1 1.41 0l.71.71c.39.39.39 1.02 0 1.41l-.71.71l-2.12-2.12zm-.71.71l-5.3 5.3V21h2.12l5.3-5.3l-2.12-2.12z"
                        fill="currentColor"
                      />
                    </svg>
                  </n-icon>
                </template>
                Edit
              </n-button>
            </n-space>

            <n-card
              style="padding: 1px; border-radius: 10px; border-width: 2px; margin-right: 100px"
            >
              <n-space :vertical="true">
                <div style="font-weight: bold; font-size: 13px"
                  >{{ selectedAddressDetails.contact_name }} -
                  {{ selectedAddressDetails.store_name }}
                </div>
                <div class="fontSize">ID - {{ selectedAddressDetails.id }}</div>
                <div class="fontSize">{{ selectedAddressDetails.address_line_1 }}</div>
                <div class="fontSize"
                  >{{ selectedAddressDetails.city }} {{ selectedAddressDetails.state }}</div
                >
                <div class="fontSize">{{ selectedAddressDetails.phone }}</div>
              </n-space>
            </n-card>
          </div>

          <select-order-courier-list
            @selectedCourier="updateSelectedCourier"
            :list="list"
            :city="selectedAddressDetails.city"
            @locationRegistered="updateCourierList"
            :shippingAddressId="formValueStepOne.shipping_address_id"
            :selectedAddressDetails="selectedAddressDetails"
          />
        </n-card>
      </n-grid-item>
    </n-grid>
    <n-card
      style="
        width: 100%;
        border-radius: 10px;
        margin-bottom: 40px;
        margin-top: 10px;
        border-width: 1px;
        display: flex;
        justify-content: space-between;
      "
    >
      <n-space style="display: flex; justify-content: space-between">
        <span></span>
        <div>
          <n-button
            v-if="!bool"
            @click="proceedOrder"
            type="info"
            style="font-weight: bold; border-radius: 10px"
          >
            Proceed
          </n-button>
          <n-button
            v-else
            icon-placement="right"
            @click="submitOrder"
            type="info"
            style="font-weight: bold; border-radius: 10px"
          >
            Submit Order
          </n-button>
        </div>
      </n-space>
    </n-card>

    <n-modal style="width: 50%" v-model:show="showOrderDetailEdit" preset="dialog">
      <template #header>
        <div style="font-weight: bold">Edit Order Details</div>
      </template>
      <n-space :vertical="true">
        <order-detail-edit :stepOne="stepOneEditFormData" @edited="getEditedData" />
      </n-space>
    </n-modal>
    <n-modal style="width: 50%" v-model:show="showCustomerDetailEdit" preset="dialog">
      <template #header>
        <div style="font-weight: bold">Edit Customer Details</div>
      </template>
      <n-space :vertical="true">
        <customer-detail-edit :stepOne="stepOneEditFormData" @edited="getEditedData" />
      </n-space>
    </n-modal>
    <n-modal style="width: 80%" v-model:show="showItemsDetailEdit" preset="dialog">
      <template #header>
        <div style="font-weight: bold">Edit Item Details</div>
      </template>
      <n-space :vertical="true">
        <item-detail-edit :stepTwo="stepTwoEditFormData" @edited="getStepTwoEditedData" />
      </n-space>
    </n-modal>
    <n-modal style="width: 50%" v-model:show="showPickUpAddressEdit" preset="dialog">
      <template #header>
        <div style="font-weight: bold">Edit Pickup Location</div>
      </template>
      <n-space :vertical="true">
        <address-location-edit
          @edited="getPickupLocationEditedData"
          :list="merchantAddressesList"
        />
      </n-space>
    </n-modal>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref, watch } from 'vue';
  import { courierChargesList, courierList } from '@/api/courier';
  import { userPagination } from '@/hooks/userPagination';
  import { getAddressById, getAddresses } from '@/api/settings/addresses';
  import { createOrder } from '@/api/order';
  import OrderDetailEdit from '@/components/CreateOrder/EditOrder/OrderDetailEdit.vue';
  import CustomerDetailEdit from '@/components/CreateOrder/EditOrder/CustomerDetailEdit.vue';
  import ItemDetailEdit from '@/components/CreateOrder/EditOrder/ItemDetailEdit.vue';
  import AddressLocationEdit from '@/components/CreateOrder/EditOrder/AddressLocationEdit.vue';
  import { useMessage } from 'naive-ui';
  import SelectOrderCourierList from '@/components/CreateOrder/SelectOrderCourierList.vue';

  const showOrderDetailEdit = ref(false);
  const showCustomerDetailEdit = ref(false);
  const showItemsDetailEdit = ref(false);
  const showShipmentDetailEdit = ref(false);
  const showPickUpAddressEdit = ref(false);
  const emits = defineEmits(['stepThreeOrder']);
  const selectedAddressDetails: any = ref({});
  const { list, page, itemCount, pageSize, params }: any = userPagination(courierList);
  params.value.is_active = 1;
  const bool = ref(false);
  const stepOneEditFormData: any = ref({});
  const stepTwoEditFormData: any = ref({});
  const formValueStepOne: any = ref({
    shipping_address_id: '',
  });
  const formValueStepTwo: any = ref({});
  const merchantAddressesList: any = ref({});
  const message = useMessage();
  const loading = ref(false);
  const selectedCourier: any = ref({
    merchant_courier_id: null,
    name: null,
    shipping_charge: null,
    platform_service_charges: null,
  });

  const stepThree = ref({
    merchant_courier_id: null,
    courier_name: null,
    shipping_charge: null,
  });
  const getList = () => {
    courierChargesList({
      ...params.value,
      page: page.value,
      pageSize: pageSize.value,
      origin: selectedAddressDetails.value.city,
      destination: formValueStepOne.value.city,
      weight: formValueStepTwo.value.shipment_weight,
      volume:
        formValueStepTwo.value.shipment_length *
        formValueStepTwo.value.shipment_breadth *
        formValueStepTwo.value.shipment_height,
      amount: formValueStepTwo.value.shipment_amount,
    }).then(({ result }) => {
      list.value = result.data;
      itemCount.value = result.meta.total;
    });
  };
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
    shipmentStepTwoData: {
      type: Object,
      default: function () {
        return {};
      },
    },
    proceed: {
      type: Boolean,
      default: false,
    },
  });
  watch(
    () => props.stepOneData,
    () => {
      getAddressById(props.stepOneData.shipping_address_id).then(
        ({ result }) => (selectedAddressDetails.value = result.data)
      );
      formValueStepOne.value = { ...props.stepOneData };
    }
  );
  getAddresses({}).then(({ result }) => {
    // if (result.data.length === 1) {
    //   createShipment.value.merchant_courier_id = 0;
    //   createShipment.value.courier_name = null;
    //   createShipment.value.shipping_address_id = result.data[0].id;
    //   createShipment.value.billing_address_id = result.data[0].id;
    //   getAddressById(result.data[0].id).then(({ result }) => {
    //     selectedAddressDetails.value = result.data;
    //     getList();
    //   });
    // }
    merchantAddressesList.value = result.data;
  });

  watch(
    () => props.stepTwoData,
    () => {
      formValueStepTwo.value = { ...props.stepTwoData };
    }
  );

  function submitOrder() {
    if (selectedCourier.value !== null) {
      message.loading('Placing your order...');
      loading.value = true;
      let shipmentAmount = formValueStepTwo.value.shipment_amount;
      if (formValueStepOne.value.payment_method === 'prepaid') {
        shipmentAmount = 0;
      }
      const finalOrderData = {
        channel_id: null,
        client_order_id: formValueStepTwo.value.client_order_id,
        status: '1',
        platform_order_id: null,
        channel_status: null,
        placed_on_weship: true,
        order_place_type: formValueStepOne.value.order_place_type,
        order_type: formValueStepOne.value.order_type,
        payment_method: formValueStepOne.value.payment_method,
        oc_status: '',
        ac_status: '',
        order_items: formValueStepTwo.value.order_items,
        customer: {
          name: formValueStepOne.value.name,
          city: formValueStepOne.value.city,
          country_code: formValueStepOne.value.country_code,
          country: formValueStepOne.value.country,
          address1: formValueStepOne.value.address1,
          zip_code: formValueStepOne.value.zip_code.toString(),
          email: formValueStepOne.value.email,
          state: formValueStepOne.value.state,
          phone: formValueStepOne.value.phone.toString(),
        },
        shipment: {
          total_amount: 0,
          total_discount: 0,
          status: 'draft',
          billing_address_id: formValueStepOne.value.shipping_address_id,
          shipment_amount: shipmentAmount,
          courier_name: selectedCourier.value.name,
          shipping_charge: selectedCourier.value.shipping_charge,
          platform_service_charges: selectedCourier.value.platform_service_charges,
          shipment_discount: 0,
          shipment_weight: formValueStepTwo.value.shipment_weight,
          shipment_height: formValueStepTwo.value.shipment_height,
          shipment_length: formValueStepTwo.value.shipment_length,
          shipment_breadth: formValueStepTwo.value.shipment_breadth,
          shipping_address_id: formValueStepOne.value.shipping_address_id,
          merchant_courier_id: selectedCourier.value.merchant_courier_id,
          multi_package_service: formValueStepOne.value.multi_package_service,
          total_boxes: formValueStepOne.value.total_boxes,
        },
      };
      createOrder(finalOrderData).then(({ result }) => {
        window['$message'].success(result.message);
        loading.value = false;
        emits('stepThreeOrder', result);
      });
    } else {
      window['$message'].error('Please select courier partner');
    }
  }
  function proceedOrder() {
    bool.value = true;
    getList();
  }
  function order_detail_edit() {
    showOrderDetailEdit.value = true;
    stepOneEditFormData.value = { ...formValueStepOne.value };
  }
  function getEditedData(data) {
    formValueStepOne.value = { ...data };
    showOrderDetailEdit.value = false;
    showCustomerDetailEdit.value = false;
  }
  function pickupLocationEdit() {
    showPickUpAddressEdit.value = true;
  }
  function getStepTwoEditedData(data) {
    formValueStepTwo.value = { ...data };
    showItemsDetailEdit.value = false;
    showShipmentDetailEdit.value = false;
    getList();
  }
  function customer_detail_edit() {
    showCustomerDetailEdit.value = true;
    stepOneEditFormData.value = { ...formValueStepOne.value };
  }
  function item_detail_edit() {
    showItemsDetailEdit.value = true;
    stepTwoEditFormData.value = JSON.parse(JSON.stringify(formValueStepTwo.value));
  }
  function getPickupLocationEditedData(data) {
    showPickUpAddressEdit.value = false;
    stepThree.value.merchant_courier_id = null;
    stepThree.value.courier_name = null;
    stepThree.value.shipping_charge = null;
    formValueStepOne.value.shipping_address_id = data.id;
    getAddressById(data.id).then(({ result }) => (selectedAddressDetails.value = result.data));
  }
  onMounted(() => {
    formValueStepOne.value = { ...props.stepOneData };
    formValueStepTwo.value = { ...props.stepTwoData };
  });
  function updateSelectedCourier(item: {
    merchant_courier_id: string;
    name: string;
    shipping_charge: string;
    platform_service_charges: string;
  }) {
    if (item) {
      selectedCourier.value.merchant_courier_id = item.merchant_courier_id;
      selectedCourier.value.name = item.name;
      selectedCourier.value.shipping_charge = item.shipping_charge ? item.shipping_charge : 0;
      selectedCourier.value.platform_service_charges = item.platform_service_charges
        ? item.platform_service_charges
        : 0;
    }
  }

  function updateCourierList() {
    getAddressById(formValueStepOne.value.shipping_address_id).then(({ result }) => {
      selectedAddressDetails.value = result.data;
      getList();
    });
  }
</script>
<style scoped>
  .table-header-custom-style {
    border-width: 1px;
    font-weight: bold;
    color: rgb(125, 140, 193);
    text-align: center;
    padding: 5px;
    width: fit-content !important;
    letter-spacing: 0.2px;
    font-size: 14px;
  }
  .table-row-custom-style {
    border-width: 1px;
    color: rgb(38, 63, 151);
    font-weight: 600;
    text-align: center;
    width: fit-content !important;
    letter-spacing: 0.2px;
    padding: 5px;
  }
  .auto-width {
    white-space: nowrap; /* Prevent line breaks */
    overflow: hidden; /* Hide overflow */
    text-overflow: ellipsis; /* Show ellipsis (...) for overflowed content */
    cursor: pointer;
  }
</style>
