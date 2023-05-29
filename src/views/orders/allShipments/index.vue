<template>
  <div>
    <n-card style="padding: 0 !important" class="custom_tab_block">
      <n-tabs type="bar" animated :on-update:value="onTabChange">
        <n-tab-pane
          v-model:value="actionSelectedStatus"
          v-for="(item, index) of statusOptions"
          :name="item?.id"
          :tab="item?.masking"
          :key="index"
          style="padding: 0"
        />
      </n-tabs>
    </n-card>
    <n-card style="border-radius: 20px">
      <n-space :vertical="true">
        <n-space justify="space-between">
          <n-h5 style="font-weight: bold; color: rgb(38, 63, 151)">All Shipments</n-h5>
          <n-space>
            <n-button
              type="warning"
              round
              @click="exportShipments"
              :disabled="list.length ? false : true"
            >
              Export Shipments
            </n-button>
          </n-space>
        </n-space>
        <n-divider style="margin-top: 0">Filters</n-divider>

        <n-form ref="formRef" size="medium" label-placement="top">
          <n-space>
            <n-form-item label="Select and Search" :label-style="labelStyle">
              <n-space>
                <n-select
                  value-field="value"
                  label-field="label"
                  clearable
                  :on-update:value="getFilterList"
                  :options="options"
                  style="width: 200px"
                />
              </n-space>
              <n-input
                placeholder="Input search text"
                style="width: 300px"
                @change="getFilterValueList"
              />
            </n-form-item>
            <n-form-item label="Select Date Time" :label-style="labelStyle">
              <n-select
                value-field="key"
                label-field="label"
                :options="dateTimeFilterOption"
                style="width: 200px"
                clearable
                placeholder="Please select column"
                :on-update:value="getDateTimeOptionFilterList"
              />
              <n-date-picker
                v-model:value="selectedDates"
                :on-update:value="getDateTimeFilterList"
                type="datetimerange"
                clearable
              />
            </n-form-item>
            <n-form-item label="Select Channel" :label-style="labelStyle">
              <n-select
                value-field="id"
                label-field="store_name"
                :options="merchant_channels"
                style="width: 200px"
                clearable
                :on-update:value="getChannelFilterList"
              />
            </n-form-item>
            <!--            <n-form-item label="Select Status" :label-style="labelStyle">-->
            <!--              <n-select-->
            <!--                v-model:value="actionSelectedStatus"-->
            <!--                :options="statusOptions"-->
            <!--                placeholder="Please Select Status"-->
            <!--                label-field="masking"-->
            <!--                value-field="id"-->
            <!--                :onChange="applyStatusFilter"-->
            <!--                style="width: 230px"-->
            <!--              />-->
            <!--            </n-form-item>-->
            <n-form-item label="Payment Method" :label-style="labelStyle">
              <n-select
                value-field="value"
                label-field="label"
                :options="optionsThree"
                :on-update:value="getPaymentMethodFilterList"
                style="width: 200px"
                clearable
              />
            </n-form-item>
            <n-form-item label="Merchant Pickup Location" :label-style="labelStyle">
              <n-select
                value-field="id"
                label-field="store_name"
                multiple
                :on-focus="getAddressList"
                :options="merchant_pickup_locations"
                :on-update:value="getPickupLocationFilterList"
                style="width: 280px"
                default-value="all"
              />
            </n-form-item>

            <n-form-item label="Search by Courier" :label-style="labelStyle">
              <n-select
                filterable
                placeholder="Select Courier"
                label-field="name"
                value-field="name"
                :loading="couriersLoading"
                :options="filteredCouriers"
                :on-update:value="getCourierFilterValueList"
                @search="filterCouriers"
                clearable
                style="width: 200px"
                max-tag-count="responsive"
              />
