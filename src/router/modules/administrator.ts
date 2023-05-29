import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { SettingOutlined, SecurityScanOutlined, UserOutlined } from '@vicons/antd';
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
    path: '/administrative',
    name: 'administrative',
    redirect: '/administrative/users/list',
    component: Layout,
    meta: {
      title: 'Administrative',
      icon: renderIcon(SettingOutlined),
      sort: 2,
    },
    children: [
      {
        path: 'users',
        name: 'Users',
        redirect: '/administrative/users/list',
        meta: {
          title: 'Users',
          icon: renderIcon(UserOutlined),
        },
        children: [
          {
            path: 'list',
            name: 'UserList',
            meta: {
              title: 'User List',
              keepAlive: true,
            },
            component: () => import('@/views/users/list/index.vue'),
          },
          {
            path: ':id',
            name: 'UserEdit',
            meta: {
              hidden: true,
              title: 'User Edit',
            },
            component: () => import('@/views/users/_id.vue'),
          },
        ],
      },
      {
        path: 'acl',
        name: 'Acl',
        redirect: '/administrative/acl',
        meta: {
          title: 'ACL',
          icon: renderIcon(SecurityScanOutlined),
          sort: 1,
        },
        children: [
          {
            path: '/roles',
            name: 'roles',
            redirect: 'administrative/acl/roles/list',
            meta: {
              title: 'Roles',
              sort: 1,
            },
            children: [
              {
                path: 'list',
                name: 'RoleList',
                meta: {
                  title: 'Roles',
                  keepAlive: true,
                },
                component: () => import('@/views/roles/list/index.vue'),
              },
            ],
          },
          {
            path: '/permissions',
            name: 'permissions',
            redirect: 'administrative/acl/permissions/list',
            meta: {
              title: 'Permissions',
              sort: 1,
              permissions: ['view menu permissions'],
            },
            children: [
              {
                path: 'list',
                name: 'PermissionList',
                meta: {
                  title: 'Permissions',
                  keepAlive: true,
                },
                component: () => import('@/views/permissions/list/index.vue'),
              },
            ],
          },
        ],
      },
    ],
  },
];

export default routes;
