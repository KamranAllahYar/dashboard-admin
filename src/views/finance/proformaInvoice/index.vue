<template>
  <n-card>
    <n-h1>Proforma Invoice</n-h1>

    <n-space :vertical="true">
      <n-space justify="space-between">
        <n-space>
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
                Proforma No.
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
      </n-space>

      <n-divider />

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
    </n-space>
  </n-card>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { SearchOutlined } from '@vicons/antd';
  import { DataTableColumn } from 'naive-ui';
  import { useDataTables } from '@/hooks/useDataTables';
  import { orderList } from '@/api/order';
  import { InternalRowData } from 'naive-ui/lib/data-table/src/interface';

  const searchInput: any = ref();
  const proforma_number: DataTableColumn<InternalRowData> = {
    title: 'Proforma Number',
    key: 'proforma_number',
  };
  const datee: DataTableColumn<InternalRowData> = {
    title: 'Date',
    key: 'date',
  };
  const orders: DataTableColumn<InternalRowData> = {
    title: 'Orders',
    key: 'orders',
  };
  const total_amount: DataTableColumn<InternalRowData> = {
    title: 'Total Amount',
    key: 'total_amount',
  };

  const actions: DataTableColumn<InternalRowData> = {
    title: 'Actions',
    key: 'actions',
  };

  //dynamic sorting data table
  const columns: DataTableColumn[] = [proforma_number, datee, orders, total_amount, actions];

  const { list, params, loading, getList, columnsRef, handleSort, pageChange, paginationReactive } =
    useDataTables(orderList);
  columnsRef.value = columns;

  function rowKey(rowData) {
    return rowData.id;
  }
</script>
