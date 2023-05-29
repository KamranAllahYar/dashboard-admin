<template>
  <n-space :vertical="true">
    <n-space>
      <p
        style="
          font-size: 20px;
          line-height: 140%;
          font-weight: bold;
          color: rgb(0, 81, 191);
          margin-bottom: 20px;
          letter-spacing: 0.2px;
        "
        >Complete KYC Verification</p
      >
      <p
        v-if="+kycForm.kyc_verified.value === 1"
        style="
          font-size: 20px;
          line-height: 140%;
          font-weight: bold;
          color: rgb(25, 135, 11);
          margin-bottom: 20px;
          letter-spacing: 0.2px;
        "
        >SUCCESS</p
      >
    </n-space>
    <n-alert v-if="+kycForm.kyc_verified.value === 1" type="success">
      Congratulation ! Your KYC verification is done, now you can start placing your orders
    </n-alert>
    <!--    <n-card style="border-radius: 10px; background-color: rgb(245, 249, 255)">-->
    <!--      <n-space justify="space-between">-->
    <!--        <n-space :vertical="true">-->
    <!--          <p style="font-weight: 700"> Do you have NTN Number for your Business ? </p>-->
    <!--          <n-space>-->
    <!--            <n-radio :checked="checkNTN === 'yes'" value="yes" @change="handleNTNChange">-->
    <!--              Yes, I have NTN-->
    <!--            </n-radio>-->
    <!--            <n-radio :checked="checkNTN === 'no'" value="no" @change="handleNTNChange">-->
    <!--              No, I don't have-->
    <!--            </n-radio>-->
    <!--          </n-space>-->
    <!--        </n-space>-->
    <!--      </n-space>-->
    <!--    </n-card>-->
    <n-grid cols="7 s:1 m:7 l:7 xl:7" responsive="screen">
      <n-grid-item span="2">
        <n-card style="border-radius: 10px; background-color: rgb(245, 249, 255); height: 500px">
          <p
            style="
              font-size: 20px;
              font-weight: bold;
              color: rgb(38, 63, 151);
              margin-bottom: 20px;
              letter-spacing: 0.2px;
            "
            >KYC Process</p
          >
          <n-space :vertical="true">
            <n-space>
              <n-icon style="margin-right: 10px">
                <svg
                  style="width: 25px; height: 25px"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M3 21h18" />
                    <path d="M4 21V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v15" />
                    <path d="M9 21v-8a3 3 0 0 1 6 0v8" />
                  </g>
                </svg>
              </n-icon>

              <p style="margin-top: 7px; font-weight: bold">Company Type</p>
            </n-space>
            <n-space>
              <n-icon style="margin-right: 10px">
                <svg
                  style="width: 25px; height: 25px"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 32 32"
                >
                  <path
                    d="M28 6v20H4V6h24m0-2H4a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"
                    fill="currentColor"
                  />
                  <path d="M6 10h7v2H6z" fill="currentColor" />
                  <path d="M6 14h4v2H6z" fill="currentColor" />
                  <path
                    d="M23 18h-6a3 3 0 0 0-3 3v2h2v-2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2h2v-2a3 3 0 0 0-3-3z"
                    fill="currentColor"
                  />
                  <path
                    d="M20 17a4 4 0 1 0-4-4a4 4 0 0 0 4 4zm0-6a2 2 0 1 1-2 2a2 2 0 0 1 2-2z"
                    fill="currentColor"
                  />
                </svg>
              </n-icon>
              <p style="margin-top: 7px; font-weight: bold">CNIC</p>
            </n-space>
            <n-space>
              <n-icon style="margin-right: 10px">
                <svg
                  style="width: 25px; height: 25px"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 24 24"
                >
                  <g fill="none">
                    <path
                      d="M6.75 8a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5h-4.5zM6 11.75a.75.75 0 0 1 .75-.75h8.5a.75.75 0 0 1 0 1.5h-8.5a.75.75 0 0 1-.75-.75zM6.75 14a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5h-6.5zm-2-10A2.75 2.75 0 0 0 2 6.75v10.5A2.75 2.75 0 0 0 4.75 20h14.5A2.75 2.75 0 0 0 22 17.25V6.75A2.75 2.75 0 0 0 19.25 4H4.75zM3.5 6.75c0-.69.56-1.25 1.25-1.25h14.5c.69 0 1.25.56 1.25 1.25v10.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25V6.75z"
                      fill="currentColor"
                    />
                  </g>
                </svg>
              </n-icon>
              <p style="margin-top: 7px; font-weight: bold">NTN Details</p>
            </n-space>
            <n-space>
              <n-icon style="margin-right: 10px">
                <svg
                  style="width: 25px; height: 25px"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 24 24"
                >
                  <g fill="none">
                    <path
                      d="M13 6.25a1 1 0 1 1-2 0a1 1 0 0 1 2 0zm.032-3.925a1.75 1.75 0 0 0-2.064 0L3.547 7.74c-.978.713-.473 2.26.736 2.26H4.5v5.8A2.75 2.75 0 0 0 3 18.25v1.5c0 .413.336.75.75.75h16.5a.75.75 0 0 0 .75-.75v-1.5a2.75 2.75 0 0 0-1.5-2.45V10h.217c1.21 0 1.713-1.547.736-2.26l-7.421-5.416zm-1.18 1.211a.25.25 0 0 1 .295 0L18.95 8.5H5.05l6.803-4.964zM18 10v5.5h-2V10h2zm-3.5 0v5.5h-1.75V10h1.75zm-3.25 0v5.5H9.5V10h1.75zm-5.5 7h12.5c.69 0 1.25.56 1.25 1.25V19h-15v-.75c0-.69.56-1.25 1.25-1.25zM6 15.5V10h2v5.5H6z"
                      fill="currentColor"
                    />
                  </g>
                </svg>
              </n-icon>
              <p style="margin-top: 7px; font-weight: bold">Bank Details</p>
            </n-space>
          </n-space>
          <!--          <n-steps vertical :current="currentStep" :status="currentStatus">-->
          <!--            <n-step title="Company Type" />-->
          <!--            <n-step title="CNIC" />-->
          <!--            <n-step title="NTN Details" />-->
          <!--            <n-step title="Bank Details" />-->
          <!--          </n-steps>-->
        </n-card>
      </n-grid-item>
      <n-grid-item span="5">
        <n-scrollbar style="max-height: 500px">
          <n-space :vertical="true" style="margin-left: 30px">
            <n-alert type="info">
              Note: All the uploaded documents should belong to the same person
            </n-alert>
            <n-space style="margin-top: 10px">
              <n-avatar round size="small" style="color: #000e1c; font-weight: bold"> 1 </n-avatar>
              <p style="font-weight: 700; margin-top: 3px"> Company Type </p>
            </n-space>
            <n-space>
              <n-button
                round
                :type="individualButtonType"
                @click="companyTypeHandleChange('individual')"
              >
                <template #icon>
                  <n-icon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 32 32"
                    >
                      <path
                        d="M12 4a5 5 0 1 1-5 5a5 5 0 0 1 5-5m0-2a7 7 0 1 0 7 7a7 7 0 0 0-7-7z"
                        fill="currentColor"
                      />
                      <path
                        d="M22 30h-2v-5a5 5 0 0 0-5-5H9a5 5 0 0 0-5 5v5H2v-5a7 7 0 0 1 7-7h6a7 7 0 0 1 7 7z"
                        fill="currentColor"
                      />
                      <path d="M22 4h10v2H22z" fill="currentColor" />
                      <path d="M22 9h10v2H22z" fill="currentColor" />
                      <path d="M22 14h7v2h-7z" fill="currentColor" />
                    </svg>
                  </n-icon>
                </template>
                Individual
              </n-button>
              <n-button
                round
                :type="enterpriseButtonType"
                @click="companyTypeHandleChange('small_enterprise')"
              >
                <template #icon>
                  <n-icon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 28 28"
                    >
                      <g fill="none">
                        <path
                          d="M14 9a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3zm.89-6.705a1.5 1.5 0 0 0-1.78 0L3.61 9.3c-1.164.859-.557 2.707.89 2.707H5v7.242a3.25 3.25 0 0 0-2 3.001v1.5c0 .414.336.75.75.75h20.5a.75.75 0 0 0 .75-.75v-1.5a3.25 3.25 0 0 0-2-3v-7.243h.499c1.448 0 2.055-1.848.89-2.707L14.89 2.295zM6.5 19v-6.993H9V19H6.5zm15-6.993V19H19v-6.993h2.5zm-4 0V19h-2.75v-6.993h2.75zm-4.25 0V19H10.5v-6.993h2.75zm-8.75-1.5L14 3.502l9.499 7.005H4.5zm0 11.743c0-.966.784-1.75 1.75-1.75h15.5c.966 0 1.75.784 1.75 1.75V23h-19v-.75z"
                          fill="currentColor"
                        />
                      </g>
                    </svg>
                  </n-icon>
                </template>
                Small Enterprise
              </n-button>
            </n-space>
            <n-divider />
            <n-grid cols="5 s:1 m:5 l:5 xl:5" responsive="screen">
              <n-grid-item span="3">
                <n-space :vertical="true">
                  <n-space>
                    <n-avatar round size="small" style="color: #000e1c; font-weight: bold">
                      2
                    </n-avatar>
                    <p style="font-weight: 700; margin-top: 3px"> CNIC Details </p>
                  </n-space>
                  <n-form ref="cnicDetailsFormRef" :model="kycForm" :rules="rules">
                    <n-form-item path="cnic_name" label="CNIC Name" class="formInputLabelStyle">
                      <n-input
                        round
                        size="medium"
                        v-model:value="kycForm.cnic_name.value"
                        placeholder=""
                      />
                    </n-form-item>
                    <n-form-item path="cnic_number" label="CNIC Number" class="formInputLabelStyle">
                      <n-input
                        round
                        size="medium"
                        v-model:value="kycForm.cnic_number.value"
                        placeholder=""
                      />
                    </n-form-item>
                  </n-form>
                </n-space>
              </n-grid-item>
              <n-grid-item span="2">
                <n-space justify="center">
                  <n-space :vertical="true">
                    <p style="font-weight: 700">CNIC Front</p>
                    <n-image v-if="cnicFrontUrl" :src="cnicFrontUrl" width="80" />
                    <n-upload
                      v-else
                      action="/api/media/upload_image_s3"
                      list-type="image-card"
                      :max="1"
                      @finish="onResponseCnicFront"
                    >
                      Click to Upload
                    </n-upload>
                  </n-space>
                  <n-space :vertical="true">
                    <p style="font-weight: 700">CNIC Back</p>
                    <n-image v-if="cnicBackUrl" :src="cnicBackUrl" width="80" />
                    <n-upload
                      v-else
                      action="/api/media/upload_image_s3"
                      list-type="image-card"
                      :max="1"
                      @finish="onResponseCnicBack"
                    >
                      Click to Upload
                    </n-upload>
                  </n-space>
                </n-space>
              </n-grid-item>
            </n-grid>
            <n-divider />
            <n-grid cols="5 s:1 m:5 l:5 xl:5" responsive="screen">
              <n-grid-item span="3">
                <n-space :vertical="true">
                  <n-space>
                    <n-avatar round size="small" style="color: #000e1c; font-weight: bold">
                      3
                    </n-avatar>
                    <p style="font-weight: 700; margin-top: 3px"> NTN Details </p>
                  </n-space>
                  <n-form ref="ntnDetailsFormRef" :model="kycForm" :rules="rules">
                    <n-form-item
                      path="ntn_legal_name"
                      label="Legal Name"
                      class="formInputLabelStyle"
                    >
                      <n-input
                        round
                        size="medium"
                        v-model:value="kycForm.ntn_legal_name.value"
                        placeholder=""
                      />
                    </n-form-item>
                    <n-form-item path="pan_number" label="NTN Number" class="formInputLabelStyle">
                      <n-input
                        round
                        size="medium"
                        v-model:value="kycForm.ntn_number.value"
                        placeholder=""
                      />
                    </n-form-item>
                  </n-form>
                </n-space>
              </n-grid-item>
              <n-grid-item span="2">
                <n-space justify="center">
                  <n-space :vertical="true">
                    <p style="font-weight: 700">Upload file</p>
                    <n-image v-if="ntnFileUrl" :src="ntnFileUrl" width="80" />
                    <n-upload
                      v-else
                      action="/api/media/upload_image_s3"
                      list-type="image-card"
                      :max="1"
                      @finish="onResponseNTNFile"
                    >
                      Click to Upload
                    </n-upload>
                  </n-space>
                </n-space>
              </n-grid-item>
            </n-grid>
            <n-divider />
            <n-grid cols="5 s:1 m:5 l:5 xl:5" responsive="screen">
              <n-grid-item span="3">
                <n-space :vertical="true">
                  <n-space>
                    <n-avatar round size="small" style="color: #000e1c; font-weight: bold">
                      4
                    </n-avatar>
                    <p style="font-weight: 700; margin-top: 3px"> Bank Details (Optional) </p>
                  </n-space>
                  <n-form ref="bankDetailsFormRef" :model="kycForm" :rules="rules">
                    <n-form-item
                      path="account_holder_name"
                      label="Account Holder Name"
                      class="formInputLabelStyle"
                    >
                      <n-input
                        round
                        size="medium"
                        v-model:value="kycForm.account_holder_name.value"
                        placeholder=""
                      />
                    </n-form-item>
                    <n-form-item label="Bank Name" class="formInputLabelStyle">
                      <n-input
                        round
                        size="medium"
                        v-model:value="kycForm.bank_name.value"
                        placeholder=""
                      />
                    </n-form-item>
                    <n-form-item label="Account Number" class="formInputLabelStyle">
                      <n-input
                        round
                        size="medium"
                        v-model:value="kycForm.account_number.value"
                        placeholder=""
                      />
                    </n-form-item>
                    <n-form-item label="IFSC Code" class="formInputLabelStyle">
                      <n-input
                        round
                        size="medium"
                        v-model:value="kycForm.ifsc_code.value"
                        placeholder=""
                      />
                    </n-form-item>

                    <!--                    <n-button round type="info"> Submit Bank Details </n-button>-->
                  </n-form>
                </n-space>
              </n-grid-item>
              <n-grid-item span="2">
                <n-space justify="center">
                  <n-space :vertical="true">
                    <p style="font-weight: 700">Upload file</p>
                    <n-image v-if="bankDocumentUrl" :src="bankDocumentUrl" width="80" />
                    <n-upload
                      v-else
                      action="/api/media/upload_image_s3"
                      list-type="image-card"
                      :max="1"
                      @finish="onResponseBankChequeFile"
                    >
                      Click to Upload
                    </n-upload>
                  </n-space>
                </n-space>
              </n-grid-item>
            </n-grid>
            <n-divider />
            <n-space v-if="isSuperAdmin" style="margin-bottom: 10px">
              <p style="font-weight: 700">Verify KYC Details</p>
              <n-switch
                v-model:value="kycForm.kyc_verified.value"
                checked-value="1"
                unchecked-value="0"
              />
            </n-space>
            <n-button round type="success" @click="submitKycDetails"> Submit </n-button>
          </n-space>
        </n-scrollbar>
      </n-grid-item>
    </n-grid>
  </n-space>
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { UploadFileInfo, useMessage } from 'naive-ui';
  import { useBucketUrl } from '@/hooks/useBucketUrl';
  import {
    createUserCompanyProfileMetaData,
    getUserCompanyProfileKycMetaDataBySuperAdmin,
    getUserCompanyProfileMetaData,
  } from '@/api/settings/companyprofile';
  import { useUserStore } from '@/store/modules/user';

  const userStore = useUserStore();
  const isSuperAdmin = ref(false);
  const individualButtonType = ref('default');
  const enterpriseButtonType = ref('default');
  const Loading = window['$loading'] || null;
  const message = useMessage();
  const { s3Url } = useBucketUrl();
  const kycForm: any = ref({
    company_type: {
      value: null,
      is_active: true,
    },
    cnic_name: {
      value: null,
      is_active: true,
    },
    cnic_number: {
      value: null,
      is_active: true,
    },
    cnic_front: {
      value: null,
      is_active: true,
    },
    cnic_back: {
      value: null,
      is_active: true,
    },
    ntn_legal_name: {
      value: null,
      is_active: true,
    },
    ntn_number: {
      value: null,
      is_active: true,
    },
    ntn_file: {
      value: null,
      is_active: true,
    },
    account_holder_name: {
      value: null,
      is_active: true,
    },
    bank_name: {
      value: null,
      is_active: true,
    },
    bank_document_file: {
      value: null,
      is_active: true,
    },
    account_number: {
      value: null,
      is_active: true,
    },
    ifsc_code: {
      value: null,
      is_active: true,
    },
    kyc_verified: {
      value: null,
      is_active: true,
    },
  });
  const rules = [];
  const cnicFrontUrl = ref(null);
  const cnicBackUrl = ref(null);
  const ntnFileUrl = ref(null);
  const bankDocumentUrl = ref(null);
  const isKYCDetailsSaved = ref(false);
  const props = defineProps({
    id: {
      type: Number,
    },
  });
  onMounted(() => {
    checkUserRole();
    if (props.id) {
      getUserCompanyProfileKycMetaDataBySuperAdmin(props.id.toString())
        .then(({ result }) => {
          if (!result) {
            isKYCDetailsSaved.value = false;
          }
          for (const key in result) {
            isKYCDetailsSaved.value = true;
            if (key === 'company_type') {
              if (result[key].value === 'individual') {
                individualButtonType.value = 'success';
                enterpriseButtonType.value = 'default';
              } else if (result[key].value === 'enterprise') {
                individualButtonType.value = 'default';
                enterpriseButtonType.value = 'success';
              } else {
                individualButtonType.value = 'default';
                enterpriseButtonType.value = 'default';
              }
            } else if (key === 'cnic_front') {
              cnicFrontUrl.value = s3Url(result[key].value);
            } else if (key === 'cnic_back') {
              cnicBackUrl.value = s3Url(result[key].value);
            } else if (key === 'ntn_file') {
              ntnFileUrl.value = s3Url(result[key].value);
            } else if (key === 'bank_document_file') {
              bankDocumentUrl.value = s3Url(result[key].value);
            }
            kycForm.value[key].value = result[key].value ? result[key].value : null;
            kycForm.value[key].is_active = result[key].is_active == 1;
            kycForm.value[key].id = result[key].id;
          }
          Loading.finish();
        })
        .catch((result) => {
          message.error(result);
          Loading.finish();
        });
    } else {
      getUserCompanyProfileMetaData('kyc_details')
        .then(({ result }) => {
          if (!result) {
            isKYCDetailsSaved.value = false;
          }
          for (const key in result) {
            isKYCDetailsSaved.value = true;
            if (key === 'company_type') {
              if (result[key].value === 'individual') {
                individualButtonType.value = 'success';
                enterpriseButtonType.value = 'default';
              } else if (result[key].value === 'enterprise') {
                individualButtonType.value = 'default';
                enterpriseButtonType.value = 'success';
              } else {
                individualButtonType.value = 'default';
                enterpriseButtonType.value = 'default';
              }
            } else if (key === 'cnic_front') {
              cnicFrontUrl.value = s3Url(result[key].value);
            } else if (key === 'cnic_back') {
              cnicBackUrl.value = s3Url(result[key].value);
            } else if (key === 'ntn_file') {
              ntnFileUrl.value = s3Url(result[key].value);
            } else if (key === 'bank_document_file') {
              bankDocumentUrl.value = s3Url(result[key].value);
            }
            kycForm.value[key].value = result[key].value ? result[key].value : null;
            kycForm.value[key].is_active = result[key].is_active == 1;
            kycForm.value[key].id = result[key].id;
          }
          Loading.finish();
        })
        .catch((result) => {
          message.error(result);
          Loading.finish();
        });
    }
  });

  const onResponseCnicFront = (options: { file: UploadFileInfo; event?: any }) => {
    const response = JSON.parse(options.event?.target?.response);
    kycForm.value.cnic_front.value = s3Url(response.data.path);
  };
  const onResponseCnicBack = (options: { file: UploadFileInfo; event?: any }) => {
    const response = JSON.parse(options.event?.target?.response);
    kycForm.value.cnic_back.value = s3Url(response.data.path);
  };
  const onResponseNTNFile = (options: { file: UploadFileInfo; event?: any }) => {
    const response = JSON.parse(options.event?.target?.response);
    kycForm.value.ntn_file.value = s3Url(response.data.path);
  };
  const onResponseBankChequeFile = (options: { file: UploadFileInfo; event?: any }) => {
    const response = JSON.parse(options.event?.target?.response);
    kycForm.value.bank_document_file.value = s3Url(response.data.path);
  };
  // function handleNTNChange(e: Event) {
  //   checkNTN.value = (e.target as HTMLInputElement).value;
  // }
  function companyTypeHandleChange(company) {
    if (company === 'individual') {
      individualButtonType.value = 'success';
      enterpriseButtonType.value = 'default';
    } else {
      individualButtonType.value = 'default';
      enterpriseButtonType.value = 'success';
    }

    kycForm.value.company_type.value = company;
  }

  function submitKycDetails() {
    Loading.start();
    let data: any = [];
    for (const key in kycForm.value) {
      data.push({
        key,
        value: kycForm.value[key].value ? kycForm.value[key].value.toString() : null,
        id: kycForm.value[key].id,
        is_active: kycForm.value[key].is_active,
      });
    }
    // console.log(data);
    createUserCompanyProfileMetaData('kyc_details', data)
      .then(({ result }) => {
        window['$message'].success(result.message);
        Loading.finish();
      })
      .catch(({ result }) => {
        message.error(result.message);
        Loading.finish();
      });
  }
  function checkUserRole() {
    let i = 0;
    let roles = userStore.getRoles;
    while (i < roles.length) {
      if (roles[i] === 'super admin') {
        isSuperAdmin.value = true;
      }
      i++;
    }
  }
</script>
<style>
  .formInputLabelStyle {
    font-weight: bold;
  }
</style>
