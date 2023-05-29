<template>
  <n-card>
    <n-space style="display: flex; justify-content: space-between">
      <n-space>
        <n-space
          style="
            gap: 8px 0px;

            border-width: 0.5px;
            border-color: rgba(199, 199, 199, 0.85);
            border-bottom-left-radius: 20px;
            border-top-left-radius: 20px;
          "
        >
          <n-dropdown size="small" trigger="hover" :options="optionsTwo" @select="handleSelectTwo">
            <n-button
              size="small"
              tertiary
              icon-placement="right"
              style="width: 170px; border-bottom-left-radius: 20px; border-top-left-radius: 20px"
            >
              {{ selectedFilterOptionTwo.label }}
              <template #icon>
                <n-icon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7 10l5 5l5-5H7z" fill="currentColor" />
                  </svg>
                </n-icon>
              </template>
            </n-button>
          </n-dropdown>
          <n-input size="small" placeholder="Type to Search" v-model:value="searchInput" />
        </n-space>
        <n-space style="gap: 8px 0; border-width: 0.5px; border-color: rgba(199, 199, 199, 0.85)">
          <n-date-picker
            class="date-picker-ndr-overview"
            v-model:value="range"
            type="daterange"
            clearable
            size="small"
            :default-value="[Date.now(), Date.now() + 86400000]"
            :is-date-disabled="disablePreviousDate"
            style="
              display: inline !important;
              border-bottom-right-radius: 20px;
              border-top-right-radius: 20px;
            "
          />
        </n-space>
      </n-space>

      <n-button size="small" round type="info" @click="handleDownloadClick">
        <template #icon>
          <n-icon>
            <download-outlined />
          </n-icon>
        </template>
        Download
      </n-button>
    </n-space>
    <n-data-table
      remote
      size="small"
      ref="table"
      :columns="columnsRef"
      :data="list"
      :scroll-x="1000"
      :loading="loading"
      :pagination="paginationReactive"
      :row-key="rowKey"
      @update:sorter="handleSort"
      @update:page="pageChange"
      style="margin-top: 20px"
    />
  </n-card>
</template>
<script lang="ts" setup>
  import { getCurrentInstance, ref } from 'vue';
  import { DownloadOutlined } from '@vicons/antd';
  import { useDataTables } from '@/hooks/useDataTables';
  import { DataTableColumn } from 'naive-ui';
  import { InternalRowData } from 'naive-ui/lib/data-table/src/interface';
  import { orderList } from '@/api/order';
  const app: any = getCurrentInstance();
  const filters = app.appContext.config.globalProperties.$filters;

  const range = ref<[number, number]>([1183135260000, Date.now()]);
  const date: DataTableColumn<InternalRowData> = {
    title: 'DATE',
    key: 'date',
    render(row) {
      return filters.dateFormat(row.date);
    },
  };
  const order_id: DataTableColumn<InternalRowData> = {
    title: 'ORDER ID',
    key: 'order_id',
  };
  const tracking_id: DataTableColumn<InternalRowData> = {
    title: 'TRACKING ID',
    key: 'tracking_id',
  };
  const client_order_id: DataTableColumn<InternalRowData> = {
    title: 'CLIENT ORDER ID',
    key: 'client_order_id',
  };
  const credit: DataTableColumn<InternalRowData> = {
    title: 'CREDIT',
    key: 'credit',
  };
  const debit: DataTableColumn<InternalRowData> = {
    title: 'DEBIT',
    key: 'debit',
  };
  const usable_balance: DataTableColumn<InternalRowData> = {
    title: 'USABLE BALANCE',
    key: 'usable_balance',
  };
  const remark: DataTableColumn<InternalRowData> = {
    title: 'REMARK',
    key: 'remark',
  };
  const columns: DataTableColumn[] = [
    date,
    order_id,
    tracking_id,
    credit,
    debit,
    usable_balance,
    remark,
  ];
  const { list, params, loading, getList, columnsRef, handleSort, pageChange, paginationReactive } =
    useDataTables(orderList, {
      client_order_id: client_order_id,
      order_id: order_id,
    });
  columnsRef.value = columns;

  const selectedFilterOptionTwo = ref({
    label: 'Tracking ID',
    key: 'trackingId',
  });
  const optionsTwo = [
    {
      label: 'Tracking ID',
      key: 'trackingId',
    },
    {
      label: 'Order ID',
      key: 'orderId',
    },
    {
      label: 'Client Order ID',
      key: 'clientOrderId',
    },
  ];

  function disablePreviousDate(ts: number) {
    return ts > Date.now();
  }
  function handleDownloadClick() {}
  function handleSelectTwo(key: string) {
    if (key === 'trackingId') {
      selectedFilterOptionTwo.value.key = key;
      selectedFilterOptionTwo.value.label = 'Tracking ID';
    } else if (key === 'orderId') {
      selectedFilterOptionTwo.value.key = key;
      selectedFilterOptionTwo.value.label = 'Order ID';
    } else {
      selectedFilterOptionTwo.value.key = key;
      selectedFilterOptionTwo.value.label = 'Client Order ID';
    }
  }
  function rowKey(rowData) {
    return rowData.id;
  }
</script>
