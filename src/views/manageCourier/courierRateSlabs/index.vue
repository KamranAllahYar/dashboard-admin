<template>
  <n-card>
    <n-space vertical>
      <n-space justify="space-between">
        <span></span>
        <n-button type="success" @click="createNewSlab">Create New Rate Slab</n-button>
      </n-space>
      <n-card style="padding: 0 !important" class="custom_tab_block">
        <n-tabs type="bar" animated :on-update:value="onTabChange" :default-value="defaultTab">
          <n-tab-pane
            v-model:value="actionSelectedStatus"
            v-for="(item, index) of courierOptions"
            :name="item?.rate_card_id"
            :tab="item?.name"
            :key="index"
            style="padding: 0"
          />
        </n-tabs>
      </n-card>
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
      <n-modal style="width: 35%" v-model:show="showCreateModal" preset="dialog">
        <template #header>
          <div>Create Rate Slab</div>
        </template>
        <n-space :vertical="true">
          <create-rate-card-slabs
            @saved="
              getList();
              showCreateModal = false;
            "
          />
        </n-space>
      </n-modal>
    </n-space>
  </n-card>
</template>
<script lang="ts" setup>
  import {
    courierList,
    deleteCourierRateCardSlabById,
    getCourierRateCardSlabs,
  } from '@/api/courier';
  import { Component, h, onMounted, ref } from 'vue';
  import { useDataTables } from '@/hooks/useDataTables';
  import { DataTableColumn, NButton, NDropdown, NIcon, useDialog, useMessage } from 'naive-ui';
  import { InternalRowData } from 'naive-ui/lib/data-table/src/interface';
  import { DeleteOutlined, MoreOutlined, EditOutlined } from '@vicons/antd';
  import { ResultEnum } from '@/enums/httpEnum';
  import CreateRateCardSlabs from '@/components/Courier/RateCardSlabs/CreateRateCardSlabs.vue';

  const defaultTab: any = ref();
  const actionSelectedStatus: any = ref();
  const renderIcon = (icon: Component) => {
    return () => {
      return h(NIcon, null, {
        default: () => h(icon),
      });
    };
  };
  const dialog = useDialog();
  const message = useMessage();
  const selectedId = ref(null);
  const showCreateModal = ref(false);
  const selectedOption: any = ref(null);
  const courierOptions: any = ref({});
  const moreOptions = [
    // {
    //   label: 'Edit',
    //   key: 'edit',
    //   icon: renderIcon(EditOutlined),
    // },
    {
      label: 'Delete',
      key: 'delete',
      icon: renderIcon(DeleteOutlined),
    },
  ];
  const id: DataTableColumn<InternalRowData> = {
    title: 'ID',
    key: 'id',
  };
  const courier: DataTableColumn<InternalRowData> = {
    title: 'Courier',
    key: 'rate_card.courier.name',
  };
  const zone: DataTableColumn<InternalRowData> = {
    title: 'Zone',
    key: 'zone.title',
  };
  const type: DataTableColumn<InternalRowData> = {
    title: 'Type',
    key: 'rate_card.type',
  };
  const description: DataTableColumn<InternalRowData> = {
    title: 'Description',
    key: 'description',
  };
  const from: DataTableColumn<InternalRowData> = {
    title: 'From',
    key: 'from',
  };
  const to: DataTableColumn<InternalRowData> = {
    title: 'To',
    key: 'to',
  };
  const rate: DataTableColumn<InternalRowData> = {
    title: 'Rate (PKR)',
    key: 'rate',
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
  const columns: DataTableColumn[] = [id, courier, type, zone, description, from, to, rate, action];

  const { getList, params, list, loading, columnsRef, handleSort, pageChange, paginationReactive } =
    useDataTables(getCourierRateCardSlabs);
  columnsRef.value = columns;

  onMounted(() => {
    courierList({ pageSize: 1000, page: 1, is_active: 1 }).then(({ result }) => {
      courierOptions.value = result.data.filter((item: any) => item.rate_card_id);
      params.value.filterColumn = 'rate_card_id';
      params.value.filterValue = courierOptions.value[0].rate_card_id;
      defaultTab.value = courierOptions.value[0].rate_card_id;
      getList();
    });
  });
  function rowKey(rowData) {
    return rowData.id;
  }
  const selectedAction = (key) => {
    selectedOption.value = key;
  };
  const actionOperation = (item) => {
    if (selectedOption.value === 'edit') {
      selectedId.value = item.id;
    } else if (selectedOption.value === 'delete') {
      selectedId.value = item.id;
      confirmationDialog();
    }
    selectedOption.value = null;
  };
  function confirmationDialog() {
    dialog.error({
      title: 'Confirmation',
      content: () => 'Are you sure you want to delete?',
      positiveText: 'Delete',
      negativeText: 'Cancel',
      onPositiveClick: deleteOperation,
    });
  }
  function deleteOperation() {
    const Loading = window['$loading'] || null;
    Loading.start();
    deleteCourierRateCardSlabById(selectedId.value)
      .then(({ result, code }) => {
        if (code === ResultEnum.SUCCESS) {
          message.success(result.message);
          getList();
          Loading.finish();
          dialog.destroyAll;
        }
      })
      .catch(({ result }) => {
        message.error(result.message);
        Loading.finish();
        dialog.destroyAll;
      });
    selectedId.value = null;
  }
  function createNewSlab() {
    showCreateModal.value = true;
  }
  function onTabChange(statusId) {
    applyStatusFilter(statusId);
  }
  function applyStatusFilter(id) {
    params.value.filterColumn = 'rate_card_id';
    params.value.filterValue = id;
    getList();
  }
</script>
<style>
  .custom_tab_block {
    border-radius: 20px;
    display: flex;
    margin-top: 8px;
    justify-items: center;
    margin-bottom: 8px;
  }
  .n-tabs-tab__label {
    font-size: 15px;
    font-weight: 500;
  }
  .table_header_custom {
    border-width: 1px !important;
    width: 180px !important;
    font-weight: 500 !important;
    color: rgb(125, 140, 193) !important;
    text-align: center !important;
    letter-spacing: 0.2px !important;
    font-size: 13px !important;
  }
  .table_row_custom {
    border-width: 1px !important;
    width: 150px !important;
    font-size: 13px !important;
    color: rgb(38, 63, 151) !important;
    font-weight: 500 !important;
    text-align: center !important;
    letter-spacing: 0.2px !important;
    text-transform: capitalize;
  }
</style>
