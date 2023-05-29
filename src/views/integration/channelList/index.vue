<template>
  <n-card>
    <n-space :vertical="true">
      <n-space style="display: flex; justify-content: space-between">
        <n-h1
          style="
            font-weight: bold;
            color: rgb(38, 63, 151);
            text-align: left;
            letter-spacing: 0.2px;
            margin: 0px;
          "
          >Integrated Channels
        </n-h1>
        <n-button
          :round="true"
          type="info"
          @click="router.push({ name: 'AddChannel' })"
          style="
            font-weight: bold;
            font-size: 14px;
            text-align: center;
            padding-top: 1px;
            margin-top: 7px;
            letter-spacing: 0.2px;
          "
        >
          <template #icon>
            <n-icon>
              <plus-outlined />
            </n-icon>
          </template>
          Add New Channel
        </n-button>
      </n-space>
      <n-card
        v-for="(item, index) in list"
        :key="index"
        style="border-radius: 12px; border-color: rgb(221, 226, 255); border-width: 2px"
      >
        <n-grid :x-gap="12" :y-gap="12" :cols="9">
          <n-grid-item :span="1" style="display: flex; justify-content: center">
            <img :src="item.channel.channel_logo_url" style="width: 60px" />
          </n-grid-item>
          <n-grid-item :span="2">
            <n-space :vertical="true">
              <p
                style="
                  font-weight: bold;
                  color: rgb(38, 63, 151);
                  text-align: center;
                  letter-spacing: 0.2px;
                  font-size: 16px;
                "
                >Channel
              </p>
              <p
                style="
                  color: rgb(126, 143, 204);
                  text-align: center;
                  letter-spacing: 0.2px;
                  font-size: 16px;
                "
                >{{ item.channel.channel_name }}
              </p>
            </n-space>
          </n-grid-item>
          <n-grid-item :span="2">
            <n-space :vertical="true">
              <p
                style="
                  font-weight: bold;
                  color: rgb(38, 63, 151);
                  text-align: center;
                  letter-spacing: 0.2px;
                  font-size: 16px;
                "
                >Shop Name
              </p>
              <p
                style="
                  color: rgb(126, 143, 204);
                  text-align: center;
                  letter-spacing: 0.2px;
                  font-size: 16px;
                "
                >{{ item.store_name }}
              </p>
            </n-space>
          </n-grid-item>
          <n-grid-item :span="3">
            <n-space :vertical="true">
              <p
                style="
                  font-weight: bold;
                  color: rgb(38, 63, 151);
                  text-align: center;
                  letter-spacing: 0.2px;
                  font-size: 16px;
                "
                >Website URL
              </p>
              <p
                style="
                  color: rgb(126, 143, 204);
                  text-align: center;
                  letter-spacing: 0.2px;
                  font-size: 16px;
                "
                >{{ item.website_url }}
              </p>
            </n-space>
          </n-grid-item>
          <n-grid-item :span="1" style="display: flex; justify-content: center">
            <n-button
              :strong="true"
              :secondary="true"
              :circle="true"
              type="info"
              size="large"
              @click="editChannel(item)"
              style="margin-top: 13px"
            >
              <template #icon>
                <n-icon><edit-outlined /></n-icon>
              </template>
            </n-button>
          </n-grid-item>
        </n-grid>
      </n-card>
      <div v-show="emptyState" style="display: flex; justify-content: center; height: 300px">
        <n-space :vertical="true" style="display: flex; justify-content: center; height: 300px">
          <img style="width: 100px; height: 100px" :src="emptyStateImg" />
          <p>No results found</p></n-space
        >
      </div>
      <n-pagination
        v-show="!emptyState"
        v-model:page="page"
        v-model:page-size="pageSize"
        :item-count="itemCount"
        :page-sizes="pageSizes"
        size="small"
        :show-quick-jumper="true"
        :show-size-picker="true"
      />
    </n-space>
  </n-card>
</template>
<script lang="ts" setup>
  import { EditOutlined, PlusOutlined } from '@vicons/antd';
  import { useRouter } from 'vue-router';
  import { getMerchantChannelMappingList } from '@/api/channels/mapping';
  import { onMounted } from 'vue';
  import { userPagination } from '@/hooks/userPagination';
  import emptyStateImg from '@/assets/images/empty-folder.png';

  const router = useRouter();

  const { getList, emptyState, list, page, pageSizes, itemCount, pageSize }: any = userPagination(
    getMerchantChannelMappingList
  );

  function editChannel(item) {
    router.push({
      name: 'UpdateChannel',
      params: { channel: item.id },
    });
  }

  onMounted(() => {
    getList();
  });
</script>
