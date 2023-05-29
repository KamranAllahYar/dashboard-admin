<template>
  <n-select
    v-model:value="selectedCity"
    filterable
    placeholder="Please select a city"
    label-field="name"
    value-field="name"
    :loading="citiesLoading"
    :options="filteredCities"
    @search="filterWeshipCities"
  />
</template>
<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { useWeshipCities } from '@/hooks/useWeshipCities';

  const selectedCity: any = ref();
  const { filterWeshipCities, filteredCities, citiesLoading } = useWeshipCities();
  const emits = defineEmits(['citySelected']);
  watch(
    () => selectedCity.value,
    () => {
      emits('citySelected', selectedCity.value);
    }
  );
</script>
