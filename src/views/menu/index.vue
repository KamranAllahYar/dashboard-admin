<template>
  <n-card>
    <div>
      <n-h6>Menu List</n-h6>
      <n-tree
        :block-line="true"
        :data="data"
        :selectable="true"
        label-field="title"
        key-field="id"
        :on-update:selected-keys="selectedKeys"
      />
      <n-button
        type="primary"
        size="large"
        :circle="true"
        style="position: fixed; bottom: 24px; right: 24px"
        @click="showModal = true"
      >
        <template #icon>
          <n-icon>
            <plus-outlined />
          </n-icon>
        </template>
      </n-button>
      <n-button
        type="success"
        size="large"
        :hidden="showButton"
        :circle="true"
        style="position: fixed; bottom: 80px; right: 24px"
        @click="showEditModal = true"
      >
        <template #icon>
          <n-icon>
            <edit-outlined />
          </n-icon>
        </template>
      </n-button>
      <n-button
        type="error"
        size="large"
        :hidden="showButton"
        :circle="true"
        style="position: fixed; bottom: 135px; right: 24px"
        @click="confirmationDialog"
      >
        <template #icon>
          <n-icon>
            <delete-outlined />
          </n-icon>
        </template>
      </n-button>
      <n-modal style="width: 75%" v-model:show="showModal" preset="dialog">
        <template #header>
          <div>Create New Menu</div>
        </template>
        <n-space :vertical="true">
          <create-menu
            @created="
              getList();
              showModal = false;
            "
          />
        </n-space>
      </n-modal>

      <n-modal style="width: 75%" v-model:show="showEditModal" preset="dialog">
        <template #header>
          <div>Update Menu</div>
        </template>
        <n-space :vertical="true">
          <edit-menu
            :id="selectedNode"
            @updated="
              getList();
              showEditModal = false;
            "
          />
        </n-space>
      </n-modal>
    </div>
  </n-card>
</template>

<script lang="ts" setup>
  import { adminMenuTree, deleteMenu } from '@/api/system/menu';
  import { ref } from 'vue';
  import { PlusOutlined, EditOutlined, DeleteOutlined } from '@vicons/antd';
  import CreateMenu from '@/components/Menu/CreateMenu.vue';
  import EditMenu from '@/components/Menu/EditMenu.vue';
  import { ResultEnum } from '@/enums/httpEnum';
  import { useMessage, useDialog } from 'naive-ui';

  const message = useMessage();
  const showModal = ref(false);
  const showEditModal = ref(false);
  const showButton = ref(true);
  const selectedNode = ref();
  const data = ref([]);
  const dialog = useDialog();
  function selectedKeys(value) {
    if (value[0]) {
      selectedNode.value = value[0];
      showButton.value = false;
    } else {
      showButton.value = true;
    }
  }

  function getList() {
    adminMenuTree().then(({ result }) => {
      data.value = result.data;
    });
  }

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
    deleteMenu(selectedNode.value)
      .then(({ result, code }) => {
        if (code === ResultEnum.SUCCESS) {
          message.success(result.message);
          getList();
          // Loading.finish();
        }
      })
      .catch(({ result }) => {
        message.error(result.message);
        // Loading.finish();
      });
  }

  getList();
</script>
