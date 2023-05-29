import { ref } from 'vue';
import { courierList } from '@/api/courier';

/**
 * @description Paginated Data
 */
let timer: any = null;
export function useCouriers(tag = false) {
  const couriersLoading = ref(false);
  const filteredCouriers: any = ref([]);
  const filterCouriers = (query = '') => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      couriersLoading.value = true;
      courierList({ courier: query, pageSize: 100 })
        .then(({ result }) => {
          filteredCouriers.value = result.data;
          if (tag && query) {
            if (!filteredCouriers.value.some((courier) => courier.name === query)) {
              filteredCouriers.value.unshift({ id: 0, name: query });
            }
          }
          couriersLoading.value = false;
        })
        .catch(() => {
          couriersLoading.value = false;
        });
    }, 500);
  };
  filterCouriers();
  return { filterCouriers, filteredCouriers, couriersLoading };
}
