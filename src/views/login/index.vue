<template>
  <div class="view-account">
    <div class="view-account-header"></div>
    <div class="view-account-container">
      <div class="view-account-top">
        <div class="view-account-top-logo">
          <n-h1 style="font-weight: 600; letter-spacing: 0.2px; color: #2d8cf0">Weship</n-h1>
        </div>
      </div>
      <div class="view-account-form">
        <n-form
          ref="formRef"
          label-placement="left"
          size="large"
          :model="formInline"
          :rules="rules"
        >
          <n-form-item path="username">
            <n-input v-model:value="formInline.email" placeholder="Email">
              <template #prefix>
                <n-icon size="18" color="#808695">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M344 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z"
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="32"
                    />
                    <path
                      d="M256 304c-87 0-175.3 48-191.64 138.6C62.39 453.52 68.57 464 80 464h352c11.44 0 17.62-10.48 15.65-21.4C431.3 352 343 304 256 304z"
                      fill="none"
                      stroke="currentColor"
                      stroke-miterlimit="10"
                      stroke-width="32"
                    />
                  </svg>
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item path="password">
            <n-input
              v-model:value="formInline.password"
              type="password"
              show-password-on="click"
              placeholder="Password"
            >
              <template #prefix>
                <n-icon size="18" color="#808695">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M336 208v-95a80 80 0 0 0-160 0v95"
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="32"
                    />
                    <rect
                      x="96"
                      y="208"
                      width="320"
                      height="272"
                      rx="48"
                      ry="48"
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="32"
                    />
                  </svg>
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item class="default-color">
            <div class="flex justify-between">
              <div class="flex-initial">
                <n-checkbox v-model:checked="autoLogin">Remember Me</n-checkbox>
              </div>
            </div>
          </n-form-item>
          <n-form-item>
            <div>
              <n-button text @click="forgotPassword = !forgotPassword">Forgot Password?</n-button>
            </div>
          </n-form-item>
          <n-form-item>
            <n-button type="primary" @click="handleSubmit" size="large" :loading="loading" block>
              Login
            </n-button>
          </n-form-item>
          <n-form-item class="default-color">
            <div class="flex view-account-other">
              <div class="flex-initial">
                <span>Other Logins</span>
              </div>

              <div class="flex-initial mx-2">
                <a href="javascript:">
                  <n-icon size="24" color="#2d8cf0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 512 512"
                    >
                      <path
                        d="M480 257.35c0-123.7-100.3-224-224-224s-224 100.3-224 224c0 111.8 81.9 204.47 189 221.29V322.12h-56.89v-64.77H221V208c0-56.13 33.45-87.16 84.61-87.16c24.51 0 50.15 4.38 50.15 4.38v55.13H327.5c-27.81 0-36.51 17.26-36.51 35v42h62.12l-9.92 64.77H291v156.54c107.1-16.81 189-109.48 189-221.31z"
                        fill-rule="evenodd"
                        fill="currentColor"
                      />
                    </svg>
                  </n-icon>
                </a>
              </div>
              <div class="flex-initial" style="margin-left: auto">
                <a href="https://weship.pk/signup">Register an Account</a>
              </div>
            </div>
          </n-form-item>
        </n-form>
      </div>
    </div>

    <n-modal
      v-model:show="forgotPassword"
      preset="dialog"
      style="width: 40%"
      :mask-closable="false"
    >
      <template #header
        ><div style="font-weight: bold; font-size: 24px"> Reset password </div></template
      >
      <n-space :vertical="true">
        <ForgotPassword @passwordReset="forgotPassword = false" />
      </n-space>
    </n-modal>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useUserStore } from '@/store/modules/user';
  import { useMessage } from 'naive-ui';
  import { ResultEnum } from '@/enums/httpEnum';
  import { PageEnum } from '@/enums/pageEnum';

  interface FormState {
    email: string;
    password: string;
  }

  const formRef = ref();
  const message = useMessage();
  const loading = ref(false);
  const autoLogin = ref(true);
  const forgotPassword = ref(false);
  const LOGIN_NAME = PageEnum.BASE_LOGIN_NAME;

  const formInline = reactive({
    email: '',
    password: '',
    isCaptcha: true,
  });

  const rules = {
    email: { required: true, message: 'Email is required', trigger: 'blur' },
    password: { required: true, message: 'Password is required', trigger: 'blur' },
  };

  const userStore = useUserStore();

  const router = useRouter();
  const route = useRoute();

  const handleSubmit = (e) => {
    e.preventDefault();
    formRef.value.validate(async (errors) => {
      if (!errors) {
        const { email, password } = formInline;
        message.loading('Logging in...');
        loading.value = true;

        const params: FormState = {
          email,
          password,
        };

        try {
          const { code, message: msg }: any = await userStore.login(params);
          message.destroyAll();
          if (code == ResultEnum.SUCCESS) {
            const toPath = decodeURIComponent((route.query?.redirect || '/') as string);
            message.success('Successful login');
            if (route.name === LOGIN_NAME) {
              await router.replace('/home');
            } else await router.replace(toPath);
          } else {
            message.info(msg || 'Login error');
          }
        } finally {
          loading.value = false;
        }
      } else {
        message.error('Please fill in the complete information');
      }
    });
  };
</script>

<style lang="less" scoped>
  .view-account {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: auto;

    &-container {
      flex: 1;
      padding: 32px 12px;
      max-width: 384px;
      min-width: 320px;
      margin: 0 auto;
    }

    &-top {
      padding: 32px 0;
      text-align: center;

      &-desc {
        font-size: 14px;
        color: #808695;
      }
    }

    &-other {
      width: 100%;
    }

    .default-color {
      color: #515a6e;

      .ant-checkbox-wrapper {
        color: #515a6e;
      }
    }
  }

  @media (min-width: 768px) {
    .view-account {
      background-image: url('../../assets/images/login.svg');
      background-repeat: no-repeat;
      background-position: 50%;
      background-size: 100%;
    }

    .page-account-container {
      padding: 32px 0 24px 0;
    }
  }
</style>
