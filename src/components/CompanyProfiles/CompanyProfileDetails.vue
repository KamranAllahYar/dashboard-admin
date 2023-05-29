<template>
  <div>
    <div style="width: 100%; display: flex; justify-content: space-between">
      <n-h1>Company Details</n-h1>
    </div>

    <n-form ref="formRef" :label-width="80" :model="formValue" size="small">
      <n-grid :x-gap="12" :y-gap="8" :cols="2">
        <n-grid-item :span="1">
          <n-h6 class="strong" prefix="bar"> Name </n-h6>
          <n-p>{{ formValue.name || '---' }}</n-p>
        </n-grid-item>
        <n-grid-item :span="1">
          <n-h6 class="strong" prefix="bar"> Logo </n-h6>
          <n-image width="40" :src="formValue.logo_url" />
        </n-grid-item>
      </n-grid>
      <n-grid :x-gap="12" :y-gap="8" :cols="1" style="margin-top: 10px">
        <n-grid-item :span="1" v-for="(item, key) in formValue.information" :key="key">
          <n-h6 class="strong" prefix="bar"> {{ key }} </n-h6>
          <n-ol v-if="!Array.isArray(item)">
            <n-li>{{ item || '---' }}</n-li>
          </n-ol>
          <template v-else>
            <n-p>
              <n-ol>
                <n-li v-for="(childItem, index) in item" :key="index">{{ childItem }}</n-li>
              </n-ol>
            </n-p>
          </template>
        </n-grid-item>
      </n-grid>
    </n-form>
  </div>
</template>
<script lang="ts" setup>
  import { getCompanyProfileById } from '@/api/settings/companyprofile';
  import { ref } from 'vue';
  const formValue: any = ref({});
  const props = defineProps({
    id: {
      type: [Number, String],
    },
  });

  if (props.id) {
    getCompanyProfileById(props.id).then(({ result }) => {
      formValue.value = result.data;
    });
  }
</script>

<style lang="less" scoped>
  .strong {
    font-weight: bold;
  }
</style>
