import { http } from '@/utils/http/axios';
export interface BasicResponseModel<T = any> {
  code: number;
  message: string;
  result: T;
}

export interface permissionListParams {
  page: number;
  pageSize: number;
}

/**
 * @description: Get a list of permissions
 */
export function permissionList(params) {
  return http.request<BasicResponseModel>({
    url: '/acl/permissions',
    method: 'GET',
    params,
  });
}

/**
 * @description: Delete permission by Id
 */
export function deletePermission(id) {
  return http.request<BasicResponseModel>({
    url: `/acl/permissions/${id}`,
    method: 'DELETE',
  });
}

/**
 * @description: Get permission by Id
 */
export function getPermission(id) {
  return http.request<BasicResponseModel>({
    url: `/acl/permissions/${id}`,
    method: 'GET',
  });
}

/**
 * @description: create permission
 */
export function createPermission(data) {
  return http.request<BasicResponseModel>({
    url: `/acl/permissions/`,
    method: 'POST',
    data,
  });
}

/**
 * @description: Update permission by Id
 */
export function updatePermission(id, data) {
  return http.request<BasicResponseModel>({
    url: `/acl/permissions/${id}`,
    method: 'PUT',
    data,
  });
}
