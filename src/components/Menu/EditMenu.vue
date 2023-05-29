<template>
  <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules" size="small">
    <n-grid cols="2 s:1 m:2 l:3 xl:3" responsive="screen">
      <n-grid-item>
        <n-form-item
          style="margin-left: 5px; margin-right: 5px; padding-top: 24px"
          label="Title"
          path="meta.title"
        >
          <n-input v-model:value="formValue.meta.title" placeholder="Title" />
        </n-form-item>
      </n-grid-item>
      <n-grid-item>
        <n-form-item
          style="margin-left: 5px; margin-right: 5px; padding-top: 24px"
          label="Name"
          path="name"
        >
          <n-input v-model:value="formValue.name" placeholder="Name" />
        </n-form-item>
      </n-grid-item>
      <n-grid-item>
        <n-form-item
          style="margin-left: 5px; margin-right: 5px; padding-top: 24px"
          label="Path"
          path="path"
        >
          <n-input v-model:value="formValue.path" placeholder="Path" />
        </n-form-item>
      </n-grid-item>
      <n-grid-item>
        <n-form-item
          style="margin-left: 5px; margin-right: 5px; padding-top: 24px"
          label="Parent Menu"
        >
          <menu-selector v-model:value="formValue.parent_id" label-field="title" value-field="id" />
        </n-form-item>
      </n-grid-item>
      <n-grid-item>
        <n-form-item
          style="margin-left: 5px; margin-right: 5px; padding-top: 24px"
          label="Description"
        >
          <n-input v-model:value="formValue.description" placeholder="Description" />
        </n-form-item>
      </n-grid-item>
      <n-grid-item>
        <n-form-item
          style="margin-left: 5px; margin-right: 5px; padding-top: 24px"
          label="Redirect"
        >
          <n-input v-model:value="formValue.redirect" placeholder="Redirect" />
        </n-form-item>
      </n-grid-item>
      <n-grid-item>
        <n-form-item
          style="margin-left: 5px; margin-right: 5px; padding-top: 24px"
          label="Component"
          path="component"
        >
          <n-input v-model:value="formValue.component" placeholder="Component" />
        </n-form-item>
      </n-grid-item>
      <n-grid-item>
        <n-form-item
          style="margin-left: 5px; margin-right: 5px; padding-top: 24px"
          label="Roles"
          path="roles"
        >
          <role-selector
            v-model:value="formValue.roles"
            label-field="name"
            value-field="name"
            :tag="true"
          />
        </n-form-item>
      </n-grid-item>
      <n-grid-item>
        <n-form-item
          style="margin-left: 5px; margin-right: 5px; padding-top: 24px"
          label="Permissions"
        >
          <permission-selector
            v-model:value="formValue.permissions"
            label-field="name"
            value-field="name"
            :tag="true"
          />
        </n-form-item>
      </n-grid-item>
      <n-grid-item>
        <n-form-item style="margin-left: 5px; margin-right: 5px; padding-top: 24px" label="Icon">
          <n-input v-model:value="formValue.meta.icon" placeholder="Icon" />
        </n-form-item>
      </n-grid-item>
      <n-grid-item>
        <n-form-item
          style="margin-left: 5px; margin-right: 5px; padding-top: 24px"
          label="Sort"
          path="sort"
        >
          <n-input-number type="number" v-model:value="formValue.meta.sort" placeholder="Sort" />
        </n-form-item>
      </n-grid-item>
      <n-grid-item>
        <n-space justify="space-evenly">
          <n-form-item
            style="margin-left: 5px; margin-right: 5px; padding-top: 24px"
            label="Status"
          >
            <n-switch v-model:value="formValue.status" :checked-value="1" :unchecked-value="0" />
          </n-form-item>
          <n-form-item
            style="margin-left: 5px; margin-right: 5px; padding-top: 24px"
            label="Hidden"
          >
            <n-switch v-model:value="formValue.meta.hidden" />
          </n-form-item>
        </n-space>
      </n-grid-item>
    </n-grid>
    <n-space style="display: flex; justify-self: center" :vertical="true">
      <n-form-item style="display: flex; justify-content: center">
        <n-button :round="true" type="info" style="alignment: center" @click="handleValidateClick">
          Save
        </n-button>
      </n-form-item>
    </n-space>
  </n-form>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { FormInst } from 'naive-ui';
  import { getMenuById, updateMenu } from '@/api/system/menu';
  import RoleSelector from '@/components/Role/RoleSelector.vue';
  import PermissionSelector from '@/components/Permission/PermissionSelector.vue';
  import MenuSelector from '@/components/Menu/MenuSelector.vue';

  const formValue: any = ref({ meta: {} });
  const formRef = ref<FormInst | null>(null);
  const emits = defineEmits(['updated']);
  const props = defineProps({
    id: {
      type: Number,
    },
  });
  const rules = ref({
    name: {
      required: true,
      message: 'Please enter name',
      trigger: 'blur',
    },
    path: {
      required: true,
      message: 'Please enter path',
      trigger: 'blur',
    },
    meta: {
      title: {
        required: true,
        message: 'Please enter title',
        trigger: 'blur',
      },
    },
  });
  const handleValidateClick = (e: MouseEvent) => {
    e.preventDefault();
    formRef.value?.validate((errors) => {
      if (!errors) {
        const data = formValue.value;
        delete data['id'];
        delete data['created_at'];
        delete data['updated_at'];

        if (!formValue.value.parent_id) {
          delete data['parent_id'];
        }
        // if (!formValue.value.parent_menu) {
        delete data.parent_menu;
        // }
        if (data['roles'] === null) {
          delete data['roles'];
        }
        if (data['permissions'] === null) {
          delete data['permissions'];
        }
        if (!formValue.value.redirect) {
          delete data['redirect'];
        }
        if (!formValue.value.description) {
          delete data['description'];
        }
        if (formValue.value.status) {
          data['status'] = true;
        } else {
          data['status'] = false;
        }

        updateMenu(props.id, data).then(({ result }) => {
          window['$message'].success(result.message);
          emits('updated', result.data);
        });
      } else {
        window['$message'].error('Please fill out required fields');
      }
    });
  };

  getMenuById(props.id).then(({ result }) => {
    if (result.data.meta && result.data.meta.sort) {
      result.data.meta.sort = result.data.meta.sort.toString();
    }
    formValue.value = result.data;
    formValue.value.permissions = formValue.value.permissions.map((v) => v.name);
    formValue.value.roles = formValue.value.roles.map((v) => v.name);
  });
</script>
