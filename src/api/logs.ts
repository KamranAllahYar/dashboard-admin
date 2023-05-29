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
 * @description: get all error logs
 */
export function getErrorLogs(params) {
  return http.request<BasicResponseModel>({
    url: '/logs/error-logs',
    method: 'GET',
    params,
  });
}
