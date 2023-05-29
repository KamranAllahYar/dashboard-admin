<template>
  <n-card>
    <n-space :vertical="true">
      <n-grid cols="4 s:1 m:2 l:4 xl:4" responsive="screen">
        <n-grid-item span="1">
          <n-h1>Order Statuses</n-h1>
        </n-grid-item>
        <n-grid-item span="3">
          <n-card>
            <n-space :vertical="true">
              <n-space v-if="isSuperAdmin">
                <n-h5 style="font-weight: bold; margin-top: 5px">Select Client</n-h5>
                <n-select
                  style="width: 300px"
                  v-model:value="selectedAdmin.merchant_id"
                  :options="adminList"
                  label-field="company_name"
                  value-field="id"
                />
              </n-space>
              <n-space justify="space-between">
                <n-h5 style="font-weight: bold">Upload CSV file</n-h5>
                <n-button
                  type="info"
                  @click="handleClick"
                  :loading="isLoading"
                  round
                  style="width: 100px"
                  >Save
                </n-button>
              </n-space>
              <n-upload
                ref="upload"
                directory-dnd
                action="/api/media"
                :data="{
                  folder: 'order_statuses',
                }"
                :max="1"
                :default-upload="false"
                @change="handleChange"
                @finish="onResponse"
              >
                <n-upload-dragger>
                  <div style="margin-bottom: 12px">
                    <n-icon size="48" :depth="3">
                      <archive-icon />
                    </n-icon>
                  </div>
                  <n-text style="font-size: 16px">
                    Click or drag a file to this area to upload
                  </n-text>
                  <n-p depth="3" style="margin: 8px 0 0 0">
                    Strictly prohibit from uploading sensitive information. For example, your bank
                    card PIN or your credit card expiry date.
                  </n-p>
                </n-upload-dragger>
              </n-upload>
            </n-space>
          </n-card>
        </n-grid-item>
      </n-grid>
    </n-space>
  </n-card>
</template>

<script lang="ts" setup>
  import { userList } from '@/api/users';
  import { ref } from 'vue';
  import { NButton, NIcon, UploadFileInfo, UploadInst } from 'naive-ui';
  import { uploadCSVBulkOrderStatuses } from '@/api/order';
  import { useUserStore } from '@/store/modules/user';

  const userStore = useUserStore();
  const isSuperAdmin = ref(false);
  const isLoading = ref(false);
  const upload = ref<UploadInst | null>(null);
  const selectedAdmin: any = ref({
    merchant_id: null,
    file: {
      url: '',
      path: '',
    },
  });
  const fileListLength = ref(0);
  const isFileSelected = ref(false);
  const adminList: any = ref({});
  checkUserRole();
  const adminParams: any = ref({
    roles: [],
  });
  adminParams.value.roles = ['admin'];
  if (isSuperAdmin.value) {
    userList(adminParams.value).then(({ result }) => {
      adminList.value = result.data;
    });
  }

  const handleChange = (data: { fileList: UploadFileInfo[] }) => {
    fileListLength.value = data.fileList.length;
    isFileSelected.value = fileListLength.value == 1;
  };
  const onResponse = (options: { file: UploadFileInfo; event?: any }) => {
    const response = JSON.parse(options.event?.target?.response);
    const data = selectedAdmin.value;
    if (!isSuperAdmin.value) {
      delete data.merchant_id;
    }
    data.file.path = response.data.path;
    data.file.url = response.data.url;

    uploadCSVBulkOrderStatuses(data)
      .then(({ result }) => {
        window['$message'].success(result.message);
        isLoading.value = false;
      })
      .catch(({ result }) => {
        window['$message'].error(result.message);
        isLoading.value = false;
      });
  };
  const handleClick = () => {
    if (isSuperAdmin.value) {
      if (selectedAdmin.value.merchant_id) {
        if (isFileSelected.value) {
          isLoading.value = true;
          upload.value?.submit();
        } else {
          window['$message'].error('Please upload CSV file');
        }
      } else {
        window['$message'].error('Please select client');
      }
    } else {
      if (isFileSelected.value) {
        isLoading.value = true;
        upload.value?.submit();
      } else {
        window['$message'].error('Please upload CSV file');
      }
    }
  };
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
</script>
