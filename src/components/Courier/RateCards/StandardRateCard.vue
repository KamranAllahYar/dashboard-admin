<template>
  <n-table
    :bordered="false"
    :single-line="false"
    style="width: 100%; word-wrap: break-word; table-layout: fixed"
  >
    <thead>
      <tr>
        <th class="table_row_style" style="font-weight: bold"> Zones</th>
        <th class="table_row_style" style="font-weight: bold"> Flat Rate </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(slab, index) in rateSlabs" :key="index">
        <td style="font-weight: bold" v-if="slab.showZone" :rowspan="slab.spanValue">
          {{ slab.zone }}
        </td>
        <td> Rs.{{ slab.rate }}</td>
      </tr>
    </tbody>
  </n-table>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';

  const props = defineProps({
    rateSlabsArray: {
      type: Array,
    },
  });
  let lastZoneId = null;
  const rateSlabs = computed(() => {
    if (!props.rateSlabsArray) {
      return [];
    }
    return props.rateSlabsArray.map((slab: any) => {
      if (lastZoneId !== slab.zone_id) {
        lastZoneId = slab.zone_id;
        slab.showZone = true;
        slab.spanValue = (props.rateSlabsArray ? props.rateSlabsArray : []).filter(
          (v: any) => v.zone_id === slab.zone_id
        ).length;
      } else {
        slab.showZone = false;
        slab.spanValue = 0;
      }
      return slab;
    });
  });
</script>
