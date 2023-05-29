<template>
  <div>
    <n-card>
      <n-space :vertical="true">
        <n-space justify="space-between">
          <n-space vertical>
            <n-h1 style="font-weight: bold; color: rgb(38, 63, 151)">All Couriers</n-h1>
            <n-radio-group
              v-model:value="params.status"
              default-value="all_couriers"
              :on-update:value="filterList"
            >
              <n-radio-button
                v-for="filter in filters"
                :key="filter.value"
                :value="filter.value"
                :label="filter.label"
              />
            </n-radio-group>
            <n-input
              placeholder="Search Courier"
              v-model:value="params.name"
              @change="getSearchedList"
              style="width: 250px; border-radius: 10px; margin-top: 10px; margin-bottom: 10px"
            >
              <template #suffix>
                <n-icon :component="SearchOutlined" />
              </template>
              1
            </n-input>
          </n-space>
          <img
            :src="merchantPackage.icon_url"
            style="width: 100px; margin-top: 20px; margin-right: 20px"
          />
        </n-space>

        <div v-for="(item, index) in list" :key="item.id">
          <n-card style="border-radius: 10px; border-color: rgb(221, 226, 255)">
            <n-space :vertical="true">
              <n-space style="display: flex; justify-content: space-between">
                <n-space :vertical="true">
                  <div
                    style="
                      font-weight: bold;
                      color: rgb(38, 63, 151);
                      font-size: 14px;
                      display: flex;
                      justify-content: center;
                    "
                    >Courier Name
                  </div>
                  <n-tooltip placement="bottom" trigger="hover">
                    <template #trigger>
                      <div
                        style="
                          color: rgb(126, 143, 204);
                          font-size: 16px;
                          display: flex;
                          justify-content: center;
                        "
                        >{{ item.name }}
                      </div>
                    </template>
                    <span> Courier ID: {{ item.id }} </span>
                  </n-tooltip>
                </n-space>
                <n-space :vertical="true">
                  <div
                    style="
                      font-weight: bold;
                      color: rgb(38, 63, 151);
                      font-size: 14px;
                      display: flex;
                      justify-content: center;
                    "
                    >Model Type
                  </div>
                  <div
                    style="
                      color: rgb(126, 143, 204);
                      font-size: 16px;
                      display: flex;
                      justify-content: center;
                    "
                    >{{ item.type }}
                  </div>
                </n-space>
                <n-space :vertical="true">
                  <div
                    style="
                      font-weight: bold;
                      color: rgb(38, 63, 151);
                      font-size: 14px;
                      display: flex;
                      justify-content: center;
                    "
                    >Serviceable Cities
                  </div>
                  <div
                    v-if="item.name === 'TCS'"
                    style="
                      color: rgb(126, 143, 204);
                      font-size: 16px;
                      display: flex;
                      justify-content: center;
                    "
                    >1000+
                  </div>
                  <div
                    v-else-if="item.name === 'Rider'"
                    style="
                      color: rgb(126, 143, 204);
                      font-size: 16px;
                      display: flex;
                      justify-content: center;
                    "
                    >500+
                  </div>
                  <div
                    v-else-if="item.name === 'Swyft'"
                    style="
                      color: rgb(126, 143, 204);
                      font-size: 16px;
                      display: flex;
                      justify-content: center;
                    "
                    >500+
                  </div>
                  <div
                    v-else-if="item.name === 'PostEx'"
                    style="
                      color: rgb(126, 143, 204);
                      font-size: 16px;
                      display: flex;
                      justify-content: center;
                    "
                    >100+
                  </div>
                </n-space>
                <n-space :vertical="true">
                  <div
                    style="
                      font-weight: bold;
                      color: rgb(38, 63, 151);
                      font-size: 14px;
                      display: flex;
                      justify-content: center;
                    "
                    >Rate Card
                  </div>
                  <div
                    style="
                      color: rgb(25, 139, 251);
                      font-size: 16px;
                      cursor: pointer;
                      display: flex;
                      justify-content: center;
                    "
                    @click="showRate(index)"
                    >View Rate Card
                  </div>
                </n-space>
                <n-space :vertical="true">
                  <div
                    style="
                      font-weight: bold;
                      color: rgb(38, 63, 151);
                      font-size: 14px;
                      display: flex;
                      justify-content: center;
                    "
                    >Status
                  </div>
                  <n-switch
                    style="font-size: 12px; display: flex; justify-content: center"
                    v-model:value="item.is_active"
                    :checked-value="1"
                    @change="updateStatus(item)"
                    :unchecked-value="0"
                  >
                    <template #checked> Active</template>
                    <template #unchecked> Inactive</template>
                  </n-switch>
                </n-space>
                <n-space :vertical="true">
                  <div
                    style="
                      font-weight: bold;
                      color: rgb(38, 63, 151);
                      font-size: 14px;
                      display: flex;
                      justify-content: center;
                    "
                    >Action
                  </div>
                  <n-space>
                    <n-button
                      style="display: flex; justify-content: center"
                      :quaternary="true"
                      :circle="true"
                      type="info"
                      @click="editItem(item)"
                    >
                      <template #icon>
                        <n-icon>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 32 32"
                          >
                            <path d="M2 26h28v2H2z" fill="currentColor" />
                            <path
                              d="M25.4 9c.8-.8.8-2 0-2.8l-3.6-3.6c-.8-.8-2-.8-2.8 0l-15 15V24h6.4l15-15zm-5-5L24 7.6l-3 3L17.4 7l3-3zM6 22v-3.6l10-10l3.6 3.6l-10 10H6z"
                              fill="currentColor"
                            />
                          </svg>
                        </n-icon>
                      </template>
                    </n-button>
                  </n-space>
                </n-space>
              </n-space>
              <n-collapse-transition :show="item.showRateCard">
                <n-card
                  style="border-radius: 10px; border-color: rgb(221, 226, 255); margin-top: 10px"
                >
                  <n-space style="display: flex; justify-content: space-between">
                    <n-h5 style="font-weight: bold; color: rgb(38, 63, 151)">
                      {{ item.name }} ({{ merchantPackage.name }} Package)
                    </n-h5>
                    <n-button
                      :strong="true"
                      :secondary="true"
                      :circle="true"
                      type="error"
                      @click="closeRate(index)"
                    >
                      <template #icon>
                        <n-icon>
                          <close-outlined />
                        </n-icon>
                      </template>
                    </n-button>
                  </n-space>
                  <weight-rate-card
                    v-if="item.rate_card_type === 'weight'"
                    :rate-slabs-array="item.rate_slabs"
                  />
                  <standard-rate-card
                    v-if="item.rate_card_type === 'standard'"
                    :rate-slabs-array="item.rate_slabs"
                  />
                </n-card>
              </n-collapse-transition>
            </n-space>
          </n-card>
        </div>
        <div v-if="emptyState" style="display: flex; justify-content: center; height: 300px">
          <n-space :vertical="true" style="display: flex; justify-content: center; height: 300px">
            <img style="width: 100px; height: 100px" :src="emptyStateImg" />
            <p>No results found</p>
          </n-space>
        </div>
        <n-space style="align-items: center; padding-top: 15px">
          <n-pagination
            v-if="!emptyState"
            v-model:page="page"
            v-model:page-size="pageSize"
            :item-count="itemCount"
            :page-sizes="pageSizes"
            size="small"
            :show-quick-jumper="true"
            :show-size-picker="true"
          />
        </n-space>
      </n-space>
    </n-card>

    <n-modal style="width: 65%" v-model:show="showDialogModal" preset="dialog">
      <template #header></template>
      <n-space :vertical="true">
        <create-new-merchant-courier
          :id="selectedCourierId"
          :name="selectedName"
          @created="
            getList();
            showDialogModal = false;
          "
        />
      </n-space>
    </n-modal>
    <n-modal style="width: 65%" v-model:show="showEditDialogModal" preset="dialog">
      <template #header></template>
      <n-space :vertical="true">
        <UpdateMerchantCourier
          :id="selectedMerchantCourierId"
          :name="selectedName"
          @updated="
            getList();
            showEditDialogModal = false;
          "
        />
      </n-space>
    </n-modal>
  </div>
