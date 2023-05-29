<template>
  <n-space :vertical="true">
    <n-card>
      <n-h2 v-if="props.id" style="font-weight: bold; color: rgb(38, 63, 151)">Update Courier</n-h2>
      <n-h2 v-else style="font-weight: bold; color: rgb(38, 63, 151)">Add New Courier</n-h2>
      <n-form
        ref="formRef"
        :model="createFormData"
        :rules="rules"
        size="medium"
        label-placement="top"
      >
        <n-grid :span="24" :x-gap="24">
          <n-form-item-gi :span="10" label="Name" path="name" :label-style="labelStyle">
            <n-input v-model:value="createFormData.name" placeholder="Name" />
          </n-form-item-gi>
          <n-form-item-gi :span="14" label="Status" :label-style="labelStyle">
            <n-switch
              v-model:value="createFormData.is_active"
              :checked-value="1"
              :unchecked-value="0"
              style="font-size: 12px; margin: 0 25px 0 7px"
            >
              <template #checked> Active </template>
              <template #unchecked> Inactive </template>
            </n-switch>
          </n-form-item-gi>
        </n-grid>
      </n-form>
      <div v-for="(item, index) in createFormData.meta_data_parameters" :key="index">
        <n-form
          :ref="
            (el) => {
              itemsRef[index] = el;
            }
          "
          :rules="rules"
          :model="item"
          size="medium"
          label-placement="top"
        >
          <n-grid :span="24" :x-gap="24">
            <n-form-item-gi :span="10" label="Key" path="key" :label-style="labelStyle">
              <n-input v-model:value="item.key" placeholder="Key" />
            </n-form-item-gi>
            <n-form-item-gi :span="10" label="Value" path="value" :label-style="labelStyle">
              <n-input v-model:value="item.value" placeholder="Value" />
            </n-form-item-gi>
            <n-form-item-gi :span="4" style="display: flex; justify-content: center">
              <n-button
                :quaternary="true"
                :circle="true"
                type="error"
                v-if="createFormData.meta_data_parameters.length > 1"
                @click="deleteItem(index)"
              >
                <template #icon>
                  <n-icon><delete-outlined /></n-icon>
                </template>
              </n-button>
            </n-form-item-gi>
          </n-grid>
        </n-form>
      </div>
      <div style="display: flex; justify-content: space-between">
        <n-button :strong="true" :secondary="true" :round="true" type="info" @click="addNewItem()">
          <template #icon>
            <n-icon
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 32 32"
              >
                <path d="M17 15V8h-2v7H8v2h7v7h2v-7h7v-2z" fill="currentColor" /></svg
            ></n-icon>
          </template>
          Add New Element
        </n-button>
        <n-button
          v-if="props.id"
          :strong="true"
          :secondary="true"
          :round="true"
          type="success"
          @click="updateCourier()"
        >
          Update
        </n-button>
        <n-button
          v-else
          :strong="true"
          :secondary="true"
          :round="true"
          type="success"
          @click="createCourier()"
        >
          Create
        </n-button>
      </div>
    </n-card>
  </n-space>
</template>
<script lang="ts" setup>
  import { onMounted, reactive, ref } from 'vue';
  import { DeleteOutlined } from '@vicons/antd';
  import { useCreateCourier } from '@/hooks/courier/useCreateCourier';
  import { FormInst } from 'naive-ui';
  import { courierByID, createNewCourier, updateCourierById } from '@/api/courier';

  const emits = defineEmits(['updated']);
  const { createFormData } = useCreateCourier();
  const itemsRef = ref<FormInst[] | []>([]);
  const labelStyle = reactive({
    color: 'rgb(38, 63, 151)',
    'font-weight': 'bold',
  });
  const newObject = {
    key: '',
    value: '',
  };
  const props = defineProps({
    id: {
      type: Number,
    },
  });
  onMounted(() => {
    if (props.id) {
      courierByID(props.id).then(({ result }) => {
        createFormData.value = result.data;
      });
    }
  });
  // const itemArray = reactive([{ ...newObject }]);
  const rules = {
    name: {
      required: true,
      trigger: ['blur', 'input'],
      message: 'Courier name is required',
    },
    key: {
      required: true,
      trigger: ['blur', 'input'],
      message: 'key is required',
    },
    value: {
      required: true,
      trigger: ['blur', 'input'],
      message: 'value is required',
    },
  };

  function deleteItem(index) {
    createFormData.value.meta_data_parameters.splice(index, 1);
  }
  function addNewItem() {
    createFormData.value.meta_data_parameters.push({ ...newObject });
  }
  function createCourier() {
    createNewCourier(createFormData.value).then(({ result }) => {
      window['$message'].success(result.message);
    });
  }
  function updateCourier() {
    console.log(createFormData.value);
    updateCourierById(props.id, createFormData.value).then(({ result }) => {
      window['$message'].success(result.message);
      emits('updated');
    });
  }
</script>

<style lang="less" scoped></style>
