<template>
  <div>
    <n-card>
      <n-space :vertical="true">
        <n-space style="display: flex; justify-content: space-between">
          <n-h5 style="font-weight: bold; color: rgb(38, 63, 151)">CHANNEL CONFIGS</n-h5>
          <n-button round type="info" style="border-radius: 50px" @click="createConfig"
            >Add new config
          </n-button>
        </n-space>
        <n-table :striped="true">
          <thead>
            <tr>
              <th style="color: #7d8cc1; font-weight: bold">ID</th>
              <th style="color: #7d8cc1; font-weight: bold">GROUP</th>
              <th style="color: #7d8cc1; font-weight: bold">TYPE</th>
              <th style="color: #7d8cc1; font-weight: bold">KEY</th>
              <th style="color: #7d8cc1; font-weight: bold">VALUE</th>
              <th style="color: #7d8cc1; font-weight: bold">PRIORITY</th>
              <th style="color: #7d8cc1; font-weight: bold">STATUS</th>
              <th style="color: #7d8cc1; font-weight: bold">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in list" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.group }}</td>
              <td>{{ item.type }}</td>
              <td>{{ item.key }}</td>
              <td>{{ item.value }}</td>
              <td>{{ item.priority }}</td>
              <td>{{ item.is_active }}</td>
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

        <n-modal v-model:show="showCreateConfigModal" preset="dialog">
          <template #header>
            <div>Create Channel Config</div>
          </template>
          <n-space :vertical="true">
            <create-channel-config
              :id="route.params.id"
              @created="
                getList();
                showCreateConfigModal = false;
              "
            />
          </n-space>
        </n-modal>
        <n-modal v-model:show="showEditConfigModal" preset="dialog">
          <template #header>
            <div>Update Channel Config</div>
          </template>
          <n-space :vertical="true">
            <edit-channel-config
              :id="selectedId"
              @updated="
                getList();
                showEditConfigModal = false;
              "
            />
          </n-space>
        </n-modal>
      </n-space>
    </n-card>
  </div>
</template>
<script lang="ts" setup>
  import { userPagination } from '@/hooks/userPagination';
  import { getChannelConfigs, deleteChannelConfig } from '@/api/channels/config';
  import { Component, h, onMounted, ref } from 'vue';
  import { MoreOutlined, DeleteOutlined, EditOutlined } from '@vicons/antd';
  import { NIcon, useDialog, useMessage } from 'naive-ui';
  import { useRoute, useRouter } from 'vue-router';
  import { ResultEnum } from '@/enums/httpEnum';
  import emptyStateImg from '@/assets/images/empty-folder.png';
  import CreateChannelConfig from '@/components/Channel/CreateChannelConfig.vue';
  import EditChannelConfig from '@/components/Channel/EditChannelConfig.vue';

  const route = useRoute();
  const showCreateConfigModal = ref(false);
  const showEditConfigModal = ref(false);
  const message = useMessage();
  const selectedId = ref(null);
  const dialog = useDialog();
  const router = useRouter();
  const selectedOption: any = ref(null);
  const params = ref({});
  const emptyState = ref(false);

  const { list, page, pageSizes, itemCount, pageSize }: any = userPagination(getChannelConfigs);

  const getList = () => {
    getChannelConfigs(route.params.id, {
      ...params.value,
      page: page.value,
      pageSize: pageSize.value,
    }).then(({ result }) => {
      list.value = result.data;
      itemCount.value = result.meta.total;
      emptyState.value = result.meta.total === 0;
    });
  };
  onMounted(() => {
    getList();
  });
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

  const actionOperation = (item) => {
    if (selectedOption.value === 'edit') {
      selectedId.value = item.id;
      showEditConfigModal.value = true;
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
  const selectedAction = (key) => {
    selectedOption.value = key;
  };

  function deleteOperation() {
    const Loading = window['$loading'] || null;
    Loading.start();
    deleteChannelConfig(selectedId.value)
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

  function createConfig() {
    showCreateConfigModal.value = true;
  }
</script>
