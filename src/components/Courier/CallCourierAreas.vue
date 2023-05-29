<template>
  <n-space vertical>
    <p>Select Area</p>
    <n-select
      style="margin-top: 5px"
      :filterable="true"
      placeholder="Search Area"
      v-model:value="formValue.area_id"
      size="medium"
      label-field="AreaName"
      value-field="AreaID"
      :on-focus="getAreas"
      :loading="areaLoading"
      :options="areaOptions"
    />
    <n-space justify="center">
      <n-button type="success" style="margin-top: 20px" @click="registerLocation"
        >Register Location</n-button
      >
    </n-space>
  </n-space>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { areaListbyCallCourier, registerPickupLocationWithCourier } from '@/api/courier';

  const areaOptions: any = ref({});
  const areaLoading: any = ref(false);
  const props = defineProps({
    city: {
      type: String,
    },
    merchantCourierId: {
      type: [Number, String],
    },
    addressId: {
      type: [Number, String],
    },
  });
  function getAreas() {
    areaLoading.value = true;
    console.log('hello ', props.city);
    areaListbyCallCourier({ city: props.city })
      .then(({ result }) => {
        areaOptions.value = result.data;
        areaLoading.value = false;
      })
      .catch(() => {
        areaLoading.value = false;
      });
  }
  const formValue: any = ref({
    area_id: null,
  });
  function registerLocation() {
    const data: any = ref({
      merchant_courier_id: null,
      pickup_location_id: null,
    });
    // Finding index of the car with modal "X5"
    const searchIndex = areaOptions.value.findIndex(
      (area) => area.AreaID === formValue.value.area_id
    );
    data.value.merchant_courier_id = props.merchantCourierId;
    data.value.pickup_location_id = props.addressId;
    data.value.AreaID = areaOptions.value[searchIndex].AreaID;
    data.value.AreaName = areaOptions.value[searchIndex].AreaName;
    data.value.CityID = areaOptions.value[searchIndex].CityID;
    data.value.EnteredBy = areaOptions.value[searchIndex].EnteredBy;
    data.value.EnteredOn = areaOptions.value[searchIndex].EnteredOn;
    data.value.EditedBy = areaOptions.value[searchIndex].EditedBy;
    data.value.EditedOn = areaOptions.value[searchIndex].EditedOn;
    data.value.Locked = areaOptions.value[searchIndex].Locked;
    registerPickupLocationWithCourier(data.value).then(({ result }) => {
      window['$message'].success(result.message);
      // stepThree.value.merchant_courier_id = null;
      // stepThree.value.courier_name = null;
    });
  }
</script>
