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
          <n-h5 style="font-weight: bold; color: rgb(38, 63, 151)">All Orders</n-h5>
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
        <n-form ref="formRef" size="medium" label-placement="top">
          <n-space>
            <n-form-item label="Select and Search" :label-style="labelStyle">
              <n-space>
                <n-select
                  value-field="value"
                  label-field="label"
                  :on-update:value="getFilterList"
                  clearable
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
                clearable
                style="width: 200px"
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
            <n-form-item
              label="Merchant Pickup Location"
              :label-style="labelStyle"
              :hidden="activeStatusFilter === 1"
            >
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
              <n-input
                placeholder="Input search text"
                style="width: 300px"
                @change="getCourierFilterValueList"
              />
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
              <n-button
                :hidden="activeStatusFilter === 1"
                type="info"
                round
                @click="bulkInvoiceButton"
              >
                <template #icon>
                  <n-icon>
                    <file-done-outlined />
                  </n-icon>
                </template>
                Bulk Invoice
              </n-button>
              <n-button
                :hidden="activeStatusFilter === 1"
                type="success"
                round
                @click="bulkLabelButton"
              >
                <template #icon>
                  <n-icon>
                    <printer-outlined />
                  </n-icon>
                </template>
                Bulk Label
              </n-button>
              <n-button
                :hidden="activeStatusFilter !== 1"
                type="warning"
                round
                @click="assignShipmentsButton"
              >
                <template #icon>
                  <n-icon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 32 32"
                    >
                      <path d="M4 16h12v2H4z" fill="currentColor" />
                      <path d="M2 11h10v2H2z" fill="currentColor" />
                      <path
                        d="M29.919 16.606l-3-7A.999.999 0 0 0 26 9h-3V7a1 1 0 0 0-1-1H6v2h15v12.556A3.992 3.992 0 0 0 19.142 23h-6.284a4 4 0 1 0 0 2h6.284a3.98 3.98 0 0 0 7.716 0H29a1 1 0 0 0 1-1v-7a.997.997 0 0 0-.081-.394zM9 26a2 2 0 1 1 2-2a2.002 2.002 0 0 1-2 2zm14-15h2.34l2.144 5H23zm0 15a2 2 0 1 1 2-2a2.002 2.002 0 0 1-2 2zm5-3h-1.142A3.995 3.995 0 0 0 23 20v-2h5z"
                        fill="currentColor"
                      />
                    </svg>
                  </n-icon>
                </template>
                Assign Courier
              </n-button>
            </n-space>

            <n-button
              :hidden="activeStatusFilter !== 1 && activeStatusFilter !== 2"
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
        <n-modal style="width: 30%" v-model:show="showCreateShipmentsModal" preset="dialog">
          <template #header>
            <div>Pickup Location</div>
          </template>
          <n-space :vertical="true">
            <create-bulk-shipments
              :orders="selectedOrders"
              @created="
                checkedRowKeysRef = [];
                showCreateShipmentsModal = false;
                getList();
              "
            />
          </n-space>
        </n-modal>
        <n-modal style="width: 30%" v-model:show="showWeshipCitiesModal" preset="dialog">
          <template #header>
            <div>Select Weship City: {{ dialogTitle }}</div>
          </template>
          <n-space :vertical="true">
            <weship-cities @citySelected="getCitySelected" />
          </n-space>
        </n-modal>
      </n-space>
    </n-card>
  </div>
