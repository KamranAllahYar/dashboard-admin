<template>
  <n-card style="border-radius: 12px">
    <n-space :vertical="true">
      <n-space style="display: flex; justify-content: space-between">
        <span></span>
        <n-button v-if="isSuperAdmin" round type="info" @click="showCreateAgreementModal">
          Create Agreement</n-button
        >
      </n-space>
      <n-table :striped="true">
        <thead>
          <tr>
            <th>ID</th>
            <th>DOCUMENT NAME</th>
            <th>VERSION</th>
            <th>DESCRIPTION</th>
            <th>DOCUMENT LINK</th>
            <th>PUBLISHED DATE</th>
            <th v-if="isSuperAdmin">ACTIVE</th>
            <th v-else>STATUS</th>
            <th v-if="isSuperAdmin">ACTION</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in list" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.document_name }}</td>
            <td>{{ item.version }}</td>
            <td>{{ item.description }}</td>
            <td>
              <n-popover trigger="hover">
                <template #trigger>
                  <n-button
                    type="info"
                    @click="urlFunction(item.document_link)"
                    style="border-radius: 25px"
                  >
                    View
                  </n-button>
                </template>
                <span>Read the Agreement carefully before accepting</span>
              </n-popover></td
            >
            <td>{{ $filters.dateFormat(item.published_at) }}</td>
            <td v-if="isSuperAdmin">
              <n-switch
                v-model:value="item.is_active"
                @change="handleSwitchChange(item)"
                :checked-value="1"
                :unchecked-value="0"
            /></td>
            <td v-else>
              <n-tag v-if="item.status === 'Accepted'" round :bordered="false" type="success">
                {{ item.status }}
                <template #icon>
                  <n-icon :component="CheckCircleFilled" />
                </template>
              </n-tag>
              <n-space>
                <n-tag
                  v-if="item.merchant_agreement_id === null"
                  round
                  :bordered="false"
                  type="warning"
                >
                  Pending
                  <template #icon>
                    <n-icon :component="WarningFilled" />
                  </template>
                </n-tag>
                <n-popconfirm
                  v-if="item.merchant_agreement_id === null"
                  @positive-click="handlePositiveClick(item.id)"
                >
                  <template #trigger>
                    <n-button round type="success">Accept</n-button>
                  </template>
                  Please make sure to read the document link before accepting!
                </n-popconfirm>
              </n-space>
            </td>
            <td v-if="isSuperAdmin"
              ><n-dropdown
                @click="actionOperation(item)"
                :onSelect="selectedAction"
                trigger="click"
                :options="moreOptions"
              >
                <n-button size="small" :circle="true">
                  <n-icon>
                    <more-outlined />
                  </n-icon>
                </n-button> </n-dropdown
            ></td>
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

    <n-modal style="width: 50%" v-model:show="showCreateNewAgreement" preset="dialog">
      <n-space :vertical="true">
        <create-new-agreement @created="getNewAgreementData" />
      </n-space>
    </n-modal>
    <n-modal v-model:show="showEditModal" preset="dialog">
      <template #header>
        <div>Update Agreement</div>
      </template>
      <n-space :vertical="true">
        <edit-agreement
          :id="selectedId"
          @updated="
            getList();
            showEditModal = false;
          "
        />
      </n-space>
    </n-modal>
  </n-card>
</template>

<script lang="ts" setup>
  import { userPagination } from '@/hooks/userPagination';
  import {
    MoreOutlined,
    EditOutlined,
    DeleteOutlined,
    CheckCircleFilled,
    WarningFilled,
  } from '@vicons/antd';
  import {
    agreementList,
    deleteAgreement,
    merchantAgreementAccept,
    updateAgreement,
  } from '@/api/agreement';
  import { NIcon, useDialog, useMessage } from 'naive-ui';
  import { Component, h, ref } from 'vue';
  import { useUserStore } from '@/store/modules/user';
  import CreateNewAgreement from '@/components/Agreement/CreateNewAgreement.vue';
  import { ResultEnum } from '@/enums/httpEnum';
  import EditAgreement from '@/components/Agreement/EditAgreement.vue';

  const showEditModal = ref(false);
  const dialog = useDialog();
  const showCreateNewAgreement = ref(false);
  const selectedAgreementId = ref(null);
  const userStore = useUserStore();
  const isSuperAdmin = ref(false);
  const message = useMessage();
  const loading = ref(false);
  const selectedOption: any = ref(null);
  const selectedId = ref(null);
  const { list, page, pageSizes, itemCount, pageSize, params }: any = userPagination(agreementList);
  const getList = () => {
    agreementList({ ...params.value, page: page.value, pageSize: pageSize.value }).then(
      ({ result }) => {
        list.value = result.data;
        itemCount.value = result.meta.total;
      }
    );
  };
  checkUserRole();
  getList();

  function acceptAgreement(agreement_id) {
    const data = {
      agreement_id: agreement_id,
      status: 'Accepted',
    };
    message.loading('Please wait...');
    loading.value = true;
    merchantAgreementAccept(data).then(({ result }) => {
      window['$message'].success(result.message);
      loading.value = false;
      getList();
    });
  }

  function urlFunction(url) {
    window.open(url);
  }
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

  const selectedAction = (key) => {
    selectedOption.value = key;
  };

  const actionOperation = (item) => {
    if (selectedOption.value === 'edit') {
      showEditModal.value = true;
      selectedId.value = item.id;
    } else if (selectedOption.value === 'delete') {
      selectedId.value = item.id;
      confirmationDialog();
    }
  };

  function deleteOperation() {
    const Loading = window['$loading'] || null;
    Loading.start();
    deleteAgreement(selectedId.value)
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
    selectedId.value = null;
    selectedOption.value = null;
  }

  function checkUserRole() {
    let i = 0;
    let roles = userStore.getRoles;
    while (i < roles.length) {
      if (roles[i] === 'super admin') {
        isSuperAdmin.value = true;
      }
      i++;
    }
  }
  function handleSwitchChange(item) {
    var bool;
    if (item.is_active === 0) {
      bool = false;
    } else {
      bool = true;
    }
    if (isSuperAdmin.value) {
      selectedAgreementId.value = item.id;
      const data = ref({
        is_active: bool,
      });
      updateAgreement(selectedAgreementId.value, data.value).then(({ result }) => {
        window['$message'].success(result.message);
      });
    }
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

  function showCreateAgreementModal() {
    showCreateNewAgreement.value = true;
  }
  function getNewAgreementData() {
    showCreateNewAgreement.value = false;
    getList();
  }

  function handlePositiveClick(id) {
    acceptAgreement(id);
  }
</script>
