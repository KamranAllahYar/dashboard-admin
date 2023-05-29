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
 * @description: Get Addresses List
 */
export function getAddresses(params) {
  return http.request<BasicResponseModel>({
    url: `/addresses`,
    method: 'GET',
    params,
  });
}
/**
 * @description: Get Weship Cities List
 */
export function getWeshipcitiesList(params) {
  return http.request<BasicResponseModel>({
    url: `/weship-cities`,
    method: 'GET',
    params,
  });
}

/**
 * @description: Delete Address by Id
 */
export function deleteAddress(id) {
  return http.request<BasicResponseModel>({
    url: `/addresses/${id}`,
    method: 'DELETE',
  });
}
/**
 * @description: make default location by Id
 */
export function defaultAddress(id) {
  return http.request<BasicResponseModel>({
    url: `/addresses/default/${id}`,
    method: 'GET',
  });
}

/**
 * @description: create address
 */
export function createAddress(data) {
  return http.request<BasicResponseModel>({
    url: `/addresses`,
    method: 'POST',
    data,
  });
}

/**
 * @description: update customer city by order Id
 */
export function updateCustomerCity(data) {
  return http.request<BasicResponseModel>({
    url: `/weship-cities/update`,
    method: 'POST',
    data,
  });
}

/**
 * @description: Get address by id
 */
export function getAddressById(id) {
  return http.request<BasicResponseModel>({
    url: `/addresses/${id}`,
    method: 'GET',
  });
}

/**
 * @description: Update company profile
 */
export function updateAddress(data) {
  return http.request<BasicResponseModel>({
    url: `/company_profiles`,
    method: 'PUT',
    data,
  });
}
/**
 * @description: Update company profile by ID
 */
export function updateAddressById(id, data) {
  return http.request<BasicResponseModel>({
    url: `/addresses/${id}`,
    method: 'PUT',
    data,
  });
}
