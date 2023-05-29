<template>
  <n-card>
    <n-space vertical>
      <n-space justify="space-between">
        <span></span>
        <n-button strong type="success" @click="showCreateNewPackageModal">
          Create New Package
        </n-button>
      </n-space>
      <n-table :bordered="false" :single-line="false">
        <thead>
          <tr>
            <th style="font-weight: bold">ID</th>
            <th style="font-weight: bold">Code</th>
            <th style="font-weight: bold">Name</th>
            <th style="font-weight: bold">Description</th>
            <th style="font-weight: bold">Type</th>
            <th style="font-weight: bold">Subscription Type</th>
            <th style="font-weight: bold">Subscription Value</th>
            <th style="font-weight: bold">Platform Subscription Type</th>
            <th style="font-weight: bold">Platform Subscription Value</th>
            <th style="font-weight: bold">Status</th>
            <th style="font-weight: bold">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in packages" :key="index">
            <td>{{ item.id }}</td>
            <td>{{ item.code }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.description }}</td>
            <td>{{ item.type }}</td>
            <td>{{ item.subscription_type }}</td>
            <td>{{ item.subscription_value }}</td>
            <td>{{ item.platform_subscription_type }}</td>
            <td>{{ item.platform_subscription_value }}</td>
            <td>
              <n-switch
                v-model:value="item.is_active"
                :checked-value="1"
                :unchecked-value="0"
                @change="updateStatus(item)"
              />
            </td>
            <td>
              <n-space>
                <n-button strong secondary circle type="primary" @click="editRow(item)">
                  <template #icon>
                    <n-icon>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                        <path
                          d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 0 0 0-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 0 0 9.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3l-362.7 362.6l-88.9 15.7l15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"
                          fill="currentColor"
                        />
                      </svg>
                    </n-icon>
                  </template>
                </n-button>
                <n-popconfirm @positive-click="handlePositiveClick(item)">
                  <template #trigger>
                    <n-button strong secondary circle type="error">
                      <template #icon>
                        <n-icon>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 1024 1024"
                          >
                            <path
                              d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"
                              fill="currentColor"
                            />
                          </svg>
                        </n-icon>
                      </template>
                    </n-button>
                  </template>
                  Are you sure, you want to delete "{{ item.name }} Package"?
                </n-popconfirm>
              </n-space>
            </td>
          </tr>
        </tbody>
      </n-table>
      <n-modal style="width: 50%" v-model:show="showCreatePackageModal" preset="dialog">
        <template #header>
          <div>Create/Update Package</div>
        </template>
        <n-space :vertical="true">
          <create-package
            :id="selectedRow"
            @created="
              getList();
              showCreatePackageModal = false;
            "
          />
        </n-space>
      </n-modal>
    </n-space>
  </n-card>
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { deletePackage, getAllPackages, updatePackageStatus } from '@/api/subscriptionpackages';
  import CreatePackage from '@/components/SubscriptionPackages/CreatePackage.vue';

  const packages = ref();
  const showCreatePackageModal = ref();
  const selectedRow = ref();
  onMounted(() => {
    getList();
  });
  function getList() {
    getAllPackages().then(({ result }) => {
      packages.value = result.data;
    });
  }
  function editRow(item) {
    selectedRow.value = item.id;
    showCreatePackageModal.value = true;
  }
  function showCreateNewPackageModal() {
    selectedRow.value = null;
    showCreatePackageModal.value = true;
  }
  function deleteItem(item) {
    deletePackage(item.id)
      .then(({ result }) => {
        window['$message'].success(result.message);
        getList();
      })
      .catch(({ result }) => {
        window['$message'].error(result.message);
      });
  }
  function handlePositiveClick(item) {
    deleteItem(item);
  }
  function updateStatus(value) {
    const data = {
      id: value.id,
      is_active: value.is_active,
    };
    updatePackageStatus(data)
      .then(({ result }) => {
        window['$message'].success(result.message);
      })
      .catch(({ result }) => {
        window['$message'].error(result.message);
      });
  }
</script>
