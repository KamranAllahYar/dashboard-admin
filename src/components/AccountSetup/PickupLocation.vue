<template>
  <n-space :vertical="true">
    <n-h1>Warehouse / Pickup location details</n-h1>
    <div style="width: 100%; display: flex; justify-content: space-between">
      <n-input
        style="margin-right: 10px"
        type="text"
        size="small"
        v-model:value="params.email"
        @change="fetchList"
        placeholder="Search by store "
      />
      <n-button round type="info" @click="showModal = true">Create Address</n-button>
    </div>

    <n-table :striped="true" style="width: 100%; word-wrap: break-word; table-layout: fixed">
      <thead>
        <tr>
          <th style="width: 100px">ID</th>

          <th>Store Name</th>
          <th>Contact Name</th>
          <th>Address 1</th>
          <th>Phone</th>
          <th>Registered Couriers</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in list" :key="item.id">
          <td style="width: 100px">
            <n-space>
              <template icon v-if="item.default_address === 1">
                <n-icon size="30" color="#0e7a0d">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 32 32"
                  >
                    <path
                      d="M16 7l1.912 3.667l4.088.506l-3 2.753l.6 4.074l-3.6-2.292L12.4 18l.6-4.074l-3-2.753l4.2-.506L16 7z"
                      fill="currentColor"
                    />
                    <path
                      d="M16 30l-8.436-9.949a35.076 35.076 0 0 1-.348-.451A10.889 10.889 0 0 1 5 13a11 11 0 0 1 22 0a10.884 10.884 0 0 1-2.215 6.597l-.001.003s-.3.394-.345.447zM8.812 18.395c.002 0 .234.308.287.374L16 26.908l6.91-8.15c.044-.055.278-.365.279-.366A8.901 8.901 0 0 0 25 13a9 9 0 0 0-18 0a8.905 8.905 0 0 0 1.813 5.395z"
                      fill="currentColor"
                    />
                  </svg>
                </n-icon>
              </template>
              <p style="margin-top: 5px">
                {{ item.id }}
              </p>
            </n-space>
          </td>
          <td>{{ item.store_name }}</td>
          <td>{{ item.contact_name }}</td>
          <td>{{ item.address_line_1 }}</td>
          <td>{{ item.phone }}</td>
          <td>
            <n-space>
              <n-tag
                :bordered="false"
                v-for="(courier, index) in item.registered_with"
                :key="index"
                type="success"
              >
                {{ courier.courier_name.toUpperCase() }}
              </n-tag>
            </n-space></td
          >
          <td>
            <n-dropdown
              @click="actionOperation(item)"
              :onSelect="selectedAction"
              trigger="click"
              :options="moreOptions"
            >
              <n-button size="small" :circle="true">
                <n-icon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 16 16"
                  >
                    <g fill="none">
                      <path
                        d="M8 5a1 1 0 1 1 0-2a1 1 0 0 1 0 2zm0 4a1 1 0 1 1 0-2a1 1 0 0 1 0 2zm-1 3a1 1 0 1 0 2 0a1 1 0 0 0-2 0z"
                        fill="currentColor"
                      />
                    </g>
                  </svg>
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
      <div>Create New Address</div>
    </template>
    <n-space :vertical="true">
      <add-address
        :id="props.id"
        @created="
          getList();
          showModal = false;
        "
      />
    </n-space>
  </n-modal>

  <n-modal style="width: 70%" v-model:show="showEditModal" preset="dialog">
    <template #header>
      <div>Update Address</div>
    </template>
    <n-space :vertical="true">
      <edit-address
        :id="selectedId"
        @updated="
          getList();
          showEditModal = false;
        "
      />
    </n-space>
  </n-modal>

  <n-modal
    style="width: 50%"
    v-model:show="showRegisterCourierWithPickupLocationModal"
    preset="dialog"
  >
    <template #header>
      <div>Register Location With Couriers</div>
    </template>
    <n-space :vertical="true">
      <register-courier-with-pickup-location
        :address-id="selectedId"
        :city="selectedCity"
        :registered-with="registered_with"
        @registered="
          getList();
          showRegisterCourierWithPickupLocationModal = false;
        "
      />
    </n-space>
  </n-modal>
</template>

<script lang="ts" setup>
  import { ResultEnum } from '@/enums/httpEnum';
  import { userPagination } from '@/hooks/userPagination';
  import { ref, onMounted, h } from 'vue';
  import { useRouter } from 'vue-router';
  import { useDialog, useMessage } from 'naive-ui';
  import type { Component } from 'vue';
  import { NIcon, NPagination } from 'naive-ui';
  import { FileDoneOutlined, EditOutlined, DeleteOutlined, PushpinOutlined } from '@vicons/antd';

  import { getAddresses, deleteAddress, defaultAddress } from "@/api/settings/addresses";
  import AddAddress from '@/components/AccountSetup/AddAddress.vue';
  import RegisterCourierWithPickupLocation from '@/components/Courier/RegisterCourierWithPickupLocation.vue';
  import emptyStateImg from '@/assets/images/empty-folder.png';

  const dialog = useDialog();
  const showModal = ref(false);
  const showEditModal = ref(false);
  const showRegisterCourierWithPickupLocationModal = ref(false);
  const selectedOption: any = ref(null);
  const selectedId = ref(null);
  const selectedCity = ref(null);
  const registered_with: any = ref([{}]);
  const router = useRouter();
  const message = useMessage();
  const props = defineProps({
    id: {
      type: [Number, String],
    },
  });
  const { getList, emptyState, list, page, pageSizes, itemCount, pageSize, params }: any =
    userPagination(getAddresses);
  // params.value = {
  //   email: 'hello',
  //   where: ['email'],
  // };
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
      label: 'Default Location',
      key: 'default',
      icon: renderIcon(PushpinOutlined),
    },
    {
      label: 'Register Location with Courier',
      key: 'registercourier',
      icon: renderIcon(FileDoneOutlined),
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
  function makeDefaultLocation() {
    const Loading = window['$loading'] || null;
    Loading.start();
    defaultAddress(selectedId.value)
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
  }

  function deleteOperation() {
    const Loading = window['$loading'] || null;
    Loading.start();
    deleteAddress(selectedId.value)
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
    } else if (selectedOption.value === 'default') {
      selectedId.value = item.id;
      makeDefaultLocation();
    } else if (selectedOption.value === 'details') {
      router.push(`/settings?id=${item.id}`);
    } else if (selectedOption.value === 'registercourier') {
      selectedId.value = item.id;
      selectedCity.value = item.city;
      registered_with.value = item.registered_with;
      showRegisterCourierWithPickupLocationModal.value = true;
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
