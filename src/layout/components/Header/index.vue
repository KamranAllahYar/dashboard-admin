<template>
  <div class="layout-header">
    <!--TOP MENU-->
    <div
      class="layout-header-left"
      v-if="navMode === 'horizontal' || (navMode === 'horizontal-mix' && mixMenu)"
    >
      <div class="logo" v-if="navMode === 'horizontal'">
        <img :src="websiteConfig.logo" alt="" />
        <h2 v-show="!collapsed" class="title">{{ websiteConfig.title }}</h2>
      </div>
      <AsideMenu
        v-model:collapsed="collapsed"
        v-model:location="getMenuLocation"
        :inverted="getInverted"
        mode="horizontal"
      />
    </div>
    <!--LEFT MENU-->
    <div class="layout-header-left" v-else>
      <!-- MENU COLLAPSED -->
      <div
        class="ml-1 layout-header-trigger layout-header-trigger-min"
        @click="() => $emit('update:collapsed', !collapsed)"
      >
        <n-icon size="18" v-if="collapsed">
          <MenuUnfoldOutlined />
        </n-icon>
        <n-icon size="18" v-else>
          <MenuFoldOutlined />
        </n-icon>
      </div>
      <!-- REFRESH -->
      <div
        class="mr-1 layout-header-trigger layout-header-trigger-min"
        v-if="headerSetting.isReload"
        @click="reloadPage"
      >
        <n-icon size="18">
          <ReloadOutlined />
        </n-icon>
      </div>
      <!-- BREAD CRUMBS -->
      <n-breadcrumb v-if="crumbsSetting.show">
        <template v-for="routeItem in breadcrumbList" :key="routeItem.name">
          <n-breadcrumb-item>
            <n-dropdown
              v-if="routeItem.children.length"
              :options="routeItem.children"
              @select="dropdownSelect"
            >
              <span class="link-text">
                <component
                  v-if="crumbsSetting.showIcon && routeItem.meta.icon"
                  :is="routeItem.meta.icon"
                />
                {{ routeItem.meta.title }}
              </span>
            </n-dropdown>
            <span class="link-text" v-else>
              <component
                v-if="crumbsSetting.showIcon && routeItem.meta.icon"
                :is="routeItem.meta.icon"
              />
              {{ routeItem.meta.title }}
            </span>
          </n-breadcrumb-item>
        </template>
      </n-breadcrumb>
    </div>
    <div class="layout-header-right">
      <!--      <div-->
      <!--        class="layout-header-trigger layout-header-trigger-min"-->
      <!--        v-for="item in iconList"-->
      <!--        :key="item.icon.name"-->
      <!--      >-->
      <!--        <n-tooltip placement="bottom">-->
      <!--          <template #trigger>-->
      <!--            <n-icon size="18">-->
      <!--              <component :is="item.icon" v-on="item.eventObject || {}" />-->
      <!--            </n-icon>-->
      <!--          </template>-->
      <!--          <span>{{ item.tips }}</span>-->
      <!--        </n-tooltip>-->
      <!--      </div>-->

      <!--Notification Drawer Button-->
      <div class="layout-header-trigger layout-header-trigger-min" @click="openNotifications">
        <n-tooltip placement="bottom-end">
          <template #trigger>
            <n-icon size="25" style="font-weight: bold">
              <n-badge :value="userStore.unReadNotification" :max="9">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 512 512"
                  enable-background="new 0 0 512 512"
                  xml:space="preserve"
                >
                  <g>
                    <path
                      d="M289.7,403c-6.1,0-11.4,4.2-12.7,10.2c-1,4.5-2.7,8.2-5,10.9c-1.3,1.5-5.1,5.9-16.1,5.9c-11,0-14.8-4.5-16.1-5.9
		c-2.3-2.7-4-6.4-5-10.9c-1.3-6-6.6-10.2-12.7-10.2h0c-8.4,0-14.5,7.8-12.7,15.9c5,22.3,21,37.1,46.5,37.1s41.5-14.7,46.5-37.1
		C304.2,410.8,298,403,289.7,403L289.7,403z"
                    />
                    <path
                      d="M412,352.2c-15.4-20.3-45.7-32.2-45.7-123.1c0-93.3-41.2-130.8-79.6-139.8c-3.6-0.9-6.2-2.1-6.2-5.9v-2.9
		c0-13.3-10.8-24.6-24-24.6c-0.1,0-0.2,0-0.3,0c-0.1,0-0.2,0-0.3,0c-13.2,0-24,11.3-24,24.6v2.9c0,3.7-2.6,5-6.2,5.9
		c-38.5,9.1-79.6,46.5-79.6,139.8c0,90.9-30.3,102.7-45.7,123.1c-9.9,13.1-0.5,31.8,15.9,31.8h140.4h139.7
		C412.5,384,421.8,365.2,412,352.2z M373,358H139.8c-3.8,0-5.8-4.4-3.3-7.3c7-8,14.7-18.5,21-33.4c9.6-22.6,14.3-51.5,14.3-88.2
		c0-37.3,7-66.5,20.9-86.8c12.4-18.2,27.9-25.1,38.7-27.6c8.4-2,14.4-5.8,18.6-10.5c3.2-3.6,8.7-3.8,11.9-0.2
		c5.1,5.7,12,9.1,18.8,10.7c10.8,2.5,26.3,9.4,38.7,27.6c13.9,20.3,20.9,49.5,20.9,86.8c0,36.7,4.7,65.6,14.3,88.2
		c6.5,15.2,14.4,25.9,21.5,33.9C378.3,353.9,376.5,358,373,358z"
                    />
                  </g>
                </svg>
              </n-badge>
            </n-icon>
          </template>
          <span>Notifications</span>
        </n-tooltip>
      </div>

      <!--TOGGLE FULL SCREEN-->
      <div class="layout-header-trigger layout-header-trigger-min">
        <n-tooltip placement="bottom">
          <template #trigger>
            <n-icon size="20">
              <component :is="fullscreenIcon" @click="toggleFullScreen" />
            </n-icon>
          </template>
          <span>Full screen</span>
        </n-tooltip>
      </div>
      <n-space v-if="hasPermission(['view menu wallet'])">
        <n-divider vertical />
        <n-space>
          <p
            style="
              font-size: 16px;
              color: rgb(101, 191, 115);
              font-weight: bold;
              margin-right: 20px;
              margin-top: 6px;
            "
          >
            {{ currency.format(walletStore.wallet.usable_balance) }}
          </p>
          <n-button type="info" style="border-radius: 5px" @click="showRechargeModal">
            <template #icon>
              <n-icon size="20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 24 24"
                >
                  <path d="M7 2v11h3v9l7-12h-4l4-8z" fill="currentColor" />
                </svg>
              </n-icon>
            </template>
            Recharge
          </n-button>
        </n-space>
        <n-divider vertical />
      </n-space>

      <!-- PERSONAL CENTER -->
      <div class="layout-header-trigger layout-header-trigger-min">
        <n-dropdown trigger="hover" @select="avatarSelect" :options="avatarOptions">
          <div class="avatar">
            <n-avatar v-if="avatar" :round="true" :src="avatar" />
            <n-avatar v-else :round="true">
              <n-icon size="40">
                <user-outlined />
              </n-icon>
            </n-avatar>
          </div>
        </n-dropdown>
      </div>
      <!--SET UP-->
      <div class="layout-header-trigger layout-header-trigger-min" @click="openSetting">
        <n-tooltip placement="bottom-end">
          <template #trigger>
            <n-icon size="20" style="font-weight: bold">
              <SettingOutlined />
            </n-icon>
          </template>
          <span>Project configuration</span>
        </n-tooltip>
      </div>
    </div>
  </div>
  <n-modal v-model:show="showWalletRechargeModal" preset="dialog" style="width: 60%">
    <n-space :vertical="true">
      <main-wallet-recharge-modal @saved="showWalletRechargeModal = false" />
    </n-space>
  </n-modal>
  <n-modal v-model:show="showChangePasswordModal" preset="dialog" style="width: 40%">
    <template #header> <div> Change password </div></template>
    <n-space :vertical="true">
      <ChangePassword @saved="showChangePasswordModal = false" />
    </n-space>
  </n-modal>
  <n-drawer v-model:show="activeNotificationDrawer" :width="502" :placement="'right'">
    <n-drawer-content title="Notifications">
      <view-notifications :list="userStore.notification.data" />
    </n-drawer-content>
  </n-drawer>
  <!--Project configuration-->
  <ProjectSetting ref="drawerSetting" />
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs, ref, computed, unref } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import components from './components';
  import { NDialogProvider, useDialog, useMessage } from 'naive-ui';
  import { TABS_ROUTES } from '@/store/mutation-types';
  import { useUserStore } from '@/store/modules/user';
  import ProjectSetting from './ProjectSetting.vue';
  import { AsideMenu } from '@/layout/components/Menu';
  import { useProjectSetting } from '@/hooks/setting/useProjectSetting';
  import { websiteConfig } from '@/config/website.config';
  import MainWalletRechargeModal from '@/components/Wallet/MainWalletRechargeModal.vue';
  import ChangePassword from '@/components/ChangePassword/ChangePassword.vue';
  import { useWalletStore } from '@/store/modules/wallet';
  import { useCurrency } from '@/hooks/useCurrency';
  import { usePermission } from '@/hooks/web/usePermission';
  import ViewNotifications from '@/components/Notifications/ViewNotifications.vue';

  export default defineComponent({
    name: 'PageHeader',
    components: {
      ViewNotifications,
      ChangePassword,
      MainWalletRechargeModal,
      ...components,
      NDialogProvider,
      ProjectSetting,
      AsideMenu,
    },
    props: {
      collapsed: {
        type: Boolean,
      },
      inverted: {
        type: Boolean,
      },
    },
    setup(props) {
      const userStore = useUserStore();
      const roles = ref(userStore.getRoles);
      const message = useMessage();
      const dialog = useDialog();
      const currency = useCurrency();
      const { hasPermission } = usePermission();
      const showWalletRechargeModal = ref(false);
      const activeNotificationDrawer = ref(false);
      const showChangePasswordModal = ref(false);
      const notificationsList: any = ref();
      const { getNavMode, getNavTheme, getHeaderSetting, getMenuSetting, getCrumbsSetting } =
        useProjectSetting();

      const {
        username,
        companyProfile = {
          logoUrl: '',
        },
      } = userStore?.info || {};

      const walletStore = useWalletStore();
      const drawerSetting = ref();
      const avatar = ref(companyProfile.logoUrl || '');
      const state = reactive({
        username: username || '',
        fullscreenIcon: 'FullscreenOutlined',
        navMode: getNavMode,
        navTheme: getNavTheme,
        headerSetting: getHeaderSetting,
        crumbsSetting: getCrumbsSetting,
      });

      const getInverted = computed(() => {
        const navTheme = unref(getNavTheme);
        return ['light', 'header-dark'].includes(navTheme) ? props.inverted : !props.inverted;
      });

      const mixMenu = computed(() => {
        return unref(getMenuSetting).mixMenu;
      });

      const getChangeStyle = computed(() => {
        const { collapsed } = props;
        const { minMenuWidth, menuWidth }: any = unref(getMenuSetting);
        return {
          left: collapsed ? `${minMenuWidth}px` : `${menuWidth}px`,
          width: `calc(100% - ${collapsed ? `${minMenuWidth}px` : `${menuWidth}px`})`,
        };
      });

      const getMenuLocation = computed(() => {
        return 'header';
      });

      const router = useRouter();
      const route = useRoute();

      const generator: any = (routerMap) => {
        return routerMap.map((item) => {
          const currentMenu = {
            ...item,
            label: item.meta.title,
            key: item.name,
            disabled: item.path === '/',
          };
          // Whether to have submenus, and process recursively
          if (item.children && item.children.length > 0) {
            // Recursion
            currentMenu.children = generator(item.children, currentMenu);
          }
          return currentMenu;
        });
      };

      const breadcrumbList = computed(() => {
        return generator(route.matched);
      });

      const dropdownSelect = (key) => {
        router.push({ name: key });
      };

      // REFRESH PAGE
      const reloadPage = () => {
        router.push({
          path: '/redirect' + unref(route).fullPath,
        });
      };

      // SIGN OUT
      const doLogout = () => {
        dialog.info({
          title: 'Prompt',
          content: 'Are you sure you want to log out',
          positiveText: 'Confirm',
          negativeText: 'Cancel',
          onPositiveClick: () => {
            userStore.logout().then(() => {
              message.success('Successfully logged out');
              // REMOVE TAB
              localStorage.removeItem(TABS_ROUTES);
              router
                .replace({
                  name: 'Login',
                  query: {
                    redirect: route.fullPath,
                  },
                })
                .finally(() => location.reload());
            });
          },
          onNegativeClick: () => {},
        });
      };
      function showRechargeModal() {
        showWalletRechargeModal.value = true;
      }
      // TOGGLE FULLSCREEN ICON
      const toggleFullscreenIcon = () =>
        (state.fullscreenIcon =
          document.fullscreenElement !== null ? 'FullscreenExitOutlined' : 'FullscreenOutlined');

      // Listen for full screen switching events
      document.addEventListener('fullscreenchange', toggleFullscreenIcon);

      // FULL SCREEN TOGGLE
      const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen();
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          }
        }
      };

      // ICON LIST
      const iconList = [
        // {
        //   icon: 'SearchOutlined',
        //   tips: 'Search',
        // },
        {
          icon: 'NotificationOutlined',
          tips: 'Notifications',
          evenObject: {
            click: () => (activeNotificationDrawer.value = true),
          },
        },
        // {
        //   icon: 'GithubOutlined',
        //   tips: 'github',
        //   eventObject: {
        //     click: () => window.open('https://github.com/jekip/naive-ui-admin'),
        //   },
        // },
        // {
        //   icon: 'LockOutlined',
        //   tips: 'Lock screen',
        //   eventObject: {
        //     click: () => useLockscreen.setLock(true),
        //   },
        // },
      ];
      const avatarOptions = [
        {
          label: `${userStore.getUserInfo.first_name} ${userStore.getUserInfo.last_name}`,
          key: 10,
        },
        {
          label: 'Agreements',
          key: 1,
        },
        {
          label: 'Change Password',
          key: 3,
        },
        {
          label: 'Sign out',
          key: 2,
        },
      ];

      //Avatar drop-down menu
      const avatarSelect = (key) => {
        switch (key) {
          case 1:
            router.push({ name: 'Agreements' });
            break;
          case 2:
            doLogout();
            break;
          case 3:
            showChangePasswordModal.value = true;
            break;
          default:
            break;
        }
      };

      function openSetting() {
        const { openDrawer } = drawerSetting.value;
        openDrawer();
      }
      function openNotifications() {
        activeNotificationDrawer.value = true;
        userStore.fetchOnceUserNotifications();
      }

      return {
        userStore,
        hasPermission,
        roles,
        ...toRefs(state),
        walletStore,
        avatar,
        iconList,
        toggleFullScreen,
        doLogout,
        route,
        dropdownSelect,
        avatarOptions,
        getChangeStyle,
        avatarSelect,
        breadcrumbList,
        reloadPage,
        drawerSetting,
        openSetting,
        openNotifications,
        getInverted,
        getMenuLocation,
        mixMenu,
        websiteConfig,
        showWalletRechargeModal,
        activeNotificationDrawer,
        showRechargeModal,
        currency,
        showChangePasswordModal,
        notificationsList,
      };
    },
  });