</template>
<script lang="ts" setup>
  import { SearchOutlined, CloseOutlined } from '@vicons/antd';
  import { onMounted, ref } from 'vue';
  import { userPagination } from '@/hooks/userPagination';
  import { courierList, updateCourier, updateMerchantCourier } from '@/api/courier';
  import { useMessage } from 'naive-ui';
  import CreateNewMerchantCourier from '@/components/Courier/CreateNewMerchantCourier.vue';
  import UpdateMerchantCourier from '@/components/Courier/UpdateMerchantCourier.vue';
  import emptyStateImg from '@/assets/images/empty-folder.png';
  import { useUserStore } from '@/store/modules/user';
  import { getMerchantPackage } from '@/api/subscriptionpackages';
  import WeightRateCard from '@/components/Courier/RateCards/WeightRateCard.vue';

  const rateCard: any = ref('');
  const showDialogModal = ref(false);
  const showEditDialogModal = ref(false);
  const emptyState = ref(false);
  const selectedCourierId = ref(null);
  const selectedMerchantCourierId = ref(null);
  const selectedName = ref(null);
  const message = useMessage();
  const userStore = useUserStore();
  const isSuperAdmin = ref(false);
  const merchantPackage: any = ref({
    name: '',
    icon_url: '',
  });
  const { list, page, pageSizes, itemCount, pageSize, params }: any = userPagination(courierList);
  const getList = () => {
    courierList({ ...params.value, page: page.value, pageSize: pageSize.value }).then(
      ({ result }) => {
        itemCount.value = result.meta.total;
        if (result.meta.total === 0) {
          emptyState.value = true;
        }
        list.value = result.data.map((item) => {
          item.showRateCard = false;
          return item;
        });
        getMerchantPackage().then(({ result }) => {
          if (result.data) {
            merchantPackage.value = result.data;
          }
        });
      }
    );
  };
  const filters = [
    {
      value: 'all_couriers',
      label: 'All Couriers',
    },
    {
      value: 'active',
      label: 'Active',
    },
    {
      value: 'inactive',
      label: 'Inactive',
    },
  ];

  function showRate(index) {
    if (list.value[index].type === 'self') {
      message.error('Rate card is not applicable for "Self" type! ');
    } else {
      list.value[index].showRateCard = !list.value[index].showRateCard;
      rateCard.value = list.value[index].name;
      // isComponent = shallowRef(availableComponents[rateCard.value]);
    }
  }

  function closeRate(index) {
    list.value[index].showRateCard = false;
  }

  onMounted(() => {
    getList();
  });
  checkUserRole();

  function getSearchedList() {
    emptyState.value = false;
    getList();
  }

  function checkUserRole() {
    let i = 0;
    let roles: any = userStore.getRoles;
    while (i < roles.length) {
      if (roles[i] === 'super admin') {
        isSuperAdmin.value = true;
      }
      i++;
    }
  }

  function updateStatus(item) {
    // console.log(item.is_active);
    if (item.merchant_courier_id === null) {
      selectedCourierId.value = item.id;
      selectedName.value = item.name;
      showDialogModal.value = true;
    } else {
      var bool;
      if (item.is_active === 0) {
        bool = false;
      } else {
        bool = true;
      }
      selectedCourierId.value = item.id;
      if (isSuperAdmin.value) {
        const data = ref({
          is_active: bool,
        });
        updateCourier(selectedCourierId.value, data.value).then(({ result }) => {
          window['$message'].success(result.message);
        });
      } else {
        const data = ref({
          merchant_courier_id: item.merchant_courier_id,
          is_active: bool,
        });
        updateMerchantCourier(selectedCourierId.value, data.value).then(({ result }) => {
          window['$message'].success(result.message);
        });
      }
    }
  }

  function filterList(value) {
    emptyState.value = false;
    if (value === 'all_couriers') {
      delete params.value.is_active;
    } else {
      params.value.is_active = value === 'active' ? 1 : 0;
    }
    getList();
  }

  function editItem(item) {
    if (item.merchant_courier_id !== null) {
      selectedMerchantCourierId.value = item.merchant_courier_id;
      showEditDialogModal.value = true;
    } else {
      window['$message'].info('Please active the courier first');
    }
  }
</script>

<style scoped>
  .table_row_style {
    width: 200px;
    border-width: 1px;
    text-align: center;
  }

  .table_header_style {
    width: 200px;
    border-width: 1px;
    text-align: center;
  }
</style>
