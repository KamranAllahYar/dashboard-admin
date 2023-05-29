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
 * @description: create new Agreement by super Admin
 */
export function createNewAgreement(data) {
  return http.request<BasicResponseModel>({
    url: `/agreement`,
    method: 'POST',
    data,
  });
}

/**
 * @description: Register pickup location with courier
 */
export function registerPickupLocationWithCourier(data) {
  return http.request<BasicResponseModel>({
    url: `/couriers/register-address`,
    method: 'PUT',
    data,
  });
}

/**
 * @description: Get a list of agreements
 */
export function agreementList(params) {
  return http.request<BasicResponseModel>({
    url: '/agreement',
    method: 'GET',
    params,
  });
}

/**
 * @description: super admin Delete Agreement by ID
 */
export function deleteAgreement(id) {
  return http.request<BasicResponseModel>({
    url: `/agreement/${id}`,
    method: 'DELETE',
  });
}

/**
 * @description: update merchant courier by ID
 */
export function updateMerchantCourier(id, data) {
  return http.request<BasicResponseModel>({
    url: `/couriers/${id}/merchant`,
    method: 'PUT',
    data,
  });
}

/**
 * @description: update courier by ID
 */
export function updateCourier(id, data) {
  return http.request<BasicResponseModel>({
    url: `/couriers/${id}`,
    method: 'PUT',
    data,
  });
}

/**
 * @description: merchant Agreement accpetance
 */
export function merchantAgreementAccept(data) {
  return http.request<BasicResponseModel>({
    url: `/agreement/merchant-agreement`,
    method: 'POST',
    data,
  });
}

/**
 * @description: update agreement by ID
 */
export function updateAgreement(id, data) {
  return http.request<BasicResponseModel>({
    url: `/agreement/${id}`,
    method: 'PUT',
    data,
  });
}

/**
 * @description: Get agreement by Id
 */
export function getAgreement(id) {
  return http.request<BasicResponseModel>({
    url: `/agreement/${id}`,
    method: 'GET',
  });
}
