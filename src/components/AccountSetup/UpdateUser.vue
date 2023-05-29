<template>
  <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules" size="small">
    <n-grid :x-gap="12" :y-gap="8" cols="2 xs:2 s:2 m:2 l:3" responsive="screen">
      <n-grid-item span="3 xs:1 s:1 m:2 l:1">
        <n-form-item style="padding-top: 24px" label="First Name" path="first_name">
          <n-input v-model:value="formValue.first_name" placeholder="First Name" />
        </n-form-item>
        <n-form-item style="padding-top: 24px" label="Update Password">
          <n-input v-model:value="formValue.password" placeholder="Update Password" />
        </n-form-item>
      </n-grid-item>
      <n-grid-item span="3 xs:1 s:1 m:2 l:1">
        <n-form-item style="padding-top: 24px" label="Last Name" path="last_name">
          <n-input v-model:value="formValue.last_name" placeholder="Last Name" />
        </n-form-item>
        <n-form-item style="padding-top: 24px" label="Roles">
          <role-selector
            v-model:value="formValue.roles"
            label-field="name"
            value-field="name"
            :tag="true"
          />
        </n-form-item>
      </n-grid-item>
      <n-grid-item span="3 xs:1 s:1 m:2 l:1">
        <n-form-item style="padding-top: 24px" label="Email" path="email">
          <n-input v-model:value="formValue.email" placeholder="Email" />
        </n-form-item>
      </n-grid-item>
    </n-grid>
    <n-space style="flex: 100%; align-items: center" :vertical="true">
      <n-form-item style="align-content: center; justify-content: space-between; alignment: center">
        <n-button round type="info" style="alignment: center" @click="handleValidateClick">
          Save</n-button
        >
      </n-form-item>
    </n-space>
  </n-form>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { FormInst } from 'naive-ui';
  import { getUser, updateUser } from '@/api/users';
  const formValue: any = ref({});
  const formRef = ref<FormInst | null>(null);
  const emits = defineEmits(['updated']);
  const props = defineProps({
    id: {
      type: [Number, String],
    },
  });
  const rules = ref({
    first_name: {
      required: true,
      message: 'Please enter first name',
      trigger: 'blur',
    },
    last_name: {
      required: true,
      message: 'Please enter last name',
      trigger: 'blur',
    },
    email: {
      required: true,
      message: 'Please enter email',
      trigger: 'blur',
    },
  });
  const handleValidateClick = (e: MouseEvent) => {
    e.preventDefault();
    formRef.value?.validate((errors) => {
      if (!errors) {
        const data = formValue.value;
        if (data.roles.length) {
          delete data['id'];
          delete data['parent_user_id'];
          delete data['company'];
          delete data['username'];
          delete data['is_verified'];
          delete data['is_email_verified'];
          delete data['created_at'];
          delete data['updated_at'];
          delete data['permissions'];
          updateUser(props.id, data).then(({ result }) => {
            window['$message'].success(result.message);
            emits('updated', result.data);
          });
        } else {
          window['$message'].error('Please select role');
        }
      } else {
        // console.log(errors);
        window['$message'].error('Please fill out required fields');
      }
    });
  };

  getUser(props.id).then(({ result }) => {
    formValue.value = result.data;
    formValue.value.roles = formValue.value.roles?.map((role) => role.name);
  });
</script>

<style lang="less" scoped></style>
