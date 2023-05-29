import { http } from '@/utils/http/axios';
export interface BasicResponseModel<T = any> {
  code: number;
  message: string;
  result: T;
}

export interface roleListParams {
  page: number;
  pageSize: number;
}

/**
 * @description: Get a list of roles
 */
export function roleList(params) {
  return http.request<BasicResponseModel>({
    url: '/acl/roles',
    method: 'GET',
    params,
  });
}

/**
 * @description: Delete Role by Id
 */
export function deleteRole(id) {
  return http.request<BasicResponseModel>({
    url: `/acl/roles/${id}`,
    method: 'DELETE',
  });
}

/**
 * @description: Get role by Id
 */
export function getRole(id) {
  return http.request<BasicResponseModel>({
    url: `/acl/roles/${id}`,
    method: 'GET',
  });
}

/**
 * @description: create role
 */
export function createRole(data) {
  return http.request<BasicResponseModel>({
    url: `/acl/roles/`,
    method: 'POST',
    data,
  });
}

/**
 * @description: Update role by Id
 */
export function updateRole(id, data) {
  return http.request<BasicResponseModel>({
    url: `/acl/roles/${id}`,
    method: 'PUT',
    data,
  });
}
