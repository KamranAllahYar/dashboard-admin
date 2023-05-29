import { http } from '@/utils/http/axios';
export interface BasicResponseModel<T = any> {
  code: number;
  message: string;
  result: T;
}

export interface userListParams {
  page: number;
  pageSize: number;
}

/**
 * @description: Authenticated User Info
 */
export function getUserInfo() {
  return http.request<BasicResponseModel>({
    url: '/users/authenticated',
    method: 'GET',
  });
}

/**
 * @description: Get a list of users
 */
export function userList(params: userListParams) {
  return http.request<BasicResponseModel>({
    url: '/users',
    method: 'GET',
    params,
  });
}

/**
 * @description: Delete User by ID
 */
export function deleteUser(id) {
  return http.request<BasicResponseModel>({
    url: `/users/${id}`,
    method: 'DELETE',
  });
}

/**
 * @description: Get User by ID
 */
export function getUser(id) {
  return http.request<BasicResponseModel>({
    url: `/users/${id}`,
    method: 'GET',
  });
}

/**
 * @description: create new User
 */
export function createUser(data) {
  return http.request<BasicResponseModel>({
    url: `/users/`,
    method: 'POST',
    data,
  });
}

/**
 * @description: Update User by ID
 */
export function updateUser(id, data) {
  return http.request<BasicResponseModel>({
    url: `/users/${id}`,
    method: 'PUT',
    data,
  });
}
