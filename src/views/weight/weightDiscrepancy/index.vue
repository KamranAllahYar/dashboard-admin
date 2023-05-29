<template>
  <n-space vertical style="margin: 20px">
    <n-space>
      <n-card
        style="
          border-radius: 12px;
          border-bottom: 4px solid rgb(38, 63, 151);
          height: 100%;
          width: 250px;
        "
      >
        <n-space vertical style="gap: 0px">
          <p class="text_font_color">0</p>
          <p class="text_font_color" style="font-size: 20px">Open Discrepancies</p>
          <p style="color: rgb(38, 63, 151); opacity: 0.6; font-size: 12px"> Number of orders </p>
        </n-space>
      </n-card>
      <n-card
        style="
          border-radius: 12px;
          border-bottom: 4px solid rgb(255, 153, 0);
          height: 100%;
          width: 250px;
        "
      >
        <n-space vertical style="gap: 0px">
          <p class="text_font_color">Rs.0</p>
          <p class="text_font_color" style="font-size: 20px">Disputed Amount</p>
        </n-space>
      </n-card>
      <n-card
        style="
          border-radius: 12px;
          border-bottom: 4px solid rgb(101, 191, 115);
          height: 100%;
          width: 250px;
        "
      >
        <n-space vertical style="gap: 0px">
          <p class="text_font_color">0</p>
          <p class="text_font_color" style="font-size: 20px">New Discrepancies</p>
          <p style="color: rgb(38, 63, 151); opacity: 0.6; font-size: 12px">
            Raised in last 24 hours
          </p>
        </n-space>
      </n-card>
      <n-card
        style="
          border-radius: 12px;
          border-bottom: 4px solid rgb(255, 60, 60);
          height: 100%;
          width: 250px;
        "
      >
        <n-space vertical style="gap: 0px">
          <p class="text_font_color">0</p>
          <p class="text_font_color" style="font-size: 20px">Closing soon</p>
          <p style="color: rgb(38, 63, 151); opacity: 0.6; font-size: 12px">
            Closing in next 24 hours
          </p>
        </n-space>
      </n-card>
    </n-space>
    <n-card style="border-radius: 12px; margin-top: 10px">
      <n-space vertical>
        <n-form ref="formRef" size="medium" label-placement="top">
          <n-space>
            <n-form-item label="Select Courier" :label-style="labelStyle">
              <n-select
                value-field="key"
                label-field="label"
                placeholder="Select Courier"
                :on-update:value="getCourierFilterList"
                :options="courierOptions"
                style="width: 200px"
                max-tag-count="responsive"
              />
            </n-form-item>
            <n-form-item label="Select and Search" :label-style="labelStyle">
              <n-space>
                <n-select
                  value-field="value"
                  label-field="label"
                  :on-update:value="getFilterList"
                  :options="options"
                  style="width: 200px"
                />
                <n-input
                  placeholder="Input search text"
                  style="width: 300px"
                  @change="getFilterValueList"
                />
              </n-space>
            </n-form-item>
          </n-space>
        </n-form>

        <n-data-table
          remote
          size="small"
          ref="table"
          :columns="columnsRef"
          :data="list"
          :loading="loading"
          :single-line="false"
          :pagination="paginationReactive"
          :row-key="rowKey"
          @update:sorter="handleSort"
          @update:page="pageChange"
        />
      </n-space>
    </n-card>
  </n-space>
