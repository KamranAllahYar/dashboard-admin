<template>
  <n-space vertical>
    <n-card style="padding: 0 !important" class="custom_tab_block">
      <n-tabs type="bar" animated :on-update:value="onTabChange">
        <n-tab-pane
          v-model:value="actionSelectedStatus"
          v-for="(item, index) of tabOptions"
          :name="item?.key"
          :tab="item?.label"
          :key="index"
          style="padding: 0"
        />
      </n-tabs>
    </n-card>
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
                  style="
                    width: 170px;
                    border-bottom-left-radius: 20px;
                    border-top-left-radius: 20px;
                  "
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
                v-model:value="selectedDates"
                type="daterange"
                clearable
                size="small"
                :on-update:value="getDateTimeFilterList"
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
            <n-dropdown
              size="small"
              trigger="hover"
              pl
              :options="optionsTwo"
              @select="handleSelectTwo"
            >
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
            <n-input
              size="small"
              placeholder="Type to Search"
              v-model:value="searchInput"
              :on-update:value="getFilterTwoList"
            />
          </n-space>
        </n-space>

        <n-button hidden size="small" round type="info" @click="handleDownloadClick">
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
            filterable
            multiple
            size="small"
            placeholder="Select Courier"
            label-field="name"
            value-field="name"
            :loading="couriersLoading"
            :options="filteredCouriers"
            :on-update:value="getCourierFilterList"
            @search="filterCouriers"
            clearable
            style="width: 200px"
            max-tag-count="responsive"
          />
          <!--          <n-select-->
          <!--            multiple-->
          <!--            value-field="key"-->
          <!--            size="small"-->
          <!--            label-field="label"-->
          <!--            placeholder="Select Courier"-->
          <!--            :on-update:value="getCourierFilterList"-->
          <!--            :options="courierOptions"-->
          <!--            style="width: 200px"-->
          <!--            max-tag-count="responsive"-->
          <!--          />-->

          <n-select
            clearable
            value-field="key"
            size="small"
            label-field="label"
            placeholder="Attempt Count"
            :on-update:value="getAttemptFilterList"
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
        :pagination="paginationReactive"
        :row-key="rowKey"
        @update:sorter="handleSort"
        @update:page="pageChange"
        style="margin-top: 20px"
      />
    </n-card>
  </n-space>
</template>
<script lang="ts" setup>
  import { FilterOutlined, DownloadOutlined } from '@vicons/antd';
  import { getCurrentInstance, onMounted, ref } from 'vue';
  import { useDataTables } from '@/hooks/useDataTables';
  import { DataTableColumn, NButton, NDropdown, NIcon } from 'naive-ui';
  import { InternalRowData } from 'naive-ui/lib/data-table/src/interface';
  import { getNDRList } from '@/api/shipments';
  import { useCouriers } from '@/hooks/courier/useCouriers';

  const selectedDates: any = ref();
  let timer: any = null;
  const searchInput: any = ref();
  const showAllFilters = ref(false);
  const app: any = getCurrentInstance();
  const filters = app.appContext.config.globalProperties.$filters;
  const { filterCouriers, filteredCouriers, couriersLoading } = useCouriers();
  const selectedFilterOption = ref({
    label: 'Latest NDR Date',
    key: 'latestNdrDate',
  });
  const selectedFilterOptionTwo: any = ref({
    label: 'Tracking ID',
    key: 'trackingId',
  });

  const tabOptions = ref([
    {
      label: 'All',
      key: 'all',
    },
    {
      label: 'Open',
      key: 'open',
    },
    {
      label: 'Pending',
      key: 'pending',
    },
    {
      label: 'Closed',
      key: 'closed',
    },
  ]);

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
    render(row) {
      return filters.dateFormat(row.order_created_at);
    },
  };
  const latest_ndr_date: DataTableColumn<InternalRowData> = {
    title: 'Latest NDR Date',
    key: 'latest_ndr_date',
    render(row) {
      return filters.dateFormat(row.latest_ndr_date);
    },
  };
  const order_amount: DataTableColumn<InternalRowData> = {
    title: 'Order Amount',
    key: 'total_amount',
  };
  const NDR_substatusReason: DataTableColumn<InternalRowData> = {
    title: 'NDR Reason',
    key: 'ndr_reason',
  };
  const attempt_count: DataTableColumn<InternalRowData> = {
    title: 'ATTEMPT COUNT',
    key: 'reattempt_count',
    width: 200,
    fixed: 'right',
  };
  const courier_name: DataTableColumn<InternalRowData> = {
    title: 'COURIER',
    key: 'courier_name',
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
    attempt_count,
    courier_name,
    // action,
  ];

  const { list, getList, loading, columnsRef, params, handleSort, pageChange, paginationReactive } =
    useDataTables(getNDRList, {
      client_order_id: client_order_id,
      tracking_id: tracking_id,
    });
  columnsRef.value = columns;

  const options = [
    {
      label: 'Latest NDR Date',
      key: 'latest_ndr_date',
    },
    {
      label: 'Order Placed Date',
      key: 'order_placed_date',
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

  const attemptCountOptions = [
    {
      label: 'One',
      key: '1',
    },
    {
      label: 'Two',
      key: '2',
    },
    {
      label: 'Three',
      key: '3',
    },
    {
      label: 'Four',
      key: '4',
    },
  ];
  function getFilterTwoList(value) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      if (selectedFilterOptionTwo.value.key === 'trackingId') {
        delete params.value.client_order_id;
        params.value.tracking_id = value;
      } else if (selectedFilterOptionTwo.value.key === 'clientOrderId') {
        delete params.value.tracking_id;
        params.value.client_order_id = value;
      }
      getList();
    }, 500);
  }
  function getDateTimeFilterList(value) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      if (selectedFilterOption.value.key === 'latest_ndr_date') {
        delete params.value.order_placed_date;
        params.value.latest_ndr_date = value;
      } else if (selectedFilterOption.value.key === 'order_placed_date') {
        delete params.value.latest_ndr_date;
        params.value.order_placed_date = value;
      }
      getList();
    }, 500);
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
  onMounted(() => {
    getList();
  });

  function handleDownloadClick() {}

  function getCourierFilterList(value) {
    params.value.courier = value;
    getList();
  }
  function getAttemptFilterList(value) {
    params.value.attempt_count = value;
    getList();
  }
  function rowKey(rowData) {
    return rowData.id;
  }
  function onTabChange(statusId) {
    applyStatusFilter(statusId);
  }
  function applyStatusFilter(value) {
    params.value.ndr_status = value;
    getList();
  }
</script>
<style>
  .custom_tab_block {
    border-radius: 20px;
    display: flex;
    margin-top: 8px;
    justify-items: center;
    margin-bottom: 8px;
  }

  .n-tabs-tab__label {
    font-size: 15px;
    font-weight: 500;
  }

  .table_header_custom {
    border-width: 1px !important;
    width: 180px !important;
    font-weight: 500 !important;
    color: rgb(125, 140, 193) !important;
    text-align: center !important;
    letter-spacing: 0.2px !important;
    font-size: 13px !important;
  }

  .table_row_custom {
    border-width: 1px !important;
    width: 150px !important;
    font-size: 13px !important;
    color: rgb(38, 63, 151) !important;
    font-weight: 500 !important;
    text-align: center !important;
    letter-spacing: 0.2px !important;
    text-transform: capitalize;
  }
  .date-picker-ndr-overview {
    --n-border-hover: 0 !important;
    --n-border-focus: 0 !important;
  }
</style>
