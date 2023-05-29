<template>
  <n-card style="border-radius: 10px">
    <n-data-table
      remote
      size="small"
      ref="table"
      :columns="columnsRef"
      :data="list"
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
  import { DataTableColumn } from 'naive-ui';
  import { InternalRowData } from 'naive-ui/lib/data-table/src/interface';
  import { useDataTables } from '@/hooks/useDataTables';
  import { getTransactions } from '@/api/wallet/transactions';
  import { getCurrentInstance, onMounted } from 'vue';

  const app: any = getCurrentInstance();
  const filters = app.appContext.config.globalProperties.$filters;

  const credit: DataTableColumn<InternalRowData> = {
    title: 'CREDIT AMOUNT (RS)',
    key: 'credit',
  };
  const debit: DataTableColumn<InternalRowData> = {
    title: 'DEBIT AMOUNT (RS)',
    key: 'debit',
  };
  const transaction_type: DataTableColumn<InternalRowData> = {
    title: 'TRANSACTION TYPE',
    key: 'type',
  };
  const date: DataTableColumn<InternalRowData> = {
    title: 'DATE',
    key: 'created_at',
    render(row) {
      return filters.dateFormat(row.created_at);
    },
  };
  const remarks: DataTableColumn<InternalRowData> = {
    title: 'REMARKS',
    key: 'description',
  };
  const transaction_id: DataTableColumn<InternalRowData> = {
    title: 'TRANSACTION ID',
    key: 'id',
  };
  // const transaction_status: DataTableColumn<InternalRowData> = {
  //   title: 'TRANSACTION STATUS',
  //   key: 'transaction_status',
  // };
  const columns: DataTableColumn[] = [
    transaction_id,
    credit,
    debit,
    transaction_type,
    date,
    remarks,
    // transaction_status,
  ];
  const { list, loading, getList, columnsRef, handleSort, pageChange, paginationReactive } =
    useDataTables(getTransactions);
  columnsRef.value = columns;
  onMounted(() => {
    getList();
  });
  function rowKey(rowData) {
    return rowData.id;
  }
</script>
