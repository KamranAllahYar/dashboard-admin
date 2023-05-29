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
 * @description: Get channel template by channel Id
 */
export function getChannelTemplates(id, params) {
  return http.request<BasicResponseModel>({
    url: `/channels/template/${id}`,
    method: 'GET',
    params,
  });
}

/**
 * @description: super admin Delete Channel Template by ID
 */
export function deleteChannelTemplate(id) {
  return http.request<BasicResponseModel>({
    url: `/channels/template/${id}`,
    method: 'DELETE',
  });
}

/**
 * @description: create new Channel Template by super Admin
 */
export function createNewChannelTemplate(data) {
  return http.request<BasicResponseModel>({
    url: `/channels/template`,
    method: 'POST',
    data,
  });
}

/**
 * @description: Get channel Template Details by Id
 */
export function getChannelTemplateDetailsById(id) {
  return http.request<BasicResponseModel>({
    url: `/channels/template/detail/${id}`,
    method: 'GET',
  });
}

/**
 * @description: update channel Template by ID
 */
export function updateChannelTemplate(id, data) {
  return http.request<BasicResponseModel>({
    url: `/channels/template/detail/${id}`,
    method: 'PUT',
    data,
  });
}
