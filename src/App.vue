<template>
  <NConfigProvider
    v-if="!isLock"
    :locale="enUS"
    :theme="getDarkTheme"
    :theme-overrides="getThemeOverrides"
    :date-locale="dateEnUS"
  >
    <AppProvider>
      <RouterView />
    </AppProvider>
  </NConfigProvider>
</template>

<script lang="ts" setup>
  import { computed, onMounted, onUnmounted } from 'vue';
  import { enUS, dateEnUS, darkTheme } from 'naive-ui';
  import { AppProvider } from '@/components/Application';
  import { useLockscreenStore } from '@/store/modules/lockscreen';
  import { useRoute } from 'vue-router';
  import { useDesignSettingStore } from '@/store/modules/designSetting';
  import { lighten } from '@/utils';
  import { useSocketIo } from '@/hooks/useSocketIo';
  import { useUserStore } from '@/store/modules/user';

  const route = useRoute();
  const useLockscreen = useLockscreenStore();
  const designStore = useDesignSettingStore();
  const isLock = computed(() => useLockscreen.isLock);
  const lockTime = computed(() => useLockscreen.lockTime);
  const userStore = useUserStore();
  /**
   * @type import('naive-ui').GlobalThemeOverrides
   */
  const getThemeOverrides = computed(() => {
    const appTheme = designStore.appTheme;
    const lightenStr = lighten(designStore.appTheme, 6);
    return {
      common: {
        primaryColor: appTheme,
        primaryColorHover: lightenStr,
        primaryColorPressed: lightenStr,
      },
      LoadingBar: {
        colorLoading: appTheme,
      },
    };
  });

  const getDarkTheme = computed(() => (designStore.darkTheme ? darkTheme : undefined));

  let timer;

  const timekeeping = () => {
    clearInterval(timer);
    if (route.name == 'login' || isLock.value) return;
    // Set not to lock screen
    useLockscreen.setLock(false);
    // Reset lock screen time
    useLockscreen.setLockTime();
    timer = setInterval(() => {
      // Countdown to lock screen decrements
      useLockscreen.setLockTime(lockTime.value - 1);
      if (lockTime.value <= 0) {
        // Set lock screen
        useLockscreen.setLock(true);
        return clearInterval(timer);
      }
    }, 1000);
  };

  onMounted(() => {
    document.addEventListener('mousedown', timekeeping);
    userStore.fetchUnReadNotificationCount();
    const socket = useSocketIo();
    if (userStore.info.id) {
      socket.on(`notification.${userStore.info.id}`, () => {
        userStore.userNotifications();
        userStore.fetchUnReadNotificationCount();
      });
    }
  });

  onUnmounted(() => {
    document.removeEventListener('mousedown', timekeeping);
  });
</script>

<style lang="less">
  @import 'styles/index.less';
</style>
