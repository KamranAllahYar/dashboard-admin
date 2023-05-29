import { http, httpDownload } from '@/utils/http/axios';
import FileDownload from 'js-file-download';
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
 * @description: uploadd admin cod_cycle csv file by super Admin
 */
export function uploadCodRemittanceCsvFile(data) {
  return http.request<BasicResponseModel>({
    url: `/finance/cod-cycle`,
    method: 'POST',
    data,
  });
}
/**
 * @description: Get a cod_cycle by Id
 */
export function getCodCycleByID(id) {
  return http.request<BasicResponseModel>({
    url: `/finance/cod-cycle/${id}`,
    method: 'GET',
  });
}
/**
 * @description: Get a list of cod_cycles by admin
 */
export function getCodCycleList(params) {
  return http.request<BasicResponseModel>({
    url: '/finance/cod-cycle',
    method: 'GET',
    params,
  });
}

/**
 * @description: Get a list of cod transaction history by admin
 */
export function getCodTransactionHistory(params) {
  return http.request<BasicResponseModel>({
    url: '/finance/cod-cycle/transaction',
    method: 'GET',
    params,
  });
}

/**
 * @description: Get a list of invoice transaction history by admin
 */
export function getCodInvoiceTransactionHistory(params) {
  return http.request<BasicResponseModel>({
    url: '/finance/cod-cycle/invoice-transaction',
    method: 'GET',
    params,
  });
}

/**
 * @description: super admin Delete cod cycle by ID
 */
export function deleteCODRemittance(id) {
  return http.request<BasicResponseModel>({
    url: `/finance/cod-cycle/${id}`,
    method: 'DELETE',
  });
}

/**
 * @description: update COD cycle status by ID
 */
export function updateCodCycleStatus(data) {
  return http.request<BasicResponseModel>({
    url: `/finance/cod-cycle/status-update`,
    method: 'PUT',
    data,
  });
}

/**
 * @description: make COD cycle Transaction by ID
 */
export function makeCodTransactionStatus(data) {
  return http.request<BasicResponseModel>({
    url: `/finance/cod-cycle/transaction`,
    method: 'POST',
    data,
  });
}

/**
 * @description: download Cod Orders CSV by Id
 */
export function downloadCodOrders(id) {
  return httpDownload
    .request({
      url: `/finance/cod-cycle/${id}/download`,
      method: 'GET',
      responseType: 'blob',
    })
    .then((response) => {
      window['$message'].success('Downloading File');
      FileDownload(response.data, 'cod_cycle.csv');
    })
    .catch((response) => {
      window['$message'].error(response.message);
    });
}
