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
 * @description: Get company profile
 */
export function getCompanyProfile() {
  return http.request<BasicResponseModel>({
    url: `/company_profiles`,
    method: 'GET',
  });
}

/**
 * @description: Get company profile
 */
export function getCompanyProfileById(id) {
  return http.request<BasicResponseModel>({
    url: `/company_profiles/${id}`,
    method: 'GET',
  });
}

/**
 * @description: Update company profile
 */
export function updateCompanyProfile(data) {
  return http.request<BasicResponseModel>({
    url: `/company_profiles`,
    method: 'PUT',
    data,
  });
}
/**
 * @description: Update company profile by ID
 */
export function updateCompanyProfileById(id, data) {
  return http.request<BasicResponseModel>({
    url: `/company_profiles/${id}`,
    method: 'PUT',
    data,
  });
}

/**
 * @description: create User company profile Meta Data
 */
export function createUserCompanyProfileMetaData(group: string, data: any[]) {
  return http.request<BasicResponseModel>({
    url: `/company_profiles/meta-data/${group}/`,
    method: 'POST',
    data: {
      meta_data: data,
    },
  });
}

/**
 * @description: create User company profile Meta Data
 */
export function createUserCompanyProfileMetaDataBySuperAdmin(
  group: string,
  merchant_id: string | string[],
  data: any[]
) {
  return http.request<BasicResponseModel>({
    url: `/company_profiles/meta-data/${group}/${merchant_id}`,
    method: 'POST',
    data: {
      meta_data: data,
    },
  });
}

/**
 * @description: get User company profile Meta Data
 */
export function getUserCompanyProfileMetaData(group: string) {
  return http.request<BasicResponseModel>({
    url: `/company_profiles/meta-data/${group}`,
    method: 'GET',
  });
}

/**
 * @description: get User company profile KYC Meta Data by Super admin
 */
export function getUserCompanyProfileKycMetaDataBySuperAdmin(id: string) {
  return http.request<BasicResponseModel>({
    url: `/merchant-kyc-details/${id}`,
    method: 'GET',
  });
}
