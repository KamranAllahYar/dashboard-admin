<template>
  <n-card>
    <n-space style="display: flex; justify-content: space-between">
      <n-space>
        <div
          style="border-width: 1px; border-color: rgba(199, 199, 199, 0.85); border-radius: 20px"
        >
          <n-button size="small" tertiary round @click="showAllFilters = !showAllFilters">
            <template #icon>
              <n-icon>
                <filter-outlined />
              </n-icon>
            </template>
            All Filters
          </n-button>
        </div>
        <n-space
          style="
            gap: 8px 0;
            border-width: 0.5px;
            border-color: rgba(199, 199, 199, 0.85);
            border-bottom-left-radius: 20px;
            border-top-left-radius: 20px;
          "
        >
          <div>
            <n-dropdown size="small" trigger="hover" :options="options" @select="handleSelect">
              <n-button
                size="small"
                tertiary
                icon-placement="right"
                style="width: 170px; border-bottom-left-radius: 20px; border-top-left-radius: 20px"
              >
                {{ selectedFilterOption.label }}
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
          </div>
          <div style="width: 260px">
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
          </div>
        </n-space>
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
    <n-collapse-transition :show="showAllFilters" style="margin-top: 20px; margin-bottom: 10px">
      <n-space>
        <n-select
          multiple
          value-field="key"
          size="small"
          label-field="label"
          placeholder="Select Courier"
          :on-update:value="getCourierFilterList"
          :options="courierOptions"
          style="width: 200px"
          max-tag-count="responsive"
        />
        <n-select
          multiple
          value-field="key"
          size="small"
          label-field="label"
          placeholder="NDR Reason"
          :on-update:value="getCourierFilterList"
          :options="ndrReasonOptions"
          style="width: 200px"
          max-tag-count="responsive"
        />
        <n-select
          clearable
          value-field="key"
          size="small"
          label-field="label"
          placeholder="Attempt Count"
          :on-update:value="getCourierFilterList"
          :options="attemptCountOptions"
          style="width: 200px"
          max-tag-count="responsive"
        />
      </n-space>
    </n-collapse-transition>
    <n-data-table
      remote
      size="small"
      ref="table"
      :columns="columnsRef"
      :data="list"
      :scroll-x="1800"
      :loading="loading"
      :single-line="false"
      :pagination="paginationReactive"
      :row-key="rowKey"
      @update:sorter="handleSort"
      @update:page="pageChange"
      style="margin-top: 20px"
    />
  </n-card>
