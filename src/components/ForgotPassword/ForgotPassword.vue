<template>
  <n-space :vertical="true">
    <p style="color: rgb(56, 68, 109); font-size: 14px; margin-top: 20px">
      Enter Email Address associated with your WeShip account to receive OTP for resetting the
      password.
    </p>
    <n-divider />
    <n-space v-if="!emailSend" :vertical="true">
      <n-form ref="resetPasswordFormRef" :model="resetPasswordForm" :rules="rules">
        <n-form-item first path="email" label="Email" class="formInputLabelStyle">
          <n-input round size="medium" v-model:value="resetPasswordForm.email" placeholder="" />
        </n-form-item>
      </n-form>
      <n-space justify="center">
        <n-button round type="info" @click="verifyEmail" :loading="getOtpLoading">Get OTP</n-button>
      </n-space>
    </n-space>
    <n-space v-else :vertical="true">
      <n-form ref="verifyPasswordFormRef" :model="verifyOtpPasswordForm" :rules="rules">
        <n-form-item first path="otp" label="OTP" class="formInputLabelStyle">
          <n-input round size="medium" v-model:value="verifyOtpPasswordForm.otp" placeholder="" />
        </n-form-item>
        <n-form-item first path="password" label="Password" class="formInputLabelStyle">
          <n-input
            round
            size="medium"
            v-model:value="verifyOtpPasswordForm.password"
            placeholder=""
          />
        </n-form-item>
      </n-form>
      <n-space justify="center">
        <n-button round type="info" @click="verifyOtp" :loading="verifyOtpLoading">Verify</n-button>
      </n-space>
    </n-space>
  </n-space>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { FormInst, FormItemRule } from 'naive-ui';
  import { resetPassword, verifyOtpPassword } from '@/api/auth';

  const resetPasswordFormRef = ref<FormInst | null>(null);
  const verifyPasswordFormRef = ref<FormInst | null>(null);
  const resetPasswordForm: any = ref({});
  const verifyOtpPasswordForm: any = ref({});
  const emailSend = ref(false);
  const emits = defineEmits(['passwordReset']);
  const getOtpLoading = ref(false);
  const verifyOtpLoading = ref(false);
  const rules = ref({
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
  });

  async function verifyEmail() {
    let hasError = false;
    await resetPasswordFormRef.value?.validate((error) => {
      if (error) {
        hasError = true;
        // window['$message'].error('Please fill out required fields');
        return;
      }
    });
    if (!hasError) {
      getOtpLoading.value = true;
      const data = {
        email: resetPasswordForm.value.email,
      };
      resetPassword(data)
        .then(({ result }) => {
          window['$message'].success(result.message);
          getOtpLoading.value = false;
          emailSend.value = true;
        })
        .catch(({ result }) => {
          window['$message'].error(result.message);
          emailSend.value = false;
          getOtpLoading.value = false;
        });
    }
  }
  async function verifyOtp() {
    let hasError = false;
    await verifyPasswordFormRef.value?.validate((error) => {
      if (error) {
        hasError = true;
        // window['$message'].error('Please fill out required fields');
        return;
      }
    });
    if (!hasError) {
      verifyOtpLoading.value = true;
      const data = {
        otp: verifyOtpPasswordForm.value.otp,
        password: verifyOtpPasswordForm.value.password,
        confirmPassword: verifyOtpPasswordForm.value.password,
      };
      verifyOtpPassword(data)
        .then(({ result }) => {
          window['$message'].success(result.message);
          verifyOtpLoading.value = false;
          emits('passwordReset');
        })
        .catch(({ result }) => {
          window['$message'].error(result.message);
          // emailSend.value = false;
          verifyOtpLoading.value = false;
        });
    }
  }
</script>
<style scoped>
  .formInputLabelStyle {
    font-weight: bold;
  }
</style>
