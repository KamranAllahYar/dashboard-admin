<template>
  <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules" size="small">
    <n-form-item style="padding-top: 24px" label="Edit Permission Name" path="name">
      <n-input v-model:value="formValue.name" placeholder="Edit Permission Name" />
    </n-form-item>
    <n-space :vertical="true" style="align-items: center">
      <n-form-item>
        <n-button style="alignment: center" @click="handleValidateClick"> Save</n-button>
      </n-form-item>
    </n-space>
  </n-form>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { FormInst } from 'naive-ui';
  import { updatePermission, getPermission } from '@/api/acl/permissions';

  const formValue: any = ref({});
  const formRef = ref<FormInst | null>(null);
  const emits = defineEmits(['updated']);
  const props = defineProps({
    id: {
      type: Number,
    },
  });
  // console.log(props.id);
  getPermission(props.id).then(({ result }) => (formValue.value = result.data));

  const rules = ref({
    name: {
      required: true,
      message: 'Please Permission input name',
      trigger: 'blur',
    },
  });

  const handleValidateClick = (e: MouseEvent) => {
    e.preventDefault();
    formRef.value?.validate((errors) => {
      if (!errors) {
        const { name } = formValue.value;
        updatePermission(formValue.value.id, { name }).then(({ result }) => {
          window['$message'].success(result.message);
          emits('updated', result.data);
        });
      } else {
        console.log(errors);
        window['$message'].error('Invalid');
      }
    });
  };
</script>

<style lang="less" scoped></style>
