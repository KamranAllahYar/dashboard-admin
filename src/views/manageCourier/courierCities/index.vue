<template>
  <n-card>
    <n-space vertical>
      <n-space>
        <p style="font-weight: bold; font-size: 20px">Select Courier</p>
        <n-select
          v-model:value="courierCityMapping.courier_id"
          :options="courierOptions"
          placeholder="Please Select Courier"
          label-field="name"
          value-field="id"
          default-value="TCS"
          :onChange="actionSelectedCourier"
          style="width: 230px"
        />
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
        <n-select
          v-model:value="mapped"
          value-field="value"
          label-field="label"
          :options="mapOptions"
          style="width: 200px"
        />
        <n-button type="success" @click="applyFilter">Search</n-button>
      </n-space>

      <n-collapse-transition :show="showActions">
        <n-divider style="margin-top: 0px; margin-bottom: 0px">Actions</n-divider>
        <n-space
          style="display: flex; justify-content: space-between; margin-top: 5px; margin-bottom: 5px"
        >
          <n-space>
            <n-select
              v-model:value="courierCityMapping.state"
              :options="stateOptions"
              placeholder="Please Select State"
              label-field="label"
              value-field="value"
              style="width: 230px"
            />
            <n-select
              v-model:value="courierCityMapping.zone_id"
              :options="zoneOptions"
              placeholder="Please Select Zone"
              label-field="title"
              value-field="id"
              style="width: 230px"
            />
            <n-space style="margin-top: 7px">
              <p style="font-weight: bold">Is Pickup</p>
              <n-switch
                v-model:value="courierCityMapping.is_pickup"
                style="justify-content: center"
              />
              <n-divider vertical style="height: 30px" />
              <p style="font-weight: bold">Is Reverse</p>
              <n-switch v-model:value="courierCityMapping.is_reverse" />
              <n-divider vertical style="height: 30px" />
              <p style="font-weight: bold">Has COD</p>
              <n-switch v-model:value="courierCityMapping.has_cod" />
              <n-divider vertical style="height: 30px" />
              <p style="font-weight: bold">Is Active</p>
              <n-switch v-model:value="courierCityMapping.is_active" />
            </n-space>
          </n-space>

          <n-button :loading="saveLoaderRef" type="success" round @click="saveData">
            <template #icon>
              <n-icon
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 32 32"
                >
                  <path
                    d="M27.71 9.29l-5-5A1 1 0 0 0 22 4H6a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V10a1 1 0 0 0-.29-.71zM12 6h8v4h-8zm8 20h-8v-8h8zm2 0v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8H6V6h4v4a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6.41l4 4V26z"
                    fill="currentColor"
                  /></svg
              ></n-icon>
            </template>
            Save
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
        :pagination="paginationReactive"
        :row-key="rowKey"
        @update:sorter="handleSort"
        @update:page="pageChange"
        @update:checked-row-keys="handleCheck"
        style="margin-top: 20px"
      />
    </n-space>
    <n-modal style="width: 70%" v-model:show="showEditableModel" preset="dialog">
      <template #header>
        <div>Create/Update Courier City Mapping</div>
      </template>
      <n-space :vertical="true">
        <create-update-courier-city-mapping
          :data="selectedRow"
          :zones="courierZoneMaskingOptions"
          :states="stateOptions"
          :courier="params.id"
          @created="
            getList();
            showEditableModel = false;
          "
        />
      </n-space>
    </n-modal>
  </n-card>
