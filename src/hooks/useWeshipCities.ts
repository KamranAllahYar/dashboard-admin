import { ref } from 'vue';
import { getWeshipcitiesList } from '@/api/settings/addresses';

/**
 * @description Paginated Data
 */
let timer: any = null;
export function useWeshipCities(tag = false) {
  const citiesLoading = ref(false);
  const filteredCities: any = ref([]);
  const filterWeshipCities = (query = '') => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      citiesLoading.value = true;
      getWeshipcitiesList({ city: query, pageSize: 100 })
        .then(({ result }) => {
          filteredCities.value = result;
          if (tag && query) {
            if (!filteredCities.value.some((city) => city.name === query)) {
              filteredCities.value.unshift({ id: 0, name: query });
            }
          }
          citiesLoading.value = false;
        })
        .catch(() => {
          citiesLoading.value = false;
        });
    }, 500);
  };
  filterWeshipCities();
  return { filterWeshipCities, filteredCities, citiesLoading };
}
