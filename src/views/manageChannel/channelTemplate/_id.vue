<template>
  <div>
    <n-card>
      <n-space :vertical="true">
        <n-space style="display: flex; justify-content: space-between">
          <n-h5 style="font-weight: bold; color: rgb(38, 63, 151)">CHANNEL TEMPLATES</n-h5>
          <n-button round type="info" style="border-radius: 50px" @click="createTemplate"
            >Add new template
          </n-button>
        </n-space>
        <n-table :striped="true">
          <thead>
            <tr>
              <th style="color: #7d8cc1; font-weight: bold">ID</th>
              <th style="color: #7d8cc1; font-weight: bold">SOURCE</th>
              <th style="color: #7d8cc1; font-weight: bold">DESTINATION</th>
              <th style="color: #7d8cc1; font-weight: bold">TYPE</th>
              <th style="color: #7d8cc1; font-weight: bold">GROUP</th>
              <th style="color: #7d8cc1; font-weight: bold">STATUS</th>
              <th style="color: #7d8cc1; font-weight: bold">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in list" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.source }}</td>
              <td>{{ item.destination }}</td>
              <td>{{ item.type }}</td>
              <td>{{ item.group }}</td>
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
        <div v-if="emptyState" style="display: flex; justify-content: center; height: 300px">
          <n-space :vertical="true" style="display: flex; justify-content: center; height: 300px">
            <img style="width: 100px; height: 100px" :src="emptyStateImg" />
            <p>No results found</p>
          </n-space>
        </div>

        <n-pagination
          v-if="!emptyState"
          v-model:page="page"
          v-model:page-size="pageSize"
          :item-count="itemCount"
          :page-sizes="pageSizes"
          size="small"
          :show-quick-jumper="true"
          :show-size-picker="true"
        />

        <n-modal v-model:show="showCreateTemplateModal" preset="dialog">
          <template #header>
            <div>Create Channel Template</div>
          </template>
          <n-space :vertical="true">
            <create-channel-template
              :id="route.params.id"
              @created="
                getList();
                showCreateTemplateModal = false;
              "
            />
          </n-space>
        </n-modal>
        <n-modal v-model:show="showEditTemplateModal" preset="dialog">
          <template #header>
            <div>Update Channel Template</div>
          </template>
          <n-space :vertical="true">
            <edit-channel-template
              :id="selectedId"
              @updated="
                getList();
                showEditTemplateModal = false;
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
  import { Component, h, onMounted, ref } from 'vue';
  import { MoreOutlined, DeleteOutlined, EditOutlined } from '@vicons/antd';
  import { NIcon, useDialog, useMessage } from 'naive-ui';
  import { useRoute } from 'vue-router';
  import { ResultEnum } from '@/enums/httpEnum';
  import emptyStateImg from '@/assets/images/empty-folder.png';
  import { deleteChannelTemplate, getChannelTemplates } from '@/api/channels/template';
  import CreateChannelTemplate from '@/components/Channel/CreateChannelTemplate.vue';
  import EditChannelTemplate from '@/components/Channel/EditChannelTemplate.vue';

  const route = useRoute();
  const showCreateTemplateModal = ref(false);
  const showEditTemplateModal = ref(false);
  const message = useMessage();
  const selectedId = ref(null);
  const dialog = useDialog();
  const selectedOption: any = ref(null);
  const params = ref({});
  const emptyState = ref(false);

  const { list, page, pageSizes, itemCount, pageSize }: any = userPagination(getChannelTemplates);

  const getList = () => {
    getChannelTemplates(route.params.id, {
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
      showEditTemplateModal.value = true;
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
    deleteChannelTemplate(selectedId.value)
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

  function createTemplate() {
    showCreateTemplateModal.value = true;
  }
</script>
