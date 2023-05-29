<template>
  <div>
    <n-space justify="space-between">
      <n-h6 style="font-weight: bold; color: rgb(38, 63, 151); margin-top: 20px">
        Select Pickup location
      </n-h6>
    </n-space>

    <n-space v-if="addresses.length" vertical>
      <n-radio-group
        v-model:value="selectedAddress"
        name="address"
        style="width: 100%; padding-right: 20px"
      >
        <n-card
          v-for="item in addresses"
          :key="item"
          style="padding: 1px; margin: 10px; border-radius: 10px; border-width: 2px"
        >
          <n-space>
            <n-radio :key="item.channel_location_id" :value="item" />
            <n-space :vertical="true">
              <div style="font-weight: bold; font-size: 13px; color: rgb(38, 63, 151)">
                {{ item.contact_name }} - {{ item.store_name }}
              </div>
              <div class="fontSize" style="color: rgb(38, 63, 151); line-height: 10px">
                ID - {{ item.id }}
              </div>
              <div class="fontSize" style="color: rgb(38, 63, 151); line-height: 10px">
                {{ item.address_line_1 }}
              </div>
              <div class="fontSize" style="color: rgb(38, 63, 151); line-height: 10px">
                {{ item.city }} {{ item.state }}
              </div>
              <div class="fontSize" style="color: rgb(38, 63, 151); line-height: 10px">
                {{ item.phone }}
              </div>
            </n-space>
          </n-space>
        </n-card>
      </n-radio-group>
      <n-space style="display: flex; justify-content: space-between; margin-top: 10px">
        <span></span>
        <n-button type="info" style="font-weight: bold; border-radius: 10px" @click="saveData">
          Save
        </n-button>
      </n-space>
    </n-space>

    <div v-else style="display: flex; justify-content: center">
      <n-space vertical justify="center">
        <div style="text-align: center; margin: 20px">
          <p>No Pickup location found.</p>
          <p>Please add a new pickup location by clicking on the button below</p>
          <n-button round type="info" style="margin: 20px" @click="goToAddNewAddress">
            Add New Address</n-button
          >
        </div>
      </n-space>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref, watch } from 'vue';
  import { useRouter } from 'vue-router';

  const addresses: any = ref([]);
  const props = defineProps({
    list: {
      type: Array,
    },
    channel_id: {
      type: Number,
    },
    merchant_channel_id: {
      type: Number,
    },
  });
  const router = useRouter();
  const selectedAddress: any = ref({});
  const emits = defineEmits(['edited']);
  onMounted(() => {
    addresses.value = props.list;
    console.log(addresses.value);
  });
  watch(
    () => props.list,
    () => {
      addresses.value = props.list;
    }
  );
  function saveData() {
    if (selectedAddress.value) {
      emits('edited', selectedAddress.value);
    } else {
      window['$message'].error('Please select pickup location');
    }
  }
  // getAddresses().then(({ result }) => (addresses.value = result.data));
  function goToAddNewAddress() {
    const routeData = router.resolve({
      name: 'CompanyDetails',
    });
    window.open(routeData.href, '_blank');
  }
</script>
