<template>
  <n-space :vertical="true">
    <n-h1>Manage Users</n-h1>
    <div style="width: 100%; display: flex; justify-content: space-between">
      <n-input
        style="margin-right: 10px"
        type="text"
        size="small"
        v-model:value="params.email"
        @change="fetchList"
        placeholder="Search by email "
      />
      <n-button round type="info" @click="showModal = true">Create New User</n-button>
    </div>

    <n-table :striped="true">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Roles</th>
          <!--          <th>Created At</th>-->
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in list" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.first_name + ' ' + item.last_name }}</td>
          <td>{{ item.email }}</td>
          <td>
            <n-space>
              <n-tag
                :bordered="false"
                v-for="(role, index) in item.roles"
                :key="index"
                type="success"
              >
                {{ role.name.toUpperCase() }}
              </n-tag>
            </n-space>
          </td>
          <!--          <td>{{ $filters.dateFormat(item.created_at) }}</td>-->
          <td>
            <n-dropdown
              @click="actionOperation(item)"
              :onSelect="selectedAction"
              trigger="click"
              :options="moreOptions"
            >
              <n-button size="small" :circle="true">
                <n-icon>
                  <more-outlined />
                </n-icon>
              </n-button>
            </n-dropdown>
          </td>
        </tr>
      </tbody>
    </n-table>
    <div v-show="emptyState" style="display: flex; justify-content: center; height: 300px">
      <n-space :vertical="true" style="display: flex; justify-content: center; height: 300px">
        <img style="width: 100px; height: 100px" :src="emptyStateImg" />
        <p>No results found</p></n-space
      >
    </div>
    <n-pagination
      v-show="!emptyState"
      v-model:page="page"
      v-model:page-size="pageSize"
      :item-count="itemCount"
      :page-sizes="pageSizes"
      size="small"
      :show-quick-jumper="true"
      :show-size-picker="true"
    />
  </n-space>

  <n-modal style="width: 70%" v-model:show="showModal" preset="dialog">
    <template #header>
      <div>Create New User</div>
    </template>
    <n-space :vertical="true">
      <create-new-user
        @created="
          getList();
          showModal = false;
        "
      />
    </n-space>
  </n-modal>

  <n-modal style="width: 70%" v-model:show="showEditModal" preset="dialog">
    <template #header>
      <div>Update User</div>
    </template>
    <n-space :vertical="true">
      <update-user
        :id="selectedId"
        @updated="
          getList();
          showEditModal = false;
        "
      />
    </n-space>
  </n-modal>
</template>

<script lang="ts" setup>
  import { ResultEnum } from '@/enums/httpEnum';
  import { userPagination } from '@/hooks/userPagination';
  import { ref, onMounted, h } from 'vue';
  import { useDialog, useMessage } from 'naive-ui';
  import type { Component } from 'vue';
  import { NIcon, NPagination } from 'naive-ui';
  import { MoreOutlined, EditOutlined, DeleteOutlined } from '@vicons/antd';
  import { deleteUser, userList } from '@/api/users';
  import CreateNewUser from '@/components/AccountSetup/CreateNewUser.vue';
  import UpdateUser from '@/components/AccountSetup/UpdateUser.vue';
  import emptyStateImg from '@/assets/images/empty-folder.png';

  const dialog = useDialog();
  const showModal = ref(false);
  const showEditModal = ref(false);
  const selectedOption: any = ref(null);
  const selectedId = ref(null);
  const message = useMessage();
  // const props = defineProps({
  //   id: {
  //     type: [Number, String],
  //   },
  // });
  const { getList, emptyState, list, page, pageSizes, itemCount, pageSize, params }: any =
    userPagination(userList);
  const renderIcon = (icon: Component) => {
    return () => {
      return h(NIcon, null, {
        default: () => h(icon),
      });
    };
  };

  const moreOptions = ref([
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
  ]);

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
    deleteUser(selectedId.value)
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

  const actionOperation = (item) => {
    if (selectedOption.value === 'edit') {
      showEditModal.value = true;
      selectedId.value = item.id;
    } else if (selectedOption.value === 'delete') {
      selectedId.value = item.id;
      confirmationDialog();
    }
    // else if (selectedOption.value === 'details') {
    //   router.push(`/settings?id=${item.id}`);
    // }
    selectedOption.value = null;
  };

  const selectedAction = (key) => {
    selectedOption.value = key;
  };
  const fetchList = () => {
    console.log(params.value);
    getList(params.value);
  };
  onMounted(() => {
    getList();
  });
</script>

<style lang="less" scoped></style>
