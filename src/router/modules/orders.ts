import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { ShoppingCartOutlined } from '@vicons/antd';
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
    path: '/orders',
    name: 'orders',
    redirect: '/orders/create-order/manual-order',
    component: Layout,
    meta: {
      title: 'Orders',
      icon: renderIcon(ShoppingCartOutlined),
      sort: 3,
    },
    children: [
      {
        path: 'create-order',
        name: 'CreateOrder',
        redirect: '/create-order/manual-order',
        meta: {
          title: 'Create Order',
        },
        children: [
          {
            path: 'manual-order',
            name: 'ManualOrder',
            meta: {
              title: 'Manual Order',
              keepAlive: true,
            },
            component: () => import('@/views/orders/createOrders/manualOrder/index.vue'),
          },
          {
            path: 'bulk-order',
            name: 'BulkOrder',
            meta: {
              title: 'Bulk Order',
              keepAlive: true,
            },
            component: () => import('@/views/orders/createOrders/bulkOrder/index.vue'),
          },
        ],
      },
      {
        path: 'list',
        name: 'ListOrders',
        meta: {
          title: 'Orders',
          keepAlive: true,
        },
        component: () => import('@/views/orders/list/index.vue'),
      },
      {
        path: 'list-shipments',
        name: 'ListShipments',
        meta: {
          title: 'All Shipments',
          keepAlive: true,
        },
        component: () => import('@/views/orders/allShipments/index.vue'),
      },
    ],
  },
];

export default routes;
