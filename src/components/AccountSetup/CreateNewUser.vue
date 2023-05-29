<template>
  <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules" size="small">
    <n-grid :x-gap="12" :y-gap="8" cols="2 xs:2 s:2 m:2 l:3" responsive="screen">
      <n-grid-item span="3 xs:1 s:1 m:2 l:1">
        <n-form-item style="padding-top: 24px" label="First Name" path="first_name">
          <n-input v-model:value="formValue.first_name" placeholder="First Name" />
        </n-form-item>
        <n-form-item style="padding-top: 24px" label="Password" path="password">
          <n-input v-model:value="formValue.password" placeholder="Password" />
        </n-form-item>
      </n-grid-item>
      <n-grid-item span="3 xs:1 s:1 m:2 l:1">
        <n-form-item style="padding-top: 24px" label="Last Name" path="last_name">
          <n-input v-model:value="formValue.last_name" placeholder="Last Name" />
        </n-form-item>
        <div style="margin-top: 21px; display: flex">
          Roles <div style="color: #ff0000; margin-left: 5px"> *</div>
        </div>
        <n-select
          style="margin-top: 5px"
          :multiple="true"
          :filterable="true"
          placeholder="Search Roles"
          v-model:value="formValue.role_ids"
          :clearable="true"
          :remote="true"
          :clear-filter-after-select="false"
          size="small"
          label-field="name"
          value-field="id"
          :loading="rolesLoading"
          :options="filteredRoles"
          @search="filterRoles"
        />
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
          Create</n-button
        >
      </n-form-item>
    </n-space>
  </n-form>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { FormInst } from 'naive-ui';
  import { createUser } from '@/api/users';
  import { useRoles } from '@/hooks/acl/useRoles';
  const formValue: any = ref({});
  const formRef = ref<FormInst | null>(null);
  const emits = defineEmits(['created']);
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
    password: {
      required: true,
      message: 'Please enter password',
      trigger: 'blur',
    },
  });
  const { filterRoles, filteredRoles, rolesLoading } = useRoles();
  const handleValidateClick = (e: MouseEvent) => {
    e.preventDefault();
    formRef.value?.validate((errors) => {
      if (!errors) {
        // if (props.id !== null) {
        //   console.log('id found', props.id);
        //   const data = formValue.value;
        //   data['admin_id'] = props.id;
        //   console.log(data);
        // }
        const data = formValue.value;
        console.log(data);
        createUser(data).then(({ result }) => {
          window['$message'].success(result.message);
          emits('created', result.data);
        });
      } else {
        console.log(errors);
        window['$message'].error('Please fill out required fields');
      }
    });
  };
</script>

<style lang="less" scoped></style>
