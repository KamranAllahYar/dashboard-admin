import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { SettingOutlined } from '@vicons/antd';
import { renderIcon } from '@/utils';

/**
 * @param name Route name, must be set, and cannot have the same name
 * @param meta Routing meta information (routes come with extended information)
 * @param redirect Redirect address, when accessing this route, redirect it by yourself
 * @param meta.disabled Disable entire menu
 * @param meta.title menu name
 * @param meta.icon menu icon
 * @param meta.keepAlive cache the route
 * @param meta.sort The smaller the order, the higher the order
 *
 * */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/settings',
    name: 'Settings',
    redirect: '/settings/account-setup/company-details',
    component: Layout,
    meta: {
      title: 'Settings',
      icon: renderIcon(SettingOutlined),
      sort: 4,
    },
    children: [
      {
        path: 'account-setup/company-details',
        name: 'Settings',
        meta: {
          title: 'Settings',
        },
        component: () => import('@/views/settings/index.vue'),
      },
    ],
  },
];

export default routes;
