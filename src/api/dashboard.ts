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
 * @description: Get a home Dashboard Data
 */
export function getDashboardHome() {
  return http.request<BasicResponseModel>({
    url: '/dashboard',
    method: 'GET',
  });
}
