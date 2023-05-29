<template>
  <div>
    <n-space vertical v-for="item of props.list" :key="item.id" style="position: relative">
      <n-space justify="space-between" @click="markRead(item)">
        <n-space vertical style="gap: 0 0">
          <p style="font-weight: bold">{{ item.title }}</p>
          <p>{{ item.description }}</p>
          <n-button text @click="showModelTable(item)">View Report</n-button>
          <p style="font-size: 11px">{{ filters.dateFormat(item.created_at) }}</p>
        </n-space>
        <n-space vertical justify="center" style="position: absolute; top: 20px; right: 20px">
          <n-space style="align-items: center; height: 100%">
            <n-icon v-if="item.is_read === '0'" size="20" color="red">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 12 12"
              >
                <g fill="none">
                  <path d="M6 1a5 5 0 1 0 0 10A5 5 0 0 0 6 1z" fill="currentColor" />
                </g>
              </svg>
            </n-icon>
          </n-space>
        </n-space>
      </n-space>
      <n-divider style="margin: 0" />
    </n-space>
    <n-modal style="width: 70%" v-model:show="showModal" preset="dialog">
      <template #header>
        <div>Report</div>
      </template>
      <table class="content-table">
        <thead>
          <tr>
            <th v-for="(item, index) in selectedNotification.content.props" :key="index">{{
              item.label
            }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in selectedNotification.content.list" :key="rowIndex">
            <td v-for="(prop, propIndex) in selectedNotification.content.props" :key="propIndex">
              <div v-if="row[prop.key] === 'Success'">
                <n-tag type="success"> {{ row[prop.key] }} </n-tag>
              </div>
              <div v-else-if="row[prop.key] === 'Failed'">
                <n-tag type="error"> {{ row[prop.key] }} </n-tag>
              </div>
              <div v-else>{{ row[prop.key] }}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </n-modal>
  </div>
</template>

<script lang="ts" setup>
  import { getCurrentInstance, ref } from 'vue';
  import { markReadNotification } from '@/api/notifications';
  import { useUserStore } from '@/store/modules/user';

  const userStore = useUserStore();
  const app: any = getCurrentInstance();
  const filters = app.appContext.config.globalProperties.$filters;
  const showModal = ref(false);
  const props = defineProps({
    list: {
      type: Array,
    },
  });
  const selectedNotification: any = ref({});
  function markRead(item) {
    if (item.is_read === '0') {
      markReadNotification(item.id).then(() => {
        userStore.userNotifications();
        userStore.fetchUnReadNotificationCount();
      });
    }
  }
  function showModelTable(item) {
    selectedNotification.value = item;
    showModal.value = true;
  }
</script>

<style scoped>
  .content-table {
    border-collapse: collapse;
    width: 100%;
  }

  .content-table th,
  .content-table td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  .content-table th {
    background-color: #f2f2f2;
    font-weight: bold;
  }
</style>
