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
 * @description: Get channel Configs by channel Id
 */
export function getChannelConfigs(id, params) {
  return http.request<BasicResponseModel>({
    url: `/channels/config/${id}`,
    method: 'GET',
    params,
  });
}

/**
 * @description: super admin Delete Channel Config by ID
 */
export function deleteChannelConfig(id) {
  return http.request<BasicResponseModel>({
    url: `/channels/config/${id}`,
    method: 'DELETE',
  });
}

/**
 * @description: create new Channel Config by super Admin
 */
export function createNewChannelConfig(data) {
  return http.request<BasicResponseModel>({
    url: `/channels/config`,
    method: 'POST',
    data,
  });
}

/**
 * @description: Get channel Config Details by Id
 */
export function getChannelConfigDetailsById(id) {
  return http.request<BasicResponseModel>({
    url: `/channels/config/detail/${id}`,
    method: 'GET',
  });
}

/**
 * @description: update channel by ID
 */
export function updateChannelConfig(id, data) {
  return http.request<BasicResponseModel>({
    url: `/channels/config/detail/${id}`,
    method: 'PUT',
    data,
  });
}
