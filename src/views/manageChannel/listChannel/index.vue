<template>
  <n-card>
    <n-space :vertical="true">
      <n-space style="display: flex; justify-content: space-between">
        <n-h1
          style="
            font-weight: bold;
            color: rgb(38, 63, 151);
            text-align: left;
            letter-spacing: 0.2px;
            margin: 0px;
          "
          >All Channels
        </n-h1>
        <n-button
          :round="true"
          type="info"
          @click="createNewChannelModal"
          style="
            font-weight: bold;
            font-size: 14px;
            text-align: center;
            padding-top: 1px;
            margin-top: 7px;
            letter-spacing: 0.2px;
          "
        >
          <template #icon>
            <n-icon>
              <plus-outlined />
            </n-icon>
          </template>
          Create New Channel
        </n-button>
      </n-space>
      <n-card
        v-for="(item, index) in list"
        :key="item.id"
        style="border-radius: 12px; border-color: rgb(221, 226, 255); border-width: 2px"
      >
        <n-grid :x-gap="12" :y-gap="12" :cols="9">
          <n-grid-item :span="1" style="display: flex; justify-content: center">
            <img :src="item.channel_logo_url" style="width: 50px; height: 50px" />
          </n-grid-item>
          <n-grid-item :span="2">
            <n-space :vertical="true">
              <p
                style="
                  font-weight: bold;
                  color: rgb(38, 63, 151);
                  text-align: center;
                  letter-spacing: 0.2px;
                  font-size: 16px;
                "
                >Channel Name
              </p>
              <p
                style="
                  color: rgb(126, 143, 204);
                  text-align: center;
                  letter-spacing: 0.2px;
                  font-size: 16px;
                "
                >{{ item.channel_name }}
              </p>
            </n-space>
          </n-grid-item>
          <n-grid-item :span="4">
            <n-space :vertical="true">
              <p
                style="
                  font-weight: bold;
                  color: rgb(38, 63, 151);
                  text-align: center;
                  letter-spacing: 0.2px;
                  font-size: 16px;
                "
                >Website URL
              </p>
              <p
                style="
                  color: rgb(126, 143, 204);
                  text-align: center;
                  letter-spacing: 0.2px;
                  font-size: 16px;
                "
                >{{ item.channel_base_url }}
              </p>
            </n-space>
          </n-grid-item>
          <n-grid-item :span="1" style="display: flex; justify-content: center">
            <n-space :vertical="true">
              <p
                style="
                  font-weight: bold;
                  color: rgb(38, 63, 151);
                  text-align: center;
                  letter-spacing: 0.2px;
                  font-size: 16px;
                "
                >Status
              </p>
              <n-space>
                <n-switch
                  style="font-size: 12px; display: flex; justify-content: center"
                  v-model:value="item.is_active"
                  :checked-value="1"
                  @change="updateStatus(item)"
                  :unchecked-value="0"
                >
                  <template #checked> Active </template>
                  <template #unchecked> Inactive </template>
                </n-switch>
              </n-space>
            </n-space>
          </n-grid-item>
          <n-grid-item :span="1" style="display: flex; justify-content: center">
            <n-space :vertical="true" style="display: flex; justify-content: center">
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
              <!--                <n-button-->
              <!--                  :strong="true"-->
              <!--                  :secondary="true"-->
              <!--                  :circle="true"-->
              <!--                  type="info"-->
              <!--                  size="large"-->
              <!--                  @click="actionEdit(item)"-->
              <!--                  style="margin-top: 13px"-->
              <!--                >-->
              <!--                  <template #icon>-->
              <!--                    <n-icon><edit-outlined /></n-icon>-->
              <!--                  </template>-->
              <!--                </n-button>-->
              <!--                <n-button-->
              <!--                  :strong="true"-->
              <!--                  :secondary="true"-->
              <!--                  :circle="true"-->
              <!--                  type="error"-->
              <!--                  @click="confirmationDialog(item)"-->
              <!--                  size="large"-->
              <!--                  style="margin-top: 13px"-->
              <!--                >-->
              <!--                  <template #icon>-->
              <!--                    <n-icon><delete-outlined /></n-icon>-->
              <!--                  </template>-->
              <!--                </n-button>-->
            </n-space>
          </n-grid-item>
        </n-grid>
      </n-card>
      <div v-if="emptyState" style="display: flex; justify-content: center; height: 300px">
        <n-space :vertical="true" style="display: flex; justify-content: center; height: 300px">
          <img style="width: 100px; height: 100px" :src="emptyStateImg" />
          <p>No results found</p></n-space
        >
      </div>
      <n-space style="align-items: center; padding-top: 15px">
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
      </n-space>

      <n-modal v-model:show="showCreateModal" preset="dialog">
        <template #header>
          <div>Create Channel</div>
        </template>
        <n-space :vertical="true">
          <create-channel
            @created="
              getList();
              showCreateModal = false;
            "
          />
        </n-space>
      </n-modal>
      <n-modal v-model:show="showEditModal" preset="dialog">
        <template #header>
          <div>Update Channel</div>
        </template>
        <n-space :vertical="true">
          <edit-channel
            :id="selectedId"
            @updated="
              getList();
              selectedId = null;
              showEditModal = false;
            "
          />
        </n-space>
      </n-modal>
    </n-space>
  </n-card>
