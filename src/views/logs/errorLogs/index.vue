<template>
  <n-card>
    <n-space vertical>
      <n-divider>Filters</n-divider>
      <n-space>
        <p style="font-weight: bold; font-size: 16px; margin-top: 5px">Search By</p>
        <n-select
          filterable
          placeholder="Please select a courier"
          label-field="name"
          value-field="name"
          :loading="couriersLoading"
          :options="filteredCouriers"
          :on-update:value="getFilterList"
          @search="filterCouriers"
        />

        <n-input v-model:value="originCity" placeholder="Enter Origin City" />
        <n-input v-model:value="destinationCity" placeholder="Enter Destination City" />
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
      <n-modal v-model:show="showPayloadJsonModal">
        <n-card
          style="width: 600px"
          title="Payload JSON"
          :bordered="false"
          size="huge"
          role="dialog"
          aria-modal="true"
        >
          <vue-json-pretty :data="selectedRow.payload_json" />
        </n-card>
      </n-modal>
      <n-modal v-model:show="showErrorJsonModal">
        <n-card
          style="width: 600px"
          title="Error JSON"
          :bordered="false"
          size="huge"
          role="dialog"
          aria-modal="true"
        >
          <vue-json-pretty :data="selectedRow.error_json" />
        </n-card>
      </n-modal>
    </n-space>
  </n-card>
</template>
<script lang="ts" setup>
  import { DataTableColumn, DataTableRowKey, NButton, NSelect } from 'naive-ui';
  import { InternalRowData } from 'naive-ui/lib/data-table/src/interface';
  import { h, onMounted, ref } from 'vue';
  import { useDataTables } from '@/hooks/useDataTables';
  import { getErrorLogs } from '@/api/logs';
  import VueJsonPretty from 'vue-json-pretty';
  import { useCouriers } from '@/hooks/courier/useCouriers';

  const { filterCouriers, filteredCouriers, couriersLoading } = useCouriers();
  const originCity: any = ref();
  const destinationCity: any = ref();
  const checkedRowKeysRef = ref<DataTableRowKey[]>([]);
  const actionSelectedStatus: any = ref();
  const showActions = ref(false);
  const showPayloadJsonModal = ref(false);
  const showErrorJsonModal = ref(false);
  const selectedRow: any = ref();

  const id: DataTableColumn<InternalRowData> = {
    title: 'ID',
    key: 'id',
  };
  const courier: DataTableColumn<InternalRowData> = {
    title: 'Courier',
    key: 'courier',
  };
  const destination_city: DataTableColumn<InternalRowData> = {
    title: 'Destination City',
    key: 'destination_city',
  };
  const origin_city: DataTableColumn<InternalRowData> = {
    title: 'Origin City',
    key: 'origin_city',
  };
  const log_type: DataTableColumn<InternalRowData> = {
    title: 'Log Type',
    key: 'log_type',
  };
  const user_id: DataTableColumn<InternalRowData> = {
    title: 'User ID',
    key: 'user_id',
  };
  const payload_json: DataTableColumn<InternalRowData> = {
    title: 'Payload JSON',
    key: 'payload_json',
    render(row: any) {
      return h(
        NButton,
        {
          size: 'small',
          type: 'info',
          round: true,
          ghost: true,
          onClick: () => showPayloadJSONModal(row),
        },
        { default: () => 'View' }
      );
    },
  };
  const error_json: DataTableColumn<InternalRowData> = {
    title: 'Error JSON',
    key: 'error_json',
    render(row: any) {
      return h(
        NButton,
        {
          size: 'small',
          type: 'error',
          round: true,
          ghost: true,
          onClick: () => showErrorJSONModal(row),
        },
        { default: () => 'View' }
      );
    },
  };
  //dynamic sorting data table
  const columns: DataTableColumn[] = [
    id,
    courier,
    log_type,
    user_id,
    origin_city,
    destination_city,
    payload_json,
    error_json,
  ];
  const { getList, params, list, loading, columnsRef, handleSort, pageChange, paginationReactive } =
    useDataTables(getErrorLogs);
  columnsRef.value = columns;
  function rowKey(rowData) {
    return rowData.id;
  }
  onMounted(() => {
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
  function getFilterList(value) {
    params.value.courier = value;
  }
  async function applyFilter() {
    params.value.origin_city = originCity.value;
    params.value.destination_city = destinationCity.value;
    getList();
  }
  function showPayloadJSONModal(row) {
    selectedRow.value = row;
    showPayloadJsonModal.value = true;
  }
  function showErrorJSONModal(row) {
    selectedRow.value = row;
    showErrorJsonModal.value = true;
  }
</script>
