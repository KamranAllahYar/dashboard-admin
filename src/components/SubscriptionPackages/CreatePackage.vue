<template>
  <div style="display: flex; align-items: center; justify-content: center">
    <n-form
      ref="formRef"
      :model="createNewPackage"
      :rules="rules"
      label-placement="left"
      require-mark-placement="right-hanging"
      size="medium"
      label-width="auto"
      :style="{ maxWidth: '640px' }"
    >
      <n-form-item label="Name" path="name">
        <n-input v-model:value="createNewPackage.name" placeholder="Package Name" />
      </n-form-item>
      <n-form-item label="Code" path="code">
        <n-input v-model:value="createNewPackage.code" placeholder="Code" />
      </n-form-item>
      <n-form-item label="Description" path="description">
        <n-input
          v-model:value="createNewPackage.description"
          placeholder="Description"
          type="textarea"
          :autosize="{
            minRows: 3,
            maxRows: 5,
          }"
        />
      </n-form-item>
      <n-form-item label="Package Type" path="radioGroupValue">
        <n-radio-group v-model:value="createNewPackage.type" name="radiogroup3">
          <n-space>
            <n-radio value="system"> System </n-radio>
            <n-radio value="custom"> Custom </n-radio>
          </n-space>
        </n-radio-group>
      </n-form-item>
      <n-form-item label="Subscription Type" path="radioGroupValue">
        <n-radio-group v-model:value="createNewPackage.subscription_type" name="radiogroup1">
          <n-space>
            <n-radio value="percentage"> Percentage </n-radio>
            <n-radio value="flat"> Flat </n-radio>
            <n-radio value="no_charge"> No Charge </n-radio>
          </n-space>
        </n-radio-group>
      </n-form-item>
      <n-form-item label="Subscription Value" path="subscription_value">
        <n-input
          v-model:value="createNewPackage.subscription_value"
          placeholder="Subscription Value"
        />
      </n-form-item>
      <n-form-item label="Platform Subscription Type" path="radioGroupValue">
        <n-radio-group
          v-model:value="createNewPackage.platform_subscription_type"
          name="radiogroup2"
        >
          <n-space>
            <n-radio value="percentage"> Percentage </n-radio>
            <n-radio value="flat"> Flat </n-radio>
            <n-radio value="no_charge"> No Charge </n-radio>
          </n-space>
        </n-radio-group>
      </n-form-item>
      <n-form-item label="Platform Subscription Value" path="platform_subscription_value">
        <n-input
          v-model:value="createNewPackage.platform_subscription_value"
          placeholder="Platform Subscription Value"
        />
      </n-form-item>
      <n-form-item label="Package Icon" path="icon">
        <n-space :vertical="true">
          <n-space v-if="isEdit">
            <n-image :src="createNewPackage.icon_url" width="80" />
            <n-button quaternary circle type="warning" @click="editIcon">
              <template #icon>
                <n-icon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 1024 1024"
                  >
                    <path
                      d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 0 0 0-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 0 0 9.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3l-362.7 362.6l-88.9 15.7l15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"
                      fill="currentColor"
                    />
                  </svg>
                </n-icon>
              </template>
            </n-button>
          </n-space>
          <n-space v-else>
            <n-upload
              action="/api/media/upload_image_s3"
              list-type="image-card"
              :max="1"
              @finish="onResponsePackageIconFile"
            >
              Click to Upload
            </n-upload>
            <n-button quaternary circle type="error" @click="editIcon">
              <template #icon>
                <n-icon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 1024 1024"
                  >
                    <path
                      d="M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4l-66.1-.3c-4.4 0-8 3.5-8 8c0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 0 0-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4l66 .3c4.4 0 8-3.5 8-8c0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z"
                      fill="currentColor"
                    />
                    <path
                      d="M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448s448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372s372 166.6 372 372s-166.6 372-372 372z"
                      fill="currentColor"
                    />
                  </svg>
                </n-icon>
              </template>
            </n-button>
          </n-space>
        </n-space>
      </n-form-item>
      <n-form-item label="Status" path="is_active">
        <n-switch
          v-model:value="createNewPackage.is_active"
          :checked-value="1"
          :unchecked-value="0"
        />
      </n-form-item>
      <div style="display: flex; align-items: center; justify-content: center">
        <n-button type="success" @click="postPackage"> Save </n-button>
      </div>
    </n-form>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { UploadFileInfo } from 'naive-ui';
  import { getPackageById, savePackage } from '@/api/subscriptionpackages';

  const emits = defineEmits(['created']);
  const isEdit = ref(false);
  const newIconPath: any = ref();
  const createNewPackage: any = ref({
    name: null,
    code: null,
    description: null,
    is_active: 1,
    type: null,
    icon: null,
    subscription_type: 'percentage',
    subscription_type_value: null,
    platform_subscription_type: 'percentage',
    platform_subscription_value: null,
  });

  const props = defineProps({
    id: {
      type: Number,
    },
  });
  onMounted(() => {
    if (props.id) {
      createNewPackage.value = {};
      getPackageById(props.id)
        .then(({ result }) => {
          isEdit.value = true;
          createNewPackage.value = result.data;
        })
        .catch(({ result }) => {
          window['$message'].error(result.message);
        });
    }
  });

  const rules = {
    name: {
      required: true,
      trigger: ['blur', 'input'],
      message: 'Please input package name',
    },
    icon: {
      required: true,
      trigger: ['blur', 'input'],
      message: 'Please select icon',
    },
    code: {
      required: true,
      trigger: ['blur', 'input'],
      message: 'Please input code',
    },
    subscription_value: {
      required: true,
      trigger: ['blur', 'input'],
      message: 'Please input subscription value',
    },
    platform_subscription_value: {
      required: true,
      trigger: ['blur', 'input'],
      message: 'Please input platform subscription value',
    },
  };
  const onResponsePackageIconFile = (options: { file: UploadFileInfo; event?: any }) => {
    const response = JSON.parse(options.event?.target?.response);
    newIconPath.value = response.data.path;
    // createNewPackage.value.icon = response.data.path;
  };
  function postPackage() {
    if (!isEdit.value) {
      createNewPackage.value.icon = newIconPath.value;
    }
    delete createNewPackage.value.icon_url;
    savePackage(createNewPackage.value)
      .then(({ result }) => {
        if (result.status) {
          emits('created');
          window['$message'].success(result.message);
        } else {
          window['$message'].error(result.message);
        }
      })
      .catch(({ result }) => {
        window['$message'].error(result.message);
      });
  }
  function editIcon() {
    isEdit.value = !isEdit.value;
  }
</script>
