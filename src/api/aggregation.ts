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
 * @description: Get Order statuses Aggregation by merchant
 */
export function getOrderStatusesAggregation() {
  return http.request<BasicResponseModel>({
    url: '/aggregation/order-statuses',
    method: 'GET',
  });
}

/**
 * @description: Get all Order statuses Aggregation by super admin
 */
export function getSuperAdminOrderStatusesAggregation() {
  return http.request<BasicResponseModel>({
    url: '/super-admin-aggregation/order-statuses',
    method: 'GET',
  });
}

/**
 * @description: Get a revenue Aggregation by merchant
 */
export function getRevenueAggregation(dateFilter: string) {
  return http.request<BasicResponseModel>({
    url: `/aggregation/revenue/${dateFilter}`,
    method: 'GET',
  });
}
/**
 * @description: update revenue Aggregation by Super admin
 */
export function updateRevenueAggregation(dateFilter: string) {
  return http.request<BasicResponseModel>({
    url: `/cron/manual-revenue-aggregation/${dateFilter}`,
    method: 'GET',
  });
}
/**
 * @description: Get a revenue Aggregation by super admin
 */
export function getSuperAdminOrdersRevenueAggregation(dateFilter: string) {
  return http.request<BasicResponseModel>({
    url: `/super-admin-aggregation/revenue/${dateFilter}`,
    method: 'GET',
  });
}
