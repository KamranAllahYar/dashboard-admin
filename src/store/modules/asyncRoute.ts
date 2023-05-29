import { toRaw, unref } from 'vue';
import { defineStore } from 'pinia';
import { RouteRecordRaw } from 'vue-router';
import { store } from '@/store';
import { asyncRoutes, constantRouter } from '@/router';
import { generatorDynamicRouter } from '@/router/generator-routers';
import { useProjectSetting } from '@/hooks/setting/useProjectSetting';
import { constantRouterIcon } from '@/router/router-icons';

interface TreeHelperConfig {
  id: string;
  children: string;
  pid: string;
}

const DEFAULT_CONFIG: TreeHelperConfig = {
  id: 'id',
  children: 'children',
  pid: 'pid',
};

const getConfig = (config: Partial<TreeHelperConfig>) => Object.assign({}, DEFAULT_CONFIG, config);

export interface IAsyncRouteState {
  menus: RouteRecordRaw[];
  routers: any[];
  addRouters: any[];
  keepAliveComponents: string[];
  isDynamicAddedRoute: boolean;
}

function filter<T = any>(
  tree: T[],
  func: (n: T) => boolean,
  config: Partial<TreeHelperConfig> = {}
): T[] {
  config = getConfig(config);
  const children = config.children as string;

  function listFilter(list: T[]) {
    return list
      .map((node: any) => ({ ...node }))
      .filter((node) => {
        node[children] = node[children] && listFilter(node[children]);
        return func(node) || (node[children] && node[children].length);
      });
  }

  return listFilter(tree);
}
export const attachIcons = (accessedRouters) => {
  accessedRouters = accessedRouters.map((accessedRoute) => {
    accessedRoute.meta.icon = constantRouterIcon[accessedRoute.meta.icon];
    return accessedRoute;
  });
  return accessedRouters;
};

export const useAsyncRouteStore = defineStore({
  id: 'app-async-route',
  state: (): IAsyncRouteState => ({
    menus: [],
    routers: constantRouter,
    addRouters: [],
    keepAliveComponents: [],
    // Whether the route has been dynamically added
    isDynamicAddedRoute: false,
  }),
  getters: {
    getMenus(): RouteRecordRaw[] {
      return this.menus;
    },
    getIsDynamicAddedRoute(): boolean {
      return this.isDynamicAddedRoute;
    },
  },
  actions: {
    getRouters() {
      return toRaw(this.addRouters);
    },
    setDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added;
    },
    // set dynamic routing
    setRouters(routers) {
      this.addRouters = routers;
      this.routers = constantRouter.concat(routers);
    },
    setMenus(menus) {
      // set dynamic routing
      this.menus = menus;
    },
    setKeepAliveComponents(compNames) {
      // Set the components that need to be cached
      this.keepAliveComponents = compNames;
    },
    async generateRoutes({ permissions = [], roles = [] }: any) {
      let accessedRouters;
      const routeFilter = (route) => {
        if (roles.some((item) => ['super admin', 'admin'].includes(item))) return true;
        const { meta } = route;
        const { permissions: routePermissions } = meta || {};
        if (!routePermissions) return true;
        return permissions.some((item) => routePermissions.includes(item));
      };
      const { getPermissionMode } = useProjectSetting();
      const permissionMode = unref(getPermissionMode);
      if (permissionMode === 'BACK') {
        // get the menu dynamically
        try {
          accessedRouters = await generatorDynamicRouter();
          accessedRouters = accessedRouters.map((accessedRoute) => {
            accessedRoute.meta.icon = constantRouterIcon[accessedRoute.meta.icon];
            if (accessedRoute.children && accessedRoute.children.length) {
              accessedRoute.children = attachIcons(accessedRoute.children);
            }
            return accessedRoute;
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          //Filter whether the account has a certain permission, and remove the menu from the load list
          accessedRouters = filter(asyncRoutes, routeFilter);
        } catch (error) {
          console.log(error);
        }
      }
      accessedRouters = accessedRouters.filter(routeFilter);
      this.setRouters(accessedRouters);
      this.setMenus(accessedRouters);
      return toRaw(accessedRouters);
    },
  },
});

// Need to be used outside the setup
export function useAsyncRouteStoreWidthOut() {
  return useAsyncRouteStore(store);
}
