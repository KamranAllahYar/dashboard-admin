<template>
  <n-space vertical style="padding: 20px">
    <n-grid :cols="4">
      <n-gi>
        <n-statistic label="ID" :value="createCityMappingData.id" />
      </n-gi>
      <n-gi>
        <n-statistic label="City Code" :value="createCityMappingData.city_code" />
      </n-gi>
      <n-gi>
        <n-statistic label="City" :value="createCityMappingData.city_name" />
      </n-gi>
      <n-gi>
        <n-statistic label="Common City Name" :value="createCityMappingData.common_city_name" />
      </n-gi>
    </n-grid>
    <n-divider />

    <n-grid :cols="5">
      <n-gi>
        <n-h2>Map City</n-h2>
      </n-gi>
      <n-gi>
        <n-select
          v-model:value="courierCityMapping.state"
          :options="props.states"
          placeholder="Please Select State"
          label-field="label"
          value-field="value"
        />
      </n-gi>
      <n-gi>
        <n-select
          v-model:value="courierCityMapping.zone_id"
          :options="props.zones"
          placeholder="Please Select Zone"
          label-field="title"
          value-field="zone_id"
        />
      </n-gi>
      <n-gi>
        <n-input
          v-model:value="courierCityMapping.zipcode"
          type="text"
          placeholder="City ZipCode"
        />
      </n-gi>
      <n-gi style="padding-left: 20px">
        <n-button type="success" @click="saveMapping">Save</n-button>
      </n-gi>
    </n-grid>
    <n-grid :cols="5" style="margin-top: 20px">
      <n-gi>
        <p style="font-weight: bold">Has COD</p>
        <n-switch
          v-model:value="courierCityMapping.has_cod"
          :checked-value="1"
          :unchecked-value="0"
        />
      </n-gi>
      <n-gi>
        <p style="font-weight: bold">Is Active</p>
        <n-switch
          v-model:value="courierCityMapping.is_active"
          :checked-value="1"
          :unchecked-value="0"
        />
      </n-gi>
      <n-gi>
        <p style="font-weight: bold">Is Pickup</p>
        <n-switch
          v-model:value="courierCityMapping.is_pickup"
          style="justify-content: center"
          :checked-value="1"
          :unchecked-value="0"
        />
      </n-gi>
      <n-gi>
        <p style="font-weight: bold">Is Reverse</p>
        <n-switch
          v-model:value="courierCityMapping.is_reverse"
          :checked-value="1"
          :unchecked-value="0"
        />
      </n-gi>
    </n-grid>
  </n-space>
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { createCourierCityMapping } from '@/api/courier';

  const emits = defineEmits(['created']);
  const saveLoaderRef = ref(false);
  const props = defineProps({
    data: {
      type: Object,
      required: true,
    },
    zones: {
      type: Array,
      required: true,
    },
    states: {
      type: Array,
      required: true,
    },
    courier: {
      type: Number,
      required: true,
    },
  });
  const courierCityMapping = ref({
    courier_id: props.courier,
    zipcode: null,
    state: null,
    zone_id: null,
    is_pickup: true,
    is_reverse: true,
    has_cod: true,
    is_active: true,
  });
  const createCityMappingData: any = ref({});
  onMounted(() => {
    createCityMappingData.value = props.data;
    courierCityMapping.value = {
      courier_id: props.courier,
      zipcode: props.data.courier_zipcode?.zipcode ? props.data.courier_zipcode.zipcode : null,
      state: props.data.courier_zipcode?.state ? props.data.courier_zipcode.state : null,
      zone_id: props.data.courier_zipcode?.zone_id ? props.data.courier_zipcode.zone_id : null,
      is_pickup: props.data.courier_zipcode?.is_pickup ? props.data.courier_zipcode.is_pickup : 1,
      is_reverse: props.data.courier_zipcode?.is_reverse
        ? props.data.courier_zipcode.is_reverse
        : 1,
      has_cod: props.data.courier_zipcode?.has_cod ? props.data.courier_zipcode.has_cod : 1,
      is_active: props.data.courier_zipcode?.is_active ? props.data.courier_zipcode.is_active : 1,
    };
  });

  function saveMapping() {
    if (!courierCityMapping.value.state) {
      window['$message'].error('Please select a state');
    } else if (!courierCityMapping.value.zone_id) {
      window['$message'].error('Please select a zone');
    } else {
      saveLoaderRef.value = true;
      let data = {
        city_ids: [createCityMappingData.value.id],
        zipcode: courierCityMapping.value.zipcode,
        courier_id: courierCityMapping.value.courier_id,
        zone_id: courierCityMapping.value.zone_id,
        is_pickup: courierCityMapping.value.is_pickup,
        is_reverse: courierCityMapping.value.is_reverse,
        has_cod: courierCityMapping.value.has_cod,
        state: courierCityMapping.value.state,
        is_active: courierCityMapping.value.is_active,
      };
      // console.log(data);
      createCourierCityMapping(data).then(({ result }) => {
        saveLoaderRef.value = false;
        if (result.status) {
          emits('created');
          window['$message'].success(result.message);
        }
      });
    }
  }
</script>
