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
 * @description: get user notifications
 */
export function getUserNotifications() {
  return http.request<BasicResponseModel>({
    url: '/notifications/',
    method: 'GET',
  });
}
/**
 * @description: get user notifications
 */
export function markReadNotification(id) {
  return http.request<BasicResponseModel>({
    url: `/notifications/${id}`,
    method: 'PUT',
  });
}
/**
 * @description: get user unread notifications count
 */
export function getUserUnreadNotificationCount() {
  return http.request<BasicResponseModel>({
    url: '/notifications/count',
    method: 'GET',
  });
}
