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
 * @description: Get a current package of merchant
 */
export function getMerchantPackage() {
  return http.request<BasicResponseModel>({
    url: '/packages/merchant-package',
    method: 'GET',
  });
}

/**
 * @description: Get list of packages
 */
export function getAllPackages() {
  return http.request<BasicResponseModel>({
    url: '/packages',
    method: 'GET',
  });
}

/**
 * @description: delete package by id
 */
export function deletePackage(id) {
  return http.request<BasicResponseModel>({
    url: `/packages/${id}`,
    method: 'delete',
  });
}
/**
 * @description: get package by id
 */
export function getPackageById(id) {
  return http.request<BasicResponseModel>({
    url: `/packages/${id}`,
    method: 'get',
  });
}
/**
 * @description: create/update package
 */
export function savePackage(data) {
  return http.request<BasicResponseModel>({
    url: `/packages`,
    method: 'post',
    data,
  });
}
/**
 * @description: update package status by id
 */
export function updatePackageStatus(data) {
  return http.request<BasicResponseModel>({
    url: `/packages/update-status`,
    method: 'put',
    data,
  });
}

/**
 * @description: update merchant subscription package by id
 */
export function updateMerchantPackageStatus(data) {
  return http.request<BasicResponseModel>({
    url: `/packages/merchant-package-update`,
    method: 'put',
    data,
  });
}
