import { ref } from 'vue';
import { permissionList } from '@/api/acl/permissions';

/**
 * @description Paginated Data
 */
let timer: any = null;
export function usePermissions(tag = false) {
  const permissionsLoading = ref(false);
  const filteredPermissions: any = ref([]);
  const filterPermissions = (query = '') => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      permissionsLoading.value = true;
      permissionList({ name: query, pageSize: 1000 })
        .then(({ result }) => {
          filteredPermissions.value = result.data;
          if (tag && query) {
            if (!filteredPermissions.value.some((permission) => permission.name === query)) {
              filteredPermissions.value.unshift({ id: 0, name: query });
            }
          }
          permissionsLoading.value = false;
        })
        .catch(() => {
          permissionsLoading.value = false;
        });
    }, 500);
  };
  filterPermissions();
  return { filterPermissions, filteredPermissions, permissionsLoading };
}
