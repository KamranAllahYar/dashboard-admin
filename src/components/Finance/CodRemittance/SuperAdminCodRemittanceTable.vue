<template>
  <n-space vertical>
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
      style="margin-top: 20px"
    />
    <!--      @update:checked-row-keys="handleCheck"-->

    <n-modal style="width: 40%" v-model:show="showUpdateStatusModal" preset="dialog">
      <template #header>
        <div>Update Remarks</div>
      </template>
      <n-space :vertical="true">
        <update-cod-status
          :id="selectedId"
          @updated="
            getList();
            showUpdateStatusModal = false;
          "
        />
      </n-space>
    </n-modal>
    <n-modal style="width: 70%" v-model:show="showMakeTransactionModal" preset="dialog">
      <template #header>
        <div>Make Transaction</div>
      </template>
      <n-space :vertical="true">
        <cod-make-transaction
          :selectedItem="selectedItem"
          @success="
            getList();
            showMakeTransactionModal = false;
          "
        />
      </n-space>
    </n-modal>
    <n-modal style="width: 70%" v-model:show="showTransactionHistoryModal" preset="dialog">
      <template #header>
        <div>COD Remittance Transaction History</div>
      </template>
      <n-space :vertical="true">
        <cod-transaction-history
          :selectedItem="selectedItem"
          @success="
            getList();
            showTransactionHistoryModal = false;
          "
        />
      </n-space>
    </n-modal>
    <n-modal style="width: 70%" v-model:show="showInvoiceTransactionHistoryModal" preset="dialog">
      <template #header>
        <div>Invoice Transaction History</div>
      </template>
      <n-space :vertical="true">
        <invoice-transaction-history
          :selectedItem="selectedItem"
          @success="
            getList();
            showInvoiceTransactionHistoryModal = false;
          "
        />
      </n-space>
    </n-modal>
  </n-space>
</template>
<script lang="ts" setup>
  import { userList } from '@/api/users';
  import { Component, getCurrentInstance, h, onMounted, ref, watch } from 'vue';
  import {
    DataTableColumn,
    DataTableRowKey,
    NButton,
    NDropdown,
    NIcon,
    NTag,
    useDialog,
  } from 'naive-ui';

  import { deleteCODRemittance, downloadCodOrders, getCodCycleList } from '@/api/finance/codcycle';
  import { InternalRowData } from 'naive-ui/lib/data-table/src/interface';
  import { SaveOutlined, CreditCardOutlined, MoreOutlined, DeleteOutlined } from '@vicons/antd';
  import { useDataTables } from '@/hooks/useDataTables';
  import UpdateCodStatus from '@/components/Finance/CodRemittance/UpdateCodStatus.vue';

  const emits = defineEmits(['tableUpdated']);
  const selectedId = ref(null);
  const selectedItem: any = ref({});
  const showUpdateStatusModal = ref(false);
  const showMakeTransactionModal = ref(false);
  const showTransactionHistoryModal = ref(false);
  const showInvoiceTransactionHistoryModal = ref(false);
  const props = defineProps({
    updateList: {
      type: Boolean,
    },
  });

  watch(
    () => props.updateList,
    () => {
      if (props.updateList) {
        getList();
        emits('tableUpdated');
      }
    }
  );
  const app: any = getCurrentInstance();
  const filters = app.appContext.config.globalProperties.$filters;

  const checkedRowKeysRef = ref<DataTableRowKey[]>([]);
  const renderIcon = (icon: Component) => {
    return () => {
      return h(NIcon, null, {
        default: () => h(icon),
      });
    };
  };
  // const actionSelectedStatus: any = ref();
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
  ];
  const dialog = useDialog();
  const adminList: any = ref({});
  const adminParams: any = ref({
    roles: [],
  });
  adminParams.value.roles = ['admin'];
  userList(adminParams.value).then(({ result }) => {
    adminList.value = result.data;
  });

  const selectedOption: any = ref(null);
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

  const date: DataTableColumn<InternalRowData> = {
    title: 'Date',
    key: 'cycle_date',
    render(row) {
      return filters.dateFormat(row.cycle_date);
    },
  };
  const order_count: DataTableColumn<InternalRowData> = {
    title: 'Order Count',
    key: 'cycle_orders',
  };
  const cod_amount: DataTableColumn<InternalRowData> = {
    title: 'COD Amount',
    key: 'cycle_amount',
  };
  const pending_invoice_amount: DataTableColumn<InternalRowData> = {
    title: 'Pending Invoice',
    key: 'pending_invoice_amount',
    render(row): any {
      if (row.pending_invoice_amount) {
        return row.pending_invoice_amount;
      } else {
        return 0;
      }
    },
  };
  const payable_amount: DataTableColumn<InternalRowData> = {
    title: 'Payable Amount',
    key: 'payable_amount',
    render(row: any) {
      return row.payable_amount - row.pending_invoice_amount;
    },
  };
  const paid_amount: DataTableColumn<InternalRowData> = {
    title: 'COD Paid Amount',
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
  const invoice_paid_amount: DataTableColumn<InternalRowData> = {
    title: 'Invoice Paid Amount',
    key: 'invoice_paid_amount',
    render(row: any) {
      if (row.invoice_paid_amount > 0) {
        return h(
          NButton,
          {
            size: 'small',
            type: 'info',
            round: true,
            onClick: () => showInvoicetransactions(row),
          },
          { default: () => row.invoice_paid_amount }
        );
      } else {
        return row.invoice_paid_amount;
      }
    },
  };
  const remittance_paid: DataTableColumn<InternalRowData> = {
    title: 'Remittance Paid',
    key: 'cycle_status',
    render(row) {
      if (row.cycle_status === 'Paid') {
        return h(
          NTag,
          {
            type: 'success',
          },
          {
            default: () => row.cycle_status,
          }
        );
      } else if (row.cycle_status === 'Unpaid') {
        return h(
          NTag,
          {
            type: 'error',
          },
          {
            default: () => row.cycle_status,
          }
        );
      } else if (row.cycle_status === 'Partially Paid') {
        return h(
          NTag,
          {
            type: 'warning',
          },
          {
            default: () => row.cycle_status,
          }
        );
      }
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
    order_count,
    cod_amount,
    pending_invoice_amount,
    invoice_paid_amount,
    paid_amount,
    payable_amount,
    remittance_paid,
    remarks,
    action,
  ];

  const { getList, list, loading, columnsRef, handleSort, pageChange, paginationReactive } =
    useDataTables(getCodCycleList);
  columnsRef.value = columns;

  onMounted(() => {
    getList();
  });
  const selectedAction = (key) => {
    selectedOption.value = key;
  };
  const actionOperation = (item) => {
    if (selectedOption.value === 'updateRemarks') {
      showUpdateStatusModal.value = true;
      selectedId.value = item.id;
    } else if (selectedOption.value === 'totalOrders') {
      downloadCodOrders(item.id);
    } else if (selectedOption.value === 'delete') {
      dialog.error({
        title: 'Confirmation',
        content: () => 'Are you sure you want to delete?',
        positiveText: 'Delete',
        negativeText: 'Cancel',
        onPositiveClick: () => {
          deleteCODRemittance(item.id).then(({ result }) => {
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
      selectedItem.value = item;
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
  function showInvoicetransactions(row) {
    selectedItem.value = row;
    showInvoiceTransactionHistoryModal.value = true;
  }
</script>
