<template>
  <n-space :vertical="true">
    <div v-for="(formValue, index) in invoiceData" :key="index" style="page-break-after: always">
      <n-space :vertical="true" style="padding: 20px">
        <!-- 1st Section -->
        <n-space justify="space-between" style="margin-bottom: 20px">
          <n-space :vertical="true" style="gap: 0px 0px">
            <p style="font-weight: 600; font-size: 10pt; color: #000e1c">{{
              websiteConfig.title
            }}</p>
            <p style="font-size: 9pt">B21, Block B, Main Broadway Commercial DHA Phase 8, Lahore</p>
            <p style="font-size: 9pt">Pakistan</p>
          </n-space>
          <n-space :vertical="true">
            <p style="font-size: 24pt; color: #000e1c">COD REMITTANCE</p>
          </n-space>
        </n-space>

        <!-- 2nd Section -->
        <n-space justify="space-between">
          <n-space :vertical="true" style="gap: 0px 0px">
            <p style="font-weight: 600; font-size: 10pt; color: #000e1c">Bill To</p>
            <p style="font-size: 9pt">{{ formValue.companyProfile.name }}</p>
            <p style="font-size: 9pt"
              >{{ formValue.merchant.first_name }} {{ formValue.merchant.last_name }}</p
            >
            <p style="font-size: 9pt">{{ formValue.merchant.email }}</p>
          </n-space>
          <n-space :vertical="true">
            <n-space justify="space-between">
              <p>Invoice Date :</p>
              <p>{{ filters.dateFormat(formValue.cycle_date) }}</p>
            </n-space>
            <!--            <n-space justify="space-between">-->
            <!--              <p>Terms :</p>-->
            <!--              <p>Due On Receipt</p>-->
            <!--            </n-space>-->
            <n-space justify="space-between">
              <p>WeShip Invoice :</p>
              <p>{{ formValue.reference_no }}</p>
            </n-space>
            <!--            <n-space justify="space-between">-->
            <!--              <p>Shipment Data URL :</p>-->
            <!--              <p style="width: 200px">Http:Weship.s3.amazonaws.com/23-33/-sdfffs_bill_report.csv</p>-->
            <!--            </n-space>-->
          </n-space>
        </n-space>

        <!-- 3rd Section -->
        <table>
          <tbody>
            <tr>
              <th style="min-width: 80px">
                REFERENCE <br />
                NO
              </th>

              <th style="min-width: 40px">
                ORDER <br />
                COUNT
              </th>

              <th style="min-width: 60px">
                REMITTANCE <br />
                PAID
              </th>
              <th style="min-width: 80px"> REMARKS</th>
              <th style="min-width: 80px">
                TRANSACTION <br />
                ID
              </th>
              <th style="min-width: 40px">
                COD <br />
                AMOUNT
              </th>
            </tr>

            <!-- loop this row for each product (start) -->

            <tr>
              <td>{{ formValue.reference_no }}</td>
              <td>{{ formValue.cycle_orders }}</td>
              <td>{{ formValue.cycle_status }}</td>
              <td>{{ formValue.remarks }}</td>
              <td>{{ formValue.transaction_id }}</td>
              <td>{{ formValue.cycle_amount }}</td>
            </tr>
          </tbody>
        </table>

        <n-space justify="space-between">
          <span></span>
          <n-space :vertical="true">
            <!--            <n-space justify="space-between">-->
            <!--              <p>Total</p>-->
            <!--              <p>PKR {{ formValue.cycle_amount }}</p>-->
            <!--            </n-space>-->
            <!--            <n-space justify="space-between">-->
            <!--              <p>Tax (18%)</p>-->
            <!--              <p>45.55</p>-->
            <!--            </n-space>-->
            <!--            <n-space justify="space-between">-->
            <!--              <p>Total</p>-->
            <!--              <p>1247.55</p>-->
            <!--            </n-space>-->
          </n-space>
        </n-space>

        <!-- 4th Section -->
        <n-space :vertical="true" style="gap: 0px 0px">
          <p style="font-weight: 600; font-size: 10pt; color: #000e1c; margin-top: 50px">Notes</p>
          <p>Thanks for the Business</p>
          <!--          <p-->
          <!--            style="-->
          <!--              font-weight: 600;-->
          <!--              font-size: 10pt;-->
          <!--              color: #000e1c;-->
          <!--              margin-top: 20px;-->
          <!--              margin-bottom: 10px;-->
          <!--            "-->
          <!--            >Terms & Conditions</p-->
          <!--          >-->
          <!--          <li style="font-size: 8pt">-->
          <!--            Make All Cheque/DD Payable to 'WeShip Private Limited' You can directly transfer the-->
          <!--            amount to our Bank Account No.626011025544 with Kotak Mahindra Bank (East Of Kailash),-->
          <!--            Account Type:-Current Account & IFSC Code:-KKBK0004583.</li-->
          <!--          >-->
          <!--          <li style="font-size: 8pt">-->
          <!--            All the invoices are to be cleared within 10 days from the date of receipt of the tax-->
          <!--            invoice.-->
          <!--          </li>-->
          <!--          <li style="font-size: 8pt">-->
          <!--            As mandated by the Central Board of Direct Taxes and Customs, WeShip only issues IRN-->
          <!--            pushed e-Invoices. All the invoices are directly sending to your registered Email ID.-->
          <!--          </li>-->
          <!--          <li style="font-size: 8pt">-->
          <!--            Please note that for Prepaid/Wallet customers, this tax invoice is for accounting-->
          <!--            purposes only.-->
          <!--          </li>-->
          <!--          <li style="font-size: 8pt">-->
          <!--            Request you to raise any kind of disputes within 7 days from the date of receipt of this-->
          <!--            invoice. Any disputes raised post that will not be entertained.-->
          <!--          </li>-->
          <!--          <li style="font-size: 8pt">-->
          <!--            In case the Tax Invoice is not cleared within the due date, WeShip may adjust the same-->
          <!--            against COD payable to you.-->
          <!--          </li>-->
          <!--          <li style="font-size: 8pt">-->
          <!--            WeShip is registered under MSME Act. Please make sure to clear all dues within the-->
          <!--            specified time under MSME Act to avoid being marked as Defaulter.-->
          <!--          </li>-->
        </n-space>
        <p style="font-size: 10pt; margin-top: 150px">Authorized Signature</p>
        <!--        <p style="font-size: 10pt">Seller Account Email ID: </p>-->
      </n-space>
    </div>
  </n-space>
</template>
<script lang="ts" setup>
  import { useRoute } from 'vue-router';
  import { getCurrentInstance, ref } from 'vue';
  import { websiteConfig } from '@/config/website.config';
  import { getCodCycleByID } from '@/api/finance/codcycle';

  const app: any = getCurrentInstance();
  const filters = app.appContext.config.globalProperties.$filters;
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
      getCodCycleByID(id).then(({ result }) => {
        invoiceData.value.push({ ...result.data });
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
    max-width: 250px;
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
