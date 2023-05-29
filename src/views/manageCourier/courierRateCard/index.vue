<template>
  <n-card>
    <n-space vertical>
      <n-space justify="space-between">
        <span></span>
        <n-button type="success" @click="createNewSlab">Create Courier Rate Card</n-button>
      </n-space>
      <n-divider>Courier Rate Cards</n-divider>
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
      <n-modal
        style="width: 30%"
        v-model:show="showCreateModal"
        preset="dialog"
        :on-after-leave="modalClose"
      >
        <template #header>
          <div>Create/Update Create Card</div>
        </template>
        <n-space :vertical="true">
          <create-rate-card
            :rateCardItem="selectedItem"
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
  import { deleteCourierRateCardById, getCourierRateCards } from '@/api/courier';
  import { Component, h, onMounted, ref } from 'vue';
  import { useDataTables } from '@/hooks/useDataTables';
  import {
    DataTableColumn,
    NButton,
    NDropdown,
    NIcon,
    NTag,
    useDialog,
    useMessage,
  } from 'naive-ui';
  import { InternalRowData } from 'naive-ui/lib/data-table/src/interface';
  import { DeleteOutlined, MoreOutlined, EditOutlined } from '@vicons/antd';
  import { ResultEnum } from '@/enums/httpEnum';
  import CreateRateCard from '@/components/Courier/RateCards/CreateRateCard.vue';

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
  const selectedItem = ref(null);
  const showCreateModal = ref(false);
  const selectedOption: any = ref(null);
  const moreOptions = [
    {
      label: 'Edit',
      key: 'edit',
      icon: renderIcon(EditOutlined),
    },
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
    key: 'courier.name',
  };
  const status: DataTableColumn<InternalRowData> = {
    title: 'Status',
    key: 'status',
    render(row) {
      if (row.status === 1) {
        return h(
          NTag,
          {
            type: 'success',
          },
          {
            default: () => 'Active',
          }
        );
      } else if (row.status === 0) {
        return h(
          NTag,
          {
            type: 'error',
          },
          {
            default: () => 'Inactive',
          }
        );
      }
    },
  };
  const type: DataTableColumn<InternalRowData> = {
    title: 'Type',
    key: 'type',
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
  const columns: DataTableColumn[] = [id, courier, type, status, action];

  const { getList, list, loading, columnsRef, handleSort, pageChange, paginationReactive } =
    useDataTables(getCourierRateCards);
  columnsRef.value = columns;

  onMounted(() => {
    getList();
  });
  function rowKey(rowData) {
    return rowData.id;
  }
  const selectedAction = (key) => {
    selectedOption.value = key;
  };
  const actionOperation = (item) => {
    if (selectedOption.value === 'edit') {
      selectedItem.value = { ...item };
      showCreateModal.value = true;
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
    deleteCourierRateCardById(selectedId.value)
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
  function modalClose() {
    selectedItem.value = null;
  }
</script>
