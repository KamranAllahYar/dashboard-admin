<template>
  <div style="padding: 20px">
    <n-grid :x-gap="12" :y-gap="12" cols="8 xs:2 s:2 m:2 l:8 xl:8 2xl:8" responsive="screen">
      <n-grid-item span="5 xs:2 s:2 m:2 l:5 xl:5 2xl:5">
        <n-card style="border-radius: 10px; height: 500px">
          <div>
            <n-form ref="formRef" size="medium" label-placement="top">
              <n-grid :x-gap="12" :y-gap="12" :cols="3">
                <n-form-item-gi :span="1" label="Package/Shipment Type" :label-style="labelStyle">
                  <n-select
                    v-model:value="formValues.shipment_type"
                    value-field="value"
                    label-field="label"
                    :options="shipment_type"
                  />
                </n-form-item-gi>
                <n-form-item-gi :span="1" label="Pickup Zipcode" :label-style="labelStyle">
                  <n-input v-model:value="formValues.name" placeholder="Input search text" />
                </n-form-item-gi>
                <n-form-item-gi :span="1" label="Destination Zipcode" :label-style="labelStyle">
                  <n-input v-model:value="formValues.name" placeholder="Input search text" />
                </n-form-item-gi>
                <n-form-item-gi :span="1" label="Dimensions(cm)" :label-style="labelStyle">
                  <n-grid :x-gap="12" :y-gap="12" :cols="3">
                    <n-grid-item :span="1">
                      <n-input v-model:value="formValues.length" placeholder="length" />
                    </n-grid-item>
                    <n-grid-item :span="1">
                      <n-input v-model:value="formValues.breadth" placeholder="breadth" />
                    </n-grid-item>
                    <n-grid-item :span="1">
                      <n-input v-model:value="formValues.height" placeholder="height" />
                    </n-grid-item>
                  </n-grid>
                  <n-space />
                </n-form-item-gi>
                <n-form-item-gi :span="1" label="Weight(kg)" :label-style="labelStyle">
                  <n-input v-model:value="formValues.name" placeholder="Input search text" />
                </n-form-item-gi>
                <n-form-item-gi :span="1" label="Payment Mode" :label-style="labelStyle">
                  <n-select
                    v-model:value="formValues.payment_mode"
                    value-field="value"
                    label-field="label"
                    :options="payment_mode"
                  />
                </n-form-item-gi>
                <n-form-item-gi :span="1" label="Delivery Mode" :label-style="labelStyle">
                  <n-select
                    v-model:value="formValues.delivery_mode"
                    value-field="value"
                    label-field="label"
                    :options="delivery_mode"
                  />
                </n-form-item-gi>
                <n-form-item-gi :span="1" label="Product Name" :label-style="labelStyle">
                  <n-input v-model:value="formValues.name" placeholder="Input search text" />
                </n-form-item-gi>
                <n-form-item-gi :span="1" label="Invoice Value" :label-style="labelStyle">
                  <n-input v-model:value="formValues.name" placeholder="Input search text" />
                </n-form-item-gi>
                <n-form-item-gi :span="1" label="Dangerous Goods" :label-style="labelStyle">
                  <n-radio-group v-model:value="formValues.dangerous_good" name="radiogroup">
                    <n-space>
                      <n-radio
                        v-for="item in radio_option"
                        :key="item.value"
                        :value="item.value"
                        :label="item.label"
                      />
                    </n-space>
                  </n-radio-group>
                </n-form-item-gi>
                <n-form-item-gi
                  :span="1"
                  label="Is multi package service?"
                  :label-style="labelStyle"
                >
                  <n-radio-group v-model:value="formValues.multi_package_service" name="radiogroup">
                    <n-space>
                      <n-radio
                        v-for="item in radio_option"
                        :key="item.value"
                        :value="item.value"
                        :label="item.label"
                      />
                    </n-space>
                  </n-radio-group>
                </n-form-item-gi>
                <n-form-item-gi :span="1" label="Is document?" :label-style="labelStyle">
                  <n-radio-group v-model:value="formValues.is_document" name="radiogroup">
                    <n-space>
                      <n-radio
                        v-for="item in radio_option"
                        :key="item.value"
                        :value="item.value"
                        :label="item.label"
                      />
                    </n-space>
                  </n-radio-group>
                </n-form-item-gi>
              </n-grid>
            </n-form>
            <n-divider />
            <n-space style="display: flex; justify-content: space-between">
              <span></span>
              <n-space>
                <n-button style="border-radius: 10px">RESET</n-button>
                <n-button type="info" style="border-radius: 10px">CALCULATE</n-button>
              </n-space>
            </n-space>
          </div>
        </n-card>
      </n-grid-item>
      <n-grid-item span="3 xs:2 s:2 m:2 l:3 xl:3 2xl:3">
        <n-card style="border-radius: 10px; height: 500px; margin: 0px">
          <n-space :vertical="true">
            <p
              style="
                font-weight: 600;
                letter-spacing: 0.2px;
                color: rgb(38, 63, 151);
                font-size: 18px;
              "
              >Shipment rate of your order</p
            >
            <p style="letter-spacing: 0.2px; color: rgb(38, 63, 151); opacity: 0.7; font-size: 16px"
              >Result is based on your fastest rule</p
            >
            <n-card
              style="
                background: linear-gradient(
                  262.86deg,
                  rgb(17, 111, 221) -2.46%,
                  rgb(108, 176, 255) 27.43%,
                  rgb(66, 157, 241) 46.5%,
                  rgb(64, 125, 218) 77.65%,
                  rgb(0, 107, 206) 92.77%,
                  rgb(7, 74, 174) 119.61%
                );
                border-radius: 12px;
              "
            >
              <n-grid :x-gap="12" :y-gap="12" :cols="2">
                <n-grid-item :span="1">
                  <n-space :vertical="true" style="display: flex; justify-content: center">
                    <p
                      style="
                        letter-spacing: 0.2px;
                        color: rgb(255, 255, 255);
                        font-size: 16px;
                        font-weight: bold;
                        justify-content: center;
                      "
                      >Delivery Charges - Zone A</p
                    >
                    <p
                      style="
                        letter-spacing: 0.2px;
                        color: rgb(252, 242, 242);
                        font-size: 24px;
                        font-weight: 700;
                      "
                      >Rs 40</p
                    >
                    <p
                      style="
                        letter-spacing: 0.2px;
                        color: rgb(252, 242, 242);
                        font-size: 16px;
                        font-weight: bold;
                      "
                      >Return Charges - Rs 80
                    </p>
                    <p
                      style="
                        letter-spacing: 0.2px;
                        color: rgb(252, 242, 242);
                        font-size: 16px;
                        font-weight: bold;
                        margin-bottom: 0px;
                        justify-content: center;
                      "
                      >Courier Partner</p
                    >
                    <p
                      style="
                        letter-spacing: 0.2px;
                        color: rgb(252, 242, 242);
                        font-size: 16px;
                        margin-top: 0px;
                        font-weight: bold;
                      "
                      >PostEx
                    </p>
                  </n-space>
                </n-grid-item>
                <n-grid-item :span="1">
                  <img src="https://d10srchmli830n.cloudfront.net/1639158062694_rafiki.png" />
                </n-grid-item>
              </n-grid>
            </n-card>
            <p
              style="
                letter-spacing: 0.2px;
                color: rgb(38, 63, 151);
                font-size: 16px;
                margin-top: 0px;
                margin-bottom: 20px;
              "
              >View other courier’s rate details in below table
            </p>
          </n-space>
        </n-card>
      </n-grid-item>
    </n-grid>
    <n-card style="border-radius: 10px; margin-top: 20px">
      <div style="display: flex; justify-content: space-between">
        <p style="font-weight: 600; letter-spacing: 0.2px; color: rgb(38, 63, 151); font-size: 18px"
          >Other Courier Options</p
        >
        <n-space>
          <n-icon size="20" color="#D50000FF">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 24 24"
            >
              <path d="M7 2v11h3v9l7-12h-4l4-8z" fill="currentColor" />
            </svg>
          </n-icon>
          <p style="letter-spacing: 0.2px; color: rgb(38, 63, 151); font-size: 14px"
            >Fastest Courier</p
          >
          <n-icon size="20" color="#00860FFF">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 32 32"
            >
              <path
                d="M21 12v-2h-4V7h-2v3h-2a2.002 2.002 0 0 0-2 2v3a2.002 2.002 0 0 0 2 2h6v3h-8v2h4v3h2v-3h2a2.002 2.002 0 0 0 2-2v-3a2.002 2.002 0 0 0-2-2h-6v-3z"
                fill="currentColor"
              />
              <path
                d="M16 4A12 12 0 1 1 4 16A12.035 12.035 0 0 1 16 4m0-2a14 14 0 1 0 14 14A14.041 14.041 0 0 0 16 2z"
                fill="currentColor"
              />
            </svg>
          </n-icon>
          <p style="letter-spacing: 0.2px; color: rgb(38, 63, 151); font-size: 14px"
            >Cheapest Courier</p
          >
        </n-space>
      </div>

      <n-space style="overflow-x: auto">
        <n-table
          style="width: 1200px; word-wrap: break-word; table-layout: fixed; margin-top: 20px"
        >
          <thead>
            <tr>
              <th style="color: #7d8cc1; font-weight: bold; text-align: center">COURIER NAME</th>
              <th style="color: #7d8cc1; font-weight: bold; text-align: center">CHARGED WEIGHT</th>
              <th style="color: #7d8cc1; font-weight: bold; text-align: center">FREIGHT CHARGES</th>
              <th style="color: #7d8cc1; font-weight: bold; text-align: center"
                >COD HANDLING CHARGES</th
              >
              <th style="color: #7d8cc1; font-weight: bold; text-align: center">TOTAL CHARGES</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="display: flex; justify-content: center">
                <n-space :vertical="true">
                  <n-space>
                    <n-icon size="20" color="#D50000FF">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 24 24"
                      >
                        <path d="M7 2v11h3v9l7-12h-4l4-8z" fill="currentColor" />
                      </svg>
                    </n-icon>
                    <div>PostEx</div>
                  </n-space>
                  <n-space>
                    <n-icon size="20" color="#263F97FF">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 32 32"
                      >
                        <path
                          d="M29.92 16.61l-3-7A1 1 0 0 0 26 9h-3V7a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v17a1 1 0 0 0 1 1h2.14a4 4 0 0 0 7.72 0h6.28a4 4 0 0 0 7.72 0H29a1 1 0 0 0 1-1v-7a1 1 0 0 0-.08-.39zM23 11h2.34l2.14 5H23zM9 26a2 2 0 1 1 2-2a2 2 0 0 1-2 2zm10.14-3h-6.28a4 4 0 0 0-7.72 0H4V8h17v12.56A4 4 0 0 0 19.14 23zM23 26a2 2 0 1 1 2-2a2 2 0 0 1-2 2zm5-3h-1.14A4 4 0 0 0 23 20v-2h5z"
                          fill="currentColor"
                        />
                      </svg>
                    </n-icon>
                    <div>19 Nov 2022</div>
                  </n-space>
                </n-space></td
              >
              <td style="text-align: center">0.50 kg</td>
              <td style="text-align: center">Rs.24</td>
              <td style="text-align: center">Rs.50</td>
              <td style="text-align: center">Rs.74</td>
            </tr>
            <tr>
              <td style="display: flex; justify-content: center"
                ><n-space :vertical="true">
                  <n-space>
                    <n-icon size="20" color="#00860FFF">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 32 32"
                      >
                        <path
                          d="M21 12v-2h-4V7h-2v3h-2a2.002 2.002 0 0 0-2 2v3a2.002 2.002 0 0 0 2 2h6v3h-8v2h4v3h2v-3h2a2.002 2.002 0 0 0 2-2v-3a2.002 2.002 0 0 0-2-2h-6v-3z"
                          fill="currentColor"
                        />
                        <path
                          d="M16 4A12 12 0 1 1 4 16A12.035 12.035 0 0 1 16 4m0-2a14 14 0 1 0 14 14A14.041 14.041 0 0 0 16 2z"
                          fill="currentColor"
                        />
                      </svg>
                    </n-icon>
                    <div>Leopard</div>
                  </n-space>
                  <n-space>
                    <n-icon size="20" color="#263F97FF">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 32 32"
                      >
                        <path
                          d="M29.92 16.61l-3-7A1 1 0 0 0 26 9h-3V7a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v17a1 1 0 0 0 1 1h2.14a4 4 0 0 0 7.72 0h6.28a4 4 0 0 0 7.72 0H29a1 1 0 0 0 1-1v-7a1 1 0 0 0-.08-.39zM23 11h2.34l2.14 5H23zM9 26a2 2 0 1 1 2-2a2 2 0 0 1-2 2zm10.14-3h-6.28a4 4 0 0 0-7.72 0H4V8h17v12.56A4 4 0 0 0 19.14 23zM23 26a2 2 0 1 1 2-2a2 2 0 0 1-2 2zm5-3h-1.14A4 4 0 0 0 23 20v-2h5z"
                          fill="currentColor"
                        />
                      </svg>
                    </n-icon>
                    <div>19 Nov 2022</div>
                  </n-space>
                </n-space></td
              >
              <td style="text-align: center">0.50 kg</td>
              <td style="text-align: center">Rs.24</td>
              <td style="text-align: center">Rs.50</td>
              <td style="text-align: center">Rs.74</td>
            </tr>
            <tr>
              <td style="display: flex; justify-content: center"
                ><n-space :vertical="true">
                  <n-space>
                    <div>TCS</div>
                  </n-space>
                  <n-space>
                    <n-icon size="20" color="#263F97FF">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 32 32"
                      >
                        <path
                          d="M29.92 16.61l-3-7A1 1 0 0 0 26 9h-3V7a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v17a1 1 0 0 0 1 1h2.14a4 4 0 0 0 7.72 0h6.28a4 4 0 0 0 7.72 0H29a1 1 0 0 0 1-1v-7a1 1 0 0 0-.08-.39zM23 11h2.34l2.14 5H23zM9 26a2 2 0 1 1 2-2a2 2 0 0 1-2 2zm10.14-3h-6.28a4 4 0 0 0-7.72 0H4V8h17v12.56A4 4 0 0 0 19.14 23zM23 26a2 2 0 1 1 2-2a2 2 0 0 1-2 2zm5-3h-1.14A4 4 0 0 0 23 20v-2h5z"
                          fill="currentColor"
                        />
                      </svg>
                    </n-icon>
                    <div>19 Nov 2022</div>
                  </n-space>
                </n-space></td
              >
              <td style="text-align: center">0.50 kg</td>
              <td style="text-align: center">Rs.24</td>
              <td style="text-align: center">Rs.50</td>
              <td style="text-align: center">Rs.74</td>
            </tr>
          </tbody>
        </n-table>
      </n-space>
    </n-card>
  </div>
</template>
<script lang="ts" setup>
  import { reactive, ref } from 'vue';

  const shipment_type = [
    {
      label: 'Forward',
      value: 'forward',
    },
    {
      label: 'Reverse',
      value: 'reverse',
    },
    {
      label: 'Reverse with quality check',
      value: 'reverse_with_quality_check',
    },
  ];
  const payment_mode = [
    {
      label: 'Prepaid',
      value: 'prepaid',
    },
    {
      label: 'COD',
      value: 'cod',
    },
  ];
  const delivery_mode = [
    {
      label: 'Express',
      value: 'express',
    },
    {
      label: 'Heavy Surface',
      value: 'heavy_surface',
    },
  ];
  const radio_option = [
    {
      label: 'Yes',
      value: 'yes',
    },
    {
      label: 'No',
      value: 'no',
    },
  ];

  const formValues: any = ref({});
  const labelStyle = reactive({
    color: 'rgb(38, 63, 151)',
    'font-weight': 'bold',
  });
</script>
