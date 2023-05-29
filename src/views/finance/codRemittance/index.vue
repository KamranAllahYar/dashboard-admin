<template>
  <n-card>
    <n-h1>COD Remittance</n-h1>

    <n-space :vertical="true">
      <n-radio-group v-model:value="selected.value" :on-update:value="filterSelected">
        <n-radio-button
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          :label="option.label"
        />
      </n-radio-group>

      <div
        style="
          width: 500px;
          height: 40px;
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
            Reference No.
          </p>
        </div>

        <n-input size="small" placeholder="Type to Search" v-model:value="searchInput" />
        <n-button strong secondary style="height: 38px" @click="searchFunction">
          <template #icon>
            <n-icon><search-outlined /></n-icon>
          </template>
        </n-button>
      </div>
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
          <n-space />

          <n-button type="success" round @click="actionGetBulkInvoice"> Print Receipt </n-button>
        </n-space>
      </n-collapse-transition>

      <n-data-table
        remote
        size="small"
        ref="table"
        :columns="columnsRef"
        :data="list"
        :loading="loading"
        :single-line="false"
        :scroll-x="1800"
        :pagination="paginationReactive"
        :row-key="rowKey"
        @update:sorter="handleSort"
        @update:page="pageChange"
        @update:checked-row-keys="handleCheck"
        style="margin-top: 20px"
      />
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
    </n-space>
  </n-card>
</template>

<script lang="ts" setup>
  import { Component, h, onMounted, ref } from 'vue';
  import { FileDoneOutlined, MoreOutlined, PrinterOutlined, SearchOutlined } from '@vicons/antd';
  import { DataTableColumn, DataTableRowKey, NButton, NDropdown, NIcon, NTag } from 'naive-ui';
  import { useDataTables } from '@/hooks/useDataTables';
  import { InternalRowData } from 'naive-ui/lib/data-table/src/interface';
  import { downloadCodOrders, getCodCycleList } from '@/api/finance/codcycle';
  import { getCurrentInstance } from 'vue';
  import router from '@/router';

  const actionSelectedStatus: any = ref();
  const checkedRowKeysRef = ref<DataTableRowKey[]>([]);
  const app: any = getCurrentInstance();
  const filters = app.appContext.config.globalProperties.$filters;
  const selectedOption: any = ref(null);
  const searchInput: any = ref();
  const selectedItem: any = ref({});
  const showTransactionHistoryModal = ref(false);
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
      label: 'Print Receipt',
      key: 'printReceipt',
      icon: renderIcon(PrinterOutlined),
    },
    {
      label: 'Total Orders',
      key: 'totalOrders',
      icon: renderIcon(FileDoneOutlined),
    },
  ];
  const showActions = ref(false);
  const options = [
    {
      value: 'all',
      label: 'All',
    },
    {
      value: 'onhold',
      label: 'On Hold',
    },
    {
      value: 'live',
      label: 'Live',
    },
    {
      value: 'past',
      label: 'Past',
    },
    {
      value: 'future',
      label: 'Future',
    },
  ];
  const sorting = ref({
    column: '',
    orderBy: 'asc',
  });
  const selection: DataTableColumn<InternalRowData> = {
    type: 'selection',
  };
  const reference: DataTableColumn<InternalRowData> = {
    title: 'Reference',
    key: 'reference_no',
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
  const remarks: DataTableColumn<InternalRowData> = {
    title: 'Remarks',
    key: 'remarks',
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
    selection,
    reference,
    date,
    order_count,
    cod_amount,
    paid_amount,
    payable_amount,
    remittance_paid,
    remarks,
    action,
  ];

  const { list, params, loading, columnsRef, handleSort, pageChange, paginationReactive } =
    useDataTables(getCodCycleList);
  columnsRef.value = columns;

  function searchFunction() {}

  function filterSelected(value) {
    selected.value = value;
  }
  function rowKey(rowData) {
    return rowData.id;
  }

  const getList = () => {
    loading.value = true;
    getCodCycleList({
      ...params.value,
      page: paginationReactive.page,
      pageSize: paginationReactive.pageSize,
      sortColumn: sorting.value.column,
      sortOrder: sorting.value.orderBy,
    })
      .then(({ result }) => {
        loading.value = false;
        list.value = result.data;
        paginationReactive.itemCount = result.meta.total;
      })
      .catch((response) => {
        loading.value = false;
        console.log(response);
      });
  };
  onMounted(() => {
    getList();
  });
  const selectedAction = (key) => {
    selectedOption.value = key;
  };
  const actionOperation = (item) => {
    if (selectedOption.value === 'printReceipt') {
      const routeData = router.resolve({
        name: 'FinanceCodPrintInvoice',
        params: { id: item.id },
      });
      window.open(routeData.href, '_blank');
    } else if (selectedOption.value === 'totalOrders') {
      downloadCodOrders(item.id);
    }
    selectedOption.value = null;
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
  function actionGetBulkInvoice() {
    const routeData = router.resolve({
      name: 'FinanceCodPrintInvoice',
      params: { id: checkedRowKeysRef.value.join(',') },
    });
    window.open(routeData.href, '_blank');
  }

  function showtransactions(row) {
    selectedItem.value = row;
    showTransactionHistoryModal.value = true;
  }
</script>
