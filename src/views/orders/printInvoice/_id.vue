<template>
  <n-space :vertical="true">
    <div v-for="(formValue, index) in invoiceData" :key="index" style="page-break-after: always">
      <div id="company-container">
        <!-- Company name -->
        <span id="company-name"
          >{{ formValue.shipments[0].pickup_location.store_name }} Invoice</span
        >
      </div>
      <!--    <div id="tax-invoice"> TAX INVOICE </div>-->
      <div id="details-container">
        <div class="dashed">
          <h5 class="details-heading">SHIPPING AND BILLING ADDRESS:</h5>

          <!-- Shipping address -->
          <p>
            Name: {{ formValue.customer?.default_address?.name }}, Phone Number:
            {{ formValue.customer?.default_address?.phone }}, Address:
            {{ formValue.customer?.default_address?.address1 }} City:
            {{ formValue.customer?.default_address?.city }}, State:
            {{ formValue.customer?.default_address?.state }}, Country:
            {{ formValue.customer?.default_address?.country }}, Zip Code:
            {{ formValue.customer?.default_address?.zip_code }}
          </p>
        </div>
        <div class="dashed">
          <h5 class="details-heading">Shipped BY:</h5>
          <!-- sender address -->
          <p>
            Email:
            {{ formValue.shipments[0].pickup_location.email }}, Phone Number:
            {{ formValue.shipments[0].pickup_location.phone }}, Address:
            {{ formValue.shipments[0].pickup_location.address_line_1 }}, City:
            {{ formValue.shipments[0].pickup_location.city }}, State:
            {{ formValue.shipments[0].pickup_location.state }}, Country:
            {{ formValue.shipments[0].pickup_location.country }}, Zip Code:
            {{ formValue.shipments[0].pickup_location.zip_code }}
          </p>
        </div>
        <div>
          <h5 class="details-heading">INVOICE DETAILS:</h5>
          <div id="invoice-details">
            <div>
              <!--              <p>INVOICE NUMBER : {{ formValue.shipments[0].invoice_number }}</p>-->
              <p>ORDER DATE : {{ $filters.dateFormat(formValue.order_created_at) }}</p>
              <p>ORDER NUMBER : {{ formValue.client_order_id }} </p>
              <p>COURIER PARTNER : {{ formValue.shipments[0].courier_name }}</p>
              <p>COURIER TRACKING ID : {{ formValue.shipments[0].tracking_id }}</p>
              <p>PAYMENT METHOD : {{ formValue.payment_method }} </p>
            </div>
          </div>
        </div>
      </div>
      <div id="table-container">
        <table>
          <tbody>
            <tr>
              <th>S.NO.</th>
              <th>PRODUCT</th>
              <th style="min-width: 80px">SKU</th>
              <th style="min-width: 40px">QTY</th>
              <th style="min-width: 60px">
                UNIT <br />
                PRICE
              </th>
              <th style="min-width: 50px">
                TAXABLE <br />
                Percentage
              </th>

              <th style="min-width: 110px"> TOTAL <br /> </th>
            </tr>

            <!-- loop this row for each product (start) -->

            <tr v-for="(item, index) in formValue.items" :key="item.id">
              <!--S.NO.-->
              <td>{{ index + 1 }} </td>
              <!--PRODUCT NAME-->
              <td> {{ item.item_name }} </td>
              <!--sku-->
              <td>{{ item.sku }}</td>
              <!--QTY-->
              <td>{{ item.quantity }}</td>
              <!--UNIT PRICE-->
              <td>{{ item.unit_price }}</td>
              <!--TAXABLE Percentage-->
              <td>{{ item.total_tax_percentage }}%</td>

              <!--TOTAL (Including GST)-->
              <td>{{ item.item_subtotal }}</td>
            </tr>
            <tr>
              <td colspan="8">
                <div style="background-color: #000000; height: 1px"></div>
              </td>
            </tr>
            <tr>
              <td colspan="6" class="text-right">Shipping Charges</td>
              <!--TAXABLE VALUE-->
              <td>{{ formValue.shipments[0].shipping_charge }}</td>
            </tr>

            <tr>
              <td colspan="6" class="text-right bold"> Discount </td>

              <!--Discount-->
              <td>{{ formValue.shipments[0].shipment_discount }}</td>
            </tr>

            <tr>
              <td colspan="6" class="text-right bold total-row"> NET TOTAL (In Value) </td>

              <!--NET TOTAL (In Value)-->
              <td class="bold total-row">{{ formValue.shipments[0].total_amount }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h6 style="text-align: center">
        This is an electronically generated document and does not require handwritten signature.
      </h6>
    </div>
  </n-space>
</template>
<script lang="ts" setup>
  import { orderDetailsByID } from '@/api/order';
  import { useRoute } from 'vue-router';
  import { ref } from 'vue';
  import { websiteConfig } from '@/config/website.config';

  const route = useRoute();
  const invoiceData: any = ref([]);
  let ids: any[] = [];
  if (Array.isArray(route.params.id)) {
    ids = route.params.id;
  } else {
    ids = route.params.id.split(',');
  }
  for (const id of ids) {
    if (id) {
      orderDetailsByID(id).then(({ result }) => {
        if (!result.data.shipments || !result.data.shipments.length) {
          invoiceData.value.push({
            ...result.data,
            shipments: [
              {
                pickup_location: {},
              },
            ],
          });
        } else {
          invoiceData.value.push(result.data);
        }
        // let i = 0;
        // if (formValue?.value.shipments?.length === 0) {
        //   createShipment.value.shipment_amount = 0;
        //   createShipment.value.shipment_weight = 0;
        //   while (i < formValue.value.items.length) {
        //     createShipment.value.shipment_amount += parseFloat(formValue.value.items[i].item_subtotal);
        //     createShipment.value.shipment_weight += parseFloat(formValue.value.items[i].item_weight);
        //     i++;
        //   }
        // }
      });
    }
  }
</script>
<style scoped>
  @media print {
    h1 {
      page-break-before: always;
    }
    body {
      font-size: 14px;
    }
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
      'Open Sans', 'Helvetica Neue', sans-serif;
    display: flex;
    justify-content: center;
  }
  p {
    font-size: 12px;
  }
  #company-container {
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid black;
    width: 100%;
    padding: 10px;
    padding-bottom: 20px;
  }
  #logo {
    width: 40px;
    margin-right: 5px;
  }
  #company-name {
    font-weight: 600;
    font-size: 20px;
  }
  #tax-invoice {
    display: flex;
    justify-content: center;
    border-bottom: 1px solid black;
    width: 100%;
    padding: 5px;
    font-size: 24px;
    font-weight: 600;
  }
  #details-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin-top: 20px;
    width: 100%;
  }
  #details-container > div {
    padding: 10px;
  }
  .details-heading {
    margin-bottom: 10px;
  }
  .dashed {
    border-right: 1px dashed grey;
  }
  #invoice-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  #table-container {
    display: flex;
    justify-content: center;
  }
  table {
    margin-top: 30px;
    border-collapse: collapse;
    width: 100%;
  }
  tr:first-child,
  tr:last-child {
    border-top: 1px solid grey;
    border-bottom: 1px solid grey;
  }
  th {
    padding-top: 20px;
    padding-bottom: 20px;
    font-weight: 300;
    font-size: 11px;
  }
  td {
    padding: 5px 3px;
    font-size: 12px;
    text-align: center;
    word-break: break-all;
  }
  .text-right {
    text-align: right;
  }
  .bold {
    font-weight: bold;
  }
  .total-row {
    padding-top: 10px;
    padding-bottom: 10px;
  }
</style>