</template>
<script lang="ts" setup>
  import { useDataTables } from '@/hooks/useDataTables';
  import { cancelOrder, exportOrderShipmentList, orderList, updateOrderStatus } from '@/api/order';
  import { Component, getCurrentInstance, h, onMounted, reactive, ref } from 'vue';
  import {
    MoreOutlined,
    DeleteOutlined,
    BarsOutlined,
    FileDoneOutlined,
    PrinterOutlined,
  } from '@vicons/antd';
  import {
    DataTableColumn,
    NDropdown,
    NSelect,
    NButton,
    NIcon,
    NTag,
    NText,
    useDialog,
    useMessage,
    DataTableRowKey,
  } from 'naive-ui';
  import { useRouter } from 'vue-router';
  import { ResultEnum } from '@/enums/httpEnum';
  import emptyStateImg from '@/assets/images/empty-folder.png';
  import { InternalRowData } from 'naive-ui/lib/data-table/src/interface';
  import { useAdminSettingStore } from '@/store/modules/adminSetting';
  import { usePermission } from '@/hooks/web/usePermission';
  import { getMerchantChannelMappingList } from '@/api/channels/mapping';
  import { getAddresses, updateCustomerCity } from '@/api/settings/addresses';

  const checkedRowKeysRef = ref<DataTableRowKey[]>([]);
  const showActions = ref(false);
  const showCreateShipmentsModal = ref(false);
  const actionSelectedStatus: any = ref();
  const adminStatusStore = useAdminSettingStore();
  const statusOptions = JSON.parse(
    JSON.stringify(
      adminStatusStore.getOrderStatuses.filter(
        (item) =>
          item.masking !== 'Manifested' &&
          item.masking !== 'Picked Up' &&
          item.masking !== 'In Transit' &&
          item.masking !== 'Out For Delivery' &&
          item.masking !== 'Non Delivery Report' &&
          item.masking !== 'Reattempt' &&
          item.masking !== 'Return To Origin' &&
          item.masking !== 'Delivered' &&
          item.masking !== 'Lost' &&
          item.masking !== 'Damaged' &&
          item.masking !== 'Cancelled'
      )
    )
  );
  const updateStatusOptions = JSON.parse(JSON.stringify(adminStatusStore.getOrderStatuses));
  const app: any = getCurrentInstance();
  const filters = app.appContext.config.globalProperties.$filters;
  const merchant_channels: any = ref([]);
  const merchant_pickup_locations: any = ref([]);
  const activeStatusFilter: any = ref();
  const selectedOrders: any = ref();
  const selectedDates: any = ref();
  const showWeshipCitiesModal: any = ref(false);
  const dialogTitle: any = ref();
  const unMappedOrderCustomerCity: any = ref({});
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
    sorter: true,
    width: 180,
    sortOrder: false,
  };
  const destination_city: DataTableColumn<InternalRowData> = {
    title: 'CITY',
    key: 'city',
    width: 150,
    render(row) {
      if (row.weship_city) {
        return h(
          NText,
          {
            size: 'small',
          },
          {
            default: () => row.city,
          }
        );
      } else {
        return h(
          NButton,
          {
            size: 'small',
            type: 'error',
            round: true,
            onClick: () => showWeshipCities(row),
          },
          {
            default: () => row.city,
          }
        );
      }
      // return filters.dateFormat(row.cycle_date);
    },
  };
  const payment_method: DataTableColumn<InternalRowData> = {
    title: 'PAYMENT METHOD',
    key: 'payment_method',
    width: 200,
  };
  const order_place_type: DataTableColumn<InternalRowData> = {
    title: 'ORDER TYPE',
    width: 160,
    key: 'order_place_type',
  };
  const channel_name: DataTableColumn<InternalRowData> = {
    title: 'CHANNEL NAME',
    width: 180,
    key: 'store_name',
  };

  const order_amount: DataTableColumn<InternalRowData> = {
    title: 'ORDER AMOUNT',
    width: 180,
    key: 'total_amount',
  };
  const item_name: DataTableColumn<InternalRowData> = {
    title: 'ITEM NAME',
    key: 'item_name',
    width: 160,
    sorter: true,
    sortOrder: false,
  };
  const order_created_at: DataTableColumn<InternalRowData> = {
    title: 'ORDER TIME',
    key: 'order_created_at',
    width: 200,
    sorter: true,
    sortOrder: 'descend',
    defaultSortOrder: 'descend',
    render(row) {
      return filters.dateFormat(row.order_created_at);
    },
  };
  const variant_title: DataTableColumn<InternalRowData> = {
    title: 'VARIANT TITLE',
    key: 'variant_title',
    width: 180,
    sorter: true,
    sortOrder: false,
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
  const sku: DataTableColumn<InternalRowData> = {
    title: 'SKU',
    key: 'sku',
    width: 150,
    sorter: true,
    sortOrder: false,
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
          options: moreOptions.filter((item) => {
            if (row.status !== 'Placed' && row.status !== 'Manifested') {
              return item.key !== 'cancel';
            } else {
              return item.key !== 'invoice' && item.key !== 'label';
            }
          }),
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
            ids: [row.item_id],
            status_id: val,
          };
          updateOrderStatus(data).then(({ result }) => {
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
  } = useDataTables(orderList, {
    order_id: order_id,
    client_order_id: client_order_id,
    order_created_at: order_created_at,
  });
  const getMerchantChannels = () =>
    getMerchantChannelMappingList().then(({ result }) => {
      merchant_channels.value = result.data;
    });
  const options = [
    {
      label: 'Order ID',
      value: 'orders.order_id',
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
      label: 'Client Order ID',
      value: 'client_order_id',
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
    channel_name,
    destination_city,
    customer_phone,
    customer_address,
    order_created_at,
    order_amount,
    item_name,
    variant_title,
    sku,
    payment_method,
    order_place_type,
    action,
  ];
  const { hasPermission } = usePermission();
  if (hasPermission(['manage order status'])) {
    columns.splice(14, 0, status);
  } else {
    columns.splice(14, 0, status_placeholder);
  }
  columnsRef.value = columns;

  onMounted(() => {
    activeStatusFilter.value = 1;
    params.value.orderStatus = 1;
    sorting.value = {
      column: 'order_created_at',
      orderBy: 'desc',
    };
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
    if (value && value.length) {
      const startDate = new Date(value[0]);
      const endDate = new Date(value[1]);

      // Set the start date to the start of the day.
      startDate.setHours(0, 0, 0, 0);

      // Set the end date to the end of the day.
      endDate.setHours(23, 59, 59, 999);
      params.value.dateFilter = [startDate.getTime(), endDate.getTime()];
      selectedDates.value = [startDate.getTime(), endDate.getTime()];
      getList();
    }
  }

  function getChannelFilterList(value) {
    params.value.channel = value;
    getList();
  }
  function getPaymentMethodFilterList(value) {
    params.value.payment_method = value;
    getList();
  }
  function getPickupLocationFilterList(value) {
    params.value.filterColumn = 'merchant_pickup_location';
    params.value.filterValue = value;
    getList();
  }
  function getFilterValueList(value) {
    if(params.value.filterColumn){
      params.value.filterValue = value;
      getList();
    }
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
        updateOrderStatus(data).then(({ result }) => {
          list.value = [];
          checkedRowKeysRef.value = [];
          window['$message'].success(result.message);
          getList();
        });
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
    checkedRowKeysRef.value = [];
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
            if (o.id === id) {
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

  function assignShipmentsButton() {
    selectedOrders.value = checkedRowKeysRef.value;
    showCreateShipmentsModal.value = true;
  }
  function openDetails(item) {
    router.push({ name: 'OrderDetails', params: { id: item.id } });
  }
  function exportShipments() {
    exportOrderShipmentList(params.value);
  }
  function showWeshipCities(row) {
    showWeshipCitiesModal.value = true;
    unMappedOrderCustomerCity.value = row;
    dialogTitle.value = row.city;
    console.log(row);
  }
  function getCitySelected(value) {
    showWeshipCitiesModal.value = false;
    dialog.warning({
      title: 'Confirmation',
      content: 'Are you sure, you want to update customer address?',
      positiveText: 'Yes',
      negativeText: 'No',
      onPositiveClick: async () => {
        await updateCustomerCity({
          order_id: unMappedOrderCustomerCity.value.id,
          city: value,
        })
          .then(({ result, code }) => {
            if (code === ResultEnum.SUCCESS) {
              message.success(result.message);
              getList();
            }
          })
          .catch(({ result }) => {
            message.error(result.message);
          });
      },
    });
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
