import { http } from '@/utils/http/axios';
export interface BasicResponseModel<T = any> {
  code: number;
  message: string;
  result: T;
}

export interface connectWithShopifyParams {
  shop: string;
  merchantChannelMappingId: number;
}

const prefix = '/channels/clicky';
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
