<template>
  <div class="logo">
    <img :src="formValue.logo_url" alt="" :class="{ 'mr-2': !props.collapsed }" />
    <h2 v-show="!collapsed" class="title">{{ formValue.name }}</h2>
  </div>
</template>

<script lang="ts" setup>
  // import { websiteConfig } from '@/config/website.config';
  import { getCompanyProfile } from '@/api/settings/companyprofile';
  import { ref } from 'vue';
  import { useUserStore } from '@/store/modules/user';
  const userStore = useUserStore();
  const roles = ref(userStore.getRoles);
  const formValue: any = ref({});
  const props = defineProps({
    collapsed: {
      type: Boolean,
    },
  });
  if (roles.value.includes('admin')) {
    getCompanyProfile().then(({ result }) => {
      formValue.value = result.data;
      // information.value = formValue.value.information;
    });
  }
</script>

<style lang="less" scoped>
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 64px;
    line-height: 64px;
    overflow: hidden;
    white-space: nowrap;

    img {
      width: auto;
      height: 32px;
    }

    .title {
      margin-bottom: 0;
    }
  }
</style>