<!--              <n-input-->
<!--                placeholder="Input search text"-->
<!--                style="width: 300px"-->
<!--                @change="getCourierFilterValueList"-->
<!--              />-->
            </n-form-item>
          </n-space>
        </n-form>

        <n-collapse-transition :show="showActions">
          <n-divider style="margin-top: 0px; margin-bottom: 0px">Actions</n-divider>
          <n-space
            style="
              display: flex;
              justify-content: space-between;
              margin-top: 5px;
              margin-bottom: 5px;
            "
          >
            <n-space>
              <n-select
                v-model:value="actionSelectedStatus"
                :options="updateStatusOptions"
                placeholder="Please Select Order Status"
                label-field="masking"
                value-field="id"
                v-permission="{ action: ['manage order status'] }"
                :onChange="actionUpdateSelectedStatus"
                style="width: 230px"
              />
              <n-button type="info" round @click="bulkInvoiceButton">
                <template #icon>
                  <n-icon>
                    <file-done-outlined />
                  </n-icon>
                </template>
                Bulk Invoice
              </n-button>
              <n-button type="success" round @click="bulkLabelButton">
                <template #icon>
                  <n-icon>
                    <printer-outlined />
                  </n-icon>
                </template>
                Bulk Label
              </n-button>
            </n-space>
            <n-space>
              <n-button type="warning" round @click="actionExportSelectedOrders">
                Export Shipments
              </n-button>
              <n-button
                :hidden="activeStatusFilter !== 2"
                :loading="cancelLoaderRef"
                type="error"
                round
                @click="cancelSelected"
              >
                <template #icon>
                  <n-icon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M14.12 10.47L12 12.59l-2.13-2.12l-1.41 1.41L10.59 14l-2.12 2.12l1.41 1.41L12 15.41l2.12 2.12l1.41-1.41L13.41 14l2.12-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4zM6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9z"
                        fill="currentColor"
                      />
                    </svg>
                  </n-icon>
                </template>
                Cancel Shipments
              </n-button>
            </n-space>
          </n-space>
        </n-collapse-transition>

        <n-data-table
          remote
          ref="table"
          :columns="columnsRef"
          :data="list"
          :scroll-x="1800"
          :loading="loading"
          :pagination="paginationReactive"
          :row-key="rowKey"
          @update:sorter="handleSort"
          @update:page="pageChange"
          @update:checked-row-keys="handleCheck"
        />

        <div v-if="emptyState" style="display: flex; justify-content: center; height: 300px">
          <n-space :vertical="true" style="display: flex; justify-content: center; height: 300px">
            <img style="width: 100px; height: 100px" :src="emptyStateImg" />
            <p>No results found</p></n-space
          >
        </div>
      </n-space>
    </n-card>
    <n-drawer v-model:show="active" :width="502" height="450" :placement="placement">
      <n-drawer-content title="Item Details" closable>
        <n-space style="overflow-x: auto">
          <n-table
            :single-line="true"
            :bordered="true"
            style="width: 1450px; word-wrap: break-word; table-layout: fixed"
          >
            <thead>
              <tr>
                <th class="table_header_custom">ITEM NAME / SKU</th>
                <th class="table_header_custom">VARIANT TITLE</th>
                <th class="table_header_custom">QUANTITY</th>
                <th class="table_header_custom">ITEM PRICE</th>
                <th class="table_header_custom">ITEM TAX %</th>
                <th class="table_header_custom">PRICE WITH TAX</th>
                <th class="table_header_custom">ITEM HEIGHT</th>
                <th class="table_header_custom">ITEM LENGTH</th>
                <th class="table_header_custom">ITEM BREADTH</th>
                <th class="table_header_custom">ITEM WEIGHT</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in formValue" :key="index">
                <td class="table_row_custom">{{ item?.item_name }} / {{ item?.sku }}</td>
                <td class="table_row_custom">{{ item?.variant_title }}</td>
                <td class="table_row_custom">{{ item?.quantity }}</td>
                <td class="table_row_custom">{{ item?.unit_price }}</td>
                <td class="table_row_custom">{{ item?.total_tax_percentage }}</td>
                <td class="table_row_custom">
                  {{
                    parseFloat(item?.quantity) *
                    (parseFloat(item?.unit_price) +
                      parseFloat((item?.total_tax_percentage / 100) * item?.unit_price))
                  }}
                </td>
                <td class="table_row_custom">{{ item?.item_height }}</td>
                <td class="table_row_custom">{{ item?.item_length }}</td>
                <td class="table_row_custom">{{ item?.item_breadth }}</td>
                <td class="table_row_custom">{{ item?.item_weight }}</td>
              </tr>
            </tbody>
          </n-table>
        </n-space>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>
