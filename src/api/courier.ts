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
 * @description: create new Courier
 */
export function createNewCourier(data) {
  return http.request<BasicResponseModel>({
    url: `/couriers`,
    method: 'POST',
    data,
  });
}
/**
 * @description: update Courier by id
 */
export function updateCourierById(id, data) {
  return http.request<BasicResponseModel>({
    url: `/couriers/${id}`,
    method: 'PUT',
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
 * @description: Get a list of couriers
 */
export function courierList(params) {
  return http.request<BasicResponseModel>({
    url: '/couriers',
    method: 'GET',
    params,
  });
}
/**
 * @description: Get a list of couriers
 */
export function courierByID(id) {
  return http.request<BasicResponseModel>({
    url: `/couriers/${id}`,
    method: 'GET',
  });
}
/**
 * @description: Get a list of couriers
 */
export function courierChargesList(params) {
  return http.request<BasicResponseModel>({
    url: '/couriers/charges',
    method: 'GET',
    params,
  });
}

/**
 * @description: Delete courier by ID
 */
export function deleteCourier(id) {
  return http.request<BasicResponseModel>({
    url: `/couriers/${id}`,
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
 * @description: get details of merchant courier by ID
 */
export function getMerchantCourierDetail(id) {
  return http.request<BasicResponseModel>({
    url: `/couriers/${id}/merchant`,
    method: 'GET',
  });
}
/**
 * @description: Get a list of courier Cities by courier id
 */
export function courierCitiesList(params) {
  return http.request<BasicResponseModel>({
    url: '/courier/get-cities',
    method: 'GET',
    params,
  });
}
/**
 * @description: Get a list of courier Cities TAT by courier id
 */
export function courierCitiesTatList(params) {
  return http.request<BasicResponseModel>({
    url: '/couriers/cities-tat/list',
    method: 'GET',
    params,
  });
}
/**
 * @description: Get a list of Mapped courier Cities
 */
export function courierMappedCitiesList(params) {
  return http.request<BasicResponseModel>({
    url: '/couriers/map-cities',
    method: 'GET',
    params,
  });
}
/**
 * @description: Get a list of Mapped courier Cities of weship
 */
export function weshipMappedCitiesList(params) {
  return http.request<BasicResponseModel>({
    url: '/couriers/map-cities/weship',
    method: 'GET',
    params,
  });
}
/**
 * @description: create courier map city
 */
export function postMapCity(data) {
  return http.request<BasicResponseModel>({
    url: '/couriers/map-cities',
    method: 'POST',
    data,
  });
}
/**
 * @description: update courier Cities TAT
 */
export function updateCitiesTatList() {
  return http.request<BasicResponseModel>({
    url: '/couriers/cities-tat/update',
    method: 'GET',
  });
}
/**
 * @description: Get a list of zones
 */
export function getZonesList() {
  return http.request<BasicResponseModel>({
    url: `/courier/get-zones`,
    method: 'GET',
  });
}

/**
 * @description: create courier city mapping
 */
export function createCourierCityMapping(data) {
  return http.request<BasicResponseModel>({
    url: `/courier/city-mapping`,
    method: 'POST',
    data,
  });
}

/**
 * @description: create Zone
 */
export function createZone(data) {
  return http.request<BasicResponseModel>({
    url: `/courier/create-zone`,
    method: 'POST',
    data,
  });
}
/**
 * @description: create Courier Zone Masking
 */
export function createCourierZoneMasking(data) {
  return http.request<BasicResponseModel>({
    url: `/courier/zone-masking`,
    method: 'POST',
    data,
  });
}
/**
 * @description: get Courier Zone Maskings
 */
export function getCourierZoneMaskingList() {
  return http.request<BasicResponseModel>({
    url: `/courier/zone-masking`,
    method: 'get',
  });
}
/**
 * @description: get Courier Zone Maskings by Courier Id
 */
export function getCourierZoneMaskingListByCourierId(id) {
  return http.request<BasicResponseModel>({
    url: `/courier/courier-zone-masking/${id}`,
    method: 'get',
  });
}
/**
 * @description: delete Zone by ID
 */
export function deleteZone(id) {
  return http.request<BasicResponseModel>({
    url: `/courier/delete-zone/${id}`,
    method: 'DELETE',
  });
}
/**
 * @description: delete Courier Zone Masking by ID
 */
export function deleteCourierZoneMasking(id) {
  return http.request<BasicResponseModel>({
    url: `/courier/zone-masking/${id}`,
    method: 'DELETE',
  });
}
/**
 * @description: Get a list of areas for Call Courier
 */
export function areaListbyCallCourier(params) {
  return http.request<BasicResponseModel>({
    url: `/couriers/call-courier/areas`,
    method: 'GET',
    params,
  });
}

/**
 * @description: Get a list of courier rate card slabs
 */
export function getCourierRateCardSlabs(params) {
  return http.request<BasicResponseModel>({
    url: `/couriers/rate-slabs`,
    method: 'GET',
    params,
  });
}
/**
 * @description: Delete Rate Card slab by id
 */
export function deleteCourierRateCardSlabById(id) {
  return http.request<BasicResponseModel>({
    url: `/couriers/rate-slabs/${id}`,
    method: 'DELETE',
  });
}
/**
 * @description: Get a list of courier rate cards
 */
export function getCourierRateCards(params) {
  return http.request<BasicResponseModel>({
    url: `/couriers/rate-card`,
    method: 'GET',
    params,
  });
}
/**
 * @description: create courier Rate Card
 */
export function createCourierRateCard(data) {
  return http.request<BasicResponseModel>({
    url: `/couriers/rate-card`,
    method: 'POST',
    data,
  });
}
/**
 * @description: update courier Rate Card
 */
export function updateCourierRateCard(data, id) {
  return http.request<BasicResponseModel>({
    url: `/couriers/rate-card/${id}`,
    method: 'PUT',
    data,
  });
}
/**
 * @description: Delete Rate Card by id
 */
export function deleteCourierRateCardById(id) {
  return http.request<BasicResponseModel>({
    url: `/couriers/rate-card/${id}`,
    method: 'DELETE',
  });
}
/**
 * @description: create Rate Card slab
 */
export function createCourierRateCardSlab(data) {
  return http.request<BasicResponseModel>({
    url: `/couriers/rate-slabs`,
    method: 'POST',
    data,
  });
}
