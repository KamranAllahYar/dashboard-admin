<template>
  <n-card>
    <n-space vertical>
      <n-space justify="space-between">
        <n-space />
        <n-button type="info" @click="updateTats">Update Cities TAT</n-button>
      </n-space>
      <n-divider>Filters</n-divider>
      <n-space>
        <p style="font-weight: bold; font-size: 16px; margin-top: 5px">Search By</p>
        <n-select
          value-field="value"
          label-field="label"
          :on-update:value="getFilterList"
          :options="filterOptions"
          style="width: 200px"
        />
        <n-input v-model:value="filterValue" placeholder="Enter Input" />
        <n-button type="success" @click="applyFilter">Search</n-button>
      </n-space>
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
        @update:checked-row-keys="handleCheck"
        style="margin-top: 20px"
      />
    </n-space>
  </n-card>
</template>
<script lang="ts" setup>
  import {
    courierCitiesTatList,
    courierList,
    getZonesList,
    updateCitiesTatList,
  } from '@/api/courier';
  import { DataTableColumn, DataTableRowKey, NButton, NSelect, NTag, NText } from 'naive-ui';
  import { InternalRowData } from 'naive-ui/lib/data-table/src/interface';
  import { h, onMounted, ref } from 'vue';
  import { useDataTables } from '@/hooks/useDataTables';

  const filterValue: any = ref();
  const checkedRowKeysRef = ref<DataTableRowKey[]>([]);
  const actionSelectedStatus: any = ref();
  const showActions = ref(false);
  const filterOptions = [
    {
      label: 'Key Pair',
      value: 'key_pair',
    },
    {
      label: 'Origin City',
      value: 'origin_city',
    },
    {
      label: 'Destination City',
      value: 'destination_city',
    },
  ];

  const courierOptions: any = ref();
  const zoneOptions: any = ref();
  const id: DataTableColumn<InternalRowData> = {
    title: 'ID',
    key: 'id',
  };
  const key_pair: DataTableColumn<InternalRowData> = {
    title: 'Key Pair',
    key: 'key_pair',
  };
  const zone: DataTableColumn<InternalRowData> = {
    title: 'Zone',
    key: 'title',
  };
  const courier_title: DataTableColumn<InternalRowData> = {
    title: 'Courier',
    key: 'name',
  };
  const origin_city: DataTableColumn<InternalRowData> = {
    title: 'Origin City',
    key: 'origin_city',
  };
  const destination_city: DataTableColumn<InternalRowData> = {
    title: 'Destination City',
    key: 'destination_city',
  };
  const total_orders: DataTableColumn<InternalRowData> = {
    title: 'Total Orders',
    key: 'total_orders',
  };
  const average_time: DataTableColumn<InternalRowData> = {
    title: 'Average Delivery Time',
    key: 'average_time',
    render(row) {
      return h(
        NText,
        {
          font_size: 20,
        },
        {
          default: () => {
            let average_days;
            if (row.average_time === 'NaN') {
              average_days = row.average_time;
            } else {
              average_days = row.average_time + ' days';
            }
            return average_days;
          },
        }
      );
    },
  };
  const success_rate: DataTableColumn<InternalRowData> = {
    title: 'Success Rate',
    key: 'success_rate',
    render(row) {
      return h(
        NText,
        {
          font_size: 20,
        },
        {
          default: () => row.success_rate + '%',
        }
      );
    },
  };
  //dynamic sorting data table
  const columns: DataTableColumn[] = [
    id,
    courier_title,
    zone,
    key_pair,
    origin_city,
    destination_city,
    total_orders,
    average_time,
    success_rate,
  ];
  const { getList, params, list, loading, columnsRef, handleSort, pageChange, paginationReactive } =
    useDataTables(courierCitiesTatList);
  columnsRef.value = columns;
  function rowKey(rowData) {
    return rowData.id;
  }
  onMounted(() => {
    getZonesList().then(({ result }) => {
      zoneOptions.value = result.data;
    });
    courierList({ pageSize: 1000, page: 1, is_active: 1 }).then(({ result }) => {
      courierOptions.value = result.data;
    });
    getList();
  });
  function handleCheck(rowKeys: DataTableRowKey[]) {
    checkedRowKeysRef.value = rowKeys;
    if (checkedRowKeysRef.value.length >= 1) {
      showActions.value = true;
    } else {
      showActions.value = false;
      actionSelectedStatus.value = null;
    }
  }
  // function actionSelectedCourier(value) {
  //   params.value.id = value;
  //   getList();
  //   getCourierZoneMaskingListByCourierId(params.value.id).then(({ result }) => {
  //     courierZoneMaskingOptions.value = result.data;
  //   });
  // }
  function getFilterList(value) {
    params.value.filterColumn = value;
  }
  async function applyFilter() {
    params.value.filterValue = filterValue.value;
    getList();
  }
  function updateTats() {
    updateCitiesTatList().then(({ result }) => {
      if (result.status) {
        window['$message'].success(result.message);
        getList();
      } else {
        window['$message'].error(result.message);
      }
    });
  }
</script>
