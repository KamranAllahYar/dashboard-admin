<template>
  <n-space :vertical="true" style="gap: 0px 0px">
    <div v-for="(formValue, index) in labeldata" :key="index" style="page-break-after: always">
      <n-space justify="center" style="margin-top: 0px; border-color: #000e1c; border-width: 1px">
        <div>
          <n-space :vertical="true" justify="center">
            <n-space justify="center">
              <!--                <img :src="websiteConfig.logo" :width="50" />-->
              <n-h1 style="margin-top: 10px; margin-bottom: 10px">{{
                formValue.shipments[0].courier_name
              }}</n-h1>
            </n-space>
          </n-space>
        </div>
      </n-space>
      <n-grid cols="6 s:6 m:6 l:6 xl:6" responsive="screen">
        <n-grid-item span="3" style="height: 150px; border-color: #000e1c; border-width: 1px">
          <div style="font-weight: bold; color: #000e1c; padding: 10px; font-size: 14px">
            Ship To - {{ formValue.customer?.default_address?.name }} -
            {{ formValue.customer?.default_address?.phone }} -
            {{ formValue.customer?.default_address?.address1 }},
            {{ formValue.customer?.default_address?.city }},
            {{ formValue.customer?.default_address?.state }},
            {{ formValue.customer?.default_address?.zip_code }}
          </div>
        </n-grid-item>
        <n-grid-item span="3" style="height: 150px; border-color: #000e1c; border-width: 1px">
          <div style="font-weight: bold; color: #000e1c; padding: 10px; font-size: 14px">
            Return Address
          </div>
          <div style="font-weight: bold; color: #000e1c; margin-left: 10px; font-size: 14px">
            RTO: {{ formValue.shipments[0].pickup_location.phone }},
            {{ formValue.shipments[0].pickup_location.address_line_1 }},
            {{ formValue.shipments[0].pickup_location.city }},
            {{ formValue.shipments[0].pickup_location.state }},
            {{ formValue.shipments[0].pickup_location.zip_code }}
          </div>
        </n-grid-item>
        <!--        <n-grid-item-->
        <!--          span="2"-->
        <!--          style="height: 150px; border-color: #000e1c; border-width: 1px; padding: 0px"-->
        <!--        >-->
        <!--          <div style="margin: 0px">-->
        <!--            <n-space :vertical="true" justify="center" style="height: 150px">-->
        <!--              <n-space justify="center">-->
        <!--                &lt;!&ndash;                <img :src="websiteConfig.logo" :width="50" />&ndash;&gt;-->
        <!--                <n-h1>{{ formValue.shipments[0].courier_name }}</n-h1>-->
        <!--              </n-space>-->
        <!--            </n-space>-->
        <!--          </div>-->
        <!--        </n-grid-item>-->
      </n-grid>
      <div style="height: 110px; border-color: #000e1c; border-width: 1px; justify-self: center">
        <n-space :vertical="true" justify="center" style="height: 110px">
          <n-space justify="center">
            <div>
              <canvas
                :ref="
                  (el) => {
                    barcode[index] = el;
                  }
                "
                width="200"
                height="100"
              ></canvas>
            </div>
          </n-space>
        </n-space>
      </div>

      <n-grid cols="2 s:2 m:2 l:2 xl:2" responsive="screen">
        <n-grid-item span="1" style="height: 140px; border-color: #000e1c; border-width: 1px">
          <div style="font-weight: bold; color: #000e1c; padding: 10px; font-size: 14px">
            Amount to be collected - Rs.{{ formValue.shipments[0].total_amount }}
            <n-space :vertical="true" justify="center" style="height: 110px">
              <n-space justify="center">
                <div>
                  <canvas
                    :ref="
                      (el) => {
                        amountBarcode[index] = el;
                      }
                    "
                    width="200"
                    height="100"
                  ></canvas>
                </div>
              </n-space>
            </n-space>
          </div>
        </n-grid-item>
        <n-grid-item span="1" style="height: 140px; border-color: #000e1c; border-width: 1px">
          <div style="font-weight: bold; color: #000e1c; padding: 10px; font-size: 14px">
            Order Details
          </div>
          <!--          <div style="font-weight: bold; color: #000e1c; margin-left: 10px; font-size: 12px">-->
          <!--            Invoice Number: {{ formValue.shipments[0].invoice_number }}-->
          <!--          </div>-->
          <div style="font-weight: bold; color: #000e1c; margin-left: 10px; font-size: 12px">
            Order Id: {{ formValue.client_order_id }}
          </div>
          <div style="font-weight: bold; color: #000e1c; margin-left: 10px; font-size: 12px">
            Order Date: {{ $filters.dateFormat(formValue.order_created_at) }}
          </div>
          <div style="font-weight: bold; color: #000e1c; margin-left: 10px; font-size: 12px">
            Package contents: {{ formValue.items.length }} item/s
          </div>
          <!--          <div style="font-weight: bold; color: #000e1c; margin-left: 10px; font-size: 12px">-->
          <!--            Pieces: {{ formValue.shipments[0].total_boxes }}-->
          <!--          </div>-->
        </n-grid-item>
      </n-grid>
      <n-table style="border-color: #000e1c; border-width: 1px">
        <thead>
          <tr>
            <th style="font-weight: bold">Product Details</th>
            <th style="font-weight: bold">Quantity</th>
            <th style="font-weight: bold">Unit Price</th>
            <th style="font-weight: bold">Tax Percentage</th>
            <th style="font-weight: bold">Total Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in formValue.items" :key="item.id">
            <td>{{ item.item_name }} / {{ item.sku }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.unit_price }}</td>
            <td>{{ item.total_tax_percentage }}%</td>
            <td>{{ item.item_subtotal }}</td>
          </tr>
        </tbody>
      </n-table>
      <n-grid cols="2 s:2 m:2 l:2 xl:2" responsive="screen" />
    </div>
  </n-space>
</template>

<script lang="ts" setup>
  import JsBarcode from 'jsbarcode';
  import { useRoute } from 'vue-router';
  import { onMounted, ref } from 'vue';
  import { orderDetailsByID } from '@/api/order';

  const route = useRoute();
  const labeldata: any = ref([]);
  const barcode: any = ref([]);
  const amountBarcode: any = ref([]);
  let ids: any[] = [];
  if (Array.isArray(route.params.id)) {
    ids = route.params.id;
  } else {
    ids = route.params.id.split(',');
  }

  onMounted(() => {
    for (const id of ids) {
      if (id) {
        orderDetailsByID(id).then(({ result }) => {
          if (!result.data.shipments || !result.data.shipments.length) {
            labeldata.value.push({
              ...result.data,
              shipments: [
                {
                  pickup_location: {},
                },
              ],
            });
          } else {
            labeldata.value.push(result.data);
          }
          const index = labeldata.value.length - 1;
          setTimeout(() => {
            JsBarcode(barcode.value[index], labeldata.value[index].shipments[0].tracking_id, {
              height: 50,
              fontSize: 16,
              background: 'transparent',
            });
            JsBarcode(
              amountBarcode.value[index],
              labeldata.value[index].shipments[0].total_amount,
              {
                height: 50,
                fontSize: 16,
                background: 'transparent',
              }
            );
          }, 2000);
        });
      }
    }
  });
</script>
