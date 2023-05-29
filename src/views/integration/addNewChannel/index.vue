<template>
  <n-card>
    <n-space :vertical="true">
      <n-input
        style="margin-right: 10px"
        type="text"
        size="large"
        v-model:value="params.email"
        @change="fetchList"
        placeholder="Search by store "
      />

      <n-h2
        style="font-weight: bold; color: rgb(38, 63, 151); margin-top: 10px; letter-spacing: 0.2px"
        >Website/Marketplace</n-h2
      >
      <n-grid :x-gap="12" :y-gap="8" :cols="6">
        <n-grid-item v-for="item in list" :key="item.id">
          <div style="margin-bottom: 15px; cursor: pointer" @click="clickEvent(item)">
            <n-space :vertical="true" style="margin: 0px">
              <div
                style="
                  border-color: rgb(221, 226, 255);
                  border-width: 2px;
                  border-radius: 12px;
                  border-top-style: solid;
                  border-right-style: solid;
                  border-left-style: solid;
                  margin-bottom: 0px;
                  padding-top: 15px;
                  height: 100px;
                  padding-bottom: 15px;
                  display: flex;
                  justify-content: center;
                "
              >
                <img :src="item.channel_logo_url" />
              </div>
              <button
                style="
                  width: 100%;
                  border-radius: 12px;
                  background-color: rgb(233, 236, 245);
                  padding: 4px;
                  font-weight: bold;
                  margin-top: 0px;
                  color: rgb(38, 63, 151);
                  text-align: center;
                  letter-spacing: 0.2px;
                  font-size: 14px;
                "
                >{{ item.channel_name }}
              </button>
            </n-space>
          </div>
        </n-grid-item>
      </n-grid>
    </n-space>
  </n-card>
</template>
<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import { channelList } from '@/api/channels/channel';
  import { userPagination } from '@/hooks/userPagination';
  import { ref } from 'vue';

  const emptyState = ref(false);
  const router = useRouter();
  const { list, page, pageSizes, itemCount, pageSize, params }: any = userPagination(channelList);
  const getList = () => {
    channelList({ ...params.value, page: page.value, pageSize: pageSize.value }).then(
      ({ result }) => {
        list.value = result.data;
        itemCount.value = result.meta.total;
        if (result.meta.total === 0) {
          emptyState.value = true;
        }
      }
    );
  };

  getList();

  function clickEvent(data) {
    if (data.channel_name === 'shopify') {
      router.push({
        name: 'Channel',
        params: { channel: 'shopify' },
        query: { id: data.id },
      });
    } else if (data.channel_name === 'clicky') {
      router.push({
        name: 'Channel',
        params: { channel: 'clicky' },
        query: { id: data.id },
      });
    } else if (data.channel_name === 'dukanify') {
      router.push({
        name: 'Channel',
        params: { channel: 'dukanify' },
        query: { id: data.id },
      });
    } else {
      window['$message'].success('Channel Not Found!');
    }
  }

  const fetchList = () => {
    getList();
    // console.log(params.value.email);
    // getList(params.value.email);
  };
</script>
