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
 * @description: super admin Delete Channel Config by ID
 */
export function deleteChannelConfig(id) {
  return http.request<BasicResponseModel>({
    url: `/channels/config/${id}`,
    method: 'DELETE',
  });
}

/**
 * @description: create new Merchant Channel Mapping by Admin
 */
export function createNewMerchantChannelMapping(data) {
  return http.request<BasicResponseModel>({
    url: `/channels/mapping`,
    method: 'POST',
    data,
  });
}

/**
 * @description: Get Merchant Channel Mapping Details by Id
 */
export function getMerchantChannelMappingDetailsById(id) {
  return http.request<BasicResponseModel>({
    url: `/channels/mapping/detail/${id}`,
    method: 'GET',
  });
}

/**
 * @description: update merchant channel mapping details by ID
 */
export function updateMerchantChannelMappingDetailById(id, data) {
  return http.request<BasicResponseModel>({
    url: `/channels/mapping/detail/${id}`,
    method: 'PUT',
    data,
  });
}

/**
 * @description: Get Merchant Channel Mapping list
 */
export function getMerchantChannelMappingList() {
  return http.request<BasicResponseModel>({
    url: `/channels/mapping`,
    method: 'GET',
  });
}
