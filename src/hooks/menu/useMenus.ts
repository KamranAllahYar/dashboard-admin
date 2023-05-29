import { ref } from 'vue';
import { menuList } from '@/api/system/menu';

/**
 * @description Paginated Data
 */
let timer: any = null;
export function useMenus(tag = false) {
  const menusLoading = ref(false);
  const filteredMenus: any = ref([]);
  const filterMenus = (query = '') => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      menusLoading.value = true;
      menuList({ name: query })
        .then(({ result }) => {
          filteredMenus.value = result.data.map((menu) => {
            menu.title = menu.meta.title;
            return menu;
          });
          if (tag && query) {
            if (!filteredMenus.value.some((menu) => menu.name === query)) {
              filteredMenus.value.unshift({ id: 0, name: query });
            }
          }
          menusLoading.value = false;
        })
        .catch(() => {
          menusLoading.value = false;
        });
    }, 500);
  };
  filterMenus();
  return { filterMenus, filteredMenus, menusLoading };
}
