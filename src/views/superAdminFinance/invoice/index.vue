<template>
  <n-card>
    <n-space :vertical="true">
      <n-grid cols="4 s:1 m:2 l:4 xl:4" responsive="screen">
        <n-grid-item span="1">
          <n-h1>Invoices</n-h1>
        </n-grid-item>
        <n-grid-item span="3">
          <n-card>
            <n-space :vertical="true">
              <n-space>
                <n-h5 style="font-weight: bold; margin-top: 5px">Select Client</n-h5>
                <n-select
                  style="width: 300px"
                  v-model:value="selectedAdmin.merchant_id"
                  :options="adminList"
                  label-field="company_name"
                  value-field="id"
                />
              </n-space>
              <n-space justify="space-between">
                <n-h5 style="font-weight: bold">Upload CSV file</n-h5>
                <n-button
                  type="info"
                  @click="handleClick"
                  :loading="isLoading"
                  round
                  style="width: 100px"
                  >Save</n-button
                >
              </n-space>
              <n-upload
                ref="upload"
                directory-dnd
                action="/api/media"
                :data="{
                  folder: 'cod_cycle',
                }"
                :max="1"
                :default-upload="false"
                @change="handleChange"
                @finish="onResponse"
              >
                <n-upload-dragger>
                  <div style="margin-bottom: 12px">
                    <n-icon size="48" :depth="3">
                      <archive-icon />
                    </n-icon>
                  </div>
                  <n-text style="font-size: 16px">
                    Click or drag a file to this area to upload</n-text
                  >
                  <n-p depth="3" style="margin: 8px 0 0 0">
                    Strictly prohibit from uploading sensitive information. For example, your bank
                    card PIN or your credit card expiry date.
                  </n-p>
                </n-upload-dragger>
              </n-upload>
            </n-space>
          </n-card>
        </n-grid-item>
      </n-grid>

      <!--      <n-divider />-->
      <n-collapse-transition :show="showActions">
        <n-divider style="margin-bottom: 0px">Actions</n-divider>
        <n-space
          style="
            margin-top: 25px;
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
          "
        >
          <n-space>
            <n-select
              v-model:value="actionSelectedStatus"
              :options="options"
              placeholder="Please Select Status"
              style="width: 230px"
            />
            <n-space>
              <n-h5 style="font-weight: bold; margin-top: 5px">Remarks</n-h5>
              <n-input v-model:value="actionRemarks" placeholder="Remarks" style="width: 300px" />
            </n-space>
            <n-space>
              <n-h5 style="font-weight: bold; margin-top: 5px">Transaction ID</n-h5>
              <n-input
                v-model:value="transactionID"
                placeholder="Transaction ID"
                style="width: 300px"
              />
            </n-space>
          </n-space>

          <n-button
            :loading="actionStatusIsLoading"
            type="success"
            round
            @click="actionUpdateStatus"
          >
            Update
          </n-button>
        </n-space>
      </n-collapse-transition>

      <n-data-table
        remote
        size="small"
        ref="table"
        :columns="columnsRef"
        :data="list"
        :loading="loading"
        :scroll-x="1800"
        :single-line="false"
        :pagination="paginationReactive"
        :row-key="rowKey"
        @update:sorter="handleSort"
        @update:page="pageChange"
        @update:checked-row-keys="handleCheck"
        style="margin-top: 20px"
      />

      <n-modal style="width: 70%" v-model:show="showUpdateStatusModal" preset="dialog">
        <template #header>
          <div>Update Remarks</div>
        </template>
        <n-space :vertical="true">
          <update-invoice-status
            :id="selectedId"
            @updated="
              getList();
              showUpdateStatusModal = false;
            "
          />
        </n-space>
      </n-modal>

      <n-modal style="width: 40%" v-model:show="showMakeTransactionModal" preset="dialog">
        <template #header>
          <div>Make Transaction</div>
        </template>
        <n-space :vertical="true">
          <invoice-make-transaction
            :id="selectedId"
            @success="
              getList();
              showMakeTransactionModal = false;
            "
          />
        </n-space>
      </n-modal>

      <n-modal style="width: 70%" v-model:show="showTransactionHistoryModal" preset="dialog">
        <template #header>
          <div>Invoice Transaction History</div>
        </template>
        <n-space :vertical="true">
          <invoice-transaction-history
            :selectedItem="selectedItem"
            @success="
              getList();
              showTransactionHistoryModal = false;
            "
          />
        </n-space>
      </n-modal>
    </n-space>
  </n-card>
</template>