</template>
<script lang="ts" setup>
  import {
    EditOutlined,
    PlusOutlined,
    DeleteOutlined,
    MoreOutlined,
    SettingOutlined,
    AppstoreAddOutlined,
  } from '@vicons/antd';
  import { useRouter } from 'vue-router';
  import { userPagination } from '@/hooks/userPagination';
  import { channelList, deleteChannel, updateChannel } from '@/api/channels/channel';
  import { Component, h, onMounted, ref } from 'vue';
  import emptyStateImg from '@/assets/images/empty-folder.png';
  import { ResultEnum } from '@/enums/httpEnum';
  import { NIcon, useDialog, useMessage } from 'naive-ui';
  import EditChannel from '@/components/Channel/EditChannel.vue';
  import CreateChannel from '@/components/Channel/CreateChannel.vue';

  const selectedOption: any = ref(null);
  const showEditModal = ref(false);
  const showCreateModal = ref(false);
  const message = useMessage();
  const selectedId = ref(null);
  const dialog = useDialog();
  const selectedChannelId = ref(null);
  const router = useRouter();
  const emptyState = ref(false);
  const { list, page, pageSizes, itemCount, pageSize, params }: any = userPagination(channelList);
  const getList = () => {
    channelList({ ...params.value, page: page.value, pageSize: pageSize.value }).then(
      ({ result }) => {
        list.value = result.data;
        itemCount.value = result.meta.total;
        if (result.meta.total === 0) {
          emptyState.value = true;
        }
      }
    );
  };
  const renderIcon = (icon: Component) => {
    return () => {
      return h(NIcon, null, {
        default: () => h(icon),
      });
    };
  };

  onMounted(() => {
    getList();
  });

  function updateStatus(item) {
    var bool;
    if (item.is_active === 0) {
      bool = false;
    } else {
      bool = true;
    }
    selectedChannelId.value = item.id;
    const data = ref({
      is_active: bool,
    });
    updateChannel(selectedChannelId.value, data.value).then(({ result }) => {
      window['$message'].success(result.message);
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
    const Loading = window['$loading'] || null;
    Loading.start();
    deleteChannel(selectedId.value)
      .then(({ result, code }) => {
        if (code === ResultEnum.SUCCESS) {
          message.success(result.message);
          getList();
          Loading.finish();
        }
      })
      .catch(({ result }) => {
        message.error(result.message);
        Loading.finish();
      });
  }

  const actionOperation = (item) => {
    if (selectedOption.value === 'config') {
      router.push({ name: 'ChannelConfig', params: { id: item.id } });
    } else if (selectedOption.value === 'template') {
      router.push({ name: 'ChannelTemplate', params: { id: item.id } });
    } else if (selectedOption.value === 'edit') {
      showEditModal.value = true;
      selectedId.value = item.id;
    } else if (selectedOption.value === 'delete') {
      selectedId.value = item.id;
      confirmationDialog();
    }
  };
  const selectedAction = (key) => {
    selectedOption.value = key;
  };
  const moreOptions = ref([
    {
      label: 'Config',
      key: 'config',
      icon: renderIcon(SettingOutlined),
    },
    {
      label: 'Template',
      key: 'template',
      icon: renderIcon(AppstoreAddOutlined),
    },
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

  function createNewChannelModal() {
    showCreateModal.value = true;
  }
</script>
