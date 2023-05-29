<template>
  <n-data-table
    remote
    size="small"
    ref="table"
    :columns="columnsRef"
    :data="list"
    :loading="loading"
    :single-line="false"
    :pagination="paginationReactive"
    :row-key="rowKey"
    @update:sorter="handleSort"
    @update:page="pageChange"
    style="margin-top: 20px"
  />
</template>
<script lang="ts" setup>
  import { useDataTables } from '@/hooks/useDataTables';
  import { getCodTransactionHistory } from '@/api/finance/codcycle';
  import { DataTableColumn } from 'naive-ui';
  import { getCurrentInstance, onMounted } from 'vue';
  import { InternalRowData } from 'naive-ui/lib/data-table/src/interface';

  const app: any = getCurrentInstance();
  const filters = app.appContext.config.globalProperties.$filters;

  const props = defineProps({
    selectedItem: {
      type: Object,
      default: function () {
        return {};
      },
    },
  });

  const credit: DataTableColumn<InternalRowData> = {
    title: 'Credit',
    key: 'credit',
  };
  const debit: DataTableColumn<InternalRowData> = {
    title: 'Debit',
    key: 'debit',
  };
  const reference_no: DataTableColumn<InternalRowData> = {
    title: 'Reference No.',
    key: 'reference_no',
  };
  const description: DataTableColumn<InternalRowData> = {
    title: 'Description',
    key: 'description',
  };
  const created_at: DataTableColumn<InternalRowData> = {
    title: 'Created At',
    key: 'created_at',
    render(row) {
      return filters.dateFormat(row.created_at);
    },
  };
  //dynamic sorting data table
  const columns: DataTableColumn[] = [credit, debit, reference_no, description, created_at];

  const { getList, params, list, loading, columnsRef, handleSort, pageChange, paginationReactive } =
    useDataTables(getCodTransactionHistory);
  columnsRef.value = columns;

  function rowKey(rowData) {
    return rowData.id;
  }
  onMounted(() => {
    params.value.id = props.selectedItem.id;
    getList();
  });
</script>
