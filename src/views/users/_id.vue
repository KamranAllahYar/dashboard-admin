<template>
  <n-card>
    <n-space :vertical="true">
      <n-grid cols="2 s:1 m:5 l:5 xl:5" responsive="screen">
        <n-grid-item span="2" style="margin: 10px">
          <n-card style="background-color: rgb(237, 240, 249); border-radius: 10px; margin: 10px">
            <n-space :vertical="true">
              <n-h3>User Details</n-h3>
              <n-form ref="formRef" :inline="true" :model="formValue" :rules="rules" size="small">
                <n-grid cols="2 s:1 m:4 l:4 xl:4" responsive="screen">
                  <n-grid-item span="2">
                    <n-form-item
                      label="First Name"
                      path="first_name"
                      style="margin-left: 5px; margin-right: 5px; padding-top: 24px"
                    >
                      <n-input v-model:value="formValue.first_name" placeholder="First Name" />
                    </n-form-item>
                  </n-grid-item>
                  <n-grid-item span="2">
                    <n-form-item
                      label="Last Name"
                      path="last_name"
                      style="margin-left: 5px; margin-right: 5px; padding-top: 24px"
                    >
                      <n-input v-model:value="formValue.last_name" placeholder="Last Name" />
                    </n-form-item>
                  </n-grid-item>
                  <n-grid-item span="2">
                    <n-form-item
                      label="Email"
                      path="email"
                      style="margin-left: 5px; margin-right: 5px; padding-top: 24px"
                    >
                      <n-input type="email" v-model:value="formValue.email" placeholder="Email" />
                    </n-form-item>
                  </n-grid-item>
                  <n-grid-item span="2">
                    <n-form-item
                      label="Roles"
                      style="margin-left: 5px; margin-right: 5px; padding-top: 24px"
                    >
                      <role-selector
                        v-model:value="formValue.roles"
                        label-field="name"
                        value-field="name"
                        :tag="true"
                      />
                    </n-form-item>
                  </n-grid-item>
                  <n-grid-item span="2">
                    <n-button @click="handleValidateClick" type="success" round> Update </n-button>
                  </n-grid-item>
                </n-grid>
              </n-form>
            </n-space>
          </n-card></n-grid-item
        >
        <n-grid-item v-if="isAdmin" span="3" style="margin: 10px">
          <n-card style="background-color: rgb(237, 240, 249); border-radius: 10px; margin: 10px">
            <n-space :vertical="true">
              <n-h3>Configurations</n-h3>
              <n-form ref="formRef" :label-width="80" :model="finance_data_configs" size="small">
                <n-grid cols="2 s:1 m:4 l:4 xl:4" responsive="screen">
                  <n-grid-item span="2">
                    <n-form-item
                      style="margin-left: 5px; margin-right: 5px; padding-top: 24px"
                      label="Billing Cycle"
                    >
                      <n-input
                        v-model:value="finance_data_configs.billing_cycle.value"
                        placeholder=""
                      />
                    </n-form-item>
                  </n-grid-item>

                  <n-grid-item span="2">
                    <n-form-item
                      style="margin-left: 5px; margin-right: 5px; padding-top: 24px"
                      label="COD Cycle"
                    >
                      <n-input
                        v-model:value="finance_data_configs.cod_cycle.value"
                        placeholder=""
                      />
                    </n-form-item>
                  </n-grid-item>

                  <n-grid-item span="2">
                    <n-form-item
                      style="margin-left: 5px; margin-right: 5px; padding-top: 24px"
                      label="COD Gap"
                    >
                      <n-input v-model:value="finance_data_configs.cod_gap.value" placeholder="" />
                    </n-form-item>
                  </n-grid-item>
                  <n-grid-item span="2">
                    <n-form-item
                      style="margin-left: 5px; margin-right: 5px; padding-top: 24px"
                      label="COD Minus Invoice"
                    >
                      <n-switch
                        v-model:value="finance_data_configs.cod_minus_invoice.value"
                        checked-value="1"
                        unchecked-value="0"
                      />
                    </n-form-item>
                  </n-grid-item>
                  <n-grid-item span="2">
                    <n-button @click="saveMetaData" type="success" round> Update </n-button>
                  </n-grid-item>
                </n-grid>
              </n-form>
            </n-space>
          </n-card>
        </n-grid-item>
      </n-grid>
    </n-space>
  </n-card>