<script lang="ts" setup>
  import { useDataTables } from '@/hooks/useDataTables';
  import {
    cancelOrder,
    exportOrderShipmentList,
    shipmentsList,
    updateShipmentStatus,
  } from '@/api/order';
  import { Component, getCurrentInstance, h, onMounted, reactive, ref } from 'vue';
  import {
    MoreOutlined,
    DeleteOutlined,
    BarsOutlined,
    FileDoneOutlined,
    PrinterOutlined,
    CompassOutlined,
  } from '@vicons/antd';
  import {
    DataTableColumn,
    NDropdown,
    NSelect,
    NButton,
    NIcon,
    NTag,
    useDialog,
    useMessage,
    DataTableRowKey,
    DrawerPlacement,
  } from 'naive-ui';
  import { useRouter } from 'vue-router';
  import { ResultEnum } from '@/enums/httpEnum';
  import emptyStateImg from '@/assets/images/empty-folder.png';
  import { InternalRowData } from 'naive-ui/lib/data-table/src/interface';
  import { useAdminSettingStore } from '@/store/modules/adminSetting';
  import { usePermission } from '@/hooks/web/usePermission';
  import { getMerchantChannelMappingList } from '@/api/channels/mapping';
  import { getAddresses } from '@/api/settings/addresses';
  import { useGlobSetting } from '@/hooks/setting';
  import { useCouriers } from "@/hooks/courier/useCouriers";

  const { filterCouriers, filteredCouriers, couriersLoading } = useCouriers();
  const globSetting = useGlobSetting();
  const checkedRowKeysRef = ref<DataTableRowKey[]>([]);
  const showActions = ref(false);
  const actionSelectedStatus: any = ref();
  const adminStatusStore = useAdminSettingStore();
  const statusOptions = JSON.parse(
    JSON.stringify(adminStatusStore.getOrderStatuses.filter((item) => item.masking !== 'Placed'))
  );
  const updateStatusOptions = JSON.parse(JSON.stringify(adminStatusStore.getOrderStatuses));
  const app: any = getCurrentInstance();
  const filters = app.appContext.config.globalProperties.$filters;
  const formValue: any = ref([]);
  const merchant_channels: any = ref([]);
  const dateTimeFilterOption: any = ref([
    {
      label: 'Created At',
      key: 'order_created_at',
    },
    {
      label: 'Manifested',
      key: 'manifested',
    },
  ]);
  const merchant_pickup_locations: any = ref([]);
  type DrawerPlacement = 'right' | 'left' | 'top' | 'bottom';
  const activeStatusFilter: any = ref();
  const active = ref(false);
  const placement = ref<DrawerPlacement>('right');
  const selectedDateTimeColumn: any = ref();
  const selectedDateTime: any = ref();
  const activate = (place: DrawerPlacement) => {
    active.value = true;
    placement.value = place;
  };
  const selectedDates: any = ref();

  //columns
  const selection: DataTableColumn<InternalRowData> = {
    type: 'selection',
  };
  const order_id: DataTableColumn<InternalRowData> = {
    title: 'ORDER ID',
    key: 'orders.order_id',
    sorter: true,
    width: 150,
    sortOrder: false,
    render(row) {
      return h(
        NButton,
        {
          strong: true,
          tertiary: true,
          text: true,
          size: 'small',
          onClick: () => openDetails(row),
        },
        { default: () => row.order_id }
      );
    },
  };
  const client_order_id: DataTableColumn<InternalRowData> = {
    title: 'CLIENT ORDER ID',
    key: 'client_order_id',
    width: 150,
  };
  const customer_city: DataTableColumn<InternalRowData> = {
    title: 'CITY',
    key: 'customer_city',
    width: 150,
  };
  const customer_phone: DataTableColumn<InternalRowData> = {
    title: 'PHONE',
    key: 'customer_phone',
    width: 150,
  };
  const customer_address: DataTableColumn<InternalRowData> = {
    title: 'ADDRESS',
    key: 'customer_address',
    width: 150,
  };
  const product_details: DataTableColumn<InternalRowData> = {
    title: 'PRODUCT DETAILS',
    key: 'total_boxes',
    sorter: true,
    width: 200,
    sortOrder: false,
    render(row) {
      return h(
        'div',
        {
          style: {
            display: 'flex',
            flexDirection: 'column',
          },
        },
        [
          // h('div', {}, 'Bag'),
          h(
            'div',
            {
              style: {
                display: 'flex',
                flexDirection: 'row',
              },
            },
            [
              h('div', {}, `+${row?.items?.length || '0'} more`),
              h(
                'div',
                {
                  style: {
                    fontWeight: '600',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    marginLeft: '6px',
                  },
                  onClick: () => {
                    activate('bottom');
                    formValue.value = row.items;
                  },
                },
                `View All`
              ),
            ]
          ),
        ]
      );
    },
  };
  const order_created_at: DataTableColumn<InternalRowData> = {
    title: 'PLACED AT',
    key: 'order_created_at',
    width: 200,
    render(row) {
      return h(
        'div',
        {
          style: {
            display: 'flex',
            flexDirection: 'column',
          },
        },
        [
          h('div', {}, filters.dateFormat(row.order_created_at)),
          // h(
          //   NTag,
          //   {
          //     style: {
          //       padding: '.6em 1.5em',
          //       width: 'fit-content',
          //       backgroundColor: 'rgba(0,0,0,0.06)',
          //       color: 'rgba(39,63,151,0.97)',
          //       fontWeight: '500',
          //     },
          //     bordered: false,
          //     round: true,
          //   },
          //   {
          //     default: () => 'Original',
          //   }
          // ),
        ]
      );
    },
  };
  const shipment_placed_at: DataTableColumn<InternalRowData> = {
    title: 'MANIFESTED AT',
    key: 'shipment_placed_at',
    width: 200,
    render(row) {
      return h(
        'div',
        {
          style: {
            display: 'flex',
            flexDirection: 'column',
          },
        },
        [
          h('div', {}, row.shipment_placed_at ? filters.dateFormat(row.shipment_placed_at) : ''),
          // h(
          //   NTag,
          //   {
          //     style: {
          //       padding: '.6em 1.5em',
          //       width: 'fit-content',
          //       backgroundColor: 'rgba(0,0,0,0.06)',
          //       color: 'rgba(39,63,151,0.97)',
          //       fontWeight: '500',
          //     },
          //     bordered: false,
          //     round: true,
          //   },
          //   {
          //     default: () => 'Original',
          //   }
          // ),
        ]
      );
    },
  };
  // const dimensions: DataTableColumn<InternalRowData> = {
  //   title: 'DIMENSIONS',
  //   key: 'dimensions',
  //   width: 200,
  //   render(row) {
  //     return h(
  //       'div',
  //       {
  //         style: {
  //           display: 'flex',
  //           flexDirection: 'column',
  //         },
  //       },
  //       [
  //         //@ts-ignore
  //         h(
  //           'div',
  //           {},
  //           `Dimensions: ${parseFloat(row?.shipment_length).toFixed(0)} x ${parseFloat(
  //             row?.shipment_breadth
  //           ).toFixed(0)} x ${parseFloat(row?.shipment_height).toFixed(0)}`
  //         ),
  //         //@ts-ignore
  //         h('div', {}, `Weight: ${parseFloat(row?.shipment_weight).toFixed(0)}kg`),
  //       ]
  //     );
  //   },
  // };
  const tracking_id: DataTableColumn<InternalRowData> = {
    title: 'TRACKING ID',
    key: 'tracking_id',
    width: 160,
    render(row) {
      return h(
        'a',
        {
          style: {
            fontWeight: '600',
            cursor: 'pointer',
            textDecoration: 'underline',
            marginLeft: '6px',
          },
          href: `${globSetting.frontendUrl}/track?trackingId=${row.tracking_id}`,
          target: '_blank',
        },
        `${row?.tracking_id}`
      );
    },
  };
  const courier_name: DataTableColumn<InternalRowData> = {
    title: 'COURIER',
    key: 'courier_name',
    width: 150,
  };
  const order_amount: DataTableColumn<InternalRowData> = {
    title: 'ORDER AMOUNT',
    width: 180,
    key: 'total_amount',
    render(row) {
      return h('div', {}, `Rs ${row?.total_amount}`);
    },
  };
  const status_placeholder: DataTableColumn<InternalRowData> = {
    title: 'Status',
    key: 'status',
    fixed: 'right',
    width: 200,
    render(row): any {
      const tags = row.status;
      return h(
        NTag,
        {
          style: {
            marginRight: '6px',
          },
          type: 'success',
          bordered: false,
        },
        {
          default: () => tags,
        }
      );
      return tags;
    },
  };
  const renderIcon = (icon: Component) => {
    return () => {
      return h(NIcon, null, {
        default: () => h(icon),
      });
    };
  };

  const moreOptions = [
    {
      label: 'Track',
      key: 'track',
      icon: renderIcon(CompassOutlined),
    },
    {
      label: 'Invoice',
      key: 'invoice',
      icon: renderIcon(FileDoneOutlined),
    },
    {
      label: 'Label',
      key: 'label',
      icon: renderIcon(PrinterOutlined),
    },
    {
      label: 'Details',
      key: 'details',
      icon: renderIcon(BarsOutlined),
    },
    {
      label: 'Cancel Shipment',
      key: 'cancel',
      icon: renderIcon(DeleteOutlined),
    },
  ];
  const action: DataTableColumn<InternalRowData> = {
    title: 'Action',
    key: 'actions',
    width: 100,
    fixed: 'right',
    render(row) {
      return h(
        NDropdown,
        {
          trigger: 'click',
          onSelect: selectedAction,
          options: moreOptions,
          onClick: () => actionOperation(row),
        },
        {
          default: () => {
            return h(
              NButton,
              {
                strong: true,
                tertiary: true,
                circle: true,
                size: 'small',
              },
              {
                default: () =>
                  h(NIcon, null, {
                    default: () => h(MoreOutlined),
                  }),
              }
            );
          },
        }
      );
    },
  };
  const status: DataTableColumn<InternalRowData> = {
    title: 'Status',
    key: 'status',
    fixed: 'right',
    width: 200,
    render(row) {
      //@ts-ignore
      return h(NSelect, {
        'default-value': row.status,
        valueField: 'id',
        labelField: 'masking',
        options: updateStatusOptions,
        'on-update:value': (val) => {
          let data = {
            ids: [row.id],
            status_id: val,
          };
          updateShipmentStatus(data).then(({ result }) => {
            list.value = [];
            window['$message'].success(result.message);
            getList();
          });
        },
      });
    },
  };
  const {
    list,
    params,
    loading,
    getList,
    sorting,
    columnsRef,
    handleSort,
    pageChange,
    paginationReactive,
  } = useDataTables(shipmentsList, {
    order_id: order_id,
    tracking_id: tracking_id,
    order_created_at: order_created_at,
  });

  const getMerchantChannels = () =>
    getMerchantChannelMappingList().then(({ result }) => {
      merchant_channels.value = result.data;
    });
  const options = [
    {
      label: 'Order ID',
      value: 'shipments.order_id',
    },
    {
      label: 'Tracking ID',
      value: 'shipments.tracking_id',
    },
    {
      label: 'Customer Phone',
      value: 'customer_addresses.phone',
    },
    {
      label: 'Customer Address',
      value: 'customer_addresses.address1',
    },
    {
      label: 'Customer City',
      value: 'customer_addresses.city',
    },
    {
      label: 'Item Name',
      value: 'order_items.item_name',
    },
    {
      label: 'SKU',
      value: 'order_items.sku',
    },

    {
      label: 'Order Type',
      value: 'orders.order_place_type',
    },
    {
      label: 'Variant Title',
      value: 'order_items.variant_title',
    },
  ];

  const optionsThree = [
    {
      label: 'Pre-Paid',
      value: 'prepaid',
    },
    {
      label: 'COD',
      value: 'cod',
    },
  ];

  const message = useMessage();
  const selectedId = ref(null);
  const dialog = useDialog();
  const router = useRouter();
  const selectedOption: any = ref(null);
  const emptyState = ref(false);
  const cancelLoaderRef = ref(false);
  const labelStyle = reactive({
    color: 'rgb(38, 63, 151)',
    'font-weight': 'bold',
  });

  //dynamic sorting data table
  const columns: DataTableColumn[] = [
    selection,
    order_id,
    client_order_id,
    product_details,
    tracking_id,
    courier_name,
    order_created_at,
    shipment_placed_at,
    // dimensions,
    order_amount,
    customer_city,
    customer_phone,
    customer_address,
  ];
  const { hasPermission } = usePermission();
  if (hasPermission(['manage order status'])) {
    columns.splice(13, 0, status);
    columns.splice(14, 0, action);
  } else {
    columns.splice(13, 0, status_placeholder);
    columns.splice(14, 0, action);
  }
  columnsRef.value = columns;

  onMounted(() => {
    sorting.value = {
      column: 'order_created_at',
      orderBy: 'desc',
    };
    activeStatusFilter.value = 2;
    params.value.orderStatus = 2;
    getList();
    getMerchantChannels();
  });

  const actionOperation = (item) => {
    if (selectedOption.value === 'details') {
      // selectedId.value = item.id;
      router.push({ name: 'OrderDetails', params: { id: item.id } });
    } else if (selectedOption.value === 'cancel') {
      selectedId.value = item.id;
      confirmationDialog();
    } else if (selectedOption.value === 'track') {
      window.open(`${globSetting.frontendUrl}/track?trackingId=${item.tracking_id}`, '_blank');
    } else if (selectedOption.value === 'invoice') {
      if (item.tracking_id) {
        const routeData = router.resolve({ name: 'InvoicePrint', params: { id: item.id } });
        window.open(routeData.href, '_blank');
      } else {
        message.error('Please create shipment for the order first');
      }
    } else if (selectedOption.value === 'label') {
      if (item.tracking_id) {
        const routeData = router.resolve({ name: 'LabelPrint', params: { id: item.id } });
        window.open(routeData.href, '_blank');
      } else {
        message.error('Please create shipment for the order first');
      }
    }
    selectedOption.value = null;
  };

  function confirmationDialog() {
    dialog.error({
      title: 'Confirmation',
      content: () => 'Are you sure you want to cancel the order?',
      positiveText: 'Confirm',
      negativeText: 'Cancel',
      onPositiveClick: cancelOperation,
    });
  }

  const selectedAction = (key) => {
    selectedOption.value = key;
  };

  function cancelOperation() {
    const Loading = window['$loading'] || null;
    Loading.start();
    cancelOrder(selectedId.value)
      .then(({ result, code }) => {
        if (code === ResultEnum.SUCCESS) {
          message.success(result.message);
          getList();
          Loading.finish();
          dialog.destroyAll;
        }
      })
      .catch(({ result }) => {
        message.error(result.message);
        Loading.finish();
        dialog.destroyAll;
      });
    selectedId.value = null;
  }

  function rowKey(rowData) {
    return rowData.id;
  }

  function getFilterList(value) {
    params.value.filterColumn = value;
  }

  function getDateTimeFilterList(value) {
    const startDate = new Date(value[0]);
    const endDate = new Date(value[1]);

    // Set the start date to the start of the day.
    startDate.setHours(0, 0, 0, 0);

    // Set the end date to the end of the day.
    endDate.setHours(23, 59, 59, 999);
    selectedDates.value = [startDate.getTime(), endDate.getTime()];
    if (selectedDateTimeColumn.value) {
      if (selectedDateTimeColumn.value === 'order_created_at') {
        params.value.order_created_at = selectedDates.value;
        delete params.value.manifested;
      } else if (selectedDateTimeColumn.value === 'manifested') {
        params.value.manifested = selectedDates.value;
        delete params.value.order_created_at;
      }
      getList();
    } else {
      message.warning('Please select date time filter column');
    }
  }

  function getChannelFilterList(value) {
    params.value.merchant_channel_mapping_id = value;
    getList();
  }

  function getDateTimeOptionFilterList(value) {
    selectedDateTimeColumn.value = value;
    if (selectedDates.value) {
      if (value === 'order_created_at') {
        delete params.value.manifested;
        params.value.order_created_at = selectedDates;
      } else if (value === 'manifested') {
        delete params.value.order_created_at;
        params.value.manifested = selectedDates;
      }
      getList();
    }
  }

  function getPaymentMethodFilterList(value) {
    params.value.payment_method = value;
    getList();
  }

  function getPickupLocationFilterList(value) {
    params.value.merchant_pickup_location = value;
    getList();
  }

  function getFilterValueList(value) {
    params.value.filterValue = value;
    getList();
  }

  // function getCityFilterValueList(value) {
  //   params.value.destinationCity = value;
  //   getList();
  // }
  function getCourierFilterValueList(value) {
    params.value.courier = value;
    getList();
  }

  function handleCheck(rowKeys: DataTableRowKey[]) {
    checkedRowKeysRef.value = rowKeys;
    if (checkedRowKeysRef.value.length >= 1) {
      showActions.value = true;
    } else {
      showActions.value = false;
      actionSelectedStatus.value = null;
    }
  }

  function actionExportSelectedOrders() {
    dialog.info({
      title: 'Confirmation',
      content: () => 'Are you sure you want to export orders for selected?',
      positiveText: 'Export',
      negativeText: 'Cancel',
      onPositiveClick: () => {
        params.value.selected_ids = checkedRowKeysRef.value;
        exportOrderShipmentList(params.value);
        params.value.selected_ids = [];
        checkedRowKeysRef.value = [];
      },
    });
  }

  function applyStatusFilter(id) {
    activeStatusFilter.value = id;
    params.value.orderStatus = id;
    getList();
  }

  function getAddressList() {
    getAddresses({}).then(({ result }) => {
      merchant_pickup_locations.value = result.data;
    });
  }

  function onTabChange(statusId) {
    applyStatusFilter(statusId);
  }

  function cancelSelected() {
    dialog.error({
      title: 'Confirmation',
      content: () => 'Are you sure you want to cancel the selected shipments?',
      positiveText: 'Confirm',
      negativeText: 'Cancel',
      onPositiveClick: async () => {
        cancelLoaderRef.value = true;
        for (const id of checkedRowKeysRef.value) {
          await cancelOrder(id)
            .then(({ result, code }) => {
              if (code === ResultEnum.SUCCESS) {
                message.success(result.message);
              }
            })
            .catch(({ result }) => {
              message.error(result.message);
            });
        }
        cancelLoaderRef.value = false;
        list.value = [];
        checkedRowKeysRef.value = [];
        getList();
      },
    });
  }

  function actionUpdateSelectedStatus(value) {
    dialog.info({
      title: 'Confirmation',
      content: () => 'Are you sure you want to update the status for selected orders?',
      positiveText: 'Update',
      negativeText: 'Cancel',
      onPositiveClick: () => {
        let data = {
          ids: checkedRowKeysRef.value,
          status_id: value,
        };
        updateShipmentStatus(data).then(({ result }) => {
          list.value = [];
          checkedRowKeysRef.value = [];
          window['$message'].success(result.message);
          getList();
        });
      },
    });
  }

  function bulkInvoiceButton() {
    let shipmentCreated = true;
    let obj;
    for (const id of checkedRowKeysRef.value) {
      if (shipmentCreated) {
        obj = list.value.find((o: any) => {
          if (o.id === id && !o.tracking_id) {
            shipmentCreated = false;
            return o;
          }
        });
      }
    }
    if (shipmentCreated) {
      const routeData = router.resolve({
        name: 'InvoicePrint',
        params: { id: checkedRowKeysRef.value.join(',') },
      });
      window.open(routeData.href, '_blank');
    } else {
      message.warning(`Shipment not created for the order # ${obj.order_id}`);
    }
  }

  function bulkLabelButton() {
    let shipmentCreated = true;
    let obj;
    for (const id of checkedRowKeysRef.value) {
      if (id) {
        if (shipmentCreated) {
          obj = list.value.find((o: any) => {
            if (o.id === id && !o.tracking_id) {
              shipmentCreated = false;
              return o;
            }
          });
        }
      }
    }
    if (shipmentCreated) {
      const routeData = router.resolve({
        name: 'LabelPrint',
        params: { id: checkedRowKeysRef.value.join(',') },
      });
      window.open(routeData.href, '_blank');
    } else {
      message.warning(`Shipment not created for the order # ${obj.order_id}`);
    }
  }

  function openDetails(item) {
    router.push({ name: 'OrderDetails', params: { id: item.id } });
  }

  // function disablePreviousDate(ts: number) {
  //   return ts > Date.now();
  // }

  function exportShipments() {
    exportOrderShipmentList(params.value);
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
</style>
