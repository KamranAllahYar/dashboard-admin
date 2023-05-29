import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { HomeOutlined } from '@vicons/antd';
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
    path: '/dashboard',
    name: 'Dashboard',
    redirect: '/dashboard/home',
    component: Layout,
    meta: {
      title: 'Dashboard',
      icon: renderIcon(HomeOutlined),
      sort: 1,
    },
    children: [
      {
        path: 'home',
        name: 'Home',
        meta: {
          title: 'Home',
        },
        component: () => import('@/views/dashboard/content/index.vue'),
      },
    ],
  },
];

export default routes;
