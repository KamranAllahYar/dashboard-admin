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
 * @description: create new Channel by super Admin
 */
export function createNewChannel(data) {
  return http.request<BasicResponseModel>({
    url: `/channels`,
    method: 'POST',
    data,
  });
}

/**
 * @description: Get a list of channels
 */
export function channelList(params) {
  return http.request<BasicResponseModel>({
    url: '/channels',
    method: 'GET',
    params,
  });
}

/**
 * @description: super admin Delete Channel by ID
 */
export function deleteChannel(id) {
  return http.request<BasicResponseModel>({
    url: `/channels/${id}`,
    method: 'DELETE',
  });
}

/**
 * @description: update channel by ID
 */
export function updateChannel(id, data) {
  return http.request<BasicResponseModel>({
    url: `/channels/${id}`,
    method: 'PUT',
    data,
  });
}

/**
 * @description: Get channel by Id
 */
export function getChannel(id) {
  return http.request<BasicResponseModel>({
    url: `/channels/${id}`,
    method: 'GET',
  });
}

/**
 * @description: Get a buffer
 */
export function getBuffer(data) {
  return http.request<BasicResponseModel>({
    url: `/channels/shopify/buffer`,
    method: 'POST',
    data,
  });
}
