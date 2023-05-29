<template>
  <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules" size="small">
    <n-grid cols="2 s:1 m:2 l:3 xl:3" responsive="screen">
      <n-grid-item>
        <n-form-item
          style="margin-left: 5px; margin-right: 5px; padding-top: 24px"
          label="Store Name"
          path="store_name"
        >
          <n-input v-model:value="formValue.store_name" placeholder="Store Name" />
        </n-form-item>
      </n-grid-item>
      <n-grid-item>
        <n-form-item
          style="margin-left: 5px; margin-right: 5px; padding-top: 24px"
          label="Contact Name"
          path="contact_name"
        >
          <n-input v-model:value="formValue.contact_name" placeholder="Contact Name" />
        </n-form-item>
      </n-grid-item>
      <n-grid-item>
        <n-form-item
          style="margin-left: 5px; margin-right: 5px; padding-top: 24px"
          label="Email"
          path="email"
        >
          <n-input v-model:value="formValue.email" placeholder="Email" />
        </n-form-item>
      </n-grid-item>
      <n-grid-item>
        <n-form-item
          style="margin-left: 5px; margin-right: 5px; padding-top: 24px"
          label="Address 1"
          path="address_line_1"
        >
          <n-input v-model:value="formValue.address_line_1" placeholder="Address 1" />
        </n-form-item>
      </n-grid-item>
      <n-grid-item>
        <n-form-item
          style="margin-left: 5px; margin-right: 5px; padding-top: 24px"
          label="Address 2"
        >
          <n-input v-model:value="formValue.address_line_2" placeholder="Address 2" />
        </n-form-item>
      </n-grid-item>
      <n-grid-item>
        <n-form-item style="margin-left: 5px; margin-right: 5px; padding-top: 24px" label="ZipCode">
          <n-input v-model:value="formValue.zip_code" placeholder="ZipCode" />
        </n-form-item>
      </n-grid-item>
      <n-grid-item>
        <n-form-item
          style="margin-left: 5px; margin-right: 5px; padding-top: 24px"
          label="Phone"
          path="phone"
        >
          <n-input v-model:value="formValue.phone" placeholder="Phone" />
        </n-form-item>
      </n-grid-item>
      <n-grid-item>
        <n-form-item
          style="margin-left: 5px; margin-right: 5px; padding-top: 24px"
          label="Landline"
        >
          <n-input v-model:value="formValue.landline" placeholder="Landline" />
        </n-form-item>
      </n-grid-item>
      <n-grid-item>
        <n-form-item
          style="margin-left: 5px; margin-right: 5px; padding-top: 24px"
          label="City"
          path="city"
        >
          <n-input v-model:value="formValue.city" placeholder="City" />
        </n-form-item>
      </n-grid-item>
      <n-grid-item>
        <n-form-item
          style="margin-left: 5px; margin-right: 5px; padding-top: 24px"
          label="State"
          path="state"
        >
          <n-input v-model:value="formValue.state" placeholder="State" />
        </n-form-item>
      </n-grid-item>
      <n-grid-item>
        <n-form-item
          style="margin-left: 5px; margin-right: 5px; padding-top: 24px"
          label="Country"
          path="country"
        >
          <n-input v-model:value="formValue.country" placeholder="Country" />
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
  import { FormInst, FormItemRule } from 'naive-ui';
  import { getAddressById, updateAddressById } from '@/api/settings/addresses';

  const formValue: any = ref({});
  const formRef = ref<FormInst | null>(null);
  const emits = defineEmits(['updated']);
  const props = defineProps({
    id: {
      type: [Number, String],
    },
  });

  const rules = ref({
    store_name: {
      required: true,
      message: 'Please enter store name',
      trigger: 'blur',
    },
    contact_name: {
      required: true,
      message: 'Please enter contact name',
      trigger: 'blur',
    },
    email: {
      required: true,
      trigger: ['blur', 'input'],
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('Customer email is required');
        } else if (
          !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value
          )
        ) {
          return new Error('Customer email is not valid');
        }
        return true;
      },
    },
    phone: {
      required: true,
      trigger: ['blur', 'input'],
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('Customer Phone is required');
        } else if (!/^\d*$/.test(value)) {
          return new Error('Customer Phone should be an integer');
        } else if (!/^\d{11}$/.test(value)) {
          return new Error('Number must be 11 digits');
        }
        return true;
      },
    },
    address_line_1: {
      required: true,
      message: 'Please enter address line 1',
      trigger: 'blur',
    },
    city: {
      required: true,
      message: 'Please enter city',
      trigger: 'blur',
    },
    state: {
      required: true,
      message: 'Please enter state',
      trigger: 'blur',
    },
    country: {
      required: true,
      message: 'Please enter country',
      trigger: 'blur',
    },
  });

  const handleValidateClick = (e: MouseEvent) => {
    e.preventDefault();
    formRef.value?.validate((errors) => {
      if (!errors) {
        // if (props.id !== null) {
        //   console.log('id found', props.id);
        //   const data = formValue.value;
        //   data['admin_id'] = props.id + '';
        //   console.log(data);
        // }
        const data = formValue.value;
        delete data['id'];
        delete data['user_id'];
        updateAddressById(props.id, data).then(({ result }) => {
          window['$message'].success(result.message);
          emits('updated', result.data);
        });
      } else {
        console.log(errors);
        window['$message'].error('Please fill out required fields');
      }
    });
  };
  console.log(props.id);
  getAddressById(props.id).then(({ result }) => (formValue.value = result.data));
</script>

<style lang="less" scoped></style>
