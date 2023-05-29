import { http } from '@/utils/http/axios';
import { ACCESS_TOKEN } from '@/store/mutation-types';
import { useCookies } from 'vue3-cookies';
const { cookies } = useCookies();

export interface BasicResponseModel<T = any> {
  code: number;
  message: string;
  result: T;
}

export interface BasicPageParams {
  pageNumber: number;
  pageSize: number;
  total: number;
}

/**
 * @description: User login
 */
export function login(params) {
  return http.request<BasicResponseModel>({
    url: 'auth/login',
    method: 'POST',
    params,
  });
}

/**
 * @description: User login
 */
export function logoutUser() {
  if (cookies.get(ACCESS_TOKEN)) {
    try {
      http.request({
        url: 'auth/logout',
        method: 'GET',
      });
    } catch (e) {}
    cookies.remove(ACCESS_TOKEN);
  }
}

/**
 * @description: Change password
 */
export function changePassword(data) {
  return http.request<BasicResponseModel>({
    url: 'auth/confirm-reset-password',
    method: 'POST',
    data,
  });
}

/**
 * @description: Resest password
 */
export function resetPassword(data) {
  return http.request<BasicResponseModel>({
    url: 'auth/forget-password',
    method: 'POST',
    data,
  });
}
/**
 * @description: Resest password
 */
export function verifyOtpPassword(data) {
  return http.request<BasicResponseModel>({
    url: 'auth/reset-password-verify-otp',
    method: 'POST',
    data,
  });
}
