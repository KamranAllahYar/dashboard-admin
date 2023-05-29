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
 * @description: get merchant cod vs prepaid revenue
 */
export function getRevenueCodVsPrepaid() {
  return http.request<BasicResponseModel>({
    url: '/reports/revenue-dashboard/cod-vs-prepaid',
    method: 'GET',
  });
}

/**
 * @description: get Top 5 cities revenue
 */
export function getTopFiveCitiesRevenue() {
  return http.request<BasicResponseModel>({
    url: '/reports/revenue-dashboard/top-5-cities',
    method: 'GET',
  });
}
/**
 * @description: get order dispatch pending list
 */
export function getOrderDispatchPending() {
  return http.request<BasicResponseModel>({
    url: '/reports/order-status-dashboard/order-dispatch-pending',
    method: 'GET',
  });
}
/**
 * @description: get High rto Prducts list
 */
export function getHighRtoProducts() {
  return http.request<BasicResponseModel>({
    url: '/reports/order-status-dashboard/high-rto-products',
    method: 'GET',
  });
}
/**
 * @description: get High rto cities list
 */
export function getHighRtoCities() {
  return http.request<BasicResponseModel>({
    url: '/reports/order-status-dashboard/high-rto-cities',
    method: 'GET',
  });
}
/**
 * @description: get Top selling sku revenue
 */
export function getTopSellingSkuRevenue() {
  return http.request<BasicResponseModel>({
    url: '/reports/revenue-dashboard/best-selling-skus',
    method: 'GET',
  });
}
/**
 * @description: get High Order Volume Cities
 */
export function getHighOrderVolumeCities() {
  return http.request<BasicResponseModel>({
    url: '/reports/performance-overview-dashboard/high-order-cities',
    method: 'GET',
  });
}
/**
 * @description: get Daily Performance Summary
 */
export function getDailyPerformanceSummary() {
  return http.request<BasicResponseModel>({
    url: '/reports/performance-overview-dashboard/daily-performance-summary',
    method: 'GET',
  });
}
/**
 * @description: get Zone wise delivery performance report
 */
export function getZoneDeliveryPerformance() {
  return http.request<BasicResponseModel>({
    url: '/reports/performance-overview-dashboard/zone-delivery-performance',
    method: 'GET',
  });
}
