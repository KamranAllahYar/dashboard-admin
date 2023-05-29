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
 * @description: create new wallet deposit by Admin
 */
export function createWalletDeposit(data) {
  return http.request<BasicResponseModel>({
    url: `/wallets/deposits`,
    method: 'POST',
    data,
  });
}
