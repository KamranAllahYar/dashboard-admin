<template>
  <n-card>
    <n-h1>Invoice</n-h1>

    <n-space :vertical="true">
      <n-space justify="space-between">
        <n-space>
          <n-date-picker
            style="width: 500px"
            type="daterange"
            :default-value="[Date.now(), Date.now() + 86400000]"
            :is-date-disabled="disablePreviousDate"
          />
          <div
            style="
              width: 500px;
              height: 34px;
              display: flex;
              flex-direction: row;
              border-width: 1px;
              border-color: rgb(197, 205, 227);
            "
          >
            <div
              style="
                display: flex;
                flex-direction: column;
                justify-content: center;
                background-color: rgb(237, 240, 249);
              "
            >
              <p
                style="
                  width: 150px;
                  justify-content: center;
                  display: flex;
                  color: rgb(38, 63, 151);
                  font-weight: 600;
                  font-size: 14px;
                  line-height: 120%;
                  letter-spacing: 0.02em;
                "
              >
                Invoice No.
              </p>
            </div>

            <n-input size="small" placeholder="Type to Search" v-model:value="searchInput" />
            <n-button strong secondary style="height: 33px">
              <template #icon>
                <n-icon><search-outlined /></n-icon>
              </template>
            </n-button>
          </div>
        </n-space>
        <n-radio-group v-model:value="selected.value" :default-value="selected.value">
          <n-radio-button
            v-for="option in options"
            :key="option.value"
            :value="option.value"
            :label="option.label"
          />
        </n-radio-group>
      </n-space>

      <n-divider />

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
  import { Component, getCurrentInstance, h, onMounted, ref } from 'vue';
  import { FileDoneOutlined, MoreOutlined, PrinterOutlined, SearchOutlined } from '@vicons/antd';
  import { DataTableColumn, NButton, NDropdown, NIcon, NTag } from 'naive-ui';
  import { useDataTables } from '@/hooks/useDataTables';
  import { InternalRowData } from 'naive-ui/lib/data-table/src/interface';
  import { getInvoiceCycleList, downloadInvoiceOrders } from '@/api/finance/invoicecycle';
  import router from '@/router';

  const selectedItem: any = ref({});
  const showTransactionHistoryModal = ref(false);
  const selectedOption: any = ref(null);
  const app: any = getCurrentInstance();
  const filters = app.appContext.config.globalProperties.$filters;
  const searchInput: any = ref();
  const selected: any = ref({
    value: 'all',
  });
  const renderIcon = (icon: Component) => {
    return () => {
      return h(NIcon, null, {
        default: () => h(icon),
      });
    };
  };
  const moreOptions = [
    {
      label: 'Print Invoice',
      key: 'printInvoice',
      icon: renderIcon(PrinterOutlined),
    },
    {
      label: 'Total Orders',
      key: 'totalOrders',
      icon: renderIcon(FileDoneOutlined),
    },
  ];
  const options = [
    {
      value: 'all',
      label: 'All',
    },
    {
      value: 'cleared',
      label: 'Cleared',
    },
    {
      value: 'pending',
      label: 'Pending',
    },
  ];

  const invoice_number: DataTableColumn<InternalRowData> = {
    title: 'Invoice Number',
    key: 'reference_no',
  };
  const datee: DataTableColumn<InternalRowData> = {
    title: 'Date',
    key: 'invoice_date',
    render(row) {
      return filters.dateFormat(row.invoice_date);
    },
  };
  const orders: DataTableColumn<InternalRowData> = {
    title: 'Orders',
    key: 'invoice_orders',
  };
  const remittance_paid: DataTableColumn<InternalRowData> = {
    title: 'Invoice Status',
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
    },
  };
  const invoice: DataTableColumn<InternalRowData> = {
    title: 'Invoice (PKR)',
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
  const cleared_amount: DataTableColumn<InternalRowData> = {
    title: 'Cleared Amount (PKR)',
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
    title: 'Payable Amount (PKR)',
    key: 'payable_amount',
  };
  const remarks: DataTableColumn<InternalRowData> = {
    title: 'Remarks',
    key: 'remarks',
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
    invoice_number,
    datee,
    orders,
    remittance_paid,
    invoice,
    invoice_tax_amount,
    total_invoice_amount,
    cleared_amount,
    payable_amount,
    remarks,
    action,
  ];

  const { list, params, loading, getList, columnsRef, handleSort, pageChange, paginationReactive } =
    useDataTables(getInvoiceCycleList);
  columnsRef.value = columns;

  function disablePreviousDate(ts: number) {
    return ts > Date.now();
  }

  function rowKey(rowData) {
    return rowData.id;
  }
  onMounted(() => {
    getList();
  });
  const selectedAction = (key) => {
    selectedOption.value = key;
  };
  const actionOperation = (item) => {
    if (selectedOption.value === 'printInvoice') {
      const routeData = router.resolve({
        name: 'FinanceTaxInvoicePrint',
        params: { id: item.id },
      });
      window.open(routeData.href, '_blank');
    } else if (selectedOption.value === 'totalOrders') {
      downloadInvoiceOrders(item.id);
    }
    selectedOption.value = null;
  };
  function showtransactions(row) {
    selectedItem.value = row;
    showTransactionHistoryModal.value = true;
  }
</script>
