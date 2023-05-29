<template>
  <n-space :vertical="true">
    <n-divider />
    <n-form ref="changePasswordFormRef" :model="changePasswordForm" :rules="rules">
      <n-grid cols="2 s:1 m:2 l:2 xl:2" responsive="screen">
        <n-grid-item style="margin: 10px">
          <n-form-item path="email" label="Email" class="formInputLabelStyle">
            <n-input round size="medium" v-model:value="changePasswordForm.email" placeholder="" />
          </n-form-item>
        </n-grid-item>
        <n-grid-item style="margin: 10px">
          <n-form-item path="current_password" label="Current Password" class="formInputLabelStyle">
            <n-input
              round
              size="medium"
              type="password"
              show-password-on="click"
              v-model:value="changePasswordForm.current_password"
              placeholder=""
            />
          </n-form-item>
        </n-grid-item>
        <n-grid-item style="margin: 10px">
          <n-form-item path="new_password" label="New Password" class="formInputLabelStyle">
            <n-input
              round
              size="medium"
              type="password"
              show-password-on="click"
              @input="handlePasswordInput"
              v-model:value="changePasswordForm.new_password"
              placeholder=""
            />
          </n-form-item>
        </n-grid-item>
        <n-grid-item style="margin: 10px">
          <n-form-item
            first
            ref="rPasswordFormItemRef"
            path="re_enter_password"
            label="Re-Enter Password"
            class="formInputLabelStyle"
          >
            <n-input
              round
              size="medium"
              show-password-on="click"
              :disabled="!changePasswordForm.new_password"
              type="password"
              v-model:value="changePasswordForm.re_enter_password"
              placeholder=""
            />
          </n-form-item>
        </n-grid-item>
      </n-grid>
    </n-form>
    <n-space justify="center">
      <n-button round>Cancel</n-button>
      <n-popconfirm @positive-click="saveChanges">
        <template #trigger>
          <n-button round type="info" :loading="saveLoading"> Save Changes </n-button>
        </template>
        Are you sure, you want to change the password?
      </n-popconfirm>
    </n-space>
  </n-space>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { FormInst, FormItemInst, FormItemRule, FormRules, useMessage } from 'naive-ui';
  import { changePassword } from '@/api/auth';
  import { TABS_ROUTES } from '@/store/mutation-types';
  import { useUserStore } from '@/store/modules/user';
  import { useRoute, useRouter } from 'vue-router';
  const changePasswordFormRef = ref<FormInst | null>(null);
  const changePasswordForm: any = ref({});
  const saveLoading = ref(false);
  const userStore = useUserStore();
  const message = useMessage();
  const router = useRouter();
  const route = useRoute();
  const rules: FormRules = {
    email: {
      required: true,
      trigger: ['blur', 'input'],
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('Email is required');
        } else if (
          !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value
          )
        ) {
          return new Error('Email is not valid');
        }
        return true;
      },
    },
    current_password: [
      {
        required: true,
        message: 'Current Password is required',
      },
    ],
    new_password: [
      {
        required: true,
        message: 'New Password is required',
      },
    ],
    re_enter_password: [
      {
        required: true,
        message: 'Re-entered password is required',
        trigger: ['input', 'blur'],
      },
      {
        validator: validatePasswordStartWith,
        message: 'Password is not same as re-entered password!',
        trigger: 'input',
      },
      {
        validator: validatePasswordSame,
        message: 'Password is not same as re-entered password!',
        trigger: ['blur', 'password-input'],
      },
    ],
  };
  const rPasswordFormItemRef = ref<FormItemInst | null>(null);

  function validatePasswordStartWith(rule: FormItemRule, value: string): boolean {
    return (
      !!changePasswordForm.value.new_password &&
      changePasswordForm.value.new_password.startsWith(value) &&
      changePasswordForm.value.new_password.length >= value.length
    );
  }

  function validatePasswordSame(rule: FormItemRule, value: string): boolean {
    return value === changePasswordForm.value.new_password;
  }
  function handlePasswordInput() {
    if (changePasswordForm.value.confirm_password) {
      rPasswordFormItemRef.value?.validate({ trigger: 'password-input' });
    }
  }

  async function saveChanges() {
    let hasError = false;
    await changePasswordFormRef.value?.validate((error) => {
      if (error) {
        hasError = true;
        // window['$message'].error('Please fill out required fields');
        return;
      }
    });
    if (!hasError) {
      saveLoading.value = true;
      const data = {
        oldPassword: changePasswordForm.value.current_password,
        password: changePasswordForm.value.new_password,
        confirmPassword: changePasswordForm.value.re_enter_password,
      };
      changePassword(data)
        .then(({ result }) => {
          window['$message'].success(result.message);

          saveLoading.value = false;
          userStore.logout().then(() => {
            message.success('Successfully logged out');
            // REMOVE TAB
            localStorage.removeItem(TABS_ROUTES);
            router
              .replace({
                name: 'Login',
                query: {
                  redirect: route.fullPath,
                },
              })
              .finally(() => location.reload());
          });
        })
        .catch(({ result }) => {
          saveLoading.value = false;
          window['$message'].error(result.message);
        });
    }
  }
</script>
<style scoped>
  .formInputLabelStyle {
    font-weight: bold;
  }
</style>
