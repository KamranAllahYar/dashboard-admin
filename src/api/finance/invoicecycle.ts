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
export function uploadInvoiceCsvFile(data) {
  return http.request<BasicResponseModel>({
    url: `/finance/invoice-cycle`,
    method: 'POST',
    data,
  });
}

/**
 * @description: Get a list of cod_cycles by admin
 */
export function getInvoiceCycleList(params) {
  return http.request<BasicResponseModel>({
    url: '/finance/invoice-cycle',
    method: 'GET',
    params,
  });
}

/**
 * @description: super admin Delete invoice by ID
 */
export function deleteInvoiceCycle(id) {
  return http.request<BasicResponseModel>({
    url: `/finance/invoice-cycle/${id}`,
    method: 'DELETE',
  });
}

/**
 * @description: update Invoiec cycle status by ID
 */
export function updateInvoiceCycleStatus(data) {
  return http.request<BasicResponseModel>({
    url: `/finance/invoice-cycle/status-update`,
    method: 'PUT',
    data,
  });
}

/**
 * @description: Get a invoice_cycle by Id
 */
export function getInvoiceCycleByID(id) {
  return http.request<BasicResponseModel>({
    url: `/finance/invoice-cycle/${id}`,
    method: 'GET',
  });
}

/**
 * @description: download Invoice Orders CSV by Id
 */
export function downloadInvoiceOrders(id) {
  return httpDownload
    .request({
      url: `/finance/invoice-cycle/${id}/download`,
      method: 'GET',
      responseType: 'blob',
    })
    .then((response) => {
      window['$message'].success('Downloading File');
      FileDownload(response.data, 'invoice_cycle.csv');
    })
    .catch((response) => {
      window['$message'].error(response.message);
    });
}

/**
 * @description: make invoice cycle Transaction by ID
 */
export function makeInvoiceTransactionStatus(data) {
  return http.request<BasicResponseModel>({
    url: `/finance/invoice-cycle/transaction`,
    method: 'POST',
    data,
  });
}

/**
 * @description: Get a list of invoice transaction history by admin
 */
export function getInvoiceTransactionHistory(params) {
  return http.request<BasicResponseModel>({
    url: '/finance/invoice-cycle/transaction',
    method: 'GET',
    params,
  });
}