</script>

<style lang="less" scoped>
  .layout-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    height: @header-height;
    box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
    transition: all 0.2s ease-in-out;
    width: 100%;
    z-index: 11;

    &-left {
      display: flex;
      align-items: center;

      .logo {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 64px;
        line-height: 64px;
        overflow: hidden;
        white-space: nowrap;
        padding-left: 10px;

        img {
          width: auto;
          height: 32px;
          margin-right: 10px;
        }

        .title {
          margin-bottom: 0;
        }
      }

      ::v-deep(.ant-breadcrumb span:last-child .link-text) {
        color: #515a6e;
      }

      .n-breadcrumb {
        display: inline-block;
      }

      &-menu {
        color: var(--text-color);
      }
    }

    &-right {
      display: flex;
      align-items: center;
      margin-right: 20px;

      .avatar {
        display: flex;
        align-items: center;
        height: 64px;
      }

      > * {
        cursor: pointer;
      }
    }

    &-trigger {
      display: inline-block;
      width: 64px;
      height: 64px;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s ease-in-out;

      .n-icon {
        display: flex;
        align-items: center;
        height: 64px;
        line-height: 64px;
      }

      &:hover {
        background: hsla(0, 0%, 100%, 0.08);
      }

      .anticon {
        font-size: 16px;
        color: #515a6e;
      }
    }

    &-trigger-min {
      width: auto;
      padding: 0 12px;
    }
  }

  .layout-header-light {
    background: #fff;
    color: #515a6e;

    .n-icon {
      color: #515a6e;
    }

    .layout-header-left {
      ::v-deep(.n-breadcrumb .n-breadcrumb-item:last-child .n-breadcrumb-item__link) {
        color: #515a6e;
      }
    }

    .layout-header-trigger {
      &:hover {
        background: #f8f8f9;
      }
    }
  }

  .layout-header-fix {
    position: fixed;
    top: 0;
    right: 0;
    left: 200px;
    z-index: 11;
  }

  //::v-deep(.menu-router-link) {
  //  color: #515a6e;
  //
  //  &:hover {
  //    color: #1890ff;
  //  }
  //}
</style>