</template>
<script lang="ts" setup>
  import { DataTableColumn, NText } from 'naive-ui';
  import { InternalRowData } from 'naive-ui/lib/data-table/src/interface';
  import { useDataTables } from '@/hooks/useDataTables';
  import { getCodCycleList } from '@/api/finance/codcycle';
  import { onMounted, h, reactive } from 'vue';

  const labelStyle = reactive({
    color: 'rgb(38, 63, 151)',
    'font-weight': 'bold',
  });
  const courierOptions = [
    {
      label: 'All',
      key: 'all',
    },
    {
      label: 'TCS',
      key: 'tcs',
    },
    {
      label: 'Leopard',
      key: 'leopard',
    },
    {
      label: 'PostEx',
      key: 'postex',
    },
    {
      label: 'Rider',
      key: 'rider',
    },
  ];
  // const app: any = getCurrentInstance();
  // const filters = app.appContext.config.globalProperties.$filters;
  const options = [
    {
      label: 'Client Order ID',
      value: 'client_order_id',
    },
    {
      label: 'Tracking ID',
      value: 'tracking_id',
    },
  ];
  const selection: DataTableColumn<InternalRowData> = {
    type: 'selection',
  };
  const discrepancy_date: DataTableColumn<InternalRowData> = {
    key: 'date',
    align: 'center',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
    title(column) {
      return h(
        NText,
        {
          size: '16',
          style: {
            fontWeight: 'bolder !important',
          },
        },
        { default: () => 'Discrepancy Date' }
      );
    },
    // render(row) {
    //   return filters.dateFormat(row.date);
    // },
  };
  const order_details: DataTableColumn<InternalRowData> = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
    title(column) {
      return h(
        NText,
        {
          size: '16',
          style: {
            fontWeight: 'bolder !important',
          },
        },
        { default: () => 'Order Details' }
      );
    },
    key: 'order_details',
    align: 'center',
  };

  const product_details: DataTableColumn<InternalRowData> = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
    title(column) {
      return h(
        NText,
        {
          size: '16',
          style: {
            fontWeight: 'bolder !important',
          },
        },
        { default: () => 'Product Details' }
      );
    },
    key: 'product_details',
    align: 'center',
  };

  const weight: DataTableColumn<InternalRowData> = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
    title(column) {
      return h(
        NText,
        {
          size: '16',
          style: {
            fontWeight: 'bolder !important',
          },
        },
        { default: () => 'Weight' }
      );
    },
    key: 'weight',
    align: 'center',
    children: [
      {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
        title(column) {
          return h(
            NText,
            {
              size: '16',
              style: {
                fontWeight: 'bolder !important',
              },
            },
            { default: () => 'Original' }
          );
        },
        key: 'original',
        align: 'center',
      },
      {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
        title(column) {
          return h(
            NText,
            {
              size: '16',
              style: {
                fontWeight: 'bolder !important',
              },
            },
            { default: () => 'Charged' }
          );
        },
        key: 'charged',
        align: 'center',
      },
      {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
        title(column) {
          return h(
            NText,
            {
              size: '16',
              style: {
                fontWeight: 'bolder !important',
              },
            },
            { default: () => 'Revised' }
          );
        },
        key: 'revised',
        align: 'center',
      },
    ],
  };
  const amount_onhold: DataTableColumn<InternalRowData> = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
    title(column) {
      return h(
        NText,
        {
          size: '16',
          style: {
            fontWeight: 'bolder !important',
          },
        },
        { default: () => 'Amount' }
      );
    },
    key: 'amount',
    align: 'center',
    children: [
      {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
        title(column) {
          return h(
            NText,
            {
              size: '16',
              style: {
                fontWeight: 'bolder !important',
              },
            },
            { default: () => 'On-hold' }
          );
        },
        key: 'on_hold',
        align: 'center',
      },
      {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
        title(column) {
          return h(
            NText,
            {
              size: '16',
              style: {
                fontWeight: 'bolder !important',
              },
            },
            { default: () => 'Refunded' }
          );
        },
        key: 'refunded',
        align: 'center',
      },
    ],
  };
  const status: DataTableColumn<InternalRowData> = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
    title(column) {
      return h(
        NText,
        {
          size: '16',
          style: {
            fontWeight: 'bolder !important',
          },
        },
        { default: () => 'Status' }
      );
    },
    key: 'status',
    align: 'center',
  };
  const action: DataTableColumn<InternalRowData> = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
    title(column) {
      return h(
        NText,
        {
          size: '16',
          style: {
            fontWeight: 'bolder !important',
          },
        },
        { default: () => 'Actions' }
      );
    },
    key: 'action',
    align: 'center',
  };

  //dynamic sorting data table
  const columns: DataTableColumn[] = [
    selection,
    discrepancy_date,
    order_details,
    product_details,
    weight,
    amount_onhold,
    status,
    action,
  ];
  const { getList, list, loading, columnsRef, handleSort, pageChange, paginationReactive } =
    useDataTables(getCodCycleList);
  columnsRef.value = columns;

  onMounted(() => {
    // getList();
  });
  function rowKey(rowData) {
    return rowData.id;
  }
</script>
<style scoped>
  .text_font_color {
    color: rgb(38, 63, 151);
    font-size: 28px;
    font-weight: bold;
  }
</style>
