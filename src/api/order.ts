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
 * @description: create new Order
 */
export function createOrder(data) {
  return http.request<BasicResponseModel>({
    url: `/orders`,
    method: 'POST',
    data,
  });
}

/**
 * @description:  get Orders List
 */
export function orderList(params) {
  return http.request<BasicResponseModel>({
    url: `/orders`,
    method: 'GET',
    params,
  });
}

/**
 * @description:  get Shipment List
 */
export function shipmentsList(params) {
  return http.request<BasicResponseModel>({
    url: `/orders/all-shipments`,
    method: 'GET',
    params,
  });
}

/**
 * @description: download Order Shipments CSV
 */
export function exportOrderShipmentList(params) {
  return httpDownload
    .request({
      url: `/orders/export-order-shipments`,
      method: 'GET',
      responseType: 'blob',
      params,
    })
    .then((response) => {
      window['$message'].success('Downloading File');
      FileDownload(response.data, 'orderShipment.csv');
    })
    .catch((response) => {
      window['$message'].error(response.message);
    });
}

/**
 * @description:  get Order Detail by id
 */
export function orderDetailsByID(id) {
  return http.request<BasicResponseModel>({
    url: `/orders/${id}`,
    method: 'GET',
  });
}

/**
 * @description:  create Order Shipment
 */
export function createOrderShipment(id, data) {
  return http.request<BasicResponseModel>({
    url: `/orders/${id}/shipment`,
    method: 'PUT',
    data,
  });
}

/**
 * @description:  create Shopify Order Fulfillment
 */
export function createShopifyOrderFulfillment(data) {
  return http.request<BasicResponseModel>({
    url: `/order/shopify/fulfillment`,
    method: 'POST',
    data,
  });
}

/**
 * @description:  create bulk shipments
 */
export function createBulkOrderShipments(data, order_ids) {
  return http.request<BasicResponseModel>({
    url: `/assign-bulk-shipments`,
    method: 'POST',
    data,
    params: order_ids,
  });
}

/**
 * @description:  update Order Shipment
 */
export function updateOrderShipment(id, data) {
  return http.request<BasicResponseModel>({
    url: `/orders/${id}/update-shipment`,
    method: 'PUT',
    data,
  });
}
/**
 * @description:  update Order Status
 */
export function updateOrderStatus(data) {
  return http.request<BasicResponseModel>({
    url: `/orders/update-status`,
    method: 'PUT',
    data,
  });
}
/**
 * @description:  update Order Status by shipment ID
 */
export function updateShipmentStatus(data) {
  return http.request<BasicResponseModel>({
    url: `/orders/shipment-update-status`,
    method: 'PUT',
    data,
  });
}
/**
 * @description: Delete order by ID
 */
export function deleteOrder(id) {
  return http.request<BasicResponseModel>({
    url: `/orders/${id}`,
    method: 'DELETE',
  });
}
/**
 * @description: cancel order by ID
 */
export function cancelOrder(id) {
  return http.request<BasicResponseModel>({
    url: `/orders/cancel/${id}`,
    method: 'GET',
  });
}
/**
 * @description:  get Admin Order Statuses
 */
export function getOrderStatus() {
  return http.request<BasicResponseModel>({
    url: `/orders/statuses`,
    method: 'GET',
  });
}
/**
 * @description:  update Admin Order Status Masking
 */
export function updateOrderStatusMasking(status, data) {
  return http.request<BasicResponseModel>({
    url: `/orders/statuses/${status}`,
    method: 'PUT',
    data,
  });
}

/**
 * @description: upload bulk order statuses csv file by super Admin
 */
export function uploadCSVBulkOrderStatuses(data) {
  return http.request<BasicResponseModel>({
    url: `/bulk-order-statuses`,
    method: 'PUT',
    data,
  });
}
/**
 * @description: upload bulk order shipments csv file by Admin
 */
export function uploadCSVBulkOrderShipments(data) {
  return http.request<BasicResponseModel>({
    url: `/bulk-order-shipments`,
    method: 'PUT',
    data,
  });
}
/**
 * @description: upload bulk orders csv file by Admin
 */
export function uploadCSVBulkOrders(data) {
  return http.request<BasicResponseModel>({
    url: `/create-bulk-orders`,
    method: 'PUT',
    timeout: 0,
    data,
  });
}
