import { ref } from 'vue';
import { roleList } from '@/api/acl/roles';

/**
 * @description Paginated Data
 */
let timer: any = null;
export function useRoles(tag = false) {
  const rolesLoading = ref(false);
  const filteredRoles: any = ref([]);
  const filterRoles = (query = '') => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      rolesLoading.value = true;
      roleList({ name: query, pageSize: 1000 })
        .then(({ result }) => {
          filteredRoles.value = result.data;
          if (tag && query) {
            if (!filteredRoles.value.some((role) => role.name === query)) {
              filteredRoles.value.unshift({ id: 0, name: query });
            }
          }
          rolesLoading.value = false;
        })
        .catch(() => {
          rolesLoading.value = false;
        });
    }, 500);
  };
  filterRoles();
  return { filterRoles, filteredRoles, rolesLoading };
}
