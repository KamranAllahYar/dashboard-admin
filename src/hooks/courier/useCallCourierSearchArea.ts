import { ref } from 'vue';
import { areaListbyCallCourier } from '@/api/courier';

/**
 * @description Paginated Data
 */
let timer: any = null;
export function useAreas(tag = false) {
  const areaLoading = ref(false);
  const filteredAreas: any = ref([]);
  const filterAreas = (query = '') => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      areaLoading.value = true;
      areaListbyCallCourier({ city: query, pageSize: 1000 })
        .then(({ result }) => {
          filteredAreas.value = result.data;
          if (tag && query) {
            if (!filteredAreas.value.some((area) => area.name === query)) {
              filteredAreas.value.unshift({ id: 0, name: query });
            }
          }
          areaLoading.value = false;
        })
        .catch(() => {
          areaLoading.value = false;
        });
    }, 500);
  };
  filterAreas();
  return { filterAreas, filteredAreas, areaLoading };
}