<script lang="ts" setup>
  import { userList } from '@/api/users';
  import { Component, getCurrentInstance, h, onMounted, ref } from 'vue';
  import {
    DataTableColumn,
    DataTableRowKey,
    NButton,
    NDropdown,
    NIcon,
    NTag,
    UploadFileInfo,
    UploadInst,
    useDialog,
  } from 'naive-ui';
  import {
    deleteInvoiceCycle,
    downloadInvoiceOrders,
    getInvoiceCycleList,
    updateInvoiceCycleStatus,
    uploadInvoiceCsvFile
  } from "@/api/finance/invoicecycle";
  import UpdateInvoiceStatus from '@/components/Finance/Invoice/UpdateInvoiceStatus.vue';
  import { InternalRowData } from 'naive-ui/lib/data-table/src/interface';
  import { CreditCardOutlined, DeleteOutlined, MoreOutlined, SaveOutlined } from '@vicons/antd';
  import { useDataTables } from '@/hooks/useDataTables';
  import InvoiceTransactionHistory from '@/components/Finance/Invoice/InvoiceTransactionHistory.vue';

  const selectedItem: any = ref({});
  const selectedId = ref(null);
  const renderIcon = (icon: Component) => {
    return () => {
      return h(NIcon, null, {
        default: () => h(icon),
      });
    };
  };
  const moreOptions = [
    {
      label: 'Update Remarks',
      key: 'updateRemarks',
      icon: renderIcon(SaveOutlined),
    },
    {
      label: 'Make Transaction',
      key: 'makeTransaction',
      icon: renderIcon(CreditCardOutlined),
    },
    {
      label: 'Delete',
      key: 'delete',
      icon: renderIcon(DeleteOutlined),
    },
    // {
    //   label: 'Total Orders',
    //   key: 'totalOrders',
    //   icon: renderIcon(PrinterOutlined),
    // },
  ];
  const app: any = getCurrentInstance();
  const filters = app.appContext.config.globalProperties.$filters;
  const actionStatusIsLoading: any = ref(false);
  const actionRemarks: any = ref();
  const transactionID: any = ref();
  const dialog = useDialog();
  const showUpdateStatusModal = ref(false);
  const showMakeTransactionModal = ref(false);
  const showTransactionHistoryModal = ref(false);
  const showActions = ref(false);
  const isLoading = ref(false);
  const upload = ref<UploadInst | null>(null);
  const selectedAdmin: any = ref({
    merchant_id: null,
    file: {
      url: '',
      path: '',
    },
  });

  const checkedRowKeysRef = ref<DataTableRowKey[]>([]);
  const actionSelectedStatus: any = ref();
  const fileListLength = ref(0);
  const isFileSelected = ref(false);
  const selectedOption: any = ref(null);
  const options = [
    {
      value: 'Unpaid',
      label: 'Unpaid',
    },
    {
      value: 'Paid',
      label: 'Paid',
    },
  ];
  const adminParams: any = ref({
    roles: [],
  });
  const adminList: any = ref({});
  adminParams.value.roles = ['admin'];
  userList(adminParams.value).then(({ result }) => {
    adminList.value = result.data;
  });

  // const selection: DataTableColumn<InternalRowData> = {
  //   type: 'selection',
  // };
  const company: DataTableColumn<InternalRowData> = {
    title: 'Company',
    key: 'merchant.companyProfile.name',
  };
  const reference: DataTableColumn<InternalRowData> = {
    title: 'Reference',
    key: 'reference_no',
  };

  const remarks: DataTableColumn<InternalRowData> = {
    title: 'Remarks',
    key: 'remarks',
  };
  const paid_amount: DataTableColumn<InternalRowData> = {
    title: 'Paid Amount',
    key: 'paid_amount',
    render(row: any) {
      if (row.paid_amount > 0) {
        return h(
          NButton,
          {
            size: 'small',
            type: 'info',
            round: true,
            onClick: () => showtransactions(row),
          },
          { default: () => row.paid_amount }
        );
      } else {
        return row.paid_amount;
      }
    },
  };
  const payable_amount: DataTableColumn<InternalRowData> = {
    title: 'Payable Amount',
    key: 'payable_amount',
  };
  const date: DataTableColumn<InternalRowData> = {
    title: 'Date',
    key: 'invoice_date',
    render(row) {
      return filters.dateFormat(row.invoice_date);
    },
  };
  const invoice_orders: DataTableColumn<InternalRowData> = {
    title: 'Orders Count',
    key: 'invoice_orders',
  };
  const invoice_amount: DataTableColumn<InternalRowData> = {
    title: 'Invoice Amount',
    key: 'invoice_amount',
  };
  const invoice_tax_amount: DataTableColumn<InternalRowData> = {
    title: 'Invoice Tax Amount',
    key: 'invoice_tax_amount',
  };
  const total_invoice_amount: DataTableColumn<InternalRowData> = {
    title: 'Total Invoice Amount',
    key: 'total_invoice_amount',
  };
  const remittance_paid: DataTableColumn<InternalRowData> = {
    title: 'Remittance Paid',
    key: 'invoice_status',
    render(row) {
      if (row.invoice_status === 'Paid') {
        return h(
          NTag,
          {
            type: 'success',
          },
          {
            default: () => row.invoice_status,
          }
        );
      } else if (row.invoice_status === 'Unpaid') {
        return h(
          NTag,
          {
            type: 'error',
          },
          {
            default: () => row.invoice_status,
          }
        );
      } else if (row.invoice_status === 'Partially Paid') {
        return h(
          NTag,
          {
            type: 'warning',
          },
          {
            default: () => row.invoice_status,
          }
        );
      }
      // return filters.dateFormat(row.cycle_date);
    },
  };
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
  //dynamic sorting data table
  const columns: DataTableColumn[] = [
    // selection,
    company,
    reference,
    date,
    invoice_orders,
    invoice_amount,
    invoice_tax_amount,
    total_invoice_amount,
    paid_amount,
    payable_amount,
    remittance_paid,
    remarks,
    action,
  ];

  const { getList, list, loading, columnsRef, handleSort, pageChange, paginationReactive } =
    useDataTables(getInvoiceCycleList);
  columnsRef.value = columns;

  onMounted(() => {
    getList();
  });
  const handleChange = (data: { fileList: UploadFileInfo[] }) => {
    fileListLength.value = data.fileList.length;
    isFileSelected.value = fileListLength.value == 1;
  };
  const onResponse = (options: { file: UploadFileInfo; event?: any }) => {
    const response = JSON.parse(options.event?.target?.response);
    const data = selectedAdmin.value;
    data.file.path = response.data.path;
    data.file.url = response.data.url;

    uploadInvoiceCsvFile(data)
      .then(({ result }) => {
        window['$message'].success(result.message);
        isLoading.value = false;
        getList();
      })
      .catch(({ result }) => {
        window['$message'].error(result.message);
        isLoading.value = false;
      });
  };
  const handleClick = () => {
    if (selectedAdmin.value.merchant_id) {
      if (isFileSelected.value) {
        isLoading.value = true;
        upload.value?.submit();
      } else {
        window['$message'].error('Please upload CSV file');
      }
    } else {
      window['$message'].error('Please select client');
    }
  };
  function handleCheck(rowKeys: DataTableRowKey[]) {
    checkedRowKeysRef.value = rowKeys;
    if (checkedRowKeysRef.value.length >= 1) {
      showActions.value = true;
    } else {
      showActions.value = false;
      actionSelectedStatus.value = null;
    }
  }

  function actionUpdateStatus() {
    if (!actionSelectedStatus.value) {
      window['$message'].error('Please select status');
      return;
    }
    dialog.info({
      title: 'Confirmation',
      content: () => 'Are you sure you want to update the status for selected Invoice Cycles?',
      positiveText: 'Update',
      negativeText: 'Cancel',
      onPositiveClick: () => {
        let data = {
          ids: checkedRowKeysRef.value,
          invoice_status: actionSelectedStatus.value,
          remarks: actionRemarks.value,
          transaction_id: transactionID.value,
        };
        actionStatusIsLoading.value = true;
        updateInvoiceCycleStatus(data).then(({ result }) => {
          list.value = [];
          checkedRowKeysRef.value = [];
          window['$message'].success(result.message);
          getList();
          actionStatusIsLoading.value = false;
        });
      },
    });
  }
  const selectedAction = (key) => {
    selectedOption.value = key;
  };
  const actionOperation = (item) => {
    if (selectedOption.value === 'updateRemarks') {
      showUpdateStatusModal.value = true;
      selectedId.value = item.id;
    } else if (selectedOption.value === 'totalOrders') {
      downloadInvoiceOrders(item.id);
    } else if (selectedOption.value === 'delete') {
      dialog.error({
        title: 'Confirmation',
        content: () => 'Are you sure you want to delete?',
        positiveText: 'Delete',
        negativeText: 'Cancel',
        onPositiveClick: () => {
          deleteInvoiceCycle(item.id).then(({ result }) => {
            list.value = [];
            checkedRowKeysRef.value = [];
            window['$message'].success(result.message);
            getList();
          });
        },
      });
    } else if (selectedOption.value === 'makeTransaction') {
      showMakeTransactionModal.value = true;
      selectedId.value = item.id;
    }
    selectedOption.value = null;
  };
  function rowKey(rowData) {
    return rowData.id;
  }
  function showtransactions(row) {
    selectedItem.value = row;
    showTransactionHistoryModal.value = true;
  }
</script>
