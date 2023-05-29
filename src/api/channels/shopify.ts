import { http } from '@/utils/http/axios';
export interface BasicResponseModel<T = any> {
  code: number;
  message: string;
  result: T;
}

export interface connectWithShopifyParams {
  shop: string;

  token_id: string;
  merchantChannelMappingId: number;
}

const prefix = '/channels/shopify';
/**
 * @description: Connect with shopify
 */
export function connectWithShopifyAPI(params: connectWithShopifyParams) {
  return http.request<BasicResponseModel>({
    url: `${prefix}/connect`,
    method: 'GET',
    params,
  });
}

/**
 * @description: get with token
 */
export function getApiToken(params) {
  return http.request<BasicResponseModel>({
    url: `${prefix}/api-token`,
    method: 'GET',
    params,
  });
}

/**
 * @description: Create Order Fulfillment with shopify
 */
export function createOrderFulfillment(id) {
  return http.request<BasicResponseModel>({
    url: `${prefix}/fulfillment/${id}`,
    method: 'POST',
  });
}

/**
 * @description: get Shopify Channel Location List
 */
export function getShopifyLocations(id) {
  return http.request<BasicResponseModel>({
    url: `${prefix}/locations/${id}/update`,
    method: 'GET',
  });
}
