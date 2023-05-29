<template>
  <div>
    <n-card style="border-radius: 12px">
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
              <th>Company Logo</th>
              <th style="text-align: center">Company Name</th>
              <th style="text-align: center">Email</th>
              <th style="text-align: center">Package</th>
              <th style="text-align: center">Package type</th>
              <th style="text-align: center">Profile Completion</th>
              <th style="text-align: center">Registered Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in list" :key="item.id">
              <td>{{ item.id }}</td>
              <td style="justify-content: center">
                <n-avatar
                  round
                  style="align-self: center; display: flex"
                  :src="item.company_logo"
                />
              </td>
              <td style="text-align: center">{{ item.company_name }}</td>
              <td style="text-align: center">{{ item.email }}</td>
              <td style="text-align: center">{{ item.subscription_name }}</td>
              <td style="text-align: center">{{ item.subscription_type }}</td>
              <td>
                <n-progress
                  v-if="item.profile_completion < 100"
                  type="line"
                  :indicator-placement="'inside'"
                  :percentage="item.profile_completion"
                  processing
                />
                <n-progress
                  v-else
                  type="line"
                  :indicator-placement="'inside'"
                  :percentage="item.profile_completion"
                  status="success"
                />
              </td>
              <td style="text-align: center">{{ $filters.dateFormat(item.company_create) }}</td>
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
    <n-modal style="width: 70%" v-model:show="showEditModal" preset="dialog">
      <template #header> </template>
      <n-space :vertical="true">
        <company-profile-details :id="selectedId" />
      </n-space>
    </n-modal>
    <n-modal style="width: 70%" v-model:show="showKYCDetailModal" preset="dialog">
      <template #header> </template>
      <n-space :vertical="true">
        <kyc-details :id="selectedId" />
      </n-space>
    </n-modal>
    <n-modal style="width: 40%" v-model:show="showSubscribeMerchantPackageModal" preset="dialog">
      <template #header> Assign Merchant Package </template>
      <n-space :vertical="true">
        <subscribe-merchant-package
          :id="selectedId"
          :package="merchantPackage"
          @updated="
            getList();
            showSubscribeMerchantPackageModal = false;
          "
        />
      </n-space>
    </n-modal>

    <n-button
      type="primary"
      size="large"
      :circle="true"
      style="position: fixed; bottom: 24px; right: 24px"
      @click="buttonAction"
    >
      <template #icon>
        <n-icon>
          <plus-outlined />
        </n-icon>
      </template>
    </n-button>
  </div>
</template>

<script lang="ts" setup>
  import { userList, deleteUser } from '@/api/users';
  import { ResultEnum } from '@/enums/httpEnum';
  import { userPagination } from '@/hooks/userPagination';
  import { ref, onMounted, h } from 'vue';
  import { useDialog, useMessage } from 'naive-ui';
  import type { Component } from 'vue';
  import { NIcon, NPagination } from 'naive-ui';
  import {
    MoreOutlined,
    DeleteOutlined,
    AlignCenterOutlined,
    PlusOutlined,
    CodepenOutlined,
  } from '@vicons/antd';
  import CompanyProfileDetails from '@/components/CompanyProfiles/CompanyProfileDetails.vue';
  import SubscribeMerchantPackage from '@/components/SubscriptionPackages/SubscribeMerchantPackage.vue';

  const dialog = useDialog();
  const showEditModal = ref(false);
  const showKYCDetailModal = ref(false);
  const showSubscribeMerchantPackageModal = ref(false);
  const selectedOption: any = ref(null);
  const selectedId = ref(null);
  const merchantPackage = ref(null);
  const message = useMessage();
  const { getList, list, page, pageSizes, itemCount, pageSize, params }: any =
    userPagination(userList);
  params.value.roles = ['admin'];

  const renderIcon = (icon: Component) => {
    return () => {
      return h(NIcon, null, {
        default: () => h(icon),
      });
    };
  };

  function buttonAction() {
    window.open('https://weship.omnisell.pk/signup', '_blank');
  }

  const moreOptionsTwo = ref([
    {
      label: 'Subscribe Package',
      key: 'subscribe_package',
      icon: renderIcon(CodepenOutlined),
    },
    {
      label: 'Details',
      key: 'details',
      icon: renderIcon(AlignCenterOutlined),
    },
    {
      label: 'KYC Details',
      key: 'kyc_details',
      icon: renderIcon(AlignCenterOutlined),
    },
    {
      label: 'Delete',
      key: 'delete',
      icon: renderIcon(DeleteOutlined),
    },
  ]);
  const moreOptions = ref([
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
    if (selectedOption.value === 'delete') {
      selectedId.value = item.id;
      confirmationDialog();
    } else if (selectedOption.value === 'kyc_details') {
      showKYCDetailModal.value = true;
      selectedId.value = item.id;
    } else if (selectedOption.value === 'details') {
      showEditModal.value = true;
      selectedId.value = item.id;
    } else if (selectedOption.value === 'subscribe_package') {
      showSubscribeMerchantPackageModal.value = true;
      selectedId.value = item.id;
      merchantPackage.value = item.subscription_name;
    }
    selectedOption.value = null;
  };

  const selectedAction = (key) => {
    selectedOption.value = key;
  };
  const fetchList = () => {
    getList(params.value);
  };
  onMounted(() => {
    getList();
  });
</script>

<style lang="less" scoped></style>
