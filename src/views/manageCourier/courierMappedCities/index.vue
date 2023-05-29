<template>
  <n-card>
    <n-space vertical>
      <n-space>
        <p style="font-weight: bold; font-size: 16px; margin-top: 5px">Search By</p>
        <n-select
          value-field="value"
          label-field="label"
          placeholder="Select Courier/City"
          :on-update:value="getFilterList"
          clearable
          :options="filterOptions"
          style="width: 200px"
        />
        <n-input v-model:value="filterValue" placeholder="Enter Input" />
        <n-input v-model:value="percentageValue" placeholder="Enter Percentage" />
        <n-select
          value-field="value"
          label-field="label"
          placeholder="Select Operator"
          clearable
          :on-update:value="getPercentageFilterList"
          :options="percentageOperatorOptions"
          style="width: 200px"
        />
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

      <n-modal style="width: 30%" v-model:show="showMappingDialog" preset="dialog">
        <template #header>
          <div>{{ dialogTitle }}</div>
        </template>
        <n-space :vertical="true">
          <n-select
            v-model:value="mapping.city_id"
            :options="mappingCities"
            :render-label="renderLabel"
            :render-tag="renderTagLabel"
            value-field="id"
            filterable
            tag
            label-field="name"
          />
          <n-space justify="space-between">
            <n-button @click="showMappingDialog = false">Cancel</n-button>
            <n-button type="primary" @click="save">Save</n-button>
          </n-space>
        </n-space>
      </n-modal>
    </n-space>
  </n-card>
