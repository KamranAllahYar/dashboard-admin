<template>
  <div style="width: 100%; display: flex; justify-content: space-between">
    <n-h1>Company Details</n-h1>
    <n-button :round="true" type="info" @click="actionOperation()" v-if="isEdit">Edit</n-button>
    <div v-else>
      <n-button :round="true" type="error" @click="actionOperation()" style="margin-right: 10px"
        >Cancel</n-button
      >
      <n-button :round="true" type="success" @click="updateOperation()">Save</n-button>
    </div>
  </div>

  <n-form ref="formRef" :label-width="80" :model="formValue" size="small">
    <n-grid :x-gap="12" :y-gap="8" :cols="2">
      <n-grid-item :span="1">
        <n-h6 class="strong" prefix="bar"> Name </n-h6>
        <n-p v-if="isEdit">{{ formValue.name || '---' }}</n-p>
        <n-input
          v-else
          type="text"
          size="small"
          placeholder="Name"
          v-model:value="formValue.name"
        />
      </n-grid-item>
      <n-grid-item :span="1">
        <n-h6 class="strong" prefix="bar"> Logo </n-h6>
        <n-image v-if="isEdit" width="40" :src="formValue.logo_url" />
        <div v-else>
          <n-upload
            ref="upload"
            name="file"
            action="/api/media/upload_image_s3"
            :default-upload="false"
            :with-credentials="true"
            :multiple="false"
            :max="1"
            @change="handleChange"
            @finish="onResponse"
          >
            <n-button>Select File</n-button>
          </n-upload>
        </div>
      </n-grid-item>
    </n-grid>
    <n-grid :x-gap="12" :y-gap="8" :cols="1" style="margin-top: 10px">
      <n-grid-item :span="1" v-for="(item, key) in information" :key="key">
        <n-h6 class="strong" prefix="bar"> {{ key }} </n-h6>
        <n-ol v-if="!Array.isArray(item)">
          <n-li>{{ item || '---' }}</n-li>
        </n-ol>
        <template v-else>
          <n-p>
            <n-ol>
              <n-li v-for="(childItem, index) in item" :key="index">{{ childItem }}</n-li>
            </n-ol>
          </n-p>
        </template>
      </n-grid-item>
    </n-grid>
  </n-form>
</template>
<script lang="ts" setup>
  import {
    getCompanyProfile,
    getCompanyProfileById,
    updateCompanyProfile,
    updateCompanyProfileById,
  } from '@/api/settings/companyprofile';
  import type { UploadInst, UploadFileInfo } from 'naive-ui';

  import { ref } from 'vue';
  const fileListLength = ref(0);
  const upload = ref<UploadInst | null>(null);
  const formValue: any = ref({});
  const isEdit = ref(true);
  const isImageSelected = ref(false);
  const information: any = ref({});
  let oldFormValues = '';
  const props = defineProps({
    id: {
      type: [Number, String],
    },
  });

  const handleChange = (data: { fileList: UploadFileInfo[] }) => {
    fileListLength.value = data.fileList.length;
    isImageSelected.value = fileListLength.value == 1;
  };

  const handleClick = () => {
    upload.value?.submit();
  };

  const actionOperation = () => {
    isEdit.value = !isEdit.value;
    if (isEdit.value) {
      formValue.value = JSON.parse(oldFormValues);
    }
  };
  const updateOperation = () => {
    const data = formValue.value;
    delete data['user_id'];
    delete data['id'];
    delete data['logo_url'];
    delete data['created_at'];
    delete data['updated_at'];
    if (isImageSelected.value) {
      handleClick();
    } else {
      if (props.id) {
        updateCompanyProfileById(props.id, data).then(({ result }) => {
          window['$message'].success(result.message);
          isEdit.value = true;
          isImageSelected.value = false;
          getCompanyProfileById(props.id).then(({ result }) => {
            formValue.value = result.data;
            oldFormValues = JSON.stringify(result.data);
          });
        });
      } else {
        updateCompanyProfile(data).then(({ result }) => {
          window['$message'].success(result.message);
          isEdit.value = true;
          isImageSelected.value = false;
          getCompanyProfile().then(({ result }) => {
            formValue.value = result.data;
            oldFormValues = JSON.stringify(result.data);
          });
        });
      }
    }
  };
  if (props.id) {
    getCompanyProfileById(props.id).then(({ result }) => {
      formValue.value = result.data;
      oldFormValues = JSON.stringify(result.data);
      information.value = result.data.information;
    });
  } else {
    getCompanyProfile().then(({ result }) => {
      formValue.value = result.data;
      oldFormValues = JSON.stringify(result.data);
      information.value = formValue.value.information;
    });
  }
  const onResponse = (options: { file: UploadFileInfo; event?: any }) => {
    const response = JSON.parse(options.event?.target?.response);
    const data = formValue.value;
    data['logo'] = response.data.path;
    delete data['user_id'];
    delete data['id'];
    delete data['logo_url'];
    delete data['created_at'];
    delete data['updated_at'];
    if (props.id) {
      updateCompanyProfileById(props.id, data).then(({ result }) => {
        window['$message'].success(result.message);
        isEdit.value = true;
        isImageSelected.value = false;
        getCompanyProfileById(props.id).then(({ result }) => {
          formValue.value = result.data;
          oldFormValues = JSON.stringify(result.data);
        });
      });
    } else {
      updateCompanyProfile(data).then(({ result }) => {
        window['$message'].success(result.message);
        isEdit.value = true;
        isImageSelected.value = false;
        getCompanyProfile().then(({ result }) => {
          formValue.value = result.data;
          oldFormValues = JSON.stringify(result.data);
        });
      });
    }
  };
</script>

<style lang="less" scoped>
  .strong {
    font-weight: bold;
  }
</style>
