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
 * @description: get ndr shipments
 */
export function getNDRList(params) {
  return http.request<BasicResponseModel>({
    url: '/shipments/ndr',
    method: 'GET',
    params,
  });
}

