<template>
  <n-space vertical>
    <n-card>
      <n-space :vertical="true">
        <n-grid cols="4 s:1 m:2 l:4 xl:4" responsive="screen">
          <n-grid-item span="1">
            <n-h1> Upload File </n-h1>
          </n-grid-item>
          <n-grid-item span="3">
            <n-card>
              <n-space :vertical="true">
                <n-space>
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
                  <n-space>
                    <n-h5 style="font-weight: bold">Upload CSV file</n-h5>
                    <n-button text style="margin-top: 5px" @click="downloadSampleFile">
                      (Download Sample File)
                    </n-button>
                  </n-space>

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
                    folder: 'cod_cycle',
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
    <n-card>
      <n-space vertical>
        <n-h1>COD Remittance </n-h1>
        <super-admin-cod-remittance-table
          :update-list="updateCodRemittanceList"
          @table-updated="updateCodRemittanceList = false"
        />
      </n-space>
    </n-card>
    <n-card>
      <n-space vertical>
        <n-h1>Invoice </n-h1>
        <super-admin-invoice-table
          :update-list="updateInvoiceList"
          @table-updated="updateInvoiceList = false"
        />
      </n-space>
    </n-card>
  </n-space>
</template>

<script lang="ts" setup>
  import { userList } from '@/api/users';
  import { ref } from 'vue';
  import { NButton, NIcon, UploadFileInfo, UploadInst } from 'naive-ui';

  import { uploadCodRemittanceCsvFile } from '@/api/finance/codcycle';
  import SuperAdminCodRemittanceTable from '@/components/Finance/CodRemittance/SuperAdminCodRemittanceTable.vue';
  import { uploadInvoiceCsvFile } from '@/api/finance/invoicecycle';

  const isLoading = ref(false);
  const updateCodRemittanceList = ref(false);
  const updateInvoiceList = ref(false);
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

  const adminParams: any = ref({
    roles: [],
  });
  adminParams.value.roles = ['admin'];
  userList(adminParams.value).then(({ result }) => {
    adminList.value = result.data;
  });
  const handleChange = (data: { fileList: UploadFileInfo[] }) => {
    fileListLength.value = data.fileList.length;
    isFileSelected.value = fileListLength.value == 1;
  };
  const onResponse = (options: { file: UploadFileInfo; event?: any }) => {
    const response = JSON.parse(options.event?.target?.response);
    const data = selectedAdmin.value;
    data.file.path = response.data.path;
    data.file.url = response.data.url;

    uploadCodRemittanceCsvFile(data)
      .then(() => {
        uploadInvoiceCsvFile(data)
          .then(({ result }) => {
            window['$message'].success(result.message);
            isLoading.value = false;
            updateCodRemittanceList.value = true;
            updateInvoiceList.value = true;
          })
          .catch(({ result }) => {
            window['$message'].error(result.message);
            isLoading.value = false;
          });
      })
      .catch(({ result }) => {
        window['$message'].error(result.message);
        isLoading.value = false;
      });
  };
  const handleClick = () => {
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
  };

  function downloadSampleFile() {
    window.open(
      'https://s3.me-south-1.amazonaws.com/clickycrmdev/weship/cod_cycle/2023/2023-01-25/1674639095622-Shipment-Charges-Sheet1.csv'
    );
  }
</script>
