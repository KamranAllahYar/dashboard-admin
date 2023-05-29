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
 * @description: create new wallet transaction by Admin
 */
export function createWalletTransaction(data) {
  return http.request<BasicResponseModel>({
    url: `/wallets/transaction`,
    method: 'POST',
    data,
  });
}

/**
 * @description: Get wallet transactions
 */
export function getTransactions(params) {
  return http.request<BasicResponseModel>({
    url: '/wallets/transaction',
    method: 'GET',
    params,
  });
}
