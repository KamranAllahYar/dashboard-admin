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
 * @description: create Secure Shipment by Admin
 */
export function createSecureShipment(data) {
  return http.request<BasicResponseModel>({
    url: `/secure_shipment`,
    method: 'POST',
    data,
  });
}

/**
 * @description: update Secure Shipment by Admin
 */
export function updateSecureShipment(id, data) {
  return http.request<BasicResponseModel>({
    url: `/secure_shipment/${id}`,
    method: 'PUT',
    data,
  });
}

/**
 * @description: create Secure Shipment by Admin
 */
export function getSecureShipment() {
  return http.request<BasicResponseModel>({
    url: `/secure_shipment`,
    method: 'GET',
  });
}

/**
 * @description: delete Secure Shipment by Admin
 */
export function deleteSecureShipment(id) {
  return http.request<BasicResponseModel>({
    url: `/secure_shipment/${id}`,
    method: 'DELETE',
  });
}
