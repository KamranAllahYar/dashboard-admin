import { reactive, Ref, ref } from 'vue';
import { DataTableColumn } from 'naive-ui';

/**
 * @description Paginated Data
 */
export function useDataTables(api: Function, sortColumns = {}) {
  const list = ref([]);
  const loading = ref(false);
  const params: any = ref({});
  const filterColumn = ref('');
  const filterColumnValue = ref('');
  const pageSizes = ref([10, 20, 30, 40, 50, 100]);
  const sorting = ref({
    column: '',
    orderBy: 'asc',
  });
  const columnsRef: Ref<DataTableColumn[]> = ref([]);
  const paginationReactive = reactive({
    page: 1,
    pageCount: 1,
    pageSize: 20,
    itemCount: 0,
    prefix({ itemCount }) {
      return `Total: ${itemCount}`;
    },
  });

  const getList = () => {
    loading.value = true;
    api({
      ...params.value,
      page: paginationReactive.page,
      pageSize: paginationReactive.pageSize,
      sortColumn: sorting.value.column,
      sortOrder: sorting.value.orderBy,
    })
      .then(({ result }) => {
        loading.value = false;
        list.value = result.data;
        paginationReactive.itemCount = result.meta.total;
      })
      .catch((response) => {
        loading.value = false;
        console.log(response);
      });
  };
  const reactiveSortOrder = reactive(sortColumns);
  function handleSort(sorter) {
    sorting.value.column = sorter.columnKey;
    sorting.value.orderBy = sorter.order === 'ascend' ? 'asc' : 'desc';
    for (const key in reactiveSortOrder) {
      if (key === sorter.columnKey) {
        reactiveSortOrder[sorter.columnKey].sortOrder = !sorter ? false : sorter.order;
      } else {
        reactiveSortOrder[key].sortOrder = false;
      }
    }
    getList();
  }

  function pageChange(currentPage) {
    paginationReactive.page = currentPage;
    getList();
  }
  return {
    getList,
    list,
    pageSizes,
    params,
    filterColumn,
    filterColumnValue,
    loading,
    columnsRef,
    sorting,
    handleSort,
    pageChange,
    paginationReactive,
  };
}