</template>

<script lang="ts" setup>
  import { getUser, updateUser } from '@/api/users';
  import { useRouter } from 'vue-router';
  import { useRoute } from 'vue-router';
  import { ref } from 'vue';
  import { FormInst, useMessage } from 'naive-ui';
  import RoleSelector from '@/components/Role/RoleSelector.vue';
  import { createUserCompanyProfileMetaDataBySuperAdmin } from '@/api/settings/companyprofile';

  const message = useMessage();
  const Loading = window['$loading'] || null;
  const route = useRoute();
  const router = useRouter();
  const isAdmin: any = ref(false);
  const formValue: any = ref({});
  const formRef = ref<FormInst | null>(null);
  const rules = ref({
    first_name: {
      required: true,
      message: 'Please input first name',
      trigger: 'blur',
    },
    last_name: {
      required: true,
      message: 'Please input last name',
      trigger: 'blur',
    },
    email: {
      required: true,
      message: 'Please input email',
      trigger: 'blur',
    },
  });
  const finance_data_configs: any = ref({
    billing_cycle: {
      value: null,
      is_active: true,
    },
    cod_cycle: {
      value: null,
      is_active: true,
    },
    cod_gap: {
      value: null,
      is_active: true,
    },
    cod_minus_invoice: {
      value: null,
      is_active: true,
    },
  });
  getUser(route.params.id).then(({ result }) => {
    for (const key in result.data) {
      if (key != 'data') {
        finance_data_configs.value[key].value = result.data[key].value
          ? result.data[key].value
          : null;
        finance_data_configs.value[key].is_active = result.data[key].is_active == 1;
        finance_data_configs.value[key].id = result.data[key].id;
      }
    }
    formValue.value = result.data.data;
    formValue.value.roles = formValue.value.roles?.map((role) => role.name);
    checkAdminRole();
  });

  function checkAdminRole() {
    isAdmin.value = Object.values(formValue.value.roles).includes('admin');
    // console.log(isAdmin.value);
  }

  const handleValidateClick = (e: MouseEvent) => {
    e.preventDefault();
    formRef.value?.validate((errors) => {
      if (!errors) {
        const userid = formValue.value.id;
        delete formValue.value['id'];
        delete formValue.value['company'];
        delete formValue.value['is_email_verified'];
        delete formValue.value['is_verified'];
        delete formValue.value['permissions'];
        delete formValue.value['parent_user_id'];
        delete formValue.value['updated_at'];
        delete formValue.value['created_at'];
        delete formValue.value['username'];
        updateUser(userid, formValue.value).then(({ result }) => {
          window['$message'].success(result.message);
          router.push({ name: 'UserList' });
        });
      } else {
        console.log(errors);
        window['$message'].error('Invalid');
      }
    });
  };

  function saveMetaData() {
    Loading.start();
    let data: any = [];
    for (const key in finance_data_configs.value) {
      data.push({
        key,
        value: finance_data_configs.value[key].value,
        id: finance_data_configs.value[key].id,
        is_active: finance_data_configs.value[key].is_active,
      });
    }
    createUserCompanyProfileMetaDataBySuperAdmin('finance_data', route.params.id, data)
      .then(({ result }) => {
        window['$message'].success(result.message);
        Loading.finish();
      })
      .catch(({ result }) => {
        message.error(result.message);
        Loading.finish();
      });
  }
</script>

<style lang="less" scoped></style>