</template>
<script lang="ts" setup>
  import { FilterOutlined, DownloadOutlined, MoreOutlined } from '@vicons/antd';
  import { h, ref } from 'vue';
  import { useDataTables } from '@/hooks/useDataTables';
  import { orderList } from '@/api/order';
  import { DataTableColumn, NButton, NDropdown, NIcon } from 'naive-ui';
  import { InternalRowData } from 'naive-ui/lib/data-table/src/interface';

  const searchInput: any = ref();
  const showAllFilters = ref(false);
  const range = ref<[number, number]>([1183135260000, Date.now()]);
  const selectedFilterOption = ref({
    label: 'Latest NDR Date',
    key: 'latestNdrDate',
  });
  const selectedFilterOptionTwo = ref({
    label: 'Tracking ID',
    key: 'trackingId',
  });

  const client_order_id: DataTableColumn<InternalRowData> = {
    title: 'Client Order ID',
    key: 'client_order_id',
  };
  const tracking_id: DataTableColumn<InternalRowData> = {
    title: 'Tracking ID',
    key: 'tracking_id',
  };
  const order_placed_date: DataTableColumn<InternalRowData> = {
    title: 'Order Placed Date',
    key: 'order_created_at',
  };
  const latest_ndr_date: DataTableColumn<InternalRowData> = {
    title: 'Latest NDR Date',
    key: 'latest_ndr_date',
  };
  const order_amount: DataTableColumn<InternalRowData> = {
    title: 'Order Amount',
    key: 'order_amount',
  };
  const NDR_substatusReason: DataTableColumn<InternalRowData> = {
    title: 'NDR Substatus | NDR Reason',
    key: 'NDR_substatus',
  };
  const created_at: DataTableColumn<InternalRowData> = {
    title: 'Created At',
    key: 'created_at',
  };
  const initiated_action: DataTableColumn<InternalRowData> = {
    title: 'Initiated Action',
    key: 'initiated_action',
  };
  const order_status: DataTableColumn<InternalRowData> = {
    title: 'Order Status',
    key: 'order_status',
  };
  const exception: DataTableColumn<InternalRowData> = {
    title: 'Exception',
    key: 'exception',
    width: 200,
    fixed: 'right',
  };
  const attempt_count: DataTableColumn<InternalRowData> = {
    title: 'Attempt Count',
    key: 'attempt_count',
  };
  const courier_name: DataTableColumn<InternalRowData> = {
    title: 'Courier',
    key: 'courier_name',
  };
  const action: DataTableColumn<InternalRowData> = {
    title: 'Action',
    key: 'action',
    width: 200,
    fixed: 'right',
  };

  // const action: DataTableColumn<InternalRowData> = {
  //   title: 'Action',
  //   key: 'actions',
  //   render(row) {
  //     return h(
  //       NDropdown,
  //       {
  //         trigger: 'click',
  //         onSelect: selectedAction,
  //         options: moreOptions,
  //         onClick: () => actionOperation(row),
  //       },
  //       {
  //         default: () => {
  //           return h(
  //             NButton,
  //             {
  //               strong: true,
  //               tertiary: true,
  //               circle: true,
  //               size: 'small',
  //             },
  //             {
  //               default: () =>
  //                 h(NIcon, null, {
  //                   default: () => h(MoreOutlined),
  //                 }),
  //             }
  //           );
  //         },
  //       }
  //     );
  //   },
  // };

  //dynamic sorting data table
  const columns: DataTableColumn[] = [
    client_order_id,
    tracking_id,
    order_placed_date,
    latest_ndr_date,
    order_amount,
    NDR_substatusReason,
    created_at,
    attempt_count,
    courier_name,
    initiated_action,
    order_status,
    exception,
    action,
  ];

  const { list, params, loading, getList, columnsRef, handleSort, pageChange, paginationReactive } =
    useDataTables(orderList, {
      client_order_id: client_order_id,
      tracking_id: tracking_id,
    });
  columnsRef.value = columns;

  const options = [
    {
      label: 'Latest NDR Date',
      key: 'latestNdrDate',
    },
    {
      label: 'Order Placed Date',
      key: 'orderPlacedDate',
    },
  ];
  const optionsTwo = [
    {
      label: 'Tracking ID',
      key: 'trackingId',
    },
    {
      label: 'Client Order ID',
      key: 'clientOrderId',
    },
  ];
  const courierOptions = [
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
  const ndrReasonOptions = [
    {
      label: 'CR-OTP',
      key: 'cr-otp',
    },
    {
      label: 'CD',
      key: 'cd',
    },
    {
      label: 'OTH',
      key: 'oth',
    },
    {
      label: 'CNR',
      key: 'cnr',
    },
  ];
  const attemptCountOptions = [
    {
      label: 'One',
      key: 'one',
    },
    {
      label: 'Two',
      key: 'two',
    },
    {
      label: 'Three',
      key: 'three',
    },
    {
      label: 'Four',
      key: 'four',
    },
  ];

  function disablePreviousDate(ts: number) {
    return ts > Date.now();
  }

  function handleSelect(key: string) {
    if (key === 'latestNdrDate') {
      selectedFilterOption.value.key = key;
      selectedFilterOption.value.label = 'Latest NDR Date';
    } else {
      selectedFilterOption.value.key = key;
      selectedFilterOption.value.label = 'Order Placed Date';
    }
  }
  function handleSelectTwo(key: string) {
    if (key === 'trackingId') {
      selectedFilterOptionTwo.value.key = key;
      selectedFilterOptionTwo.value.label = 'Tracking ID';
    } else {
      selectedFilterOptionTwo.value.key = key;
      selectedFilterOptionTwo.value.label = 'Client Order ID';
    }
  }
  function handleClick() {}

  function handleDownloadClick() {}

  function getCourierFilterList() {}
  function rowKey(rowData) {
    return rowData.id;
  }
</script>
<style>
  .date-picker-ndr-overview {
    --n-border-hover: 0 !important;
    --n-border-focus: 0 !important;
  }
</style>
