import { http } from '@/utils/http/axios';
import { BasicResponseModel } from '@/api/acl/roles';
/**
 * @description: Get user menu based on user id
 */
export function adminMenus() {
  return http.request({
    url: '/menus/tree',
    method: 'GET',
  });
}

/**
 * @description: Get user menu based on user id
 */
export function adminMenuTree() {
  return http.request({
    url: '/menus/tree-admin',
    method: 'GET',
  });
}

/**
 * @description: Create menu
 */
export function createMenu(data) {
  return http.request({
    url: '/menus',
    method: 'POST',
    data,
  });
}

/**
 * @description: update menu by id
 */
export function updateMenu(id, data) {
  return http.request({
    url: `/menus/${id}`,
    method: 'PUT',
    data,
  });
}

/**
 * Get tree menu list
 * @param params
 */
export function menuList(params?) {
  return http.request({
    url: '/menus',
    method: 'GET',
    params,
  });
}

/**
 * @description: Delete Menu by Id
 */
export function deleteMenu(id) {
  return http.request<BasicResponseModel>({
    url: `/menus/${id}`,
    method: 'DELETE',
  });
}

/**
 * Get tree menu item by id
 * @param params
 */
export function getMenuById(id?) {
  return http.request({
    url: `/menus/${id}`,
    method: 'GET',
  });
}
