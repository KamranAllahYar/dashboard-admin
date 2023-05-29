<template>
  <n-space vertical style="margin: 20px">
    <n-space>
      <p>Current Package:</p>
      <p style="font-weight: bold"> {{ props.package }}</p>
    </n-space>
    <n-divider />
    <n-select
      v-model:value="selectedPackage"
      :options="packages"
      placeholder="Please Select Package"
      label-field="name"
      value-field="id"
      style="width: 230px"
    />
    <n-button @click="updatePackage" type="success">Update </n-button>
  </n-space>
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { getAllPackages, updateMerchantPackageStatus } from '@/api/subscriptionpackages';

  const emits = defineEmits(['updated']);
  const packages = ref();
  const selectedPackage = ref();
  const props = defineProps({
    id: {
      type: [Number, String],
    },
    package: {
      type: String,
    },
  });
  onMounted(() => {
    getList();
  });

  function getList() {
    getAllPackages().then(({ result }) => {
      packages.value = result.data;
    });
  }
  function updatePackage() {
    if (selectedPackage.value) {
      const data = {
        merchantId: props.id,
        subscritionPackageId: selectedPackage.value,
      };
      updateMerchantPackageStatus(data).then(({ result }) => {
        if (result.status) {
          emits('updated');
          window['$message'].success(result.message);
        } else {
          window['$message'].error(result.message);
        }
      });
    } else {
      window['$message'].error('Please select Package');
    }
  }
</script>
