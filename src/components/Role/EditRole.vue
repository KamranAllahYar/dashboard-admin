<template>
  <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules" size="small">
    <n-form-item style="padding-top: 24px" label="Role Name" path="name">
      <n-input v-model:value="formValue.name" placeholder="Edit Role Name" />
    </n-form-item>
    <n-form-item style="padding-top: 24px" label="Permissions" path="permissions">
      <permission-selector
        v-model:value="formValue.permissions"
        label-field="name"
        value-field="id"
        :tag="true"
      />
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
  import { getRole, updateRole } from '@/api/acl/roles';

  const formValue: any = ref({});
  const formRef = ref<FormInst | null>(null);
  const emits = defineEmits(['updated']);
  const props = defineProps({
    id: {
      type: Number,
    },
  });
  getRole(props.id).then(({ result }) => {
    formValue.value = result.data;
    formValue.value.permissions = formValue.value.permissions.map((v) => v.id);
  });

  const rules = ref({
    name: {
      required: true,
      message: 'Please Role input name',
      trigger: 'blur',
    },
  });

  const handleValidateClick = (e: MouseEvent) => {
    e.preventDefault();
    formRef.value?.validate((errors) => {
      if (!errors) {
        const { name, permissions } = formValue.value;
        updateRole(formValue.value.id, { name, permissions }).then(({ result }) => {
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
