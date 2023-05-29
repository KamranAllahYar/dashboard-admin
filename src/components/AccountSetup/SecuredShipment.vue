<template>
  <n-space :vertical="true" style="gap: 0 0">
    <n-h1>Secured Shipment</n-h1>
    <n-alert
      v-if="!isSecureShipmentSaved"
      type="warning"
      style="font-weight: bold; font-size: 14px; margin-top: 10px; margin-bottom: 10px"
    >
      Please fill the basic details to active secure shipment
    </n-alert>
    <n-grid cols="5 s:1 m:5 l:5 xl:5" responsive="screen">
      <n-grid-item span="3">
        <n-card
          style="
            border-radius: 10px;
            background-color: rgb(245, 249, 255);
            margin-top: 10px;
            margin-bottom: 10px;
          "
        >
          <n-space :vertical="true">
            <n-space justify="space-between">
              <n-space>
                <img
                  src="https://d10srchmli830n.cloudfront.net/1663240730946_04e00494-05db-4731-999b-e0b10fd0335c_Group-1116600426.svg"
                />
                <p
                  style="
                    font-weight: bold;
                    font-size: 16px;
                    line-height: 36px;
                    letter-spacing: -0.03em;
                    margin: 0px;
                  "
                >
                  Automatically secure all eligible shipments
                </p>
              </n-space>
              <n-switch
                :disabled="!isSecureShipmentSaved"
                v-model:value="formValue.status"
                :checked-value="1"
                :unchecked-value="0"
                @update:value="secureShipmentStatusUpdate"
              />
            </n-space>
            <p
              style="
                font-size: 12px;
                color: rgb(0, 38, 89);
                font-weight: 400;
                opacity: 0.8;
                margin-bottom: 6px;
                margin-top: 25px;
              "
            >
              Turn on to automatically secure all shipments with invoice value greater than Rs.5000
            </p>
            <p style="color: rgb(0, 81, 191); text-decoration: underline">
              Terms & Condition applied*
            </p>
          </n-space>
        </n-card>
        <p
          style="
            font-weight: bold;
            font-size: 16px;
            line-height: 36px;
            letter-spacing: -0.03em;
            margin-top: 10px;
          "
        >
          Basic Details
        </p>
        <p style="font-weight: 400; font-size: 12px; letter-spacing: -0.03em">
          Enter your correct details to claim the secured amount.
        </p>
        <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules" size="small">
          <n-grid cols="2 s:1 m:2 l:2 xl:2" responsive="screen">
            <n-grid-item>
              <n-form-item
                style="margin-left: 5px; margin-right: 5px; padding-top: 24px"
                label="First Name"
                path="first_name"
              >
                <n-input v-model:value="formValue.first_name" placeholder="First Name" />
              </n-form-item>
            </n-grid-item>
            <n-grid-item>
              <n-form-item
                style="margin-left: 5px; margin-right: 5px; padding-top: 24px"
                label="Last Name"
                path="last_name"
              >
                <n-input v-model:value="formValue.last_name" placeholder="Last Name" />
              </n-form-item>
            </n-grid-item>
            <n-grid-item>
              <n-form-item
                style="margin-left: 5px; margin-right: 5px; padding-top: 24px"
                label="Phone Number"
                path="phone"
              >
                <n-input v-model:value="formValue.phone" placeholder="Phone Number" />
              </n-form-item>
            </n-grid-item>
            <n-grid-item>
              <n-form-item
                style="margin-left: 5px; margin-right: 5px; padding-top: 24px"
                label="Email Address"
                path="email"
              >
                <n-input v-model:value="formValue.email" placeholder="Email Address" />
              </n-form-item>
            </n-grid-item>
            <n-grid-item span="2">
              <n-form-item
                style="margin-left: 5px; margin-right: 5px; padding-top: 24px"
                label="Seller Address"
                path="seller_address"
              >
                <n-input v-model:value="formValue.seller_address" placeholder="Seller Address" />
              </n-form-item>
            </n-grid-item>
            <n-grid-item>
              <n-form-item
                style="margin-left: 5px; margin-right: 5px; padding-top: 24px"
                label="Landmark"
              >
                <n-input v-model:value="formValue.landmark" placeholder="Landmark" />
              </n-form-item>
            </n-grid-item>
            <n-grid-item>
              <n-form-item
                style="margin-left: 5px; margin-right: 5px; padding-top: 24px"
                label="Zipcode"
                path="zipcode"
              >
                <n-input v-model:value="formValue.zipcode" placeholder="Zipcode" />
              </n-form-item>
            </n-grid-item>
            <n-grid-item>
              <n-form-item
                style="margin-left: 5px; margin-right: 5px; padding-top: 24px"
                label="City"
                path="city"
              >
                <n-input v-model:value="formValue.city" placeholder="City" />
              </n-form-item>
            </n-grid-item>
            <n-grid-item>
              <n-form-item
                style="margin-left: 5px; margin-right: 5px; padding-top: 24px"
                label="State"
                path="state"
              >
                <n-input v-model:value="formValue.state" placeholder="State" />
              </n-form-item>
            </n-grid-item>
            <n-grid-item span="2">
              <n-checkbox
                :default-checked="formValue.term_condition"
                :checked-value="1"
                :unchecked-value="0"
                v-model:checked="formValue.term_condition"
                size="medium"
                style="font-size: 12px"
                label="By checking this box, you are confirming that you have read, understood and agree to the Terms and Conditions"
              />
            </n-grid-item>
            <n-grid-item span="2">
              <n-space justify="center">
                <n-button
                  strong
                  secondary
                  round
                  type="primary"
                  style="font-weight: bold"
                  :disabled="!formValue.term_condition"
                  @click="createNewSecureShipment"
                >
                  Save
                </n-button>
                <n-button
                  strong
                  secondary
                  round
                  type="warning"
                  style="font-weight: bold"
                  @click="resetButton"
                >
                  Reset
                </n-button>
              </n-space>
            </n-grid-item>
          </n-grid>
        </n-form>
      </n-grid-item>
      <n-grid-item span="2">
        <n-space
          :vertical="true"
          style="margin-left: 20px; height: 600px; margin-right: 20px"
          justify="space-between"
        >
          <n-space :vertical="true">
            <p
              style="
                font-weight: bold;
                font-size: 16px;
                line-height: 36px;
                letter-spacing: -0.03em;
                color: rgb(0, 38, 89);
                margin: 0px;
              "
            >
              What is Secure Shipment ?
            </p>
            <p
              style="
                color: rgb(0, 38, 89);
                font-weight: 400;
                opacity: 0.8;
                font-size: 12px;
                margin-bottom: 10px;
              "
            >
              You can secure forward shipment via WeShip’s dashboard in case of order with invoice
              value greater than Rs. 5000
            </p>
            <img
              src="https://d10srchmli830n.cloudfront.net/1663247055788_194ea231-2a1f-4eba-aacc-1b6d30f5d11c_Group-1116600986.svg"
            />
            <img
              src="https://d10srchmli830n.cloudfront.net/1663247167914_1c5d3644-355f-461b-bfcc-8ee6a48258c0_Group-1116600985.svg"
            />
          </n-space>

          <img
            src="https://d10srchmli830n.cloudfront.net/1663320279871_e4e91820-3bb6-4234-a291-f85aaa72ceba_Group-1116600984.svg"
          />
        </n-space>
      </n-grid-item>
    </n-grid>
  </n-space>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { FormItemRule, FormInst, useMessage } from 'naive-ui';
  import { ResultEnum } from '@/enums/httpEnum';
  import {
    createSecureShipment,
    deleteSecureShipment,
    getSecureShipment,
    updateSecureShipment,
  } from '@/api/secureshipment';

  const message = useMessage();
  const formRef = ref<FormInst | null>(null);
  const formValue: any = ref({
    term_condition: false,
  });
  const rules = ref({
    first_name: {
      required: true,
      message: 'Please enter first name',
      trigger: 'blur',
    },
    contact_name: {
      required: true,
      message: 'Please enter contact name',
      trigger: 'blur',
    },
    email: {
      required: true,
      trigger: ['blur', 'input'],
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('Email is required');
        } else if (
          !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            value
          )
        ) {
          return new Error('Email is not valid');
        }
        return true;
      },
    },
    phone: {
      required: true,
      trigger: ['blur', 'input'],
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('Phone is required');
        } else if (!/^\d*$/.test(value)) {
          return new Error('Phone should be an integer');
        } else if (!/^\d{11}$/.test(value)) {
          return new Error('Number must be 11 digits');
        }
        return true;
      },
    },
    seller_address: {
      required: true,
      message: 'Please enter seller address',
      trigger: 'blur',
    },
    city: {
      required: true,
      message: 'Please enter city',
      trigger: 'blur',
    },
    state: {
      required: true,
      message: 'Please enter state',
      trigger: 'blur',
    },
    zipcode: {
      required: true,
      message: 'Please enter zipcode',
      trigger: 'blur',
    },
  });
  const isSecureShipmentSaved = ref(false);

  getSecureShipment().then(({ result }) => {
    if (result.data.id) {
      isSecureShipmentSaved.value = true;
      formValue.value = result.data;
    } else {
      isSecureShipmentSaved.value = false;
    }
  });

  function createNewSecureShipment() {
    if (formValue.value.id) {
      update();
    } else {
      formRef.value?.validate((error) => {
        if (error) {
          window['$message'].error('Please fill out required fields');
          return;
        } else {
          const Loading = window['$loading'] || null;
          Loading.start();
          createSecureShipment(formValue.value)
            .then(({ result }) => {
              window['$message'].success(result.message);
              Loading.finish();
            })
            .catch(({ result }) => {
              message.error(result.message);
              Loading.finish();
            });
        }
      });
    }
  }

  function update() {
    formRef.value?.validate((error) => {
      if (error) {
        window['$message'].error('Please fill out required fields');
        return;
      } else {
        const Loading = window['$loading'] || null;
        Loading.start();
        console.log(formValue.value);
        updateSecureShipment(formValue.value.id, formValue.value)
          .then(({ result }) => {
            window['$message'].success(result.message);
            Loading.finish();
          })
          .catch(({ result }) => {
            message.error(result.message);
            Loading.finish();
          });
      }
    });
  }

  function resetButton() {
    const Loading = window['$loading'] || null;
    Loading.start();
    deleteSecureShipment(formValue.value.id)
      .then(({ result, code }) => {
        if (code === ResultEnum.SUCCESS) {
          message.success(result.message);
          Loading.finish();
          isSecureShipmentSaved.value = false;
          formValue.value = ref({
            term_condition: false,
          });
        }
      })
      .catch(({ result }) => {
        message.error(result.message);
        Loading.finish();
      });
  }
  function secureShipmentStatusUpdate() {
    const Loading = window['$loading'] || null;
    Loading.start();
    const data = {
      status: formValue.value.status,
    };
    updateSecureShipment(formValue.value.id, data)
      .then(({ result }) => {
        window['$message'].success(result.message);
        Loading.finish();
      })
      .catch(({ result }) => {
        message.error(result.message);
        Loading.finish();
      });
  }
</script>
