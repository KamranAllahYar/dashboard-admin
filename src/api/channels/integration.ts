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
 * @description: create new Courier
 */
export function channelsList() {
  return http.request<BasicResponseModel>({
    url: `/channels`,
    method: 'GET',
  });
}
