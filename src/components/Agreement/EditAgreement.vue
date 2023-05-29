<template>
  <div>
    <n-space :vertical="true" style="width: 100%">
      <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules" size="small">
        <n-form-item style="padding-top: 24px" label="Document Name" path="document_name">
          <n-input v-model:value="formValue.document_name" placeholder="Document Name" />
        </n-form-item>
        <n-form-item style="padding-top: 24px" label="Version" path="version">
          <n-input v-model:value="formValue.version" placeholder="Version" />
        </n-form-item>
        <n-form-item style="padding-top: 24px" label="Description" path="description">
          <n-input v-model:value="formValue.description" placeholder="Description" />
        </n-form-item>
        <n-form-item style="padding-top: 24px" label="Document Link" path="document_link">
          <n-input v-model:value="formValue.document_link" placeholder="Document Link" />
        </n-form-item>
        <n-space :vertical="true" style="align-items: center">
          <n-form-item style="display: flex; justify-content: center">
            <n-button style="alignment: center" @click="handleValidateClick" round type="info">
              Update</n-button
            >
          </n-form-item>
        </n-space>
      </n-form>
    </n-space>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { FormInst } from 'naive-ui';
  import { updateAgreement } from '@/api/agreement';
  import { getAgreement } from '@/api/agreement';

  const emits = defineEmits(['updated']);

  const formValue: any = ref({});
  const formRef = ref<FormInst | null>(null);
  const props = defineProps({
    id: {
      type: Number,
    },
  });

  getAgreement(props.id).then(({ result }) => (formValue.value = result.data));

  const rules = ref({
    document_name: {
      required: true,
      message: 'Document name required',
      trigger: 'blur',
    },
    version: {
      required: true,
      message: 'Version required',
      trigger: 'blur',
    },
    description: {
      required: true,
      message: 'Description required',
      trigger: 'blur',
    },
    document_link: {
      required: true,
      message: 'Document link required',
      trigger: 'blur',
    },
  });

  const handleValidateClick = (e: MouseEvent) => {
    e.preventDefault();
    formRef.value?.validate((errors) => {
      if (!errors) {
        formValue.value.is_active = true;
        updateAgreement(formValue.value.id, formValue.value).then(({ result }) => {
          window['$message'].success(result.message);
          emits('updated', result.data);
        });
      } else {
        console.log(errors);
        window['$message'].error('Please fill out required fields');
      }
    });
  };
</script>