</template>
<script lang="ts" setup>
  import {
    courierCitiesList,
    courierList,
    createCourierCityMapping,
    getCourierZoneMaskingListByCourierId,
    getZonesList,
  } from '@/api/courier';
  import { DataTableColumn, DataTableRowKey, NButton, NDropdown, NIcon, NSelect } from 'naive-ui';
  import { InternalRowData } from 'naive-ui/lib/data-table/src/interface';
  import { Component, h, onMounted, ref } from 'vue';
  import { useDataTables } from '@/hooks/useDataTables';
  import { MoreOutlined, EditOutlined } from '@vicons/antd';
  import CreateUpdateCourierCityMapping from '@/components/ManageCourier/CreateUpdateCourierCityMapping.vue';

  const filterValue: any = ref();
  const mapped: any = ref();
  const checkedRowKeysRef = ref<DataTableRowKey[]>([]);
  const actionSelectedStatus: any = ref();
  const showActions = ref(false);
  const saveLoaderRef = ref(false);
  const courierCityMapping = ref({
    courier_id: 1,
    zipcode: null,
    state: null,
    zone_id: null,
    is_pickup: true,
    is_reverse: true,
    has_cod: true,
    is_active: true,
  });
  const filterOptions = [
    {
      label: 'City Name',
      value: 'city_name',
    },
    {
      label: 'City Code',
      value: 'city_code',
    },
  ];
  const mapOptions = [
    {
      label: 'All',
      value: 'all',
    },
    {
      label: 'Mapped',
      value: 'yes',
    },
    {
      label: 'Un Mapped',
      value: 'no',
    },
  ];

  const stateOptions = [
    {
      label: 'Punjab',
      value: 'Punjab',
    },
    {
      label: 'Khyber Pakhtunkhwa',
      value: 'Khyber Pakhtunkhwa',
    },
    {
      label: 'Sindh',
      value: 'Sindh',
    },
    {
      label: 'Balochistan',
      value: 'Balochistan',
    },
    {
      label: 'Gilgit-Baltistan',
      value: 'Gilgit-Baltistan',
    },
    {
      label: 'Azad Jammu and Kashmir',
      value: 'Azad Jammu and Kashmir',
    },
  ];
  const renderIcon = (icon: Component) => {
    return () => {
      return h(NIcon, null, {
        default: () => h(icon),
      });
    };
  };
  const actionOptions = [
    {
      label: 'Edit',
      key: 'edit',
      icon: renderIcon(EditOutlined),
    },
  ];
  const selectedOption: any = ref(null);
  const selectedRow: any = ref(null);
  const courierOptions: any = ref();
  const zoneOptions: any = ref();
  const courierZoneMaskingOptions: any = ref();
  const showEditableModel = ref(false);
  const selection: DataTableColumn<InternalRowData> = {
    type: 'selection',
  };
  const id: DataTableColumn<InternalRowData> = {
    title: 'ID',
    key: 'id',
  };
  const city_code: DataTableColumn<InternalRowData> = {
    title: 'City Code',
    key: 'city_code',
  };
  const city_name: DataTableColumn<InternalRowData> = {
    title: 'City Name',
    key: 'city_name',
  };
  const common_city_name: DataTableColumn<InternalRowData> = {
    title: 'Common City Name',
    key: 'common_city_name',
  };
  const courier_zipcode_state: DataTableColumn<InternalRowData> = {
    title: 'State',
    key: 'courier_zipcode.state',
  };
  const courier_zipcode: DataTableColumn<InternalRowData> = {
    title: 'Zipcode',
    key: 'courier_zipcode.zipcode',
  };
  const courier_zipcode_zone: DataTableColumn<InternalRowData> = {
    title: 'Zone',
    key: 'courier_zipcode.zone.title',
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
          options: actionOptions,
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
    id,
    city_code,
    city_name,
    common_city_name,
    courier_zipcode_state,
    courier_zipcode,
    courier_zipcode_zone,
    action,
  ];
  const { getList, params, list, loading, columnsRef, handleSort, pageChange, paginationReactive } =
    useDataTables(courierCitiesList);
  columnsRef.value = columns;
  function rowKey(rowData) {
    return rowData.id;
  }
  onMounted(() => {
    params.value.id = 1;
    getZonesList().then(({ result }) => {
      zoneOptions.value = result.data;
    });
    getCourierZoneMaskingListByCourierId(params.value.id).then(({ result }) => {
      courierZoneMaskingOptions.value = result.data;
    });
    courierList({pageSize: 1000,page:1, is_active:1}).then(({ result }) => {
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
  function saveData() {
    if (!courierCityMapping.value.state) {
      window['$message'].error('Please select a state');
    } else if (!courierCityMapping.value.zone_id) {
      window['$message'].error('Please select a zone');
    } else {
      saveLoaderRef.value = true;
      let data = {
        city_ids: checkedRowKeysRef.value,
        zipcode: courierCityMapping.value.zipcode,
        courier_id: courierCityMapping.value.courier_id,
        zone_id: courierCityMapping.value.zone_id,
        is_pickup: courierCityMapping.value.is_pickup,
        is_reverse: courierCityMapping.value.is_reverse,
        has_cod: courierCityMapping.value.has_cod,
        state: courierCityMapping.value.state,
        is_active: courierCityMapping.value.is_active,
      };
      createCourierCityMapping(data)
        .then(({ result }) => {
          saveLoaderRef.value = false;
          if (result.status) {
            getList();
            window['$message'].success(result.message);
          } else {
            window['$message'].error(result.message);
          }
        })
        .catch((response) => {
          saveLoaderRef.value = false;
          window['$message'].error(response.message);
        });
    }
  }
  function actionSelectedCourier(value) {
    params.value.id = value;
    getList();
    getCourierZoneMaskingListByCourierId(params.value.id).then(({ result }) => {
      courierZoneMaskingOptions.value = result.data;
    });
  }
  const selectedAction = (key) => {
    selectedOption.value = key;
  };
  const actionOperation = (item) => {
    if (selectedOption.value === 'edit') {
      selectedRow.value = item;
      showEditableModel.value = true;
    }
    selectedOption.value = null;
  };
  function getFilterList(value) {
    params.value.filterColumn = value;
  }
  function applyFilter() {
    params.value.filterValue = filterValue.value;
    params.value.mapped = mapped.value;
    getList();
  }
</script>
