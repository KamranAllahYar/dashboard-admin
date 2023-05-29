<template>
  <div>
    <n-card
      style="
        border-radius: 10px;
        margin-top: 10px;
        border-width: 1px;
        display: flex;
        justify-items: center;
      "
    >
      <n-space justify="space-between">
        <n-h1 style="font-weight: bold; color: rgb(38, 63, 151); letter-spacing: 0.3px; margin: 0px"
          >ORDER# {{ formValue.order_id }}</n-h1
        >
        <n-button
          v-if="fulfillment"
          style="font-weight: bold; border-radius: 10px"
          type="success"
          :loading="fulfillmentLoader"
          @click="orderFulfillment"
        >
          Fulfillment
        </n-button>
      </n-space>
    </n-card>
    <n-grid :x-gap="12" :y-gap="8" cols="5 xs:2 s:2 m:2 l:5" responsive="screen">
      <n-grid-item span="3 xs:2 s:2 m:2 l:3">
        <n-card style="border-radius: 10px; margin-top: 20px; border-width: 1px">
          <n-h6 style="font-weight: bold; color: rgb(38, 63, 151)">Order Details</n-h6>
          <n-space style="overflow-x: auto">
            <n-table
              :single-line="true"
              :bordered="true"
              style="width: 900px; word-wrap: break-word; table-layout: fixed"
            >
              <thead>
                <tr>
                  <th class="table-header-custom-style auto-width">
                    <n-tooltip trigger="hover" placement="top">
                      <template #trigger>
                        <div class="auto-width">ORDER ID</div>
                      </template>
                      <div>ORDER ID</div>
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
                        <div class="auto-width">CHANNEL STATUS</div>
                      </template>
                      <div>CHANNEL STATUS</div>
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
                  <th class="table-header-custom-style auto-width">
                    <n-tooltip trigger="hover" placement="top">
                      <template #trigger>
                        <div class="auto-width">ORDER CREATED AT</div>
                      </template>
                      <div>ORDER CREATED AT</div>
                    </n-tooltip>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="table-row-custom-style">{{ formValue.order_id }}</td>
                  <td class="table-row-custom-style">{{ formValue.client_order_id }}</td>
                  <td class="table-row-custom-style">{{ formValue.order_place_type }}</td>
                  <td class="table-row-custom-style">{{ formValue.order_type }}</td>
                  <td class="table-row-custom-style">{{ formValue.channel_status }}</td>
                  <td class="table-row-custom-style">{{ formValue.payment_method }}</td>

                  <td class="table-row-custom-style">
                    {{ formValue.order_created_at }}
                  </td>
                </tr></tbody
              ></n-table
            >
          </n-space>

          <n-divider />
          <n-h6 style="font-weight: bold; color: rgb(38, 63, 151)">Customer Details</n-h6>
          <n-space style="overflow-x: auto">
            <n-table
              :single-line="true"
              :bordered="true"
              style="width: 1000px; word-wrap: break-word; table-layout: fixed"
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
                        <div class="auto-width">CITY</div>
                      </template>
                      <div>CITY</div>
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
                        <div class="auto-width">PHONE NUMBER</div>
                      </template>
                      <div>PHONE NUMBER</div>
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
                        <div class="auto-width">ZIP CODE</div>
                      </template>
                      <div>ZIP CODE</div>
                    </n-tooltip>
                  </th>
                  <th class="table-header-custom-style auto-width">
                    <n-tooltip trigger="hover" placement="top">
                      <template #trigger>
                        <div class="auto-width">STATE</div>
                      </template>
                      <div>STATE</div>
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
                  <td class="table-row-custom-style">{{
                    formValue?.customer?.default_address?.name
                  }}</td>
                  <td class="table-row-custom-style">{{
                    formValue?.customer?.default_address?.address1
                  }}</td>
                  <td class="table-row-custom-style">{{
                    formValue?.customer?.default_address?.city
                  }}</td>
                  <td class="table-row-custom-style">{{ formValue?.customer?.email }}</td>
                  <td class="table-row-custom-style">{{
                    formValue?.customer?.default_address?.phone
                  }}</td>
                  <td class="table-row-custom-style">{{
                    formValue?.customer?.default_address?.country_code
                  }}</td>

                  <td class="table-row-custom-style">{{
                    formValue?.customer?.default_address?.zip_code
                  }}</td>

                  <td class="table-row-custom-style">{{
                    formValue?.customer?.default_address?.state
                  }}</td>
                  <td class="table-row-custom-style">{{
                    formValue?.customer?.default_address?.country
                  }}</td>
                </tr></tbody
              ></n-table
            >
          </n-space>
          <n-divider />
          <n-h6 style="font-weight: bold; color: rgb(38, 63, 151)">Item Details</n-h6>
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
                        <div class="auto-width">ITEM TAX %</div>
                      </template>
                      <div>ITEM TAX %</div>
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
                <tr v-for="(item, index) in formValue.items" :key="index">
                  <td class="table-row-custom-style">{{ item.item_name }} / {{ item.sku }}</td>
                  <td class="table-row-custom-style">{{ item.variant_title }}</td>
                  <td class="table-row-custom-style">{{ item.quantity }}</td>
                  <td class="table-row-custom-style">{{ item.unit_price }}</td>
                  <td class="table-row-custom-style">{{ item.total_tax_percentage }}</td>
                  <td class="table-row-custom-style">
                    {{
                      parseFloat(item.quantity) *
                      (parseFloat(item.unit_price) +
                        parseFloat((item.total_tax_percentage / 100) * item.unit_price))
                    }}
                  </td>
                  <td class="table-row-custom-style">{{ item.item_height }}</td>
                  <td class="table-row-custom-style">{{ item.item_length }}</td>
                  <td class="table-row-custom-style">{{ item.item_breadth }}</td>
                  <td class="table-row-custom-style">{{ item.item_weight }}</td>
                </tr></tbody
              ></n-table
            >
          </n-space>
          <n-divider />
          <n-space v-if="formValue?.shipments?.length !== 0" :vertical="true">
            <n-h6 style="font-weight: bold; color: rgb(38, 63, 151)">Shipment Details</n-h6>
            <n-space style="overflow-x: auto">
              <n-table
                :single-line="true"
                :bordered="true"
                style="word-wrap: break-word; table-layout: fixed"
              >
                <thead>
                  <tr>
                    <th class="table-header-custom-style auto-width">
                      <n-tooltip trigger="hover" placement="top">
                        <template #trigger>
                          <div class="auto-width">TRACKING ID</div>
                        </template>
                        <div>TRACKING ID</div>
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
                          <div class="auto-width">SHIPPING CHARGES</div>
                        </template>
                        <div>SHIPPING CHARGES</div>
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
                          <div class="auto-width">MULTI PACKAGE SERVICE</div>
                        </template>
                        <div>MULTI PACKAGE SERVICE</div>
                      </n-tooltip>
                    </th>
                    <th class="table-header-custom-style auto-width">
                      <n-tooltip trigger="hover" placement="top">
                        <template #trigger>
                          <div class="auto-width">TOTAL BOX QUANTITY</div>
                        </template>
                        <div>TOTAL BOX QUANTITY</div>
                      </n-tooltip>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in formValue.shipments" :key="index">
                    <td class="table-row-custom-style">{{ item.tracking_id }}</td>
                    <td class="table-row-custom-style">{{ item.total_amount }}</td>
                    <td class="table-row-custom-style">{{ item.shipping_charge }}</td>
                    <td class="table-row-custom-style">{{ formValue.client_order_id }}</td>
                    <td class="table-row-custom-style">{{ item.shipment_weight }}</td>
                    <td class="table-row-custom-style"
                      >{{ item.shipment_length }}*{{ item.shipment_breadth }}*{{
                        item.shipment_height
                      }}</td
                    >
                    <td class="table-row-custom-style">
                      {{ item.multi_package_service === 1 ? 'Yes' : 'No' }}
                    </td>

                    <td class="table-row-custom-style">{{ item.total_boxes }}</td>
                  </tr></tbody
                ></n-table
              >
            </n-space>
            <div v-for="(item, index) in formValue.shipments" :key="index" style="margin-top: 20px">
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
                Invoice Value: {{ item.total_amount }}</n-h2
              >
            </div>
          </n-space>
        </n-card>
      </n-grid-item>
      <n-grid-item span="2 xs:2 s:2 m:2 l:2">
        <n-card
          v-if="!incompleteShipment"
          style="border-radius: 10px; margin-top: 20px; border-width: 1px"
        >
          <n-h6 style="font-weight: bold; color: rgb(38, 63, 151)">Pickup Location</n-h6>
          <n-card
            v-for="(item, index) in formValue.shipments"
            :key="index"
            style="padding: 1px; border-radius: 10px; border-width: 2px; margin-right: 100px"
          >
            <n-space :vertical="true">
              <div style="font-weight: bold; font-size: 13px"
                >{{ item.pickup_location.contact_name }} - {{ item.pickup_location.store_name }}
              </div>
              <div class="fontSize">{{ item.pickup_location.address1 }}</div>
              <div class="fontSize"
                >{{ item.pickup_location.city }} {{ item.pickup_location.state }}</div
              >
              <div class="fontSize">{{ item.pickup_location.phone }}</div>
            </n-space>
          </n-card>

          <n-space
            style="
              display: flex;
              justify-content: space-between;
              margin-top: 20px;
              margin-left: 10px;
              margin-right: 10px;
            "
          >
            <n-space>
              <n-h6 style="font-weight: bold; color: rgb(38, 63, 151)">Courier Partner</n-h6>
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
                Registered with pick up location
              </n-tooltip>
            </n-space>

            <!--            <n-button v-show="bool" @click="registerCourier" type="info" style="border-radius: 10px"-->
            <!--              >Register Courier</n-button-->
            <!--            >-->
          </n-space>

          <n-card
            v-for="(item, index) in formValue.shipments"
            :key="index"
            style="padding: 1px; margin: 10px; border-radius: 10px; border-width: 2px"
          >
            <n-space>
              <div>
                <n-icon size="20" color="#0e7a0d" style="margin-right: 10px">
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
              </div>
              <n-space :vertical="true">
                <div style="font-weight: bold; font-size: 13px; color: rgb(38, 63, 151)"
                  >{{ item.courier_name }}
                </div>
              </n-space>
            </n-space>
          </n-card>
        </n-card>

        <n-card v-else style="border-radius: 10px; margin-top: 20px; border-width: 1px">
          <div>
            <n-h6 style="font-weight: bold; color: rgb(38, 63, 151)"
              >Complete Shipment Details
            </n-h6>

            <n-space :vertical="true" style="margin-top: 10px">
              <n-space>
                <n-h6 style="font-weight: bold; color: rgb(38, 63, 151)"> Payment Method? </n-h6>
                <n-radio-group
                  name="multi_package_service"
                  :default-value="createShipment.payment_method"
                  v-model:value="createShipment.payment_method"
                >
                  <n-space>
                    <n-radio
                      v-for="paymentMethodOption in paymentMethodOptions"
                      :key="paymentMethodOption.value"
                      :value="paymentMethodOption.value"
                      :label="paymentMethodOption.label"
                    />
                  </n-space>
                </n-radio-group>
              </n-space>
              <n-space>
                <n-h6 style="font-weight: bold; color: rgb(38, 63, 151)"
                  >Is Multi package service?</n-h6
                >
                <n-radio-group
                  name="multi_package_service"
                  v-model:value="createShipment.multi_package_service"
                  :on-update:value="checkMultiPackage"
                >
                  <n-space>
                    <n-radio
                      v-for="multiServiceOption in multiServiceOptions"
                      :key="multiServiceOption.value"
                      :value="multiServiceOption.value"
                      :checked-value="1"
                      :unchecked-value="0"
                      :label="multiServiceOption.label"
                    />
                  </n-space>
                </n-radio-group>
              </n-space>
              <div v-show="isMultiPackage">
                <n-space style="display: flex; align-items: center">
                  <n-h6 style="font-weight: bold; color: rgb(38, 63, 151); margin-top: 5px">
                    Total Boxes in your order
                  </n-h6>
                  <n-input-number v-model:value="createShipment.total_boxes" style="width: 100px" />
                </n-space>
              </div>
            </n-space>

            <n-form
              label-width="auto"
              label-placement="left"
              ref="formRef"
              :model="createShipment"
              :rules="rules"
              size="medium"
            >
              <n-form-item-gi label="Weight (Kg)">
                <n-input
                  v-model:value="createShipment.shipment_weight"
                  placeholder="Weight (Kg)"
                  :disabled="true"
                />
              </n-form-item-gi>
              <n-form-item-gi label="Invoice Value">
                <n-input
                  v-model:value="createShipment.shipment_amount"
                  placeholder="Invoice Value"
                  :disabled="true"
                />
              </n-form-item-gi>
            </n-form>
            <div :hidden="true">
              <n-space :vertical="true">
                <n-h6 style="font-weight: bold; color: rgb(38, 63, 151)">Dimensions (cm)</n-h6>
                <n-form
                  ref="formRefTwo"
                  :model="createShipment"
                  :rules="rules"
                  size="medium"
                  label-placement="top"
                >
                  <n-grid :x-gap="6" cols="6 l:6" responsive="screen">
                    <n-form-item-gi span="2" label="Length" path="shipment_length">
                      <n-input
                        v-model:value="createShipment.shipment_length"
                        placeholder="Length"
                      />
                    </n-form-item-gi>
                    <n-form-item-gi span="2" label="Breadth" path="shipment_breadth">
                      <n-input
                        v-model:value="createShipment.shipment_breadth"
                        placeholder="Breadth"
                      />
                    </n-form-item-gi>
                    <n-form-item-gi span="2" label="Height" path="shipment_height">
                      <n-input
                        v-model:value="createShipment.shipment_height"
                        placeholder="Height"
                      />
                    </n-form-item-gi>
                  </n-grid>
                </n-form>
              </n-space>
            </div>

            <n-space style="display: flex; justify-content: space-between">
              <n-h6 style="font-weight: bold; color: rgb(38, 63, 151)">Pickup Location</n-h6>
              <n-button style="font-weight: bold; border-radius: 10px" @click="pickupLocationEdit">
                Select Address
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
            @locationRegistered="updateCourierList"
            :list="list"
            :city="selectedAddressDetails.city"
            :shippingAddressId="createShipment.shipping_address_id"
            :selectedAddressDetails="selectedAddressDetails"
          />
        </n-card>
      </n-grid-item>
    </n-grid>
    <n-card
      v-if="incompleteShipment"
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
            icon-placement="right"
            @click="placeShipment"
            type="info"
            style="font-weight: bold; border-radius: 10px"
          >
            Create Shipment
          </n-button>
        </div>
      </n-space>
    </n-card>
    <n-modal style="width: 50%" v-model:show="showPickUpAddressEdit" preset="dialog">
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
  import { onMounted, ref } from 'vue';
  import { createOrderShipment, orderDetailsByID, updateOrderShipment } from '@/api/order';
  import { useRoute } from 'vue-router';
  import AddressLocationEdit from '@/components/CreateOrder/EditOrder/AddressLocationEdit.vue';
  import { getAddressById, getAddresses } from '@/api/settings/addresses';
  import { courierChargesList, courierList } from '@/api/courier';
  import { userPagination } from '@/hooks/userPagination';
  import { FormInst, FormItemRule } from 'naive-ui';
  import { createOrderFulfillment } from '@/api/channels/shopify';

  const isMultiPackage = ref(false);
  const selectedAddressDetails: any = ref({});
  const route = useRoute();
  const formValue: any = ref({});
  const showPickUpAddressEdit = ref(false);
  const formRef = ref<FormInst | null>(null);
  const formRefTwo = ref<FormInst | null>(null);
  const selectedCourier: any = ref({
    merchant_courier_id: null,
    name: null,
    shipping_charge: null,
    platform_service_charges: null,
  });
  const incompleteShipment = ref(false);
  const updateShipment = ref(false);
  const fulfillment = ref(false);
  const fulfillmentLoader = ref(false);
  const merchantAddressesList: any = ref([]);
  const { list, page, itemCount, pageSize, params }: any = userPagination(courierList);
  params.value.is_active = 1;

  const createShipment = ref({
    multi_package_service: false,
    total_boxes: 1,
    total_amount: 0,
    total_discount: 0,
    courier_name: null,
    billing_address_id: 0,
    shipping_address_id: 0,
    merchant_courier_id: 0,
    status: 'draft',
    shipment_weight: 0,
    shipment_amount: 0,
    shipping_charge: 0,
    platform_service_charges: 0,
    shipment_discount: 0,
    shipment_length: 1,
    shipment_breadth: 1,
    shipment_height: 1,
    payment_method: 'cod',
    zone_id: null,
    // client_service_fee: 0,
  });

  const multiServiceOptions = [
    {
      value: true,
      label: 'Yes',
    },
    {
      value: false,
      label: 'No',
    },
  ];

  const paymentMethodOptions = [
    {
      value: 'cod',
      label: 'COD',
    },
    {
      value: 'prepaid',
      label: 'PREPAID',
    },
  ];
  const rules = {
    item_name: {
      required: true,
      trigger: ['blur', 'input'],
      message: 'Name is required',
    },
    variant_title: {
      required: true,
      trigger: ['blur', 'input'],
      message: 'Variant title is required',
    },
    quantity: {
      required: true,
      trigger: ['blur', 'input'],
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('Quantity is required');
        } else if (!/^\d*$/.test(value)) {
          return new Error('Quantity should be an integer');
        }
        return true;
      },
    },
    sku: {
      required: true,
      trigger: ['blur', 'input'],
      message: 'SKU is required',
    },
    unit_price: {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('Price is required');
        } else if (!/^\d*$/.test(value)) {
          return new Error('Price should be an integer');
        }
        return true;
      },
      trigger: ['blur', 'input'],
    },
    total_tax_percentage: {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('Tax is required');
        } else if (!/^\d*$/.test(value)) {
          return new Error('Tax should be an integer');
        }
        return true;
      },
      trigger: ['blur', 'input'],
    },
    shipment_weight: {
      required: true,
      trigger: ['blur', 'input'],
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('Weight is required');
        } else if (!/^\d*$/.test(value)) {
          return new Error('Weight should be an integer');
        }
        return true;
      },
      message: 'Weight is required',
    },
    shipment_amount: {
      required: true,
      trigger: ['blur', 'input'],
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('Invoice value is required');
        } else if (!/^\d*$/.test(value)) {
          return new Error('Invoice value should be an integer');
        }
        return true;
      },
    },
    shipment_length: {
      required: true,
      trigger: ['blur', 'input'],
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('Length is required');
        } else if (!/^\d*$/.test(value)) {
          return new Error('Length should be an integer');
        }
        return true;
      },
    },
    shipment_breadth: {
      required: true,
      trigger: ['blur', 'input'],
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('Breadth is required');
        } else if (!/^\d*$/.test(value)) {
          return new Error('Breadth should be an integer');
        }
        return true;
      },
    },
    shipment_height: {
      required: true,
      trigger: ['blur', 'input'],
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('Height is required');
        } else if (!/^\d*$/.test(value)) {
          return new Error('Height should be an integer');
        }
        return true;
      },
    },
    client_order_id: {
      required: true,
      trigger: ['blur', 'input'],
      message: 'Client order ID is required',
    },
    item_length: {
      required: true,
      trigger: ['blur', 'input'],
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('Length is required');
        } else if (!/^\d*$/.test(value)) {
          return new Error('Length should be an integer');
        }
        return true;
      },
    },
    item_height: {
      required: true,
      trigger: ['blur', 'input'],
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('Height is required');
        } else if (!/^\d*$/.test(value)) {
          return new Error('Height should be an integer');
        }
        return true;
      },
    },
    item_breadth: {
      required: true,
      trigger: ['blur', 'input'],
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('Breadth is required');
        } else if (!/^\d*$/.test(value)) {
          return new Error('Breadth should be an integer');
        }
        return true;
      },
    },
    item_weight: {
      required: true,
      trigger: ['blur', 'input'],
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('Weight is required');
        } else if (!/^\d*$/.test(value)) {
          return new Error('Weight should be an integer');
        }
        return true;
      },
    },
  };
  onMounted(() => {
    orderDetailsByID(route.params.id).then(({ result }) => {
      formValue.value = result.data;
      getAddresses({
        channel_id: formValue.value.channel_id,
        merchant_channel_id: formValue.value.merchant_channel_mapping_id,
      }).then(({ result }) => {
        if (result.data.length === 1) {
          let defaultAddress: any = [];
          createShipment.value.merchant_courier_id = 0;
          createShipment.value.courier_name = null;
          defaultAddress.value = result.data.filter((item) => item.default_address === 1);
          if (defaultAddress.length) {
            createShipment.value.shipping_address_id = defaultAddress.value[0].id;
            createShipment.value.billing_address_id = defaultAddress.value[0].id;
            getAddressById(defaultAddress.value[0].id).then(({ result }) => {
              selectedAddressDetails.value = result.data;
              getList();
            });
          }
        }
        merchantAddressesList.value = result.data;
      });
      let i = 0;
      if (formValue?.value.shipments?.length === 0) {
        incompleteShipment.value = true;
        createShipment.value.shipment_amount = 0;
        createShipment.value.shipment_weight = 0;
        while (i < formValue.value.items.length) {
          createShipment.value.shipment_amount += parseFloat(
            formValue.value.items[i].item_subtotal
          );
          createShipment.value.shipment_weight += parseFloat(formValue.value.items[i].item_weight);
          i++;
        }
      } else {
        if (!formValue.value.shipments[0].tracking_id) {
          window['$message'].error('Shipment Not Complete');
          incompleteShipment.value = true;
          updateShipment.value = true;
          createShipment.value.shipment_amount = 0;
          createShipment.value.shipment_weight = 0;
          while (i < formValue.value.items.length) {
            createShipment.value.shipment_amount += parseFloat(
              formValue.value.items[i].item_subtotal
            );
            createShipment.value.shipment_weight += parseFloat(
              formValue.value.items[i].item_weight
            );
            i++;
          }
        } else {
          if (formValue.value.channel_id === 1) {
            fulfillment.value = true;
          }
        }
      }
    });
  });

  const getList = () => {
    if (formValue?.value.customer?.default_address?.city && selectedAddressDetails.value.city) {
      courierChargesList({
        ...params.value,
        page: page.value,
        pageSize: pageSize.value,
        origin: selectedAddressDetails.value.city,
        destination: formValue?.value.customer?.default_address?.city,
        weight: createShipment.value.shipment_weight,
        volume:
          createShipment.value.shipment_length *
          createShipment.value.shipment_breadth *
          createShipment.value.shipment_height,
        amount: createShipment.value.shipment_amount,
      }).then(({ result }) => {
        list.value = result.data;
        itemCount.value = result.meta.total;
      });
    } else {
      window['$message'].error('Pickup location city/customer location city is missing');
    }
  };

  function pickupLocationEdit() {
    showPickUpAddressEdit.value = true;
  }
  function getPickupLocationEditedData(data) {
    showPickUpAddressEdit.value = false;
    createShipment.value.merchant_courier_id = 0;
    createShipment.value.courier_name = null;
    createShipment.value.shipping_address_id = data.id;
    createShipment.value.billing_address_id = data.id;
    getAddressById(data.id).then(({ result }) => {
      selectedAddressDetails.value = result.data;
      getList();
    });
  }

  async function placeShipment() {
    let hasError = false;
    if (!hasError) {
      await formRef.value?.validate((error) => {
        if (error) {
          window['$message'].error('Please fill out required fields');
          hasError = true;
          return;
        }
      });
    }
    if (!hasError) {
      await formRefTwo.value?.validate((error) => {
        if (error) {
          window['$message'].error('Please fill out required fields');
          hasError = true;
          return;
        }
      });
    }

    if (!hasError) {
      if (createShipment.value.shipping_address_id === 0) {
        window['$message'].error('Please select pickup location');
        hasError = true;
        return;
      }
    }

    if (!hasError) {
      if (selectedCourier.value.merchant_courier_id === 0) {
        window['$message'].error('Please select courier partner');
        hasError = true;
        return;
      }
    }

    if (!hasError) {
      createShipment.value.merchant_courier_id = selectedCourier.value.merchant_courier_id;
      createShipment.value.courier_name = selectedCourier.value.name;
      createShipment.value.shipping_charge = selectedCourier.value.shipping_charge || 0;
      createShipment.value.zone_id = selectedCourier.value.zone_id;
      createShipment.value.platform_service_charges =
        selectedCourier.value.platform_service_charges;
      if (updateShipment.value) {
        if (createShipment.value.payment_method === 'prepaid') {
          createShipment.value.total_amount = 0;
          createShipment.value.shipment_amount = 0;
          createShipment.value.shipping_charge = 0;
          createShipment.value.platform_service_charges = 0;
        }
        updateOrderShipment(route.params.id, createShipment.value).then(({ result }) => {
          incompleteShipment.value = false;
          window['$message'].success(result.message);
          orderDetailsByID(route.params.id).then(({ result }) => {
            formValue.value = result.data;
            let i = 0;
            if (formValue?.value.shipments?.length === 0) {
              createShipment.value.shipment_amount = 0;
              createShipment.value.shipment_weight = 0;
              while (i < formValue.value.items.length) {
                createShipment.value.shipment_amount += parseFloat(
                  formValue.value.items[i].item_subtotal
                );
                createShipment.value.shipment_weight += parseFloat(
                  formValue.value.items[i].item_weight
                );
                i++;
              }
            }
          });
        });
      } else {
        if (createShipment.value.payment_method === 'prepaid') {
          createShipment.value.total_amount = 0;
          createShipment.value.shipment_amount = 0;
          createShipment.value.shipping_charge = 0;
          createShipment.value.platform_service_charges = 0;
        }
        createOrderShipment(route.params.id, createShipment.value).then(({ result }) => {
          window['$message'].success(result.message);
          orderDetailsByID(route.params.id).then(({ result }) => {
            formValue.value = result.data;
            incompleteShipment.value = false;
            let i = 0;
            if (formValue?.value.shipments?.length === 0) {
              createShipment.value.shipment_amount = 0;
              createShipment.value.shipment_weight = 0;
              while (i < formValue.value.items.length) {
                createShipment.value.shipment_amount += parseFloat(
                  formValue.value.items[i].item_subtotal
                );
                createShipment.value.shipment_weight += parseFloat(
                  formValue.value.items[i].item_weight
                );
                i++;
              }
            }
          });
        });
      }
    }
  }

  function checkMultiPackage(value) {
    if (value) {
      createShipment.value.multi_package_service = true;
      isMultiPackage.value = true;
    } else {
      createShipment.value.multi_package_service = false;
      createShipment.value.total_boxes = 1;
      isMultiPackage.value = false;
    }
  }
  function orderFulfillment() {
    fulfillmentLoader.value = true;
    createOrderFulfillment(formValue.value.id)
      .then(({ result }) => {
        console.log(result);
        window['$message'].success(result.message);
        fulfillmentLoader.value = false;
      })
      .catch(() => {
        fulfillmentLoader.value = false;
      });
  }
  function updateCourierList() {
    getAddressById(createShipment.value.shipping_address_id).then(({ result }) => {
      selectedAddressDetails.value = result.data;
      getList();
    });
  }
  function updateSelectedCourier(item: {
    merchant_courier_id: string;
    name: string;
    shipping_charge: string;
    platform_service_charges: string;
    zone_id: number;
  }) {
    if (item) {
      selectedCourier.value.merchant_courier_id = item.merchant_courier_id;
      selectedCourier.value.name = item.name;
      selectedCourier.value.shipping_charge = item.shipping_charge ? item.shipping_charge : 0;
      selectedCourier.value.zone_id = item.zone_id ? +item.zone_id : null;
      selectedCourier.value.platform_service_charges = item.platform_service_charges
        ? item.platform_service_charges
        : 0;
    }
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
