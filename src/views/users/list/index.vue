<template>
  <n-card>
    <n-space :vertical="true">
      <n-input
        type="text"
        size="small"
        v-model:value="params.email"
        @change="fetchList"
        placeholder="Email"
      />
      <n-table :striped="true">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Roles</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in list" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.first_name }}</td>
            <td>{{ item.last_name }}</td>
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
            <td>{{ $filters.dateFormat(item.created_at) }}</td>
            <td>
              <n-dropdown
                @click="actionOperation(item)"
                :onSelect="selectedAction"
                trigger="click"
                :options="
                  item.roles.some((role) => role.name === 'admin') ? moreOptionsTwo : moreOptions
                "
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
      <n-pagination
        v-model:page="page"
        v-model:page-size="pageSize"
        :item-count="itemCount"
        :page-sizes="pageSizes"
        size="small"
        :show-quick-jumper="true"
        :show-size-picker="true"
      />
    </n-space>
  </n-card>
</template>

<script lang="ts" setup>
  import { userList, deleteUser } from '@/api/users';
  import { ResultEnum } from '@/enums/httpEnum';
  import { userPagination } from '@/hooks/userPagination';
  import { ref, onMounted, h } from 'vue';
  import { useRouter } from 'vue-router';
  import { useDialog, useMessage } from 'naive-ui';

  import type { Component } from 'vue';
  import { NIcon, NPagination } from 'naive-ui';
  import { MoreOutlined, EditOutlined, DeleteOutlined } from '@vicons/antd';

  const dialog = useDialog();
  const selectedOption: any = ref(null);
  const router = useRouter();
  const message = useMessage();
  const selectedId = ref(null);

  const { getList, list, page, pageSizes, itemCount, pageSize, params }: any =
    userPagination(userList);

  const renderIcon = (icon: Component) => {
    return () => {
      return h(NIcon, null, {
        default: () => h(icon),
      });
    };
  };

  const moreOptionsTwo = ref([
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
      router.push({ name: 'UserEdit', params: { id: item.id } });
    } else if (selectedOption.value === 'delete') {
      selectedId.value = item.id;
      confirmationDialog();
    }
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