</template>
<script lang="ts" setup>
  import { courierMappedCitiesList, postMapCity, weshipMappedCitiesList } from '@/api/courier';
  import {
    DataTableColumn,
    DataTableRowKey,
    NButton,
    NSelect,
    SelectRenderLabel,
    SelectRenderTag,
  } from 'naive-ui';
  import { InternalRowData } from 'naive-ui/lib/data-table/src/interface';
  import { getCurrentInstance, h, onMounted, ref } from 'vue';
  import { useDataTables } from '@/hooks/useDataTables';

  const filterValue: any = ref();
  const percentageValue: any = ref();
  const checkedRowKeysRef = ref<DataTableRowKey[]>([]);
  const actionSelectedStatus: any = ref();
  const showActions = ref(false);
  const showMappingDialog = ref(false);
  const dialogTitle: any = ref('');
  const mappingCities: any = ref([]);
  const app: any = getCurrentInstance();
  const filters = app.appContext.config.globalProperties.$filters;

  const mapping = ref({
    courier_city_id: null,
    city_id: null,
  });
  const filterOptions = [
    {
      label: 'Courier',
      value: 'couriers.name',
    },
    {
      label: 'Courier City',
      value: 'courier_cities.city_name',
    },
  ];
  const percentageOperatorOptions = [
    {
      label: '=',
      value: '=',
    },
    {
      label: '>',
      value: '>',
    },
    {
      label: '<',
      value: '<',
    },
    {
      label: '>=',
      value: '>=',
    },
    {
      label: '<=',
      value: '<=',
    },
  ];

  const courier: DataTableColumn<InternalRowData> = {
    title: 'Courier',
    key: 'courier',
  };
  const courier_city: DataTableColumn<InternalRowData> = {
    title: 'Courier City',
    key: 'courier_city',
  };
  const mapped_city: DataTableColumn<InternalRowData> = {
    title: 'Mapped City',
    key: 'mapped_city',
    render(row: any) {
      if (row.mapped_city !== null) {
        return h(
          NButton,
          {
            size: 'small',
            type: 'text',
            round: true,
            onClick: () => openMappingDialog(row),
          },
          { default: () => row.mapped_city }
        );
      } else {
        return h(
          NButton,
          {
            size: 'small',
            type: 'text',
            round: true,
            onClick: () => openMappingDialog(row),
          },
          { default: () => '--' }
        );
      }
    },
  };

  const mapped_date: DataTableColumn<InternalRowData> = {
    title: 'Mapped Date',
    key: 'mapped_date',
    render(row) {
      return row.mapped_date ? filters.dateFormat(row.mapped_date) : '--';
    },
  };
  const mapped_percentage: DataTableColumn<InternalRowData> = {
    title: 'Matching',
    key: 'match_percentage',
    render(row) {
      if (row.match_percentage) {
        return row.match_percentage + '%';
      } else {
        return '--';
      }
    },
  };

  const renderTagLabel: SelectRenderTag = ({ option }) => {
    const name = typeof option.name === 'string' ? option.name : '';
    const percentage = typeof option.percentage === 'number' ? option.percentage : 0;
    if (percentage === 0) {
      return h(
        'div',
        {
          style: {
            display: 'flex',
            alignItems: 'center',
          },
        },
        `${name}`
      );
    } else {
      return h(
        'div',
        {
          style: {
            display: 'flex',
            alignItems: 'center',
          },
        },
        `${name} - ${percentage}%`
      );
    }
  };
  const renderLabel: SelectRenderLabel = (option) => {
    const name = typeof option.name === 'string' ? option.name : '';
    let percentage;
    if (option.percentage !== undefined) {
      percentage = typeof option.percentage === 'number' ? option.percentage : 0;
    } else {
      percentage = 0;
    }
    if (percentage === 0) {
      return h(
        'div',
        {
          style: {
            display: 'flex',
            alignItems: 'center',
          },
        },
        [
          h(
            'div',
            {
              style: {
                marginLeft: '12px',
                padding: '4px 0',
              },
            },
            [h('div', null, `${name}`)]
          ),
        ]
      );
    } else {
      return h(
        'div',
        {
          style: {
            display: 'flex',
            alignItems: 'center',
          },
        },
        [
          h(
            'div',
            {
              style: {
                marginLeft: '12px',
                padding: '4px 0',
              },
            },
            [h('div', null, `${name} - ${percentage}%`)]
          ),
        ]
      );
    }
  };

  //dynamic sorting data table
  const columns: DataTableColumn[] = [
    courier,
    courier_city,
    mapped_city,
    mapped_percentage,
    mapped_date,
  ];
  const { getList, params, list, loading, columnsRef, handleSort, pageChange, paginationReactive } =
    useDataTables(courierMappedCitiesList);
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
    params.value.filterColumn = value;
  }
  function getPercentageFilterList(value) {
    params.value.percentageOperator = value;
  }
  async function applyFilter() {
    let noError = true;
    if (params.value.filterColumn && !filterValue.value) {
      window['$message'].error('Enter input value');
      noError = false;
    } else {
      params.value.filterValue = filterValue.value;
    }
    if (!params.value.filterColumn && filterValue.value) {
      window['$message'].error('Please select Courier/city');
      noError = false;
    }
    if (params.value.percentageOperator && !percentageValue.value) {
      window['$message'].error('Enter percentage value');
      noError = false;
    } else {
      params.value.percentage = percentageValue.value;
    }
    if (!params.value.percentageOperator && percentageValue.value) {
      window['$message'].error('Please select percentage operator');
      noError = false;
    }
    if (params.value.filterValue === '') {
      delete params.value.filterValue;
    }
    if (params.value.percentage === '') {
      delete params.value.percentage;
    }
    if (noError) {
      getList();
    }
  }
  async function openMappingDialog(row) {
    dialogTitle.value = `${row.courier_city} - ${row.courier}`;
    await findCities(row.courier_city);
    mapping.value.courier_city_id = row.courier_city_id;
    if (row.city_id) {
      mapping.value.city_id = row.city_id;
    } else {
      mapping.value.city_id = null;
    }
    showMappingDialog.value = true;
  }
  function findCities(input) {
    weshipMappedCitiesList({ city: input }).then(({ result }) => {
      mappingCities.value = result;
    });
  }

  function save() {
    let data = {};
    // Check if city_id is a number
    if (typeof mapping.value.city_id === 'number') {
      data = {
        mapping_city_id: mapping.value.city_id,
        courier_city_id: mapping.value.courier_city_id,
      };
    }

    // Check if city_id is a string
    if (typeof mapping.value.city_id === 'string') {
      data = {
        mapping_city: mapping.value.city_id,
        courier_city_id: mapping.value.courier_city_id,
      };
    }
    postMapCity(data).then(({ result }) => {
      if (result.status) {
        window['$message'].success(result.message);
        showMappingDialog.value = false;
        getList();
      } else {
        window['$message'].error(result.message);
      }
    });
  }
</script>
